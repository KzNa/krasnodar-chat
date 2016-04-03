(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var subscription, translations;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/server/methods/saveNotificationSettings.js                          //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.methods({                                                                                              // 1
	saveNotificationSettings: function (rid, field, value) {                                                     // 2
		if (!Meteor.userId()) {                                                                                     // 3
			throw new Meteor.Error('invalid-user', 'Invalid user');                                                    // 4
		}                                                                                                           //
                                                                                                              //
		check(rid, String);                                                                                         // 7
		check(field, String);                                                                                       // 8
		check(value, String);                                                                                       // 9
                                                                                                              //
		if (['desktopNotifications', 'mobilePushNotifications', 'emailNotifications'].indexOf(field) === -1) {      // 11
			throw new Meteor.Error('invalid-settings', 'Invalid settings field');                                      // 12
		}                                                                                                           //
                                                                                                              //
		if (['all', 'mentions', 'nothing', 'default'].indexOf(value) === -1) {                                      // 15
			throw new Meteor.Error('invalid-settings', 'Invalid settings value');                                      // 16
		}                                                                                                           //
                                                                                                              //
		subscription = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(rid, Meteor.userId());              // 19
		if (!subscription) {                                                                                        // 20
			throw new Meteor.Error('invalid-subscription', 'Invalid subscription');                                    // 21
		}                                                                                                           //
                                                                                                              //
		if (field === 'desktopNotifications') {                                                                     // 24
			RocketChat.models.Subscriptions.updateDesktopNotificationsById(subscription._id, value);                   // 25
		} else if (field === 'mobilePushNotifications') {                                                           //
			RocketChat.models.Subscriptions.updateMobilePushNotificationsById(subscription._id, value);                // 27
		} else if (field === 'emailNotifications') {                                                                //
			RocketChat.models.Subscriptions.updateEmailNotificationsById(subscription._id, value);                     // 29
		}                                                                                                           //
                                                                                                              //
		return true;                                                                                                // 32
	}                                                                                                            //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/server/models/Subscriptions.js                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
RocketChat.models.Subscriptions.updateDesktopNotificationsById = function (_id, desktopNotifications) {       // 1
	var query = {                                                                                                // 2
		_id: _id                                                                                                    // 3
	};                                                                                                           //
                                                                                                              //
	var update = {                                                                                               // 6
		$set: {                                                                                                     // 7
			desktopNotifications: desktopNotifications                                                                 // 8
		}                                                                                                           //
	};                                                                                                           //
                                                                                                              //
	return this.update(query, update);                                                                           // 12
};                                                                                                            //
                                                                                                              //
RocketChat.models.Subscriptions.updateMobilePushNotificationsById = function (_id, mobilePushNotifications) {
	var query = {                                                                                                // 16
		_id: _id                                                                                                    // 17
	};                                                                                                           //
                                                                                                              //
	var update = {                                                                                               // 20
		$set: {                                                                                                     // 21
			mobilePushNotifications: mobilePushNotifications                                                           // 22
		}                                                                                                           //
	};                                                                                                           //
                                                                                                              //
	return this.update(query, update);                                                                           // 26
};                                                                                                            //
                                                                                                              //
RocketChat.models.Subscriptions.updateEmailNotificationsById = function (_id, emailNotifications) {           // 29
	var query = {                                                                                                // 30
		_id: _id                                                                                                    // 31
	};                                                                                                           //
                                                                                                              //
	var update = {                                                                                               // 34
		$set: {                                                                                                     // 35
			emailNotifications: emailNotifications                                                                     // 36
		}                                                                                                           //
	};                                                                                                           //
                                                                                                              //
	return this.update(query, update);                                                                           // 40
};                                                                                                            //
                                                                                                              //
RocketChat.models.Subscriptions.findAlwaysNotifyDesktopUsersByRoomId = function (roomId) {                    // 43
	var query = {                                                                                                // 44
		rid: roomId,                                                                                                // 45
		desktopNotifications: 'all'                                                                                 // 46
	};                                                                                                           //
                                                                                                              //
	return this.find(query);                                                                                     // 49
};                                                                                                            //
                                                                                                              //
RocketChat.models.Subscriptions.findDontNotifyDesktopUsersByRoomId = function (roomId) {                      // 52
	var query = {                                                                                                // 53
		rid: roomId,                                                                                                // 54
		desktopNotifications: 'nothing'                                                                             // 55
	};                                                                                                           //
                                                                                                              //
	return this.find(query);                                                                                     // 58
};                                                                                                            //
                                                                                                              //
RocketChat.models.Subscriptions.findAlwaysNotifyMobileUsersByRoomId = function (roomId) {                     // 61
	var query = {                                                                                                // 62
		rid: roomId,                                                                                                // 63
		mobilePushNotifications: 'all'                                                                              // 64
	};                                                                                                           //
                                                                                                              //
	return this.find(query);                                                                                     // 67
};                                                                                                            //
                                                                                                              //
RocketChat.models.Subscriptions.findDontNotifyMobileUsersByRoomId = function (roomId) {                       // 70
	var query = {                                                                                                // 71
		rid: roomId,                                                                                                // 72
		mobilePushNotifications: 'nothing'                                                                          // 73
	};                                                                                                           //
                                                                                                              //
	return this.find(query);                                                                                     // 76
};                                                                                                            //
                                                                                                              //
RocketChat.models.Subscriptions.findNotificationPreferencesByRoom = function (roomId) {                       // 79
	var query = {                                                                                                // 80
		rid: roomId,                                                                                                // 81
		'u._id': { $exists: true },                                                                                 // 82
		$or: [{ desktopNotifications: { $exists: true } }, { mobilePushNotifications: { $exists: true } }]          // 83
	};                                                                                                           //
                                                                                                              //
	return this.find(query);                                                                                     // 89
};                                                                                                            //
                                                                                                              //
RocketChat.models.Subscriptions.findWithSendEmailByRoomId = function (roomId) {                               // 92
	var query = {                                                                                                // 93
		rid: roomId,                                                                                                // 94
		emailNotifications: {                                                                                       // 95
			$exists: true                                                                                              // 96
		}                                                                                                           //
	};                                                                                                           //
                                                                                                              //
	return this.find(query, { fields: { emailNotifications: 1, u: 1 } });                                        // 100
};                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/packages/rocketchat_push-notificationsi18n/ar.i18n.json             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var _ = Package.underscore._,                                                                                 // 1
    package_name = "project",                                                                                 // 2
    namespace = "project";                                                                                    // 3
                                                                                                              // 4
if (package_name != "project") {                                                                              // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                     // 6
}                                                                                                             // 7
TAPi18n.languages_names["ar"] = ["Arabic","العربية"];                                                         // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                                        // 10
if(_.isUndefined(TAPi18n.translations["ar"])) {                                                               // 11
  TAPi18n.translations["ar"] = {};                                                                            // 12
}                                                                                                             // 13
                                                                                                              // 14
if(_.isUndefined(TAPi18n.translations["ar"][namespace])) {                                                    // 15
  TAPi18n.translations["ar"][namespace] = {};                                                                 // 16
}                                                                                                             // 17
                                                                                                              // 18
_.extend(TAPi18n.translations["ar"][namespace], {"All_messages":"كل الرسائل","Desktop_notifications":"تنبيهات سطح المكتب","Mobile_push_notifications":"تنبيهات الهاتف"});
TAPi18n._registerServerTranslator("ar", namespace);                                                           // 20
                                                                                                              // 21
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/packages/rocketchat_push-notificationsi18n/de.i18n.json             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var _ = Package.underscore._,                                                                                 // 1
    package_name = "project",                                                                                 // 2
    namespace = "project";                                                                                    // 3
                                                                                                              // 4
if (package_name != "project") {                                                                              // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                     // 6
}                                                                                                             // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                                         // 8
if(_.isUndefined(TAPi18n.translations["de"])) {                                                               // 9
  TAPi18n.translations["de"] = {};                                                                            // 10
}                                                                                                             // 11
                                                                                                              // 12
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                                    // 13
  TAPi18n.translations["de"][namespace] = {};                                                                 // 14
}                                                                                                             // 15
                                                                                                              // 16
