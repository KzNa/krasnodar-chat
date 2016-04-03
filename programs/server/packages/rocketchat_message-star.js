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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/server/settings.coffee.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function() {                                                                                            // 1
  return RocketChat.settings.add('Message_AllowStarring', true, {                                                      //
    type: 'boolean',                                                                                                   // 2
    group: 'Message',                                                                                                  // 2
    "public": true                                                                                                     // 2
  });                                                                                                                  //
});                                                                                                                    // 1
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/server/starMessage.coffee.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                       // 1
  starMessage: function(message) {                                                                                     // 2
    if (!Meteor.userId()) {                                                                                            // 3
      throw new Meteor.Error('invalid-user', "[methods] starMessage -> Invalid user");                                 // 4
    }                                                                                                                  //
    if (!RocketChat.settings.get('Message_AllowStarring')) {                                                           // 6
      throw new Meteor.Error('message-starring-not-allowed', "[methods] starMessage -> Message starring not allowed");
    }                                                                                                                  //
    return RocketChat.models.Messages.updateUserStarById(message._id, Meteor.userId(), message.starred);               //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/server/publications/starredMessages.coffee.js                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('starredMessages', function(rid, limit) {                                                               // 1
  var cursorHandle, publication, user;                                                                                 // 2
  if (limit == null) {                                                                                                 //
    limit = 50;                                                                                                        //
  }                                                                                                                    //
  if (!this.userId) {                                                                                                  // 2
    return this.ready();                                                                                               // 3
  }                                                                                                                    //
  publication = this;                                                                                                  // 2
  user = RocketChat.models.Users.findOneById(this.userId);                                                             // 2
  if (!user) {                                                                                                         // 8
    return this.ready();                                                                                               // 9
  }                                                                                                                    //
  cursorHandle = RocketChat.models.Messages.findStarredByUserAtRoom(this.userId, rid, {                                // 2
    sort: {                                                                                                            // 11
      ts: -1                                                                                                           // 11
    },                                                                                                                 //
    limit: limit                                                                                                       // 11
  }).observeChanges({                                                                                                  //
    added: function(_id, record) {                                                                                     // 12
      return publication.added('rocketchat_starred_message', _id, record);                                             //
    },                                                                                                                 //
    changed: function(_id, record) {                                                                                   // 12
      return publication.changed('rocketchat_starred_message', _id, record);                                           //
    },                                                                                                                 //
    removed: function(_id) {                                                                                           // 12
      return publication.removed('rocketchat_starred_message', _id);                                                   //
    }                                                                                                                  //
  });                                                                                                                  //
  this.ready();                                                                                                        // 2
  return this.onStop(function() {                                                                                      //
    return cursorHandle.stop();                                                                                        //
  });                                                                                                                  //
});                                                                                                                    // 1
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/server/startup/indexes.coffee.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function() {                                                                                            // 1
  return Meteor.defer(function() {                                                                                     //
    return RocketChat.models.Messages.tryEnsureIndex({                                                                 //
      'starred._id': 1                                                                                                 // 3
    }, {                                                                                                               //
      sparse: 1                                                                                                        // 3
    });                                                                                                                //
  });                                                                                                                  //
});                                                                                                                    // 1
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/ar.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["ar"] = ["Arabic","العربية"];                                                                  // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                                                 // 10
if(_.isUndefined(TAPi18n.translations["ar"])) {                                                                        // 11
  TAPi18n.translations["ar"] = {};                                                                                     // 12
}                                                                                                                      // 13
                                                                                                                       // 14
if(_.isUndefined(TAPi18n.translations["ar"][namespace])) {                                                             // 15
  TAPi18n.translations["ar"][namespace] = {};                                                                          // 16
}                                                                                                                      // 17
                                                                                                                       // 18
_.extend(TAPi18n.translations["ar"][namespace], {"Starred_Messages":"رسائل مميزة","No_starred_messages":"لا توجد رسائل مميزة"});
TAPi18n._registerServerTranslator("ar", namespace);                                                                    // 20
                                                                                                                       // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/de.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                                                  // 8
