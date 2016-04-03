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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/server/settings.coffee.js                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function() {                                                                                         // 1
  RocketChat.settings.add('Message_AllowPinning', true, {                                                           // 2
    type: 'boolean',                                                                                                // 2
    group: 'Message',                                                                                               // 2
    "public": true                                                                                                  // 2
  });                                                                                                               //
  return RocketChat.settings.add('Message_AllowPinningByAnyone', false, {                                           //
    type: 'boolean',                                                                                                // 3
    group: 'Message',                                                                                               // 3
    "public": true                                                                                                  // 3
  });                                                                                                               //
});                                                                                                                 // 1
                                                                                                                    //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/server/pinMessage.coffee.js                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                    // 1
  pinMessage: function(message) {                                                                                   // 2
    var me;                                                                                                         // 3
    if (!Meteor.userId()) {                                                                                         // 3
      throw new Meteor.Error('invalid-user', "[methods] pinMessage -> Invalid user");                               // 4
    }                                                                                                               //
    if (!RocketChat.settings.get('Message_AllowPinning')) {                                                         // 6
      throw new Meteor.Error('message-pinning-not-allowed', '[methods] pinMessage -> Message pinning not allowed');
    }                                                                                                               //
    if (RocketChat.settings.get('Message_KeepHistory')) {                                                           // 10
      RocketChat.models.Messages.cloneAndSaveAsHistoryById(message._id);                                            // 11
    }                                                                                                               //
    me = RocketChat.models.Users.findOneById(Meteor.userId());                                                      // 3
    message.pinned = true;                                                                                          // 3
    message.pinnedAt = Date.now;                                                                                    // 3
    message.pinnedBy = {                                                                                            // 3
      _id: Meteor.userId(),                                                                                         // 18
      username: me.username                                                                                         // 18
    };                                                                                                              //
    message = RocketChat.callbacks.run('beforeSaveMessage', message);                                               // 3
    RocketChat.models.Messages.setPinnedByIdAndUserId(message._id, message.pinnedBy, message.pinned);               // 3
    return RocketChat.models.Messages.createWithTypeRoomIdMessageAndUser('message_pinned', message.rid, '', me, {   //
      attachments: [                                                                                                // 26
        {                                                                                                           //
          "text": message.msg,                                                                                      // 27
          "author_name": message.u.username,                                                                        // 27
          "author_icon": getAvatarUrlFromUsername(message.u.username)                                               // 27
        }                                                                                                           //
      ]                                                                                                             //
    });                                                                                                             //
  },                                                                                                                //
  unpinMessage: function(message) {                                                                                 // 2
    var me;                                                                                                         // 33
    if (!Meteor.userId()) {                                                                                         // 33
      throw new Meteor.Error('invalid-user', "[methods] unpinMessage -> Invalid user");                             // 34
    }                                                                                                               //
    if (!RocketChat.settings.get('Message_AllowPinning')) {                                                         // 36
      throw new Meteor.Error('message-pinning-not-allowed', '[methods] pinMessage -> Message pinning not allowed');
    }                                                                                                               //
    if (RocketChat.settings.get('Message_KeepHistory')) {                                                           // 40
      RocketChat.models.Messages.cloneAndSaveAsHistoryById(message._id);                                            // 41
    }                                                                                                               //
    me = RocketChat.models.Users.findOneById(Meteor.userId());                                                      // 33
    message.pinned = false;                                                                                         // 33
    message.pinnedBy = {                                                                                            // 33
      _id: Meteor.userId(),                                                                                         // 47
      username: me.username                                                                                         // 47
    };                                                                                                              //
    message = RocketChat.callbacks.run('beforeSaveMessage', message);                                               // 33
    return RocketChat.models.Messages.setPinnedByIdAndUserId(message._id, message.pinnedBy, message.pinned);        //
  }                                                                                                                 //
});                                                                                                                 //
                                                                                                                    //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/server/publications/pinnedMessages.coffee.js                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('pinnedMessages', function(rid, limit) {                                                             // 1
  var cursorHandle, publication, user;                                                                              // 2
  if (limit == null) {                                                                                              //
    limit = 50;                                                                                                     //
  }                                                                                                                 //
  if (!this.userId) {                                                                                               // 2
    return this.ready();                                                                                            // 3
  }                                                                                                                 //
  publication = this;                                                                                               // 2
  user = RocketChat.models.Users.findOneById(this.userId);                                                          // 2
  if (!user) {                                                                                                      // 8
    return this.ready();                                                                                            // 9
  }                                                                                                                 //
  cursorHandle = RocketChat.models.Messages.findPinnedByRoom(rid, {                                                 // 2
    sort: {                                                                                                         // 11
      ts: -1                                                                                                        // 11
    },                                                                                                              //
    limit: limit                                                                                                    // 11
  }).observeChanges({                                                                                               //
    added: function(_id, record) {                                                                                  // 12
      return publication.added('rocketchat_pinned_message', _id, record);                                           //
    },                                                                                                              //
    changed: function(_id, record) {                                                                                // 12
      return publication.changed('rocketchat_pinned_message', _id, record);                                         //
    },                                                                                                              //
    removed: function(_id) {                                                                                        // 12
      return publication.removed('rocketchat_pinned_message', _id);                                                 //
    }                                                                                                               //
  });                                                                                                               //
  this.ready();                                                                                                     // 2
  return this.onStop(function() {                                                                                   //
    return cursorHandle.stop();                                                                                     //
  });                                                                                                               //
});                                                                                                                 // 1
                                                                                                                    //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/server/startup/indexes.coffee.js                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function() {                                                                                         // 1
  return Meteor.defer(function() {                                                                                  //
    return RocketChat.models.Messages.tryEnsureIndex({                                                              //
      'pinnedBy._id': 1                                                                                             // 3
    }, {                                                                                                            //
      sparse: 1                                                                                                     // 3
    });                                                                                                             //
  });                                                                                                               //
});                                                                                                                 // 1
                                                                                                                    //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/ar.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["ar"] = ["Arabic","العربية"];                                                               // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                                              // 10
