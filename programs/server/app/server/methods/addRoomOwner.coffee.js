(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/methods/addRoomOwner.coffee.js                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                       // 1
  addRoomOwner: function(rid, userId) {                                // 2
    var fromUser, subscription, user;                                  // 3
    if (!Meteor.userId()) {                                            // 3
      throw new Meteor.Error('invalid-user', '[methods] addRoomOwner -> Invalid user');
    }                                                                  //
    check(rid, String);                                                // 3
    check(userId, String);                                             // 3
    if (!RocketChat.authz.hasPermission(Meteor.userId(), 'set-owner', rid)) {
      throw new Meteor.Error(403, 'Not allowed');                      // 10
    }                                                                  //
    subscription = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(rid, userId);
    if (subscription == null) {                                        // 13
      throw new Meteor.Error('invalid-subscription', '[methods] addRoomOwner -> Invalid Subscription');
    }                                                                  //
    RocketChat.models.Subscriptions.addRoleById(subscription._id, 'owner');
    user = RocketChat.models.Users.findOneById(userId);                // 3
    fromUser = RocketChat.models.Users.findOneById(Meteor.userId());   // 3
    RocketChat.models.Messages.createNewOwnerWithRoomIdAndUser(rid, user, {
      u: {                                                             // 21
        _id: fromUser._id,                                             // 22
        username: fromUser.username                                    // 22
      }                                                                //
    });                                                                //
    return true;                                                       // 25
  }                                                                    //
});                                                                    //
                                                                       //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=addRoomOwner.coffee.js.map
