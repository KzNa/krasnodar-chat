(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/methods/registerUser.coffee.js                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                       // 1
  registerUser: function(formData) {                                   // 2
    var userData, userId;                                              // 3
    if (RocketChat.settings.get('Accounts_RegistrationForm') === 'Disabled') {
      throw new Meteor.Error('registration-disabled', 'User registration is disabled');
    } else if (RocketChat.settings.get('Accounts_RegistrationForm') === 'Secret URL' && (!formData.secretURL || formData.secretURL !== RocketChat.settings.get('Accounts_RegistrationForm_SecretURL'))) {
      throw new Meteor.Error('registration-disabled', 'User registration is only allowed via Secret URL');
    }                                                                  //
    userData = {                                                       // 3
      email: formData.email,                                           // 10
      password: formData.pass                                          // 10
    };                                                                 //
    userId = Accounts.createUser(userData);                            // 3
    RocketChat.models.Users.setName(userId, formData.name);            // 3
    if (userData.email) {                                              // 17
      Accounts.sendVerificationEmail(userId, userData.email);          // 18
    }                                                                  //
    return userId;                                                     // 20
  }                                                                    //
});                                                                    //
                                                                       //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=registerUser.coffee.js.map
