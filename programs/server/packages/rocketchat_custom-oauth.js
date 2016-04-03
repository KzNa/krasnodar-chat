(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var check = Package.check.check;
var Match = Package.check.Match;
var OAuth = Package.oauth.OAuth;
var Oauth = Package.oauth.Oauth;
var _ = Package.underscore._;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var s = Package['underscorestring:underscore.string'].s;
var HTTP = Package.http.HTTP;
var HTTPInternals = Package.http.HTTPInternals;
var Accounts = Package['accounts-base'].Accounts;
var AccountsServer = Package['accounts-base'].AccountsServer;

/* Package-scope variables */
var __coffeescriptShare, CustomOAuth;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/rocketchat_custom-oauth/custom_oauth_server.coffee.js                              //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Services;                                                                                  // 1
                                                                                               //
Services = {};                                                                                 // 1
                                                                                               //
CustomOAuth = (function() {                                                                    // 1
  function CustomOAuth(name, options) {                                                        // 4
    this.name = name;                                                                          // 5
    if (!Match.test(this.name, String)) {                                                      // 5
      throw new Meteor.Error('CustomOAuth: Name is required and must be String');              // 6
    }                                                                                          //
    if (Services[this.name] != null) {                                                         // 8
      Services[this.name].configure(options);                                                  // 9
      return;                                                                                  // 10
    }                                                                                          //
    Services[this.name] = this;                                                                // 5
    this.configure(options);                                                                   // 5
    this.userAgent = "Meteor";                                                                 // 5
    if (Meteor.release) {                                                                      // 17
      this.userAgent += '/' + Meteor.release;                                                  // 18
    }                                                                                          //
    Accounts.oauth.registerService(this.name);                                                 // 5
    this.registerService();                                                                    // 5
  }                                                                                            //
                                                                                               //
  CustomOAuth.prototype.configure = function(options) {                                        // 4
    if (!Match.test(options, Object)) {                                                        // 24
      throw new Meteor.Error('CustomOAuth: Options is required and must be Object');           // 25
    }                                                                                          //
    if (!Match.test(options.serverURL, String)) {                                              // 27
      throw new Meteor.Error('CustomOAuth: Options.serverURL is required and must be String');
    }                                                                                          //
    if (!Match.test(options.tokenPath, String)) {                                              // 30
      options.tokenPath = '/oauth/token';                                                      // 31
    }                                                                                          //
    if (!Match.test(options.identityPath, String)) {                                           // 33
      options.identityPath = '/me';                                                            // 34
    }                                                                                          //
    this.serverURL = options.serverURL;                                                        // 24
    this.tokenPath = options.tokenPath;                                                        // 24
    this.identityPath = options.identityPath;                                                  // 24
    if (!/^https?:\/\/.+/.test(this.tokenPath)) {                                              // 40
      this.tokenPath = this.serverURL + this.tokenPath;                                        // 41
    }                                                                                          //
    if (!/^https?:\/\/.+/.test(this.identityPath)) {                                           // 43
      this.identityPath = this.serverURL + this.identityPath;                                  // 44
    }                                                                                          //
    if (Match.test(options.addAutopublishFields, Object)) {                                    // 46
      return Accounts.addAutopublishFields(options.addAutopublishFields);                      //
    }                                                                                          //
  };                                                                                           //
                                                                                               //
  CustomOAuth.prototype.getAccessToken = function(query) {                                     // 4
    var config, err, error, response;                                                          // 50
    config = ServiceConfiguration.configurations.findOne({                                     // 50
      service: this.name                                                                       // 50
    });                                                                                        //
    if (config == null) {                                                                      // 51
      throw new ServiceConfiguration.ConfigError();                                            // 52
    }                                                                                          //
    response = void 0;                                                                         // 50
    try {                                                                                      // 55
      response = HTTP.post(this.tokenPath, {                                                   // 56
        headers: {                                                                             // 57
          Accept: 'application/json',                                                          // 58
          'User-Agent': this.userAgent                                                         // 58
        },                                                                                     //
        params: {                                                                              // 57
          code: query.code,                                                                    // 61
          client_id: config.clientId,                                                          // 61
          client_secret: OAuth.openSecret(config.secret),                                      // 61
          redirect_uri: OAuth._redirectUri(this.name, config),                                 // 61
          grant_type: 'authorization_code',                                                    // 61
          state: query.state                                                                   // 61
        }                                                                                      //
      });                                                                                      //
    } catch (_error) {                                                                         //
      err = _error;                                                                            // 69
      error = new Error(("Failed to complete OAuth handshake with " + this.name + " at " + this.tokenPath + ". ") + err.message);
      throw _.extend(error, {                                                                  // 70
        response: err.response                                                                 // 70
      });                                                                                      //
    }                                                                                          //
    if (response.data.error) {                                                                 // 72
      throw new Error(("Failed to complete OAuth handshake with " + this.name + " at " + this.tokenPath + ". ") + response.data.error);
    } else {                                                                                   //
      return response.data.access_token;                                                       // 75
    }                                                                                          //
  };                                                                                           //
                                                                                               //
  CustomOAuth.prototype.getIdentity = function(accessToken) {                                  // 4
    var err, error, response;                                                                  // 78
    try {                                                                                      // 78
      response = HTTP.get(this.identityPath, {                                                 // 79
        headers: {                                                                             // 80
          'User-Agent': this.userAgent                                                         // 81
        },                                                                                     //
        params: {                                                                              // 80
          access_token: accessToken                                                            // 83
        }                                                                                      //
      });                                                                                      //
      if (response.data) {                                                                     // 85
        return response.data;                                                                  // 86
      } else {                                                                                 //
        return JSON.parse(response.content);                                                   // 88
      }                                                                                        //
    } catch (_error) {                                                                         //
      err = _error;                                                                            // 91
      error = new Error(("Failed to fetch identity from " + this.name + " at " + this.identityPath + ". ") + err.message);
      throw _.extend(error, {                                                                  // 92
        response: err.response                                                                 // 92
      });                                                                                      //
    }                                                                                          //
  };                                                                                           //
                                                                                               //
  CustomOAuth.prototype.registerService = function() {                                         // 4
    var self;                                                                                  // 95
    self = this;                                                                               // 95
    return OAuth.registerService(this.name, 2, null, function(query) {                         //
      var accessToken, data, identity, serviceData;                                            // 97
      accessToken = self.getAccessToken(query);                                                // 97
      console.log('at:', accessToken);                                                         // 97
      identity = self.getIdentity(accessToken);                                                // 97
      if ((identity != null ? identity.ID : void 0) && !identity.id) {                         // 103
        identity.id = identity.ID;                                                             // 104
      }                                                                                        //
      if ((identity != null ? identity.user_id : void 0) && !identity.id) {                    // 107
        identity.id = identity.user_id;                                                        // 108
      }                                                                                        //
      console.log('id:', JSON.stringify(identity, null, '  '));                                // 97
      serviceData = {                                                                          // 97
        _OAuthCustom: true,                                                                    // 113
        accessToken: accessToken                                                               // 113
      };                                                                                       //
      _.extend(serviceData, identity);                                                         // 97
      data = {                                                                                 // 97
        serviceData: serviceData,                                                              // 119
        options: {                                                                             // 119
          profile: {                                                                           // 121
            name: identity.name || identity.username || identity.nickname                      // 122
          }                                                                                    //
        }                                                                                      //
      };                                                                                       //
      console.log(data);                                                                       // 97
      return data;                                                                             // 126
    });                                                                                        //
  };                                                                                           //
                                                                                               //
  CustomOAuth.prototype.retrieveCredential = function(credentialToken, credentialSecret) {     // 4
    return OAuth.retrieveCredential(credentialToken, credentialSecret);                        // 129
  };                                                                                           //
                                                                                               //
  return CustomOAuth;                                                                          //
                                                                                               //
})();                                                                                          //
                                                                                               //
/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:custom-oauth'] = {
  CustomOAuth: CustomOAuth
};

})();

//# sourceMappingURL=rocketchat_custom-oauth.js.map