_.extend(TAPi18n.translations["de"][namespace], {"All_messages":"Alle Nachrichten","Desktop_notifications":"Desktop-Benachrichtigungen","Invalid_notification_setting_s":"Ungültige Benachrichtigungseinstellung: %s","Mentions":"Erwähnungen","Mentions_default":"Erwähnungen (Standard)","Mobile_push_notifications":"Pushnachrichten auf mobilen Geräten","Nothing":"Nichts","Push_notifications":"Pushnachrichten","Use_account_preference":"Kontoeinstellungen verwenden"});
TAPi18n._registerServerTranslator("de", namespace);                                                           // 18
                                                                                                              // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/packages/rocketchat_push-notificationsi18n/en.i18n.json             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var _ = Package.underscore._,                                                                                 // 1
    package_name = "project",                                                                                 // 2
    namespace = "project";                                                                                    // 3
                                                                                                              // 4
if (package_name != "project") {                                                                              // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                     // 6
}                                                                                                             // 7
// integrate the fallback language translations                                                               // 8
translations = {};                                                                                            // 9
translations[namespace] = {"All_messages":"All messages","Desktop_notifications":"Desktop notifications","Invalid_notification_setting_s":"Invalid notification setting: %s","Mentions":"Mentions","Mentions_default":"Mentions (default)","Mobile_push_notifications":"Mobile push notifications","Nothing":"Nothing","Push_notifications":"Push notifications","Use_account_preference":"Use account preference"};
TAPi18n._loadLangFileObject("en", translations);                                                              // 11
TAPi18n._registerServerTranslator("en", namespace);                                                           // 12
                                                                                                              // 13
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/packages/rocketchat_push-notificationsi18n/es.i18n.json             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var _ = Package.underscore._,                                                                                 // 1
    package_name = "project",                                                                                 // 2
    namespace = "project";                                                                                    // 3
                                                                                                              // 4
