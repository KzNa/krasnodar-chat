(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var Autoupdate = Package.autoupdate.Autoupdate;
var ECMAScript = Package.ecmascript.ECMAScript;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var WebApp, Autoupdate, head, html, updateUser, department, visitor, room, updateData, query, update, trigger, translations;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/livechat.js                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
WebApp = Package.webapp.WebApp;                                                                                      // 1
Autoupdate = Package.autoupdate.Autoupdate;                                                                          // 2
                                                                                                                     //
WebApp.connectHandlers.use('/livechat/', function (req, res, next) {                                                 // 4
	res.setHeader('content-type', 'text/html; charset=utf-8');                                                          // 5
                                                                                                                     //
	head = Assets.getText('public/head.html');                                                                          // 7
                                                                                                                     //
	html = '<html>\n\t\t<head>\n\t\t\t<link rel="stylesheet" type="text/css" class="__meteor-css__" href="/packages/rocketchat_livechat/public/livechat.css?_dc=' + Autoupdate.autoupdateVersion + '">\n\t\t\t<script type="text/javascript">\n\t\t\t\t__meteor_runtime_config__ = ' + JSON.stringify(__meteor_runtime_config__) + ';\n\t\t\t</script>\n\t\t\t<script type="text/javascript" src="/packages/rocketchat_livechat/public/livechat.js?_dc=' + Autoupdate.autoupdateVersion + '"></script>\n\n\t\t\t' + head + '\n\t\t</head>\n\t\t<body>\n\t\t</body>\n\t</html>';
                                                                                                                     //
	res.write(html);                                                                                                    // 23
	res.end();                                                                                                          // 24
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/startup.js                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.startup(function () {                                                                                         // 1
	RocketChat.roomTypes.setPublish('l', function (identifier) {                                                        // 2
		return RocketChat.models.Rooms.findByTypeAndName('l', identifier, {                                                // 3
			fields: {                                                                                                         // 4
				name: 1,                                                                                                         // 5
				t: 1,                                                                                                            // 6
				cl: 1,                                                                                                           // 7
				u: 1,                                                                                                            // 8
				usernames: 1,                                                                                                    // 9
				v: 1                                                                                                             // 10
			}                                                                                                                 //
		});                                                                                                                //
	});                                                                                                                 //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/permissions.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.startup(function () {                                                                                         // 1
	var roles = _.pluck(RocketChat.models.Roles.find().fetch(), 'name');                                                // 2
	if (roles.indexOf('livechat-agent') === -1) {                                                                       // 3
		RocketChat.models.Roles.createOrUpdate('livechat-agent');                                                          // 4
	}                                                                                                                   //
	if (roles.indexOf('livechat-manager') === -1) {                                                                     // 6
		RocketChat.models.Roles.createOrUpdate('livechat-manager');                                                        // 7
	}                                                                                                                   //
	if (roles.indexOf('livechat-guest') === -1) {                                                                       // 9
		RocketChat.models.Roles.createOrUpdate('livechat-guest');                                                          // 10
	}                                                                                                                   //
	if (RocketChat.models && RocketChat.models.Permissions) {                                                           // 12
		RocketChat.models.Permissions.createOrUpdate('view-l-room', ['livechat-agent', 'livechat-manager', 'admin']);      // 13
		RocketChat.models.Permissions.createOrUpdate('view-livechat-manager', ['livechat-manager', 'admin']);              // 14
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/config.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.startup(function () {                                                                                         // 1
	RocketChat.settings.addGroup('Livechat');                                                                           // 2
	RocketChat.settings.add('Livechat_title', 'Rocket.Chat', { type: 'string', group: 'Livechat', 'public': true });    // 3
	RocketChat.settings.add('Livechat_title_color', '#C1272D', { type: 'string', group: 'Livechat', 'public': true });  // 4
	RocketChat.settings.add('Livechat_enabled', false, { type: 'boolean', group: 'Livechat', 'public': true });         // 5
	RocketChat.settings.add('Livechat_registration_form', true, { type: 'boolean', group: 'Livechat', 'public': true, i18nLabel: 'Show_preregistration_form' });
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/client/stylesheets/load.js                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
RocketChat.theme.addPackageAsset(function () {                                                                       // 1
	return Assets.getText('client/stylesheets/livechat.less');                                                          // 2
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/methods/addAgent.js                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	'livechat:addAgent': function (username) {                                                                          // 2
		if (!Meteor.userId() || !RocketChat.authz.hasPermission(Meteor.userId(), 'view-livechat-manager')) {               // 3
			throw new Meteor.Error("not-authorized");                                                                         // 4
		}                                                                                                                  //
                                                                                                                     //
		if (!username || !_.isString(username)) {                                                                          // 7
			throw new Meteor.Error('invalid-arguments');                                                                      // 8
		}                                                                                                                  //
                                                                                                                     //
		var user = RocketChat.models.Users.findOneByUsername(username, { fields: { _id: 1 } });                            // 11
                                                                                                                     //
		if (!user) {                                                                                                       // 13
			throw new Meteor.Error('user-not-found', 'Username_not_found');                                                   // 14
		}                                                                                                                  //
                                                                                                                     //
		if (RocketChat.authz.addUserRoles(user._id, 'livechat-agent')) {                                                   // 17
			return RocketChat.models.Users.setOperator(user._id, true);                                                       // 18
		}                                                                                                                  //
                                                                                                                     //
		return false;                                                                                                      // 21
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/methods/addManager.js                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	'livechat:addManager': function (username) {                                                                        // 2
		if (!Meteor.userId() || !RocketChat.authz.hasPermission(Meteor.userId(), 'view-livechat-manager')) {               // 3
			throw new Meteor.Error("not-authorized");                                                                         // 4
		}                                                                                                                  //
                                                                                                                     //
		if (!username || !_.isString(username)) {                                                                          // 7
			throw new Meteor.Error('invalid-arguments');                                                                      // 8
		}                                                                                                                  //
                                                                                                                     //
		var user = RocketChat.models.Users.findOneByUsername(username, { fields: { _id: 1 } });                            // 11
                                                                                                                     //
		if (!user) {                                                                                                       // 13
			throw new Meteor.Error('user-not-found', 'Username_not_found');                                                   // 14
		}                                                                                                                  //
                                                                                                                     //
		return RocketChat.authz.addUserRoles(user._id, 'livechat-manager');                                                // 17
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/methods/pageVisited.js                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	'livechat:pageVisited': function (token, pageInfo) {                                                                // 2
		return RocketChat.models.LivechatPageVisitied.saveByToken(token, pageInfo);                                        // 3
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/methods/registerGuest.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	'livechat:registerGuest': function () {                                                                             // 2
		var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];                                //
                                                                                                                     //
		var token = _ref.token;                                                                                            //
		var name = _ref.name;                                                                                              //
		var email = _ref.email;                                                                                            //
		var department = _ref.department;                                                                                  //
                                                                                                                     //
		var pass,                                                                                                          // 3
		    qt,                                                                                                            //
		    user,                                                                                                          //
		    userData,                                                                                                      //
		    userExists,                                                                                                    //
		    userId,                                                                                                        //
		    inc = 0;                                                                                                       //
                                                                                                                     //
		check(token, String);                                                                                              // 5
                                                                                                                     //
		user = Meteor.users.findOne({                                                                                      // 7
			"profile.token": token                                                                                            // 8
		}, {                                                                                                               //
			fields: {                                                                                                         // 10
				_id: 1                                                                                                           // 11
			}                                                                                                                 //
		});                                                                                                                //
                                                                                                                     //
		if (user != null) {                                                                                                // 15
			throw new Meteor.Error('token-already-exists', 'Token already exists');                                           // 16
		}                                                                                                                  //
                                                                                                                     //
		while (true) {                                                                                                     // 19
			qt = Meteor.users.find({                                                                                          // 20
				'profile.guest': true                                                                                            // 21
			}).count() + 1;                                                                                                   //
                                                                                                                     //
			user = 'guest-' + (qt + inc++);                                                                                   // 24
                                                                                                                     //
			userExists = Meteor.users.findOne({                                                                               // 26
				'username': user                                                                                                 // 27
			}, {                                                                                                              //
				fields: {                                                                                                        // 29
					_id: 1                                                                                                          // 30
				}                                                                                                                //
			});                                                                                                               //
                                                                                                                     //
			if (!userExists) {                                                                                                // 34
				break;                                                                                                           // 35
			}                                                                                                                 //
		}                                                                                                                  //
		userData = {                                                                                                       // 38
			username: user,                                                                                                   // 39
			globalRoles: ['livechat-guest'],                                                                                  // 40
			department: department                                                                                            // 41
		};                                                                                                                 //
                                                                                                                     //
		userData.userAgent = this.connection.httpHeaders['user-agent'];                                                    // 44
		userData.ip = this.connection.httpHeaders['x-real-ip'] || this.connection.clientAddress;                           // 45
		userData.host = this.connection.httpHeaders['host'];                                                               // 46
                                                                                                                     //
		userId = Accounts.insertUserDoc({}, userData);                                                                     // 48
                                                                                                                     //
		updateUser = {                                                                                                     // 50
			name: name || user,                                                                                               // 51
			"profile.guest": true,                                                                                            // 52
			"profile.token": token                                                                                            // 53
		};                                                                                                                 //
                                                                                                                     //
		if (email && email.trim() !== "") {                                                                                // 56
			updateUser.emails = [{ "address": email }];                                                                       // 57
		}                                                                                                                  //
                                                                                                                     //
		var stampedToken = Accounts._generateStampedLoginToken();                                                          // 60
		var hashStampedToken = Accounts._hashStampedToken(stampedToken);                                                   // 61
                                                                                                                     //
		updateUser.services = {                                                                                            // 63
			resume: {                                                                                                         // 64
				loginTokens: [hashStampedToken]                                                                                  // 65
			}                                                                                                                 //
		};                                                                                                                 //
                                                                                                                     //
		Meteor.users.update(userId, {                                                                                      // 69
			$set: updateUser                                                                                                  // 70
		});                                                                                                                //
                                                                                                                     //
		// update visited page history to not expire                                                                       //
		RocketChat.models.LivechatPageVisitied.keepHistoryForToken(token);                                                 // 74
                                                                                                                     //
		return {                                                                                                           // 76
			userId: userId,                                                                                                   // 77
			token: stampedToken.token                                                                                         // 78
		};                                                                                                                 //
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/methods/removeAgent.js                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	'livechat:removeAgent': function (username) {                                                                       // 2
		if (!Meteor.userId() || !RocketChat.authz.hasPermission(Meteor.userId(), 'view-livechat-manager')) {               // 3
			throw new Meteor.Error("not-authorized");                                                                         // 4
		}                                                                                                                  //
                                                                                                                     //
		if (!username || !_.isString(username)) {                                                                          // 7
			throw new Meteor.Error('invalid-arguments');                                                                      // 8
		}                                                                                                                  //
                                                                                                                     //
		var user = RocketChat.models.Users.findOneByUsername(username, { fields: { _id: 1 } });                            // 11
                                                                                                                     //
		if (!user) {                                                                                                       // 13
			throw new Meteor.Error('user-not-found', 'Username_not_found');                                                   // 14
		}                                                                                                                  //
                                                                                                                     //
		if (RocketChat.authz.removeUserFromRoles(user._id, 'livechat-agent')) {                                            // 17
			return RocketChat.models.Users.setOperator(user._id, false);                                                      // 18
		}                                                                                                                  //
                                                                                                                     //
		return false;                                                                                                      // 21
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/methods/removeDepartment.js                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	'livechat:removeDepartment': function (_id) {                                                                       // 2
		if (!Meteor.userId() || !RocketChat.authz.hasPermission(Meteor.userId(), 'view-livechat-manager')) {               // 3
			throw new Meteor.Error("not-authorized");                                                                         // 4
		}                                                                                                                  //
                                                                                                                     //
		check(_id, String);                                                                                                // 7
                                                                                                                     //
		var department = RocketChat.models.LivechatDepartment.findOneById(_id, { fields: { _id: 1 } });                    // 9
                                                                                                                     //
		if (!department) {                                                                                                 // 11
			throw new Meteor.Error('department-not-found', 'Department_not_found');                                           // 12
		}                                                                                                                  //
                                                                                                                     //
		return RocketChat.models.LivechatDepartment.removeById(_id);                                                       // 15
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/methods/removeManager.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	'livechat:removeManager': function (username) {                                                                     // 2
		if (!Meteor.userId() || !RocketChat.authz.hasPermission(Meteor.userId(), 'view-livechat-manager')) {               // 3
			throw new Meteor.Error("not-authorized");                                                                         // 4
		}                                                                                                                  //
                                                                                                                     //
		check(username, String);                                                                                           // 7
                                                                                                                     //
		var user = RocketChat.models.Users.findOneByUsername(username, { fields: { _id: 1 } });                            // 9
                                                                                                                     //
		if (!user) {                                                                                                       // 11
			throw new Meteor.Error('user-not-found', 'Username_not_found');                                                   // 12
		}                                                                                                                  //
                                                                                                                     //
		return RocketChat.authz.removeUserFromRoles(user._id, 'livechat-manager');                                         // 15
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/methods/removeTrigger.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	'livechat:removeTrigger': function (trigger) {                                                                      // 2
		if (!Meteor.userId() || !RocketChat.authz.hasPermission(Meteor.userId(), 'view-livechat-manager')) {               // 3
			throw new Meteor.Error("not-authorized");                                                                         // 4
		}                                                                                                                  //
                                                                                                                     //
		return RocketChat.models.LivechatTrigger.removeAll();                                                              // 7
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/methods/saveDepartment.js                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	'livechat:saveDepartment': function (_id, departmentData, departmentAgents) {                                       // 2
		if (!Meteor.userId() || !RocketChat.authz.hasPermission(Meteor.userId(), 'view-livechat-manager')) {               // 3
			throw new Meteor.Error("not-authorized");                                                                         // 4
		}                                                                                                                  //
                                                                                                                     //
		if (_id) {                                                                                                         // 7
			check(_id, String);                                                                                               // 8
		}                                                                                                                  //
                                                                                                                     //
		check(departmentData, Match.ObjectIncluding({ enabled: Boolean, name: String, description: Match.Optional(String), agents: Match.Optional([Match.ObjectIncluding({ _id: String, username: String })]) }));
                                                                                                                     //
		if (_id) {                                                                                                         // 13
			department = RocketChat.models.LivechatDepartment.findOneById(_id);                                               // 14
			if (!department) {                                                                                                // 15
				throw new Meteor.Error('department-not-found', 'Department_not_found');                                          // 16
			}                                                                                                                 //
		}                                                                                                                  //
                                                                                                                     //
		return RocketChat.models.LivechatDepartment.createOrUpdateDepartment(_id, departmentData.enabled, departmentData.name, departmentData.description, departmentAgents);
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/methods/saveSurveyFeedback.js                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	'livechat:saveSurveyFeedback': function (visitorToken, visitorRoom, formData) {                                     // 2
		check(visitorToken, String);                                                                                       // 3
		check(visitorRoom, String);                                                                                        // 4
		check(formData, [Match.ObjectIncluding({ name: String, value: String })]);                                         // 5
                                                                                                                     //
		visitor = RocketChat.models.Users.getVisitorByToken(visitorToken);                                                 // 7
		room = RocketChat.models.Rooms.findOneById(visitorRoom);                                                           // 8
                                                                                                                     //
		if (visitor !== undefined && room !== undefined && room.v !== undefined && visitor.profile !== undefined && room.v.token === visitor.profile.token) {
			updateData = {};                                                                                                  // 11
			for (var _iterator = formData, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
				var _ref;                                                                                                        //
                                                                                                                     //
				if (_isArray) {                                                                                                  //
					if (_i >= _iterator.length) break;                                                                              //
					_ref = _iterator[_i++];                                                                                         //
				} else {                                                                                                         //
					_i = _iterator.next();                                                                                          //
					if (_i.done) break;                                                                                             //
					_ref = _i.value;                                                                                                //
				}                                                                                                                //
                                                                                                                     //
				var item = _ref;                                                                                                 //
                                                                                                                     //
				if (_.contains(['satisfaction', 'agentKnowledge', 'agentResposiveness', 'agentFriendliness'], item.name) && _.contains(["1", "2", "3", "4", "5"], item.value)) {
					updateData[item.name] = item.value;                                                                             // 14
				} else if (item.name === 'additionalFeedback') {                                                                 //
					updateData[item.name] = item.value;                                                                             // 16
				}                                                                                                                //
			}                                                                                                                 //
			if (!_.isEmpty(updateData)) {                                                                                     // 19
				return RocketChat.models.Rooms.updateSurveyFeedbackById(room._id, updateData);                                   // 20
			}                                                                                                                 //
		}                                                                                                                  //
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/methods/saveTrigger.js                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	'livechat:saveTrigger': function (trigger) {                                                                        // 2
		if (!Meteor.userId() || !RocketChat.authz.hasPermission(Meteor.userId(), 'view-livechat-manager')) {               // 3
			throw new Meteor.Error("not-authorized");                                                                         // 4
		}                                                                                                                  //
                                                                                                                     //
		return RocketChat.models.LivechatTrigger.save(trigger);                                                            // 7
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/methods/searchAgent.js                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	'livechat:searchAgent': function (username) {                                                                       // 2
		if (!Meteor.userId() || !RocketChat.authz.hasPermission(Meteor.userId(), 'view-livechat-manager')) {               // 3
			throw new Meteor.Error("not-authorized");                                                                         // 4
		}                                                                                                                  //
                                                                                                                     //
		if (!username || !_.isString(username)) {                                                                          // 7
			throw new Meteor.Error('invalid-arguments');                                                                      // 8
		}                                                                                                                  //
                                                                                                                     //
		var user = RocketChat.models.Users.findOneByUsername(username, { fields: { _id: 1, username: 1 } });               // 11
                                                                                                                     //
		if (!user) {                                                                                                       // 13
			throw new Meteor.Error('user-not-found', 'Username_not_found');                                                   // 14
		}                                                                                                                  //
                                                                                                                     //
		return user;                                                                                                       // 17
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/methods/sendMessageLivechat.js                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	sendMessageLivechat: function (message) {                                                                           // 2
		var guest, agent, room;                                                                                            // 3
                                                                                                                     //
		check(message.rid, String);                                                                                        // 5
		check(message.token, String);                                                                                      // 6
                                                                                                                     //
		guest = Meteor.users.findOne(Meteor.userId(), {                                                                    // 8
			fields: {                                                                                                         // 9
				username: 1,                                                                                                     // 10
				department: 1                                                                                                    // 11
			}                                                                                                                 //
		});                                                                                                                //
                                                                                                                     //
		room = RocketChat.models.Rooms.findOneById(message.rid);                                                           // 15
		if (room == null) {                                                                                                // 16
                                                                                                                     //
			// if no department selected verify if there is only one active and use it                                        //
			if (!guest.department) {                                                                                          // 19
				var departments = RocketChat.models.LivechatDepartment.findEnabledWithAgents();                                  // 20
				if (departments.count() === 1) {                                                                                 // 21
					guest.department = departments.fetch()[0]._id;                                                                  // 22
				}                                                                                                                //
			}                                                                                                                 //
                                                                                                                     //
			agent = getNextAgent(guest.department);                                                                           // 26
			if (!agent) {                                                                                                     // 27
				throw new Meteor.Error('no-agent-online', 'Sorry, no online agents');                                            // 28
			}                                                                                                                 //
			RocketChat.models.Rooms.insert({                                                                                  // 30
				_id: message.rid,                                                                                                // 31
				name: guest.username,                                                                                            // 32
				msgs: 1,                                                                                                         // 33
				lm: new Date(),                                                                                                  // 34
				usernames: [agent.username, guest.username],                                                                     // 35
				t: 'l',                                                                                                          // 36
				ts: new Date(),                                                                                                  // 37
				v: {                                                                                                             // 38
					token: message.token                                                                                            // 39
				}                                                                                                                //
			});                                                                                                               //
			RocketChat.models.Subscriptions.insert({                                                                          // 42
				rid: message.rid,                                                                                                // 43
				name: guest.username,                                                                                            // 44
				alert: true,                                                                                                     // 45
				open: true,                                                                                                      // 46
				unread: 1,                                                                                                       // 47
				answered: false,                                                                                                 // 48
				u: {                                                                                                             // 49
					_id: agent.agentId,                                                                                             // 50
					username: agent.username                                                                                        // 51
				},                                                                                                               //
				t: 'l',                                                                                                          // 53
				desktopNotifications: 'all',                                                                                     // 54
				mobilePushNotifications: 'all',                                                                                  // 55
				emailNotifications: 'all'                                                                                        // 56
			});                                                                                                               //
		}                                                                                                                  //
		room = Meteor.call('canAccessRoom', message.rid, guest._id);                                                       // 59
		if (!room) {                                                                                                       // 60
			throw new Meteor.Error('cannot-acess-room');                                                                      // 61
		}                                                                                                                  //
		return RocketChat.sendMessage(guest, message, room);                                                               // 63
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/models/Users.js                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/**                                                                                                                  //
 * Sets an user as (non)operator                                                                                     //
 * @param {string} _id - User's _id                                                                                  //
 * @param {boolean} operator - Flag to set as operator or not                                                        //
 */                                                                                                                  //
RocketChat.models.Users.setOperator = function (_id, operator) {                                                     // 6
	var update = {                                                                                                      // 7
		$set: {                                                                                                            // 8
			operator: operator                                                                                                // 9
		}                                                                                                                  //
	};                                                                                                                  //
                                                                                                                     //
	return this.update(_id, update);                                                                                    // 13
};                                                                                                                   //
                                                                                                                     //
/**                                                                                                                  //
 * Gets all online agents                                                                                            //
 * @return                                                                                                           //
 */                                                                                                                  //
RocketChat.models.Users.findOnlineAgents = function () {                                                             // 20
	var query = {                                                                                                       // 21
		status: 'online',                                                                                                  // 22
		roles: 'livechat-agent'                                                                                            // 23
	};                                                                                                                  //
                                                                                                                     //
	return this.find(query);                                                                                            // 26
};                                                                                                                   //
                                                                                                                     //
/**                                                                                                                  //
 * Find online users from a list                                                                                     //
 * @param {array} userList - array of usernames                                                                      //
 * @return                                                                                                           //
 */                                                                                                                  //
RocketChat.models.Users.findOnlineUserFromList = function (userList) {                                               // 34
	var query = {                                                                                                       // 35
		status: 'online',                                                                                                  // 36
		username: {                                                                                                        // 37
			$in: [].concat(userList)                                                                                          // 38
		}                                                                                                                  //
	};                                                                                                                  //
                                                                                                                     //
	return this.find(query);                                                                                            // 42
};                                                                                                                   //
                                                                                                                     //
/**                                                                                                                  //
 * Get next user agent in order                                                                                      //
 * @return {object} User from db                                                                                     //
 */                                                                                                                  //
RocketChat.models.Users.getNextAgent = function () {                                                                 // 49
	var query = {                                                                                                       // 50
		status: 'online',                                                                                                  // 51
		roles: 'livechat-agent'                                                                                            // 52
	};                                                                                                                  //
                                                                                                                     //
	var collectionObj = this.model.rawCollection();                                                                     // 55
	var findAndModify = Meteor.wrapAsync(collectionObj.findAndModify, collectionObj);                                   // 56
                                                                                                                     //
	var sort = {                                                                                                        // 58
		livechatCount: 1,                                                                                                  // 59
		username: 1                                                                                                        // 60
	};                                                                                                                  //
                                                                                                                     //
	var update = {                                                                                                      // 63
		$inc: {                                                                                                            // 64
			livechatCount: 1                                                                                                  // 65
		}                                                                                                                  //
	};                                                                                                                  //
                                                                                                                     //
	var user = findAndModify(query, sort, update);                                                                      // 69
	if (user) {                                                                                                         // 70
		return {                                                                                                           // 71
			agentId: user._id,                                                                                                // 72
			username: user.username                                                                                           // 73
		};                                                                                                                 //
	} else {                                                                                                            //
		return null;                                                                                                       // 76
	}                                                                                                                   //
};                                                                                                                   //
                                                                                                                     //
/**                                                                                                                  //
 * Gets visitor by token                                                                                             //
 * @param {string} token - Visitor token                                                                             //
 */                                                                                                                  //
RocketChat.models.Users.getVisitorByToken = function (token, options) {                                              // 84
	var query = {                                                                                                       // 85
		"profile.guest": true,                                                                                             // 86
		"profile.token": token                                                                                             // 87
	};                                                                                                                  //
                                                                                                                     //
	return this.findOne(query, options);                                                                                // 90
};                                                                                                                   //
                                                                                                                     //
/**                                                                                                                  //
 * Gets visitor by token                                                                                             //
 * @param {string} token - Visitor token                                                                             //
 */                                                                                                                  //
RocketChat.models.Users.findVisitorByToken = function (token) {                                                      // 97
	var query = {                                                                                                       // 98
		"profile.guest": true,                                                                                             // 99
		"profile.token": token                                                                                             // 100
	};                                                                                                                  //
                                                                                                                     //
	return this.find(query);                                                                                            // 103
};                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/models/Rooms.js                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/**                                                                                                                  //
 * Gets visitor by token                                                                                             //
 * @param {string} token - Visitor token                                                                             //
 */                                                                                                                  //
RocketChat.models.Rooms.updateSurveyFeedbackById = function (_id, surveyFeedback) {                                  // 5
	query = {                                                                                                           // 6
		_id: _id                                                                                                           // 7
	};                                                                                                                  //
                                                                                                                     //
	update = {                                                                                                          // 10
		$set: {                                                                                                            // 11
			surveyFeedback: surveyFeedback                                                                                    // 12
		}                                                                                                                  //
	};                                                                                                                  //
                                                                                                                     //
	return this.update(query, update);                                                                                  // 16
};                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/models/LivechatDepartment.js                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/**                                                                                                                  //
 * Livechat Department model                                                                                         //
 */                                                                                                                  //
                                                                                                                     //
var LivechatDepartment = (function (_RocketChat$models$_Base) {                                                      //
	babelHelpers.inherits(LivechatDepartment, _RocketChat$models$_Base);                                                //
                                                                                                                     //
	function LivechatDepartment() {                                                                                     // 5
		babelHelpers.classCallCheck(this, LivechatDepartment);                                                             //
                                                                                                                     //
		_RocketChat$models$_Base.call(this);                                                                               // 6
		this._initModel('livechat_department');                                                                            // 7
	}                                                                                                                   //
                                                                                                                     //
	// FIND                                                                                                             //
                                                                                                                     //
	LivechatDepartment.prototype.findOneById = (function () {                                                           // 4
		function findOneById(_id, options) {                                                                               // 11
			query = { _id: _id };                                                                                             // 12
                                                                                                                     //
			return this.findOne(query, options);                                                                              // 14
		}                                                                                                                  //
                                                                                                                     //
		return findOneById;                                                                                                //
	})();                                                                                                               //
                                                                                                                     //
	LivechatDepartment.prototype.findByDepartmentId = (function () {                                                    // 4
		function findByDepartmentId(_id, options) {                                                                        // 17
			query = { _id: _id };                                                                                             // 18
			return this.find(query, options);                                                                                 // 19
		}                                                                                                                  //
                                                                                                                     //
		return findByDepartmentId;                                                                                         //
	})();                                                                                                               //
                                                                                                                     //
	LivechatDepartment.prototype.createOrUpdateDepartment = (function () {                                              // 4
		function createOrUpdateDepartment(_id, enabled, name, description, agents, extraData) {                            // 22
			var agents = [].concat(agents);                                                                                   // 23
                                                                                                                     //
			var record = {                                                                                                    // 25
				enabled: enabled,                                                                                                // 26
				name: name,                                                                                                      // 27
				description: description,                                                                                        // 28
				numAgents: agents.length                                                                                         // 29
			};                                                                                                                //
                                                                                                                     //
			_.extend(record, extraData);                                                                                      // 32
                                                                                                                     //
			if (_id) {                                                                                                        // 34
				this.update({ _id: _id }, { $set: record });                                                                     // 35
			} else {                                                                                                          //
				_id = this.insert(record);                                                                                       // 37
			}                                                                                                                 //
                                                                                                                     //
			var savedAgents = _.pluck(RocketChat.models.LivechatDepartmentAgents.findByDepartmentId(_id).fetch(), 'agentId');
			var agentsToSave = _.pluck(agents, 'agentId');                                                                    // 41
                                                                                                                     //
			// remove other agents                                                                                            //
			_.difference(savedAgents, agentsToSave).forEach(function (agentId) {                                              // 44
				RocketChat.models.LivechatDepartmentAgents.removeByDepartmentIdAndAgentId(_id, agentId);                         // 45
			});                                                                                                               //
                                                                                                                     //
			agents.forEach(function (agent) {                                                                                 // 48
				RocketChat.models.LivechatDepartmentAgents.saveAgent({                                                           // 49
					agentId: agent.agentId,                                                                                         // 50
					departmentId: _id,                                                                                              // 51
					username: agent.username,                                                                                       // 52
					count: parseInt(agent.count),                                                                                   // 53
					order: parseInt(agent.order)                                                                                    // 54
				});                                                                                                              //
			});                                                                                                               //
                                                                                                                     //
			return _.extend(record, { _id: _id });                                                                            // 58
		}                                                                                                                  //
                                                                                                                     //
		return createOrUpdateDepartment;                                                                                   //
	})();                                                                                                               //
                                                                                                                     //
	// REMOVE                                                                                                           //
                                                                                                                     //
	LivechatDepartment.prototype.removeById = (function () {                                                            // 4
		function removeById(_id) {                                                                                         // 62
			query = { _id: _id };                                                                                             // 63
			return this.remove(query);                                                                                        // 64
		}                                                                                                                  //
                                                                                                                     //
		return removeById;                                                                                                 //
	})();                                                                                                               //
                                                                                                                     //
	LivechatDepartment.prototype.findEnabledWithAgents = (function () {                                                 // 4
		function findEnabledWithAgents() {                                                                                 // 67
			var query = {                                                                                                     // 68
				numAgents: { $gt: 0 },                                                                                           // 69
				enabled: true                                                                                                    // 70
			};                                                                                                                //
			return this.find(query);                                                                                          // 72
		}                                                                                                                  //
                                                                                                                     //
		return findEnabledWithAgents;                                                                                      //
	})();                                                                                                               //
                                                                                                                     //
	return LivechatDepartment;                                                                                          //
})(RocketChat.models._Base);                                                                                         //
                                                                                                                     //
RocketChat.models.LivechatDepartment = new LivechatDepartment();                                                     // 76
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/models/LivechatDepartmentAgents.js                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/**                                                                                                                  //
 * Livechat Department model                                                                                         //
 */                                                                                                                  //
                                                                                                                     //
var LivechatDepartmentAgents = (function (_RocketChat$models$_Base) {                                                //
	babelHelpers.inherits(LivechatDepartmentAgents, _RocketChat$models$_Base);                                          //
                                                                                                                     //
	function LivechatDepartmentAgents() {                                                                               // 5
		babelHelpers.classCallCheck(this, LivechatDepartmentAgents);                                                       //
                                                                                                                     //
		_RocketChat$models$_Base.call(this);                                                                               // 6
		this._initModel('livechat_department_agents');                                                                     // 7
	}                                                                                                                   //
                                                                                                                     //
	LivechatDepartmentAgents.prototype.findByDepartmentId = (function () {                                              // 4
		function findByDepartmentId(departmentId) {                                                                        // 10
			return this.find({ departmentId: departmentId });                                                                 // 11
		}                                                                                                                  //
                                                                                                                     //
		return findByDepartmentId;                                                                                         //
	})();                                                                                                               //
                                                                                                                     //
	LivechatDepartmentAgents.prototype.saveAgent = (function () {                                                       // 4
		function saveAgent(agent) {                                                                                        // 14
			if (agent._id) {                                                                                                  // 15
				return this.update({ _id: _id }, { $set: agent });                                                               // 16
			} else {                                                                                                          //
				return this.upsert({                                                                                             // 18
					agentId: agent.agentId,                                                                                         // 19
					departmentId: agent.departmentId                                                                                // 20
				}, {                                                                                                             //
					$set: {                                                                                                         // 22
						username: agent.username,                                                                                      // 23
						count: parseInt(agent.count),                                                                                  // 24
						order: parseInt(agent.order)                                                                                   // 25
					}                                                                                                               //
				});                                                                                                              //
			}                                                                                                                 //
		}                                                                                                                  //
                                                                                                                     //
		return saveAgent;                                                                                                  //
	})();                                                                                                               //
                                                                                                                     //
	LivechatDepartmentAgents.prototype.removeByDepartmentIdAndAgentId = (function () {                                  // 4
		function removeByDepartmentIdAndAgentId(departmentId, agentId) {                                                   // 31
			this.remove({ departmentId: departmentId, agentId: agentId });                                                    // 32
		}                                                                                                                  //
                                                                                                                     //
		return removeByDepartmentIdAndAgentId;                                                                             //
	})();                                                                                                               //
                                                                                                                     //
	LivechatDepartmentAgents.prototype.getNextAgentForDepartment = (function () {                                       // 4
		function getNextAgentForDepartment(departmentId) {                                                                 // 35
			var agents = this.findByDepartmentId(departmentId).fetch();                                                       // 36
                                                                                                                     //
			if (agents.length === 0) {                                                                                        // 38
				return;                                                                                                          // 39
			}                                                                                                                 //
                                                                                                                     //
			var onlineUsers = RocketChat.models.Users.findOnlineUserFromList(_.pluck(agents, 'username'));                    // 42
                                                                                                                     //
			var onlineUsernames = _.pluck(onlineUsers.fetch(), 'username');                                                   // 44
                                                                                                                     //
			var query = {                                                                                                     // 46
				departmentId: departmentId,                                                                                      // 47
				username: {                                                                                                      // 48
					$in: onlineUsernames                                                                                            // 49
				}                                                                                                                //
			};                                                                                                                //
                                                                                                                     //
			var sort = {                                                                                                      // 53
				count: 1,                                                                                                        // 54
				sort: 1,                                                                                                         // 55
				username: 1                                                                                                      // 56
			};                                                                                                                //
			var update = {                                                                                                    // 58
				$inc: {                                                                                                          // 59
					count: 1                                                                                                        // 60
				}                                                                                                                //
			};                                                                                                                //
                                                                                                                     //
			var collectionObj = this.model.rawCollection();                                                                   // 64
			var findAndModify = Meteor.wrapAsync(collectionObj.findAndModify, collectionObj);                                 // 65
                                                                                                                     //
			var agent = findAndModify(query, sort, update);                                                                   // 67
			if (agent) {                                                                                                      // 68
				return {                                                                                                         // 69
					agentId: agent.agentId,                                                                                         // 70
					username: agent.username                                                                                        // 71
				};                                                                                                               //
			} else {                                                                                                          //
				return null;                                                                                                     // 74
			}                                                                                                                 //
		}                                                                                                                  //
                                                                                                                     //
		return getNextAgentForDepartment;                                                                                  //
	})();                                                                                                               //
                                                                                                                     //
	return LivechatDepartmentAgents;                                                                                    //
})(RocketChat.models._Base);                                                                                         //
                                                                                                                     //
RocketChat.models.LivechatDepartmentAgents = new LivechatDepartmentAgents();                                         // 79
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/models/LivechatPageVisited.js                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/**                                                                                                                  //
 * Livechat Page Visited model                                                                                       //
 */                                                                                                                  //
                                                                                                                     //
var LivechatPageVisitied = (function (_RocketChat$models$_Base) {                                                    //
	babelHelpers.inherits(LivechatPageVisitied, _RocketChat$models$_Base);                                              //
                                                                                                                     //
	function LivechatPageVisitied() {                                                                                   // 5
		babelHelpers.classCallCheck(this, LivechatPageVisitied);                                                           //
                                                                                                                     //
		_RocketChat$models$_Base.call(this);                                                                               // 6
		this._initModel('livechat_page_visited');                                                                          // 7
                                                                                                                     //
		this.tryEnsureIndex({ 'token': 1 });                                                                               // 9
		this.tryEnsureIndex({ 'ts': 1 });                                                                                  // 10
                                                                                                                     //
		// keep history for 1 month if the visitor does not register                                                       //
		this.tryEnsureIndex({ 'expireAt': 1 }, { sparse: 1, expireAfterSeconds: 0 });                                      // 13
	}                                                                                                                   //
                                                                                                                     //
	LivechatPageVisitied.prototype.saveByToken = (function () {                                                         // 4
		function saveByToken(token, pageInfo) {                                                                            // 16
			// keep history of unregistered visitors for 1 month                                                              //
			var keepHistoryMiliseconds = 2592000000;                                                                          // 18
                                                                                                                     //
			return this.insert({                                                                                              // 20
				token: token,                                                                                                    // 21
				page: pageInfo,                                                                                                  // 22
				ts: new Date(),                                                                                                  // 23
				expireAt: new Date().getTime() + keepHistoryMiliseconds                                                          // 24
			});                                                                                                               //
		}                                                                                                                  //
                                                                                                                     //
		return saveByToken;                                                                                                //
	})();                                                                                                               //
                                                                                                                     //
	LivechatPageVisitied.prototype.findByToken = (function () {                                                         // 4
		function findByToken(token) {                                                                                      // 28
			return this.find({ token: token }, { sort: { ts: -1 }, limit: 20 });                                              // 29
		}                                                                                                                  //
                                                                                                                     //
		return findByToken;                                                                                                //
	})();                                                                                                               //
                                                                                                                     //
	LivechatPageVisitied.prototype.keepHistoryForToken = (function () {                                                 // 4
		function keepHistoryForToken(token) {                                                                              // 32
			return this.update({                                                                                              // 33
				token: token,                                                                                                    // 34
				expireAt: {                                                                                                      // 35
					$exists: true                                                                                                   // 36
				}                                                                                                                //
			}, {                                                                                                              //
				$unset: {                                                                                                        // 39
					expireAt: 1                                                                                                     // 40
				}                                                                                                                //
			}, {                                                                                                              //
				multi: true                                                                                                      // 43
			});                                                                                                               //
		}                                                                                                                  //
                                                                                                                     //
		return keepHistoryForToken;                                                                                        //
	})();                                                                                                               //
                                                                                                                     //
	return LivechatPageVisitied;                                                                                        //
})(RocketChat.models._Base);                                                                                         //
                                                                                                                     //
RocketChat.models.LivechatPageVisitied = new LivechatPageVisitied();                                                 // 48
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/models/LivechatTrigger.js                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/**                                                                                                                  //
 * Livechat Trigger model                                                                                            //
 */                                                                                                                  //
                                                                                                                     //
var LivechatTrigger = (function (_RocketChat$models$_Base) {                                                         //
	babelHelpers.inherits(LivechatTrigger, _RocketChat$models$_Base);                                                   //
                                                                                                                     //
	function LivechatTrigger() {                                                                                        // 5
		babelHelpers.classCallCheck(this, LivechatTrigger);                                                                //
                                                                                                                     //
		_RocketChat$models$_Base.call(this);                                                                               // 6
		this._initModel('livechat_trigger');                                                                               // 7
	}                                                                                                                   //
                                                                                                                     //
	// FIND                                                                                                             //
                                                                                                                     //
	LivechatTrigger.prototype.save = (function () {                                                                     // 4
		function save(data) {                                                                                              // 11
			trigger = this.findOne();                                                                                         // 12
                                                                                                                     //
			if (trigger) {                                                                                                    // 14
				return this.update({ _id: trigger._id }, { $set: data });                                                        // 15
			} else {                                                                                                          //
				return this.insert(data);                                                                                        // 17
			}                                                                                                                 //
		}                                                                                                                  //
                                                                                                                     //
		return save;                                                                                                       //
	})();                                                                                                               //
                                                                                                                     //
	LivechatTrigger.prototype.removeAll = (function () {                                                                // 4
		function removeAll() {                                                                                             // 21
			this.remove({});                                                                                                  // 22
		}                                                                                                                  //
                                                                                                                     //
		return removeAll;                                                                                                  //
	})();                                                                                                               //
                                                                                                                     //
	return LivechatTrigger;                                                                                             //
})(RocketChat.models._Base);                                                                                         //
                                                                                                                     //
RocketChat.models.LivechatTrigger = new LivechatTrigger();                                                           // 26
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/lib/getNextAgent.js                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
this.getNextAgent = function (department) {                                                                          // 1
	var agentFilter = {};                                                                                               // 2
                                                                                                                     //
	if (department) {                                                                                                   // 4
		return RocketChat.models.LivechatDepartmentAgents.getNextAgentForDepartment(department);                           // 5
	} else {                                                                                                            //
		return RocketChat.models.Users.getNextAgent();                                                                     // 7
	}                                                                                                                   //
};                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/publications/availableDepartments.js                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('livechat:availableDepartments', function () {                                                        // 1
	return RocketChat.models.LivechatDepartment.findEnabledWithAgents();                                                // 2
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/publications/departmentAgents.js                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('livechat:departmentAgents', function (departmentId) {                                                // 1
	if (!this.userId) {                                                                                                 // 2
		throw new Meteor.Error('not-authorized');                                                                          // 3
	}                                                                                                                   //
                                                                                                                     //
	if (!RocketChat.authz.hasPermission(this.userId, 'view-livechat-manager')) {                                        // 6
		throw new Meteor.Error('not-authorized');                                                                          // 7
	}                                                                                                                   //
                                                                                                                     //
	return RocketChat.models.LivechatDepartmentAgents.find({ departmentId: departmentId });                             // 10
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/publications/livechatAgents.js                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('livechat:agents', function () {                                                                      // 1
	if (!this.userId) {                                                                                                 // 2
		throw new Meteor.Error('not-authorized');                                                                          // 3
	}                                                                                                                   //
                                                                                                                     //
	if (!RocketChat.authz.hasPermission(this.userId, 'view-livechat-manager')) {                                        // 6
		throw new Meteor.Error('not-authorized');                                                                          // 7
	}                                                                                                                   //
                                                                                                                     //
	var self = this;                                                                                                    // 10
                                                                                                                     //
	var handle = RocketChat.authz.getUsersInRole('livechat-agent').observeChanges({                                     // 12
		added: function (id, fields) {                                                                                     // 13
			self.added('agentUsers', id, fields);                                                                             // 14
		},                                                                                                                 //
		changed: function (id, fields) {                                                                                   // 16
			self.changed('agentUsers', id, fields);                                                                           // 17
		},                                                                                                                 //
		removed: function (id) {                                                                                           // 19
			self.removed('agentUsers', id);                                                                                   // 20
		}                                                                                                                  //
	});                                                                                                                 //
                                                                                                                     //
	self.ready();                                                                                                       // 24
                                                                                                                     //
	self.onStop(function () {                                                                                           // 26
		handle.stop();                                                                                                     // 27
	});                                                                                                                 //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/publications/livechatDepartments.js                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('livechat:departments', function (_id) {                                                              // 1
	if (!this.userId) {                                                                                                 // 2
		throw new Meteor.Error('not-authorized');                                                                          // 3
	}                                                                                                                   //
                                                                                                                     //
	if (!RocketChat.authz.hasPermission(this.userId, 'view-livechat-manager')) {                                        // 6
		throw new Meteor.Error('not-authorized');                                                                          // 7
	}                                                                                                                   //
                                                                                                                     //
	if (_id !== undefined) {                                                                                            // 10
		return RocketChat.models.LivechatDepartment.findByDepartmentId(_id);                                               // 11
	} else {                                                                                                            //
		return RocketChat.models.LivechatDepartment.find();                                                                // 13
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/publications/livechatManagers.js                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('livechat:managers', function () {                                                                    // 1
	if (!this.userId) {                                                                                                 // 2
		throw new Meteor.Error('not-authorized');                                                                          // 3
	}                                                                                                                   //
                                                                                                                     //
	if (!RocketChat.authz.hasPermission(this.userId, 'view-livechat-manager')) {                                        // 6
		throw new Meteor.Error('not-authorized');                                                                          // 7
	}                                                                                                                   //
                                                                                                                     //
	var self = this;                                                                                                    // 10
                                                                                                                     //
	var handle = RocketChat.authz.getUsersInRole('livechat-manager').observeChanges({                                   // 12
		added: function (id, fields) {                                                                                     // 13
			self.added('managerUsers', id, fields);                                                                           // 14
		},                                                                                                                 //
		changed: function (id, fields) {                                                                                   // 16
			self.changed('managerUsers', id, fields);                                                                         // 17
		},                                                                                                                 //
		removed: function (id) {                                                                                           // 19
			self.removed('managerUsers', id);                                                                                 // 20
		}                                                                                                                  //
	});                                                                                                                 //
                                                                                                                     //
	self.ready();                                                                                                       // 24
                                                                                                                     //
	self.onStop(function () {                                                                                           // 26
		handle.stop();                                                                                                     // 27
	});                                                                                                                 //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/publications/trigger.js                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('livechat:trigger', function () {                                                                     // 1
	return RocketChat.models.LivechatTrigger.find();                                                                    // 2
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/publications/visitorInfo.js                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('livechat:visitorInfo', function (roomId) {                                                           // 1
	if (!this.userId) {                                                                                                 // 2
		throw new Meteor.Error('not-authorized');                                                                          // 3
	}                                                                                                                   //
                                                                                                                     //
	if (!RocketChat.authz.hasPermission(this.userId, 'view-l-room')) {                                                  // 6
		throw new Meteor.Error('not-authorized');                                                                          // 7
	}                                                                                                                   //
                                                                                                                     //
	var room = RocketChat.models.Rooms.findOneById(roomId);                                                             // 10
                                                                                                                     //
	if (room && room.v && room.v.token) {                                                                               // 12
		return RocketChat.models.Users.findVisitorByToken(room.v.token);                                                   // 13
	} else {                                                                                                            //
		return this.ready();                                                                                               // 15
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/publications/visitorPageVisited.js                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('livechat:visitorPageVisited', function (roomId) {                                                    // 1
	if (!this.userId) {                                                                                                 // 2
		throw new Meteor.Error('not-authorized');                                                                          // 3
	}                                                                                                                   //
                                                                                                                     //
	if (!RocketChat.authz.hasPermission(this.userId, 'view-l-room')) {                                                  // 6
		throw new Meteor.Error('not-authorized');                                                                          // 7
	}                                                                                                                   //
                                                                                                                     //
	var room = RocketChat.models.Rooms.findOneById(roomId);                                                             // 10
                                                                                                                     //
	if (room && room.v && room.v.token) {                                                                               // 12
		return RocketChat.models.LivechatPageVisitied.findByToken(room.v.token);                                           // 13
	} else {                                                                                                            //
		return this.ready();                                                                                               // 15
	}                                                                                                                   //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/server/publications/visitorRoom.js                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('livechat:visitorRoom', function (visitorToken) {                                                     // 1
	return RocketChat.models.Rooms.findByVisitorToken(visitorToken, {                                                   // 2
		fields: {                                                                                                          // 3
			name: 1,                                                                                                          // 4
			t: 1,                                                                                                             // 5
			cl: 1,                                                                                                            // 6
			u: 1,                                                                                                             // 7
			usernames: 1,                                                                                                     // 8
			v: 1                                                                                                              // 9
		}                                                                                                                  //
	});                                                                                                                 //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/ar.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["ar"] = ["Arabic","العربية"];                                                                // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                                               // 10
if(_.isUndefined(TAPi18n.translations["ar"])) {                                                                      // 11
  TAPi18n.translations["ar"] = {};                                                                                   // 12
}                                                                                                                    // 13
                                                                                                                     // 14
if(_.isUndefined(TAPi18n.translations["ar"][namespace])) {                                                           // 15
  TAPi18n.translations["ar"][namespace] = {};                                                                        // 16
}                                                                                                                    // 17
                                                                                                                     // 18
_.extend(TAPi18n.translations["ar"][namespace], {"Add":"إضافة","Add_agent":"أضف وكيل","Add_manager":"أضف مدير","Agent_added":"تمت إضافة الوكيل","Agent_removed":"تمت إزالة الوكيل","Available_agents":"الوكلاء الموجودون","Back":"العودة","Closed":"مغلق","Copy_to_clipboard":"نسخ إلى الحافظة","Departments":"الأقسام","Description":"الوصف","Enable":"تمكين","Enabled":"مفعل","Enter_a_username":"أدخل اسم المستخدم","Livechat_agents":"وكلاء المحادثات الحية","Livechat_Dashboard":"لوحة المحادثات الحية","Livechat_enabled":"تفعيل المحادثات الحية","Livechat_Manager":"مدير المحادثات الحية","Livechat_managers":"مدراء المحادثات الحية","Livechat_title":"عنوان المحادثة الحية","Livechat_title_color":"لون خلفية عنوان المحادثة الحية","Livechat_Users":"مستخدمي المحادثات الحية","Manager_added":"تمت إضافة المدير","Name_of_agent":"اسم الوكيل","Num_Agents":"وكلاء","Please_fill_a_username":"يرجى ملء اسم المستخدم","Saved":"تم الحفظ","Selected_agents":"الوكلاء المختارون","Send_a_message":"إرسال رسالة","There_are_no_agents_added_to_this_department_yet":"لا يوجد وكلاء مضافون لهذا القسم","Time_in_seconds":"الوقت بالثواني","To_install_RocketChat_Livechat_in_your_website_copy_paste_this_code_above_the_last_body_tag_on_your_site":"لتركيب المحادثات الحية في موقعك انسخ و الصق النص التالي قبل آخر علامة <strong>&lt;/body&gt;</strong> في موقعك."});
TAPi18n._registerServerTranslator("ar", namespace);                                                                  // 20
                                                                                                                     // 21
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/cs.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["cs"] = ["Czech","čeština‎"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["cs"])) {                                                                      // 9
  TAPi18n.translations["cs"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["cs"][namespace])) {                                                           // 13
  TAPi18n.translations["cs"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["cs"][namespace], {"Livechat_enabled":"Livechat povoleno"});                           // 17
TAPi18n._registerServerTranslator("cs", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/de.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["de"])) {                                                                      // 9
  TAPi18n.translations["de"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                                           // 13
  TAPi18n.translations["de"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["de"][namespace], {"Add":"Hinzufügen","Add_agent":"Agent hinzufügen","Add_manager":"Manager hinzufügen","Agent_added":"Der Agent wurde hinzugefügt.","Agent_removed":"Der Agent wurde gelöscht.","Available_agents":"Verfügbare Agenten","Back":"Zurück","Closed":"Geschlossen","Copy_to_clipboard":"In die Zwischenablage kopieren","Count":"Zähler","Dashboard":"Dashboard","Department_not_found":"Abteilung konnte nicht gefunden werden.","Department_removed":"Die Abteilung wurde gelöscht.","Departments":"Abteilungen","Description":"Beschreibung","Edit_Department":"Abteilung bearbeiten","Empty_title":"Es wurde kein Titel angegeben.","Enable":"Aktivieren","Enabled":"Aktiviert","Enter_a_regex":"Regex eingeben","Enter_a_username":"Geben Sie einen Benutzernamen ein","Live_sessions":"Live-Sitzungen","Livechat_agents":"LiveChat-Agent","Livechat_Dashboard":"LiveChat-Dashboard","Livechat_enabled":"LiveChat aktiviert","Livechat_Manager":"LiveChat-Manager","Livechat_managers":"LiveChat-Manager","Livechat_title":"LiveChat-Titel","Livechat_title_color":"Hintergrundfarbe des LiveChat-Titels","Livechat_Users":"LiveChat-Benutzer","Manager_added":"Der Manager wurde hinzugefügt.\n","Manager_removed":"Der Manager wurde gelöscht.","Name_of_agent":"Name des Agents","Navigation_History_20_last_pages":"Navigationsverlauf (die letzten 20 Seiten)","New_Department":"Neue Abteilung","Num_Agents":"# Agents","Opened":"Geöffnet","Order":"Auftrag","Please_fill_a_name":"Bitte geben Sie einen Namen ein.","Please_fill_a_username":"Bitte geben Sie einen Benutzernamen ein.","Please_select_enabled_yes_or_no":"Bitte wählen Sie eine Option für \"aktiviert\".","Saved":"Gespeichert","Selected_agents":"Ausgewählte Agenten","Send_a_message":"Eine Nachricht schicken","Show_preregistration_form":"Vorregistrierungsformular zeigen","Theme":"Theme","There_are_no_agents_added_to_this_department_yet":"Es wurden bisher keine Agenten zu dieser Abteilung hinzugefügt.","Time_in_seconds":"Zeit in Sekunden","Title_bar_color":"Farbe der Titelleiste","To_install_RocketChat_Livechat_in_your_website_copy_paste_this_code_above_the_last_body_tag_on_your_site":"Um den Rocket.Chat-LiveChat auf Ihrer Webseite zu installieren, kopieren und fügen Sie den Code über den letzten <strong>&lt;/body&gt;</strong>-Tag Ihrer Seite ein.","Trigger_removed":"Auslöser entfernt","Triggers":"Auslöser","User_management":"Benutzerverwaltung","Username_not_found":"Der Benutzername konnte nicht gefunden werden.","Visitor_page_URL":"URL der Besucherseite","Visitor_time_on_site":"Besucherzeit auf der Seite"});
TAPi18n._registerServerTranslator("de", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/el.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["el"] = ["Greek","Ελληνικά"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["el"])) {                                                                      // 9
  TAPi18n.translations["el"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["el"][namespace])) {                                                           // 13
  TAPi18n.translations["el"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["el"][namespace], {"Livechat_enabled":"Livechat ενεργοποιημένη"});                     // 17
TAPi18n._registerServerTranslator("el", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/en.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
// integrate the fallback language translations                                                                      // 8
translations = {};                                                                                                   // 9
translations[namespace] = {"Add":"Add","Add_agent":"Add agent","Add_manager":"Add manager","Agent_added":"Agent added","Agent_removed":"Agent removed","Available_agents":"Available agents","Back":"Back","Closed":"Closed","Copy_to_clipboard":"Copy to clipboard","Count":"Count","Dashboard":"Dashboard","Department_not_found":"Department not found","Department_removed":"Department removed","Departments":"Departments","Description":"Description","Edit_Department":"Edit Department","Empty_title":"Empty title","Enable":"Enable","Enabled":"Enabled","Enter_a_regex":"Enter a regex","Enter_a_username":"Enter a username","Live_sessions":"Live sessions","Livechat_agents":"Livechat agents","Livechat_Dashboard":"Livechat Dashboard","Livechat_enabled":"Livechat enabled","Livechat_Manager":"Livechat Manager","Livechat_managers":"Livechat managers","Livechat_title":"Livechat Title","Livechat_title_color":"Livechat Title Background Color","Livechat_Users":"Livechat Users","Manager_added":"Manager added","Manager_removed":"Manager removed","Name_of_agent":"Name of agent","Navigation_History_20_last_pages":"Navigation History (20 last pages)","New_Department":"New Department","Num_Agents":"# Agents","Opened":"Opened","Order":"Order","Please_fill_a_name":"Please fill a name","Please_fill_a_username":"Please fill a username","Please_select_enabled_yes_or_no":"Please select an option for Enabled","Saved":"Saved","Selected_agents":"Selected agents","Send_a_message":"Send a message","Show_preregistration_form":"Show pre-registration form","Theme":"Theme","There_are_no_agents_added_to_this_department_yet":"There are no agents added to this department yet.","Time_in_seconds":"Time in seconds","Title_bar_color":"Title bar color","To_install_RocketChat_Livechat_in_your_website_copy_paste_this_code_above_the_last_body_tag_on_your_site":"To install Rocket.Chat Livechat in your website, copy &amp; paste this code above the last <strong>&lt;/body&gt;</strong> tag on your site.","Trigger_removed":"Trigger removed","Triggers":"Triggers","User_management":"User Management","Username_not_found":"Username not found","Visitor_page_URL":"Visitor page URL","Visitor_time_on_site":"Visitor time on site"};
TAPi18n._loadLangFileObject("en", translations);                                                                     // 11
TAPi18n._registerServerTranslator("en", namespace);                                                                  // 12
                                                                                                                     // 13
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/es.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                                                       // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                                                      // 9
  TAPi18n.translations["es"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                                                           // 13
  TAPi18n.translations["es"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["es"][namespace], {"Add":"Agregar","Add_agent":"Agregar agente","Add_manager":"Agregar supervisor","Agent_added":"Agente agregado","Agent_removed":"Agente eliminado","Back":"Atras","Closed":"Cerrado","Copy_to_clipboard":"Copiar el Porta-papeles ","Dashboard":"Tablero","Department_not_found":"Departamento no encontrado","Department_removed":"Departamento eliminado","Departments":"Departamentos","Description":"Descripción ","Edit_Department":"Editar Departamento","Empty_title":"Titulo Vacio","Enable":"Habilitar","Enabled":"Habilitado","Enter_a_regex":"Introduzca un regex","Enter_a_username":"Ingrese un nombre de usuario","Live_sessions":"Sesiones en vivo","Livechat_agents":"Agentes de livechat","Livechat_enabled":"Livechat habilitado","Livechat_Manager":"Supervisor de livechat","Livechat_managers":"Supervisores de livechat","Livechat_title":"Titulo del Chat en Vivo","Livechat_title_color":"Color de Fondo del Titulo del Chat en Linea","Manager_added":"Supervisor agregado","Manager_removed":"Supervisor eliminado","Name_of_agent":"Nombre del Agente","Navigation_History_20_last_pages":"Historial de Navegacion (Ultimas 20 paginas)","New_Department":"Nuevo Departamento","Num_Agents":"# de Agentes","Opened":"Abierto","Please_fill_a_name":"Por favor introduzca su nombre","Please_fill_a_username":"Por favor ingrese un nombre de usuario","Please_select_enabled_yes_or_no":"Por favor elija una opción para Habilitar","Saved":"Guardado","Send_a_message":"Enviar mensaje","Theme":"Tema","There_are_no_agents_added_to_this_department_yet":"Todavia no hay ningún agente agregado a este departamento.","Title_bar_color":"Color de la Barra de Titulo","User_management":"Administracion de Usuarios","Username_not_found":"Nombre de usuario no encontrado","Visitor_page_URL":"URL de la pagina de Visitantes","Visitor_time_on_site":"Tiempo de visitantes en el sitio"});
TAPi18n._registerServerTranslator("es", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/fa.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["fa"] = ["Persian","فارسی"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["fa"])) {                                                                      // 9
  TAPi18n.translations["fa"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["fa"][namespace])) {                                                           // 13
  TAPi18n.translations["fa"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["fa"][namespace], {"Livechat_enabled":"livechat در فعال"});                            // 17
TAPi18n._registerServerTranslator("fa", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/fi.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                                                      // 9
  TAPi18n.translations["fi"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                                                           // 13
  TAPi18n.translations["fi"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["fi"][namespace], {"Add":"Lisää","Add_agent":"Lisää agentti","Add_manager":"Lisää manageri","Agent_added":"Agentti lisätty","Agent_removed":"Agentti poistettu","Available_agents":"Vapaat agentit","Back":"Takaisin","Closed":"Suljettu","Copy_to_clipboard":"Kopioi leikepöydälle","Count":"Lukumäärä","Dashboard":"Ohjauspaneeli","Department_not_found":"Osastoa ei löytynyt","Department_removed":"Osasto poistettu","Departments":"Osastot","Description":"Kuvaus","Edit_Department":"Muokkaa osastoa","Empty_title":"Tyhjä otsikko","Enable":"Ota käyttöön","Enabled":"Käytössä","Enter_a_regex":"Syötä säännöllinen lause (regex)","Enter_a_username":"Syötä käyttäjätunnus","Live_sessions":"Live-istunnot","Livechat_agents":"Livechat agentit","Livechat_Dashboard":"Livechat ohjauspaneeli","Livechat_enabled":"LiveChat käytössä","Livechat_Manager":"Livechat manageri","Livechat_managers":"Livechat managerit","Livechat_title":"Livechat otsikko","Livechat_title_color":"Livechat otsikon taustaväri","Livechat_Users":"Livechat käyttäjät","Manager_added":"Manageri lisätty","Manager_removed":"Manageri poistettu","Name_of_agent":"Agentin nimi","Navigation_History_20_last_pages":"Navigointihistoria (viimeiset 20 sivua)","New_Department":"Uusi osasto","Num_Agents":"# Agenttia","Opened":"Avattu","Order":"Järjestys","Please_fill_a_name":"Täytä nimi","Please_fill_a_username":"Täytä käyttäjätunnus","Please_select_enabled_yes_or_no":"Valitse vaihtoehto Käytössä","Saved":"Tallennettu","Selected_agents":"Valitut agentit","Send_a_message":"Lähetä viesti","Show_preregistration_form":"Näytä esirekisteröintilomake","Theme":"Ulkoasu","There_are_no_agents_added_to_this_department_yet":"Yhtään agenttia ei ole vielä lisätty tähän osastoon.","Time_in_seconds":"Aika sekunneissa","Title_bar_color":"Otsikkorivin väri","To_install_RocketChat_Livechat_in_your_website_copy_paste_this_code_above_the_last_body_tag_on_your_site":"Asentaaksesi Rocket.Chat Livechatin sivustollesi, kopioi ja liitä seuraava sivusi <strong>&lt;/body&gt;</strong> osion yläpuolelle.","Trigger_removed":"Laukaisija poistettu","Triggers":"Laukaisijat","User_management":"Käyttäjähallinta","Username_not_found":"Käyttäjätunnusta ei löydy","Visitor_page_URL":"Vierailijan sivun URL","Visitor_time_on_site":"Vierailijan aika sivustolla"});
TAPi18n._registerServerTranslator("fi", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/fr.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                                      // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                                      // 9
  TAPi18n.translations["fr"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                           // 13
  TAPi18n.translations["fr"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["fr"][namespace], {"Add":"Ajouter","Add_agent":"Ajouter un assistant","Add_manager":"Ajouter un manager","Agent_added":"Assistant ajouté","Agent_removed":"Assistant retiré","Available_agents":"Assistants disponibles","Back":"Retour","Closed":"Fermé","Copy_to_clipboard":"Copier dans le presse-papier","Count":"Nombre","Dashboard":"Tableau de bord","Department_not_found":"Département introuvable","Department_removed":"Département supprimé","Departments":"Départements","Description":"Description","Edit_Department":"Éditer le département","Empty_title":"Titre vide","Enable":"Activer","Enabled":"Activé","Enter_a_regex":"Entrez une expression rationnelle","Enter_a_username":"Entrez un nom d'utilisateur","Live_sessions":"Sessions en direct","Livechat_agents":"Assistants du chat en direct","Livechat_Dashboard":"Tableau de bord du chat en direct","Livechat_enabled":"Chat en direct activé","Livechat_Manager":"Manager du chat en direct","Livechat_managers":"Managers du chat en direct","Livechat_title":"Titre du chat en direct","Livechat_title_color":"Couleur d'arrière plan du titre du chat en direct","Livechat_Users":"Utilisateurs du chat en direct","Manager_added":"Manager ajouté","Manager_removed":"Manager retiré","Name_of_agent":"Nom de l'assistant","Navigation_History_20_last_pages":"Historique de navigation (20 dernières pages)","New_Department":"Nouveau département","Num_Agents":"# Assistants","Opened":"Ouvert","Order":"Ordre","Please_fill_a_name":"Veuillez saisir un nom","Please_fill_a_username":"Veuillez enter un nom d'utilisateur","Please_select_enabled_yes_or_no":"Veuillez choisir une option pour Activé","Saved":"Enregistré","Selected_agents":"Assistants sélectionnés","Send_a_message":"Envoyez un message","Show_preregistration_form":"Afficher le formulaire de pré-inscription","Theme":"Thème","There_are_no_agents_added_to_this_department_yet":"Il n'y a pas d'assistant ajouté à ce département pour le moment","Time_in_seconds":"Temps en secondes","Title_bar_color":"Couleur de la barre de titre","To_install_RocketChat_Livechat_in_your_website_copy_paste_this_code_above_the_last_body_tag_on_your_site":"Pour installer le chat en direct Rocket.Chat (Livechat) sur votre site web, copiez-collez ce code au dessus de la dernière balise <strong>&lt;/body&gt;</strong> du site.","Trigger_removed":"Déclencheur retiré","Triggers":"Déclencheurs","User_management":"Gestion des Utilisateurs","Username_not_found":"Nom d'utilisateur introuvable","Visitor_page_URL":"Page d'accueil du visiteur (URL)","Visitor_time_on_site":"Temps des visiteurs sur le site"});
TAPi18n._registerServerTranslator("fr", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/he.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["he"] = ["Hebrew","עברית"];                                                                  // 8
if(_.isUndefined(TAPi18n.translations["he"])) {                                                                      // 9
  TAPi18n.translations["he"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["he"][namespace])) {                                                           // 13
  TAPi18n.translations["he"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["he"][namespace], {"Add":"הוספה","Add_agent":"הוספת סוכן","Add_manager":"הוספת מנהל","Agent_added":"נוסף סוכן","Agent_removed":"הוסר סוכן","Back":"חזרה","Copy_to_clipboard":"העתקה ללוח הגזירים","Department_not_found":"המחלקה לא נמצאה","Description":"תיאור","Empty_title":"כותרת ריקה","Enter_a_regex":"נא להזין ביטוי רגולרי","Enter_a_username":"נא להזין שם משתמש","Livechat_enabled":"Livechat enabled","Manager_added":"נוסף מנהל","Manager_removed":"הוסר מנהל","Name_of_agent":"שם הסוכן","Order":"סדר","Please_fill_a_name":"נא למלא שם","Please_fill_a_username":"נא למלא שם משתמש","Saved":"נשמר","Send_a_message":"שליחת הודעה","Time_in_seconds":"זמן בשניות","User_management":"ניהול משתמשים","Username_not_found":"שם המשתמש לא נמצא"});
TAPi18n._registerServerTranslator("he", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/hr.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["hr"] = ["Croatian","Hrvatski"];                                                             // 8
if(_.isUndefined(TAPi18n.translations["hr"])) {                                                                      // 9
  TAPi18n.translations["hr"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["hr"][namespace])) {                                                           // 13
  TAPi18n.translations["hr"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["hr"][namespace], {"Add":"Dodaj","Back":"Natrag","Closed":"Zatvoreno","Copy_to_clipboard":"Kopiraj u međuspremnik","Description":"Opis","Enabled":"Omogućeno","Enter_a_username":"Unesite korisničko ime","Livechat_enabled":"LiveChat omogućeno","Please_fill_a_name":"Molimo ispunite ime","Saved":"Spremljeno","Send_a_message":"Pošalji Poruku","Time_in_seconds":"Vrijeme u sekundama","Trigger_removed":"Okidač uklonjen","Triggers":"Okidači"});
TAPi18n._registerServerTranslator("hr", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/hu.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["hu"] = ["Hungarian","Magyar"];                                                              // 8
if(_.isUndefined(TAPi18n.translations["hu"])) {                                                                      // 9
  TAPi18n.translations["hu"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["hu"][namespace])) {                                                           // 13
  TAPi18n.translations["hu"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["hu"][namespace], {"Livechat_enabled":"LiveChat engedélyezve"});                       // 17
TAPi18n._registerServerTranslator("hu", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/it.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["it"] = ["Italian","Italiano"];                                                              // 8
if(_.isUndefined(TAPi18n.translations["it"])) {                                                                      // 9
  TAPi18n.translations["it"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["it"][namespace])) {                                                           // 13
  TAPi18n.translations["it"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["it"][namespace], {"Livechat_enabled":"Livechat abilitato"});                          // 17
TAPi18n._registerServerTranslator("it", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/ja.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                                                  // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                                      // 9
  TAPi18n.translations["ja"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                                           // 13
  TAPi18n.translations["ja"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["ja"][namespace], {"Add":"追加","Add_agent":"担当者を追加","Add_manager":"管理者を追加","Agent_added":"担当者を追加しました","Agent_removed":"担当者を削除しました","Available_agents":"割り当てられる担当者","Back":"戻る","Closed":"閉じた状態","Copy_to_clipboard":"クリップボードへコピー","Dashboard":"ダッシュボード","Department_not_found":"部門が見つかりませんでした","Department_removed":"部門を削除しました","Departments":"部門","Description":"概要","Edit_Department":"部門を編集","Empty_title":"タイトルなし","Enable":"有効","Enabled":"有効","Enter_a_regex":"正規表現を入力","Enter_a_username":"ユーザー名を入力","Live_sessions":"ライブセッション","Livechat_agents":"ライブチャット 担当者","Livechat_Dashboard":"ライブチャット ダッシュボード","Livechat_enabled":"ライブチャットを有効にする","Livechat_Manager":"ライブチャット 管理者","Livechat_managers":"ライブチャット 管理者","Livechat_title":"ライブチャットのタイトル","Livechat_title_color":"ライブチャットのタイトル背景色","Livechat_Users":"ライブチャット 担当者","Manager_added":"管理者を追加しました","Manager_removed":"管理者を削除しました","Name_of_agent":"担当者の名前","Navigation_History_20_last_pages":"案内の履歴 ( 最近 20 ページ )","New_Department":"新しい部門","Num_Agents":"# 担当者","Opened":"開いた状態","Please_fill_a_name":"名前を入力してください","Please_fill_a_username":"ユーザー名を入力してください","Please_select_enabled_yes_or_no":"有効の設定オプションを選択してください","Saved":"保存しました","Selected_agents":"選択された担当者","Send_a_message":"メッセージを送信","Theme":"テーマ","There_are_no_agents_added_to_this_department_yet":"この部門には、まだ担当者がいません。","Time_in_seconds":"時間を秒数で指定","Title_bar_color":"タイトルバー色","To_install_RocketChat_Livechat_in_your_website_copy_paste_this_code_above_the_last_body_tag_on_your_site":"Webサイトへ Rocket.Chat ライブチャットを導入するには、あなたのサイトの <strong>&lt;/body&gt;</strong> タグの前に、このコードをコピー &amp; ペーストしてください。","Trigger_removed":"トリガーを削除しました","Triggers":"トリガー","User_management":"ユーザー管理","Username_not_found":"ユーザー名が見つかりません","Visitor_page_URL":"訪問者のページ URL","Visitor_time_on_site":"サイトの滞在時間"});
TAPi18n._registerServerTranslator("ja", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/km.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["km"] = ["Khmer","ភាសាខ្មែរ"];                                                               // 8
if(_.isUndefined(TAPi18n.translations["km"])) {                                                                      // 9
  TAPi18n.translations["km"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["km"][namespace])) {                                                           // 13
  TAPi18n.translations["km"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["km"][namespace], {"Livechat_title":"ចំណង​ជើង LiveChat","Livechat_title_color":"ពណ៌ផ្ទៃខាងក្រោយចំណងជើង LiveChat"});
TAPi18n._registerServerTranslator("km", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/ko.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["ko"] = ["Korean","한국어"];                                                                    // 8
if(_.isUndefined(TAPi18n.translations["ko"])) {                                                                      // 9
  TAPi18n.translations["ko"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["ko"][namespace])) {                                                           // 13
  TAPi18n.translations["ko"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["ko"][namespace], {"Add":"추가","Description":"설명","Enter_a_username":"사용자 이름 입력","Livechat_title":"Livechat 제목","Livechat_title_color":"Livechat 제목 배경색","Saved":"저장됨"});
TAPi18n._registerServerTranslator("ko", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/lo.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["lo"] = ["Lao","ພາສາລາວ"];                                                                   // 8
if(_.isUndefined(TAPi18n.translations["lo"])) {                                                                      // 9
  TAPi18n.translations["lo"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["lo"][namespace])) {                                                           // 13
  TAPi18n.translations["lo"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["lo"][namespace], {"Livechat_enabled":"Livechat ເປີດ​ໃຫ້​ໃຊ້​ງານ"});                   // 17
TAPi18n._registerServerTranslator("lo", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/ms-MY.i18n.json                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["ms-MY"] = ["ms-MY","ms-MY"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["ms-MY"])) {                                                                   // 9
  TAPi18n.translations["ms-MY"] = {};                                                                                // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["ms-MY"][namespace])) {                                                        // 13
  TAPi18n.translations["ms-MY"][namespace] = {};                                                                     // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["ms-MY"][namespace], {"Livechat_title":"Tajuk Livechat","Livechat_title_color":"Warna latar belakang tajuk Livechat"});
TAPi18n._registerServerTranslator("ms-MY", namespace);                                                               // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/nl.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                                              // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                                                      // 9
  TAPi18n.translations["nl"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                                                           // 13
  TAPi18n.translations["nl"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["nl"][namespace], {"Add":"Toevoegen","Add_agent":"Voeg agent toe","Add_manager":"Manager toevoegen","Agent_added":"Agent toegevoegd","Agent_removed":"Agent verwijderd","Available_agents":"Beschikbare agenten","Back":"Terug","Closed":"Gesloten","Copy_to_clipboard":"Kopieer naar klembord","Count":"Aantal","Dashboard":"Dashboard","Department_not_found":"Afdeling niet gevonden","Department_removed":"Afdeling verwijderd","Departments":"Afdelingen","Description":"Beschrijving","Edit_Department":"Afdeling bewerken","Empty_title":"Lege titel","Enable":"Inschakelen","Enabled":"Ingeschakeld","Enter_a_regex":"Voer een reguliere expressie in","Enter_a_username":"Voer een gebruikersnaam in","Live_sessions":"Live sessies","Livechat_agents":"Livechat agenten","Livechat_Dashboard":"Livechat Dashboard","Livechat_enabled":"Livechat beschikbaar","Livechat_Manager":"Livechat Manager","Livechat_managers":"Livechat managers","Livechat_title":"Livechat Titel","Livechat_title_color":"Livechat Titel Achtergrond Kleur","Livechat_Users":"Livechat Gebruikers","Manager_added":"Manager toegevoegd","Manager_removed":"Manager verwijderd","Name_of_agent":"Naam agent","Navigation_History_20_last_pages":"Navigatie Geschiedenis (20 laatste pagina's)","New_Department":"Nieuwe afdeling","Num_Agents":"# Agenten","Opened":"Geopend","Order":"Bestelling","Please_fill_a_name":"Vul een naam in","Please_fill_a_username":"Vul een gebruikersnaam in","Please_select_enabled_yes_or_no":"Selecteer een optie voor Ingeschakeld","Saved":"Opgeslagen","Selected_agents":"Geselecteerde agenten","Send_a_message":"Stuur een bericht","Show_preregistration_form":"<p>Showing <b>%s</b> archived results</p>","Theme":"Thema","There_are_no_agents_added_to_this_department_yet":"Er zijn nog geen agenten aan deze afdeling toegevoegd.","Time_in_seconds":"Tijd in seconden","Title_bar_color":"Titelbalk kleur","To_install_RocketChat_Livechat_in_your_website_copy_paste_this_code_above_the_last_body_tag_on_your_site":"Om Rocket.Chat Livechat te installeren op uw website, kopiëert u de volgende code boven de laatste <strong>&lt;/body&gt;</strong> html tag op uw web pagina's.","Trigger_removed":"Trigger verwijderd","Triggers":"Triggers","User_management":"Gebruikersbeheer","Username_not_found":"Gebruikersnaam niet gevonden","Visitor_page_URL":"Bezoeker URL","Visitor_time_on_site":"Bezoeker tijd aanwezig op de site"});
TAPi18n._registerServerTranslator("nl", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/pl.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                                                      // 9
  TAPi18n.translations["pl"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                                                           // 13
  TAPi18n.translations["pl"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["pl"][namespace], {"Add":"Dodaj","Description":"Opis","Enable":"Włącz","Enabled":"Włączone","Enter_a_username":"Nazwa użytkownika","Livechat_title":"Tytuł Livechatu","Livechat_title_color":"Kolor tła nagłówka Livechat","Please_fill_a_username":"Proszę wypełnić nazwę użytkownika","Saved":"Zapisano","Send_a_message":"Wyślij wiadomość","Theme":"Motyw"});
TAPi18n._registerServerTranslator("pl", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/pt.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["pt"] = ["Portuguese (Portugal)","Português"];                                               // 8
if(_.isUndefined(TAPi18n.translations["pt"])) {                                                                      // 9
  TAPi18n.translations["pt"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["pt"][namespace])) {                                                           // 13
  TAPi18n.translations["pt"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["pt"][namespace], {"Add":"Adicionar","Add_agent":"Adicionar agente","Add_manager":"Adicionar gerente","Agent_added":"Agente adicionado","Agent_removed":"Agente removido","Description":"Descrição","Enter_a_username":"Nome de usuário","Livechat_agents":"Agentes do Livechat","Livechat_Manager":"Administração Livechat","Livechat_managers":"Gerentes do Livechat","Livechat_title":"Título Livechat","Livechat_title_color":"Cor de fundo do título do Livechat","Manager_added":"Gerente adicionado","Manager_removed":"Gerente removido","Please_fill_a_username":"Por favor preencha um nome de usuário","Saved":"Salvo","Username_not_found":"Nome de usuário não encontrado"});
TAPi18n._registerServerTranslator("pt", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/ro.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                                               // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                                      // 9
  TAPi18n.translations["ro"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                                           // 13
  TAPi18n.translations["ro"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["ro"][namespace], {"Add":"Adăugă","Add_agent":"Adaugă agent","Add_manager":"Adauga manager","Agent_added":"Agent adăugat","Agent_removed":"Agent eliminat","Available_agents":"Agenți disponibili","Back":"Înapoi","Closed":"Închis","Copy_to_clipboard":"Copiați în clipboard","Count":"Număr","Dashboard":"Tablou de comandă","Department_not_found":"Departamentul nu a fost găsit","Department_removed":"Departament eliminat","Departments":"Departamente","Description":"Descriere","Edit_Department":"Editează departament","Empty_title":"Titlu gol","Enable":"Activează","Enabled":"Activat","Enter_a_regex":"Introduceți un regex","Enter_a_username":"Introduceți un nume de utilizator","Live_sessions":"Sesiuni live","Livechat_agents":"Agenți Livechat","Livechat_Dashboard":"Tabloul de bord Livechat","Livechat_enabled":"Livechat activat","Livechat_Manager":"Manager Livechat","Livechat_managers":"Manageri Livechat","Livechat_title":"Titlu Livechat","Livechat_title_color":"Culoare de fundal titlu Livechat ","Livechat_Users":"Utilizatorii Livechat","Manager_added":"Manager adăugat","Manager_removed":"Manager eliminat","Name_of_agent":"Numele agentului","Navigation_History_20_last_pages":"Istoria de navigare (ultimele 20 de pagini)","New_Department":"Departament nou","Num_Agents":"# Agenți","Opened":"Deschis","Order":"Sortare","Please_fill_a_name":"Vă rugăm să completați un nume","Please_fill_a_username":"Vă rugăm să completați un nume de utilizator","Please_select_enabled_yes_or_no":"Vă rugăm să selectați o opțiune pentru Enabled","Saved":"Salvat","Selected_agents":"Agenți selectați","Send_a_message":"Trimite un mesaj","Show_preregistration_form":"Arată formularul de pre-înregistrare","Theme":"Temă","There_are_no_agents_added_to_this_department_yet":"Încă există agenți adăugați la acest departament.","Time_in_seconds":"Timpul în secunde","Title_bar_color":"Culoare bară de titlu","To_install_RocketChat_Livechat_in_your_website_copy_paste_this_code_above_the_last_body_tag_on_your_site":"Pentru a instala Rocket.Chat Livechat în site-ul dvs., copiați & lipiți acest cod chiar înaintea ultimului tag <strong>&lt;/body&gt;</strong> din pagină.","Trigger_removed":"Declanșator eliminat","Triggers":"Declanșatori","User_management":"Managementul utilizatorilor","Username_not_found":"Numele de utilizator nu a fost găsit","Visitor_page_URL":"Pagina  URL a vizitatorului","Visitor_time_on_site":"Timpul vizitatorului pe site"});
TAPi18n._registerServerTranslator("ro", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/ru.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                                               // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                                      // 9
  TAPi18n.translations["ru"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                                           // 13
  TAPi18n.translations["ru"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["ru"][namespace], {"Add":"Добавить","Add_agent":"Добавить сотрудника","Add_manager":"Добавить менеджера","Agent_added":"Сотрудник добавлен","Agent_removed":"Сотрудник удален","Available_agents":"Свободные сотрудники","Back":"Назад","Closed":"Закрыто","Copy_to_clipboard":"Копировать в буфер обмена","Count":"Счет","Dashboard":"Панель","Department_not_found":"Раздел не найден","Department_removed":"Раздел удален","Departments":"Разделы","Description":"Описание","Edit_Department":"Редактировать раздел","Empty_title":"Пустой заголовок","Enable":"Включить","Enabled":"Включено","Enter_a_regex":"Войдите в regex","Enter_a_username":"Введите имя пользователя","Live_sessions":"Живые сессии","Livechat_agents":"Сотрудники Livechat ","Livechat_Dashboard":"Информационная панель Livechat ","Livechat_enabled":"Включен Livechat","Livechat_Manager":"Менеджер Livechat ","Livechat_managers":"Менеджеры Livechat","Livechat_title":"Название чата","Livechat_title_color":"Наименование цвета фона Livechat","Livechat_Users":"Пользователи Livechat ","Manager_added":"Менеджер добавлен","Manager_removed":"Менеджер удален","Name_of_agent":"Имя сотрудника","Navigation_History_20_last_pages":"Журнал переходов (20 последних страниц)","New_Department":"Новый раздел","Num_Agents":"# Сотрудники","Opened":"Открыто","Order":"Последовательность","Please_fill_a_name":"Введите имя","Please_fill_a_username":"Заполните имя пользователя","Please_select_enabled_yes_or_no":"Выберите вариант \"Разрешено\"","Saved":"Сохранено","Selected_agents":"Выбранные сотрудники","Send_a_message":"Отправить сообщение","Show_preregistration_form":"Показать предварительную регистрационную форму","Theme":"Тема","There_are_no_agents_added_to_this_department_yet":"Сотрудников, добавленных в этот раздел, не найдено.","Time_in_seconds":"Время в секундах","Title_bar_color":"Цвет строки заголовка","To_install_RocketChat_Livechat_in_your_website_copy_paste_this_code_above_the_last_body_tag_on_your_site":"Для того, чтобы установить Rocket.Chat Livechat на Вашем сайте, скопируйте &amp; и вставьте этот код выше последнего <strong>&lt;/body&gt;</strong> тега на Вашем сайте.","Trigger_removed":"Триггер удален","Triggers":"Триггер","User_management":"Управление пользователями","Username_not_found":"Пользователь не найден","Visitor_page_URL":"URL-адрес страницы посетителя","Visitor_time_on_site":"Время посетителя, проведённое на сайте"});
TAPi18n._registerServerTranslator("ru", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/sq.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["sq"] = ["Albanian","Shqip"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["sq"])) {                                                                      // 9
  TAPi18n.translations["sq"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["sq"][namespace])) {                                                           // 13
  TAPi18n.translations["sq"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["sq"][namespace], {"Livechat_enabled":"LiveChat aktivizuar"});                         // 17
TAPi18n._registerServerTranslator("sq", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/sv.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["sv"] = ["Swedish","Svenska"];                                                               // 8
if(_.isUndefined(TAPi18n.translations["sv"])) {                                                                      // 9
  TAPi18n.translations["sv"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["sv"][namespace])) {                                                           // 13
  TAPi18n.translations["sv"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["sv"][namespace], {"Add":"Lägg till","Back":"Tillbaka","Closed":"Stängd","Department_not_found":"Avdelning inte hittad","Department_removed":"Avdelning borttagen","Departments":"Avdelningar","Description":"Beskrivning","Edit_Department":"Redigera avdelning","Empty_title":"Tom titel","Enable":"Aktivera","Enabled":"Aktiverad","Enter_a_username":"Skriv ett användarnamn","Livechat_enabled":"Livechat aktiverat","Navigation_History_20_last_pages":"Navigationshistorik (de 20 senaste sidorna)","New_Department":"Ny avdelning","Opened":"Öppnad","Please_fill_a_name":"Vänligen fyll i ett namn","Please_fill_a_username":"Vänligen fyll i ett användarnamn","Saved":"Sparad","Send_a_message":"Skicka ett meddelande","Time_in_seconds":"Tid i sekunder","Username_not_found":"Användarnamn inte hittat"});
TAPi18n._registerServerTranslator("sv", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/tr.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["tr"] = ["Turkish","Türkçe"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["tr"])) {                                                                      // 9
  TAPi18n.translations["tr"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["tr"][namespace])) {                                                           // 13
  TAPi18n.translations["tr"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["tr"][namespace], {"Livechat_enabled":"Canlı etkin"});                                 // 17
TAPi18n._registerServerTranslator("tr", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/ug.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["ug"] = ["Uighur","Uyƣurqə"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["ug"])) {                                                                      // 9
  TAPi18n.translations["ug"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["ug"][namespace])) {                                                           // 13
  TAPi18n.translations["ug"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["ug"][namespace], {"Livechat_enabled":"Livechat Enabled"});                            // 17
TAPi18n._registerServerTranslator("ug", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/uk.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["uk"] = ["Ukrainian","Українська"];                                                          // 8
if(_.isUndefined(TAPi18n.translations["uk"])) {                                                                      // 9
  TAPi18n.translations["uk"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["uk"][namespace])) {                                                           // 13
  TAPi18n.translations["uk"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["uk"][namespace], {"Livechat_enabled":"Включений Livechat"});                          // 17
TAPi18n._registerServerTranslator("uk", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/zh-HK.i18n.json                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["zh-HK"] = ["Chinese (Hong Kong)","繁体中文（香港）"];                                               // 8
if(_.isUndefined(TAPi18n.translations["zh-HK"])) {                                                                   // 9
  TAPi18n.translations["zh-HK"] = {};                                                                                // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["zh-HK"][namespace])) {                                                        // 13
  TAPi18n.translations["zh-HK"][namespace] = {};                                                                     // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["zh-HK"][namespace], {"Livechat_enabled":"在线咨询启用"});                                   // 17
TAPi18n._registerServerTranslator("zh-HK", namespace);                                                               // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/zh-TW.i18n.json                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["zh-TW"] = ["Chinese (Taiwan)","繁体中文（台湾）"];                                                  // 8
if(_.isUndefined(TAPi18n.translations["zh-TW"])) {                                                                   // 9
  TAPi18n.translations["zh-TW"] = {};                                                                                // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["zh-TW"][namespace])) {                                                        // 13
  TAPi18n.translations["zh-TW"][namespace] = {};                                                                     // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["zh-TW"][namespace], {"Add_manager":"新增管理員","Back":"返回","Livechat_enabled":"在线咨询启用","Livechat_Manager":"Livechat管理員","Livechat_title":"Livechat 標題","Livechat_title_color":"Livechat 標題背景顏色","Please_fill_a_name":"請輸入姓名","Please_fill_a_username":"請填入姓名","Send_a_message":"發送一則訊息","Theme":"主題"});
TAPi18n._registerServerTranslator("zh-TW", namespace);                                                               // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_livechat/packages/rocketchat_livechati18n/zh.i18n.json                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                                                    // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                                      // 9
  TAPi18n.translations["zh"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                                           // 13
  TAPi18n.translations["zh"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["zh"][namespace], {"Add":"添加","Add_agent":"添加客服","Add_manager":"添加管理员","Agent_added":"已添加客服","Agent_removed":"已删除客服","Available_agents":"空闲客服","Back":"返回","Closed":"已关闭","Copy_to_clipboard":"复制到剪贴板","Dashboard":"控制面板","Department_not_found":"不存在该部门","Department_removed":"部门已删除","Departments":"部门","Description":"描述","Edit_Department":"编辑部门信息","Empty_title":"空标题","Enable":"启用","Enabled":"已启用","Enter_a_regex":"输入正则表达式","Enter_a_username":"请输入用户名","Live_sessions":"在线会话","Livechat_agents":"在线客服","Livechat_Dashboard":"在闲客服控制面板","Livechat_enabled":"即时聊天启用","Livechat_Manager":"在线聊天管理员","Livechat_managers":"在线聊天管理员","Livechat_title":"在线聊天标题","Livechat_title_color":"在线聊天标题背景色","Livechat_Users":"在线聊天用户","Manager_added":"已添加管理员","Manager_removed":"管理员已删除","Name_of_agent":"客服的名称","Navigation_History_20_last_pages":"导航历史（最近 20 页）","New_Department":"新部门","Num_Agents":"# 客服","Opened":"已开启","Please_fill_a_name":"请填写名字","Please_fill_a_username":"请填写用户名","Please_select_enabled_yes_or_no":"请选择要启用的项","Saved":"已保存","Selected_agents":"已选择的客服","Send_a_message":"发送信息","Show_preregistration_form":"显示登录前的表单","Theme":"主题","There_are_no_agents_added_to_this_department_yet":"该部门尚未分配任何客服。","Time_in_seconds":"以秒记的事件","Title_bar_color":"标题栏颜色","To_install_RocketChat_Livechat_in_your_website_copy_paste_this_code_above_the_last_body_tag_on_your_site":"要在您的网页中使用Rocket.Chat Livechat，请将以下代码复制到您的网页代码中最后一个 <strong>&lt;/body&gt;</strong> 标签之上。","Trigger_removed":"已删除触发器","Triggers":"触发器","User_management":"用户管理","Username_not_found":"用户名不存在","Visitor_page_URL":"访客页面 ","Visitor_time_on_site":"访客的网站浏览时间"});
TAPi18n._registerServerTranslator("zh", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:livechat'] = {};

})();

//# sourceMappingURL=rocketchat_livechat.js.map
