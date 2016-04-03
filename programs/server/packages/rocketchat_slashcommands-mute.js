(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var check = Package.check.check;
var Match = Package.check.Match;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;

/* Package-scope variables */
var __coffeescriptShare, translations;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/rocketchat_slashcommands-mute/server/mute.coffee.js                                   //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                                  // 1
/*                                                                                                // 1
 * Mute is a named function that will replace /mute commands                                      //
 */                                                                                               //
var Mute,                                                                                         // 1
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
                                                                                                  //
Mute = (function() {                                                                              // 1
  function Mute(command, params, item) {                                                          // 6
    var mutedUser, room, user, username;                                                          // 7
    if (command !== 'mute' || !Match.test(params, String)) {                                      // 7
      return;                                                                                     // 8
    }                                                                                             //
    username = params.trim();                                                                     // 7
    if (username === '') {                                                                        // 11
      return;                                                                                     // 12
    }                                                                                             //
    username = username.replace('@', '');                                                         // 7
    user = Meteor.users.findOne(Meteor.userId());                                                 // 7
    mutedUser = RocketChat.models.Users.findOneByUsername(username);                              // 7
    room = RocketChat.models.Rooms.findOneById(item.rid);                                         // 7
    if (mutedUser == null) {                                                                      // 20
      RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {                           // 21
        _id: Random.id(),                                                                         // 21
        rid: item.rid,                                                                            // 21
        ts: new Date,                                                                             // 21
        msg: TAPi18n.__('Username_doesnt_exist', {                                                // 21
          postProcess: 'sprintf',                                                                 // 25
          sprintf: [username]                                                                     // 25
        }, user.language)                                                                         //
      });                                                                                         //
      return;                                                                                     // 27
    }                                                                                             //
    if (indexOf.call(room.usernames || [], username) < 0) {                                       // 29
      RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {                           // 30
        _id: Random.id(),                                                                         // 30
        rid: item.rid,                                                                            // 30
        ts: new Date,                                                                             // 30
        msg: TAPi18n.__('Username_is_not_in_this_room', {                                         // 30
          postProcess: 'sprintf',                                                                 // 34
          sprintf: [username]                                                                     // 34
        }, user.language)                                                                         //
      });                                                                                         //
      return;                                                                                     // 36
    }                                                                                             //
    Meteor.call('muteUserInRoom', {                                                               // 7
      rid: item.rid,                                                                              // 38
      username: username                                                                          // 38
    });                                                                                           //
  }                                                                                               //
                                                                                                  //
  return Mute;                                                                                    //
                                                                                                  //
})();                                                                                             //
                                                                                                  //
RocketChat.slashCommands.add('mute', Mute);                                                       // 1
                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/rocketchat_slashcommands-mute/server/unmute.coffee.js                                 //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                                  // 1
/*                                                                                                // 1
 * Unmute is a named function that will replace /unmute commands                                  //
 */                                                                                               //
var Unmute,                                                                                       // 1
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
                                                                                                  //
Unmute = (function() {                                                                            // 1
  function Unmute(command, params, item) {                                                        // 6
    var room, unmutedUser, user, username;                                                        // 7
    if (command !== 'unmute' || !Match.test(params, String)) {                                    // 7
      return;                                                                                     // 8
    }                                                                                             //
    username = params.trim();                                                                     // 7
    if (username === '') {                                                                        // 11
      return;                                                                                     // 12
    }                                                                                             //
    username = username.replace('@', '');                                                         // 7
    user = Meteor.users.findOne(Meteor.userId());                                                 // 7
    unmutedUser = RocketChat.models.Users.findOneByUsername(username);                            // 7
    room = RocketChat.models.Rooms.findOneById(item.rid);                                         // 7
    if (unmutedUser == null) {                                                                    // 20
      RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {                           // 21
        _id: Random.id(),                                                                         // 21
        rid: item.rid,                                                                            // 21
        ts: new Date,                                                                             // 21
        msg: TAPi18n.__('Username_doesnt_exist', {                                                // 21
          postProcess: 'sprintf',                                                                 // 25
          sprintf: [username]                                                                     // 25
        }, user.language)                                                                         //
      });                                                                                         //
      return;                                                                                     // 27
    }                                                                                             //
    if (indexOf.call(room.usernames || [], username) < 0) {                                       // 29
      RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {                           // 30
        _id: Random.id(),                                                                         // 30
        rid: item.rid,                                                                            // 30
        ts: new Date,                                                                             // 30
        msg: TAPi18n.__('Username_is_not_in_this_room', {                                         // 30
          postProcess: 'sprintf',                                                                 // 34
          sprintf: [username]                                                                     // 34
        }, user.language)                                                                         //
      });                                                                                         //
      return;                                                                                     // 36
    }                                                                                             //
    Meteor.call('unmuteUserInRoom', {                                                             // 7
      rid: item.rid,                                                                              // 38
      username: username                                                                          // 38
    });                                                                                           //
  }                                                                                               //
                                                                                                  //
  return Unmute;                                                                                  //
                                                                                                  //
})();                                                                                             //
                                                                                                  //
