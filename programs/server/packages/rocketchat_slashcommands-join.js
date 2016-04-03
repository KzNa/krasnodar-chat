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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/server.coffee.js                                                //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                                          // 1
/*                                                                                                        // 1
 * Join is a named function that will replace /join commands                                              //
 * @param {Object} message - The message object                                                           //
 */                                                                                                       //
var Join;                                                                                                 // 1
                                                                                                          //
Join = (function() {                                                                                      // 1
  function Join(command, params, item) {                                                                  // 7
    var channel, room, user;                                                                              // 8
    if (command !== 'join' || !Match.test(params, String)) {                                              // 8
      return;                                                                                             // 9
    }                                                                                                     //
    channel = params.trim();                                                                              // 8
    if (channel === '') {                                                                                 // 12
      return;                                                                                             // 13
    }                                                                                                     //
    channel = channel.replace('#', '');                                                                   // 8
    user = Meteor.users.findOne(Meteor.userId());                                                         // 8
    room = RocketChat.models.Rooms.findOneByNameAndTypeNotContainigUsername(channel, 'c', user.username);
    if (room == null) {                                                                                   // 20
      RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {                                   // 21
        _id: Random.id(),                                                                                 // 21
        rid: item.rid,                                                                                    // 21
        ts: new Date,                                                                                     // 21
        msg: TAPi18n.__('Channel_doesnt_exist', {                                                         // 21
          postProcess: 'sprintf',                                                                         // 25
          sprintf: [channel]                                                                              // 25
        }, user.language)                                                                                 //
      });                                                                                                 //
      return;                                                                                             // 27
    }                                                                                                     //
    Meteor.call('joinRoom', room._id);                                                                    // 8
  }                                                                                                       //
                                                                                                          //
  return Join;                                                                                            //
                                                                                                          //
})();                                                                                                     //
                                                                                                          //
RocketChat.slashCommands.add('join', Join);                                                               // 1
                                                                                                          //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/ar.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["ar"] = ["Arabic","العربية"];                                                     // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                                    // 10
if(_.isUndefined(TAPi18n.translations["ar"])) {                                                           // 11
  TAPi18n.translations["ar"] = {};                                                                        // 12
}                                                                                                         // 13
                                                                                                          // 14
if(_.isUndefined(TAPi18n.translations["ar"][namespace])) {                                                // 15
  TAPi18n.translations["ar"][namespace] = {};                                                             // 16
}                                                                                                         // 17
                                                                                                          // 18
