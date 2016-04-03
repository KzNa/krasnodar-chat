(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var ECMAScript = Package.ecmascript.ECMAScript;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var translations;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_otr/server/settings.js                                                              //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
RocketChat.settings.addGroup("OTR", function () {                                                          // 1
	this.add("OTR_Enable", true, { type: "boolean", "public": true });                                        // 2
});                                                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_otr/server/models/Messages.js                                                       //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
RocketChat.models.Messages.deleteOldOTRMessages = function (roomId, ts) {                                  // 1
	var query = { rid: roomId, t: 'otr', ts: { $lte: ts } };                                                  // 2
	return this.remove(query);                                                                                // 3
};                                                                                                         //
                                                                                                           //
RocketChat.models.Messages.updateOTRAck = function (_id, otrAck) {                                         // 6
	var query = { _id: _id };                                                                                 // 7
	var update = { $set: { otrAck: otrAck } };                                                                // 8
	return this.update(query, update);                                                                        // 9
};                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_otr/server/methods/deleteOldOTRMessages.js                                          //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
Meteor.methods({                                                                                           // 1
	deleteOldOTRMessages: function (roomId) {                                                                 // 2
		if (!Meteor.userId()) {                                                                                  // 3
			throw new Meteor.Error('invalid-user', '[methods] deleteOldOTRMessages -> Invalid user');               // 4
		}                                                                                                        //
                                                                                                           //
		var now = new Date();                                                                                    // 7
		var subscription = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(roomId, Meteor.userId());    // 8
		if (subscription && subscription.t === 'd') {                                                            // 9
			RocketChat.models.Messages.deleteOldOTRMessages(roomId, now);                                           // 10
		} else {                                                                                                 //
			throw new Meteor.Error('invalid-room', '[methods] deleteOldOTRMessages -> Invalid room');               // 12
		}                                                                                                        //
	}                                                                                                         //
});                                                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_otr/server/methods/updateOTRAck.js                                                  //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
Meteor.methods({                                                                                           // 1
	updateOTRAck: function (_id, ack) {                                                                       // 2
		if (!Meteor.userId()) {                                                                                  // 3
			throw new Meteor.Error('invalid-user', '[methods] deleteOldOTRMessages -> Invalid user');               // 4
		}                                                                                                        //
		RocketChat.models.Messages.updateOTRAck(_id, ack);                                                       // 6
	}                                                                                                         //
});                                                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_otr/packages/rocketchat_otri18n/de.i18n.json                                        //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var _ = Package.underscore._,                                                                              // 1
    package_name = "project",                                                                              // 2
    namespace = "project";                                                                                 // 3
                                                                                                           // 4
if (package_name != "project") {                                                                           // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                  // 6
}                                                                                                          // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                                      // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                                     // 10
if(_.isUndefined(TAPi18n.translations["de"])) {                                                            // 11
  TAPi18n.translations["de"] = {};                                                                         // 12
}                                                                                                          // 13
                                                                                                           // 14
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                                 // 15
  TAPi18n.translations["de"][namespace] = {};                                                              // 16
}                                                                                                          // 17
                                                                                                           // 18
_.extend(TAPi18n.translations["de"][namespace], {"End_OTR":"OTR beenden","Off_the_record_conversation":"Off-the-record-Gespräche","Off_the_record_conversation_is_not_available_for_your_browser_or_device":"Off-the-record-Gespräche sind für Ihren Browser oder Ihr Gerät nicht verfügbar.","OTR":"OTR","OTR_is_only_available_when_both_users_are_online":"OTR ist nur möglich, wenn beide Benutzer online sind.","Please_wait_while_OTR_is_being_established":"Bitte warten Sie, während OTR gestartet wird.","Refresh_keys":"Schlüssel aktualisieren","Start_OTR":"OTR beginnen","User_has_disconnected":"Der Benutzer hat die Verbindung getrennt.","Username_denied_the_OTR_session":"__username__ hat die OTR-Session abgelehnt.","Username_ended_the_OTR_session":"__username__ hat die OTR-Session beendet.","Username_wants_to_start_otr_Do_you_want_to_accept":"__username__ möchte ein OTR-Gespräch starten. Möchten Sie annehmen?"});
TAPi18n._registerServerTranslator("de", namespace);                                                        // 20
                                                                                                           // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_otr/packages/rocketchat_otri18n/en.i18n.json                                        //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var _ = Package.underscore._,                                                                              // 1
    package_name = "project",                                                                              // 2
    namespace = "project";                                                                                 // 3
                                                                                                           // 4
