(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var JsonRoutes = Package['simple:json-routes'].JsonRoutes;
var RestMiddleware = Package['simple:json-routes'].RestMiddleware;
var Accounts = Package['accounts-base'].Accounts;
var AccountsServer = Package['accounts-base'].AccountsServer;

/* Package-scope variables */
var __coffeescriptShare, ironRouterSendErrorToResponse, msg, Restivus;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/nimble_restivus/lib/auth.coffee.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var getUserQuerySelector, userValidator;                                                                             // 1
                                                                                                                     //
this.Auth || (this.Auth = {});                                                                                       // 1
                                                                                                                     //
                                                                                                                     // 3
/*                                                                                                                   // 3
  A valid user will have exactly one of the following identification fields: id, username, or email                  //
 */                                                                                                                  //
                                                                                                                     //
userValidator = Match.Where(function(user) {                                                                         // 1
  check(user, {                                                                                                      // 7
    id: Match.Optional(String),                                                                                      // 8
    username: Match.Optional(String),                                                                                // 8
    email: Match.Optional(String)                                                                                    // 8
  });                                                                                                                //
  if (_.keys(user).length === !1) {                                                                                  // 12
    throw new Match.Error('User must have exactly one identifier field');                                            // 13
  }                                                                                                                  //
  return true;                                                                                                       // 15
});                                                                                                                  // 6
                                                                                                                     //
                                                                                                                     // 18
/*                                                                                                                   // 18
  Return a MongoDB query selector for finding the given user                                                         //
 */                                                                                                                  //
                                                                                                                     //
getUserQuerySelector = function(user) {                                                                              // 1
  if (user.id) {                                                                                                     // 22
    return {                                                                                                         // 23
      '_id': user.id                                                                                                 // 23
    };                                                                                                               //
  } else if (user.username) {                                                                                        //
    return {                                                                                                         // 25
      'username': user.username                                                                                      // 25
    };                                                                                                               //
  } else if (user.email) {                                                                                           //
    return {                                                                                                         // 27
      'emails.address': user.email                                                                                   // 27
    };                                                                                                               //
  }                                                                                                                  //
  throw new Error('Cannot create selector from invalid user');                                                       // 30
};                                                                                                                   // 21
                                                                                                                     //
                                                                                                                     // 33
/*                                                                                                                   // 33
  Log a user in with their password                                                                                  //
 */                                                                                                                  //
                                                                                                                     //
this.Auth.loginWithPassword = function(user, password) {                                                             // 1
  var authToken, authenticatingUser, authenticatingUserSelector, hashedToken, passwordVerification, ref;             // 37
  if (!user || !password) {                                                                                          // 37
    throw new Meteor.Error(401, 'Unauthorized');                                                                     // 38
  }                                                                                                                  //
  check(user, userValidator);                                                                                        // 37
  check(password, String);                                                                                           // 37
  authenticatingUserSelector = getUserQuerySelector(user);                                                           // 37
  authenticatingUser = Meteor.users.findOne(authenticatingUserSelector);                                             // 37
  if (!authenticatingUser) {                                                                                         // 48
    throw new Meteor.Error(401, 'Unauthorized');                                                                     // 49
  }                                                                                                                  //
  if (!((ref = authenticatingUser.services) != null ? ref.password : void 0)) {                                      // 50
    throw new Meteor.Error(401, 'Unauthorized');                                                                     // 51
  }                                                                                                                  //
  passwordVerification = Accounts._checkPassword(authenticatingUser, password);                                      // 37
  if (passwordVerification.error) {                                                                                  // 55
    throw new Meteor.Error(401, 'Unauthorized');                                                                     // 56
  }                                                                                                                  //
  authToken = Accounts._generateStampedLoginToken();                                                                 // 37
  hashedToken = Accounts._hashLoginToken(authToken.token);                                                           // 37
  Accounts._insertHashedLoginToken(authenticatingUser._id, {                                                         // 37
    hashedToken: hashedToken                                                                                         // 61
  });                                                                                                                //
  return {                                                                                                           // 63
    authToken: authToken.token,                                                                                      // 63
    userId: authenticatingUser._id                                                                                   // 63
  };                                                                                                                 //
};                                                                                                                   // 36
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/nimble_restivus/lib/iron-router-error-to-response.js                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// We need a function that treats thrown errors exactly like Iron Router would.                                      // 1
// This file is written in JavaScript to enable copy-pasting Iron Router code.                                       // 2
                                                                                                                     // 3
// Taken from: https://github.com/iron-meteor/iron-router/blob/9c369499c98af9fd12ef9e68338dee3b1b1276aa/lib/router_server.js#L3
var env = process.env.NODE_ENV || 'development';                                                                     // 5
                                                                                                                     // 6
// Taken from: https://github.com/iron-meteor/iron-router/blob/9c369499c98af9fd12ef9e68338dee3b1b1276aa/lib/router_server.js#L47
ironRouterSendErrorToResponse = function (err, req, res) {                                                           // 8
  if (res.statusCode < 400)                                                                                          // 9
    res.statusCode = 500;                                                                                            // 10
                                                                                                                     // 11
  if (err.status)                                                                                                    // 12
    res.statusCode = err.status;                                                                                     // 13
                                                                                                                     // 14
  if (env === 'development')                                                                                         // 15
    msg = (err.stack || err.toString()) + '\n';                                                                      // 16
  else                                                                                                               // 17
    //XXX get this from standard dict of error messages?                                                             // 18
    msg = 'Server error.';                                                                                           // 19
                                                                                                                     // 20
  console.error(err.stack || err.toString());                                                                        // 21
                                                                                                                     // 22
  if (res.headersSent)                                                                                               // 23
    return req.socket.destroy();                                                                                     // 24
                                                                                                                     // 25
  res.setHeader('Content-Type', 'text/html');                                                                        // 26
  res.setHeader('Content-Length', Buffer.byteLength(msg));                                                           // 27
  if (req.method === 'HEAD')                                                                                         // 28
    return res.end();                                                                                                // 29
  res.end(msg);                                                                                                      // 30
  return;                                                                                                            // 31
}                                                                                                                    // 32
                                                                                                                     // 33
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/nimble_restivus/lib/route.coffee.js                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
share.Route = (function() {                                                                                          // 1
  function Route(api, path, options, endpoints1) {                                                                   // 3
    this.api = api;                                                                                                  // 5
    this.path = path;                                                                                                // 5
    this.options = options;                                                                                          // 5
    this.endpoints = endpoints1;                                                                                     // 5
    if (!this.endpoints) {                                                                                           // 5
      this.endpoints = this.options;                                                                                 // 6
      this.options = {};                                                                                             // 6
    }                                                                                                                //
  }                                                                                                                  //
                                                                                                                     //
  Route.prototype.addToApi = (function() {                                                                           // 3
    var availableMethods;                                                                                            // 11
    availableMethods = ['get', 'post', 'put', 'patch', 'delete', 'options'];                                         // 11
    return function() {                                                                                              // 13
      var allowedMethods, fullPath, rejectedMethods, self;                                                           // 14
      self = this;                                                                                                   // 14
      if (_.contains(this.api._config.paths, this.path)) {                                                           // 18
        throw new Error("Cannot add a route at an existing path: " + this.path);                                     // 19
      }                                                                                                              //
      this.endpoints = _.extend({                                                                                    // 14
        options: this.api._config.defaultOptionsEndpoint                                                             // 22
      }, this.endpoints);                                                                                            //
      this._resolveEndpoints();                                                                                      // 14
      this._configureEndpoints();                                                                                    // 14
      this.api._config.paths.push(this.path);                                                                        // 14
      allowedMethods = _.filter(availableMethods, function(method) {                                                 // 14
        return _.contains(_.keys(self.endpoints), method);                                                           //
      });                                                                                                            //
      rejectedMethods = _.reject(availableMethods, function(method) {                                                // 14
        return _.contains(_.keys(self.endpoints), method);                                                           //
      });                                                                                                            //
      fullPath = this.api._config.apiPath + this.path;                                                               // 14
      _.each(allowedMethods, function(method) {                                                                      // 14
        var endpoint;                                                                                                // 39
        endpoint = self.endpoints[method];                                                                           // 39
        return JsonRoutes.add(method, fullPath, function(req, res) {                                                 //
          var doneFunc, endpointContext, error, responseData, responseInitiated;                                     // 42
          responseInitiated = false;                                                                                 // 42
          doneFunc = function() {                                                                                    // 42
            return responseInitiated = true;                                                                         //
          };                                                                                                         //
          endpointContext = {                                                                                        // 42
            urlParams: req.params,                                                                                   // 47
            queryParams: req.query,                                                                                  // 47
            bodyParams: req.body,                                                                                    // 47
            request: req,                                                                                            // 47
            response: res,                                                                                           // 47
            done: doneFunc                                                                                           // 47
          };                                                                                                         //
          _.extend(endpointContext, endpoint);                                                                       // 42
          responseData = null;                                                                                       // 42
          try {                                                                                                      // 58
            responseData = self._callEndpoint(endpointContext, endpoint);                                            // 59
            if (responseData === null || responseData === void 0) {                                                  // 60
              throw new Error("Cannot return null or undefined from an endpoint: " + method + " " + fullPath);       // 61
            }                                                                                                        //
            if (res.headersSent && !responseInitiated) {                                                             // 62
              throw new Error("Must call this.done() after handling endpoint response manually: " + method + " " + fullPath);
            }                                                                                                        //
          } catch (_error) {                                                                                         //
            error = _error;                                                                                          // 66
            ironRouterSendErrorToResponse(error, req, res);                                                          // 66
            return;                                                                                                  // 67
          }                                                                                                          //
          if (responseInitiated) {                                                                                   // 69
            res.end();                                                                                               // 71
            return;                                                                                                  // 72
          }                                                                                                          //
          if (responseData.body && (responseData.statusCode || responseData.headers)) {                              // 75
            return self._respond(res, responseData.body, responseData.statusCode, responseData.headers);             //
          } else {                                                                                                   //
            return self._respond(res, responseData);                                                                 //
          }                                                                                                          //
        });                                                                                                          //
      });                                                                                                            //
      return _.each(rejectedMethods, function(method) {                                                              //
        return JsonRoutes.add(method, fullPath, function(req, res) {                                                 //
          var headers, responseData;                                                                                 // 81
          responseData = {                                                                                           // 81
            status: 'error',                                                                                         // 81
            message: 'API endpoint does not exist'                                                                   // 81
          };                                                                                                         //
          headers = {                                                                                                // 81
            'Allow': allowedMethods.join(', ').toUpperCase()                                                         // 82
          };                                                                                                         //
          return self._respond(res, responseData, 405, headers);                                                     //
        });                                                                                                          //
      });                                                                                                            //
    };                                                                                                               //
  })();                                                                                                              //
                                                                                                                     //
                                                                                                                     // 86
  /*                                                                                                                 // 86
    Convert all endpoints on the given route into our expected endpoint object if it is a bare                       //
    function                                                                                                         //
                                                                                                                     //
    @param {Route} route The route the endpoints belong to                                                           //
   */                                                                                                                //
                                                                                                                     //
  Route.prototype._resolveEndpoints = function() {                                                                   // 3
    _.each(this.endpoints, function(endpoint, method, endpoints) {                                                   // 93
      if (_.isFunction(endpoint)) {                                                                                  // 94
        return endpoints[method] = {                                                                                 //
          action: endpoint                                                                                           // 95
        };                                                                                                           //
      }                                                                                                              //
    });                                                                                                              //
  };                                                                                                                 //
                                                                                                                     //
                                                                                                                     // 99
  /*                                                                                                                 // 99
    Configure the authentication and role requirement on all endpoints (except OPTIONS, which must                   //
    be configured directly on the endpoint)                                                                          //
                                                                                                                     //
    Authentication can be required on an entire route or individual endpoints. If required on an                     //
    entire route, that serves as the default. If required in any individual endpoints, that will                     //
    override the default.                                                                                            //
                                                                                                                     //
    After the endpoint is configured, all authentication and role requirements of an endpoint can be                 //
    accessed at <code>endpoint.authRequired</code> and <code>endpoint.roleRequired</code>,                           //
    respectively.                                                                                                    //
                                                                                                                     //
    @param {Route} route The route the endpoints belong to                                                           //
    @param {Endpoint} endpoint The endpoint to configure                                                             //
   */                                                                                                                //
                                                                                                                     //
  Route.prototype._configureEndpoints = function() {                                                                 // 3
    _.each(this.endpoints, function(endpoint, method) {                                                              // 115
      var ref, ref1;                                                                                                 // 116
      if (method !== 'options') {                                                                                    // 116
        if (!((ref = this.options) != null ? ref.roleRequired : void 0)) {                                           // 118
          this.options.roleRequired = [];                                                                            // 119
        }                                                                                                            //
        if (!endpoint.roleRequired) {                                                                                // 120
          endpoint.roleRequired = [];                                                                                // 121
        }                                                                                                            //
        endpoint.roleRequired = _.union(endpoint.roleRequired, this.options.roleRequired);                           // 118
        if (_.isEmpty(endpoint.roleRequired)) {                                                                      // 124
          endpoint.roleRequired = false;                                                                             // 125
        }                                                                                                            //
        if (endpoint.authRequired === void 0) {                                                                      // 128
          if (((ref1 = this.options) != null ? ref1.authRequired : void 0) || endpoint.roleRequired) {               // 129
            endpoint.authRequired = true;                                                                            // 130
          } else {                                                                                                   //
            endpoint.authRequired = false;                                                                           // 132
          }                                                                                                          //
        }                                                                                                            //
      }                                                                                                              //
    }, this);                                                                                                        //
  };                                                                                                                 //
                                                                                                                     //
                                                                                                                     // 138
  /*                                                                                                                 // 138
    Authenticate an endpoint if required, and return the result of calling it                                        //
                                                                                                                     //
    @returns The endpoint response or a 401 if authentication fails                                                  //
   */                                                                                                                //
                                                                                                                     //
  Route.prototype._callEndpoint = function(endpointContext, endpoint) {                                              // 3
    if (this._authAccepted(endpointContext, endpoint)) {                                                             // 145
      if (this._roleAccepted(endpointContext, endpoint)) {                                                           // 146
        return endpoint.action.call(endpointContext);                                                                //
      } else {                                                                                                       //
        return {                                                                                                     //
          statusCode: 403,                                                                                           // 149
          body: {                                                                                                    // 149
            status: 'error',                                                                                         // 150
            message: 'You do not have permission to do this.'                                                        // 150
          }                                                                                                          //
        };                                                                                                           //
      }                                                                                                              //
    } else {                                                                                                         //
      return {                                                                                                       //
        statusCode: 401,                                                                                             // 152
        body: {                                                                                                      // 152
          status: 'error',                                                                                           // 153
          message: 'You must be logged in to do this.'                                                               // 153
        }                                                                                                            //
      };                                                                                                             //
    }                                                                                                                //
  };                                                                                                                 //
                                                                                                                     //
                                                                                                                     // 156
  /*                                                                                                                 // 156
    Authenticate the given endpoint if required                                                                      //
                                                                                                                     //
    Once it's globally configured in the API, authentication can be required on an entire route or                   //
    individual endpoints. If required on an entire endpoint, that serves as the default. If required                 //
    in any individual endpoints, that will override the default.                                                     //
                                                                                                                     //
    @returns False if authentication fails, and true otherwise                                                       //
   */                                                                                                                //
                                                                                                                     //
  Route.prototype._authAccepted = function(endpointContext, endpoint) {                                              // 3
    if (endpoint.authRequired) {                                                                                     // 166
      return this._authenticate(endpointContext);                                                                    //
    } else {                                                                                                         //
      return true;                                                                                                   //
    }                                                                                                                //
  };                                                                                                                 //
                                                                                                                     //
                                                                                                                     // 171
  /*                                                                                                                 // 171
    Verify the request is being made by an actively logged in user                                                   //
                                                                                                                     //
    If verified, attach the authenticated user to the context.                                                       //
                                                                                                                     //
    @returns {Boolean} True if the authentication was successful                                                     //
   */                                                                                                                //
                                                                                                                     //
  Route.prototype._authenticate = function(endpointContext) {                                                        // 3
    var auth, userSelector;                                                                                          // 180
    auth = this.api._config.auth.user.call(endpointContext);                                                         // 180
    if ((auth != null ? auth.userId : void 0) && (auth != null ? auth.token : void 0) && !(auth != null ? auth.user : void 0)) {
      userSelector = {};                                                                                             // 184
      userSelector._id = auth.userId;                                                                                // 184
      userSelector[this.api._config.auth.token] = auth.token;                                                        // 184
      auth.user = Meteor.users.findOne(userSelector);                                                                // 184
    }                                                                                                                //
    if (auth != null ? auth.user : void 0) {                                                                         // 190
      endpointContext.user = auth.user;                                                                              // 191
      endpointContext.userId = auth.user._id;                                                                        // 191
      return true;                                                                                                   //
    } else {                                                                                                         //
      return false;                                                                                                  //
    }                                                                                                                //
  };                                                                                                                 //
                                                                                                                     //
                                                                                                                     // 197
  /*                                                                                                                 // 197
    Authenticate the user role if required                                                                           //
                                                                                                                     //
    Must be called after _authAccepted().                                                                            //
                                                                                                                     //
    @returns True if the authenticated user belongs to <i>any</i> of the acceptable roles on the                     //
             endpoint                                                                                                //
   */                                                                                                                //
                                                                                                                     //
  Route.prototype._roleAccepted = function(endpointContext, endpoint) {                                              // 3
    if (endpoint.roleRequired) {                                                                                     // 206
      if (_.isEmpty(_.intersection(endpoint.roleRequired, endpointContext.user.roles))) {                            // 207
        return false;                                                                                                // 208
      }                                                                                                              //
    }                                                                                                                //
    return true;                                                                                                     //
  };                                                                                                                 //
                                                                                                                     //
                                                                                                                     // 212
  /*                                                                                                                 // 212
    Respond to an HTTP request                                                                                       //
   */                                                                                                                //
                                                                                                                     //
  Route.prototype._respond = function(response, body, statusCode, headers) {                                         // 3
    var defaultHeaders, delayInMilliseconds, minimumDelayInMilliseconds, randomMultiplierBetweenOneAndTwo, sendResponse;
    if (statusCode == null) {                                                                                        //
      statusCode = 200;                                                                                              //
    }                                                                                                                //
    if (headers == null) {                                                                                           //
      headers = {};                                                                                                  //
    }                                                                                                                //
    defaultHeaders = this._lowerCaseKeys(this.api._config.defaultHeaders);                                           // 218
    headers = this._lowerCaseKeys(headers);                                                                          // 218
    headers = _.extend(defaultHeaders, headers);                                                                     // 218
    if (headers['content-type'].match(/json|javascript/) !== null) {                                                 // 223
      if (this.api._config.prettyJson) {                                                                             // 224
        body = JSON.stringify(body, void 0, 2);                                                                      // 225
      } else {                                                                                                       //
        body = JSON.stringify(body);                                                                                 // 227
      }                                                                                                              //
    }                                                                                                                //
    sendResponse = function() {                                                                                      // 218
      response.writeHead(statusCode, headers);                                                                       // 231
      response.write(body);                                                                                          // 231
      return response.end();                                                                                         //
    };                                                                                                               //
    if (statusCode === 401 || statusCode === 403) {                                                                  // 234
      minimumDelayInMilliseconds = 500;                                                                              // 241
      randomMultiplierBetweenOneAndTwo = 1 + Math.random();                                                          // 241
      delayInMilliseconds = minimumDelayInMilliseconds * randomMultiplierBetweenOneAndTwo;                           // 241
      return Meteor.setTimeout(sendResponse, delayInMilliseconds);                                                   //
    } else {                                                                                                         //
      return sendResponse();                                                                                         //
    }                                                                                                                //
  };                                                                                                                 //
                                                                                                                     //
                                                                                                                     // 248
  /*                                                                                                                 // 248
    Return the object with all of the keys converted to lowercase                                                    //
   */                                                                                                                //
                                                                                                                     //
  Route.prototype._lowerCaseKeys = function(object) {                                                                // 3
    return _.chain(object).pairs().map(function(attr) {                                                              //
      return [attr[0].toLowerCase(), attr[1]];                                                                       //
    }).object().value();                                                                                             //
  };                                                                                                                 //
                                                                                                                     //
  return Route;                                                                                                      //
                                                                                                                     //
})();                                                                                                                //
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/nimble_restivus/lib/restivus.coffee.js                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var                                                                                                                  // 1
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
                                                                                                                     //
this.Restivus = (function() {                                                                                        // 1
  function Restivus(options) {                                                                                       // 3
    var corsHeaders;                                                                                                 // 4
    this._routes = [];                                                                                               // 4
    this._config = {                                                                                                 // 4
      paths: [],                                                                                                     // 6
      useDefaultAuth: false,                                                                                         // 6
      apiPath: 'api/',                                                                                               // 6
      version: null,                                                                                                 // 6
      prettyJson: false,                                                                                             // 6
      auth: {                                                                                                        // 6
        token: 'services.resume.loginTokens.hashedToken',                                                            // 12
        user: function() {                                                                                           // 12
          var token;                                                                                                 // 14
          if (this.request.headers['x-auth-token']) {                                                                // 14
            token = Accounts._hashLoginToken(this.request.headers['x-auth-token']);                                  // 15
          }                                                                                                          //
          return {                                                                                                   //
            userId: this.request.headers['x-user-id'],                                                               // 16
            token: token                                                                                             // 16
          };                                                                                                         //
        }                                                                                                            //
      },                                                                                                             //
      onLoggedIn: function() {                                                                                       // 6
        return {};                                                                                                   //
      },                                                                                                             //
      onLoggedOut: function() {                                                                                      // 6
        return {};                                                                                                   //
      },                                                                                                             //
      defaultHeaders: {                                                                                              // 6
        'Content-Type': 'application/json'                                                                           // 21
      },                                                                                                             //
      enableCors: true                                                                                               // 6
    };                                                                                                               //
    _.extend(this._config, options);                                                                                 // 4
    if (this._config.enableCors) {                                                                                   // 27
      corsHeaders = {                                                                                                // 28
        'Access-Control-Allow-Origin': '*',                                                                          // 29
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'                             // 29
      };                                                                                                             //
      if (this._config.useDefaultAuth) {                                                                             // 32
        corsHeaders['Access-Control-Allow-Headers'] += ', X-User-Id, X-Auth-Token';                                  // 33
      }                                                                                                              //
      _.extend(this._config.defaultHeaders, corsHeaders);                                                            // 28
      if (!this._config.defaultOptionsEndpoint) {                                                                    // 38
        this._config.defaultOptionsEndpoint = function() {                                                           // 39
          this.response.writeHead(200, corsHeaders);                                                                 // 40
          return this.done();                                                                                        //
        };                                                                                                           //
      }                                                                                                              //
    }                                                                                                                //
    if (this._config.apiPath[0] === '/') {                                                                           // 44
      this._config.apiPath = this._config.apiPath.slice(1);                                                          // 45
    }                                                                                                                //
    if (_.last(this._config.apiPath) !== '/') {                                                                      // 46
      this._config.apiPath = this._config.apiPath + '/';                                                             // 47
    }                                                                                                                //
    if (this._config.version) {                                                                                      // 51
      this._config.apiPath += this._config.version + '/';                                                            // 52
    }                                                                                                                //
    if (this._config.useDefaultAuth) {                                                                               // 55
      this._initAuth();                                                                                              // 56
    } else if (this._config.useAuth) {                                                                               //
      this._initAuth();                                                                                              // 58
      console.warn('Warning: useAuth API config option will be removed in Restivus v1.0 ' + '\n    Use the useDefaultAuth option instead');
    }                                                                                                                //
    return this;                                                                                                     // 62
  }                                                                                                                  //
                                                                                                                     //
                                                                                                                     // 65
  /**                                                                                                                // 65
    Add endpoints for the given HTTP methods at the given path                                                       //
                                                                                                                     //
    @param path {String} The extended URL path (will be appended to base path of the API)                            //
    @param options {Object} Route configuration options                                                              //
    @param options.authRequired {Boolean} The default auth requirement for each endpoint on the route                //
    @param options.roleRequired {String or String[]} The default role required for each endpoint on the route        //
    @param endpoints {Object} A set of endpoints available on the new route (get, post, put, patch, delete, options)
    @param endpoints.<method> {Function or Object} If a function is provided, all default route                      //
        configuration options will be applied to the endpoint. Otherwise an object with an `action`                  //
        and all other route config options available. An `action` must be provided with the object.                  //
   */                                                                                                                //
                                                                                                                     //
  Restivus.prototype.addRoute = function(path, options, endpoints) {                                                 // 3
    var route;                                                                                                       // 79
    route = new share.Route(this, path, options, endpoints);                                                         // 79
    this._routes.push(route);                                                                                        // 79
    route.addToApi();                                                                                                // 79
    return this;                                                                                                     // 84
  };                                                                                                                 //
                                                                                                                     //
                                                                                                                     // 87
  /**                                                                                                                // 87
    Generate routes for the Meteor Collection with the given name                                                    //
   */                                                                                                                //
                                                                                                                     //
  Restivus.prototype.addCollection = function(collection, options) {                                                 // 3
    var collectionEndpoints, collectionRouteEndpoints, endpointsAwaitingConfiguration, entityRouteEndpoints, excludedEndpoints, methods, methodsOnCollection, path, routeOptions;
    if (options == null) {                                                                                           //
      options = {};                                                                                                  //
    }                                                                                                                //
    methods = ['get', 'post', 'put', 'delete', 'getAll'];                                                            // 91
    methodsOnCollection = ['post', 'getAll'];                                                                        // 91
    if (collection === Meteor.users) {                                                                               // 95
      collectionEndpoints = this._userCollectionEndpoints;                                                           // 96
    } else {                                                                                                         //
      collectionEndpoints = this._collectionEndpoints;                                                               // 98
    }                                                                                                                //
    endpointsAwaitingConfiguration = options.endpoints || {};                                                        // 91
    routeOptions = options.routeOptions || {};                                                                       // 91
    excludedEndpoints = options.excludedEndpoints || [];                                                             // 91
    path = options.path || collection._name;                                                                         // 91
    collectionRouteEndpoints = {};                                                                                   // 91
    entityRouteEndpoints = {};                                                                                       // 91
    if (_.isEmpty(endpointsAwaitingConfiguration) && _.isEmpty(excludedEndpoints)) {                                 // 111
      _.each(methods, function(method) {                                                                             // 113
        if (indexOf.call(methodsOnCollection, method) >= 0) {                                                        // 115
          _.extend(collectionRouteEndpoints, collectionEndpoints[method].call(this, collection));                    // 116
        } else {                                                                                                     //
          _.extend(entityRouteEndpoints, collectionEndpoints[method].call(this, collection));                        // 117
        }                                                                                                            //
      }, this);                                                                                                      //
    } else {                                                                                                         //
      _.each(methods, function(method) {                                                                             // 122
        var configuredEndpoint, endpointOptions;                                                                     // 123
        if (indexOf.call(excludedEndpoints, method) < 0 && endpointsAwaitingConfiguration[method] !== false) {       // 123
          endpointOptions = endpointsAwaitingConfiguration[method];                                                  // 126
          configuredEndpoint = {};                                                                                   // 126
          _.each(collectionEndpoints[method].call(this, collection), function(action, methodType) {                  // 126
            return configuredEndpoint[methodType] = _.chain(action).clone().extend(endpointOptions).value();         //
          });                                                                                                        //
          if (indexOf.call(methodsOnCollection, method) >= 0) {                                                      // 135
            _.extend(collectionRouteEndpoints, configuredEndpoint);                                                  // 136
          } else {                                                                                                   //
            _.extend(entityRouteEndpoints, configuredEndpoint);                                                      // 137
          }                                                                                                          //
        }                                                                                                            //
      }, this);                                                                                                      //
    }                                                                                                                //
    this.addRoute(path, routeOptions, collectionRouteEndpoints);                                                     // 91
    this.addRoute(path + "/:id", routeOptions, entityRouteEndpoints);                                                // 91
    return this;                                                                                                     // 145
  };                                                                                                                 //
                                                                                                                     //
                                                                                                                     // 148
  /**                                                                                                                // 148
    A set of endpoints that can be applied to a Collection Route                                                     //
   */                                                                                                                //
                                                                                                                     //
  Restivus.prototype._collectionEndpoints = {                                                                        // 3
    get: function(collection) {                                                                                      // 152
      return {                                                                                                       //
        get: {                                                                                                       // 153
          action: function() {                                                                                       // 154
            var entity;                                                                                              // 155
            entity = collection.findOne(this.urlParams.id);                                                          // 155
            if (entity) {                                                                                            // 156
              return {                                                                                               //
                status: 'success',                                                                                   // 157
                data: entity                                                                                         // 157
              };                                                                                                     //
            } else {                                                                                                 //
              return {                                                                                               //
                statusCode: 404,                                                                                     // 159
                body: {                                                                                              // 159
                  status: 'fail',                                                                                    // 160
                  message: 'Item not found'                                                                          // 160
                }                                                                                                    //
              };                                                                                                     //
            }                                                                                                        //
          }                                                                                                          //
        }                                                                                                            //
      };                                                                                                             //
    },                                                                                                               //
    put: function(collection) {                                                                                      // 152
      return {                                                                                                       //
        put: {                                                                                                       // 162
          action: function() {                                                                                       // 163
            var entity, entityIsUpdated;                                                                             // 164
            entityIsUpdated = collection.update(this.urlParams.id, this.bodyParams);                                 // 164
            if (entityIsUpdated) {                                                                                   // 165
              entity = collection.findOne(this.urlParams.id);                                                        // 166
              return {                                                                                               //
                status: 'success',                                                                                   // 167
                data: entity                                                                                         // 167
              };                                                                                                     //
            } else {                                                                                                 //
              return {                                                                                               //
                statusCode: 404,                                                                                     // 169
                body: {                                                                                              // 169
                  status: 'fail',                                                                                    // 170
                  message: 'Item not found'                                                                          // 170
                }                                                                                                    //
              };                                                                                                     //
            }                                                                                                        //
          }                                                                                                          //
        }                                                                                                            //
      };                                                                                                             //
    },                                                                                                               //
    "delete": function(collection) {                                                                                 // 152
      return {                                                                                                       //
        "delete": {                                                                                                  // 172
          action: function() {                                                                                       // 173
            if (collection.remove(this.urlParams.id)) {                                                              // 174
              return {                                                                                               //
                status: 'success',                                                                                   // 175
                data: {                                                                                              // 175
                  message: 'Item removed'                                                                            // 175
                }                                                                                                    //
              };                                                                                                     //
            } else {                                                                                                 //
              return {                                                                                               //
                statusCode: 404,                                                                                     // 177
                body: {                                                                                              // 177
                  status: 'fail',                                                                                    // 178
                  message: 'Item not found'                                                                          // 178
                }                                                                                                    //
              };                                                                                                     //
            }                                                                                                        //
          }                                                                                                          //
        }                                                                                                            //
      };                                                                                                             //
    },                                                                                                               //
    post: function(collection) {                                                                                     // 152
      return {                                                                                                       //
        post: {                                                                                                      // 180
          action: function() {                                                                                       // 181
            var entity, entityId;                                                                                    // 182
            entityId = collection.insert(this.bodyParams);                                                           // 182
            entity = collection.findOne(entityId);                                                                   // 182
            if (entity) {                                                                                            // 184
              return {                                                                                               //
                statusCode: 201,                                                                                     // 185
                body: {                                                                                              // 185
                  status: 'success',                                                                                 // 186
                  data: entity                                                                                       // 186
                }                                                                                                    //
              };                                                                                                     //
            } else {                                                                                                 //
              return {                                                                                               //
                statusCode: 400,                                                                                     // 188
                body: {                                                                                              // 188
                  status: 'fail',                                                                                    // 189
                  message: 'No item added'                                                                           // 189
                }                                                                                                    //
              };                                                                                                     //
            }                                                                                                        //
          }                                                                                                          //
        }                                                                                                            //
      };                                                                                                             //
    },                                                                                                               //
    getAll: function(collection) {                                                                                   // 152
      return {                                                                                                       //
        get: {                                                                                                       // 191
          action: function() {                                                                                       // 192
            var entities;                                                                                            // 193
            entities = collection.find().fetch();                                                                    // 193
            if (entities) {                                                                                          // 194
              return {                                                                                               //
                status: 'success',                                                                                   // 195
                data: entities                                                                                       // 195
              };                                                                                                     //
            } else {                                                                                                 //
              return {                                                                                               //
                statusCode: 404,                                                                                     // 197
                body: {                                                                                              // 197
                  status: 'fail',                                                                                    // 198
                  message: 'Unable to retrieve items from collection'                                                // 198
                }                                                                                                    //
              };                                                                                                     //
            }                                                                                                        //
          }                                                                                                          //
        }                                                                                                            //
      };                                                                                                             //
    }                                                                                                                //
  };                                                                                                                 //
                                                                                                                     //
                                                                                                                     // 201
  /**                                                                                                                // 201
    A set of endpoints that can be applied to a Meteor.users Collection Route                                        //
   */                                                                                                                //
                                                                                                                     //
  Restivus.prototype._userCollectionEndpoints = {                                                                    // 3
    get: function(collection) {                                                                                      // 205
      return {                                                                                                       //
        get: {                                                                                                       // 206
          action: function() {                                                                                       // 207
            var entity;                                                                                              // 208
            entity = collection.findOne(this.urlParams.id, {                                                         // 208
              fields: {                                                                                              // 208
                profile: 1                                                                                           // 208
              }                                                                                                      //
            });                                                                                                      //
            if (entity) {                                                                                            // 209
              return {                                                                                               //
                status: 'success',                                                                                   // 210
                data: entity                                                                                         // 210
              };                                                                                                     //
            } else {                                                                                                 //
              return {                                                                                               //
                statusCode: 404,                                                                                     // 212
                body: {                                                                                              // 212
                  status: 'fail',                                                                                    // 213
                  message: 'User not found'                                                                          // 213
                }                                                                                                    //
              };                                                                                                     //
            }                                                                                                        //
          }                                                                                                          //
        }                                                                                                            //
      };                                                                                                             //
    },                                                                                                               //
    put: function(collection) {                                                                                      // 205
      return {                                                                                                       //
        put: {                                                                                                       // 215
          action: function() {                                                                                       // 216
            var entity, entityIsUpdated;                                                                             // 217
            entityIsUpdated = collection.update(this.urlParams.id, {                                                 // 217
              $set: {                                                                                                // 217
                profile: this.bodyParams                                                                             // 217
              }                                                                                                      //
            });                                                                                                      //
            if (entityIsUpdated) {                                                                                   // 218
              entity = collection.findOne(this.urlParams.id, {                                                       // 219
                fields: {                                                                                            // 219
                  profile: 1                                                                                         // 219
                }                                                                                                    //
              });                                                                                                    //
              return {                                                                                               //
                status: "success",                                                                                   // 220
                data: entity                                                                                         // 220
              };                                                                                                     //
            } else {                                                                                                 //
              return {                                                                                               //
                statusCode: 404,                                                                                     // 222
                body: {                                                                                              // 222
                  status: 'fail',                                                                                    // 223
                  message: 'User not found'                                                                          // 223
                }                                                                                                    //
              };                                                                                                     //
            }                                                                                                        //
          }                                                                                                          //
        }                                                                                                            //
      };                                                                                                             //
    },                                                                                                               //
    "delete": function(collection) {                                                                                 // 205
      return {                                                                                                       //
        "delete": {                                                                                                  // 225
          action: function() {                                                                                       // 226
            if (collection.remove(this.urlParams.id)) {                                                              // 227
              return {                                                                                               //
                status: 'success',                                                                                   // 228
                data: {                                                                                              // 228
                  message: 'User removed'                                                                            // 228
                }                                                                                                    //
              };                                                                                                     //
            } else {                                                                                                 //
              return {                                                                                               //
                statusCode: 404,                                                                                     // 230
                body: {                                                                                              // 230
                  status: 'fail',                                                                                    // 231
                  message: 'User not found'                                                                          // 231
                }                                                                                                    //
              };                                                                                                     //
            }                                                                                                        //
          }                                                                                                          //
        }                                                                                                            //
      };                                                                                                             //
    },                                                                                                               //
    post: function(collection) {                                                                                     // 205
      return {                                                                                                       //
        post: {                                                                                                      // 233
          action: function() {                                                                                       // 234
            var entity, entityId;                                                                                    // 236
            entityId = Accounts.createUser(this.bodyParams);                                                         // 236
            entity = collection.findOne(entityId, {                                                                  // 236
              fields: {                                                                                              // 237
                profile: 1                                                                                           // 237
              }                                                                                                      //
            });                                                                                                      //
            if (entity) {                                                                                            // 238
              return {                                                                                               //
                statusCode: 201,                                                                                     // 239
                body: {                                                                                              // 239
                  status: 'success',                                                                                 // 240
                  data: entity                                                                                       // 240
                }                                                                                                    //
              };                                                                                                     //
            } else {                                                                                                 //
              ({                                                                                                     // 242
                statusCode: 400                                                                                      // 242
              });                                                                                                    //
              return {                                                                                               //
                status: 'fail',                                                                                      // 243
                message: 'No user added'                                                                             // 243
              };                                                                                                     //
            }                                                                                                        //
          }                                                                                                          //
        }                                                                                                            //
      };                                                                                                             //
    },                                                                                                               //
    getAll: function(collection) {                                                                                   // 205
      return {                                                                                                       //
        get: {                                                                                                       // 245
          action: function() {                                                                                       // 246
            var entities;                                                                                            // 247
            entities = collection.find({}, {                                                                         // 247
              fields: {                                                                                              // 247
                profile: 1                                                                                           // 247
              }                                                                                                      //
            }).fetch();                                                                                              //
            if (entities) {                                                                                          // 248
              return {                                                                                               //
                status: 'success',                                                                                   // 249
                data: entities                                                                                       // 249
              };                                                                                                     //
            } else {                                                                                                 //
              return {                                                                                               //
                statusCode: 404,                                                                                     // 251
                body: {                                                                                              // 251
                  status: 'fail',                                                                                    // 252
                  message: 'Unable to retrieve users'                                                                // 252
                }                                                                                                    //
              };                                                                                                     //
            }                                                                                                        //
          }                                                                                                          //
        }                                                                                                            //
      };                                                                                                             //
    }                                                                                                                //
  };                                                                                                                 //
                                                                                                                     //
                                                                                                                     // 255
  /*                                                                                                                 // 255
    Add /login and /logout endpoints to the API                                                                      //
   */                                                                                                                //
                                                                                                                     //
  Restivus.prototype._initAuth = function() {                                                                        // 3
    var logout, self;                                                                                                // 259
    self = this;                                                                                                     // 259
                                                                                                                     // 260
    /*                                                                                                               // 260
      Add a login endpoint to the API                                                                                //
                                                                                                                     //
      After the user is logged in, the onLoggedIn hook is called (see Restfully.configure() for                      //
      adding hook).                                                                                                  //
     */                                                                                                              //
    this.addRoute('login', {                                                                                         // 259
      authRequired: false                                                                                            // 266
    }, {                                                                                                             //
      post: function() {                                                                                             // 267
        var auth, e, loginResult, ref, searchQuery, user;                                                            // 269
        user = {};                                                                                                   // 269
        if (this.bodyParams.user) {                                                                                  // 270
          if (this.bodyParams.user.indexOf('@') === -1) {                                                            // 271
            user.username = this.bodyParams.user;                                                                    // 272
          } else {                                                                                                   //
            user.email = this.bodyParams.user;                                                                       // 274
          }                                                                                                          //
        } else if (this.bodyParams.username) {                                                                       //
          user.username = this.bodyParams.username;                                                                  // 276
        } else if (this.bodyParams.email) {                                                                          //
          user.email = this.bodyParams.email;                                                                        // 278
        }                                                                                                            //
        try {                                                                                                        // 281
          auth = Auth.loginWithPassword(user, this.bodyParams.password);                                             // 282
        } catch (_error) {                                                                                           //
          e = _error;                                                                                                // 284
          return {                                                                                                   // 284
            statusCode: e.error,                                                                                     // 285
            body: {                                                                                                  // 285
              status: 'error',                                                                                       // 286
              message: e.reason                                                                                      // 286
            }                                                                                                        //
          };                                                                                                         //
        }                                                                                                            //
        if (auth.userId && auth.authToken) {                                                                         // 290
          searchQuery = {};                                                                                          // 291
          searchQuery[self._config.auth.token] = Accounts._hashLoginToken(auth.authToken);                           // 291
          this.user = Meteor.users.findOne({                                                                         // 291
            '_id': auth.userId                                                                                       // 294
          }, searchQuery);                                                                                           //
          this.userId = (ref = this.user) != null ? ref._id : void 0;                                                // 291
        }                                                                                                            //
        loginResult = self._config.onLoggedIn.call(this);                                                            // 269
        if (loginResult != null) {                                                                                   // 300
          _.extend(auth, {                                                                                           // 301
            extra: loginResult                                                                                       // 301
          });                                                                                                        //
        }                                                                                                            //
        return {                                                                                                     //
          status: 'success',                                                                                         // 303
          data: auth                                                                                                 // 303
        };                                                                                                           //
      }                                                                                                              //
    });                                                                                                              //
    logout = function() {                                                                                            // 259
      var authToken, hashedToken, index, ref, tokenFieldName, tokenLocation, tokenPath, tokenRemovalQuery, tokenToRemove;
      authToken = this.request.headers['x-auth-token'];                                                              // 307
      hashedToken = Accounts._hashLoginToken(authToken);                                                             // 307
      tokenLocation = self._config.auth.token;                                                                       // 307
      index = tokenLocation.lastIndexOf('.');                                                                        // 307
      tokenPath = tokenLocation.substring(0, index);                                                                 // 307
      tokenFieldName = tokenLocation.substring(index + 1);                                                           // 307
      tokenToRemove = {};                                                                                            // 307
      tokenToRemove[tokenFieldName] = hashedToken;                                                                   // 307
      tokenRemovalQuery = {};                                                                                        // 307
      tokenRemovalQuery[tokenPath] = tokenToRemove;                                                                  // 307
      Meteor.users.update(this.user._id, {                                                                           // 307
        $pull: tokenRemovalQuery                                                                                     // 317
      });                                                                                                            //
      if ((ref = self._config.onLoggedOut) != null) {                                                                //
        ref.call(this);                                                                                              //
      }                                                                                                              //
      return {                                                                                                       //
        status: 'success',                                                                                           // 323
        data: {                                                                                                      // 323
          message: 'You\'ve been logged out!'                                                                        // 323
        }                                                                                                            //
      };                                                                                                             //
    };                                                                                                               //
                                                                                                                     // 325
    /*                                                                                                               // 325
      Add a logout endpoint to the API                                                                               //
                                                                                                                     //
      After the user is logged out, the onLoggedOut hook is called (see Restfully.configure() for                    //
      adding hook).                                                                                                  //
     */                                                                                                              //
    return this.addRoute('logout', {                                                                                 //
      authRequired: true                                                                                             // 331
    }, {                                                                                                             //
      get: function() {                                                                                              // 332
        console.warn("Warning: Default logout via GET will be removed in Restivus v1.0. Use POST instead.");         // 333
        console.warn("    See https://github.com/kahmali/meteor-restivus/issues/100");                               // 333
        return logout.call(this);                                                                                    // 335
      },                                                                                                             //
      post: logout                                                                                                   // 332
    });                                                                                                              //
  };                                                                                                                 //
                                                                                                                     //
  return Restivus;                                                                                                   //
                                                                                                                     //
})();                                                                                                                //
                                                                                                                     //
Restivus = this.Restivus;                                                                                            // 1
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['nimble:restivus'] = {
  Restivus: Restivus
};

})();

//# sourceMappingURL=nimble_restivus.js.map