if(_.isUndefined(TAPi18n.translations["ar"])) {                                                                     // 11
  TAPi18n.translations["ar"] = {};                                                                                  // 12
}                                                                                                                   // 13
                                                                                                                    // 14
if(_.isUndefined(TAPi18n.translations["ar"][namespace])) {                                                          // 15
  TAPi18n.translations["ar"][namespace] = {};                                                                       // 16
}                                                                                                                   // 17
                                                                                                                    // 18
_.extend(TAPi18n.translations["ar"][namespace], {"Message_AllowPinning":"السماح بتثبيت الرسائل","Message_AllowPinningByAnyone":"السماح للجميع بتثبيت الرسائل","Pin_Message":"تثبيث الرسالة","Unpin_Message":"إلغاء تثبيث الرسالة","Pinned_Messages":"رسائل مثبتة","No_pinned_messages":"لا توجد رسائل مثبتة"});
TAPi18n._registerServerTranslator("ar", namespace);                                                                 // 20
                                                                                                                    // 21
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/de.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                                               // 8
if(_.isUndefined(TAPi18n.translations["de"])) {                                                                     // 9
  TAPi18n.translations["de"] = {};                                                                                  // 10
}                                                                                                                   // 11
                                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                                          // 13
  TAPi18n.translations["de"][namespace] = {};                                                                       // 14
}                                                                                                                   // 15
                                                                                                                    // 16
_.extend(TAPi18n.translations["de"][namespace], {"Message_AllowPinning":"Das Fixieren von Nachrichten erlauben","Message_AllowPinning_Description":"Benutzern das Fixieren von Nachrichten in Kanälen erlauben","Message_AllowPinningByAnyone":"Jedem Nutzer erlauben, Nachrichten zu fixieren","Message_AllowPinningByAnyone_Description":"Allen Benutzern das Fixieren von Nachrichten in Kanälen erlauben","Pin_Message":"Nachricht fixieren","Pinned_a_message":"hat eine Nachricht angeheftet:","Unpin_Message":"Nachicht nicht mehr fixieren","Pinned_Messages":"Fixierte Nachrichten","No_pinned_messages":"Es wurden bisher keine Nachrichten fixiert."});
TAPi18n._registerServerTranslator("de", namespace);                                                                 // 18
                                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/en.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
