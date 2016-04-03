(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var check = Package.check.check;
var Match = Package.check.Match;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;

/* Package-scope variables */
var __coffeescriptShare;

(function(){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/rocketchat_slashcommands-kick/server.coffee.js              //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                        // 1
/*                                                                      // 1
 * Kick is a named function that will replace /kick commands            //
 */                                                                     //
var Kick,                                                               // 1
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
                                                                        //
Kick = (function() {                                                    // 1
  function Kick(command, params, item) {                                // 6
    var kickedUser, room, user, username;                               // 7
    if (command !== 'kick' || !Match.test(params, String)) {            // 7
      return;                                                           // 8
    }                                                                   //
    username = params.trim();                                           // 7
    if (username === '') {                                              // 11
      return;                                                           // 12
    }                                                                   //
    username = username.replace('@', '');                               // 7
    user = Meteor.users.findOne(Meteor.userId());                       // 7
    kickedUser = RocketChat.models.Users.findOneByUsername(username);   // 7
    room = RocketChat.models.Rooms.findOneById(item.rid);               // 7
    if (kickedUser == null) {                                           // 20
      RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {
        _id: Random.id(),                                               // 21
        rid: item.rid,                                                  // 21
        ts: new Date,                                                   // 21
        msg: TAPi18n.__('Username_doesnt_exist', {                      // 21
          postProcess: 'sprintf',                                       // 25
          sprintf: [username]                                           // 25
        }, user.language)                                               //
      });                                                               //
      return;                                                           // 27
    }                                                                   //
    if (indexOf.call(room.usernames || [], username) < 0) {             // 29
      RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {
        _id: Random.id(),                                               // 30
        rid: item.rid,                                                  // 30
        ts: new Date,                                                   // 30
        msg: TAPi18n.__('Username_is_not_in_this_room', {               // 30
          postProcess: 'sprintf',                                       // 34
          sprintf: [username]                                           // 34
        }, user.language)                                               //
      });                                                               //
      return;                                                           // 36
    }                                                                   //
    Meteor.call('removeUserFromRoom', {                                 // 7
      rid: item.rid,                                                    // 38
      username: username                                                // 38
    });                                                                 //
  }                                                                     //
                                                                        //
  return Kick;                                                          //
                                                                        //
})();                                                                   //
                                                                        //
RocketChat.slashCommands.add('kick', Kick);                             // 1
                                                                        //
//////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/rocketchat_slashcommands-kick/packages/rocketchat_slashcomm //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
var _ = Package.underscore._,                                           // 1
    package_name = "project",                                           // 2
    namespace = "project";                                              // 3
                                                                        // 4
if (package_name != "project") {                                        // 5
    namespace = TAPi18n.packages[package_name].namespace;               // 6
}                                                                       // 7
TAPi18n.languages_names["ar"] = ["Arabic","العربية"];                   // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                  // 10
if(_.isUndefined(TAPi18n.translations["ar"])) {                         // 11
  TAPi18n.translations["ar"] = {};                                      // 12
}                                                                       // 13
                                                                        // 14
if(_.isUndefined(TAPi18n.translations["ar"][namespace])) {              // 15
  TAPi18n.translations["ar"][namespace] = {};                           // 16
}                                                                       // 17
                                                                        // 18
_.extend(TAPi18n.translations["ar"][namespace], {"Username_is_not_in_this_room":"المستخدم `#%s` غير موجود في الغرفة","Remove_someone_from_room":"إزالة شخص من الغرفة"});
TAPi18n._registerServerTranslator("ar", namespace);                     // 20
                                                                        // 21
//////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/rocketchat_slashcommands-kick/packages/rocketchat_slashcomm //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
var _ = Package.underscore._,                                           // 1
    package_name = "project",                                           // 2
    namespace = "project";                                              // 3
                                                                        // 4
if (package_name != "project") {                                        // 5
    namespace = TAPi18n.packages[package_name].namespace;               // 6
}                                                                       // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                    // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                         // 9
  TAPi18n.translations["fi"] = {};                                      // 10
}                                                                       // 11
                                                                        // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {              // 13
  TAPi18n.translations["fi"][namespace] = {};                           // 14
}                                                                       // 15
                                                                        // 16
_.extend(TAPi18n.translations["fi"][namespace], {"Username_doesnt_exist":"Käyttäjätunnusta  `#% s` ei ole olemassa.","Username_is_not_in_this_room":"Käyttäjä `#% s` ei ole tässä huoneessa.","Remove_someone_from_room":"Poista joku huoneesta"});
TAPi18n._registerServerTranslator("fi", namespace);                     // 18
                                                                        // 19
//////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/rocketchat_slashcommands-kick/packages/rocketchat_slashcomm //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
var _ = Package.underscore._,                                           // 1
    package_name = "project",                                           // 2
    namespace = "project";                                              // 3
                                                                        // 4
