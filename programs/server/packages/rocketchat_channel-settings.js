(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;

/* Package-scope variables */
var __coffeescriptShare, translations;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/server/functions/saveRoomType.coffee.js                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.saveRoomType = function(rid, roomType) {                                                                   // 1
  if (!Match.test(rid, String)) {                                                                                     // 2
    throw new Meteor.Error('invalid-rid');                                                                            // 3
  }                                                                                                                   //
  if (roomType !== 'c' && roomType !== 'p') {                                                                         // 5
    throw new Meteor.Error('invalid-room-type', 'Invalid_room_type', {                                                // 6
      roomType: roomType                                                                                              // 6
    });                                                                                                               //
  }                                                                                                                   //
  return RocketChat.models.Rooms.setTypeById(rid, roomType) && RocketChat.models.Subscriptions.updateTypeByRoomId(rid, roomType);
};                                                                                                                    // 1
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/server/functions/saveRoomTopic.coffee.js                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.saveRoomTopic = function(rid, roomTopic) {                                                                 // 1
  if (!Match.test(rid, String)) {                                                                                     // 2
    throw new Meteor.Error('invalid-rid');                                                                            // 3
  }                                                                                                                   //
  return RocketChat.models.Rooms.setTopicById(rid, roomTopic);                                                        // 5
};                                                                                                                    // 1
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/server/functions/saveRoomName.coffee.js                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.saveRoomName = function(rid, name) {                                                                       // 1
  var nameValidation, ref, room;                                                                                      // 2
  if (!Meteor.userId()) {                                                                                             // 2
    throw new Meteor.Error('invalid-user', "[methods] sendMessage -> Invalid user");                                  // 3
  }                                                                                                                   //
  room = RocketChat.models.Rooms.findOneById(rid);                                                                    // 2
  if ((ref = room.t) !== 'c' && ref !== 'p') {                                                                        // 7
    throw new Meteor.Error(403, 'Not allowed');                                                                       // 8
  }                                                                                                                   //
  if (!RocketChat.authz.hasPermission(Meteor.userId(), 'edit-room', rid)) {                                           // 10
    throw new Meteor.Error(403, 'Not allowed');                                                                       // 12
  }                                                                                                                   //
  try {                                                                                                               // 14
    nameValidation = new RegExp('^' + RocketChat.settings.get('UTF8_Names_Validation') + '$');                        // 15
  } catch (_error) {                                                                                                  //
    nameValidation = new RegExp('^[0-9a-zA-Z-_.]+$');                                                                 // 17
  }                                                                                                                   //
  if (!nameValidation.test(name)) {                                                                                   // 19
    throw new Meteor.Error('name-invalid', 'Invalid_room_name', {                                                     // 20
      channelName: name                                                                                               // 20
    });                                                                                                               //
  }                                                                                                                   //
  if (name === room.name) {                                                                                           // 24
    return;                                                                                                           // 25
  }                                                                                                                   //
  if (RocketChat.models.Rooms.findOneByName(name)) {                                                                  // 28
    throw new Meteor.Error('duplicate-name', 'Duplicate_channel_name', {                                              // 29
      channelName: name                                                                                               // 29
    });                                                                                                               //
  }                                                                                                                   //
  RocketChat.models.Rooms.setNameById(rid, name);                                                                     // 2
  RocketChat.models.Subscriptions.updateNameByRoomId(rid, name);                                                      // 2
  return name;                                                                                                        // 34
};                                                                                                                    // 1
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/server/methods/saveRoomSettings.coffee.js                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                      // 1
  saveRoomSettings: function(rid, setting, value) {                                                                   // 2
    var message, name, room;                                                                                          // 3
    if (!Match.test(rid, String)) {                                                                                   // 3
      throw new Meteor.Error('invalid-rid', 'Invalid room');                                                          // 4
    }                                                                                                                 //
    if (setting !== 'roomName' && setting !== 'roomTopic' && setting !== 'roomType' && setting !== 'default') {       // 6
      throw new Meteor.Error('invalid-settings', 'Invalid settings provided');                                        // 7
    }                                                                                                                 //
    if (!RocketChat.authz.hasPermission(Meteor.userId(), 'edit-room', rid)) {                                         // 9
      throw new Meteor.Error(503, 'Not authorized');                                                                  // 10
    }                                                                                                                 //
    if (setting === 'default' && !RocketChat.authz.hasPermission(this.userId, 'view-room-administration')) {          // 12
      throw new Meteor.Error(503, 'Not authorized');                                                                  // 13
    }                                                                                                                 //
    room = RocketChat.models.Rooms.findOneById(rid);                                                                  // 3
    if (room != null) {                                                                                               // 16
      switch (setting) {                                                                                              // 17
        case 'roomName':                                                                                              // 17
          name = RocketChat.saveRoomName(rid, value);                                                                 // 19
          RocketChat.models.Messages.createRoomRenamedWithRoomIdRoomNameAndUser(rid, name, Meteor.user());            // 19
          break;                                                                                                      // 18
        case 'roomTopic':                                                                                             // 17
          if (value !== room.topic) {                                                                                 // 22
            RocketChat.saveRoomTopic(rid, value);                                                                     // 23
            RocketChat.models.Messages.createRoomSettingsChangedWithTypeRoomIdMessageAndUser('room_changed_topic', rid, value, Meteor.user());
          }                                                                                                           //
          break;                                                                                                      // 21
        case 'roomType':                                                                                              // 17
          if (value !== room.t) {                                                                                     // 26
            RocketChat.saveRoomType(rid, value);                                                                      // 27
            if (value === 'c') {                                                                                      // 28
              message = TAPi18n.__('Channel');                                                                        // 29
            } else {                                                                                                  //
              message = TAPi18n.__('Private_Group');                                                                  // 31
            }                                                                                                         //
            RocketChat.models.Messages.createRoomSettingsChangedWithTypeRoomIdMessageAndUser('room_changed_privacy', rid, message, Meteor.user());
          }                                                                                                           //
          break;                                                                                                      // 25
        case 'default':                                                                                               // 17
          RocketChat.models.Rooms.saveDefaultById(rid, value);                                                        // 34
      }                                                                                                               // 17
    }                                                                                                                 //
    return true;                                                                                                      // 36
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/server/models/Messages.coffee.js                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.models.Messages.createRoomSettingsChangedWithTypeRoomIdMessageAndUser = function(type, roomId, message, user, extraData) {
  return this.createWithTypeRoomIdMessageAndUser(type, roomId, message, user, extraData);                             // 2
};                                                                                                                    // 1
                                                                                                                      //
RocketChat.models.Messages.createRoomRenamedWithRoomIdRoomNameAndUser = function(roomId, roomName, user, extraData) {
  return this.createWithTypeRoomIdMessageAndUser('r', roomId, roomName, user, extraData);                             // 5
};                                                                                                                    // 4
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/ar.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["ar"] = ["Arabic","العربية"];                                                                 // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                                                // 10
if(_.isUndefined(TAPi18n.translations["ar"])) {                                                                       // 11
  TAPi18n.translations["ar"] = {};                                                                                    // 12
}                                                                                                                     // 13
                                                                                                                      // 14
if(_.isUndefined(TAPi18n.translations["ar"][namespace])) {                                                            // 15
  TAPi18n.translations["ar"][namespace] = {};                                                                         // 16
}                                                                                                                     // 17
                                                                                                                      // 18
_.extend(TAPi18n.translations["ar"][namespace], {"Archive_Unarchive":"أرشفة/إلغاء الأرشفة","Channel":"قناة","Private_Group":"مجموعة خاصة","Save":"حفظ","Topic":"الموضوع","Room_Info":"معلومات الغرفة","room_changed_privacy":"تم تغيير نوع الغرفة إلى: <em>__room_type__</em> بواسطة <em>__user_by__</em>","room_changed_topic":"تم تغيير موضوع الغرفة إلى: <em>__room_topic__</em> بواسطة <em>__user_by__</em>","Room_topic_changed_successfully":"تغيير موضوع الغرفة بنجاح","Room_type_changed_successfully":"تم تغيير نوع الغرفة بنجاح"});
TAPi18n._registerServerTranslator("ar", namespace);                                                                   // 20
                                                                                                                      // 21
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/cs.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["cs"] = ["Czech","čeština‎"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["cs"])) {                                                                       // 9
  TAPi18n.translations["cs"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["cs"][namespace])) {                                                            // 13
  TAPi18n.translations["cs"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["cs"][namespace], {"Save":"Uložit"});                                                   // 17
TAPi18n._registerServerTranslator("cs", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/de.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["de"])) {                                                                       // 9
  TAPi18n.translations["de"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                                            // 13
  TAPi18n.translations["de"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["de"][namespace], {"Archive_Unarchive":"Archivieren / Wiederherstellen","Channel":"Kanal","Private_Group":"Private Gruppe","Save":"Speichern","Topic":"Thema","Room_archivation_state":"Status","Room_archivation_state_false":"aktiv","Room_archivation_state_true":"archiviert","Room_Info":"Raum","room_changed_privacy":"Der Raum wurde von <em>__user_by__</em> zum/r <em>__room_type__</em> geändert.","room_changed_topic":"Das Thema des Raums wurde von <em>__user_by__</em> zu <em>__room_topic__</em> geändert.","Room_topic_changed_successfully":"Das Thema des Raums wurde erfolgreich geändert.","Room_type_changed_successfully":"Der Raumtyp wurde erfolgreich geändert."});
TAPi18n._registerServerTranslator("de", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/el.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["el"] = ["Greek","Ελληνικά"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["el"])) {                                                                       // 9
  TAPi18n.translations["el"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["el"][namespace])) {                                                            // 13
  TAPi18n.translations["el"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["el"][namespace], {"Save":"Αποθήκευση"});                                               // 17
TAPi18n._registerServerTranslator("el", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/en.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
// integrate the fallback language translations                                                                       // 8
translations = {};                                                                                                    // 9
translations[namespace] = {"Archive_Unarchive":"Archive / Unarchive","Channel":"Channel","Private_Group":"Private Group","Save":"Save","Topic":"Topic","Room_archivation_state":"State","Room_archivation_state_false":"Active","Room_archivation_state_true":"Archived","Room_Info":"Room Info","room_changed_privacy":"Room type changed to: <em>__room_type__</em> by <em>__user_by__</em>","room_changed_topic":"Room topic changed to: <em>__room_topic__</em> by <em>__user_by__</em>","Room_topic_changed_successfully":"Room topic changed successfully","Room_type_changed_successfully":"Room type changed successfully"};
TAPi18n._loadLangFileObject("en", translations);                                                                      // 11
TAPi18n._registerServerTranslator("en", namespace);                                                                   // 12
                                                                                                                      // 13
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/es.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                                                        // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                                                       // 9
  TAPi18n.translations["es"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                                                            // 13
  TAPi18n.translations["es"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["es"][namespace], {"Channel":"Canal","Private_Group":"Grupo Privado","Save":"Guardar","Topic":"Tema","Room_Info":"Info de la Sala","room_changed_privacy":"Tipo de sala cambiado a:  <em>__room_type__</em> por<em>__user_by__</em>","room_changed_topic":"Tema del la sala cambiado a:  <em>__room_topic__</em> por <em>__user_by__</em>"});
TAPi18n._registerServerTranslator("es", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/fi.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                                                  // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                                                       // 9
  TAPi18n.translations["fi"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                                                            // 13
  TAPi18n.translations["fi"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["fi"][namespace], {"Archive_Unarchive":"Arkistoi / palauta arkistosta","Channel":"Kanava","Private_Group":"Privaattiryhmä","Save":"Tallenna","Topic":"Aihe","Room_Info":"Huoneen info","room_changed_privacy":"Huoneen tyyppi vaihdettu <em>__room_type__</em> käyttäjän <em>__user_by__</em> toimesta","room_changed_topic":"Huoneen aihe vaihdettu <em>__room_topic__</em> käyttäjän <em>__user_by__</em> toimesta","Room_topic_changed_successfully":"Huoneen aihe vaihdettu","Room_type_changed_successfully":"Huoneen tyyppi vaihdettu"});
TAPi18n._registerServerTranslator("fi", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/fr.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                                       // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                                       // 9
  TAPi18n.translations["fr"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                            // 13
  TAPi18n.translations["fr"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["fr"][namespace], {"Archive_Unarchive":"Archiver / Désarchiver","Channel":"Canal","Private_Group":"Groupe privé","Save":"Enregistrer","Topic":"Sujet","Room_archivation_state":"État","Room_archivation_state_false":"Actif","Room_archivation_state_true":"Archivé","Room_Info":"Informations sur le salon","room_changed_privacy":"Type du salon changé pour : <em>__room_type__</em> par <em>__user_by__</em>","room_changed_topic":"Sujet du salon changé pour : <em>__room_topic__</em> by <em>__user_by__</em>","Room_topic_changed_successfully":"Sujet du salon modifié avec succès","Room_type_changed_successfully":"Type du salon modifié avec succès"});
TAPi18n._registerServerTranslator("fr", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/he.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["he"] = ["Hebrew","עברית"];                                                                   // 8
if(_.isUndefined(TAPi18n.translations["he"])) {                                                                       // 9
  TAPi18n.translations["he"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["he"][namespace])) {                                                            // 13
  TAPi18n.translations["he"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["he"][namespace], {"Channel":"ערוץ","Private_Group":"קבוצה פרטית","Save":"שמירה","Topic":"נושא","Room_Info":"פרטי החדר","Room_topic_changed_successfully":"נושא החדר שונה בהצלחה","Room_type_changed_successfully":"סוג החדר שונה בהצלחה"});
TAPi18n._registerServerTranslator("he", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/hr.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["hr"] = ["Croatian","Hrvatski"];                                                              // 8
if(_.isUndefined(TAPi18n.translations["hr"])) {                                                                       // 9
  TAPi18n.translations["hr"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["hr"][namespace])) {                                                            // 13
  TAPi18n.translations["hr"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["hr"][namespace], {"Archive_Unarchive":"Arhiviraj / Dearhiviraj","Private_Group":"Privatna Grupa","Save":"Sačuvaj"});
TAPi18n._registerServerTranslator("hr", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/hu.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["hu"] = ["Hungarian","Magyar"];                                                               // 8
if(_.isUndefined(TAPi18n.translations["hu"])) {                                                                       // 9
  TAPi18n.translations["hu"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["hu"][namespace])) {                                                            // 13
  TAPi18n.translations["hu"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["hu"][namespace], {"Save":"Mentés"});                                                   // 17
TAPi18n._registerServerTranslator("hu", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/it.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["it"] = ["Italian","Italiano"];                                                               // 8
if(_.isUndefined(TAPi18n.translations["it"])) {                                                                       // 9
  TAPi18n.translations["it"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["it"][namespace])) {                                                            // 13
  TAPi18n.translations["it"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["it"][namespace], {"Save":"Salva"});                                                    // 17
TAPi18n._registerServerTranslator("it", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/ja.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                                                   // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                                       // 9
  TAPi18n.translations["ja"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                                            // 13
  TAPi18n.translations["ja"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["ja"][namespace], {"Archive_Unarchive":"アーカイブ / アーカイブ解除","Channel":"チャンネル","Private_Group":"プライベートグループ","Save":"保存","Topic":"トピック","Room_archivation_state":"状態","Room_archivation_state_false":"アクティブ","Room_archivation_state_true":"アーカイブ","Room_Info":"ルーム情報","room_changed_privacy":"ルームの種類を <em>__room_type__</em> へ変更しました。 by <em>__user_by__</em>","room_changed_topic":"ルームのトピックを <em>__room_topic__</em> へ変更しました。 by <em>__user_by__</em>","Room_topic_changed_successfully":"ルームのトピックは正常に変更されました","Room_type_changed_successfully":"ルームの種類は正常に変更されました"});
TAPi18n._registerServerTranslator("ja", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/km.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["km"] = ["Khmer","ភាសាខ្មែរ"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["km"])) {                                                                       // 9
  TAPi18n.translations["km"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["km"][namespace])) {                                                            // 13
  TAPi18n.translations["km"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["km"][namespace], {"Channel":"ប៉ុស្តិ៍","Private_Group":"ក្រុម​ឯកជន","Save":"រក្សាទុក","room_changed_privacy":"ប្រភេទបន្ទប់បានផ្លាស់ប្តូរទៅជា: <em>__room_type__</em> ដោយ <em>__user_by__</em>","room_changed_topic":"អត្ថបទបន្ទប់បានផ្លាស់ប្តូរទៅជា: <em>__room_topic__</em> ដោយ <em>__user_by__</em>"});
TAPi18n._registerServerTranslator("km", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/ko.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["ko"] = ["Korean","한국어"];                                                                     // 8
if(_.isUndefined(TAPi18n.translations["ko"])) {                                                                       // 9
  TAPi18n.translations["ko"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["ko"][namespace])) {                                                            // 13
  TAPi18n.translations["ko"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["ko"][namespace], {"Channel":"채널","Private_Group":"비밀 그룹","Save":"저장","room_changed_privacy":"방 종류가 <em>__user_by__</em>에서 <em>__room_type__</em>로 변경되었습니다.","room_changed_topic":"방 주제가 <em>__user_by__</em>에서 <em>__room_topic__</em>로 변경되었습니다."});
TAPi18n._registerServerTranslator("ko", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/ku.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["ku"] = ["ku","ku"];                                                                          // 8
if(_.isUndefined(TAPi18n.translations["ku"])) {                                                                       // 9
  TAPi18n.translations["ku"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["ku"][namespace])) {                                                            // 13
  TAPi18n.translations["ku"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["ku"][namespace], {"Save":"پاشەکەوت"});                                                 // 17
TAPi18n._registerServerTranslator("ku", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/ms-MY.i18n.json                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["ms-MY"] = ["ms-MY","ms-MY"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["ms-MY"])) {                                                                    // 9
  TAPi18n.translations["ms-MY"] = {};                                                                                 // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["ms-MY"][namespace])) {                                                         // 13
  TAPi18n.translations["ms-MY"][namespace] = {};                                                                      // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["ms-MY"][namespace], {"Save":"Simpan"});                                                // 17
TAPi18n._registerServerTranslator("ms-MY", namespace);                                                                // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/nl.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                                               // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                                                       // 9
  TAPi18n.translations["nl"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                                                            // 13
  TAPi18n.translations["nl"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["nl"][namespace], {"Archive_Unarchive":"Archief / Uit archief","Channel":"Kanaal","Private_Group":"Privé-groep","Save":"Bewaren","Topic":"Onderwerp","Room_archivation_state":"State","Room_archivation_state_false":"Aktief","Room_archivation_state_true":"Gearchiveerd","Room_Info":"Kamer info","room_changed_privacy":"Room type changed to: <em>__room_type__</em> by <em>__user_by__</em>","room_changed_topic":"Room topic changed to: <em>__room_topic__</em> by <em>__user_by__</em>","Room_topic_changed_successfully":"Kamer onderwerp succesvol gewijzigd","Room_type_changed_successfully":"Kamertype met succes gewijzigd"});
TAPi18n._registerServerTranslator("nl", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/pl.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                                                  // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                                                       // 9
  TAPi18n.translations["pl"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                                                            // 13
  TAPi18n.translations["pl"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["pl"][namespace], {"Archive_Unarchive":"Przeniesienie do archiwum","Channel":"Kanał","Private_Group":"Grupa Prywatna","Save":"Zapisz","Topic":"Temat","Room_Info":"Ustawienia pokoju","room_changed_privacy":"<em>__user_by__</em> zmienił(a) rodzaj pokoju na: <em>__room_type__</em>","room_changed_topic":"<em>__user_by__</em> zmienił(a) temat pokoju na: <em>__room_topic__</em>","Room_topic_changed_successfully":"Temat pokoju został zmieniony"});
TAPi18n._registerServerTranslator("pl", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/pt.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["pt"] = ["Portuguese (Portugal)","Português"];                                                // 8
if(_.isUndefined(TAPi18n.translations["pt"])) {                                                                       // 9
  TAPi18n.translations["pt"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["pt"][namespace])) {                                                            // 13
  TAPi18n.translations["pt"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["pt"][namespace], {"Channel":"Canal","Private_Group":"Grupo Privado","Save":"Salvar"});
TAPi18n._registerServerTranslator("pt", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/ro.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                                       // 9
  TAPi18n.translations["ro"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                                            // 13
  TAPi18n.translations["ro"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["ro"][namespace], {"Archive_Unarchive":"Arhivează / Dezarhivează","Channel":"Canal","Private_Group":"Grup privat","Save":"Salvează","Topic":"Subiect","Room_archivation_state":"Stare","Room_archivation_state_false":"Activă","Room_archivation_state_true":"Arhivată","Room_Info":"Info cameră","room_changed_privacy":"Tipul camerei schimbat în: <em>__room_type__</em> de către <em>__user_by__</em>","room_changed_topic":"Subiectul camerei schimbat în: <em>__room_topic__</em> de către <em>__user_by__</em>","Room_topic_changed_successfully":"Subiectul camerei a fost schimbat cu succes.","Room_type_changed_successfully":"Tipul de cameră a fost schimbat cu succes"});
TAPi18n._registerServerTranslator("ro", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/ru.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                                       // 9
  TAPi18n.translations["ru"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                                            // 13
  TAPi18n.translations["ru"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["ru"][namespace], {"Archive_Unarchive":"Удалить / Восстановить","Channel":"Публичный чат","Private_Group":"Приватный чат","Save":"Сохранить","Topic":"Тема","Room_archivation_state":"Статус","Room_archivation_state_false":"В сети","Room_archivation_state_true":"Удалено","Room_Info":"Информация чата","room_changed_privacy":"Тип чата изменен  <em>__user_by__</em> на: <em>__room_type__</em>","room_changed_topic":"Тема чата сменена <em>__user_by__</em> на: <em>__room_topic__</em>","Room_topic_changed_successfully":"Тема чата успешно изменена","Room_type_changed_successfully":"Тип чата успешно изменен"});
TAPi18n._registerServerTranslator("ru", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/sq.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["sq"] = ["Albanian","Shqip"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["sq"])) {                                                                       // 9
  TAPi18n.translations["sq"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["sq"][namespace])) {                                                            // 13
  TAPi18n.translations["sq"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["sq"][namespace], {"Save":"Ruaj"});                                                     // 17
TAPi18n._registerServerTranslator("sq", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/sr.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["sr"] = ["Serbian","Српски језик"];                                                           // 8
if(_.isUndefined(TAPi18n.translations["sr"])) {                                                                       // 9
  TAPi18n.translations["sr"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["sr"][namespace])) {                                                            // 13
  TAPi18n.translations["sr"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["sr"][namespace], {"Save":"Сачувај"});                                                  // 17
TAPi18n._registerServerTranslator("sr", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/sv.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["sv"] = ["Swedish","Svenska"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["sv"])) {                                                                       // 9
  TAPi18n.translations["sv"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["sv"][namespace])) {                                                            // 13
  TAPi18n.translations["sv"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["sv"][namespace], {"Channel":"Kanal","Private_Group":"Privat grupp","Save":"Spara","Topic":"Ämne","Room_archivation_state_false":"Aktiv","Room_archivation_state_true":"Arkiverad","Room_Info":"Rums info","room_changed_topic":"Rummets ämne ändrat till: <em>__room_topic__</em> by <em>__user_by__</em","Room_topic_changed_successfully":"Rummets ämne har ändrats","Room_type_changed_successfully":"Rummets typ har ändrats"});
TAPi18n._registerServerTranslator("sv", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/ta-IN.i18n.json                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["ta-IN"] = ["ta-IN","ta-IN"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["ta-IN"])) {                                                                    // 9
  TAPi18n.translations["ta-IN"] = {};                                                                                 // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["ta-IN"][namespace])) {                                                         // 13
  TAPi18n.translations["ta-IN"][namespace] = {};                                                                      // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["ta-IN"][namespace], {"Save":"சேமி"});                                                  // 17
TAPi18n._registerServerTranslator("ta-IN", namespace);                                                                // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/tr.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["tr"] = ["Turkish","Türkçe"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["tr"])) {                                                                       // 9
  TAPi18n.translations["tr"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["tr"][namespace])) {                                                            // 13
  TAPi18n.translations["tr"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["tr"][namespace], {"Save":"Kaydet"});                                                   // 17
TAPi18n._registerServerTranslator("tr", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/ug.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["ug"] = ["Uighur","Uyƣurqə"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["ug"])) {                                                                       // 9
  TAPi18n.translations["ug"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["ug"][namespace])) {                                                            // 13
  TAPi18n.translations["ug"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["ug"][namespace], {"Save":"ساقلاش"});                                                   // 17
TAPi18n._registerServerTranslator("ug", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/uk.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["uk"] = ["Ukrainian","Українська"];                                                           // 8
if(_.isUndefined(TAPi18n.translations["uk"])) {                                                                       // 9
  TAPi18n.translations["uk"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["uk"][namespace])) {                                                            // 13
  TAPi18n.translations["uk"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["uk"][namespace], {"Save":"Зберегти"});                                                 // 17
TAPi18n._registerServerTranslator("uk", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/zh-HK.i18n.json                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["zh-HK"] = ["Chinese (Hong Kong)","繁体中文（香港）"];                                                // 8
if(_.isUndefined(TAPi18n.translations["zh-HK"])) {                                                                    // 9
  TAPi18n.translations["zh-HK"] = {};                                                                                 // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["zh-HK"][namespace])) {                                                         // 13
  TAPi18n.translations["zh-HK"][namespace] = {};                                                                      // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["zh-HK"][namespace], {"Save":"保存"});                                                    // 17
TAPi18n._registerServerTranslator("zh-HK", namespace);                                                                // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/zh-TW.i18n.json                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["zh-TW"] = ["Chinese (Taiwan)","繁体中文（台湾）"];                                                   // 8
if(_.isUndefined(TAPi18n.translations["zh-TW"])) {                                                                    // 9
  TAPi18n.translations["zh-TW"] = {};                                                                                 // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["zh-TW"][namespace])) {                                                         // 13
  TAPi18n.translations["zh-TW"][namespace] = {};                                                                      // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["zh-TW"][namespace], {"Channel":"頻道","Private_Group":"私有群組","Save":"儲存"});              // 17
TAPi18n._registerServerTranslator("zh-TW", namespace);                                                                // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_channel-settings/packages/rocketchat_channel-settingsi18n/zh.i18n.json                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                                                     // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                                       // 9
  TAPi18n.translations["zh"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                                            // 13
  TAPi18n.translations["zh"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["zh"][namespace], {"Archive_Unarchive":"归档/取消归档","Channel":"频道","Private_Group":"私有组","Save":"保存","Topic":"话题","Room_archivation_state":"状态","Room_archivation_state_false":"活跃","Room_archivation_state_true":"已归档","Room_Info":"房间信息","room_changed_privacy":"<em>__user_by__</em>将房间类型修改为了：<em>__room_type__</em>","room_changed_topic":"<em>__user_by__</em>将房间主题修改为了：<em>__room_topic__</em>","Room_topic_changed_successfully":"已成功修改房间话题","Room_type_changed_successfully":"已成功修改房间类型"});
TAPi18n._registerServerTranslator("zh", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:channel-settings'] = {};

})();

//# sourceMappingURL=rocketchat_channel-settings.js.map