RocketChat.slashCommands.add('unmute', Unmute);                                                   // 1
                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/rocketchat_slashcommands-mute/packages/rocketchat_slashcommands-mutei18n/ar.i18n.json //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _ = Package.underscore._,                                                                     // 1
    package_name = "project",                                                                     // 2
    namespace = "project";                                                                        // 3
                                                                                                  // 4
if (package_name != "project") {                                                                  // 5
    namespace = TAPi18n.packages[package_name].namespace;                                         // 6
}                                                                                                 // 7
TAPi18n.languages_names["ar"] = ["Arabic","العربية"];                                             // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                            // 10
if(_.isUndefined(TAPi18n.translations["ar"])) {                                                   // 11
  TAPi18n.translations["ar"] = {};                                                                // 12
}                                                                                                 // 13
                                                                                                  // 14
if(_.isUndefined(TAPi18n.translations["ar"][namespace])) {                                        // 15
  TAPi18n.translations["ar"][namespace] = {};                                                     // 16
}                                                                                                 // 17
                                                                                                  // 18
_.extend(TAPi18n.translations["ar"][namespace], {"Mute_someone_in_room":"إسكات شخص في الغرفة","Unmute_someone_in_room":"إلغاء إسكات شخص في هذه الغرفة"});
TAPi18n._registerServerTranslator("ar", namespace);                                               // 20
                                                                                                  // 21
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/rocketchat_slashcommands-mute/packages/rocketchat_slashcommands-mutei18n/de.i18n.json //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _ = Package.underscore._,                                                                     // 1
    package_name = "project",                                                                     // 2
    namespace = "project";                                                                        // 3
                                                                                                  // 4
if (package_name != "project") {                                                                  // 5
    namespace = TAPi18n.packages[package_name].namespace;                                         // 6
}                                                                                                 // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                             // 8
if(_.isUndefined(TAPi18n.translations["de"])) {                                                   // 9
  TAPi18n.translations["de"] = {};                                                                // 10
}                                                                                                 // 11
                                                                                                  // 12
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                        // 13
  TAPi18n.translations["de"][namespace] = {};                                                     // 14
}                                                                                                 // 15
                                                                                                  // 16
_.extend(TAPi18n.translations["de"][namespace], {"Mute_someone_in_room":"Jemanden das Chatten in einem Raum verbieten","Unmute_someone_in_room":"Jemanden das Chatten in einem Raum wieder erlauben"});
TAPi18n._registerServerTranslator("de", namespace);                                               // 18
                                                                                                  // 19
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/rocketchat_slashcommands-mute/packages/rocketchat_slashcommands-mutei18n/en.i18n.json //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _ = Package.underscore._,                                                                     // 1
    package_name = "project",                                                                     // 2
    namespace = "project";                                                                        // 3
                                                                                                  // 4
if (package_name != "project") {                                                                  // 5
    namespace = TAPi18n.packages[package_name].namespace;                                         // 6
}                                                                                                 // 7
// integrate the fallback language translations                                                   // 8
translations = {};                                                                                // 9
translations[namespace] = {"Mute_someone_in_room":"Mute someone in the room","Unmute_someone_in_room":"Unmute someone in the room"};
TAPi18n._loadLangFileObject("en", translations);                                                  // 11
TAPi18n._registerServerTranslator("en", namespace);                                               // 12
                                                                                                  // 13
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/rocketchat_slashcommands-mute/packages/rocketchat_slashcommands-mutei18n/es.i18n.json //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _ = Package.underscore._,                                                                     // 1
    package_name = "project",                                                                     // 2
    namespace = "project";                                                                        // 3
                                                                                                  // 4
if (package_name != "project") {                                                                  // 5
    namespace = TAPi18n.packages[package_name].namespace;                                         // 6
}                                                                                                 // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                                    // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                                   // 9
  TAPi18n.translations["es"] = {};                                                                // 10
}                                                                                                 // 11
                                                                                                  // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                                        // 13
  TAPi18n.translations["es"][namespace] = {};                                                     // 14
}                                                                                                 // 15
                                                                                                  // 16