if (package_name != "project") {                                        // 5
    namespace = TAPi18n.packages[package_name].namespace;               // 6
}                                                                       // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];         // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                         // 9
  TAPi18n.translations["fr"] = {};                                      // 10
}                                                                       // 11
                                                                        // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {              // 13
  TAPi18n.translations["fr"][namespace] = {};                           // 14
}                                                                       // 15
                                                                        // 16
_.extend(TAPi18n.translations["fr"][namespace], {"Username_doesnt_exist":"L'utilisateur `#%s` n'existe pas.","Username_is_not_in_this_room":"L'utilisateur `#%s` est pas dans ce salon.","Remove_someone_from_room":"Retirer quelqu'un du salon."});
TAPi18n._registerServerTranslator("fr", namespace);                     // 18
                                                                        // 19
//////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/rocketchat_slashcommands-kick/packages/rocketchat_slashcomm //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
var _ = Package.underscore._,                                           // 1
    package_name = "project",                                           // 2
    namespace = "project";                                              // 3
                                                                        // 4
if (package_name != "project") {                                        // 5
    namespace = TAPi18n.packages[package_name].namespace;               // 6
}                                                                       // 7
TAPi18n.languages_names["hr"] = ["Croatian","Hrvatski"];                // 8
if(_.isUndefined(TAPi18n.translations["hr"])) {                         // 9
  TAPi18n.translations["hr"] = {};                                      // 10
}                                                                       // 11
                                                                        // 12
if(_.isUndefined(TAPi18n.translations["hr"][namespace])) {              // 13
  TAPi18n.translations["hr"][namespace] = {};                           // 14
}                                                                       // 15
                                                                        // 16
_.extend(TAPi18n.translations["hr"][namespace], {"Username_doesnt_exist":"Korisničko ime '#% s` ne postoji.","Username_is_not_in_this_room":"Korisnik `#% s` nije u ovoj sobi.","Remove_someone_from_room":"Uklonite nekoga iz sobe"});
TAPi18n._registerServerTranslator("hr", namespace);                     // 18
                                                                        // 19
//////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/rocketchat_slashcommands-kick/packages/rocketchat_slashcomm //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
var _ = Package.underscore._,                                           // 1
    package_name = "project",                                           // 2
    namespace = "project";                                              // 3
                                                                        // 4
if (package_name != "project") {                                        // 5
    namespace = TAPi18n.packages[package_name].namespace;               // 6
}                                                                       // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                 // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                         // 9
  TAPi18n.translations["nl"] = {};                                      // 10
}                                                                       // 11
                                                                        // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {              // 13
  TAPi18n.translations["nl"][namespace] = {};                           // 14
}                                                                       // 15
                                                                        // 16
_.extend(TAPi18n.translations["nl"][namespace], {"Username_doesnt_exist":"De gebruikersnaam `#%s` bestaat niet.","Username_is_not_in_this_room":"De gebruiker `#%s` is niet in deze kamer.","Remove_someone_from_room":"Verwijder iemand uit de kamer"});
TAPi18n._registerServerTranslator("nl", namespace);                     // 18
                                                                        // 19
//////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/rocketchat_slashcommands-kick/packages/rocketchat_slashcomm //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
var _ = Package.underscore._,                                           // 1
    package_name = "project",                                           // 2
    namespace = "project";                                              // 3
                                                                        // 4
if (package_name != "project") {                                        // 5
    namespace = TAPi18n.packages[package_name].namespace;               // 6
}                                                                       // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                  // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                         // 9
  TAPi18n.translations["ro"] = {};                                      // 10
}                                                                       // 11
                                                                        // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {              // 13
  TAPi18n.translations["ro"][namespace] = {};                           // 14
}                                                                       // 15
                                                                        // 16
_.extend(TAPi18n.translations["ro"][namespace], {"Username_doesnt_exist":"Numele de utilizator `#% s` nu există.","Username_is_not_in_this_room":"Utilizatorul `#% s` nu este în această cameră.","Remove_someone_from_room":"Scoateți pe cineva din camera"});
TAPi18n._registerServerTranslator("ro", namespace);                     // 18
                                                                        // 19
//////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/rocketchat_slashcommands-kick/packages/rocketchat_slashcomm //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
var _ = Package.underscore._,                                           // 1
    package_name = "project",                                           // 2
    namespace = "project";                                              // 3
                                                                        // 4
if (package_name != "project") {                                        // 5
    namespace = TAPi18n.packages[package_name].namespace;               // 6
}                                                                       // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                  // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                         // 9
  TAPi18n.translations["ru"] = {};                                      // 10
}                                                                       // 11
                                                                        // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {              // 13
  TAPi18n.translations["ru"][namespace] = {};                           // 14
}                                                                       // 15
                                                                        // 16
_.extend(TAPi18n.translations["ru"][namespace], {"Username_is_not_in_this_room":"Пользователь `#%s` не в этом чате.","Remove_someone_from_room":"Удалить кого-то из чата"});
TAPi18n._registerServerTranslator("ru", namespace);                     // 18
                                                                        // 19
//////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:slashcommands-kick'] = {};

})();

//# sourceMappingURL=rocketchat_slashcommands-kick.js.map