_.extend(TAPi18n.translations["ar"][namespace], {"Channel_doesnt_exist":"القناة '#%s' غير موجودة."});     // 19
TAPi18n._registerServerTranslator("ar", namespace);                                                       // 20
                                                                                                          // 21
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/de.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                                     // 8
if(_.isUndefined(TAPi18n.translations["de"])) {                                                           // 9
  TAPi18n.translations["de"] = {};                                                                        // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                                // 13
  TAPi18n.translations["de"][namespace] = {};                                                             // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["de"][namespace], {"Channel_doesnt_exist":"Der Kanal `#% s` existiert nicht.","Join_the_given_channel":"Angegebenen Kanal beitreten"});
TAPi18n._registerServerTranslator("de", namespace);                                                       // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/en.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
// integrate the fallback language translations                                                           // 8
translations = {};                                                                                        // 9
translations[namespace] = {"Channel_doesnt_exist":"The channel `#%s` does not exist.","Join_the_given_channel":"Join the given channel"};
TAPi18n._loadLangFileObject("en", translations);                                                          // 11
TAPi18n._registerServerTranslator("en", namespace);                                                       // 12
                                                                                                          // 13
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/es.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                                            // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                                           // 9
  TAPi18n.translations["es"] = {};                                                                        // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                                                // 13
  TAPi18n.translations["es"][namespace] = {};                                                             // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["es"][namespace], {"Channel_doesnt_exist":"El canal `#%s` no existe","Join_the_given_channel":"Unirse al canal dado"});
TAPi18n._registerServerTranslator("es", namespace);                                                       // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/fi.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                                      // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                                           // 9
  TAPi18n.translations["fi"] = {};                                                                        // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                                                // 13
  TAPi18n.translations["fi"][namespace] = {};                                                             // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["fi"][namespace], {"Channel_doesnt_exist":"Kanavaa `#%s` ei ole olemassa.","Join_the_given_channel":"Liity kanavalle"});
TAPi18n._registerServerTranslator("fi", namespace);                                                       // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/fr.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                           // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                           // 9
  TAPi18n.translations["fr"] = {};                                                                        // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                // 13
  TAPi18n.translations["fr"][namespace] = {};                                                             // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["fr"][namespace], {"Channel_doesnt_exist":"Le canal `#%s` n'existe pas.","Join_the_given_channel":"Rejoindre le canal choisi"});
TAPi18n._registerServerTranslator("fr", namespace);                                                       // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/hr.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["hr"] = ["Croatian","Hrvatski"];                                                  // 8
if(_.isUndefined(TAPi18n.translations["hr"])) {                                                           // 9
  TAPi18n.translations["hr"] = {};                                                                        // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["hr"][namespace])) {                                                // 13
  TAPi18n.translations["hr"][namespace] = {};                                                             // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["hr"][namespace], {"Channel_doesnt_exist":"Kanal `#% s` ne postoji."});     // 17
TAPi18n._registerServerTranslator("hr", namespace);                                                       // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/ja.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                                       // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                           // 9
  TAPi18n.translations["ja"] = {};                                                                        // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                                // 13
  TAPi18n.translations["ja"][namespace] = {};                                                             // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["ja"][namespace], {"Channel_doesnt_exist":"`#%s` というチャンネルは、登録されていません。","Join_the_given_channel":"チャンネルへ参加する"});
TAPi18n._registerServerTranslator("ja", namespace);                                                       // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/km.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["km"] = ["Khmer","ភាសាខ្មែរ"];                                                    // 8
if(_.isUndefined(TAPi18n.translations["km"])) {                                                           // 9
  TAPi18n.translations["km"] = {};                                                                        // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["km"][namespace])) {                                                // 13
  TAPi18n.translations["km"][namespace] = {};                                                             // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["km"][namespace], {"Channel_doesnt_exist":"ប៉ុស្តិ៍៖ `#% s` មិនមានទេ។","Join_the_given_channel":"ចូលរួមប៉ុស្តិ៍ដែលបានផ្តល់ឲ្យ"});
TAPi18n._registerServerTranslator("km", namespace);                                                       // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/ko.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["ko"] = ["Korean","한국어"];                                                         // 8
if(_.isUndefined(TAPi18n.translations["ko"])) {                                                           // 9
  TAPi18n.translations["ko"] = {};                                                                        // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["ko"][namespace])) {                                                // 13
  TAPi18n.translations["ko"][namespace] = {};                                                             // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["ko"][namespace], {"Channel_doesnt_exist":"`#%s` 채널이 존재하지 않습니다.","Join_the_given_channel":"지정한 채널에 참여"});
TAPi18n._registerServerTranslator("ko", namespace);                                                       // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/ms-MY.i18n.json      //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["ms-MY"] = ["ms-MY","ms-MY"];                                                     // 8
if(_.isUndefined(TAPi18n.translations["ms-MY"])) {                                                        // 9
  TAPi18n.translations["ms-MY"] = {};                                                                     // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["ms-MY"][namespace])) {                                             // 13
  TAPi18n.translations["ms-MY"][namespace] = {};                                                          // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["ms-MY"][namespace], {"Channel_doesnt_exist":"Saluran `#% s` tidak wujud.","Join_the_given_channel":"Sertai saluran yang dinyatakan"});
TAPi18n._registerServerTranslator("ms-MY", namespace);                                                    // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/nl.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                                   // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                                           // 9
  TAPi18n.translations["nl"] = {};                                                                        // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                                                // 13
  TAPi18n.translations["nl"][namespace] = {};                                                             // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["nl"][namespace], {"Channel_doesnt_exist":"Het kanaal `#%s` bestaat niet.","Join_the_given_channel":"Word lid van de gegeven kanaal"});
TAPi18n._registerServerTranslator("nl", namespace);                                                       // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/pl.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                                      // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                                           // 9
  TAPi18n.translations["pl"] = {};                                                                        // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                                                // 13
  TAPi18n.translations["pl"][namespace] = {};                                                             // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["pl"][namespace], {"Channel_doesnt_exist":"Kanał `#%s` nie istnieje.","Join_the_given_channel":"Dołącz do tego kanału"});
TAPi18n._registerServerTranslator("pl", namespace);                                                       // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/pt.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["pt"] = ["Portuguese (Portugal)","Português"];                                    // 8
if(_.isUndefined(TAPi18n.translations["pt"])) {                                                           // 9
  TAPi18n.translations["pt"] = {};                                                                        // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["pt"][namespace])) {                                                // 13
  TAPi18n.translations["pt"][namespace] = {};                                                             // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["pt"][namespace], {"Channel_doesnt_exist":"O canal `#%s` não existe.","Join_the_given_channel":"Entrar no canal informado"});
TAPi18n._registerServerTranslator("pt", namespace);                                                       // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/ro.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                                    // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                           // 9
  TAPi18n.translations["ro"] = {};                                                                        // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                                // 13
  TAPi18n.translations["ro"][namespace] = {};                                                             // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["ro"][namespace], {"Channel_doesnt_exist":"Canalul `#%s` nu există.","Join_the_given_channel":"Intrați pe canalul specificat"});
TAPi18n._registerServerTranslator("ro", namespace);                                                       // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/ru.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                                    // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                           // 9
  TAPi18n.translations["ru"] = {};                                                                        // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                                // 13
  TAPi18n.translations["ru"][namespace] = {};                                                             // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["ru"][namespace], {"Channel_doesnt_exist":"Чат `#%s` не существует.","Join_the_given_channel":"Присоединиться к этому публичному чату"});
TAPi18n._registerServerTranslator("ru", namespace);                                                       // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/sv.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["sv"] = ["Swedish","Svenska"];                                                    // 8
if(_.isUndefined(TAPi18n.translations["sv"])) {                                                           // 9
  TAPi18n.translations["sv"] = {};                                                                        // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["sv"][namespace])) {                                                // 13
  TAPi18n.translations["sv"][namespace] = {};                                                             // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["sv"][namespace], {"Channel_doesnt_exist":"Kanalen `#%s`existerar inte."});
TAPi18n._registerServerTranslator("sv", namespace);                                                       // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/zh-TW.i18n.json      //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["zh-TW"] = ["Chinese (Taiwan)","繁体中文（台湾）"];                                       // 8
if(_.isUndefined(TAPi18n.translations["zh-TW"])) {                                                        // 9
  TAPi18n.translations["zh-TW"] = {};                                                                     // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["zh-TW"][namespace])) {                                             // 13
  TAPi18n.translations["zh-TW"][namespace] = {};                                                          // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["zh-TW"][namespace], {"Channel_doesnt_exist":"頻道 `#%s`不存在","Join_the_given_channel":"加入現有頻道"});
TAPi18n._registerServerTranslator("zh-TW", namespace);                                                    // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_slashcommands-join/packages/rocketchat_slashcommands-joini18n/zh.i18n.json         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "project",                                                                             // 2
    namespace = "project";                                                                                // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                                         // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                           // 9
  TAPi18n.translations["zh"] = {};                                                                        // 10
}                                                                                                         // 11
                                                                                                          // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                                // 13
  TAPi18n.translations["zh"][namespace] = {};                                                             // 14
}                                                                                                         // 15
                                                                                                          // 16
_.extend(TAPi18n.translations["zh"][namespace], {"Channel_doesnt_exist":"不存在 `#%s` 频道。","Join_the_given_channel":"加入该频道"});
TAPi18n._registerServerTranslator("zh", namespace);                                                       // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:slashcommands-join'] = {};

})();

//# sourceMappingURL=rocketchat_slashcommands-join.js.map
