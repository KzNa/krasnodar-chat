(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/methods/loadSurroundingMessages.coffee.js                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                       // 1
  loadSurroundingMessages: function(message, limit) {                  // 2
    var afterMessages, fromId, messages, moreAfter, moreBefore, options, records;
    if (limit == null) {                                               //
      limit = 50;                                                      //
    }                                                                  //
    fromId = Meteor.userId();                                          // 3
    if (!(message != null ? message.rid : void 0)) {                   // 5
      return false;                                                    // 6
    }                                                                  //
    if (!Meteor.call('canAccessRoom', message.rid, fromId)) {          // 8
      return false;                                                    // 9
    }                                                                  //
    if (!RocketChat.settings.get('Message_ShowEditedStatus')) {        // 11
      options.fields = {                                               // 12
        'editedAt': 0                                                  // 12
      };                                                               //
    }                                                                  //
    limit = limit - 1;                                                 // 3
    options = {                                                        // 3
      sort: {                                                          // 17
        ts: -1                                                         // 18
      },                                                               //
      limit: Math.ceil(limit / 2)                                      // 17
    };                                                                 //
    records = RocketChat.models.Messages.findVisibleByRoomIdBeforeTimestamp(message.rid, message.ts, options).fetch();
    messages = _.map(records, function(message) {                      // 3
      message.starred = _.findWhere(message.starred, {                 // 22
        _id: fromId                                                    // 22
      });                                                              //
      return message;                                                  // 23
    });                                                                //
    moreBefore = messages.length === options.limit;                    // 3
    messages.push(message);                                            // 3
    options = {                                                        // 3
      sort: {                                                          // 30
        ts: 1                                                          // 31
      },                                                               //
      limit: Math.floor(limit / 2)                                     // 30
    };                                                                 //
    records = RocketChat.models.Messages.findVisibleByRoomIdAfterTimestamp(message.rid, message.ts, options).fetch();
    afterMessages = _.map(records, function(message) {                 // 3
      message.starred = _.findWhere(message.starred, {                 // 35
        _id: fromId                                                    // 35
      });                                                              //
      return message;                                                  // 36
    });                                                                //
    moreAfter = afterMessages.length === options.limit;                // 3
    messages = messages.concat(afterMessages);                         // 3
    return {                                                           // 42
      messages: messages,                                              // 42
      moreBefore: moreBefore,                                          // 42
      moreAfter: moreAfter                                             // 42
    };                                                                 //
  }                                                                    //
});                                                                    //
                                                                       //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=loadSurroundingMessages.coffee.js.map