if (package_name != "project") {                                                                              // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                     // 6
}                                                                                                             // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                                                // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                                               // 9
  TAPi18n.translations["es"] = {};                                                                            // 10
}                                                                                                             // 11
                                                                                                              // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                                                    // 13
  TAPi18n.translations["es"][namespace] = {};                                                                 // 14
}                                                                                                             // 15
                                                                                                              // 16
_.extend(TAPi18n.translations["es"][namespace], {"Mentions":"Menciones"});                                    // 17
TAPi18n._registerServerTranslator("es", namespace);                                                           // 18
                                                                                                              // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/packages/rocketchat_push-notificationsi18n/fi.i18n.json             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var _ = Package.underscore._,                                                                                 // 1
    package_name = "project",                                                                                 // 2
    namespace = "project";                                                                                    // 3
                                                                                                              // 4
if (package_name != "project") {                                                                              // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                     // 6
}                                                                                                             // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                                          // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                                               // 9
  TAPi18n.translations["fi"] = {};                                                                            // 10
}                                                                                                             // 11
                                                                                                              // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                                                    // 13
  TAPi18n.translations["fi"][namespace] = {};                                                                 // 14
}                                                                                                             // 15
                                                                                                              // 16
_.extend(TAPi18n.translations["fi"][namespace], {"Mentions":"Maininnat"});                                    // 17
TAPi18n._registerServerTranslator("fi", namespace);                                                           // 18
                                                                                                              // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/packages/rocketchat_push-notificationsi18n/fr.i18n.json             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var _ = Package.underscore._,                                                                                 // 1
    package_name = "project",                                                                                 // 2
    namespace = "project";                                                                                    // 3
                                                                                                              // 4
if (package_name != "project") {                                                                              // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                     // 6
}                                                                                                             // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                               // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                               // 9
  TAPi18n.translations["fr"] = {};                                                                            // 10
}                                                                                                             // 11
                                                                                                              // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                    // 13
  TAPi18n.translations["fr"][namespace] = {};                                                                 // 14
}                                                                                                             // 15
                                                                                                              // 16
_.extend(TAPi18n.translations["fr"][namespace], {"All_messages":"Tous les messages","Desktop_notifications":"Notifications sur le bureau ","Invalid_notification_setting_s":"Paramètre de notification invalide : %s","Mentions":"Mentions","Mentions_default":"Mentions (défaut)","Mobile_push_notifications":"Notifications push sur mobile","Nothing":"Rien","Push_notifications":"Notifications Push","Use_account_preference":"Préférence du compte utilisateur"});
TAPi18n._registerServerTranslator("fr", namespace);                                                           // 18
                                                                                                              // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/packages/rocketchat_push-notificationsi18n/he.i18n.json             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var _ = Package.underscore._,                                                                                 // 1
    package_name = "project",                                                                                 // 2
    namespace = "project";                                                                                    // 3
                                                                                                              // 4