// integrate the fallback language translations                                                                     // 8
translations = {};                                                                                                  // 9
translations[namespace] = {"Message_AllowPinning":"Allow Message Pinning","Message_AllowPinning_Description":"Allow messages to be pinned to any of the channels.","Message_AllowPinningByAnyone":"Allow Anyone to Pin Messages","Message_AllowPinningByAnyone_Description":"Allow anyone to pin messages to a channel, not just administrators.","Pin_Message":"Pin Message","Pinned_a_message":"Pinned a message:","Unpin_Message":"Unpin Message","Pinned_Messages":"Pinned Messages","No_pinned_messages":"No pinned messages"};
TAPi18n._loadLangFileObject("en", translations);                                                                    // 11
TAPi18n._registerServerTranslator("en", namespace);                                                                 // 12
                                                                                                                    // 13
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/es.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                                                      // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                                                     // 9
  TAPi18n.translations["es"] = {};                                                                                  // 10
}                                                                                                                   // 11
                                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                                                          // 13
  TAPi18n.translations["es"][namespace] = {};                                                                       // 14
}                                                                                                                   // 15
                                                                                                                    // 16
_.extend(TAPi18n.translations["es"][namespace], {"Message_AllowPinning":"Permitir que se fijen los mensajes","Message_AllowPinning_Description":"Permitir que los mensajes se puedan anclar a cualquier canal.","Message_AllowPinningByAnyone":"Permitir que cualquiera pueda Anclar Mensajes","Message_AllowPinningByAnyone_Description":"Permitir que cualquiera pueda anclar mensajes a un canal, no solo administradores","Pin_Message":"Anclar Mensaje","Unpin_Message":"Desanclar Mensaje","Pinned_Messages":"Mensajes Anclados","No_pinned_messages":"Ningún mensaje anclado"});
TAPi18n._registerServerTranslator("es", namespace);                                                                 // 18
                                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/fi.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                                                     // 9
  TAPi18n.translations["fi"] = {};                                                                                  // 10
}                                                                                                                   // 11
                                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                                                          // 13
  TAPi18n.translations["fi"][namespace] = {};                                                                       // 14
}                                                                                                                   // 15
                                                                                                                    // 16
_.extend(TAPi18n.translations["fi"][namespace], {"Message_AllowPinning":"Salli viestien kiinnittäminen","Message_AllowPinning_Description":"Salli viestien kiinnitys kaikilla kanavilla.","Message_AllowPinningByAnyone":"Salli kaikkien kiinnittää viestejä.","Message_AllowPinningByAnyone_Description":"Salli kaikkien - myös normaalien käyttäjien - kiinnittää viestejä.","Pin_Message":"Kiinnitä viesti","Unpin_Message":"Poista kiinnitys","Pinned_Messages":"Kiinnitetyt viestit","No_pinned_messages":"Ei kiinnitettyjä viestejä"});
TAPi18n._registerServerTranslator("fi", namespace);                                                                 // 18
                                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/fr.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                                     // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                                     // 9
  TAPi18n.translations["fr"] = {};                                                                                  // 10
}                                                                                                                   // 11
                                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                          // 13
  TAPi18n.translations["fr"][namespace] = {};                                                                       // 14
}                                                                                                                   // 15
                                                                                                                    // 16
_.extend(TAPi18n.translations["fr"][namespace], {"Message_AllowPinning":"Autoriser l'épinglement de message","Message_AllowPinning_Description":"Autoriser les messages à être épinglés à n'importe quel canal.","Message_AllowPinningByAnyone":"Permettre à quiconque d'épingler des messages","Message_AllowPinningByAnyone_Description":"Permettre à quiconque d'épingler des messages à un canal, pas seulement les administrateurs.","Pin_Message":"Épingler ce message","Pinned_a_message":"A épinglé un message :","Unpin_Message":"Détacher ce message","Pinned_Messages":"Messages épinglés","No_pinned_messages":"Aucun message épinglé"});
TAPi18n._registerServerTranslator("fr", namespace);                                                                 // 18
                                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/he.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["he"] = ["Hebrew","עברית"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["he"])) {                                                                     // 9
  TAPi18n.translations["he"] = {};                                                                                  // 10
}                                                                                                                   // 11
                                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["he"][namespace])) {                                                          // 13
  TAPi18n.translations["he"][namespace] = {};                                                                       // 14
}                                                                                                                   // 15
                                                                                                                    // 16