if(_.isUndefined(TAPi18n.translations["de"])) {                                                                        // 9
  TAPi18n.translations["de"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                                             // 13
  TAPi18n.translations["de"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["de"][namespace], {"Message_AllowStarring":"Erlaube es, Nachrichten zu markieren","Star_Message":"Nachricht markieren","Unstar_Message":"Markierung entfernen","Starred_Messages":"Markierte Nachrichten","No_starred_messages":"Es wurden bisher keine Nachrichten markiert."});
TAPi18n._registerServerTranslator("de", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/en.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
// integrate the fallback language translations                                                                        // 8
translations = {};                                                                                                     // 9
translations[namespace] = {"Message_AllowStarring":"Allow Message Starring","Star_Message":"Star Message","Unstar_Message":"Remove Star","Starred_Messages":"Starred Messages","No_starred_messages":"No starred messages"};
TAPi18n._loadLangFileObject("en", translations);                                                                       // 11
TAPi18n._registerServerTranslator("en", namespace);                                                                    // 12
                                                                                                                       // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/es.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                                                         // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                                                        // 9
  TAPi18n.translations["es"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                                                             // 13
  TAPi18n.translations["es"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["es"][namespace], {"Message_AllowStarring":"Permitir Destacar  un Mensaje","Star_Message":"Destacar un Mensaje","Unstar_Message":"Eliminar Destacado","Starred_Messages":"Mensajes Destacados","No_starred_messages":"Ningún mensaje destacado"});
TAPi18n._registerServerTranslator("es", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/fi.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                                                   // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                                                        // 9
  TAPi18n.translations["fi"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                                                             // 13
  TAPi18n.translations["fi"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["fi"][namespace], {"Message_AllowStarring":"Salli viesteille tähti-merkki","Star_Message":"Merkkaa tähdellä","Unstar_Message":"Poista tähti","Starred_Messages":"Tähdellä merkityt viestit","No_starred_messages":"Ei tähdellä merkittyjä viestejä"});
TAPi18n._registerServerTranslator("fi", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/fr.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                                        // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                                        // 9
  TAPi18n.translations["fr"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                             // 13
  TAPi18n.translations["fr"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["fr"][namespace], {"Message_AllowStarring":"Autoriser les favoris pour les messages","Star_Message":"Mettre en favoris","Unstar_Message":"Supprimer des favoris","Starred_Messages":"Messages favoris","No_starred_messages":"Aucun message en favoris"});
TAPi18n._registerServerTranslator("fr", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/hr.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["hr"] = ["Croatian","Hrvatski"];                                                               // 8
if(_.isUndefined(TAPi18n.translations["hr"])) {                                                                        // 9
  TAPi18n.translations["hr"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["hr"][namespace])) {                                                             // 13
  TAPi18n.translations["hr"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["hr"][namespace], {"Unstar_Message":"Ukloni zvjezdicu","Starred_Messages":"Poruke sa zvjezdicom","No_starred_messages":"Nema poruka sa zvjezdicom"});
TAPi18n._registerServerTranslator("hr", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/ja.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                                                    // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                                        // 9
  TAPi18n.translations["ja"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                                             // 13
  TAPi18n.translations["ja"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["ja"][namespace], {"Message_AllowStarring":"メッセージへのスターを許可する","Star_Message":"スターをつける","Unstar_Message":"スターを外す","Starred_Messages":"スターをつけたメッセージ","No_starred_messages":"スターをつけたメッセージはありません"});
TAPi18n._registerServerTranslator("ja", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/km.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["km"] = ["Khmer","ភាសាខ្មែរ"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["km"])) {                                                                        // 9
  TAPi18n.translations["km"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["km"][namespace])) {                                                             // 13
  TAPi18n.translations["km"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["km"][namespace], {"Message_AllowStarring":"អនុញ្ញាតិការសម្គាល់ផ្កាយលើសារ","Star_Message":"សារសម្គាល់ផ្កាយ","Unstar_Message":"ដាកផ្កាយចេញ","Starred_Messages":"សារដែលមានផ្កាយ","No_starred_messages":"សារមិនមានផ្កាយ"});
TAPi18n._registerServerTranslator("km", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/ko.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["ko"] = ["Korean","한국어"];                                                                      // 8
if(_.isUndefined(TAPi18n.translations["ko"])) {                                                                        // 9
  TAPi18n.translations["ko"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ko"][namespace])) {                                                             // 13
  TAPi18n.translations["ko"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["ko"][namespace], {"Message_AllowStarring":"메시지 별표 허용","Star_Message":"별표 메시지","Unstar_Message":"별표 삭제","Starred_Messages":"별표된 메시지","No_starred_messages":"별표된 메시지가 없습니다"});
TAPi18n._registerServerTranslator("ko", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/ms-MY.i18n.json                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["ms-MY"] = ["ms-MY","ms-MY"];                                                                  // 8
if(_.isUndefined(TAPi18n.translations["ms-MY"])) {                                                                     // 9
  TAPi18n.translations["ms-MY"] = {};                                                                                  // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ms-MY"][namespace])) {                                                          // 13
  TAPi18n.translations["ms-MY"][namespace] = {};                                                                       // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["ms-MY"][namespace], {"Message_AllowStarring":"Benarkan Mesej Dibintangi","Star_Message":"Bintangkan Mesej ","Unstar_Message":"Padam Bintang","Starred_Messages":"Mesej Berbintang","No_starred_messages":"Tiada mesej berbintang"});
TAPi18n._registerServerTranslator("ms-MY", namespace);                                                                 // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/nl.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                                                        // 9
  TAPi18n.translations["nl"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                                                             // 13
  TAPi18n.translations["nl"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["nl"][namespace], {"Message_AllowStarring":"Sta markeren toe","Star_Message":"Markeer bericht","Unstar_Message":"Verwijder markering","Starred_Messages":"Gemarkeerde berichten","No_starred_messages":"Geen gemarkeerde berichten"});
TAPi18n._registerServerTranslator("nl", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/pl.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                                                   // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                                                        // 9
  TAPi18n.translations["pl"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                                                             // 13
  TAPi18n.translations["pl"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["pl"][namespace], {"Message_AllowStarring":"Pozwól oznaczać wiadomości gwiazdką","Star_Message":"Oznacz wiadomość","Unstar_Message":"Usuń oznaczenie","Starred_Messages":"Ulubione wiadomości","No_starred_messages":"Brak ulubionych wiadomości"});
TAPi18n._registerServerTranslator("pl", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/pt.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["pt"] = ["Portuguese (Portugal)","Português"];                                                 // 8
if(_.isUndefined(TAPi18n.translations["pt"])) {                                                                        // 9
  TAPi18n.translations["pt"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["pt"][namespace])) {                                                             // 13
  TAPi18n.translations["pt"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["pt"][namespace], {"Message_AllowStarring":"Permitir Mensagens Favoritas","Star_Message":"Favoritar Message","Unstar_Message":"Remover Favorito","Starred_Messages":"Mensagens Favoritas","No_starred_messages":"Não há mensagens favoritas"});
TAPi18n._registerServerTranslator("pt", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/ro.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                                        // 9
  TAPi18n.translations["ro"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                                             // 13
  TAPi18n.translations["ro"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["ro"][namespace], {"Message_AllowStarring":"Permiteți însemnarea cu steluță a mesajelor","Star_Message":"Marchează cu stea mesajul","Unstar_Message":"Eliminați marcajul cu stea","Starred_Messages":"Mesaje cu stea","No_starred_messages":"Niciun mesaj cu stea"});
TAPi18n._registerServerTranslator("ro", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/ru.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                                        // 9
  TAPi18n.translations["ru"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                                             // 13
  TAPi18n.translations["ru"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["ru"][namespace], {"Message_AllowStarring":"Разрешить отмечать сообщения","Star_Message":"Оценить сообщение","Unstar_Message":"Убрать оценку","Starred_Messages":"Сообщения с оценкой","No_starred_messages":"Сообщения без оценки"});
TAPi18n._registerServerTranslator("ru", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/sv.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["sv"] = ["Swedish","Svenska"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["sv"])) {                                                                        // 9
  TAPi18n.translations["sv"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["sv"][namespace])) {                                                             // 13
  TAPi18n.translations["sv"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["sv"][namespace], {"Message_AllowStarring":"Tillåt stjärnmarkering av meddelanden.","Star_Message":"Stjärnmarkera meddelande","Unstar_Message":"Ta bort stjärnmarkering","Starred_Messages":"Stjärnmarkerade meddelanden","No_starred_messages":"Inga stjärnmarkerade meddelanden"});
TAPi18n._registerServerTranslator("sv", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/tr.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["tr"] = ["Turkish","Türkçe"];                                                                  // 8
if(_.isUndefined(TAPi18n.translations["tr"])) {                                                                        // 9
  TAPi18n.translations["tr"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["tr"][namespace])) {                                                             // 13
  TAPi18n.translations["tr"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["tr"][namespace], {"Star_Message":"Favorilere ekle","Starred_Messages":"Favori İletilerim","No_starred_messages":"Favori iletin yok"});
TAPi18n._registerServerTranslator("tr", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_message-star/packages/rocketchat_message-stari18n/zh.i18n.json                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                                                      // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                                        // 9
  TAPi18n.translations["zh"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                                             // 13
  TAPi18n.translations["zh"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["zh"][namespace], {"Message_AllowStarring":"允许标记信息","Star_Message":"标记信息","Unstar_Message":"取消标记","Starred_Messages":"已标记的信息","No_starred_messages":"未标记的信息"});
TAPi18n._registerServerTranslator("zh", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:message-star'] = {};

})();

//# sourceMappingURL=rocketchat_message-star.js.map
