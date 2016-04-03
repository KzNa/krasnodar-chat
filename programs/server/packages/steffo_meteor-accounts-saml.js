(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RoutePolicy = Package.routepolicy.RoutePolicy;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var _ = Package.underscore._;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var HTTP = Package.http.HTTP;
var HTTPInternals = Package.http.HTTPInternals;
var Accounts = Package['accounts-base'].Accounts;
var AccountsServer = Package['accounts-base'].AccountsServer;

/* Package-scope variables */
var providerConfig, _saml, middleware, SAML, profile, decryptionCert, __coffeescriptShare;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steffo_meteor-accounts-saml/saml_server.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
if (!Accounts.saml) {                                                                                                  // 1
	Accounts.saml = {                                                                                                     // 2
		settings: {                                                                                                          // 3
			debug: true,                                                                                                        // 4
			generateUsername: false,                                                                                            // 5
			providers: []                                                                                                       // 6
		}                                                                                                                    // 7
	};                                                                                                                    // 8
}                                                                                                                      // 9
                                                                                                                       // 10
var Fiber = Npm.require('fibers');                                                                                     // 11
var connect = Npm.require('connect');                                                                                  // 12
RoutePolicy.declare('/_saml/', 'network');                                                                             // 13
                                                                                                                       // 14
Meteor.methods({                                                                                                       // 15
	samlLogout: function (provider) {                                                                                     // 16
		// Make sure the user is logged in before initiate SAML SLO                                                          // 17
		if (!Meteor.userId()) {                                                                                              // 18
			throw new Meteor.Error("not-authorized");                                                                           // 19
		}                                                                                                                    // 20
		var samlProvider = function (element) {                                                                              // 21
			return (element.provider == provider)                                                                               // 22
		}                                                                                                                    // 23
		providerConfig = Accounts.saml.settings.providers.filter(samlProvider)[0];                                           // 24
                                                                                                                       // 25
		if (Accounts.saml.settings.debug) {                                                                                  // 26
			console.log("Logout request from " + JSON.stringify(providerConfig));                                               // 27
		}                                                                                                                    // 28
		// This query should respect upcoming array of SAML logins                                                           // 29
		var user = Meteor.users.findOne({                                                                                    // 30
			_id: Meteor.userId(),                                                                                               // 31
			"services.saml.provider": provider                                                                                  // 32
		}, {                                                                                                                 // 33
			"services.saml": 1                                                                                                  // 34
		});                                                                                                                  // 35
		var nameID = user.services.saml.nameID;                                                                              // 36
		var sessionIndex = nameID = user.services.saml.idpSession;                                                           // 37
		if (Accounts.saml.settings.debug) {                                                                                  // 38
			console.log("NameID for user " + Meteor.userId() + " found: " + JSON.stringify(nameID));                            // 39
		}                                                                                                                    // 40
                                                                                                                       // 41
		_saml = new SAML(providerConfig);                                                                                    // 42
                                                                                                                       // 43
		var request = _saml.generateLogoutRequest({                                                                          // 44
			nameID: nameID,                                                                                                     // 45
			sessionIndex: sessionIndex                                                                                          // 46
		});                                                                                                                  // 47
                                                                                                                       // 48
		// request.request: actual XML SAML Request                                                                          // 49
		// request.id: comminucation id which will be mentioned in the ResponseTo field of SAMLResponse                      // 50
                                                                                                                       // 51
		Meteor.users.update({                                                                                                // 52
			_id: Meteor.userId()                                                                                                // 53
		}, {                                                                                                                 // 54
			$set: {                                                                                                             // 55
				'services.saml.inResponseTo': request.id                                                                           // 56
			}                                                                                                                   // 57
		});                                                                                                                  // 58
                                                                                                                       // 59
		var _syncRequestToUrl = Meteor.wrapAsync(_saml.requestToUrl, _saml);                                                 // 60
		var result = _syncRequestToUrl(request.request, "logout");                                                           // 61
		if (Accounts.saml.settings.debug) {                                                                                  // 62
			console.log("SAML Logout Request " + result);                                                                       // 63
		}                                                                                                                    // 64
                                                                                                                       // 65
                                                                                                                       // 66
		return result;                                                                                                       // 67
	}                                                                                                                     // 68
})                                                                                                                     // 69
                                                                                                                       // 70
Accounts.registerLoginHandler(function (loginRequest) {                                                                // 71
	if (!loginRequest.saml || !loginRequest.credentialToken) {                                                            // 72
		return undefined;                                                                                                    // 73
	}                                                                                                                     // 74
                                                                                                                       // 75
	var loginResult = Accounts.saml.retrieveCredential(loginRequest.credentialToken);                                     // 76
	if (Accounts.saml.settings.debug) {                                                                                   // 77
		console.log("RESULT :" + JSON.stringify(loginResult));                                                               // 78
	}                                                                                                                     // 79
                                                                                                                       // 80
	if (loginResult == undefined) {                                                                                       // 81
		return {                                                                                                             // 82
			type: "saml",                                                                                                       // 83
			error: new Meteor.Error(Accounts.LoginCancelledError.numericError, "No matching login attempt found")               // 84
		}                                                                                                                    // 85
	}                                                                                                                     // 86
                                                                                                                       // 87
	if (loginResult && loginResult.profile && loginResult.profile.email) {                                                // 88
		var user = Meteor.users.findOne({                                                                                    // 89
			'emails.address': loginResult.profile.email                                                                         // 90
		});                                                                                                                  // 91
                                                                                                                       // 92
		if (!user) {                                                                                                         // 93
			var newUser = {                                                                                                     // 94
				name: loginResult.profile.cn || loginResult.profile.username,                                                      // 95
				active: true,                                                                                                      // 96
				globalRoles: ['user'],                                                                                             // 97
				emails: [{                                                                                                         // 98
					address: loginResult.profile.email,                                                                               // 99
					verified: true                                                                                                    // 100
				}]                                                                                                                 // 101
			};                                                                                                                  // 102
                                                                                                                       // 103
			if (Accounts.saml.settings.generateUsername === true) {                                                             // 104
				var username = RocketChat.generateUsernameSuggestion(newUser);                                                     // 105
				if (username) {                                                                                                    // 106
					newUser.username = username;                                                                                      // 107
				}                                                                                                                  // 108
			}                                                                                                                   // 109
                                                                                                                       // 110
			var userId = Accounts.insertUserDoc({}, newUser);                                                                   // 111
			user = Meteor.users.findOne(userId);                                                                                // 112
		}                                                                                                                    // 113
                                                                                                                       // 114
		//creating the token and adding to the user                                                                          // 115
		var stampedToken = Accounts._generateStampedLoginToken();                                                            // 116
		Meteor.users.update(user, {                                                                                          // 117
			$push: {                                                                                                            // 118
				'services.resume.loginTokens': stampedToken                                                                        // 119
			}                                                                                                                   // 120
		});                                                                                                                  // 121
                                                                                                                       // 122
		var samlLogin = {                                                                                                    // 123
			provider: Accounts.saml.RelayState,                                                                                 // 124
			idp: loginResult.profile.issuer,                                                                                    // 125
			idpSession: loginResult.profile.sessionIndex,                                                                       // 126
			nameID: loginResult.profile.nameID                                                                                  // 127
		};                                                                                                                   // 128
                                                                                                                       // 129
		Meteor.users.update({                                                                                                // 130
			_id: user._id                                                                                                       // 131
		}, {                                                                                                                 // 132
			$set: {                                                                                                             // 133
				// TBD this should be pushed, otherwise we're only able to SSO into a single IDP at a time                         // 134
				'services.saml': samlLogin                                                                                         // 135
			}                                                                                                                   // 136
		});                                                                                                                  // 137
                                                                                                                       // 138
		//sending token along with the userId                                                                                // 139
		var result = {                                                                                                       // 140
			userId: user._id,                                                                                                   // 141
			token: stampedToken.token                                                                                           // 142
		};                                                                                                                   // 143
                                                                                                                       // 144
		return result                                                                                                        // 145
                                                                                                                       // 146
	} else {                                                                                                              // 147
		throw new Error("SAML Profile did not contain an email address");                                                    // 148
	}                                                                                                                     // 149
});                                                                                                                    // 150
                                                                                                                       // 151
Accounts.saml._loginResultForCredentialToken = {};                                                                     // 152
                                                                                                                       // 153
Accounts.saml.hasCredential = function (credentialToken) {                                                             // 154
	return _.has(Accounts.saml._loginResultForCredentialToken, credentialToken);                                          // 155
}                                                                                                                      // 156
                                                                                                                       // 157
Accounts.saml.retrieveCredential = function (credentialToken) {                                                        // 158
	// The credentialToken in all these functions corresponds to SAMLs inResponseTo field and is mandatory to check.      // 159
	var result = Accounts.saml._loginResultForCredentialToken[credentialToken];                                           // 160
	delete Accounts.saml._loginResultForCredentialToken[credentialToken];                                                 // 161
	return result;                                                                                                        // 162
}                                                                                                                      // 163
                                                                                                                       // 164
                                                                                                                       // 165
// Listen to incoming SAML http requests                                                                               // 166
WebApp.connectHandlers.use(connect.bodyParser()).use(function (req, res, next) {                                       // 167
	// Need to create a Fiber since we're using synchronous http calls and nothing                                        // 168
	// else is wrapping this in a fiber automatically                                                                     // 169
	Fiber(function () {                                                                                                   // 170
		middleware(req, res, next);                                                                                          // 171
	}).run();                                                                                                             // 172
});                                                                                                                    // 173
                                                                                                                       // 174
middleware = function (req, res, next) {                                                                               // 175
	// Make sure to catch any exceptions because otherwise we'd crash                                                     // 176
	// the runner                                                                                                         // 177
	try {                                                                                                                 // 178
		var samlObject = samlUrlToObject(req.url);                                                                           // 179
		if (!samlObject || !samlObject.serviceName) {                                                                        // 180
			next();                                                                                                             // 181
			return;                                                                                                             // 182
		}                                                                                                                    // 183
                                                                                                                       // 184
		if (!samlObject.actionName)                                                                                          // 185
			throw new Error("Missing SAML action");                                                                             // 186
                                                                                                                       // 187
		console.log(Accounts.saml.settings.providers)                                                                        // 188
		console.log(samlObject.serviceName)                                                                                  // 189
		var service = _.find(Accounts.saml.settings.providers, function (samlSetting) {                                      // 190
			return samlSetting.provider === samlObject.serviceName;                                                             // 191
		});                                                                                                                  // 192
                                                                                                                       // 193
		// Skip everything if there's no service set by the saml middleware                                                  // 194
		if (!service)                                                                                                        // 195
			throw new Error("Unexpected SAML service " + samlObject.serviceName);                                               // 196
		switch (samlObject.actionName) {                                                                                     // 197
		case "metadata":                                                                                                     // 198
			_saml = new SAML(service);                                                                                          // 199
			service.callbackUrl = Meteor.absoluteUrl("_saml/validate/" + service.provider);                                     // 200
			res.writeHead(200);                                                                                                 // 201
			res.write(_saml.generateServiceProviderMetadata(service.callbackUrl));                                              // 202
			res.end();                                                                                                          // 203
			//closePopup(res);                                                                                                  // 204
			break;                                                                                                              // 205
		case "logout":                                                                                                       // 206
			// This is where we receive SAML LogoutResponse                                                                     // 207
			_saml = new SAML(service);                                                                                          // 208
			_saml.validateLogoutResponse(req.query.SAMLResponse, function (err, result) {                                       // 209
				if (!err) {                                                                                                        // 210
					var logOutUser = function (inResponseTo) {                                                                        // 211
						if (Accounts.saml.settings.debug) {                                                                              // 212
						console.log("Logging Out user via inResponseTo " + inResponseTo);                                                // 213
						}                                                                                                                // 214
						var loggedOutUser = Meteor.users.find({                                                                          // 215
							'services.saml.inResponseTo': inResponseTo                                                                      // 216
						}).fetch();                                                                                                      // 217
						if (loggedOutUser.length == 1) {                                                                                 // 218
							if (Accounts.saml.settings.debug) {                                                                             // 219
							console.log("Found user " + loggedOutUser[0]._id);                                                              // 220
							}                                                                                                               // 221
							Meteor.users.update({                                                                                           // 222
								_id: loggedOutUser[0]._id                                                                                      // 223
							}, {                                                                                                            // 224
								$set: {                                                                                                        // 225
									"services.resume.loginTokens": []                                                                             // 226
								}                                                                                                              // 227
							});                                                                                                             // 228
							Meteor.users.update({                                                                                           // 229
								_id: loggedOutUser[0]._id                                                                                      // 230
							}, {                                                                                                            // 231
								$unset: {                                                                                                      // 232
									"services.saml": ""                                                                                           // 233
								}                                                                                                              // 234
							});                                                                                                             // 235
						} else {                                                                                                         // 236
							throw new Meteor.error("Found multiple users matching SAML inResponseTo fields");                               // 237
						}                                                                                                                // 238
					}                                                                                                                 // 239
                                                                                                                       // 240
					Fiber(function () {                                                                                               // 241
						logOutUser(result);                                                                                              // 242
					}).run();                                                                                                         // 243
                                                                                                                       // 244
                                                                                                                       // 245
					res.writeHead(302, {                                                                                              // 246
						'Location': req.query.RelayState                                                                                 // 247
					});                                                                                                               // 248
					res.end();                                                                                                        // 249
				} else {                                                                                                           // 250
					// TBD thinking of sth meaning full.                                                                              // 251
				}                                                                                                                  // 252
			})                                                                                                                  // 253
			break;                                                                                                              // 254
		case "sloRedirect":                                                                                                  // 255
			var idpLogout = req.query.redirect                                                                                  // 256
			res.writeHead(302, {                                                                                                // 257
				// credentialToken here is the SAML LogOut Request that we'll send back to IDP                                     // 258
				'Location': idpLogout                                                                                              // 259
			});                                                                                                                 // 260
			res.end();                                                                                                          // 261
			break;                                                                                                              // 262
		case "authorize":                                                                                                    // 263
			service.callbackUrl = Meteor.absoluteUrl("_saml/validate/" + service.provider);                                     // 264
			service.id = samlObject.credentialToken;                                                                            // 265
			_saml = new SAML(service);                                                                                          // 266
			_saml.getAuthorizeUrl(req, function (err, url) {                                                                    // 267
				if (err)                                                                                                           // 268
					throw new Error("Unable to generate authorize url");                                                              // 269
				res.writeHead(302, {                                                                                               // 270
					'Location': url                                                                                                   // 271
				});                                                                                                                // 272
				res.end();                                                                                                         // 273
			});                                                                                                                 // 274
			break;                                                                                                              // 275
		case "validate":                                                                                                     // 276
			_saml = new SAML(service);                                                                                          // 277
			Accounts.saml.RelayState = req.body.RelayState;                                                                     // 278
			_saml.validateResponse(req.body.SAMLResponse, req.body.RelayState, function (err, profile, loggedOut) {             // 279
				if (err)                                                                                                           // 280
					throw new Error("Unable to validate response url: " + err);                                                       // 281
                                                                                                                       // 282
				var credentialToken = profile.inResponseToId || profile.InResponseTo || samlObject.credentialToken;                // 283
				if (!credentialToken)                                                                                              // 284
					throw new Error("Unable to determine credentialToken");                                                           // 285
				Accounts.saml._loginResultForCredentialToken[credentialToken] = {                                                  // 286
					profile: profile                                                                                                  // 287
				};                                                                                                                 // 288
				closePopup(res);                                                                                                   // 289
			});                                                                                                                 // 290
			break;                                                                                                              // 291
		default:                                                                                                             // 292
			throw new Error("Unexpected SAML action " + samlObject.actionName);                                                 // 293
                                                                                                                       // 294
		}                                                                                                                    // 295
	} catch (err) {                                                                                                       // 296
		closePopup(res, err);                                                                                                // 297
	}                                                                                                                     // 298
};                                                                                                                     // 299
                                                                                                                       // 300
var samlUrlToObject = function (url) {                                                                                 // 301
	// req.url will be "/_saml/<action>/<service name>/<credentialToken>"                                                 // 302
	if (!url)                                                                                                             // 303
		return null;                                                                                                         // 304
                                                                                                                       // 305
	var splitPath = url.split('/');                                                                                       // 306
                                                                                                                       // 307
	// Any non-saml request will continue down the default                                                                // 308
	// middlewares.                                                                                                       // 309
	if (splitPath[1] !== '_saml')                                                                                         // 310
		return null;                                                                                                         // 311
                                                                                                                       // 312
	var result = {                                                                                                        // 313
		actionName: splitPath[2],                                                                                            // 314
		serviceName: splitPath[3],                                                                                           // 315
		credentialToken: splitPath[4]                                                                                        // 316
	};                                                                                                                    // 317
	if (Accounts.saml.settings.debug) {                                                                                   // 318
		console.log(result);                                                                                                 // 319
	}                                                                                                                     // 320
	return result;                                                                                                        // 321
};                                                                                                                     // 322
                                                                                                                       // 323
var closePopup = function (res, err) {                                                                                 // 324
	res.writeHead(200, {                                                                                                  // 325
		'Content-Type': 'text/html'                                                                                          // 326
	});                                                                                                                   // 327
	var content = '<html><head><script>window.close()</script></head><body><H1>Verified</H1></body></html>';              // 328
	if (err)                                                                                                              // 329
		content = '<html><body><h2>Sorry, an annoying error occured</h2><div>' + err + '</div><a onclick="window.close();">Close Window</a></body></html>';
	res.end(content, 'utf-8');                                                                                            // 331
};                                                                                                                     // 332
                                                                                                                       // 333
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steffo_meteor-accounts-saml/saml_utils.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var zlib = Npm.require('zlib');                                                                                        // 1
var xml2js = Npm.require('xml2js');                                                                                    // 2
var xmlCrypto = Npm.require('xml-crypto');                                                                             // 3
var crypto = Npm.require('crypto');                                                                                    // 4
var xmldom = Npm.require('xmldom');                                                                                    // 5
var querystring = Npm.require('querystring');                                                                          // 6
var xmlbuilder = Npm.require('xmlbuilder');                                                                            // 7
var xmlenc = Npm.require('xml-encryption');                                                                            // 8
var xpath = xmlCrypto.xpath;                                                                                           // 9
var Dom = xmldom.DOMParser;                                                                                            // 10
                                                                                                                       // 11
var prefixMatch = new RegExp(/(?!xmlns)^.*:/);                                                                         // 12
                                                                                                                       // 13
                                                                                                                       // 14
SAML = function (options) {                                                                                            // 15
	this.options = this.initialize(options);                                                                              // 16
};                                                                                                                     // 17
                                                                                                                       // 18
var stripPrefix = function (str) {                                                                                     // 19
	return str.replace(prefixMatch, '');                                                                                  // 20
};                                                                                                                     // 21
                                                                                                                       // 22
SAML.prototype.initialize = function (options) {                                                                       // 23
	if (!options) {                                                                                                       // 24
		options = {};                                                                                                        // 25
	}                                                                                                                     // 26
                                                                                                                       // 27
	if (!options.protocol) {                                                                                              // 28
		options.protocol = 'https://';                                                                                       // 29
	}                                                                                                                     // 30
                                                                                                                       // 31
	if (!options.path) {                                                                                                  // 32
		options.path = '/saml/consume';                                                                                      // 33
	}                                                                                                                     // 34
                                                                                                                       // 35
	if (!options.issuer) {                                                                                                // 36
		options.issuer = 'onelogin_saml';                                                                                    // 37
	}                                                                                                                     // 38
                                                                                                                       // 39
	if (options.identifierFormat === undefined) {                                                                         // 40
		options.identifierFormat = "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress";                                 // 41
	}                                                                                                                     // 42
                                                                                                                       // 43
	if (options.authnContext === undefined) {                                                                             // 44
		options.authnContext = "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport";                          // 45
	}                                                                                                                     // 46
                                                                                                                       // 47
	return options;                                                                                                       // 48
};                                                                                                                     // 49
                                                                                                                       // 50
SAML.prototype.generateUniqueID = function () {                                                                        // 51
	var chars = "abcdef0123456789";                                                                                       // 52
	var uniqueID = "";                                                                                                    // 53
	for (var i = 0; i < 20; i++) {                                                                                        // 54
		uniqueID += chars.substr(Math.floor((Math.random() * 15)), 1);                                                       // 55
	}                                                                                                                     // 56
	return uniqueID;                                                                                                      // 57
};                                                                                                                     // 58
                                                                                                                       // 59
SAML.prototype.generateInstant = function () {                                                                         // 60
	return new Date().toISOString();                                                                                      // 61
};                                                                                                                     // 62
                                                                                                                       // 63
SAML.prototype.signRequest = function (xml) {                                                                          // 64
	var signer = crypto.createSign('RSA-SHA1');                                                                           // 65
	signer.update(xml);                                                                                                   // 66
	return signer.sign(this.options.privateKey, 'base64');                                                                // 67
}                                                                                                                      // 68
                                                                                                                       // 69
SAML.prototype.generateAuthorizeRequest = function (req) {                                                             // 70
	var id = "_" + this.generateUniqueID();                                                                               // 71
	var instant = this.generateInstant();                                                                                 // 72
                                                                                                                       // 73
	// Post-auth destination                                                                                              // 74
	if (this.options.callbackUrl) {                                                                                       // 75
		callbackUrl = this.options.callbackUrl;                                                                              // 76
	} else {                                                                                                              // 77
		var callbackUrl = this.options.protocol + req.headers.host + this.options.path;                                      // 78
	}                                                                                                                     // 79
                                                                                                                       // 80
	if (this.options.id)                                                                                                  // 81
		id = this.options.id;                                                                                                // 82
                                                                                                                       // 83
	var request =                                                                                                         // 84
		"<samlp:AuthnRequest xmlns:samlp=\"urn:oasis:names:tc:SAML:2.0:protocol\" ID=\"" + id + "\" Version=\"2.0\" IssueInstant=\"" + instant +
		"\" ProtocolBinding=\"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST\" AssertionConsumerServiceURL=\"" + callbackUrl + "\" Destination=\"" +
		this.options.entryPoint + "\">" +                                                                                    // 87
		"<saml:Issuer xmlns:saml=\"urn:oasis:names:tc:SAML:2.0:assertion\">" + this.options.issuer + "</saml:Issuer>\n";     // 88
                                                                                                                       // 89
	if (this.options.identifierFormat) {                                                                                  // 90
		request += "<samlp:NameIDPolicy xmlns:samlp=\"urn:oasis:names:tc:SAML:2.0:protocol\" Format=\"" + this.options.identifierFormat +
			"\" AllowCreate=\"true\"></samlp:NameIDPolicy>\n";                                                                  // 92
	}                                                                                                                     // 93
                                                                                                                       // 94
	request +=                                                                                                            // 95
		"<samlp:RequestedAuthnContext xmlns:samlp=\"urn:oasis:names:tc:SAML:2.0:protocol\" Comparison=\"exact\">" +          // 96
		"<saml:AuthnContextClassRef xmlns:saml=\"urn:oasis:names:tc:SAML:2.0:assertion\">urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport</saml:AuthnContextClassRef></samlp:RequestedAuthnContext>\n" +
		"</samlp:AuthnRequest>";                                                                                             // 98
                                                                                                                       // 99
	return request;                                                                                                       // 100
};                                                                                                                     // 101
                                                                                                                       // 102
SAML.prototype.generateLogoutRequest = function (options) {                                                            // 103
	// options should be of the form                                                                                      // 104
	// nameId: <nameId as submitted during SAML SSO>                                                                      // 105
	// sessionIndex: sessionIndex                                                                                         // 106
	// --- NO SAMLsettings: <Meteor.setting.saml  entry for the provider you want to SLO from                             // 107
                                                                                                                       // 108
	var id = "_" + this.generateUniqueID();                                                                               // 109
	var instant = this.generateInstant();                                                                                 // 110
                                                                                                                       // 111
	var request = "<samlp:LogoutRequest xmlns:samlp=\"urn:oasis:names:tc:SAML:2.0:protocol\" " +                          // 112
		"xmlns:saml=\"urn:oasis:names:tc:SAML:2.0:assertion\" ID=\"" + id + "\" Version=\"2.0\" IssueInstant=\"" + instant +
		"\" Destination=\"" + this.options.idpSLORedirectURL + "\">" +                                                       // 114
		"<saml:Issuer xmlns:saml=\"urn:oasis:names:tc:SAML:2.0:assertion\">" + this.options.issuer + "</saml:Issuer>" +      // 115
		"<saml:NameID Format=\"" + this.options.identifierFormat + "\">" + options.nameID + "</saml:NameID>" +               // 116
		"</samlp:LogoutRequest>";                                                                                            // 117
                                                                                                                       // 118
	request = "<samlp:LogoutRequest xmlns:samlp=\"urn:oasis:names:tc:SAML:2.0:protocol\"  " +                             // 119
		"ID=\"" + id + "\" " +                                                                                               // 120
		"Version=\"2.0\" " +                                                                                                 // 121
		"IssueInstant=\"" + instant + "\" " +                                                                                // 122
		"Destination=\"" + this.options.idpSLORedirectURL + "\" " +                                                          // 123
		">" +                                                                                                                // 124
		"<saml:Issuer xmlns:saml=\"urn:oasis:names:tc:SAML:2.0:assertion\">" + this.options.issuer + "</saml:Issuer>" +      // 125
		"<saml:NameID xmlns:saml=\"urn:oasis:names:tc:SAML:2.0:assertion\" " +                                               // 126
		"NameQualifier=\"http://id.init8.net:8080/openam\" " +                                                               // 127
		"SPNameQualifier=\"" + this.options.issuer + "\" " +                                                                 // 128
		"Format=\"" + this.options.identifierFormat + "\">" +                                                                // 129
		options.nameID + "</saml:NameID>" +                                                                                  // 130
		"<samlp:SessionIndex xmlns:samlp=\"urn:oasis:names:tc:SAML:2.0:protocol\">" + options.sessionIndex + "</samlp:SessionIndex>" +
		"</samlp:LogoutRequest>";                                                                                            // 132
	if (Meteor.settings.debug) {                                                                                          // 133
		console.log("------- SAML Logout request -----------");                                                              // 134
		console.log(request);                                                                                                // 135
	}                                                                                                                     // 136
	return {                                                                                                              // 137
		request: request,                                                                                                    // 138
		id: id                                                                                                               // 139
	};                                                                                                                    // 140
}                                                                                                                      // 141
                                                                                                                       // 142
SAML.prototype.requestToUrl = function (request, operation, callback) {                                                // 143
	var self = this;                                                                                                      // 144
	var result;                                                                                                           // 145
	zlib.deflateRaw(request, function (err, buffer) {                                                                     // 146
		if (err) {                                                                                                           // 147
			return callback(err);                                                                                               // 148
		}                                                                                                                    // 149
                                                                                                                       // 150
		var base64 = buffer.toString('base64');                                                                              // 151
		var target = self.options.entryPoint;                                                                                // 152
                                                                                                                       // 153
		if (operation === 'logout') {                                                                                        // 154
			if (self.options.idpSLORedirectURL) {                                                                               // 155
				target = self.options.idpSLORedirectURL;                                                                           // 156
			}                                                                                                                   // 157
		}                                                                                                                    // 158
                                                                                                                       // 159
		if (target.indexOf('?') > 0)                                                                                         // 160
			target += '&';                                                                                                      // 161
		else                                                                                                                 // 162
			target += '?';                                                                                                      // 163
                                                                                                                       // 164
		var samlRequest = {                                                                                                  // 165
			SAMLRequest: base64                                                                                                 // 166
		};                                                                                                                   // 167
                                                                                                                       // 168
		if (self.options.privateCert) {                                                                                      // 169
			samlRequest.SigAlg = 'http://www.w3.org/2000/09/xmldsig#rsa-sha1';                                                  // 170
			samlRequest.Signature = self.signRequest(querystring.stringify(samlRequest));                                       // 171
		}                                                                                                                    // 172
                                                                                                                       // 173
		// TBD. We should really include a proper RelayState here                                                            // 174
		if (operation === 'logout') {                                                                                        // 175
			// in case of logout we want to be redirected back to the Meteor app.                                               // 176
			var relayState = Meteor.absoluteUrl();                                                                              // 177
		} else {                                                                                                             // 178
			var relayState = self.options.provider;                                                                             // 179
		}                                                                                                                    // 180
		target += querystring.stringify(samlRequest) + "&RelayState=" + relayState;                                          // 181
                                                                                                                       // 182
		if (Meteor.settings.debug) {                                                                                         // 183
			console.log("requestToUrl: " + target);                                                                             // 184
		}                                                                                                                    // 185
		if (operation === 'logout') {                                                                                        // 186
			// in case of logout we want to be redirected back to the Meteor app.                                               // 187
			result = target;                                                                                                    // 188
			return callback(null, target);                                                                                      // 189
                                                                                                                       // 190
		} else {                                                                                                             // 191
			callback(null, target);                                                                                             // 192
		}                                                                                                                    // 193
	});                                                                                                                   // 194
}                                                                                                                      // 195
                                                                                                                       // 196
SAML.prototype.getAuthorizeUrl = function (req, callback) {                                                            // 197
	var request = this.generateAuthorizeRequest(req);                                                                     // 198
                                                                                                                       // 199
	this.requestToUrl(request, 'authorize', callback);                                                                    // 200
};                                                                                                                     // 201
                                                                                                                       // 202
SAML.prototype.getLogoutUrl = function (req, callback) {                                                               // 203
	var request = this.generateLogoutRequest(req);                                                                        // 204
                                                                                                                       // 205
	this.requestToUrl(request, 'logout', callback);                                                                       // 206
}                                                                                                                      // 207
                                                                                                                       // 208
SAML.prototype.certToPEM = function (cert) {                                                                           // 209
	cert = cert.match(/.{1,64}/g).join('\n');                                                                             // 210
	cert = "-----BEGIN CERTIFICATE-----\n" + cert;                                                                        // 211
	cert = cert + "\n-----END CERTIFICATE-----\n";                                                                        // 212
	return cert;                                                                                                          // 213
};                                                                                                                     // 214
                                                                                                                       // 215
function findChilds(node, localName, namespace) {                                                                      // 216
	var res = []                                                                                                          // 217
	for (var i = 0; i < node.childNodes.length; i++) {                                                                    // 218
		var child = node.childNodes[i]                                                                                       // 219
		if (child.localName == localName && (child.namespaceURI == namespace || !namespace)) {                               // 220
			res.push(child)                                                                                                     // 221
		}                                                                                                                    // 222
	}                                                                                                                     // 223
	return res;                                                                                                           // 224
}                                                                                                                      // 225
                                                                                                                       // 226
SAML.prototype.validateSignature = function (xml, cert) {                                                              // 227
	var self = this;                                                                                                      // 228
                                                                                                                       // 229
	var doc = new xmldom.DOMParser().parseFromString(xml);                                                                // 230
	var signature = xmlCrypto.xpath(doc, "//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
                                                                                                                       // 232
	var sig = new xmlCrypto.SignedXml();                                                                                  // 233
                                                                                                                       // 234
	sig.keyInfoProvider = {                                                                                               // 235
		getKeyInfo: function (key) {                                                                                         // 236
			return "<X509Data></X509Data>"                                                                                      // 237
		},                                                                                                                   // 238
		getKey: function (keyInfo) {                                                                                         // 239
			return self.certToPEM(cert);                                                                                        // 240
		}                                                                                                                    // 241
	};                                                                                                                    // 242
                                                                                                                       // 243
	sig.loadSignature(signature);                                                                                         // 244
                                                                                                                       // 245
	return sig.checkSignature(xml);                                                                                       // 246
};                                                                                                                     // 247
                                                                                                                       // 248
SAML.prototype.getElement = function (parentElement, elementName) {                                                    // 249
	if (parentElement['saml:' + elementName]) {                                                                           // 250
		return parentElement['saml:' + elementName];                                                                         // 251
	} else if (parentElement['samlp:' + elementName]) {                                                                   // 252
		return parentElement['samlp:' + elementName];                                                                        // 253
	} else if (parentElement['saml2p:' + elementName]) {                                                                  // 254
		return parentElement['saml2p:' + elementName];                                                                       // 255
	} else if (parentElement['saml2:' + elementName]) {                                                                   // 256
		return parentElement['saml2:' + elementName];                                                                        // 257
	}                                                                                                                     // 258
	return parentElement[elementName];                                                                                    // 259
}                                                                                                                      // 260
                                                                                                                       // 261
SAML.prototype.validateLogoutResponse = function (samlResponse, callback) {                                            // 262
	var self = this;                                                                                                      // 263
                                                                                                                       // 264
	var compressedSAMLResponse = new Buffer(samlResponse, 'base64');                                                      // 265
	zlib.inflateRaw(compressedSAMLResponse, function (err, decoded) {                                                     // 266
                                                                                                                       // 267
		if (err) {                                                                                                           // 268
			if (Meteor.settings.debug) {                                                                                        // 269
				console.log(err)                                                                                                   // 270
			}                                                                                                                   // 271
		} else {                                                                                                             // 272
			var parser = new xml2js.Parser({                                                                                    // 273
				explicitRoot: true                                                                                                 // 274
			});                                                                                                                 // 275
			parser.parseString(decoded, function (err, doc) {                                                                   // 276
				var response = self.getElement(doc, 'LogoutResponse');                                                             // 277
                                                                                                                       // 278
				if (response) {                                                                                                    // 279
					// TBD. Check if this msg corresponds to one we sent                                                              // 280
					var inResponseTo = response['$'].InResponseTo;                                                                    // 281
					if (Meteor.settings.debug) {                                                                                      // 282
						console.log("In Response to: " + inResponseTo);                                                                  // 283
					}                                                                                                                 // 284
					var status = self.getElement(response, 'Status');                                                                 // 285
					var statusCode = self.getElement(status[0], 'StatusCode')[0]['$'].Value;                                          // 286
					if (Meteor.settings.debug) {                                                                                      // 287
						console.log("StatusCode: " + JSON.stringify(statusCode));                                                        // 288
					}                                                                                                                 // 289
					if (statusCode === 'urn:oasis:names:tc:SAML:2.0:status:Success') {                                                // 290
						// In case of a successful logout at IDP we return inResponseTo value.                                           // 291
						// This is the only way how we can identify the Meteor user (as we don't use Session Cookies)                    // 292
						callback(null, inResponseTo);                                                                                    // 293
					} else {                                                                                                          // 294
						callback("Error. Logout not confirmed by IDP", null);                                                            // 295
					}                                                                                                                 // 296
				} else {                                                                                                           // 297
					callback("No Response Found", null);                                                                              // 298
				}                                                                                                                  // 299
			})                                                                                                                  // 300
		}                                                                                                                    // 301
                                                                                                                       // 302
	})                                                                                                                    // 303
}                                                                                                                      // 304
                                                                                                                       // 305
SAML.prototype.validateResponse = function (samlResponse, relayState, callback) {                                      // 306
	var self = this;                                                                                                      // 307
	var xml = new Buffer(samlResponse, 'base64').toString('ascii');                                                       // 308
	// We currently use RelayState to save SAML provider                                                                  // 309
	if (Meteor.settings.debug) {                                                                                          // 310
		console.log("Validating response with relay state: " + xml);                                                         // 311
	}                                                                                                                     // 312
	var parser = new xml2js.Parser({                                                                                      // 313
		explicitRoot: true                                                                                                   // 314
	});                                                                                                                   // 315
                                                                                                                       // 316
	parser.parseString(xml, function (err, doc) {                                                                         // 317
		// Verify signature                                                                                                  // 318
		if (Meteor.settings.debug) {                                                                                         // 319
			console.log("Verify signature");                                                                                    // 320
		}                                                                                                                    // 321
		if (self.options.cert && !self.validateSignature(xml, self.options.cert)) {                                          // 322
			if (Meteor.settings.debug) {                                                                                        // 323
				console.log("Signature WRONG");                                                                                    // 324
			}                                                                                                                   // 325
			return callback(new Error('Invalid signature'), null, false);                                                       // 326
		}                                                                                                                    // 327
		if (Meteor.settings.debug) {                                                                                         // 328
			console.log("Signature OK");                                                                                        // 329
		}                                                                                                                    // 330
		var response = self.getElement(doc, 'Response');                                                                     // 331
		if (Meteor.settings.debug) {                                                                                         // 332
			console.log("Got response");                                                                                        // 333
		}                                                                                                                    // 334
		if (response) {                                                                                                      // 335
			var assertion = self.getElement(response, 'Assertion');                                                             // 336
			if (!assertion) {                                                                                                   // 337
				return callback(new Error('Missing SAML assertion'), null, false);                                                 // 338
			}                                                                                                                   // 339
                                                                                                                       // 340
			profile = {};                                                                                                       // 341
                                                                                                                       // 342
			if (response['$'] && response['$']['InResponseTo']) {                                                               // 343
				profile.inResponseToId = response['$']['InResponseTo'];                                                            // 344
			}                                                                                                                   // 345
                                                                                                                       // 346
			var issuer = self.getElement(assertion[0], 'Issuer');                                                               // 347
			if (issuer) {                                                                                                       // 348
				profile.issuer = issuer[0];                                                                                        // 349
			}                                                                                                                   // 350
                                                                                                                       // 351
			var subject = self.getElement(assertion[0], 'Subject');                                                             // 352
                                                                                                                       // 353
			if (subject) {                                                                                                      // 354
				var nameID = self.getElement(subject[0], 'NameID');                                                                // 355
				if (nameID) {                                                                                                      // 356
					profile.nameID = nameID[0]["_"];                                                                                  // 357
                                                                                                                       // 358
					if (nameID[0]['$'].Format) {                                                                                      // 359
						profile.nameIDFormat = nameID[0]['$'].Format;                                                                    // 360
					}                                                                                                                 // 361
				}                                                                                                                  // 362
			}                                                                                                                   // 363
                                                                                                                       // 364
			var authnStatement = self.getElement(assertion[0], 'AuthnStatement');                                               // 365
                                                                                                                       // 366
			if (authnStatement) {                                                                                               // 367
				if (authnStatement[0]['$'].SessionIndex) {                                                                         // 368
                                                                                                                       // 369
					profile.sessionIndex = authnStatement[0]['$'].SessionIndex;                                                       // 370
					if (Meteor.settings.debug) {                                                                                      // 371
						console.log("Session Index: " + profile.sessionIndex);                                                           // 372
					}                                                                                                                 // 373
				} else {                                                                                                           // 374
					if (Meteor.settings.debug) {                                                                                      // 375
						console.log("No Session Index Found");                                                                           // 376
					}                                                                                                                 // 377
				}                                                                                                                  // 378
                                                                                                                       // 379
                                                                                                                       // 380
			} else {                                                                                                            // 381
				if (Meteor.settings.debug) {                                                                                       // 382
					console.log("No AuthN Statement found");                                                                          // 383
				}                                                                                                                  // 384
			}                                                                                                                   // 385
                                                                                                                       // 386
			var attributeStatement = self.getElement(assertion[0], 'AttributeStatement');                                       // 387
			if (attributeStatement) {                                                                                           // 388
				var attributes = self.getElement(attributeStatement[0], 'Attribute');                                              // 389
                                                                                                                       // 390
				if (attributes) {                                                                                                  // 391
					attributes.forEach(function (attribute) {                                                                         // 392
						var value = self.getElement(attribute, 'AttributeValue');                                                        // 393
						if (typeof value[0] === 'string') {                                                                              // 394
							profile[attribute['$'].Name] = value[0];                                                                        // 395
						} else {                                                                                                         // 396
							profile[attribute['$'].Name] = value[0]['_'];                                                                   // 397
						}                                                                                                                // 398
					});                                                                                                               // 399
				}                                                                                                                  // 400
                                                                                                                       // 401
				if (!profile.mail && profile['urn:oid:0.9.2342.19200300.100.1.3']) {                                               // 402
					// See http://www.incommonfederation.org/attributesummary.html for definition of attribute OIDs                   // 403
					profile.mail = profile['urn:oid:0.9.2342.19200300.100.1.3'];                                                      // 404
				}                                                                                                                  // 405
                                                                                                                       // 406
				if (!profile.email && profile.mail) {                                                                              // 407
					profile.email = profile.mail;                                                                                     // 408
				}                                                                                                                  // 409
			}                                                                                                                   // 410
                                                                                                                       // 411
			if (!profile.email && profile.nameID && profile.nameIDFormat && profile.nameIDFormat.indexOf('emailAddress') >= 0) {
				profile.email = profile.nameID;                                                                                    // 413
			}                                                                                                                   // 414
			if (Meteor.settings.debug) {                                                                                        // 415
				console.log("NameID: " + JSON.stringify(profile));                                                                 // 416
			}                                                                                                                   // 417
                                                                                                                       // 418
			callback(null, profile, false);                                                                                     // 419
		} else {                                                                                                             // 420
			var logoutResponse = self.getElement(doc, 'LogoutResponse');                                                        // 421
                                                                                                                       // 422
			if (logoutResponse) {                                                                                               // 423
				callback(null, null, true);                                                                                        // 424
			} else {                                                                                                            // 425
				return callback(new Error('Unknown SAML response message'), null, false);                                          // 426
			}                                                                                                                   // 427
                                                                                                                       // 428
		}                                                                                                                    // 429
	});                                                                                                                   // 430
};                                                                                                                     // 431
                                                                                                                       // 432
                                                                                                                       // 433
SAML.prototype.generateServiceProviderMetadata = function (callbackUrl) {                                              // 434
                                                                                                                       // 435
	var keyDescriptor = null;                                                                                             // 436
                                                                                                                       // 437
	if (!decryptionCert) {                                                                                                // 438
		decryptionCert = this.options.privateCert;                                                                           // 439
	}                                                                                                                     // 440
                                                                                                                       // 441
	if (this.options.privateKey) {                                                                                        // 442
		if (!decryptionCert) {                                                                                               // 443
			throw new Error(                                                                                                    // 444
				"Missing decryptionCert while generating metadata for decrypting service provider");                               // 445
		}                                                                                                                    // 446
                                                                                                                       // 447
		decryptionCert = decryptionCert.replace(/-+BEGIN CERTIFICATE-+\r?\n?/, '');                                          // 448
		decryptionCert = decryptionCert.replace(/-+END CERTIFICATE-+\r?\n?/, '');                                            // 449
		decryptionCert = decryptionCert.replace(/\r\n/g, '\n');                                                              // 450
                                                                                                                       // 451
		keyDescriptor = {                                                                                                    // 452
			'ds:KeyInfo': {                                                                                                     // 453
				'ds:X509Data': {                                                                                                   // 454
					'ds:X509Certificate': {                                                                                           // 455
						'#text': decryptionCert                                                                                          // 456
					}                                                                                                                 // 457
				}                                                                                                                  // 458
			},                                                                                                                  // 459
			'#list': [                                                                                                          // 460
				// this should be the set that the xmlenc library supports                                                         // 461
				{                                                                                                                  // 462
					'EncryptionMethod': {                                                                                             // 463
						'@Algorithm': 'http://www.w3.org/2001/04/xmlenc#aes256-cbc'                                                      // 464
					}                                                                                                                 // 465
				},                                                                                                                 // 466
				{                                                                                                                  // 467
					'EncryptionMethod': {                                                                                             // 468
						'@Algorithm': 'http://www.w3.org/2001/04/xmlenc#aes128-cbc'                                                      // 469
					}                                                                                                                 // 470
				},                                                                                                                 // 471
				{                                                                                                                  // 472
					'EncryptionMethod': {                                                                                             // 473
						'@Algorithm': 'http://www.w3.org/2001/04/xmlenc#tripledes-cbc'                                                   // 474
					}                                                                                                                 // 475
				},                                                                                                                 // 476
			]                                                                                                                   // 477
		};                                                                                                                   // 478
	}                                                                                                                     // 479
                                                                                                                       // 480
	if (!this.options.callbackUrl && !callbackUrl) {                                                                      // 481
		throw new Error(                                                                                                     // 482
			"Unable to generate service provider metadata when callbackUrl option is not set");                                 // 483
	}                                                                                                                     // 484
                                                                                                                       // 485
	var metadata = {                                                                                                      // 486
		'EntityDescriptor': {                                                                                                // 487
			'@xmlns': 'urn:oasis:names:tc:SAML:2.0:metadata',                                                                   // 488
			'@xmlns:ds': 'http://www.w3.org/2000/09/xmldsig#',                                                                  // 489
			'@entityID': this.options.issuer,                                                                                   // 490
			'SPSSODescriptor': {                                                                                                // 491
				'@protocolSupportEnumeration': 'urn:oasis:names:tc:SAML:2.0:protocol',                                             // 492
				'KeyDescriptor': keyDescriptor,                                                                                    // 493
				'SingleLogoutService': {                                                                                           // 494
					'@Binding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',                                                 // 495
					'@Location': Meteor.absoluteUrl() + "_saml/logout/" + this.options.provider + "/",                                // 496
					'@ResponseLocation': Meteor.absoluteUrl() + "_saml/logout/" + this.options.provider + "/"                         // 497
				},                                                                                                                 // 498
				'NameIDFormat': this.options.identifierFormat,                                                                     // 499
				'AssertionConsumerService': {                                                                                      // 500
					'@index': '1',                                                                                                    // 501
					'@isDefault': 'true',                                                                                             // 502
					'@Binding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',                                                     // 503
					'@Location': callbackUrl                                                                                          // 504
				}                                                                                                                  // 505
			}                                                                                                                   // 506
		}                                                                                                                    // 507
	};                                                                                                                    // 508
                                                                                                                       // 509
	return xmlbuilder.create(metadata).end({                                                                              // 510
		pretty: true,                                                                                                        // 511
		indent: '  ',                                                                                                        // 512
		newline: '\n'                                                                                                        // 513
	});                                                                                                                   // 514
};                                                                                                                     // 515
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steffo_meteor-accounts-saml/saml_rocketchat.coffee.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var logger, timer, updateServices;                                                                                     // 1
                                                                                                                       //
logger = new Logger('steffo:meteor-accounts-saml', {                                                                   // 1
  methods: {                                                                                                           // 2
    updated: {                                                                                                         // 3
      type: 'info'                                                                                                     // 4
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
RocketChat.settings.addGroup('SAML');                                                                                  // 1
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
  addSamlService: function(name) {                                                                                     // 8
    RocketChat.settings.add("SAML_Custom_" + name, false, {                                                            // 9
      type: 'boolean',                                                                                                 // 9
      group: 'SAML',                                                                                                   // 9
      section: name,                                                                                                   // 9
      i18nLabel: 'Accounts_OAuth_Custom_Enable'                                                                        // 9
    });                                                                                                                //
    RocketChat.settings.add("SAML_Custom_" + name + "_provider", 'openidp', {                                          // 9
      type: 'string',                                                                                                  // 10
      group: 'SAML',                                                                                                   // 10
      section: name,                                                                                                   // 10
      i18nLabel: 'SAML_Custom_Provider'                                                                                // 10
    });                                                                                                                //
    RocketChat.settings.add("SAML_Custom_" + name + "_entry_point", 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php', {
      type: 'string',                                                                                                  // 11
      group: 'SAML',                                                                                                   // 11
      section: name,                                                                                                   // 11
      i18nLabel: 'SAML_Custom_Entry_point'                                                                             // 11
    });                                                                                                                //
    RocketChat.settings.add("SAML_Custom_" + name + "_issuer", 'https://rocket.chat/', {                               // 9
      type: 'string',                                                                                                  // 12
      group: 'SAML',                                                                                                   // 12
      section: name,                                                                                                   // 12
      i18nLabel: 'SAML_Custom_Issuer'                                                                                  // 12
    });                                                                                                                //
    RocketChat.settings.add("SAML_Custom_" + name + "_cert", '', {                                                     // 9
      type: 'string',                                                                                                  // 13
      group: 'SAML',                                                                                                   // 13
      section: name,                                                                                                   // 13
      i18nLabel: 'SAML_Custom_Cert'                                                                                    // 13
    });                                                                                                                //
    RocketChat.settings.add("SAML_Custom_" + name + "_button_label_text", '', {                                        // 9
      type: 'string',                                                                                                  // 14
      group: 'SAML',                                                                                                   // 14
      section: name,                                                                                                   // 14
      i18nLabel: 'Accounts_OAuth_Custom_Button_Label_Text'                                                             // 14
    });                                                                                                                //
    RocketChat.settings.add("SAML_Custom_" + name + "_button_label_color", '#FFFFFF', {                                // 9
      type: 'string',                                                                                                  // 15
      group: 'SAML',                                                                                                   // 15
      section: name,                                                                                                   // 15
      i18nLabel: 'Accounts_OAuth_Custom_Button_Label_Color'                                                            // 15
    });                                                                                                                //
    RocketChat.settings.add("SAML_Custom_" + name + "_button_color", '#13679A', {                                      // 9
      type: 'string',                                                                                                  // 16
      group: 'SAML',                                                                                                   // 16
      section: name,                                                                                                   // 16
      i18nLabel: 'Accounts_OAuth_Custom_Button_Color'                                                                  // 16
    });                                                                                                                //
    return RocketChat.settings.add("SAML_Custom_" + name + "_generate_username", false, {                              //
      type: 'boolean',                                                                                                 // 17
      group: 'SAML',                                                                                                   // 17
      section: name,                                                                                                   // 17
      i18nLabel: 'SAML_Custom_Generate_Username'                                                                       // 17
    });                                                                                                                //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
timer = void 0;                                                                                                        // 1
                                                                                                                       //
updateServices = function() {                                                                                          // 1
  if (timer != null) {                                                                                                 // 21
    Meteor.clearTimeout(timer);                                                                                        // 21
  }                                                                                                                    //
  return timer = Meteor.setTimeout(function() {                                                                        //
    var data, i, len, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, results, service, serviceName, services;          // 24
    services = RocketChat.models.Settings.find({                                                                       // 24
      _id: /^(SAML_Custom_)[a-z]+$/i                                                                                   // 24
    }).fetch();                                                                                                        //
    Accounts.saml.settings.providers = [];                                                                             // 24
    results = [];                                                                                                      // 28
    for (i = 0, len = services.length; i < len; i++) {                                                                 //
      service = services[i];                                                                                           //
      logger.updated(service._id);                                                                                     // 29
      serviceName = 'saml';                                                                                            // 29
      if (service.value === true) {                                                                                    // 33
        data = {                                                                                                       // 34
          buttonLabelText: (ref = RocketChat.models.Settings.findOneById(service._id + "_button_label_text")) != null ? ref.value : void 0,
          buttonLabelColor: (ref1 = RocketChat.models.Settings.findOneById(service._id + "_button_label_color")) != null ? ref1.value : void 0,
          buttonColor: (ref2 = RocketChat.models.Settings.findOneById(service._id + "_button_color")) != null ? ref2.value : void 0,
          clientConfig: {                                                                                              // 35
            provider: (ref3 = RocketChat.models.Settings.findOneById(service._id + "_provider")) != null ? ref3.value : void 0
          }                                                                                                            //
        };                                                                                                             //
        Accounts.saml.settings.generateUsername = (ref4 = RocketChat.models.Settings.findOneById(service._id + "_generate_username")) != null ? ref4.value : void 0;
        Accounts.saml.settings.providers.push({                                                                        // 34
          provider: data.clientConfig.provider,                                                                        // 44
          entryPoint: (ref5 = RocketChat.models.Settings.findOneById(service._id + "_entry_point")) != null ? ref5.value : void 0,
          issuer: (ref6 = RocketChat.models.Settings.findOneById(service._id + "_issuer")) != null ? ref6.value : void 0,
          cert: (ref7 = RocketChat.models.Settings.findOneById(service._id + "_cert")) != null ? ref7.value : void 0   // 44
        });                                                                                                            //
        results.push(ServiceConfiguration.configurations.upsert({                                                      // 34
          service: serviceName.toLowerCase()                                                                           // 49
        }, {                                                                                                           //
          $set: data                                                                                                   // 49
        }));                                                                                                           //
      } else {                                                                                                         //
        results.push(ServiceConfiguration.configurations.remove({                                                      //
          service: serviceName.toLowerCase()                                                                           // 51
        }));                                                                                                           //
      }                                                                                                                //
    }                                                                                                                  // 28
    return results;                                                                                                    //
  }, 2000);                                                                                                            //
};                                                                                                                     // 20
                                                                                                                       //
RocketChat.models.Settings.find().observe({                                                                            // 1
  added: function(record) {                                                                                            // 55
    if (/^SAML_.+/.test(record._id)) {                                                                                 // 56
      return updateServices();                                                                                         //
    }                                                                                                                  //
  },                                                                                                                   //
  changed: function(record) {                                                                                          // 55
    if (/^SAML_.+/.test(record._id)) {                                                                                 // 60
      return updateServices();                                                                                         //
    }                                                                                                                  //
  },                                                                                                                   //
  removed: function(record) {                                                                                          // 55
    if (/^SAML_.+/.test(record._id)) {                                                                                 // 64
      return updateServices();                                                                                         //
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
Meteor.startup(function() {                                                                                            // 1
  if (RocketChat.models.Settings.findOne({                                                                             // 68
    _id: /^(SAML_Custom)[a-z]+$/i                                                                                      //
  }) == null) {                                                                                                        //
    return Meteor.call('addSamlService', 'Default');                                                                   //
  }                                                                                                                    //
});                                                                                                                    // 67
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['steffo:meteor-accounts-saml'] = {};

})();

//# sourceMappingURL=steffo_meteor-accounts-saml.js.map
