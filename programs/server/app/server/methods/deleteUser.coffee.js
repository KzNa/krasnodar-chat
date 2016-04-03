(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/methods/deleteUser.coffee.js                                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                       // 1
  deleteUser: function(userId) {                                       // 2
    var user;                                                          // 3
    if (!Meteor.userId()) {                                            // 3
      throw new Meteor.Error('invalid-user', "[methods] deleteUser -> Invalid user");
    }                                                                  //
    user = RocketChat.models.Users.findOneById(Meteor.userId());       // 3
    if (RocketChat.authz.hasPermission(Meteor.userId(), 'delete-user') !== true) {
      throw new Meteor.Error('not-authorized', '[methods] deleteUser -> Not authorized');
    }                                                                  //
    user = RocketChat.models.Users.findOneById(userId);                // 3
    if (user == null) {                                                // 12
      throw new Meteor.Error('not-found', '[methods] deleteUser -> User not found');
    }                                                                  //
    RocketChat.models.Messages.removeByUserId(userId);                 // 3
    RocketChat.models.Subscriptions.findByUserId(userId).forEach(function(subscription) {
      var room;                                                        // 18
      room = RocketChat.models.Rooms.findOneById(subscription.rid);    // 18
      if (room.t !== 'c' && room.usernames.length === 1) {             // 19
        RocketChat.models.Rooms.removeById(subscription.rid);          // 20
      }                                                                //
      if (room.t === 'd') {                                            // 21
        RocketChat.models.Subscriptions.removeByRoomId(subscription.rid);
        return RocketChat.models.Messages.removeByRoomId(subscription.rid);
      }                                                                //
    });                                                                //
    RocketChat.models.Subscriptions.removeByUserId(userId);            // 3
    RocketChat.models.Rooms.removeByTypeContainingUsername('d', user.username);
    RocketChat.models.Rooms.removeUsernameFromAll(user.username);      // 3
    RocketChat.models.Users.removeById(userId);                        // 3
    return true;                                                       // 31
  }                                                                    //
});                                                                    //
                                                                       //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=deleteUser.coffee.js.map