_.extend(TAPi18n.translations["he"][namespace], {"Pin_Message":"הצמדת הודעה","Unpin_Message":"שחרור הודעה","Pinned_Messages":"הודעות מוצמדות","No_pinned_messages":"אין הודעות מוצמדות"});
TAPi18n._registerServerTranslator("he", namespace);                                                                 // 18
                                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/hr.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["hr"] = ["Croatian","Hrvatski"];                                                            // 8
if(_.isUndefined(TAPi18n.translations["hr"])) {                                                                     // 9
  TAPi18n.translations["hr"] = {};                                                                                  // 10
}                                                                                                                   // 11
                                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["hr"][namespace])) {                                                          // 13
  TAPi18n.translations["hr"][namespace] = {};                                                                       // 14
}                                                                                                                   // 15
                                                                                                                    // 16
_.extend(TAPi18n.translations["hr"][namespace], {"Message_AllowPinning":"Dopusti pribadanje poruka "});             // 17
TAPi18n._registerServerTranslator("hr", namespace);                                                                 // 18
                                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/ja.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                                     // 9
  TAPi18n.translations["ja"] = {};                                                                                  // 10
}                                                                                                                   // 11
                                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                                          // 13
  TAPi18n.translations["ja"][namespace] = {};                                                                       // 14
}                                                                                                                   // 15
                                                                                                                    // 16
_.extend(TAPi18n.translations["ja"][namespace], {"Message_AllowPinning":"メッセージのピン留めを許可する","Message_AllowPinning_Description":"どのチャンネルでもメッセージのピン留めを許可します。","Message_AllowPinningByAnyone":"誰にでもメッセージのピン留めを許可する","Message_AllowPinningByAnyone_Description":"管理者でなくても、メッセージのピン留めを許可します。","Pin_Message":"ピン留めする","Pinned_a_message":"メッセージをピン留めしました :","Unpin_Message":"ピン留めを外す","Pinned_Messages":"ピン留めされたメッセージ","No_pinned_messages":"ピン留めされたメッセージはありません"});
TAPi18n._registerServerTranslator("ja", namespace);                                                                 // 18
                                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/km.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["km"] = ["Khmer","ភាសាខ្មែរ"];                                                              // 8
if(_.isUndefined(TAPi18n.translations["km"])) {                                                                     // 9
  TAPi18n.translations["km"] = {};                                                                                  // 10
}                                                                                                                   // 11
                                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["km"][namespace])) {                                                          // 13
  TAPi18n.translations["km"][namespace] = {};                                                                       // 14
}                                                                                                                   // 15
                                                                                                                    // 16
_.extend(TAPi18n.translations["km"][namespace], {"Message_AllowPinning":"អនុញ្ញតិ​ខ្ទស់សារ​","Message_AllowPinning_Description":"អនុញ្ញាតឱ្យសារត្រូវបានខ្ទាស់ទៅច្រើនប៉ុស្តិ៍។","Message_AllowPinningByAnyone":"អនុញ្ញាតឱ្យគ្រាប់គ្នាខ្ទាស់សារ","Message_AllowPinningByAnyone_Description":"អនុញ្ញាតិឲ្យគ្រប់គ្នាអាចខ្ទាស់សារទៅកាន់ប៉ុស្តិ៍ណាមួយ ដោយមិនចាំបាច់សិទ្ធជាអ្នកគ្រប់គ្រង។","Pin_Message":"ខ្ទាស់សារ","Unpin_Message":"សារមិនខ្ទាស់","Pinned_Messages":"មិនខ្ទាស់សារ","No_pinned_messages":"មិនមានសារបានខ្ទាស់"});
TAPi18n._registerServerTranslator("km", namespace);                                                                 // 18
                                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/ko.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["ko"] = ["Korean","한국어"];                                                                   // 8
