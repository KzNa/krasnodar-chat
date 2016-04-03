(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;

/* Package-scope variables */
var __coffeescriptShare, translations;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rocketchat_mentions-flextab/server/publications/mentionedMessages.coffee.js                        //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('mentionedMessages', function(rid, limit) {                                                     // 1
  var cursorHandle, publication, user;                                                                         // 2
  if (limit == null) {                                                                                         //
    limit = 50;                                                                                                //
  }                                                                                                            //
  if (!this.userId) {                                                                                          // 2
    return this.ready();                                                                                       // 3
  }                                                                                                            //
  publication = this;                                                                                          // 2
  user = RocketChat.models.Users.findOneById(this.userId);                                                     // 2
  if (!user) {                                                                                                 // 8
    return this.ready();                                                                                       // 9
  }                                                                                                            //
  cursorHandle = RocketChat.models.Messages.findVisibleByMentionAndRoomId(user.username, rid, {                // 2
    sort: {                                                                                                    // 11
      ts: -1                                                                                                   // 11
    },                                                                                                         //
    limit: limit                                                                                               // 11
  }).observeChanges({                                                                                          //
    added: function(_id, record) {                                                                             // 12
      record.mentionedList = true;                                                                             // 13
      return publication.added('rocketchat_mentioned_message', _id, record);                                   //
    },                                                                                                         //
    changed: function(_id, record) {                                                                           // 12
      record.mentionedList = true;                                                                             // 17
      return publication.changed('rocketchat_mentioned_message', _id, record);                                 //
    },                                                                                                         //
    removed: function(_id) {                                                                                   // 12
      return publication.removed('rocketchat_mentioned_message', _id);                                         //
    }                                                                                                          //
  });                                                                                                          //
  this.ready();                                                                                                // 2
  return this.onStop(function() {                                                                              //
    return cursorHandle.stop();                                                                                //
  });                                                                                                          //
});                                                                                                            // 1
                                                                                                               //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rocketchat_mentions-flextab/packages/rocketchat_mentions-flextabi18n/de.i18n.json                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _ = Package.underscore._,                                                                                  // 1
    package_name = "project",                                                                                  // 2
    namespace = "project";                                                                                     // 3
                                                                                                               // 4
if (package_name != "project") {                                                                               // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                      // 6
}                                                                                                              // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                                          // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                                         // 10
if(_.isUndefined(TAPi18n.translations["de"])) {                                                                // 11
  TAPi18n.translations["de"] = {};                                                                             // 12
}                                                                                                              // 13
                                                                                                               // 14
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                                     // 15
  TAPi18n.translations["de"][namespace] = {};                                                                  // 16
}                                                                                                              // 17
                                                                                                               // 18
_.extend(TAPi18n.translations["de"][namespace], {"No_mentions_found":"Sie wurden bisher nirgendwo erwähnt."});
TAPi18n._registerServerTranslator("de", namespace);                                                            // 20
                                                                                                               // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rocketchat_mentions-flextab/packages/rocketchat_mentions-flextabi18n/en.i18n.json                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _ = Package.underscore._,                                                                                  // 1
    package_name = "project",                                                                                  // 2
    namespace = "project";                                                                                     // 3
                                                                                                               // 4
if (package_name != "project") {                                                                               // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                      // 6
}                                                                                                              // 7
// integrate the fallback language translations                                                                // 8
translations = {};                                                                                             // 9
translations[namespace] = {"No_mentions_found":"No mentions found"};                                           // 10
TAPi18n._loadLangFileObject("en", translations);                                                               // 11
TAPi18n._registerServerTranslator("en", namespace);                                                            // 12
                                                                                                               // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rocketchat_mentions-flextab/packages/rocketchat_mentions-flextabi18n/es.i18n.json                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _ = Package.underscore._,                                                                                  // 1
    package_name = "project",                                                                                  // 2
    namespace = "project";                                                                                     // 3
                                                                                                               // 4
if (package_name != "project") {                                                                               // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                      // 6
}                                                                                                              // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                                                 // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                                                // 9
  TAPi18n.translations["es"] = {};                                                                             // 10
}                                                                                                              // 11
                                                                                                               // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                                                     // 13
  TAPi18n.translations["es"][namespace] = {};                                                                  // 14
}                                                                                                              // 15
                                                                                                               // 16