_.extend(TAPi18n.translations["es"][namespace], {"Mute_someone_in_room":"Silenciar a alguien en la sala","Unmute_someone_in_room":"De-silenciar a alguien en la sala"});
TAPi18n._registerServerTranslator("es", namespace);                                               // 18
                                                                                                  // 19
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/rocketchat_slashcommands-mute/packages/rocketchat_slashcommands-mutei18n/fi.i18n.json //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _ = Package.underscore._,                                                                     // 1
    package_name = "project",                                                                     // 2
    namespace = "project";                                                                        // 3
                                                                                                  // 4
if (package_name != "project") {                                                                  // 5
    namespace = TAPi18n.packages[package_name].namespace;                                         // 6
}                                                                                                 // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                              // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                                   // 9
  TAPi18n.translations["fi"] = {};                                                                // 10
}                                                                                                 // 11
                                                                                                  // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                                        // 13
  TAPi18n.translations["fi"][namespace] = {};                                                     // 14
}                                                                                                 // 15
                                                                                                  // 16
_.extend(TAPi18n.translations["fi"][namespace], {"Mute_someone_in_room":"Mykistä joku huoneessa","Unmute_someone_in_room":"Poista jonkun mykistys huoneessa"});
TAPi18n._registerServerTranslator("fi", namespace);                                               // 18
                                                                                                  // 19
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/rocketchat_slashcommands-mute/packages/rocketchat_slashcommands-mutei18n/fr.i18n.json //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _ = Package.underscore._,                                                                     // 1
    package_name = "project",                                                                     // 2
    namespace = "project";                                                                        // 3
                                                                                                  // 4
if (package_name != "project") {                                                                  // 5
    namespace = TAPi18n.packages[package_name].namespace;                                         // 6
}                                                                                                 // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                   // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                   // 9
  TAPi18n.translations["fr"] = {};                                                                // 10
}                                                                                                 // 11
                                                                                                  // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                        // 13
  TAPi18n.translations["fr"][namespace] = {};                                                     // 14
}                                                                                                 // 15
                                                                                                  // 16
_.extend(TAPi18n.translations["fr"][namespace], {"Mute_someone_in_room":"Rendre quelqu'un muet dans ce salon","Unmute_someone_in_room":"Rendre la parole à quelqu'un dans ce salon"});
TAPi18n._registerServerTranslator("fr", namespace);                                               // 18
                                                                                                  // 19
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/rocketchat_slashcommands-mute/packages/rocketchat_slashcommands-mutei18n/ja.i18n.json //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _ = Package.underscore._,                                                                     // 1
    package_name = "project",                                                                     // 2
    namespace = "project";                                                                        // 3
                                                                                                  // 4
if (package_name != "project") {                                                                  // 5
    namespace = TAPi18n.packages[package_name].namespace;                                         // 6
}                                                                                                 // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                               // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                   // 9
  TAPi18n.translations["ja"] = {};                                                                // 10
}                                                                                                 // 11
                                                                                                  // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                        // 13
  TAPi18n.translations["ja"][namespace] = {};                                                     // 14
}                                                                                                 // 15
                                                                                                  // 16
_.extend(TAPi18n.translations["ja"][namespace], {"Mute_someone_in_room":"誰かをルームでミュートにする","Unmute_someone_in_room":"誰かをルームでミュートを解除されました"});
TAPi18n._registerServerTranslator("ja", namespace);                                               // 18
                                                                                                  // 19
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/rocketchat_slashcommands-mute/packages/rocketchat_slashcommands-mutei18n/nl.i18n.json //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _ = Package.underscore._,                                                                     // 1
    package_name = "project",                                                                     // 2
    namespace = "project";                                                                        // 3
                                                                                                  // 4
if (package_name != "project") {                                                                  // 5
    namespace = TAPi18n.packages[package_name].namespace;                                         // 6
}                                                                                                 // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                           // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                                   // 9
  TAPi18n.translations["nl"] = {};                                                                // 10
}                                                                                                 // 11
                                                                                                  // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                                        // 13
  TAPi18n.translations["nl"][namespace] = {};                                                     // 14
}                                                                                                 // 15
                                                                                                  // 16
