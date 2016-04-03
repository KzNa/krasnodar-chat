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

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/server.coffee.js                                          //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                                      // 1
/*                                                                                                    // 1
 * Invite is a named function that will replace /invite commands                                      //
 * @param {Object} message - The message object                                                       //
 */                                                                                                   //
var Invite;                                                                                           // 1
                                                                                                      //
Invite = (function() {                                                                                // 1
  function Invite(command, params, item) {                                                            // 7
    var currentUser, e, user, username;                                                               // 8
    if (command !== 'invite' || !Match.test(params, String)) {                                        // 8
      return;                                                                                         // 9
    }                                                                                                 //
    username = params.trim();                                                                         // 8
    if (username === '') {                                                                            // 12
      return;                                                                                         // 13
    }                                                                                                 //
    username = username.replace('@', '');                                                             // 8
    user = Meteor.users.findOne({                                                                     // 8
      username: username                                                                              // 17
    });                                                                                               //
    currentUser = Meteor.users.findOne(Meteor.userId());                                              // 8
    if (user == null) {                                                                               // 20
      console.log('notify user_doesnt_exist');                                                        // 21
      RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {                               // 21
        _id: Random.id(),                                                                             // 22
        rid: item.rid,                                                                                // 22
        ts: new Date,                                                                                 // 22
        msg: TAPi18n.__('User_doesnt_exist', {                                                        // 22
          postProcess: 'sprintf',                                                                     // 26
          sprintf: [username]                                                                         // 26
        }, currentUser.language)                                                                      //
      });                                                                                             //
      return;                                                                                         // 28
    }                                                                                                 //
    if (RocketChat.models.Rooms.findOneByIdContainigUsername(item.rid, user.username) != null) {      // 31
      RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {                               // 32
        _id: Random.id(),                                                                             // 32
        rid: item.rid,                                                                                // 32
        ts: new Date,                                                                                 // 32
        msg: TAPi18n.__('Username_is_already_in_here', {                                              // 32
          postProcess: 'sprintf',                                                                     // 36
          sprintf: [username]                                                                         // 36
        }, currentUser.language)                                                                      //
      });                                                                                             //
      return;                                                                                         // 38
    }                                                                                                 //
    try {                                                                                             // 40
      Meteor.call('addUserToRoom', {                                                                  // 41
        rid: item.rid,                                                                                // 42
        username: user.username                                                                       // 42
      });                                                                                             //
    } catch (_error) {                                                                                //
      e = _error;                                                                                     // 45
      if (e.error === 'cant-invite-for-direct-room') {                                                // 45
        RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {                             // 46
          _id: Random.id(),                                                                           // 46
          rid: item.rid,                                                                              // 46
          ts: new Date,                                                                               // 46
          msg: TAPi18n.__('Cannot_invite_users_to_direct_rooms', null, currentUser.language)          // 46
        });                                                                                           //
      } else {                                                                                        //
        RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {                             // 53
          _id: Random.id(),                                                                           // 53
          rid: item.rid,                                                                              // 53
          ts: new Date,                                                                               // 53
          msg: e.error                                                                                // 53
        });                                                                                           //
      }                                                                                               //
      return;                                                                                         // 59
    }                                                                                                 //
  }                                                                                                   //
                                                                                                      //
  return Invite;                                                                                      //
                                                                                                      //
})();                                                                                                 //
                                                                                                      //
RocketChat.slashCommands.add('invite', Invite);                                                       // 1
                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/ar.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["ar"] = ["Arabic","العربية"];                                                 // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                                // 10
if(_.isUndefined(TAPi18n.translations["ar"])) {                                                       // 11
  TAPi18n.translations["ar"] = {};                                                                    // 12
}                                                                                                     // 13
                                                                                                      // 14
if(_.isUndefined(TAPi18n.translations["ar"][namespace])) {                                            // 15
  TAPi18n.translations["ar"][namespace] = {};                                                         // 16
}                                                                                                     // 17
                                                                                                      // 18