if(_.isUndefined(TAPi18n.translations["ko"])) {                                                                     // 9
  TAPi18n.translations["ko"] = {};                                                                                  // 10
}                                                                                                                   // 11
                                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["ko"][namespace])) {                                                          // 13
  TAPi18n.translations["ko"][namespace] = {};                                                                       // 14
}                                                                                                                   // 15
                                                                                                                    // 16
_.extend(TAPi18n.translations["ko"][namespace], {"Message_AllowPinning":"허용 메시지 고정","Message_AllowPinningByAnyone":"누구나 메시지를 보관할 수 있도록 허용","Pin_Message":"메시지 보관하기","Unpin_Message":"메시지 보관하지 않기","Pinned_Messages":"보관된 메시지","No_pinned_messages":"보관된 메시지가 없습니다"});
TAPi18n._registerServerTranslator("ko", namespace);                                                                 // 18
                                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/nl.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                                             // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                                                     // 9
  TAPi18n.translations["nl"] = {};                                                                                  // 10
}                                                                                                                   // 11
                                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                                                          // 13
  TAPi18n.translations["nl"][namespace] = {};                                                                       // 14
}                                                                                                                   // 15
                                                                                                                    // 16
_.extend(TAPi18n.translations["nl"][namespace], {"Message_AllowPinning":"Bericht vastzetten toestaan","Message_AllowPinning_Description":"Sta berichten vastzetten toe op elk kanaal.","Message_AllowPinningByAnyone":"Sta iedereen toe om berichten vast te zetten","Message_AllowPinningByAnyone_Description":"Sta iedereen toe om berichten vast te zetten op een kanaal, niet alleen beheerders.","Pin_Message":"Zet bericht vast","Unpin_Message":"Bericht niet meer vastzetten","Pinned_Messages":"Vastgezette berichten","No_pinned_messages":"Geen vastgezette berichten"});
TAPi18n._registerServerTranslator("nl", namespace);                                                                 // 18
                                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/pl.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                                                     // 9
  TAPi18n.translations["pl"] = {};                                                                                  // 10
}                                                                                                                   // 11
                                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                                                          // 13
  TAPi18n.translations["pl"][namespace] = {};                                                                       // 14
}                                                                                                                   // 15
                                                                                                                    // 16
_.extend(TAPi18n.translations["pl"][namespace], {"Message_AllowPinning":"Pozwól na przypinanie wiadomości","Message_AllowPinning_Description":"Pozwól na przypinanie wiadomości we wszystkich kanałach.","Message_AllowPinningByAnyone":"Pozwól każdemu na przypinanie wiadomości","Message_AllowPinningByAnyone_Description":"Pozwól wszystkim na przypinanie wiadomości, nie tylko administratorom.","Pin_Message":"Przypnij wiadomość","Unpin_Message":"Odepnij wiadomość","Pinned_Messages":"Przypięte wiadomości","No_pinned_messages":"Brak przypiętych wiadomości"});
TAPi18n._registerServerTranslator("pl", namespace);                                                                 // 18
                                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/pt.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["pt"] = ["Portuguese (Portugal)","Português"];                                              // 8
if(_.isUndefined(TAPi18n.translations["pt"])) {                                                                     // 9
  TAPi18n.translations["pt"] = {};                                                                                  // 10
}                                                                                                                   // 11
                                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["pt"][namespace])) {                                                          // 13
  TAPi18n.translations["pt"][namespace] = {};                                                                       // 14
}                                                                                                                   // 15
                                                                                                                    // 16
_.extend(TAPi18n.translations["pt"][namespace], {"Message_AllowPinning":"Permitir Fixar Mensagem"});                // 17
TAPi18n._registerServerTranslator("pt", namespace);                                                                 // 18
                                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/ro.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                                              // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                                     // 9
  TAPi18n.translations["ro"] = {};                                                                                  // 10
}                                                                                                                   // 11
                                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                                          // 13
  TAPi18n.translations["ro"][namespace] = {};                                                                       // 14
}                                                                                                                   // 15
                                                                                                                    // 16
