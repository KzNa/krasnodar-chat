(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/stream/streamBroadcast.coffee.js                             //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var authorizeConnection, logger;                                       // 1
                                                                       //
logger = new Logger('StreamBroadcast', {                               // 1
  sections: {                                                          // 2
    connection: 'Connection',                                          // 3
    auth: 'Auth',                                                      // 3
    stream: 'Stream'                                                   // 3
  }                                                                    //
});                                                                    //
                                                                       //
authorizeConnection = function(connection, record) {                   // 1
  logger.auth.info("Authorizing with localhost:" + record.extraInformation.port);
  return connection.call('broadcastAuth', record._id, InstanceStatus.id(), function(err, ok) {
    connection.broadcastAuth = ok;                                     // 11
    return logger.auth.info("broadcastAuth with localhost:" + record.extraInformation.port, ok);
  });                                                                  //
};                                                                     // 8
                                                                       //
this.connections = {};                                                 // 1
                                                                       //
this.startStreamBroadcast = function(streams) {                        // 1
  var broadcast, emitters, fn, stream, streamName;                     // 16
  logger.info('startStreamBroadcast');                                 // 16
  InstanceStatus.getCollection().find({                                // 16
    'extraInformation.port': {                                         // 20
      $exists: true                                                    // 20
    }                                                                  //
  }, {                                                                 //
    sort: {                                                            // 20
      _createdAt: -1                                                   // 20
    }                                                                  //
  }).observe({                                                         //
    added: function(record) {                                          // 21
      if (record.extraInformation.port === process.env.PORT || (connections[record.extraInformation.port] != null)) {
        return;                                                        // 23
      }                                                                //
      logger.connection.info('connecting in', "localhost:" + record.extraInformation.port);
      connections[record.extraInformation.port] = DDP.connect("localhost:" + record.extraInformation.port, {
        _dontPrintErrors: true                                         // 26
      });                                                              //
      authorizeConnection(connections[record.extraInformation.port], record);
      return connections[record.extraInformation.port].onReconnect = function() {
        return authorizeConnection(connections[record.extraInformation.port], record);
      };                                                               //
    },                                                                 //
    removed: function(record) {                                        // 21
      if ((connections[record.extraInformation.port] != null) && (InstanceStatus.getCollection().findOne({
        'extraInformation.port': record.extraInformation.port          //
      }) == null)) {                                                   //
        logger.connection.info('disconnecting from', "localhost:" + record.extraInformation.port);
        connections[record.extraInformation.port].disconnect();        // 33
        return delete connections[record.extraInformation.port];       //
      }                                                                //
    }                                                                  //
  });                                                                  //
  broadcast = function(streamName, args, userId) {                     // 16
    var connection, port, results;                                     // 38
    results = [];                                                      // 38
    for (port in connections) {                                        //
      connection = connections[port];                                  //
      results.push((function(port, connection) {                       // 39
        if (connection.status().connected === true) {                  // 40
          return connection.call('stream', streamName, args, function(error, response) {
            if (error != null) {                                       // 42
              logger.error("Stream broadcast error", error);           // 43
            }                                                          //
            switch (response) {                                        // 45
              case 'self-not-authorized':                              // 45
                logger.stream.error(("Stream broadcast from:" + process.env.PORT + " to:" + connection._stream.endpoint + " with name " + streamName + " to self is not authorized").red);
                logger.stream.debug("    -> connection authorized".red, connection.broadcastAuth);
                logger.stream.debug("    -> connection status".red, connection.status());
                return logger.stream.debug("    -> arguments".red, args);
              case 'not-authorized':                                   // 45
                logger.stream.error(("Stream broadcast from:" + process.env.PORT + " to:" + connection._stream.endpoint + " with name " + streamName + " not authorized").red);
                logger.stream.debug("    -> connection authorized".red, connection.broadcastAuth);
                logger.stream.debug("    -> connection status".red, connection.status());
                return logger.stream.debug("    -> arguments".red, args);
              case 'stream-not-exists':                                // 45
                logger.stream.error(("Stream broadcast from:" + process.env.PORT + " to:" + connection._stream.endpoint + " with name " + streamName + " does not exists").red);
                logger.stream.debug("    -> connection authorized".red, connection.broadcastAuth);
                logger.stream.debug("    -> connection status".red, connection.status());
                return logger.stream.debug("    -> arguments".red, args);
            }                                                          // 45
          });                                                          //
        }                                                              //
      })(port, connection));                                           //
    }                                                                  // 38
    return results;                                                    //
  };                                                                   //
  Meteor.methods({                                                     // 16
    showConnections: function() {                                      // 66
      var connection, data, port;                                      // 67
      data = {};                                                       // 67
      for (port in connections) {                                      // 68
        connection = connections[port];                                //
        data[port] = {                                                 // 69
          status: connection.status(),                                 // 70
          broadcastAuth: connection.broadcastAuth                      // 70
        };                                                             //
      }                                                                // 68
      return data;                                                     // 72
    }                                                                  //
  });                                                                  //
  emitters = {};                                                       // 16
  fn = function(streamName, stream) {                                  // 76
    emitters[streamName] = stream.emitToSubscriptions;                 // 78
    return stream.emitToSubscriptions = function(args, subscriptionId, userId) {
      if (subscriptionId !== 'broadcasted') {                          // 80
        broadcast(streamName, args);                                   // 81
      }                                                                //
      return emitters[streamName](args, subscriptionId, userId);       //
    };                                                                 //
  };                                                                   //
  for (streamName in streams) {                                        // 76
    stream = streams[streamName];                                      //
    fn(streamName, stream);                                            // 77
  }                                                                    // 76
  return Meteor.methods({                                              //
    broadcastAuth: function(selfId, remoteId) {                        // 86
      check(selfId, String);                                           // 87
      check(remoteId, String);                                         // 87
      this.unblock();                                                  // 87
      if (selfId === InstanceStatus.id() && remoteId !== InstanceStatus.id() && (InstanceStatus.getCollection().findOne({
        _id: remoteId                                                  //
      }) != null)) {                                                   //
        this.connection.broadcastAuth = true;                          // 92
      }                                                                //
      return this.connection.broadcastAuth === true;                   // 94
    },                                                                 //
    stream: function(streamName, args) {                               // 86
      if (this.connection == null) {                                   // 98
        return 'self-not-authorized';                                  // 99
      }                                                                //
      if (this.connection.broadcastAuth !== true) {                    // 102
        return 'not-authorized';                                       // 103
      }                                                                //
      if (emitters[streamName] == null) {                              // 105
        return 'stream-not-exists';                                    // 106
      }                                                                //
      emitters[streamName].call(null, args, 'broadcasted');            // 98
      return void 0;                                                   // 110
    }                                                                  //
  });                                                                  //
};                                                                     // 15
                                                                       //
Meteor.startup(function() {                                            // 1
  var config;                                                          // 114
  config = {                                                           // 114
    'RocketChat.Notifications.streamAll': RocketChat.Notifications.streamAll,
    'RocketChat.Notifications.streamRoom': RocketChat.Notifications.streamRoom,
    'RocketChat.Notifications.streamUser': RocketChat.Notifications.streamUser
  };                                                                   //
  return startStreamBroadcast(config);                                 //
});                                                                    // 113
                                                                       //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=streamBroadcast.coffee.js.map
