(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/methods/getRoomModeratorsAndOwners.coffee.js                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                       // 1
  getRoomModeratorsAndOwners: function(rid) {                          // 2
    var options;                                                       // 3
    if (!Meteor.userId()) {                                            // 3
      throw new Meteor.Error('invalid-user', '[methods] getRoomModeratorsAndOwners -> Invalid user');
    }                                                                  //
    check(rid, String);                                                // 3
    options = {                                                        // 3
      sort: {                                                          // 9
        "u.username": 1                                                // 10
      },                                                               //
      fields: {                                                        // 9
        rid: 1,                                                        // 12
        u: 1,                                                          // 12
        roles: 1                                                       // 12
      }                                                                //
    };                                                                 //
    return RocketChat.models.Subscriptions.findByRoomIdAndRoles(rid, ['moderator', 'owner'], options).fetch();
  }                                                                    //
});                                                                    //
                                                                       //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=getRoomModeratorsAndOwners.coffee.js.map
