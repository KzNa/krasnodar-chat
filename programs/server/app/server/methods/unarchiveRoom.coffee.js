(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/methods/unarchiveRoom.coffee.js                              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                       // 1
  unarchiveRoom: function(rid) {                                       // 2
    var i, len, member, ref, results, room, username;                  // 3
    if (!Meteor.userId()) {                                            // 3
      throw new Meteor.Error('invalid-user', '[methods] unarchiveRoom -> Invalid user');
    }                                                                  //
    room = RocketChat.models.Rooms.findOneById(rid);                   // 3
    if (!room) {                                                       // 8
      throw new Meteor.Error('invalid-room', '[methods] unarchiveRoom -> Invalid room');
    }                                                                  //
    if ((room.u != null) && room.u._id === Meteor.userId() || RocketChat.authz.hasRole(Meteor.userId(), 'admin')) {
      RocketChat.models.Rooms.unarchiveById(rid);                      // 12
      ref = room.usernames;                                            // 14
      results = [];                                                    // 14
      for (i = 0, len = ref.length; i < len; i++) {                    //
        username = ref[i];                                             //
        member = RocketChat.models.Users.findOneByUsername(username, {
          fields: {                                                    // 15
            username: 1                                                // 15
          }                                                            //
        });                                                            //
        if (member == null) {                                          // 16
          continue;                                                    // 17
        }                                                              //
        results.push(RocketChat.models.Subscriptions.unarchiveByRoomIdAndUserId(rid, member._id));
      }                                                                // 14
      return results;                                                  //
    }                                                                  //
  }                                                                    //
});                                                                    //
                                                                       //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=unarchiveRoom.coffee.js.map