_.extend(TAPi18n.translations["ar"][namespace], {"User_doesnt_exist":"لا يوجد مستخدم بالاسم `@%s`"});
TAPi18n._registerServerTranslator("ar", namespace);                                                   // 20
                                                                                                      // 21
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/de.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                                 // 8
if(_.isUndefined(TAPi18n.translations["de"])) {                                                       // 9
  TAPi18n.translations["de"] = {};                                                                    // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                            // 13
  TAPi18n.translations["de"][namespace] = {};                                                         // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["de"][namespace], {"Invite_user_to_join_channel":"Benutzer in diesen Kanal einladen","User_doesnt_exist":"Kein Benutzer mit dem Namen `@% s` vorhanden.","Username_is_already_in_here":"`@%s` wurde bereits hinzugefügt."});
TAPi18n._registerServerTranslator("de", namespace);                                                   // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/en.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
// integrate the fallback language translations                                                       // 8
translations = {};                                                                                    // 9
translations[namespace] = {"Invite_user_to_join_channel":"Invite one user to join this channel","User_doesnt_exist":"No user exists by the name of `@%s`.","Username_is_already_in_here":"`@%s` is already in here."};
TAPi18n._loadLangFileObject("en", translations);                                                      // 11
TAPi18n._registerServerTranslator("en", namespace);                                                   // 12
                                                                                                      // 13
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/es.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                                        // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                                       // 9
  TAPi18n.translations["es"] = {};                                                                    // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                                            // 13
  TAPi18n.translations["es"][namespace] = {};                                                         // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["es"][namespace], {"Invite_user_to_join_channel":"Invitar a un usuario a unirse a este canal","User_doesnt_exist":"Ningun usuario con el nombre `@%s` existe.","Username_is_already_in_here":"`@%s` ya esta aqui."});
TAPi18n._registerServerTranslator("es", namespace);                                                   // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/fi.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                                  // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                                       // 9
  TAPi18n.translations["fi"] = {};                                                                    // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                                            // 13
  TAPi18n.translations["fi"][namespace] = {};                                                         // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["fi"][namespace], {"Invite_user_to_join_channel":"Kutsu käyttäjä kanavalle","User_doesnt_exist":"Yhtään käyttäjää ei ole olemassa nimellä `@%s`.","Username_is_already_in_here":"`@%s` on jo täällä."});
TAPi18n._registerServerTranslator("fi", namespace);                                                   // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/fr.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                       // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                       // 9
  TAPi18n.translations["fr"] = {};                                                                    // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                            // 13
  TAPi18n.translations["fr"][namespace] = {};                                                         // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["fr"][namespace], {"Invite_user_to_join_channel":"Inviter un utilisateur à rejoindre le canal","User_doesnt_exist":"Aucun utilisateur nommé `@% s`.","Username_is_already_in_here":"`@% s` est déjà présent."});
TAPi18n._registerServerTranslator("fr", namespace);                                                   // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/hr.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["hr"] = ["Croatian","Hrvatski"];                                              // 8
if(_.isUndefined(TAPi18n.translations["hr"])) {                                                       // 9
  TAPi18n.translations["hr"] = {};                                                                    // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["hr"][namespace])) {                                            // 13
  TAPi18n.translations["hr"][namespace] = {};                                                         // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["hr"][namespace], {"Invite_user_to_join_channel":"Pozovi jednog korisnika da se pridruži ovom kanalu","User_doesnt_exist":"Ne postoji korisnik pod imenom `@% s`.","Username_is_already_in_here":"`@% s` je već ovdje."});
TAPi18n._registerServerTranslator("hr", namespace);                                                   // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/ja.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                                   // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                       // 9
  TAPi18n.translations["ja"] = {};                                                                    // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                            // 13
  TAPi18n.translations["ja"][namespace] = {};                                                         // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["ja"][namespace], {"Invite_user_to_join_channel":"ユーザーをこのチャンネルへ招待します","User_doesnt_exist":"`@%s` という名前のユーザーは、登録されていません。","Username_is_already_in_here":"`@%s` は、すでにここにいます。"});
TAPi18n._registerServerTranslator("ja", namespace);                                                   // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/km.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["km"] = ["Khmer","ភាសាខ្មែរ"];                                                // 8
if(_.isUndefined(TAPi18n.translations["km"])) {                                                       // 9
  TAPi18n.translations["km"] = {};                                                                    // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["km"][namespace])) {                                            // 13
  TAPi18n.translations["km"][namespace] = {};                                                         // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["km"][namespace], {"Invite_user_to_join_channel":"អញ្ចើញអ្នកប្រើប្រាស់ម្នាក់ដើម្បីចូលរួមប៉ុស្តិ៍នេះ","User_doesnt_exist":"គ្មានអ្នកប្រើដែលមានឈ្មោះរបស់ `@% s` ឡើយ។","Username_is_already_in_here":"`@% s` គឺមាននៅទីនេះរួចទៅហើយ។"});
TAPi18n._registerServerTranslator("km", namespace);                                                   // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/ko.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["ko"] = ["Korean","한국어"];                                                     // 8
if(_.isUndefined(TAPi18n.translations["ko"])) {                                                       // 9
  TAPi18n.translations["ko"] = {};                                                                    // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["ko"][namespace])) {                                            // 13
  TAPi18n.translations["ko"][namespace] = {};                                                         // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["ko"][namespace], {"Invite_user_to_join_channel":"이 채널로 초대한 사용자 참여","User_doesnt_exist":"`@%s` 사용자가 존재하지 않습니다.","Username_is_already_in_here":"`@%s` 사용자가 이미 있습니다."});
TAPi18n._registerServerTranslator("ko", namespace);                                                   // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/ms-MY.i18n.j //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["ms-MY"] = ["ms-MY","ms-MY"];                                                 // 8
if(_.isUndefined(TAPi18n.translations["ms-MY"])) {                                                    // 9
  TAPi18n.translations["ms-MY"] = {};                                                                 // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["ms-MY"][namespace])) {                                         // 13
  TAPi18n.translations["ms-MY"][namespace] = {};                                                      // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["ms-MY"][namespace], {"Invite_user_to_join_channel":"Jemput satu pengguna untuk menyertai saluran ini","User_doesnt_exist":"Tiada pengguna wujud dengan nama `@%s`.","Username_is_already_in_here":"`@%s` sudah berada di sini."});
TAPi18n._registerServerTranslator("ms-MY", namespace);                                                // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/nl.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                               // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                                       // 9
  TAPi18n.translations["nl"] = {};                                                                    // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                                            // 13
  TAPi18n.translations["nl"][namespace] = {};                                                         // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["nl"][namespace], {"Invite_user_to_join_channel":"Nodig een gebruiker uit voor om dit kanaal","User_doesnt_exist":"Geen gebruiker bestaat met de naam `@%s`.","Username_is_already_in_here":"`@%s` is al hier."});
TAPi18n._registerServerTranslator("nl", namespace);                                                   // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/pl.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                                  // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                                       // 9
  TAPi18n.translations["pl"] = {};                                                                    // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                                            // 13
  TAPi18n.translations["pl"][namespace] = {};                                                         // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["pl"][namespace], {"Invite_user_to_join_channel":"Zaproś użytkownika by dołączył do kanału","User_doesnt_exist":"Nie istnieje użytkownik o nazwie `@%s`.","Username_is_already_in_here":"`@%s` już tutaj jest."});
TAPi18n._registerServerTranslator("pl", namespace);                                                   // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/pt.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["pt"] = ["Portuguese (Portugal)","Português"];                                // 8
if(_.isUndefined(TAPi18n.translations["pt"])) {                                                       // 9
  TAPi18n.translations["pt"] = {};                                                                    // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["pt"][namespace])) {                                            // 13
  TAPi18n.translations["pt"][namespace] = {};                                                         // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["pt"][namespace], {"Invite_user_to_join_channel":"Convidar um usuário para este canal","User_doesnt_exist":"O usuário `@%s` não existe.","Username_is_already_in_here":"`@%s` já está aqui."});
TAPi18n._registerServerTranslator("pt", namespace);                                                   // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/ro.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                                // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                       // 9
  TAPi18n.translations["ro"] = {};                                                                    // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                            // 13
  TAPi18n.translations["ro"][namespace] = {};                                                         // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["ro"][namespace], {"Invite_user_to_join_channel":"Invitați un utilizator să se alăture acestui canal","User_doesnt_exist":"Nu există nici un utilizator cu numele de `@%s`.","Username_is_already_in_here":"`@% s` este deja aici."});
TAPi18n._registerServerTranslator("ro", namespace);                                                   // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/ru.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                                // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                       // 9
  TAPi18n.translations["ru"] = {};                                                                    // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                            // 13
  TAPi18n.translations["ru"][namespace] = {};                                                         // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["ru"][namespace], {"Invite_user_to_join_channel":"Пригласить пользователя присоединиться к этому публичному чату","User_doesnt_exist":"Пользователя с логином `@%s` не существует.","Username_is_already_in_here":"`@%s` уже здесь."});
TAPi18n._registerServerTranslator("ru", namespace);                                                   // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/sv.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["sv"] = ["Swedish","Svenska"];                                                // 8
if(_.isUndefined(TAPi18n.translations["sv"])) {                                                       // 9
  TAPi18n.translations["sv"] = {};                                                                    // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["sv"][namespace])) {                                            // 13
  TAPi18n.translations["sv"][namespace] = {};                                                         // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["sv"][namespace], {"Invite_user_to_join_channel":"Bjud in en användare till att ansluta till denna kanal.","User_doesnt_exist":"Det existerar ingen användare med namnet `@%s`.","Username_is_already_in_here":"`@%s` är redan här inne."});
TAPi18n._registerServerTranslator("sv", namespace);                                                   // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/zh-TW.i18n.j //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["zh-TW"] = ["Chinese (Taiwan)","繁体中文（台湾）"];                                   // 8
if(_.isUndefined(TAPi18n.translations["zh-TW"])) {                                                    // 9
  TAPi18n.translations["zh-TW"] = {};                                                                 // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["zh-TW"][namespace])) {                                         // 13
  TAPi18n.translations["zh-TW"][namespace] = {};                                                      // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["zh-TW"][namespace], {"Invite_user_to_join_channel":"邀請用戶加入此頻道"});      // 17
TAPi18n._registerServerTranslator("zh-TW", namespace);                                                // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/rocketchat_slashcommands-invite/packages/rocketchat_slashcommands-invitei18n/zh.i18n.json //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _ = Package.underscore._,                                                                         // 1
    package_name = "project",                                                                         // 2
    namespace = "project";                                                                            // 3
                                                                                                      // 4
if (package_name != "project") {                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                             // 6
}                                                                                                     // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                                     // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                       // 9
  TAPi18n.translations["zh"] = {};                                                                    // 10
}                                                                                                     // 11
                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                            // 13
  TAPi18n.translations["zh"][namespace] = {};                                                         // 14
}                                                                                                     // 15
                                                                                                      // 16
_.extend(TAPi18n.translations["zh"][namespace], {"Invite_user_to_join_channel":"邀请一位用户加入频道","User_doesnt_exist":"不存在名为 `@%s` 的用户。","Username_is_already_in_here":"用户 `@%s` 已存在。"});
TAPi18n._registerServerTranslator("zh", namespace);                                                   // 18
                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:slashcommands-invite'] = {};

})();

//# sourceMappingURL=rocketchat_slashcommands-invite.js.map
