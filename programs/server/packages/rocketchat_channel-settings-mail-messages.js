(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var moment = Package['momentjs:moment'].moment;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;

/* Package-scope variables */
var __coffeescriptShare, translations;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_channel-settings-mail-messages/server/lib/startup.coffee.js                         //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function() {                                                                                // 1
  var permission;                                                                                          // 2
  permission = {                                                                                           // 2
    _id: 'mail-messages',                                                                                  // 2
    roles: ['admin']                                                                                       // 2
  };                                                                                                       //
  return RocketChat.models.Permissions.upsert(permission._id, {                                            //
    $setOnInsert: permission                                                                               // 3
  });                                                                                                      //
});                                                                                                        // 1
                                                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_channel-settings-mail-messages/server/methods/mailMessages.coffee.js                //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                           // 1
  'mailMessages': function(data) {                                                                         // 2
    var email, emails, html, i, j, len, len1, localeFn, missing, name, ref, ref1, ref2, ref3, ref4, rfcMailPatternWithName, room, user, username;
    if (!Meteor.userId()) {                                                                                // 3
      throw new Meteor.Error('invalid-user', "[methods] mailMessages -> Invalid user");                    // 4
    }                                                                                                      //
    check(data, Match.ObjectIncluding({                                                                    // 3
      rid: String,                                                                                         // 6
      to_users: [String],                                                                                  // 6
      to_emails: String,                                                                                   // 6
      subject: String,                                                                                     // 6
      messages: [String],                                                                                  // 6
      language: String                                                                                     // 6
    }));                                                                                                   //
    room = Meteor.call('canAccessRoom', data.rid, Meteor.userId());                                        // 3
    if (!room) {                                                                                           // 9
      throw new Meteor.Error('invalid-room', "[methods] mailMessages -> Invalid room");                    // 10
    }                                                                                                      //
    if (!RocketChat.authz.hasPermission(Meteor.userId(), 'mail-messages')) {                               // 12
      throw new Meteor.Error('not-authorized');                                                            // 13
    }                                                                                                      //
    rfcMailPatternWithName = /^(?:.*<)?([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)(?:>?)$/;
    emails = _.compact(data.to_emails.trim().split(','));                                                  // 3
    missing = [];                                                                                          // 3
    if (data.to_users.length > 0) {                                                                        // 19
      ref = data.to_users;                                                                                 // 20
      for (i = 0, len = ref.length; i < len; i++) {                                                        // 20
        username = ref[i];                                                                                 //
        user = RocketChat.models.Users.findOneByUsername(username);                                        // 21
        if (user != null ? (ref1 = user.emails) != null ? (ref2 = ref1[0]) != null ? ref2.address : void 0 : void 0 : void 0) {
          emails.push(user.emails[0].address);                                                             // 23
        } else {                                                                                           //
          missing.push(username);                                                                          // 25
        }                                                                                                  //
      }                                                                                                    // 20
    }                                                                                                      //
    console.log(emails);                                                                                   // 3
    for (j = 0, len1 = emails.length; j < len1; j++) {                                                     // 27
      email = emails[j];                                                                                   //
      if (!rfcMailPatternWithName.test(email.trim())) {                                                    // 28
        throw new Meteor.Error('invalid-email', "[methods] mailMessages -> Invalid e-mail " + email);      // 29
      }                                                                                                    //
    }                                                                                                      // 27
    user = Meteor.user();                                                                                  // 3
    name = user.name;                                                                                      // 3
    email = (ref3 = user.emails) != null ? (ref4 = ref3[0]) != null ? ref4.address : void 0 : void 0;      // 3
    data.language = data.language.split('-').shift().toLowerCase();                                        // 3
    if (data.language !== 'en') {                                                                          // 37
      localeFn = Meteor.call('loadLocale', data.language);                                                 // 38
      if (localeFn) {                                                                                      // 39
        Function(localeFn)();                                                                              // 40
      }                                                                                                    //
    }                                                                                                      //
    html = "";                                                                                             // 3
    RocketChat.models.Messages.findByRoomIdAndMessageIds(data.rid, data.messages, {                        // 3
      sort: {                                                                                              // 43
        ts: 1                                                                                              // 43
      }                                                                                                    //
    }).forEach(function(message) {                                                                         //
      var dateTime;                                                                                        // 44
      dateTime = moment(message.ts).locale(data.language).format('L LT');                                  // 44
      return html += ("<p style='margin-bottom: 5px'><b>" + message.u.username + "</b> <span style='color: #aaa; font-size: 12px'>" + dateTime + "</span><br />") + RocketChat.Message.parse(message, data.language) + "</p>";
    });                                                                                                    //
    Meteor.defer(function() {                                                                              // 3
      Email.send({                                                                                         // 48
        to: emails,                                                                                        // 49
        from: RocketChat.settings.get('From_Email'),                                                       // 49
        replyTo: email,                                                                                    // 49
        subject: data.subject,                                                                             // 49
        html: html                                                                                         // 49
      });                                                                                                  //
      return console.log('Sending email to ' + emails.join(', '));                                         //
    });                                                                                                    //
    return {                                                                                               // 57
      success: true,                                                                                       // 57
      missing: missing                                                                                     // 57
    };                                                                                                     //
  }                                                                                                        //
});                                                                                                        //
                                                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_channel-settings-mail-messages/packages/rocketchat_channel-settings-mail-messagesi1 //
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
TAPi18n.languages_names["ar"] = ["Arabic","العربية"];                                                      // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                                     // 10
if(_.isUndefined(TAPi18n.translations["ar"])) {                                                            // 11
  TAPi18n.translations["ar"] = {};                                                                         // 12
}                                                                                                          // 13
                                                                                                           // 14