if (package_name != "project") {                                                                           // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                  // 6
}                                                                                                          // 7
// integrate the fallback language translations                                                            // 8
translations = {};                                                                                         // 9
translations[namespace] = {"End_OTR":"End OTR","Off_the_record_conversation":"Off-the-record Conversation","Off_the_record_conversation_is_not_available_for_your_browser_or_device":"Off-the-record conversation is not available for your browser or device.","OTR":"OTR","OTR_is_only_available_when_both_users_are_online":"OTR is only available when both users are online","Please_wait_while_OTR_is_being_established":"Please wait while OTR is being established","Refresh_keys":"Refresh keys","Start_OTR":"Start OTR","User_has_disconnected":"User has disconnected","Username_denied_the_OTR_session":"__username__ denied the OTR session","Username_ended_the_OTR_session":"__username__ ended the OTR session","Username_wants_to_start_otr_Do_you_want_to_accept":"__username__ wants to start OTR. Do you want to accept?"};
TAPi18n._loadLangFileObject("en", translations);                                                           // 11
TAPi18n._registerServerTranslator("en", namespace);                                                        // 12
                                                                                                           // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_otr/packages/rocketchat_otri18n/fr.i18n.json                                        //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var _ = Package.underscore._,                                                                              // 1
    package_name = "project",                                                                              // 2
    namespace = "project";                                                                                 // 3
                                                                                                           // 4
if (package_name != "project") {                                                                           // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                  // 6
}                                                                                                          // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                            // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                            // 9
  TAPi18n.translations["fr"] = {};                                                                         // 10
}                                                                                                          // 11
                                                                                                           // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                 // 13
  TAPi18n.translations["fr"][namespace] = {};                                                              // 14
}                                                                                                          // 15
                                                                                                           // 16
_.extend(TAPi18n.translations["fr"][namespace], {"End_OTR":"Arrêter OTR","Off_the_record_conversation":"Conversation Off-the-record (non enregistrée)","Off_the_record_conversation_is_not_available_for_your_browser_or_device":"La conversation Off-the-record n'est pas disponible pour votre navigateur ou appareil.","OTR":"Conversation Cryptée (OTR)","OTR_is_only_available_when_both_users_are_online":"OTR est disponible uniquement lorsque les deux utilisateurs sont connectés","Please_wait_while_OTR_is_being_established":"Veuillez patienter pendant l'établissement de l'OTR","Refresh_keys":"Rafraîchir les clefs","Start_OTR":"Démarrer une conversation cryptée (OTR)","User_has_disconnected":"L'utilisateur s'est déconnecté","Username_denied_the_OTR_session":"__username__ a refusé la session OTR","Username_ended_the_OTR_session":"__username__ a rejoint la session OTR","Username_wants_to_start_otr_Do_you_want_to_accept":"__username__ veut démarrer une conversation cryptée (OTR). Voulez-vous accepter ?"});
TAPi18n._registerServerTranslator("fr", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_otr/packages/rocketchat_otri18n/ja.i18n.json                                        //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var _ = Package.underscore._,                                                                              // 1
    package_name = "project",                                                                              // 2
    namespace = "project";                                                                                 // 3
                                                                                                           // 4
if (package_name != "project") {                                                                           // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                  // 6
}                                                                                                          // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                                        // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                            // 9
  TAPi18n.translations["ja"] = {};                                                                         // 10
}                                                                                                          // 11
                                                                                                           // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                                 // 13
  TAPi18n.translations["ja"][namespace] = {};                                                              // 14
}                                                                                                          // 15
                                                                                                           // 16
_.extend(TAPi18n.translations["ja"][namespace], {"End_OTR":"オフレコ会話を終了","Off_the_record_conversation":"オフレコ会話","Off_the_record_conversation_is_not_available_for_your_browser_or_device":"ご利用のブラウザーやデバイスでは、オフレコ会話を利用できません","OTR":"オフレコ会話","OTR_is_only_available_when_both_users_are_online":"オフレコ会話は、ユーザーがお互いにオンラインの場合に利用できます","Please_wait_while_OTR_is_being_established":"オフレコ会話を確立するまで、お待ちください","Refresh_keys":"接続鍵を更新","Start_OTR":"オフレコ会話を開始","User_has_disconnected":"ユーザーは切断されました","Username_denied_the_OTR_session":"__username__ は、オフレコ会話を断りました","Username_ended_the_OTR_session":"__username__ は、オフレコ会話を終了しました","Username_wants_to_start_otr_Do_you_want_to_accept":"__username__ は、オフレコ会話を開始したいようです。受け入れますか?"});
TAPi18n._registerServerTranslator("ja", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_otr/packages/rocketchat_otri18n/ro.i18n.json                                        //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var _ = Package.underscore._,                                                                              // 1
    package_name = "project",                                                                              // 2
    namespace = "project";                                                                                 // 3
                                                                                                           // 4
if (package_name != "project") {                                                                           // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                  // 6
}                                                                                                          // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                                     // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                            // 9
  TAPi18n.translations["ro"] = {};                                                                         // 10
}                                                                                                          // 11
                                                                                                           // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                                 // 13
  TAPi18n.translations["ro"][namespace] = {};                                                              // 14
}                                                                                                          // 15
                                                                                                           // 16