_.extend(TAPi18n.translations["es"][namespace], {"No_mentions_found":"Ninguna mención encontrada "});          // 17
TAPi18n._registerServerTranslator("es", namespace);                                                            // 18
                                                                                                               // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rocketchat_mentions-flextab/packages/rocketchat_mentions-flextabi18n/fi.i18n.json                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _ = Package.underscore._,                                                                                  // 1
    package_name = "project",                                                                                  // 2
    namespace = "project";                                                                                     // 3
                                                                                                               // 4
if (package_name != "project") {                                                                               // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                      // 6
}                                                                                                              // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                                           // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                                                // 9
  TAPi18n.translations["fi"] = {};                                                                             // 10
}                                                                                                              // 11
                                                                                                               // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                                                     // 13
  TAPi18n.translations["fi"][namespace] = {};                                                                  // 14
}                                                                                                              // 15
                                                                                                               // 16
_.extend(TAPi18n.translations["fi"][namespace], {"No_mentions_found":"Mainintoja ei löytynyt"});               // 17
TAPi18n._registerServerTranslator("fi", namespace);                                                            // 18
                                                                                                               // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rocketchat_mentions-flextab/packages/rocketchat_mentions-flextabi18n/fr.i18n.json                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _ = Package.underscore._,                                                                                  // 1
    package_name = "project",                                                                                  // 2
    namespace = "project";                                                                                     // 3
                                                                                                               // 4
if (package_name != "project") {                                                                               // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                      // 6
}                                                                                                              // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                                // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                                // 9
  TAPi18n.translations["fr"] = {};                                                                             // 10
}                                                                                                              // 11
                                                                                                               // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                     // 13
  TAPi18n.translations["fr"][namespace] = {};                                                                  // 14
}                                                                                                              // 15
                                                                                                               // 16
_.extend(TAPi18n.translations["fr"][namespace], {"No_mentions_found":"Aucune mention trouvée"});               // 17
TAPi18n._registerServerTranslator("fr", namespace);                                                            // 18
                                                                                                               // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rocketchat_mentions-flextab/packages/rocketchat_mentions-flextabi18n/he.i18n.json                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _ = Package.underscore._,                                                                                  // 1
    package_name = "project",                                                                                  // 2
    namespace = "project";                                                                                     // 3
                                                                                                               // 4
if (package_name != "project") {                                                                               // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                      // 6
}                                                                                                              // 7
TAPi18n.languages_names["he"] = ["Hebrew","עברית"];                                                            // 8
if(_.isUndefined(TAPi18n.translations["he"])) {                                                                // 9
  TAPi18n.translations["he"] = {};                                                                             // 10
}                                                                                                              // 11
                                                                                                               // 12
if(_.isUndefined(TAPi18n.translations["he"][namespace])) {                                                     // 13
  TAPi18n.translations["he"][namespace] = {};                                                                  // 14
}                                                                                                              // 15
                                                                                                               // 16
_.extend(TAPi18n.translations["he"][namespace], {"No_mentions_found":"לא נמצאו אזכורים"});                     // 17
TAPi18n._registerServerTranslator("he", namespace);                                                            // 18
                                                                                                               // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rocketchat_mentions-flextab/packages/rocketchat_mentions-flextabi18n/ja.i18n.json                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _ = Package.underscore._,                                                                                  // 1
    package_name = "project",                                                                                  // 2
    namespace = "project";                                                                                     // 3
                                                                                                               // 4
if (package_name != "project") {                                                                               // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                      // 6
}                                                                                                              // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                                            // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                                // 9
  TAPi18n.translations["ja"] = {};                                                                             // 10
}                                                                                                              // 11
                                                                                                               // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                                     // 13
  TAPi18n.translations["ja"][namespace] = {};                                                                  // 14
}                                                                                                              // 15
                                                                                                               // 16
_.extend(TAPi18n.translations["ja"][namespace], {"No_mentions_found":"メンションが見つかりませんでした"});                     // 17
TAPi18n._registerServerTranslator("ja", namespace);                                                            // 18
                                                                                                               // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rocketchat_mentions-flextab/packages/rocketchat_mentions-flextabi18n/nl.i18n.json                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _ = Package.underscore._,                                                                                  // 1
    package_name = "project",                                                                                  // 2
    namespace = "project";                                                                                     // 3
                                                                                                               // 4