if(_.isUndefined(TAPi18n.translations["ar"][namespace])) {                                                 // 15
  TAPi18n.translations["ar"][namespace] = {};                                                              // 16
}                                                                                                          // 17
                                                                                                           // 18
_.extend(TAPi18n.translations["ar"][namespace], {"Additional_emails":"عناوين إلكترونية إضافية","Choose_messages":"اختر الرسائل","From":"من","Sending":"جار الإرسال...","Subject":"الموضوع"});
TAPi18n._registerServerTranslator("ar", namespace);                                                        // 20
                                                                                                           // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_channel-settings-mail-messages/packages/rocketchat_channel-settings-mail-messagesi1 //
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
if(_.isUndefined(TAPi18n.translations["de"])) {                                                            // 9
  TAPi18n.translations["de"] = {};                                                                         // 10
}                                                                                                          // 11
                                                                                                           // 12
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                                 // 13
  TAPi18n.translations["de"][namespace] = {};                                                              // 14
}                                                                                                          // 15
                                                                                                           // 16
_.extend(TAPi18n.translations["de"][namespace], {"Additional_emails":"Zusätzliche E-Mails","Body":"Body","Choose_messages":"Nachrichten auswählen","From":"Absender","Mail_Message_Invalid_emails":"Sie haben eine oder mehrere ungültige E-Mail-Adressen angegeben: %s","Mail_Message_Missing_to":"Sie müssen einen/mehrere Benutzer auswählen oder einen/mehrere E-Mail-Adressen durch Kommata getrennt angeben.","Mail_Message_No_messages_selected_select_all":"Sie haben keine Nachrichten ausgewählt. Möchten Sie <a href='#' class='select-all'>alle</a> sichtbaren Nachrichten auswählen?","Mail_Messages":"Nachrichten per E-Mail senden","Mail_Messages_Instructions":"Wählen Sie aus, welche Nachrichten Sie per E-Mail senden möchten, indem Sie die Nachrichten anklicken. ","Mail_Messages_Subject":"Hier ist ein ausgewählter Teil aus %s Nachrichten","Sending":"Senden...","Subject":"Betreff","To_users":"An die Benutzer","Your_email_has_been_queued_for_sending":"Ihre E-Mail wird in Kürze gesendet werden."});
TAPi18n._registerServerTranslator("de", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_channel-settings-mail-messages/packages/rocketchat_channel-settings-mail-messagesi1 //
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
translations[namespace] = {"Additional_emails":"Additional E-mails","Body":"Body","Choose_messages":"Choose messages","From":"From","Mail_Message_Invalid_emails":"You have provided one or more invalid e-mails: %s","Mail_Message_Missing_to":"You must select one or more users or provide one or more e-mail addresses, separated by commas.","Mail_Message_No_messages_selected_select_all":"You haven't selected any messages. Would you like to <a href='#' class='select-all'>select all</a> visible messages?","Mail_Messages":"Mail Messages","Mail_Messages_Instructions":"Choose which messages you want to send via e-mail by clicking the messages","Mail_Messages_Subject":"Here's a selected portion of %s messages","Sending":"Sending...","Subject":"Subject","To_users":"To Users","Your_email_has_been_queued_for_sending":"Your email has been queued for sending"};
TAPi18n._loadLangFileObject("en", translations);                                                           // 11
TAPi18n._registerServerTranslator("en", namespace);                                                        // 12
                                                                                                           // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_channel-settings-mail-messages/packages/rocketchat_channel-settings-mail-messagesi1 //
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
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                                       // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                                            // 9
  TAPi18n.translations["fi"] = {};                                                                         // 10
}                                                                                                          // 11
                                                                                                           // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                                                 // 13
  TAPi18n.translations["fi"][namespace] = {};                                                              // 14
}                                                                                                          // 15
                                                                                                           // 16