_.extend(TAPi18n.translations["nl"][namespace], {"Mute_someone_in_room":"Maak iemand in de kamer stil","Unmute_someone_in_room":"Laat iemand weer in de kamer praten"});
TAPi18n._registerServerTranslator("nl", namespace);                                               // 18
                                                                                                  // 19
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/rocketchat_slashcommands-mute/packages/rocketchat_slashcommands-mutei18n/ro.i18n.json //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _ = Package.underscore._,                                                                     // 1
    package_name = "project",                                                                     // 2
    namespace = "project";                                                                        // 3
                                                                                                  // 4
if (package_name != "project") {                                                                  // 5
    namespace = TAPi18n.packages[package_name].namespace;                                         // 6
}                                                                                                 // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                            // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                   // 9
  TAPi18n.translations["ro"] = {};                                                                // 10
}                                                                                                 // 11
                                                                                                  // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                        // 13
  TAPi18n.translations["ro"][namespace] = {};                                                     // 14
}                                                                                                 // 15
                                                                                                  // 16
_.extend(TAPi18n.translations["ro"][namespace], {"Mute_someone_in_room":"Blocați noi mesaje ale cuiva în cameră","Unmute_someone_in_room":"Deblocați mesajele noi ale unui utilizator în cameră"});
TAPi18n._registerServerTranslator("ro", namespace);                                               // 18
                                                                                                  // 19
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/rocketchat_slashcommands-mute/packages/rocketchat_slashcommands-mutei18n/ru.i18n.json //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _ = Package.underscore._,                                                                     // 1
    package_name = "project",                                                                     // 2
    namespace = "project";                                                                        // 3
                                                                                                  // 4
if (package_name != "project") {                                                                  // 5
    namespace = TAPi18n.packages[package_name].namespace;                                         // 6
}                                                                                                 // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                            // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                   // 9
  TAPi18n.translations["ru"] = {};                                                                // 10
}                                                                                                 // 11
                                                                                                  // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                        // 13
  TAPi18n.translations["ru"][namespace] = {};                                                     // 14
}                                                                                                 // 15
                                                                                                  // 16
_.extend(TAPi18n.translations["ru"][namespace], {"Mute_someone_in_room":"Заблокировать кого-нибудь в чате","Unmute_someone_in_room":"Разблокировать кого-нибудь в чате"});
TAPi18n._registerServerTranslator("ru", namespace);                                               // 18
                                                                                                  // 19
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/rocketchat_slashcommands-mute/packages/rocketchat_slashcommands-mutei18n/sv.i18n.json //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _ = Package.underscore._,                                                                     // 1
    package_name = "project",                                                                     // 2
    namespace = "project";                                                                        // 3
                                                                                                  // 4
if (package_name != "project") {                                                                  // 5
    namespace = TAPi18n.packages[package_name].namespace;                                         // 6
}                                                                                                 // 7
TAPi18n.languages_names["sv"] = ["Swedish","Svenska"];                                            // 8
if(_.isUndefined(TAPi18n.translations["sv"])) {                                                   // 9
  TAPi18n.translations["sv"] = {};                                                                // 10
}                                                                                                 // 11
                                                                                                  // 12
if(_.isUndefined(TAPi18n.translations["sv"][namespace])) {                                        // 13
  TAPi18n.translations["sv"][namespace] = {};                                                     // 14
}                                                                                                 // 15
                                                                                                  // 16
_.extend(TAPi18n.translations["sv"][namespace], {"Mute_someone_in_room":"Tysta någon i rummet"});
TAPi18n._registerServerTranslator("sv", namespace);                                               // 18
                                                                                                  // 19
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/rocketchat_slashcommands-mute/packages/rocketchat_slashcommands-mutei18n/zh.i18n.json //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _ = Package.underscore._,                                                                     // 1
    package_name = "project",                                                                     // 2
    namespace = "project";                                                                        // 3
                                                                                                  // 4
if (package_name != "project") {                                                                  // 5
    namespace = TAPi18n.packages[package_name].namespace;                                         // 6
}                                                                                                 // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                                 // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                   // 9
  TAPi18n.translations["zh"] = {};                                                                // 10
}                                                                                                 // 11
                                                                                                  // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                        // 13
  TAPi18n.translations["zh"][namespace] = {};                                                     // 14
}                                                                                                 // 15
                                                                                                  // 16
_.extend(TAPi18n.translations["zh"][namespace], {"Mute_someone_in_room":"禁止房间中的某人发言","Unmute_someone_in_room":"取消对房间内某人的忽略"});
TAPi18n._registerServerTranslator("zh", namespace);                                               // 18
                                                                                                  // 19
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:slashcommands-mute'] = {};

})();

//# sourceMappingURL=rocketchat_slashcommands-mute.js.map