if (package_name != "project") {                                                                              // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                     // 6
}                                                                                                             // 7
TAPi18n.languages_names["he"] = ["Hebrew","עברית"];                                                           // 8
if(_.isUndefined(TAPi18n.translations["he"])) {                                                               // 9
  TAPi18n.translations["he"] = {};                                                                            // 10
}                                                                                                             // 11
                                                                                                              // 12
if(_.isUndefined(TAPi18n.translations["he"][namespace])) {                                                    // 13
  TAPi18n.translations["he"][namespace] = {};                                                                 // 14
}                                                                                                             // 15
                                                                                                              // 16
_.extend(TAPi18n.translations["he"][namespace], {"Mentions":"אזכורים"});                                      // 17
TAPi18n._registerServerTranslator("he", namespace);                                                           // 18
                                                                                                              // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/packages/rocketchat_push-notificationsi18n/ja.i18n.json             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var _ = Package.underscore._,                                                                                 // 1
    package_name = "project",                                                                                 // 2
    namespace = "project";                                                                                    // 3
                                                                                                              // 4
if (package_name != "project") {                                                                              // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                     // 6
}                                                                                                             // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                                           // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                               // 9
  TAPi18n.translations["ja"] = {};                                                                            // 10
}                                                                                                             // 11
                                                                                                              // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                                    // 13
  TAPi18n.translations["ja"][namespace] = {};                                                                 // 14
}                                                                                                             // 15
                                                                                                              // 16
_.extend(TAPi18n.translations["ja"][namespace], {"All_messages":"すべてのメッセージ","Desktop_notifications":"デスクトップ通知","Invalid_notification_setting_s":"無効な通知設定: %s","Mentions":"メンション","Mentions_default":"メンション (デフォルト)","Mobile_push_notifications":"モバイルプッシュ通知","Nothing":"なし","Push_notifications":"プッシュ通知","Use_account_preference":"アカウント設定を使用する"});
TAPi18n._registerServerTranslator("ja", namespace);                                                           // 18
                                                                                                              // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/packages/rocketchat_push-notificationsi18n/nl.i18n.json             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var _ = Package.underscore._,                                                                                 // 1
    package_name = "project",                                                                                 // 2
    namespace = "project";                                                                                    // 3
                                                                                                              // 4
if (package_name != "project") {                                                                              // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                     // 6
}                                                                                                             // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                                       // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                                               // 9
  TAPi18n.translations["nl"] = {};                                                                            // 10
}                                                                                                             // 11
                                                                                                              // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                                                    // 13
  TAPi18n.translations["nl"][namespace] = {};                                                                 // 14
}                                                                                                             // 15
                                                                                                              // 16
_.extend(TAPi18n.translations["nl"][namespace], {"Mentions":"Vermeldingen"});                                 // 17
TAPi18n._registerServerTranslator("nl", namespace);                                                           // 18
                                                                                                              // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/packages/rocketchat_push-notificationsi18n/pl.i18n.json             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var _ = Package.underscore._,                                                                                 // 1
    package_name = "project",                                                                                 // 2
    namespace = "project";                                                                                    // 3
                                                                                                              // 4
if (package_name != "project") {                                                                              // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                     // 6
}                                                                                                             // 7
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                                          // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                                               // 9
  TAPi18n.translations["pl"] = {};                                                                            // 10
}                                                                                                             // 11
                                                                                                              // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                                                    // 13
  TAPi18n.translations["pl"][namespace] = {};                                                                 // 14
}                                                                                                             // 15
                                                                                                              // 16
_.extend(TAPi18n.translations["pl"][namespace], {"Mentions":"Wzmianki o tobie"});                             // 17
TAPi18n._registerServerTranslator("pl", namespace);                                                           // 18
                                                                                                              // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/packages/rocketchat_push-notificationsi18n/ro.i18n.json             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var _ = Package.underscore._,                                                                                 // 1
    package_name = "project",                                                                                 // 2
    namespace = "project";                                                                                    // 3
                                                                                                              // 4
if (package_name != "project") {                                                                              // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                     // 6
}                                                                                                             // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                                        // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                               // 9
  TAPi18n.translations["ro"] = {};                                                                            // 10
}                                                                                                             // 11
                                                                                                              // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                                    // 13
  TAPi18n.translations["ro"][namespace] = {};                                                                 // 14
}                                                                                                             // 15
                                                                                                              // 16