_.extend(TAPi18n.translations["fi"][namespace], {"Additional_emails":"Lisäsähköpostit","Body":"Runko","Choose_messages":"Valitse viestit","From":"Lähettäjä","Mail_Message_Invalid_emails":"Olet antanut virheellisiä sähköposteja: %s","Mail_Message_Missing_to":"Sinun tulee valita yksi tai useampi käyttäjä tai yksi tai useampi sähköpostiosoite, pilkuilla eroteltuna.","Mail_Message_No_messages_selected_select_all":"Et ole valinnut yhtään viestiä. Haluaisitko <a href='#' class='select-all'>valita kaikki</a> näkyvät viestit?","Mail_Messages":"Lähetä viestit sähköpostitse","Mail_Messages_Instructions":"Valitse, mitkä viestit haluat lähettää sähköpostitse klikkaamalla viestejä","Mail_Messages_Subject":"Tässä muutama viesti (%s viestiä)","Sending":"Lähetetään...","Subject":"Aihe","To_users":"Käyttäjille","Your_email_has_been_queued_for_sending":"Sähköpostisi on lähetysjonossa"});
TAPi18n._registerServerTranslator("fi", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_channel-settings-mail-messages/packages/rocketchat_channel-settings-mail-messagesi1 //
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
_.extend(TAPi18n.translations["fr"][namespace], {"Additional_emails":"Adresses e-mail additionnelles","Body":"Corps","Choose_messages":"Choisissez des messages","From":"De","Mail_Message_Invalid_emails":"Vous avez fourni une ou plusieurs adresses e-mails invalides : %s","Mail_Message_Missing_to":"Vous devez sélectionner un ou plusieurs utilisateurs ou fournir une ou plusieurs adresses e-mail, séparées par des virgules.","Mail_Message_No_messages_selected_select_all":"Vous n'avez sélectionné aucun message. Voulez-vous <a href='#' class='select-all'>sélectionner tous</a> les messages visibles ?","Mail_Messages":"Messages électroniques","Mail_Messages_Instructions":"Choisissez les messages que vous souhaitez envoyer par e-mail en cliquant dessus","Mail_Messages_Subject":"Voici une sélection de messages de \"%s\"","Sending":"Envoi en cours...","Subject":"Sujet","To_users":"Pour les utilisateurs","Your_email_has_been_queued_for_sending":"Votre e-mail a été placé dans la boîte d'envoi"});
TAPi18n._registerServerTranslator("fr", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_channel-settings-mail-messages/packages/rocketchat_channel-settings-mail-messagesi1 //
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
TAPi18n.languages_names["he"] = ["Hebrew","עברית"];                                                        // 8
if(_.isUndefined(TAPi18n.translations["he"])) {                                                            // 9
  TAPi18n.translations["he"] = {};                                                                         // 10
}                                                                                                          // 11
                                                                                                           // 12
if(_.isUndefined(TAPi18n.translations["he"][namespace])) {                                                 // 13
  TAPi18n.translations["he"][namespace] = {};                                                              // 14
}                                                                                                          // 15
                                                                                                           // 16
_.extend(TAPi18n.translations["he"][namespace], {"Choose_messages":"בחירת הודעות","To_users":"למשתמשים"});
TAPi18n._registerServerTranslator("he", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_channel-settings-mail-messages/packages/rocketchat_channel-settings-mail-messagesi1 //
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
TAPi18n.languages_names["hr"] = ["Croatian","Hrvatski"];                                                   // 8
if(_.isUndefined(TAPi18n.translations["hr"])) {                                                            // 9
  TAPi18n.translations["hr"] = {};                                                                         // 10
}                                                                                                          // 11
                                                                                                           // 12
if(_.isUndefined(TAPi18n.translations["hr"][namespace])) {                                                 // 13
  TAPi18n.translations["hr"][namespace] = {};                                                              // 14
}                                                                                                          // 15
                                                                                                           // 16
_.extend(TAPi18n.translations["hr"][namespace], {"Additional_emails":"Dodatni E-mailovi","Choose_messages":"Odaberite poruke","From":"Od","Sending":"Slanje ...","Subject":"Naslov","To_users":"Za korisnike"});
TAPi18n._registerServerTranslator("hr", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_channel-settings-mail-messages/packages/rocketchat_channel-settings-mail-messagesi1 //
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
_.extend(TAPi18n.translations["ja"][namespace], {"Additional_emails":"追加のメールアドレス","Choose_messages":"メッセージを選択","From":"送信元","Mail_Message_Invalid_emails":"ひとつ、またはいくつかの無効なメールアドレスが入力されました: %s","Mail_Message_Missing_to":"ひとつ、またはさらにユーザーを選択するか、メールアドレスをカンマ区切りで入力してください。","Mail_Message_No_messages_selected_select_all":"何もメッセージを選択しませんでした。表示されているメッセージの <a href='#' class='select-all'>すべてを選択</a> しますか?","Mail_Messages":"メッセージをメール","Mail_Messages_Instructions":"メールで送信したいメッセージをクリックして選択してください","Mail_Messages_Subject":"こちらは %s から選択されたメッセージです","Sending":"送信しています...","Subject":"件名","To_users":"宛先ユーザー","Your_email_has_been_queued_for_sending":"メールは送信待ちキューへ登録されました"});
TAPi18n._registerServerTranslator("ja", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_channel-settings-mail-messages/packages/rocketchat_channel-settings-mail-messagesi1 //
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
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                                    // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                                            // 9
  TAPi18n.translations["nl"] = {};                                                                         // 10
}                                                                                                          // 11
                                                                                                           // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                                                 // 13
  TAPi18n.translations["nl"][namespace] = {};                                                              // 14
}                                                                                                          // 15
                                                                                                           // 16
_.extend(TAPi18n.translations["nl"][namespace], {"Additional_emails":"Extra e-mails","Body":"Body","Choose_messages":"Kies berichten","From":"Afzender","Mail_Message_Invalid_emails":"Je hebt één of meer ongeldige e-mails gegeven: %s","Mail_Message_Missing_to":"U moet een of meer gebruikers selecteren of één of meer e-mailadressen invullen, gescheiden door komma's.","Mail_Message_No_messages_selected_select_all":"Je hebt geen bericten geslecteerd. Zou je <a href='#' class='select-all'>alle zichtbare berichten</a> willen selecteren?","Mail_Messages":"Mailberichten","Mail_Messages_Instructions":"Kies welke berichten je wil versturen via e-mail door te klikken op de berichten","Mail_Messages_Subject":"Hier is een geselecteerd deel van %s berichten","Sending":"Verzenden ...","Subject":"Onderwerp","To_users":"Aan Gebruikers","Your_email_has_been_queued_for_sending":"Uw e-mail staat in de wachtrij voor het verzenden"});
TAPi18n._registerServerTranslator("nl", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_channel-settings-mail-messages/packages/rocketchat_channel-settings-mail-messagesi1 //
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
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                                       // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                                            // 9
  TAPi18n.translations["pl"] = {};                                                                         // 10
}                                                                                                          // 11
                                                                                                           // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                                                 // 13
  TAPi18n.translations["pl"][namespace] = {};                                                              // 14
}                                                                                                          // 15
                                                                                                           // 16
_.extend(TAPi18n.translations["pl"][namespace], {"Choose_messages":"Wybierz wiadomości","Mail_Messages":"Wysyłanie wiadomości przez email"});
TAPi18n._registerServerTranslator("pl", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_channel-settings-mail-messages/packages/rocketchat_channel-settings-mail-messagesi1 //
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
_.extend(TAPi18n.translations["ro"][namespace], {"Additional_emails":"E-mail-uri suplimentare","Body":"Corp","Choose_messages":"Alege mesaje","From":"De la","Mail_Message_Invalid_emails":"Ați furnizat unul sau mai multe e-mailuri invalide: %s","Mail_Message_Missing_to":"Trebuie să furnizați una sau mai multe adrese de e-mail pentru 'Către', separate prin virgulă.","Mail_Message_No_messages_selected_select_all":"Nu ați selectat niciun mesaj. Aţi dori să <a href='#' class='select-all'>selctați toate</a> mesajele vizibile?","Mail_Messages":"Mesaje Email","Mail_Messages_Instructions":"Alegeți ce mesaje doriți să trimiteți prin e-mail făcând clic pe ele","Mail_Messages_Subject":"Iată o parte din %s mesaje","Sending":"Se trimite ...","Subject":"Subiect","To_users":"Către utilizatori","Your_email_has_been_queued_for_sending":"Emailul dumneavoastră a fost pus pe lista de trimis"});
TAPi18n._registerServerTranslator("ro", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_channel-settings-mail-messages/packages/rocketchat_channel-settings-mail-messagesi1 //
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
_.extend(TAPi18n.translations["ru"][namespace], {"Additional_emails":"Дополнительные электронные адреса","Body":"Основная часть","Choose_messages":"Выбрать сообщения","From":"От","Mail_Message_Invalid_emails":"Вы предоставили один или более недействительных адресов электронной почты: %s","Mail_Message_Missing_to":"Вы должны выбрать одного или нескольких пользователей или указать один или несколько адресов электронной почты, разделенных запятыми.","Mail_Message_No_messages_selected_select_all":"Вы не выбрали ни одного сообщения. Хотели бы Вы сделать <a href='#' class='select-all'>select all</a> сообщения видимыми?","Mail_Messages":"Сообщения электронной почты","Mail_Messages_Instructions":"Нажимая на сообщения, выберите, какие из них Вы хотите отправить по электронной почте","Mail_Messages_Subject":"Это выделенная часть %s сообщений.","Sending":"Отправка...","Subject":"Тема","To_users":"Пользователям","Your_email_has_been_queued_for_sending":"Ваш email был поставлен в очередь на отправку"});
TAPi18n._registerServerTranslator("ru", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_channel-settings-mail-messages/packages/rocketchat_channel-settings-mail-messagesi1 //
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
_.extend(TAPi18n.translations["sv"][namespace], {"Choose_messages":"Välj meddelanden ","From":"Från","Mail_Message_Invalid_emails":"Du har angett ett eller flera ogiltiga e-postmeddelanden: %s","Mail_Message_Missing_to":"Du måste välja en eller flera användare eller tillhandahålla en eller flera e-postadresser, separerade med kommatecken.\n","Mail_Message_No_messages_selected_select_all":"Du har inte valt några meddelanden. Vill du <a href='#' class='selest-all'>välja alla</a> synliga meddelanden?","Mail_Messages":"E-posta meddelanden","Mail_Messages_Instructions":"Välj vilka meddelanden du vill skicka via e-post genom att klicka på dem","Mail_Messages_Subject":"Här är en utvald del av %s meddelanden","Sending":"Skickar...","Subject":"Ämne","To_users":"Till användare","Your_email_has_been_queued_for_sending":"Ditt e-postmeddelande har köats för att skickas"});
TAPi18n._registerServerTranslator("sv", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_channel-settings-mail-messages/packages/rocketchat_channel-settings-mail-messagesi1 //
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
_.extend(TAPi18n.translations["zh"][namespace], {"Additional_emails":"其它 E-mail 地址","Body":"主体","Choose_messages":"选择信息","From":"来自于","Mail_Message_Invalid_emails":"你需要提供至少一个有效邮件地址：%s","Mail_Message_Missing_to":"必须选中一个以上的用户，或者提供一个以上的邮箱地址（邮箱地址之间使用逗号分隔）。","Mail_Message_No_messages_selected_select_all":"未选中任何消息。是否需要 <a href='#' class='select-all'>全选</a>可见的消息？","Mail_Messages":"发送邮件","Mail_Messages_Instructions":"点击以选择您希望通过邮件发送的消息","Mail_Messages_Subject":"%s 条消息中的一部分","Sending":"发送中","Subject":"标题","Your_email_has_been_queued_for_sending":"您的邮件已发送或正在发送队列中"});
TAPi18n._registerServerTranslator("zh", namespace);                                                        // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:channel-settings-mail-messages'] = {};

})();

//# sourceMappingURL=rocketchat_channel-settings-mail-messages.js.map
