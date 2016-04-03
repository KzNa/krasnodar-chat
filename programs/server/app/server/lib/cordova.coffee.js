(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/lib/cordova.coffee.js                                        //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var configurePush, sendPush;                                           // 1
                                                                       //
Meteor.methods({                                                       // 1
  log: function() {                                                    // 2
    return console.log.apply(console, arguments);                      //
  },                                                                   //
  push_test: function() {                                              // 2
    var query, tokens, user;                                           // 6
    user = Meteor.user();                                              // 6
    if (user == null) {                                                // 7
      throw new Meteor.Error('unauthorized', '[methods] push_test -> Unauthorized');
    }                                                                  //
    if (!RocketChat.authz.hasRole(user._id, 'admin')) {                // 10
      throw new Meteor.Error('unauthorized', '[methods] push_test -> Unauthorized');
    }                                                                  //
    if (Push.enabled !== true) {                                       // 13
      throw new Meteor.Error('push_disabled');                         // 14
    }                                                                  //
    query = {                                                          // 6
      $and: [                                                          // 17
        {                                                              //
          userId: user._id                                             // 18
        }, {                                                           //
          $or: [                                                       // 19
            {                                                          //
              'token.apn': {                                           // 21
                $exists: true                                          // 21
              }                                                        //
            }, {                                                       //
              'token.gcm': {                                           // 22
                $exists: true                                          // 22
              }                                                        //
            }                                                          //
          ]                                                            //
        }                                                              //
      ]                                                                //
    };                                                                 //
    tokens = Push.appCollection.find(query).count();                   // 6
    if (tokens === 0) {                                                // 29
      throw new Meteor.Error('no_tokens_for_this_user');               // 30
    }                                                                  //
    Push.send({                                                        // 6
      from: 'push',                                                    // 33
      title: "@" + user.username,                                      // 33
      text: TAPi18n.__("This_is_a_push_test_messsage"),                // 33
      apn: {                                                           // 33
        text: ("@" + user.username + ":\n") + TAPi18n.__("This_is_a_push_test_messsage")
      },                                                               //
      sound: 'chime',                                                  // 33
      query: {                                                         // 33
        userId: user._id                                               // 40
      }                                                                //
    });                                                                //
    return {                                                           // 42
      message: "Your_push_was_sent_to_s_devices",                      // 43
      params: [tokens]                                                 // 43
    };                                                                 //
  }                                                                    //
});                                                                    //
                                                                       //
configurePush = function() {                                           // 1
  var apn, gcm;                                                        // 48
  console.log('configuring push');                                     // 48
  Push.debug = RocketChat.settings.get('Push_debug');                  // 48
  if (RocketChat.settings.get('Push_enable') === true) {               // 52
    Push.allow({                                                       // 53
      send: function(userId, notification) {                           // 54
        return RocketChat.authz.hasRole(userId, 'admin');              // 55
      }                                                                //
    });                                                                //
    apn = void 0;                                                      // 53
    gcm = void 0;                                                      // 53
    if (RocketChat.settings.get('Push_enable_gateway') === false) {    // 60
      gcm = {                                                          // 61
        apiKey: RocketChat.settings.get('Push_gcm_api_key'),           // 62
        projectNumber: RocketChat.settings.get('Push_gcm_project_number')
      };                                                               //
      apn = {                                                          // 61
        passphrase: RocketChat.settings.get('Push_apn_passphrase'),    // 66
        keyData: RocketChat.settings.get('Push_apn_key'),              // 66
        certData: RocketChat.settings.get('Push_apn_cert')             // 66
      };                                                               //
      if (RocketChat.settings.get('Push_production') !== true) {       // 70
        apn = {                                                        // 71
          passphrase: RocketChat.settings.get('Push_apn_dev_passphrase'),
          keyData: RocketChat.settings.get('Push_apn_dev_key'),        // 72
          certData: RocketChat.settings.get('Push_apn_dev_cert'),      // 72
          gateway: 'gateway.sandbox.push.apple.com'                    // 72
        };                                                             //
      }                                                                //
      if ((apn.keyData == null) || apn.keyData.trim() === '' || (apn.keyData == null) || apn.keyData.trim() === '') {
        apn = void 0;                                                  // 78
      }                                                                //
      if ((gcm.apiKey == null) || gcm.apiKey.trim() === '' || (gcm.projectNumber == null) || gcm.projectNumber.trim() === '') {
        gcm = void 0;                                                  // 81
      }                                                                //
    }                                                                  //
    Push.Configure({                                                   // 53
      apn: apn,                                                        // 84
      gcm: gcm,                                                        // 84
      production: RocketChat.settings.get('Push_production'),          // 84
      sendInterval: 1000,                                              // 84
      sendBatchSize: 10                                                // 84
    });                                                                //
    if (RocketChat.settings.get('Push_enable_gateway') === true) {     // 90
      Push.serverSend = function(options) {                            // 91
        var query;                                                     // 92
        options = options || {                                         // 92
          badge: 0                                                     // 92
        };                                                             //
        query = void 0;                                                // 92
        if (options.from !== '' + options.from) {                      // 95
          throw new Error('Push.send: option "from" not a string');    // 96
        }                                                              //
        if (options.title !== '' + options.title) {                    // 98
          throw new Error('Push.send: option "title" not a string');   // 99
        }                                                              //
        if (options.text !== '' + options.text) {                      // 101
          throw new Error('Push.send: option "text" not a string');    // 102
        }                                                              //
        if (Push.debug) {                                              // 104
          console.log('Push: Send message "' + options.title + '" via query', options.query);
        }                                                              //
        query = {                                                      // 92
          $and: [                                                      // 108
            options.query, {                                           //
              $or: [                                                   // 110
                {                                                      //
                  'token.apn': {                                       // 112
                    $exists: true                                      // 112
                  }                                                    //
                }, {                                                   //
                  'token.gcm': {                                       // 113
                    $exists: true                                      // 113
                  }                                                    //
                }                                                      //
              ]                                                        //
            }                                                          //
          ]                                                            //
        };                                                             //
        return Push.appCollection.find(query).forEach(function(app) {  //
          var service, token;                                          // 119
          if (Push.debug) {                                            // 119
            console.log('send to token', app.token);                   // 120
          }                                                            //
          if (app.token.apn != null) {                                 // 122
            service = 'apn';                                           // 123
            token = app.token.apn;                                     // 123
          } else if (app.token.gcm != null) {                          //
            service = 'gcm';                                           // 126
            token = app.token.gcm;                                     // 126
          }                                                            //
          return sendPush(service, token, options);                    //
        });                                                            //
      };                                                               //
    }                                                                  //
    return Push.enabled = true;                                        //
  }                                                                    //
};                                                                     // 47
                                                                       //
sendPush = function(service, token, options, tries) {                  // 1
  var e, milli;                                                        // 134
  if (tries == null) {                                                 //
    tries = 0;                                                         //
  }                                                                    //
  try {                                                                // 134
    return HTTP.post(RocketChat.settings.get('Push_gateway') + ("/push/" + service + "/send"), {
      data: {                                                          // 136
        token: token,                                                  // 137
        options: options                                               // 137
      }                                                                //
    });                                                                //
  } catch (_error) {                                                   //
    e = _error;                                                        // 140
    SystemLogger.error('Error sending push to gateway (' + tries + ' try) ->', e);
    if (tries <= 6) {                                                  // 141
      milli = Math.pow(10, tries + 2);                                 // 142
      SystemLogger.log('Trying sending push to gateway again in', milli, 'milliseconds');
      return Meteor.setTimeout(function() {                            //
        return sendPush(service, token, options, tries + 1);           //
      }, milli);                                                       //
    }                                                                  //
  }                                                                    //
};                                                                     // 133
                                                                       //
Meteor.startup(function() {                                            // 1
  return configurePush();                                              //
});                                                                    // 151
                                                                       //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=cordova.coffee.js.map