_.extend(TAPi18n.translations["ro"][namespace], {"Message_AllowPinning":"Permiteți fixarea mesajului","Message_AllowPinning_Description":"Permite fixarea mesajelor în oricare canal.","Message_AllowPinningByAnyone":"Permite oricui să fixeze mesaje.","Message_AllowPinningByAnyone_Description":"Permite oricui să fixeze mesaje pe un canal, nu doar administratorilor.","Pin_Message":"Fixează mesaj","Unpin_Message":"Anulați fixarea mesajului","Pinned_Messages":"Mesaje fixate","No_pinned_messages":"Nu sunt mesaje fixate"});
TAPi18n._registerServerTranslator("ro", namespace);                                                                 // 18
                                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/ru.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                                              // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                                     // 9
  TAPi18n.translations["ru"] = {};                                                                                  // 10
}                                                                                                                   // 11
                                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                                          // 13
  TAPi18n.translations["ru"][namespace] = {};                                                                       // 14
}                                                                                                                   // 15
                                                                                                                    // 16
_.extend(TAPi18n.translations["ru"][namespace], {"Message_AllowPinning":"Разрешить прикреплять сообщения","Message_AllowPinning_Description":"Разрешить прикреплять сообщения к любому из каналов","Message_AllowPinningByAnyone":"Разрешить всем закреплять сообщения.","Message_AllowPinningByAnyone_Description":"Разрешить всем закреплять сообщения к каналу (не только администраторам).","Pin_Message":"Прикрепить сообщение","Pinned_a_message":"Прикрепленное сообщение:","Unpin_Message":"Открепить сообщение","Pinned_Messages":"Прикрепленные сообщения","No_pinned_messages":"Нет прикрепленных сообщений"});
TAPi18n._registerServerTranslator("ru", namespace);                                                                 // 18
                                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/zh-TW.i18n.json                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["zh-TW"] = ["Chinese (Taiwan)","繁体中文（台湾）"];                                                 // 8
if(_.isUndefined(TAPi18n.translations["zh-TW"])) {                                                                  // 9
  TAPi18n.translations["zh-TW"] = {};                                                                               // 10
}                                                                                                                   // 11
                                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["zh-TW"][namespace])) {                                                       // 13
  TAPi18n.translations["zh-TW"][namespace] = {};                                                                    // 14
}                                                                                                                   // 15
                                                                                                                    // 16
_.extend(TAPi18n.translations["zh-TW"][namespace], {"Message_AllowPinningByAnyone":"允許任何人釘選訊息","Pin_Message":"釘選訊息","Unpin_Message":"解除釘選訊息","Pinned_Messages":"已被釘選訊息","No_pinned_messages":"尚未釘選訊息"});
TAPi18n._registerServerTranslator("zh-TW", namespace);                                                              // 18
                                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_message-pin/packages/rocketchat_message-pini18n/zh.i18n.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "project",                                                                                       // 2
    namespace = "project";                                                                                          // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                                                   // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                                     // 9
  TAPi18n.translations["zh"] = {};                                                                                  // 10
}                                                                                                                   // 11
                                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                                          // 13
  TAPi18n.translations["zh"][namespace] = {};                                                                       // 14
}                                                                                                                   // 15
                                                                                                                    // 16
_.extend(TAPi18n.translations["zh"][namespace], {"Message_AllowPinning":"允许信息固定","Message_AllowPinning_Description":"允许信息固定在频道顶部。","Message_AllowPinningByAnyone":"允许所有人固定信息","Message_AllowPinningByAnyone_Description":"允许管理员之外的人将信息固定在频道顶部。","Pin_Message":"固定信息","Pinned_a_message":"已固定信息：","Unpin_Message":"取消固定","Pinned_Messages":"已固定的信息","No_pinned_messages":"未固定的信息"});
TAPi18n._registerServerTranslator("zh", namespace);                                                                 // 18
                                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:message-pin'] = {};

})();

//# sourceMappingURL=rocketchat_message-pin.js.map