_.extend(TAPi18n.translations["ro"][namespace], {"User_has_disconnected":"Utilizatorul s-a deconectat"});  // 17
TAPi18n._registerServerTranslator("ro", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_otr/packages/rocketchat_otri18n/ru.i18n.json                                        //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var _ = Package.underscore._,                                                                              // 1
    package_name = "project",                                                                              // 2
    namespace = "project";                                                                                 // 3
                                                                                                           // 4
if (package_name != "project") {                                                                           // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                  // 6
}                                                                                                          // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                                     // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                            // 9
  TAPi18n.translations["ru"] = {};                                                                         // 10
}                                                                                                          // 11
                                                                                                           // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                                 // 13
  TAPi18n.translations["ru"][namespace] = {};                                                              // 14
}                                                                                                          // 15
                                                                                                           // 16
_.extend(TAPi18n.translations["ru"][namespace], {"End_OTR":"Завершить конфиденциальную беседу","Off_the_record_conversation":"Конфиденциальная беседа","Off_the_record_conversation_is_not_available_for_your_browser_or_device":"Конфиденциальная беседа недоступна в Вашем браузере или на Вашем устройстве.","OTR":"Конфиденциально","OTR_is_only_available_when_both_users_are_online":"Конфиденциальная беседа доступна, когда оба пользователя online.","Please_wait_while_OTR_is_being_established":"Подождите, пока Ваша конфиденциальная беседа устанавливается","Refresh_keys":"Обновить клавиши","Start_OTR":"Начать конфиденциальную беседу","User_has_disconnected":"Пользователь отключился","Username_denied_the_OTR_session":"__username__ отклонил конфиденциальную беседу","Username_ended_the_OTR_session":"__username__ завершил конфиденциальную беседу","Username_wants_to_start_otr_Do_you_want_to_accept":"__username__ хочет начать конфиденциальную беседу. Принять?"});
TAPi18n._registerServerTranslator("ru", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_otr/packages/rocketchat_otri18n/sv.i18n.json                                        //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var _ = Package.underscore._,                                                                              // 1
    package_name = "project",                                                                              // 2
    namespace = "project";                                                                                 // 3
                                                                                                           // 4
if (package_name != "project") {                                                                           // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                  // 6
}                                                                                                          // 7
TAPi18n.languages_names["sv"] = ["Swedish","Svenska"];                                                     // 8
if(_.isUndefined(TAPi18n.translations["sv"])) {                                                            // 9
  TAPi18n.translations["sv"] = {};                                                                         // 10
}                                                                                                          // 11
                                                                                                           // 12
if(_.isUndefined(TAPi18n.translations["sv"][namespace])) {                                                 // 13
  TAPi18n.translations["sv"][namespace] = {};                                                              // 14
}                                                                                                          // 15
                                                                                                           // 16
_.extend(TAPi18n.translations["sv"][namespace], {"User_has_disconnected":"Användaren har kopplats bort"});
TAPi18n._registerServerTranslator("sv", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_otr/packages/rocketchat_otri18n/zh.i18n.json                                        //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var _ = Package.underscore._,                                                                              // 1
    package_name = "project",                                                                              // 2
    namespace = "project";                                                                                 // 3
                                                                                                           // 4
if (package_name != "project") {                                                                           // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                  // 6
}                                                                                                          // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                                          // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                            // 9
  TAPi18n.translations["zh"] = {};                                                                         // 10
}                                                                                                          // 11
                                                                                                           // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                                 // 13
  TAPi18n.translations["zh"][namespace] = {};                                                              // 14
}                                                                                                          // 15
                                                                                                           // 16
_.extend(TAPi18n.translations["zh"][namespace], {"End_OTR":"结束“无记录对话”","Off_the_record_conversation":"“无记录对话”","Off_the_record_conversation_is_not_available_for_your_browser_or_device":"“无记录对话”不支持您的浏览器或设备。","OTR":"无记录对话","OTR_is_only_available_when_both_users_are_online":"仅当双方均在线时才可以开启“无记录对话”","Please_wait_while_OTR_is_being_established":"请稍候，正在建立OTR连接","Refresh_keys":"刷新key","Start_OTR":"开启“无记录对话”","User_has_disconnected":"用户已离线","Username_denied_the_OTR_session":"__username__ 拒绝了“无记录对话”","Username_ended_the_OTR_session":"__username__ 结束了“无记录对话”","Username_wants_to_start_otr_Do_you_want_to_accept":"__username__ 要与您开启“无记录对话”，是否接受？"});
TAPi18n._registerServerTranslator("zh", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:otr'] = {};

})();

//# sourceMappingURL=rocketchat_otr.js.map
