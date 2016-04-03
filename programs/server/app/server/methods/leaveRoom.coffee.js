(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/methods/leaveRoom.coffee.js                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                       // 1
  leaveRoom: function(rid) {                                           // 2
    var fromId, newOwner, ref, removedUser, room, user;                // 3
    if (!Meteor.userId()) {                                            // 3
      throw new Meteor.Error(403, "[methods] leaveRoom -> Invalid user");
    }                                                                  //
    this.unblock();                                                    // 3
    fromId = Meteor.userId();                                          // 3
    room = RocketChat.models.Rooms.findOneById(rid);                   // 3
    user = Meteor.user();                                              // 3
    RocketChat.callbacks.run('beforeLeaveRoom', user, room);           // 3
    RocketChat.models.Rooms.removeUsernameById(rid, user.username);    // 3
    if (room.t !== 'c' && room.usernames.indexOf(user.username) !== -1) {
      removedUser = user;                                              // 17
      RocketChat.models.Messages.createUserLeaveWithRoomIdAndUser(rid, removedUser);
    }                                                                  //
    if (room.t === 'l') {                                              // 21
      RocketChat.models.Messages.createCommandWithRoomIdAndUser('survey', rid, user);
    }                                                                  //
    if (((ref = room.u) != null ? ref._id : void 0) === Meteor.userId()) {
      newOwner = _.without(room.usernames, user.username)[0];          // 26
      if (newOwner != null) {                                          // 27
        newOwner = RocketChat.models.Users.findOneByUsername(newOwner);
        if (newOwner != null) {                                        // 30
          RocketChat.models.Rooms.setUserById(rid, newOwner);          // 31
        }                                                              //
      }                                                                //
    }                                                                  //
    RocketChat.models.Subscriptions.removeByRoomIdAndUserId(rid, Meteor.userId());
    return Meteor.defer(function() {                                   //
      return RocketChat.callbacks.run('afterLeaveRoom', user, room);   //
    });                                                                //
  }                                                                    //
});                                                                    //
                                                                       //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=leaveRoom.coffee.js.map
