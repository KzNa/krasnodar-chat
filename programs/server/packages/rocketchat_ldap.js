(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var LDAPJS = Package['rocketchat:ldapjs'].LDAPJS;
var Logger = Package['rocketchat:logger'].Logger;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var slugify = Package['yasaricli:slugify'].slugify;
var ECMAScript = Package.ecmascript.ECMAScript;
var SHA256 = Package.sha.SHA256;
var Accounts = Package['accounts-base'].Accounts;
var AccountsServer = Package['accounts-base'].AccountsServer;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var LDAP, domain_search_user_id, slug, getLdapUsername, getLdapUserUniqueID, getDataToSyncUserData, syncUserData, sync, users, timeout, loginRequest, user, result;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_ldap/server/ldap.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var ldapjs = LDAPJS;                                                                                                   // 1
                                                                                                                       //
var logger = new Logger('LDAP', {                                                                                      // 3
	sections: {                                                                                                           // 4
		connection: 'Connection',                                                                                            // 5
		bind: 'Bind',                                                                                                        // 6
		search: 'Search',                                                                                                    // 7
		auth: 'Auth'                                                                                                         // 8
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
LDAP = (function () {                                                                                                  // 12
	function LDAP(options) {                                                                                              // 13
		babelHelpers.classCallCheck(this, LDAP);                                                                             //
                                                                                                                       //
		var self = this;                                                                                                     // 14
                                                                                                                       //
		self.ldapjs = ldapjs;                                                                                                // 16
                                                                                                                       //
		self.connected = false;                                                                                              // 18
                                                                                                                       //
		self.options = {                                                                                                     // 20
			host: RocketChat.settings.get('LDAP_Host'),                                                                         // 21
			port: RocketChat.settings.get('LDAP_Port'),                                                                         // 22
			encryption: RocketChat.settings.get('LDAP_Encryption'),                                                             // 23
			ca_cert: RocketChat.settings.get('LDAP_CA_Cert'),                                                                   // 24
			reject_unauthorized: RocketChat.settings.get('LDAP_Reject_Unauthorized') || false,                                  // 25
			domain_base: RocketChat.settings.get('LDAP_Domain_Base'),                                                           // 26
			use_custom_domain_search: RocketChat.settings.get('LDAP_Use_Custom_Domain_Search'),                                 // 27
			custom_domain_search: RocketChat.settings.get('LDAP_Custom_Domain_Search'),                                         // 28
			domain_search_user: RocketChat.settings.get('LDAP_Domain_Search_User'),                                             // 29
			domain_search_password: RocketChat.settings.get('LDAP_Domain_Search_Password'),                                     // 30
			domain_search_filter: RocketChat.settings.get('LDAP_Domain_Search_Filter'),                                         // 31
			domain_search_user_id: RocketChat.settings.get('LDAP_Domain_Search_User_ID'),                                       // 32
			domain_search_object_class: RocketChat.settings.get('LDAP_Domain_Search_Object_Class'),                             // 33
			domain_search_object_category: RocketChat.settings.get('LDAP_Domain_Search_Object_Category')                        // 34
		};                                                                                                                   //
                                                                                                                       //
		self.connectSync = Meteor.wrapAsync(self.connectAsync, self);                                                        // 37
		self.searchAllSync = Meteor.wrapAsync(self.searchAllAsync, self);                                                    // 38
	}                                                                                                                     //
                                                                                                                       //
	LDAP.prototype.connectAsync = (function () {                                                                          // 12
		function connectAsync(callback) {                                                                                    // 41
			var self = this;                                                                                                    // 42
                                                                                                                       //
			logger.connection.info('Init setup');                                                                               // 44
                                                                                                                       //
			var replied = false;                                                                                                // 46
                                                                                                                       //
			var connectionOptions = {                                                                                           // 48
				url: self.options.host + ':' + self.options.port,                                                                  // 49
				timeout: 1000 * 5,                                                                                                 // 50
				connectTimeout: 1000 * 10,                                                                                         // 51
				idleTimeout: 1000 * 10,                                                                                            // 52
				reconnect: false                                                                                                   // 53
			};                                                                                                                  //
                                                                                                                       //
			var tlsOptions = {                                                                                                  // 56
				rejectUnauthorized: self.options.reject_unauthorized                                                               // 57
			};                                                                                                                  //
                                                                                                                       //
			if (self.options.ca_cert && self.options.ca_cert !== '') {                                                          // 60
				// Split CA cert into array of strings                                                                             //
				var chainLines = RocketChat.settings.get('LDAP_CA_Cert').split("\n");                                              // 62
				var cert = [];                                                                                                     // 63
				var ca = [];                                                                                                       // 64
				chainLines.forEach(function (line) {                                                                               // 65
					cert.push(line);                                                                                                  // 66
					if (line.match(/-END CERTIFICATE-/)) {                                                                            // 67
						ca.push(cert.join("\n"));                                                                                        // 68
						cert = [];                                                                                                       // 69
					}                                                                                                                 //
				});                                                                                                                //
				tlsOptions.ca = ca;                                                                                                // 72
			}                                                                                                                   //
                                                                                                                       //
			if (self.options.encryption === 'ssl') {                                                                            // 75
				connectionOptions.url = 'ldaps://' + connectionOptions.url;                                                        // 76
				connectionOptions.tlsOptions = tlsOptions;                                                                         // 77
			} else {                                                                                                            //
				connectionOptions.url = 'ldap://' + connectionOptions.url;                                                         // 79
			}                                                                                                                   //
                                                                                                                       //
			logger.connection.info('Connecting', connectionOptions.url);                                                        // 82
			logger.connection.debug('connectionOptions', connectionOptions);                                                    // 83
                                                                                                                       //
			self.client = ldapjs.createClient(connectionOptions);                                                               // 85
                                                                                                                       //
			self.bindSync = Meteor.wrapAsync(self.client.bind, self.client);                                                    // 87
                                                                                                                       //
			self.client.on('error', function (error) {                                                                          // 89
				logger.connection.error('connection', error);                                                                      // 90
				if (replied === false) {                                                                                           // 91
					replied = true;                                                                                                   // 92
					callback(error, null);                                                                                            // 93
				}                                                                                                                  //
			});                                                                                                                 //
                                                                                                                       //
			if (self.options.encryption === 'tls') {                                                                            // 97
                                                                                                                       //
				// Set host parameter for tls.connect which is used by ldapjs starttls. This shouldn't be needed in newer nodejs versions (e.g v5.6.0).
				// https://github.com/RocketChat/Rocket.Chat/issues/2035                                                           //
				// https://github.com/mcavage/node-ldapjs/issues/349                                                               //
				tlsOptions.host = [self.options.host];                                                                             // 102
                                                                                                                       //
				logger.connection.info('Starting TLS');                                                                            // 104
				logger.connection.debug('tlsOptions', tlsOptions);                                                                 // 105
                                                                                                                       //
				self.client.starttls(tlsOptions, null, function (error, response) {                                                // 107
					if (error) {                                                                                                      // 108
						logger.connection.error('TLS connection', error);                                                                // 109
						if (replied === false) {                                                                                         // 110
							replied = true;                                                                                                 // 111
							callback(error, null);                                                                                          // 112
						}                                                                                                                //
						return;                                                                                                          // 114
					}                                                                                                                 //
                                                                                                                       //
					logger.connection.info('TLS connected');                                                                          // 117
					self.connected = true;                                                                                            // 118
					if (replied === false) {                                                                                          // 119
						replied = true;                                                                                                  // 120
						callback(null, response);                                                                                        // 121
					}                                                                                                                 //
				});                                                                                                                //
			} else {                                                                                                            //
				self.client.on('connect', function (response) {                                                                    // 125
					logger.connection.info('LDAP connected');                                                                         // 126
					self.connected = true;                                                                                            // 127
					if (replied === false) {                                                                                          // 128
						replied = true;                                                                                                  // 129
						callback(null, response);                                                                                        // 130
					}                                                                                                                 //
				});                                                                                                                //
			}                                                                                                                   //
                                                                                                                       //
			setTimeout(function () {                                                                                            // 135
				if (replied === false) {                                                                                           // 136
					logger.connection.error('connection time out', connectionOptions.timeout);                                        // 137
					replied = true;                                                                                                   // 138
					callback(new Error('Timeout'));                                                                                   // 139
				}                                                                                                                  //
			}, connectionOptions.timeout);                                                                                      //
		}                                                                                                                    //
                                                                                                                       //
		return connectAsync;                                                                                                 //
	})();                                                                                                                 //
                                                                                                                       //
	LDAP.prototype.getDomainBindSearch = (function () {                                                                   // 12
		function getDomainBindSearch() {                                                                                     // 144
			var self = this;                                                                                                    // 145
                                                                                                                       //
			if (self.options.use_custom_domain_search === true) {                                                               // 147
				var custom_domain_search = undefined;                                                                              // 148
				try {                                                                                                              // 149
					custom_domain_search = JSON.parse(self.options.custom_domain_search);                                             // 150
				} catch (error) {                                                                                                  //
					throw new Error('Invalid Custom Domain Search JSON');                                                             // 152
				}                                                                                                                  //
                                                                                                                       //
				return {                                                                                                           // 155
					filter: custom_domain_search.filter,                                                                              // 156
					domain_search_user: custom_domain_search.userDN || '',                                                            // 157
					domain_search_password: custom_domain_search.password || ''                                                       // 158
				};                                                                                                                 //
			}                                                                                                                   //
                                                                                                                       //
			var filter = ['(&'];                                                                                                // 162
                                                                                                                       //
			if (self.options.domain_search_object_category !== '') {                                                            // 164
				filter.push('(objectCategory=' + self.options.domain_search_object_category + ')');                                // 165
			}                                                                                                                   //
                                                                                                                       //
			if (self.options.domain_search_object_class !== '') {                                                               // 168
				filter.push('(objectclass=' + self.options.domain_search_object_class + ')');                                      // 169
			}                                                                                                                   //
                                                                                                                       //
			if (self.options.domain_search_filter !== '') {                                                                     // 172
				filter.push('(' + self.options.domain_search_filter + ')');                                                        // 173
			}                                                                                                                   //
                                                                                                                       //
			domain_search_user_id = self.options.domain_search_user_id.split(',');                                              // 176
			if (domain_search_user_id.length === 1) {                                                                           // 177
				filter.push('(' + domain_search_user_id[0] + '=#{username})');                                                     // 178
			} else {                                                                                                            //
				filter.push('(|');                                                                                                 // 180
				domain_search_user_id.forEach(function (item) {                                                                    // 181
					filter.push('(' + item + '=#{username})');                                                                        // 182
				});                                                                                                                //
				filter.push(')');                                                                                                  // 184
			}                                                                                                                   //
                                                                                                                       //
			filter.push(')');                                                                                                   // 187
                                                                                                                       //
			return {                                                                                                            // 189
				filter: filter.join(''),                                                                                           // 190
				domain_search_user: self.options.domain_search_user || '',                                                         // 191
				domain_search_password: self.options.domain_search_password || ''                                                  // 192
			};                                                                                                                  //
		}                                                                                                                    //
                                                                                                                       //
		return getDomainBindSearch;                                                                                          //
	})();                                                                                                                 //
                                                                                                                       //
	LDAP.prototype.bindIfNecessary = (function () {                                                                       // 12
		function bindIfNecessary() {                                                                                         // 196
			var self = this;                                                                                                    // 197
                                                                                                                       //
			if (self.domainBinded === true) {                                                                                   // 199
				return;                                                                                                            // 200
			}                                                                                                                   //
                                                                                                                       //
			var domain_search = self.getDomainBindSearch();                                                                     // 203
                                                                                                                       //
			if (domain_search.domain_search_user !== '' && domain_search.domain_search_password !== '') {                       // 205
				logger.bind.info('Binding admin user', domain_search.domain_search_user);                                          // 206
				self.bindSync(domain_search.domain_search_user, domain_search.domain_search_password);                             // 207
				self.domainBinded = true;                                                                                          // 208
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return bindIfNecessary;                                                                                              //
	})();                                                                                                                 //
                                                                                                                       //
	LDAP.prototype.searchUsersSync = (function () {                                                                       // 12
		function searchUsersSync(username) {                                                                                 // 212
			var self = this;                                                                                                    // 213
                                                                                                                       //
			self.bindIfNecessary();                                                                                             // 215
                                                                                                                       //
			var domain_search = self.getDomainBindSearch();                                                                     // 217
                                                                                                                       //
			var searchOptions = {                                                                                               // 219
				filter: domain_search.filter.replace(/#{username}/g, username),                                                    // 220
				scope: 'sub'                                                                                                       // 221
			};                                                                                                                  //
                                                                                                                       //
			logger.search.info('Searching user', username);                                                                     // 224
			logger.search.debug('searchOptions', searchOptions);                                                                // 225
			logger.search.debug('domain_base', self.options.domain_base);                                                       // 226
                                                                                                                       //
			return self.searchAllSync(self.options.domain_base, searchOptions);                                                 // 228
		}                                                                                                                    //
                                                                                                                       //
		return searchUsersSync;                                                                                              //
	})();                                                                                                                 //
                                                                                                                       //
	LDAP.prototype.getUserByIdSync = (function () {                                                                       // 12
		function getUserByIdSync(id, attribute) {                                                                            // 231
			var self = this;                                                                                                    // 232
                                                                                                                       //
			self.bindIfNecessary();                                                                                             // 234
                                                                                                                       //
			var domain_search = self.getDomainBindSearch();                                                                     // 236
                                                                                                                       //
			var Unique_Identifier_Field = RocketChat.settings.get('LDAP_Unique_Identifier_Field').split(',');                   // 238
                                                                                                                       //
			var filter = undefined;                                                                                             // 240
                                                                                                                       //
			if (attribute) {                                                                                                    // 242
				filter = new self.ldapjs.filters.EqualityFilter({                                                                  // 243
					attribute: attribute,                                                                                             // 244
					value: new Buffer(id, 'hex')                                                                                      // 245
				});                                                                                                                //
			} else {                                                                                                            //
				(function () {                                                                                                     //
					var filters = [];                                                                                                 // 248
					Unique_Identifier_Field.forEach(function (item) {                                                                 // 249
						filters.push(new self.ldapjs.filters.EqualityFilter({                                                            // 250
							attribute: item,                                                                                                // 251
							value: new Buffer(id, 'hex')                                                                                    // 252
						}));                                                                                                             //
					});                                                                                                               //
                                                                                                                       //
					filter = new self.ldapjs.filters.OrFilter({ filters: filters });                                                  // 256
				})();                                                                                                              //
			}                                                                                                                   //
                                                                                                                       //
			var searchOptions = {                                                                                               // 259
				filter: filter,                                                                                                    // 260
				scope: 'sub'                                                                                                       // 261
			};                                                                                                                  //
                                                                                                                       //
			logger.search.info('Searching by id', id);                                                                          // 264
			logger.search.debug('search filter', searchOptions.filter.toString());                                              // 265
			logger.search.debug('domain_base', self.options.domain_base);                                                       // 266
                                                                                                                       //
			var result = self.searchAllSync(self.options.domain_base, searchOptions);                                           // 268
                                                                                                                       //
			if (!Array.isArray(result) || result.length === 0) {                                                                // 270
				return;                                                                                                            // 271
			}                                                                                                                   //
                                                                                                                       //
			if (result.length > 1) {                                                                                            // 274
				logger.search.error('Search by id', id, 'returned', result.length, 'records');                                     // 275
			}                                                                                                                   //
                                                                                                                       //
			return result[0];                                                                                                   // 278
		}                                                                                                                    //
                                                                                                                       //
		return getUserByIdSync;                                                                                              //
	})();                                                                                                                 //
                                                                                                                       //
	LDAP.prototype.getUserByUsernameSync = (function () {                                                                 // 12
		function getUserByUsernameSync(username) {                                                                           // 281
			var self = this;                                                                                                    // 282
                                                                                                                       //
			self.bindIfNecessary();                                                                                             // 284
                                                                                                                       //
			var domain_search = self.getDomainBindSearch();                                                                     // 286
                                                                                                                       //
			var searchOptions = {                                                                                               // 288
				filter: domain_search.filter.replace(/#{username}/g, username),                                                    // 289
				scope: 'sub'                                                                                                       // 290
			};                                                                                                                  //
                                                                                                                       //
			logger.search.info('Searching user', username);                                                                     // 293
			logger.search.debug('searchOptions', searchOptions);                                                                // 294
			logger.search.debug('domain_base', self.options.domain_base);                                                       // 295
                                                                                                                       //
			var result = self.searchAllSync(self.options.domain_base, searchOptions);                                           // 297
                                                                                                                       //
			if (!Array.isArray(result) || result.length === 0) {                                                                // 299
				return;                                                                                                            // 300
			}                                                                                                                   //
                                                                                                                       //
			if (result.length > 1) {                                                                                            // 303
				logger.search.error('Search by id', id, 'returned', result.length, 'records');                                     // 304
			}                                                                                                                   //
                                                                                                                       //
			return result[0];                                                                                                   // 307
		}                                                                                                                    //
                                                                                                                       //
		return getUserByUsernameSync;                                                                                        //
	})();                                                                                                                 //
                                                                                                                       //
	LDAP.prototype.searchAllAsync = (function () {                                                                        // 12
		function searchAllAsync(domain_base, options, callback) {                                                            // 310
			var self = this;                                                                                                    // 311
                                                                                                                       //
			self.client.search(domain_base, options, function (error, res) {                                                    // 313
				if (error) {                                                                                                       // 314
					logger.search.error(error);                                                                                       // 315
					callback(error);                                                                                                  // 316
					return;                                                                                                           // 317
				}                                                                                                                  //
                                                                                                                       //
				res.on('error', function (error) {                                                                                 // 320
					logger.search.error(error);                                                                                       // 321
					callback(error);                                                                                                  // 322
					return;                                                                                                           // 323
				});                                                                                                                //
                                                                                                                       //
				var entries = [];                                                                                                  // 326
				var jsonEntries = [];                                                                                              // 327
                                                                                                                       //
				res.on('searchEntry', function (entry) {                                                                           // 329
					entries.push(entry);                                                                                              // 330
					jsonEntries.push(entry.json);                                                                                     // 331
				});                                                                                                                //
                                                                                                                       //
				res.on('end', function (result) {                                                                                  // 334
					logger.search.info('Search result count', entries.length);                                                        // 335
					logger.search.debug('Search result', JSON.stringify(jsonEntries, null, 2));                                       // 336
					callback(null, entries);                                                                                          // 337
				});                                                                                                                //
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return searchAllAsync;                                                                                               //
	})();                                                                                                                 //
                                                                                                                       //
	LDAP.prototype.authSync = (function () {                                                                              // 12
		function authSync(dn, password) {                                                                                    // 342
			var self = this;                                                                                                    // 343
                                                                                                                       //
			logger.auth.info('Authenticating', dn);                                                                             // 345
                                                                                                                       //
			try {                                                                                                               // 347
				self.bindSync(dn, password);                                                                                       // 348
				logger.auth.info('Authenticated', dn);                                                                             // 349
				return true;                                                                                                       // 350
			} catch (error) {                                                                                                   //
				logger.auth.info('Not authenticated', dn);                                                                         // 352
				logger.auth.debug('error', error);                                                                                 // 353
				return false;                                                                                                      // 354
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return authSync;                                                                                                     //
	})();                                                                                                                 //
                                                                                                                       //
	LDAP.prototype.disconnect = (function () {                                                                            // 12
		function disconnect() {                                                                                              // 358
			var self = this;                                                                                                    // 359
                                                                                                                       //
			self.connected = false;                                                                                             // 361
			logger.connection.info('Disconecting');                                                                             // 362
			self.client.unbind();                                                                                               // 363
		}                                                                                                                    //
                                                                                                                       //
		return disconnect;                                                                                                   //
	})();                                                                                                                 //
                                                                                                                       //
	return LDAP;                                                                                                          //
})();                                                                                                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_ldap/server/sync.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var logger = new Logger('LDAPSync', {});                                                                               // 1
                                                                                                                       //
slug = (function () {                                                                                                  // 3
	function slug(text) {                                                                                                 // 3
		if (RocketChat.settings.get('UTF8_Names_Slugify') !== true) {                                                        // 4
			return text;                                                                                                        // 5
		}                                                                                                                    //
		text = slugify(text, '.');                                                                                           // 7
		return text.replace(/[^0-9a-z-_.]/g, '');                                                                            // 8
	}                                                                                                                     //
                                                                                                                       //
	return slug;                                                                                                          //
})();                                                                                                                  //
                                                                                                                       //
getLdapUsername = (function () {                                                                                       // 12
	function getLdapUsername(ldapUser) {                                                                                  // 12
		var usernameField = RocketChat.settings.get('LDAP_Username_Field');                                                  // 13
                                                                                                                       //
		if (usernameField.indexOf('#{') > -1) {                                                                              // 15
			return usernameField.replace(/#{(.+?)}/g, function (match, field) {                                                 // 16
				return ldapUser.object[field];                                                                                     // 17
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return ldapUser.object[usernameField];                                                                               // 21
	}                                                                                                                     //
                                                                                                                       //
	return getLdapUsername;                                                                                               //
})();                                                                                                                  //
                                                                                                                       //
getLdapUserUniqueID = (function () {                                                                                   // 25
	function getLdapUserUniqueID(ldapUser) {                                                                              // 25
		var Unique_Identifier_Field = RocketChat.settings.get('LDAP_Unique_Identifier_Field');                               // 26
                                                                                                                       //
		if (Unique_Identifier_Field !== '') {                                                                                // 28
			Unique_Identifier_Field = Unique_Identifier_Field.replace(/\s/g, '').split(',');                                    // 29
		} else {                                                                                                             //
			Unique_Identifier_Field = [];                                                                                       // 31
		}                                                                                                                    //
                                                                                                                       //
		var LDAP_Domain_Search_User_ID = RocketChat.settings.get('LDAP_Domain_Search_User_ID');                              // 34
                                                                                                                       //
		if (LDAP_Domain_Search_User_ID !== '') {                                                                             // 36
			LDAP_Domain_Search_User_ID = LDAP_Domain_Search_User_ID.replace(/\s/g, '').split(',');                              // 37
		} else {                                                                                                             //
			LDAP_Domain_Search_User_ID = [];                                                                                    // 39
		}                                                                                                                    //
                                                                                                                       //
		Unique_Identifier_Field = Unique_Identifier_Field.concat(LDAP_Domain_Search_User_ID);                                // 42
                                                                                                                       //
		if (Unique_Identifier_Field.length > 0) {                                                                            // 44
			Unique_Identifier_Field = Unique_Identifier_Field.find(function (field) {                                           // 45
				return !_.isEmpty(ldapUser.object[field]);                                                                         // 46
			});                                                                                                                 //
			if (Unique_Identifier_Field) {                                                                                      // 48
				Unique_Identifier_Field = {                                                                                        // 49
					attribute: Unique_Identifier_Field,                                                                               // 50
					value: ldapUser.raw[Unique_Identifier_Field].toString('hex')                                                      // 51
				};                                                                                                                 //
			}                                                                                                                   //
			return Unique_Identifier_Field;                                                                                     // 54
		}                                                                                                                    //
	}                                                                                                                     //
                                                                                                                       //
	return getLdapUserUniqueID;                                                                                           //
})();                                                                                                                  //
                                                                                                                       //
getDataToSyncUserData = (function () {                                                                                 // 59
	function getDataToSyncUserData(ldapUser, user) {                                                                      // 59
		var syncUserData = RocketChat.settings.get('LDAP_Sync_User_Data');                                                   // 60
		var syncUserDataFieldMap = RocketChat.settings.get('LDAP_Sync_User_Data_FieldMap').trim();                           // 61
                                                                                                                       //
		if (syncUserData && syncUserDataFieldMap) {                                                                          // 63
			var _ret = (function () {                                                                                           //
				var fieldMap = JSON.parse(syncUserDataFieldMap);                                                                   // 64
				var userData = {};                                                                                                 // 65
                                                                                                                       //
				var emailList = [];                                                                                                // 67
				_.map(fieldMap, function (userField, ldapField) {                                                                  // 68
					if (!ldapUser.object.hasOwnProperty(ldapField)) {                                                                 // 69
						return;                                                                                                          // 70
					}                                                                                                                 //
                                                                                                                       //
					switch (userField) {                                                                                              // 73
						case 'email':                                                                                                    // 74
							if (_.isObject(ldapUser.object[ldapField] === 'object')) {                                                      // 75
								_.map(ldapUser.object[ldapField], function (item) {                                                            // 76
									emailList.push({ address: item, verified: true });                                                            // 77
								});                                                                                                            //
							} else {                                                                                                        //
								emailList.push({ address: ldapUser.object[ldapField], verified: true });                                       // 80
							}                                                                                                               //
							break;                                                                                                          // 82
                                                                                                                       //
						case 'name':                                                                                                     // 82
							if (user.name !== ldapUser.object[ldapField]) {                                                                 // 85
								userData.name = ldapUser.object[ldapField];                                                                    // 86
							}                                                                                                               //
							break;                                                                                                          // 88
					}                                                                                                                 // 88
				});                                                                                                                //
                                                                                                                       //
				if (emailList.length > 0) {                                                                                        // 92
					if (JSON.stringify(user.emails) !== JSON.stringify(emailList)) {                                                  // 93
						userData.emails = emailList;                                                                                     // 94
					}                                                                                                                 //
				}                                                                                                                  //
                                                                                                                       //
				var uniqueId = getLdapUserUniqueID(ldapUser);                                                                      // 98
                                                                                                                       //
				if (uniqueId && (!user.services || !user.services.ldap || user.services.ldap.id !== uniqueId.value || user.services.ldap.idAttribute !== uniqueId.attribute)) {
					userData['services.ldap.id'] = uniqueId.value;                                                                    // 101
					userData['services.ldap.idAttribute'] = uniqueId.attribute;                                                       // 102
				}                                                                                                                  //
                                                                                                                       //
				if (_.size(userData)) {                                                                                            // 105
					return {                                                                                                          // 106
						v: userData                                                                                                      //
					};                                                                                                                //
				}                                                                                                                  //
			})();                                                                                                               //
                                                                                                                       //
			if (typeof _ret === 'object') return _ret.v;                                                                        //
		}                                                                                                                    //
	}                                                                                                                     //
                                                                                                                       //
	return getDataToSyncUserData;                                                                                         //
})();                                                                                                                  //
                                                                                                                       //
syncUserData = (function () {                                                                                          // 112
	function syncUserData(user, ldapUser) {                                                                               // 112
		logger.info('Syncing user data');                                                                                    // 113
		logger.debug('user', user);                                                                                          // 114
		logger.debug('ldapUser', ldapUser);                                                                                  // 115
                                                                                                                       //
		var userData = getDataToSyncUserData(ldapUser, user);                                                                // 117
		if (user && user._id && userData) {                                                                                  // 118
			Meteor.users.update(user._id, { $set: userData });                                                                  // 119
			user = Meteor.users.findOne({ _id: user._id });                                                                     // 120
			logger.debug('setting', JSON.stringify(userData, null, 2));                                                         // 121
		}                                                                                                                    //
                                                                                                                       //
		var username = slug(getLdapUsername(ldapUser));                                                                      // 124
		if (user && user._id && username !== user.username) {                                                                // 125
			logger.info('Syncing user username', user.username, '->', username);                                                // 126
			RocketChat._setUsername(user._id, username);                                                                        // 127
		}                                                                                                                    //
                                                                                                                       //
		if (user && user._id && RocketChat.settings.get('LDAP_Sync_User_Avatar') === true) {                                 // 130
			var avatar = ldapUser.raw.thumbnailPhoto || ldapUser.raw.jpegPhoto;                                                 // 131
			if (avatar) {                                                                                                       // 132
				logger.info('Syncing user avatar');                                                                                // 133
				var rs = RocketChatFile.bufferToStream(avatar);                                                                    // 134
				RocketChatFileAvatarInstance.deleteFile(encodeURIComponent(user.username + '.jpg'));                               // 135
				var ws = RocketChatFileAvatarInstance.createWriteStream(encodeURIComponent(user.username + '.jpg'), 'image/jpeg');
				ws.on('end', Meteor.bindEnvironment(function () {                                                                  // 137
					Meteor.setTimeout(function () {                                                                                   // 138
						RocketChat.models.Users.setAvatarOrigin(user._id, 'ldap');                                                       // 139
						RocketChat.Notifications.notifyAll('updateAvatar', { username: user.username });                                 // 140
					}, 500);                                                                                                          //
				}));                                                                                                               //
				rs.pipe(ws);                                                                                                       // 143
			}                                                                                                                   //
		}                                                                                                                    //
	}                                                                                                                     //
                                                                                                                       //
	return syncUserData;                                                                                                  //
})();                                                                                                                  //
                                                                                                                       //
sync = (function () {                                                                                                  // 149
	function sync() {                                                                                                     // 149
		if (RocketChat.settings.get('LDAP_Enable') !== true) {                                                               // 150
			return;                                                                                                             // 151
		}                                                                                                                    //
                                                                                                                       //
		var ldap = new LDAP();                                                                                               // 154
                                                                                                                       //
		try {                                                                                                                // 156
			ldap.connectSync();                                                                                                 // 157
                                                                                                                       //
			users = RocketChat.models.Users.findLDAPUsers();                                                                    // 159
                                                                                                                       //
			users.forEach(function (user) {                                                                                     // 161
				var ldapUser = undefined;                                                                                          // 162
                                                                                                                       //
				if (user.services && user.services.ldap && user.services.ldap.id) {                                                // 164
					ldapUser = ldap.getUserByIdSync(user.services.ldap.id, user.services.ldap.idAttribute);                           // 165
				} else {                                                                                                           //
					ldapUser = ldap.getUserByUsernameSync(user.username);                                                             // 167
				}                                                                                                                  //
                                                                                                                       //
				if (ldapUser) {                                                                                                    // 170
					syncUserData(user, ldapUser);                                                                                     // 171
				} else {                                                                                                           //
					logger.info('Can\'t sync user', user.username);                                                                   // 173
				}                                                                                                                  //
			});                                                                                                                 //
		} catch (error) {                                                                                                    //
			logger.error(error);                                                                                                // 177
			return error;                                                                                                       // 178
		}                                                                                                                    //
                                                                                                                       //
		ldap.disconnect();                                                                                                   // 181
		return true;                                                                                                         // 182
	}                                                                                                                     //
                                                                                                                       //
	return sync;                                                                                                          //
})();                                                                                                                  //
                                                                                                                       //
var interval = undefined;                                                                                              // 185
var timer = undefined;                                                                                                 // 186
                                                                                                                       //
RocketChat.settings.get('LDAP_Sync_User_Data', function (key, value) {                                                 // 188
	Meteor.clearInterval(interval);                                                                                       // 189
	Meteor.clearTimeout(timeout);                                                                                         // 190
                                                                                                                       //
	if (value === true) {                                                                                                 // 192
		logger.info('Enabling LDAP user sync');                                                                              // 193
		interval = Meteor.setInterval(sync, 1000 * 60 * 60);                                                                 // 194
		timeout = Meteor.setTimeout(function () {                                                                            // 195
			sync();                                                                                                             // 196
		}, 1000 * 30);                                                                                                       //
	} else {                                                                                                              //
		logger.info('Disabling LDAP user sync');                                                                             // 199
	}                                                                                                                     //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_ldap/server/loginHandler.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var logger = new Logger('LDAPHandler', {});                                                                            // 1
                                                                                                                       //
function fallbackDefaultAccountSystem(bind, username, password) {                                                      // 3
	if (typeof username === 'string') if (username.indexOf('@') === -1) username = { username: username };else username = { email: username };
                                                                                                                       //
	logger.info('Fallback to default account systen', username);                                                          // 10
                                                                                                                       //
	loginRequest = {                                                                                                      // 12
		user: username,                                                                                                      // 13
		password: {                                                                                                          // 14
			digest: SHA256(password),                                                                                           // 15
			algorithm: "sha-256"                                                                                                // 16
		}                                                                                                                    //
	};                                                                                                                    //
                                                                                                                       //
	return Accounts._runLoginHandlers(bind, loginRequest);                                                                // 20
}                                                                                                                      //
                                                                                                                       //
Accounts.registerLoginHandler("ldap", function (loginRequest) {                                                        // 24
	var self = this;                                                                                                      // 25
                                                                                                                       //
	if (!loginRequest.ldapOptions) {                                                                                      // 27
		return undefined;                                                                                                    // 28
	}                                                                                                                     //
                                                                                                                       //
	logger.info('Init login', loginRequest.username);                                                                     // 31
                                                                                                                       //
	if (RocketChat.settings.get('LDAP_Enable') !== true) {                                                                // 33
		return fallbackDefaultAccountSystem(self, loginRequest.username, loginRequest.ldapPass);                             // 34
	}                                                                                                                     //
                                                                                                                       //
	var ldap = new LDAP();                                                                                                // 37
	var ldapUser = undefined;                                                                                             // 38
                                                                                                                       //
	try {                                                                                                                 // 40
		ldap.connectSync();                                                                                                  // 41
		users = ldap.searchUsersSync(loginRequest.username);                                                                 // 42
                                                                                                                       //
		if (users.length !== 1) {                                                                                            // 44
			logger.info('Search returned', users.length, 'record(s) for', loginRequest.username);                               // 45
			throw new Error('User not Found');                                                                                  // 46
		}                                                                                                                    //
                                                                                                                       //
		if (ldap.authSync(users[0].dn, loginRequest.ldapPass) === true) {                                                    // 49
			ldapUser = users[0];                                                                                                // 50
		} else {                                                                                                             //
			logger.info('Wrong password for', loginRequest.username);                                                           // 52
		}                                                                                                                    //
	} catch (error) {                                                                                                     //
		logger.error(error);                                                                                                 // 55
	}                                                                                                                     //
                                                                                                                       //
	ldap.disconnect();                                                                                                    // 58
                                                                                                                       //
	if (ldapUser === undefined) {                                                                                         // 60
		return fallbackDefaultAccountSystem(self, loginRequest.username, loginRequest.ldapPass);                             // 61
	}                                                                                                                     //
                                                                                                                       //
	var username = undefined;                                                                                             // 64
                                                                                                                       //
	if (RocketChat.settings.get('LDAP_Username_Field') !== '') {                                                          // 66
		username = slug(getLdapUsername(ldapUser));                                                                          // 67
	} else {                                                                                                              //
		username = slug(loginRequest.username);                                                                              // 69
	}                                                                                                                     //
                                                                                                                       //
	// Look to see if user already exists                                                                                 //
	var userQuery = undefined;                                                                                            // 73
                                                                                                                       //
	var Unique_Identifier_Field = getLdapUserUniqueID(ldapUser);                                                          // 75
	var user = undefined;                                                                                                 // 76
                                                                                                                       //
	if (Unique_Identifier_Field) {                                                                                        // 78
		userQuery = {                                                                                                        // 79
			'services.ldap.id': Unique_Identifier_Field.value                                                                   // 80
		};                                                                                                                   //
                                                                                                                       //
		logger.info('Querying user');                                                                                        // 83
		logger.debug('userQuery', userQuery);                                                                                // 84
                                                                                                                       //
		user = Meteor.users.findOne(userQuery);                                                                              // 86
	}                                                                                                                     //
                                                                                                                       //
	if (!user) {                                                                                                          // 89
		userQuery = {                                                                                                        // 90
			username: username                                                                                                  // 91
		};                                                                                                                   //
                                                                                                                       //
		logger.debug('userQuery', userQuery);                                                                                // 94
                                                                                                                       //
		user = Meteor.users.findOne(userQuery);                                                                              // 96
	}                                                                                                                     //
                                                                                                                       //
	// Login user if they exist                                                                                           //
	if (user) {                                                                                                           // 100
		if (user.ldap !== true) {                                                                                            // 101
			logger.info('User exists without "ldap: true"');                                                                    // 102
			throw new Meteor.Error("LDAP-login-error", "LDAP Authentication succeded, but there's already an existing user with provided username [" + username + "] in Mongo.");
		}                                                                                                                    //
                                                                                                                       //
		logger.info('Logging user');                                                                                         // 106
                                                                                                                       //
		var stampedToken = Accounts._generateStampedLoginToken();                                                            // 108
		var hashStampedToken = Meteor.users.update(user._id, {                                                               // 109
			$push: {                                                                                                            // 111
				'services.resume.loginTokens': Accounts._hashStampedToken(stampedToken)                                            // 112
			}                                                                                                                   //
		});                                                                                                                  //
                                                                                                                       //
		syncUserData(user, ldapUser);                                                                                        // 116
		Accounts.setPassword(user._id, loginRequest.ldapPass, { logout: false });                                            // 117
		return {                                                                                                             // 118
			userId: user._id,                                                                                                   // 119
			token: stampedToken.token                                                                                           // 120
		};                                                                                                                   //
	}                                                                                                                     //
                                                                                                                       //
	logger.info('User does not exists, creating', username);                                                              // 124
	// Create new user                                                                                                    //
	var userObject = {                                                                                                    // 126
		username: username                                                                                                   // 127
	};                                                                                                                    //
                                                                                                                       //
	var userData = getDataToSyncUserData(ldapUser, {});                                                                   // 130
                                                                                                                       //
	if (userData && userData.emails) {                                                                                    // 132
		userObject.email = userData.emails[0].address;                                                                       // 133
	} else if (ldapUser.object.mail && ldapUser.object.mail.indexOf('@') > -1) {                                          //
		userObject.email = ldapUser.object.mail;                                                                             // 135
	} else if (RocketChat.settings.get('LDAP_Default_Domain') !== '') {                                                   //
		userObject.email = username + '@' + RocketChat.settings.get('LDAP_Default_Domain');                                  // 137
	} else {                                                                                                              //
		var error = new Meteor.Error("LDAP-login-error", "LDAP Authentication succeded, there is no email to create an account. Have you tried setting your Default Domain in LDAP Settings?");
		logger.error(error);                                                                                                 // 140
		throw error;                                                                                                         // 141
	}                                                                                                                     //
                                                                                                                       //
	logger.debug('New user data', userObject);                                                                            // 144
                                                                                                                       //
	userObject.password = loginRequest.ldapPass;                                                                          // 146
                                                                                                                       //
	try {                                                                                                                 // 148
		userObject._id = Accounts.createUser(userObject);                                                                    // 149
	} catch (error) {                                                                                                     //
		logger.error('Error creating user', error);                                                                          // 151
		throw error;                                                                                                         // 152
	}                                                                                                                     //
                                                                                                                       //
	syncUserData(userObject, ldapUser);                                                                                   // 155
                                                                                                                       //
	var ldapUserService = {                                                                                               // 157
		ldap: true                                                                                                           // 158
	};                                                                                                                    //
                                                                                                                       //
	if (Unique_Identifier_Field) {                                                                                        // 161
		ldapUserService['services.ldap.idAttribute'] = Unique_Identifier_Field.attribute;                                    // 162
		ldapUserService['services.ldap.id'] = Unique_Identifier_Field.value;                                                 // 163
	}                                                                                                                     //
                                                                                                                       //
	Meteor.users.update(userObject._id, {                                                                                 // 166
		$set: ldapUserService                                                                                                // 167
	});                                                                                                                   //
                                                                                                                       //
	logger.info('Joining user to default channels');                                                                      // 170
	Meteor.runAsUser(userObject._id, function () {                                                                        // 171
		Meteor.call('joinDefaultChannels');                                                                                  // 172
	});                                                                                                                   //
                                                                                                                       //
	return {                                                                                                              // 175
		userId: userObject._id                                                                                               // 176
	};                                                                                                                    //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_ldap/server/settings.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.startup(function () {                                                                                           // 1
	RocketChat.settings.addGroup('LDAP', function () {                                                                    // 2
		var enableQuery = { _id: 'LDAP_Enable', value: true };                                                               // 3
		var enableTLSQuery = [{ _id: 'LDAP_Enable', value: true }, { _id: 'LDAP_Encryption', value: { $in: ['tls', 'ssl'] } }];
		var customBindSearchEnabledQuery = [{ _id: 'LDAP_Enable', value: true }, { _id: 'LDAP_Use_Custom_Domain_Search', value: true }];
		var customBindSearchDisabledQuery = [{ _id: 'LDAP_Enable', value: true }, { _id: 'LDAP_Use_Custom_Domain_Search', value: false }];
		var syncDataQuery = [{ _id: 'LDAP_Enable', value: true }, { _id: 'LDAP_Sync_User_Data', value: true }];              // 16
                                                                                                                       //
		this.add('LDAP_Enable', false, { type: 'boolean', 'public': true });                                                 // 21
		this.add('LDAP_Host', '', { type: 'string', enableQuery: enableQuery });                                             // 22
		this.add('LDAP_Port', '389', { type: 'string', enableQuery: enableQuery });                                          // 23
		this.add('LDAP_Encryption', 'plain', { type: 'select', values: [{ key: 'plain', i18nLabel: 'No_Encryption' }, { key: 'tls', i18nLabel: 'StartTLS' }, { key: 'ssl', i18nLabel: 'SSL/LDAPS' }], enableQuery: enableQuery });
		this.add('LDAP_CA_Cert', '', { type: 'string', multiline: true, enableQuery: enableTLSQuery });                      // 25
		this.add('LDAP_Reject_Unauthorized', true, { type: 'boolean', enableQuery: enableTLSQuery });                        // 26
		this.add('LDAP_Domain_Base', '', { type: 'string', enableQuery: enableQuery });                                      // 27
		this.add('LDAP_Use_Custom_Domain_Search', false, { type: 'boolean', enableQuery: enableQuery });                     // 28
		this.add('LDAP_Custom_Domain_Search', '', { type: 'string', enableQuery: customBindSearchEnabledQuery });            // 29
		this.add('LDAP_Domain_Search_User', '', { type: 'string', enableQuery: customBindSearchDisabledQuery });             // 30
		this.add('LDAP_Domain_Search_Password', '', { type: 'password', enableQuery: customBindSearchDisabledQuery });       // 31
		this.add('LDAP_Domain_Search_Filter', '', { type: 'string', enableQuery: customBindSearchDisabledQuery });           // 32
		this.add('LDAP_Domain_Search_User_ID', 'sAMAccountName', { type: 'string', enableQuery: customBindSearchDisabledQuery });
		this.add('LDAP_Domain_Search_Object_Class', 'user', { type: 'string', enableQuery: customBindSearchDisabledQuery });
		this.add('LDAP_Domain_Search_Object_Category', 'person', { type: 'string', enableQuery: customBindSearchDisabledQuery });
		this.add('LDAP_Username_Field', 'sAMAccountName', { type: 'string', enableQuery: enableQuery });                     // 36
		this.add('LDAP_Unique_Identifier_Field', 'objectGUID,ibm-entryUUID,GUID,dominoUNID,nsuniqueId,uidNumber', { type: 'string', enableQuery: enableQuery });
		this.add('LDAP_Sync_User_Data', false, { type: 'boolean', enableQuery: enableQuery });                               // 38
		this.add('LDAP_Sync_User_Avatar', true, { type: 'boolean', enableQuery: syncDataQuery });                            // 39
		this.add('LDAP_Sync_User_Data_FieldMap', '{"cn":"name", "mail":"email"}', { type: 'string', enableQuery: syncDataQuery });
		this.add('LDAP_Default_Domain', '', { type: 'string', enableQuery: enableQuery });                                   // 41
		this.add('LDAP_Test_Connection', 'ldap_test_connection', { type: 'action', actionText: 'Test_Connection' });         // 42
		this.add('LDAP_Sync_Users', 'ldap_sync_users', { type: 'action', actionText: 'Sync_Users' });                        // 43
	});                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_ldap/server/testConnection.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	ldap_test_connection: function () {                                                                                   // 2
		user = Meteor.user();                                                                                                // 3
		if (!user) {                                                                                                         // 4
			throw new Meteor.Error('unauthorized', '[methods] ldap_test_connection -> Unauthorized');                           // 5
		}                                                                                                                    //
                                                                                                                       //
		if (!RocketChat.authz.hasRole(user._id, 'admin')) {                                                                  // 8
			throw new Meteor.Error('unauthorized', '[methods] ldap_test_connection -> Unauthorized');                           // 9
		}                                                                                                                    //
                                                                                                                       //
		if (RocketChat.settings.get('LDAP_Enable') !== true) {                                                               // 12
			throw new Meteor.Error('LDAP_disabled');                                                                            // 13
		}                                                                                                                    //
                                                                                                                       //
		var ldap = undefined;                                                                                                // 16
		try {                                                                                                                // 17
			ldap = new LDAP();                                                                                                  // 18
			ldap.connectSync();                                                                                                 // 19
		} catch (error) {                                                                                                    //
			console.log(error);                                                                                                 // 21
			throw new Meteor.Error(error.message);                                                                              // 22
		}                                                                                                                    //
                                                                                                                       //
		try {                                                                                                                // 25
			ldap.bindIfNecessary();                                                                                             // 26
			ldap.disconnect();                                                                                                  // 27
		} catch (error) {                                                                                                    //
			throw new Meteor.Error(error.name || error.message);                                                                // 29
		}                                                                                                                    //
                                                                                                                       //
		return {                                                                                                             // 32
			message: "Connection_success",                                                                                      // 33
			params: []                                                                                                          // 34
		};                                                                                                                   //
	}                                                                                                                     //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_ldap/server/syncUsers.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	ldap_sync_users: function () {                                                                                        // 2
		user = Meteor.user();                                                                                                // 3
		if (!user) {                                                                                                         // 4
			throw new Meteor.Error('unauthorized', '[methods] ldap_sync_users -> Unauthorized');                                // 5
		}                                                                                                                    //
                                                                                                                       //
		if (!RocketChat.authz.hasRole(user._id, 'admin')) {                                                                  // 8
			throw new Meteor.Error('unauthorized', '[methods] ldap_sync_users -> Unauthorized');                                // 9
		}                                                                                                                    //
                                                                                                                       //
		if (RocketChat.settings.get('LDAP_Enable') !== true) {                                                               // 12
			throw new Meteor.Error('LDAP_disabled');                                                                            // 13
		}                                                                                                                    //
                                                                                                                       //
		result = sync();                                                                                                     // 16
                                                                                                                       //
		if (result === true) {                                                                                               // 18
			return {                                                                                                            // 19
				message: "Sync_success",                                                                                           // 20
				params: []                                                                                                         // 21
			};                                                                                                                  //
		}                                                                                                                    //
                                                                                                                       //
		throw result;                                                                                                        // 25
	}                                                                                                                     //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:ldap'] = {
  LDAP: LDAP
};

})();

//# sourceMappingURL=rocketchat_ldap.js.map
