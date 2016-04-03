(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/stream/messages.coffee.js                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this.msgStream = new Meteor.Stream('messages');                        // 1
                                                                       //
msgStream.permissions.write(function(eventName) {                      // 1
  return false;                                                        // 6
});                                                                    // 3
                                                                       //
msgStream.permissions.read(function(eventName) {                       // 1
  var canAccess, e;                                                    // 12
  try {                                                                // 12
    canAccess = Meteor.call('canAccessRoom', eventName, this.userId);  // 13
    if (!canAccess) {                                                  // 15
      return false;                                                    // 15
    }                                                                  //
    return true;                                                       // 17
  } catch (_error) {                                                   //
    e = _error;                                                        // 19
    return false;                                                      // 19
  }                                                                    //
});                                                                    // 8
                                                                       //
Meteor.startup(function() {                                            // 1
  var options;                                                         // 23
  options = {};                                                        // 23
  if (!RocketChat.settings.get('Message_ShowEditedStatus')) {          // 25
    options.fields = {                                                 // 26
      'editedAt': 0                                                    // 26
    };                                                                 //
  }                                                                    //
  return RocketChat.models.Messages.findVisibleCreatedOrEditedAfterTimestamp(new Date(), options).observe({
    added: function(record) {                                          // 29
      return msgStream.emit(record.rid, record);                       //
    },                                                                 //
    changed: function(record) {                                        // 29
      return msgStream.emit(record.rid, record);                       //
    }                                                                  //
  });                                                                  //
});                                                                    // 22
                                                                       //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=messages.coffee.js.map
