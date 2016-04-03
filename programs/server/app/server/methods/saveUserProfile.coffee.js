(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/methods/saveUserProfile.coffee.js                            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                       // 1
  saveUserProfile: function(settings) {                                // 2
    var passCheck, profile, user;                                      // 3
    if (!settings.currentPassword) {                                   // 3
      throw new Meteor.Error('missing-current-password', "[methods] saveUserProfile -> Missing current password");
    }                                                                  //
    if (!RocketChat.settings.get("Accounts_AllowUserProfileChange")) {
      throw new Meteor.Error(403, "[methods] saveUserProfile -> Invalid access");
    }                                                                  //
    if (Meteor.userId()) {                                             // 9
      user = RocketChat.models.Users.findOneById(Meteor.userId());     // 10
      passCheck = Accounts._checkPassword(user, {                      // 10
        digest: settings.currentPassword,                              // 12
        algorithm: 'sha-256'                                           // 12
      });                                                              //
      if (passCheck.error) {                                           // 13
        throw new Meteor.Error('invalid-password', "[methods] saveUserProfile -> Invalid password");
      }                                                                //
      if (settings.newPassword != null) {                              // 16
        Accounts.setPassword(Meteor.userId(), settings.newPassword, {  // 17
          logout: false                                                // 17
        });                                                            //
      }                                                                //
      if (settings.realname != null) {                                 // 19
        Meteor.call('setRealName', settings.realname);                 // 20
      }                                                                //
      if (settings.username != null) {                                 // 22
        Meteor.call('setUsername', settings.username);                 // 23
      }                                                                //
      if (settings.email != null) {                                    // 25
        Meteor.call('setEmail', settings.email);                       // 26
      }                                                                //
      profile = {};                                                    // 10
      RocketChat.models.Users.setProfile(Meteor.userId(), profile);    // 10
      return true;                                                     // 32
    }                                                                  //
  }                                                                    //
});                                                                    //
                                                                       //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=saveUserProfile.coffee.js.map