if (package_name != "project") {                                                                               // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                      // 6
}                                                                                                              // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                                        // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                                                // 9
  TAPi18n.translations["nl"] = {};                                                                             // 10
}                                                                                                              // 11
                                                                                                               // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                                                     // 13
  TAPi18n.translations["nl"][namespace] = {};                                                                  // 14
}                                                                                                              // 15
                                                                                                               // 16
_.extend(TAPi18n.translations["nl"][namespace], {"No_mentions_found":"Geen vermeldingen gevonden"});           // 17
TAPi18n._registerServerTranslator("nl", namespace);                                                            // 18
                                                                                                               // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rocketchat_mentions-flextab/packages/rocketchat_mentions-flextabi18n/pl.i18n.json                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _ = Package.underscore._,                                                                                  // 1
    package_name = "project",                                                                                  // 2
    namespace = "project";                                                                                     // 3
                                                                                                               // 4
if (package_name != "project") {                                                                               // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                      // 6
}                                                                                                              // 7
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                                           // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                                                // 9
  TAPi18n.translations["pl"] = {};                                                                             // 10
}                                                                                                              // 11
                                                                                                               // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                                                     // 13
  TAPi18n.translations["pl"][namespace] = {};                                                                  // 14
}                                                                                                              // 15
                                                                                                               // 16
_.extend(TAPi18n.translations["pl"][namespace], {"No_mentions_found":"Nie znaleziono wzmianek o tobie"});      // 17
TAPi18n._registerServerTranslator("pl", namespace);                                                            // 18
                                                                                                               // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rocketchat_mentions-flextab/packages/rocketchat_mentions-flextabi18n/ro.i18n.json                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _ = Package.underscore._,                                                                                  // 1
    package_name = "project",                                                                                  // 2
    namespace = "project";                                                                                     // 3
                                                                                                               // 4
if (package_name != "project") {                                                                               // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                      // 6
}                                                                                                              // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                                         // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                                // 9
  TAPi18n.translations["ro"] = {};                                                                             // 10
}                                                                                                              // 11
                                                                                                               // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                                     // 13
  TAPi18n.translations["ro"][namespace] = {};                                                                  // 14
}                                                                                                              // 15
                                                                                                               // 16
_.extend(TAPi18n.translations["ro"][namespace], {"No_mentions_found":"Nicio mențiune găsită"});                // 17
TAPi18n._registerServerTranslator("ro", namespace);                                                            // 18
                                                                                                               // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rocketchat_mentions-flextab/packages/rocketchat_mentions-flextabi18n/ru.i18n.json                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _ = Package.underscore._,                                                                                  // 1
    package_name = "project",                                                                                  // 2
    namespace = "project";                                                                                     // 3
                                                                                                               // 4
if (package_name != "project") {                                                                               // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                      // 6
}                                                                                                              // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                                         // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                                // 9
  TAPi18n.translations["ru"] = {};                                                                             // 10
}                                                                                                              // 11
                                                                                                               // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                                     // 13
  TAPi18n.translations["ru"][namespace] = {};                                                                  // 14
}                                                                                                              // 15
                                                                                                               // 16
_.extend(TAPi18n.translations["ru"][namespace], {"No_mentions_found":"Упоминания не найдены"});                // 17
TAPi18n._registerServerTranslator("ru", namespace);                                                            // 18
                                                                                                               // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rocketchat_mentions-flextab/packages/rocketchat_mentions-flextabi18n/zh.i18n.json                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _ = Package.underscore._,                                                                                  // 1
    package_name = "project",                                                                                  // 2
    namespace = "project";                                                                                     // 3
                                                                                                               // 4
if (package_name != "project") {                                                                               // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                      // 6
}                                                                                                              // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                                              // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                                // 9
  TAPi18n.translations["zh"] = {};                                                                             // 10
}                                                                                                              // 11
                                                                                                               // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                                     // 13
  TAPi18n.translations["zh"][namespace] = {};                                                                  // 14
}                                                                                                              // 15
                                                                                                               // 16
_.extend(TAPi18n.translations["zh"][namespace], {"No_mentions_found":"没有发现任何提及"});                             // 17
TAPi18n._registerServerTranslator("zh", namespace);                                                            // 18
                                                                                                               // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:mentions-flextab'] = {};

})();

//# sourceMappingURL=rocketchat_mentions-flextab.js.map
