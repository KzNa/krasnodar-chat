(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/methods/addUserToRoom.coffee.js                              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                       // 1
  addUserToRoom: function(data) {                                      // 2
    var fromId, fromUser, newUser, now, ref, room;                     // 3
    fromId = Meteor.userId();                                          // 3
    if (!Match.test(data != null ? data.rid : void 0, String)) {       // 4
      throw new Meteor.Error('invalid-rid');                           // 5
    }                                                                  //
    if (!Match.test(data != null ? data.username : void 0, String)) {  // 7
      throw new Meteor.Error('invalid-username');                      // 8
    }                                                                  //
    room = RocketChat.models.Rooms.findOneById(data.rid);              // 3
    if (room.t === 'c' && ((ref = room.u) != null ? ref.username : void 0) !== Meteor.user().username) {
      throw new Meteor.Error(403, '[methods] addUserToRoom -> Not allowed');
    }                                                                  //
    if (room.t === 'd') {                                              // 16
      throw new Meteor.Error('cant-invite-for-direct-room');           // 17
    }                                                                  //
    if (room.usernames.indexOf(data.username) !== -1) {                // 20
      return;                                                          // 21
    }                                                                  //
    newUser = RocketChat.models.Users.findOneByUsername(data.username);
    RocketChat.models.Rooms.addUsernameById(data.rid, data.username);  // 3
    now = new Date();                                                  // 3
    RocketChat.models.Subscriptions.createWithRoomAndUser(room, newUser, {
      ts: now,                                                         // 30
      open: true,                                                      // 30
      alert: true,                                                     // 30
      unread: 1                                                        // 30
    });                                                                //
    fromUser = RocketChat.models.Users.findOneById(fromId);            // 3
    RocketChat.models.Messages.createUserAddedWithRoomIdAndUser(data.rid, newUser, {
      ts: now,                                                         // 37
      u: {                                                             // 37
        _id: fromUser._id,                                             // 39
        username: fromUser.username                                    // 39
      }                                                                //
    });                                                                //
    return true;                                                       // 42
  }                                                                    //
});                                                                    //
                                                                       //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=addUserToRoom.coffee.js.map