_.extend(TAPi18n.translations["ro"][namespace], {"All_messages":"Toate mesajele","Desktop_notifications":"Notificări desktop","Mentions":"Mențiuni","Mentions_default":"Mențiuni (implicit","Mobile_push_notifications":"Notificări push","Nothing":"Nimic","Push_notifications":"Notificări push"});
TAPi18n._registerServerTranslator("ro", namespace);                                                           // 18
                                                                                                              // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/packages/rocketchat_push-notificationsi18n/ru.i18n.json             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var _ = Package.underscore._,                                                                                 // 1
    package_name = "project",                                                                                 // 2
    namespace = "project";                                                                                    // 3
                                                                                                              // 4
if (package_name != "project") {                                                                              // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                     // 6
}                                                                                                             // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                                        // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                               // 9
  TAPi18n.translations["ru"] = {};                                                                            // 10
}                                                                                                             // 11
                                                                                                              // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                                    // 13
  TAPi18n.translations["ru"][namespace] = {};                                                                 // 14
}                                                                                                             // 15
                                                                                                              // 16
_.extend(TAPi18n.translations["ru"][namespace], {"All_messages":"Все сообщения","Desktop_notifications":"Уведомления на рабочем столе","Invalid_notification_setting_s":"Неверная настройка уведомлений: %s","Mentions":"Упоминания","Mentions_default":"Упоминания (по умолчанию)","Mobile_push_notifications":"Мобильные push-уведомления","Nothing":"Пусто","Push_notifications":"Push-уведомления","Use_account_preference":"Использовать параметры аккаунта"});
TAPi18n._registerServerTranslator("ru", namespace);                                                           // 18
                                                                                                              // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/packages/rocketchat_push-notificationsi18n/sv.i18n.json             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var _ = Package.underscore._,                                                                                 // 1
    package_name = "project",                                                                                 // 2
    namespace = "project";                                                                                    // 3
                                                                                                              // 4
if (package_name != "project") {                                                                              // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                     // 6
}                                                                                                             // 7
TAPi18n.languages_names["sv"] = ["Swedish","Svenska"];                                                        // 8
if(_.isUndefined(TAPi18n.translations["sv"])) {                                                               // 9
  TAPi18n.translations["sv"] = {};                                                                            // 10
}                                                                                                             // 11
                                                                                                              // 12
if(_.isUndefined(TAPi18n.translations["sv"][namespace])) {                                                    // 13
  TAPi18n.translations["sv"][namespace] = {};                                                                 // 14
}                                                                                                             // 15
                                                                                                              // 16
_.extend(TAPi18n.translations["sv"][namespace], {"All_messages":"Alla meddelanden","Desktop_notifications":"Desktop notifieringar ","Invalid_notification_setting_s":"Felaktiga notifierings inställningar: %s","Use_account_preference":"Använd kontoinställningar"});
TAPi18n._registerServerTranslator("sv", namespace);                                                           // 18
                                                                                                              // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/packages/rocketchat_push-notificationsi18n/zh.i18n.json             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var _ = Package.underscore._,                                                                                 // 1
    package_name = "project",                                                                                 // 2
    namespace = "project";                                                                                    // 3
                                                                                                              // 4
if (package_name != "project") {                                                                              // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                     // 6
}                                                                                                             // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                                             // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                               // 9
  TAPi18n.translations["zh"] = {};                                                                            // 10
}                                                                                                             // 11
                                                                                                              // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                                    // 13
  TAPi18n.translations["zh"][namespace] = {};                                                                 // 14
}                                                                                                             // 15
                                                                                                              // 16
_.extend(TAPi18n.translations["zh"][namespace], {"All_messages":"所有信息","Desktop_notifications":"桌面通知","Invalid_notification_setting_s":"无效的通知设置：%s","Mentions":"提及","Mentions_default":"通知（默认）","Mobile_push_notifications":"移动设备信息推送","Nothing":"什么也没有","Push_notifications":"推送信息","Use_account_preference":"使用账户特性"});
TAPi18n._registerServerTranslator("zh", namespace);                                                           // 18
                                                                                                              // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:push-notifications'] = {};

})();

//# sourceMappingURL=rocketchat_push-notifications.js.map
