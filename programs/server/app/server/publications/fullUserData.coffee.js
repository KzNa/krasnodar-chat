(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/publications/fullUserData.coffee.js                          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('fullUserData', function(filter, limit) {               // 1
  var fields, filterReg, options;                                      // 2
  if (!this.userId) {                                                  // 2
    return this.ready();                                               // 3
  }                                                                    //
  fields = {                                                           // 2
    name: 1,                                                           // 6
    username: 1,                                                       // 6
    status: 1,                                                         // 6
    utcOffset: 1                                                       // 6
  };                                                                   //
  if (RocketChat.authz.hasPermission(this.userId, 'view-full-other-user-info') === true) {
    fields = _.extend(fields, {                                        // 12
      emails: 1,                                                       // 13
      phone: 1,                                                        // 13
      statusConnection: 1,                                             // 13
      createdAt: 1,                                                    // 13
      lastLogin: 1,                                                    // 13
      active: 1,                                                       // 13
      services: 1,                                                     // 13
      roles: 1,                                                        // 13
      requirePasswordChange: 1,                                        // 13
      requirePasswordChangeReason: 1                                   // 13
    });                                                                //
  } else {                                                             //
    limit = 1;                                                         // 24
  }                                                                    //
  filter = s.trim(filter);                                             // 2
  if (!filter && limit === 1) {                                        // 28
    return this.ready();                                               // 29
  }                                                                    //
  options = {                                                          // 2
    fields: fields,                                                    // 32
    limit: limit,                                                      // 32
    sort: {                                                            // 32
      username: 1                                                      // 34
    }                                                                  //
  };                                                                   //
  if (filter) {                                                        // 36
    if (limit === 1) {                                                 // 37
      return RocketChat.models.Users.findByUsername(filter, options);  // 38
    } else {                                                           //
      filterReg = new RegExp(filter, "i");                             // 40
      return RocketChat.models.Users.findByUsernameNameOrEmailAddress(filterReg, options);
    }                                                                  //
  }                                                                    //
  return RocketChat.models.Users.find({}, options);                    // 43
});                                                                    // 1
                                                                       //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=fullUserData.coffee.js.map
