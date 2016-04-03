(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var DDPRateLimiter = Package['ddp-rate-limiter'].DDPRateLimiter;
var FlowRouter = Package['kadira:flow-router'].FlowRouter;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;

/* Package-scope variables */
var __coffeescriptShare, Mailer, translations;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/lib/Mailer.coffee.js                                                                 //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                                                   // 1
                                                                                                                   //
Mailer = {};                                                                                                       // 1
                                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/server/startup.coffee.js                                                             //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function() {                                                                                        // 1
  return RocketChat.models.Permissions.upsert('access-mailer', {                                                   //
    $setOnInsert: {                                                                                                // 2
      _id: 'access-mailer',                                                                                        // 2
      roles: ['admin']                                                                                             // 2
    }                                                                                                              //
  });                                                                                                              //
});                                                                                                                // 1
                                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/server/models/Users.coffee.js                                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.models.Users.RocketMailUnsubscribe = function(_id, createdAt) {                                         // 3
  var affectedRows, query, update;                                                                                 // 5
  query = {                                                                                                        // 5
    _id: _id,                                                                                                      // 6
    createdAt: new Date(parseInt(createdAt))                                                                       // 6
  };                                                                                                               //
  update = {                                                                                                       // 5
    $set: {                                                                                                        // 10
      "mailer.unsubscribed": true                                                                                  // 11
    }                                                                                                              //
  };                                                                                                               //
  affectedRows = this.update(query, update);                                                                       // 5
  console.log('[Mailer:Unsubscribe]', _id, createdAt, new Date(parseInt(createdAt)), affectedRows);                // 5
  return affectedRows;                                                                                             // 17
};                                                                                                                 // 3
                                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/server/functions/sendMail.coffee.js                                                  //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Mailer.sendMail = function(from, subject, body, dryrun, query) {                                                   // 1
  var rfcMailPatternWithName, userQuery;                                                                           // 3
  rfcMailPatternWithName = /^(?:.*<)?([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)(?:>?)$/;
  if (!rfcMailPatternWithName.test(from)) {                                                                        // 6
    throw new Meteor.Error('invalid-from-address', TAPi18n.__('You_informed_an_invalid_FROM_address'));            // 7
  }                                                                                                                //
  if (body.indexOf('[unsubscribe]') === -1) {                                                                      // 9
    throw new Meteor.Error('missing-unsubscribe-link', TAPi18n.__('You_must_provide_the_unsubscribe_link'));       // 10
  }                                                                                                                //
  userQuery = {                                                                                                    // 3
    "mailer.unsubscribed": {                                                                                       // 12
      $exists: 0                                                                                                   // 12
    }                                                                                                              //
  };                                                                                                               //
  if (query) {                                                                                                     // 13
    userQuery = {                                                                                                  // 14
      $and: [userQuery, EJSON.parse(query)]                                                                        // 14
    };                                                                                                             //
  }                                                                                                                //
  if (dryrun) {                                                                                                    // 16
    return Meteor.users.find({                                                                                     //
      "emails.address": from                                                                                       // 17
    }).forEach(function(user) {                                                                                    //
      var email, fname, html, lname, ref, ref1;                                                                    // 19
      email = (ref = user.emails) != null ? (ref1 = ref[0]) != null ? ref1.address : void 0 : void 0;              // 19
      html = body.replace(/\[unsubscribe\]/g, Meteor.absoluteUrl(FlowRouter.path('mailer/unsubscribe/:_id/:createdAt', {
        _id: user._id,                                                                                             // 21
        createdAt: user.createdAt.getTime()                                                                        // 21
      })));                                                                                                        //
      html = html.replace(/\[name\]/g, user.name);                                                                 // 19
      fname = _.strLeft(user.name, ' ');                                                                           // 19
      lname = _.strRightBack(user.name, ' ');                                                                      // 19
      html = html.replace(/\[fname\]/g, fname);                                                                    // 19
      html = html.replace(/\[lname\]/g, lname);                                                                    // 19
      html = html.replace(/\[email\]/g, email);                                                                    // 19
      html = html.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');                                  // 19
      email = user.name + " <" + email + ">";                                                                      // 19
      if (rfcMailPatternWithName.test(email)) {                                                                    // 32
        Meteor.defer(function() {                                                                                  // 33
          return Email.send({                                                                                      //
            to: email,                                                                                             // 35
            from: from,                                                                                            // 35
            subject: subject,                                                                                      // 35
            html: html                                                                                             // 35
          });                                                                                                      //
        });                                                                                                        //
        return console.log('Sending email to ' + email);                                                           //
      }                                                                                                            //
    });                                                                                                            //
  } else {                                                                                                         //
    return Meteor.users.find({                                                                                     //
      "mailer.unsubscribed": {                                                                                     // 43
        $exists: 0                                                                                                 // 43
      }                                                                                                            //
    }).forEach(function(user) {                                                                                    //
      var email, fname, html, lname, ref, ref1;                                                                    // 45
      email = (ref = user.emails) != null ? (ref1 = ref[0]) != null ? ref1.address : void 0 : void 0;              // 45
      html = body.replace(/\[unsubscribe\]/g, Meteor.absoluteUrl(FlowRouter.path('mailer/unsubscribe/:_id/:createdAt', {
        _id: user._id,                                                                                             // 47
        createdAt: user.createdAt.getTime()                                                                        // 47
      })));                                                                                                        //
      html = html.replace(/\[name\]/g, user.name);                                                                 // 45
      fname = _.strLeft(user.name, ' ');                                                                           // 45
      lname = _.strRightBack(user.name, ' ');                                                                      // 45
      html = html.replace(/\[fname\]/g, fname);                                                                    // 45
      html = html.replace(/\[lname\]/g, lname);                                                                    // 45
      html = html.replace(/\[email\]/g, email);                                                                    // 45
      html = html.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');                                  // 45
      email = user.name + " <" + email + ">";                                                                      // 45
      if (rfcMailPatternWithName.test(email)) {                                                                    // 58
        Meteor.defer(function() {                                                                                  // 59
          return Email.send({                                                                                      //
            to: email,                                                                                             // 61
            from: from,                                                                                            // 61
            subject: subject,                                                                                      // 61
            html: html                                                                                             // 61
          });                                                                                                      //
        });                                                                                                        //
        return console.log('Sending email to ' + email);                                                           //
      }                                                                                                            //
    });                                                                                                            //
  }                                                                                                                //
};                                                                                                                 // 1
                                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/server/functions/unsubscribe.coffee.js                                               //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Mailer.unsubscribe = function(_id, createdAt) {                                                                    // 1
  if (_id && createdAt) {                                                                                          // 2
    return RocketChat.models.Users.RocketMailUnsubscribe(_id, createdAt) === 1;                                    // 3
  }                                                                                                                //
  return false;                                                                                                    // 4
};                                                                                                                 // 1
                                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/server/methods/sendMail.coffee.js                                                    //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                   // 1
  'Mailer.sendMail': function(from, subject, body, dryrun, query) {                                                // 2
    return Mailer.sendMail(from, subject, body, dryrun, query);                                                    // 4
  }                                                                                                                //
});                                                                                                                //
                                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/server/methods/unsubscribe.coffee.js                                                 //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                   // 1
  'Mailer:unsubscribe': function(_id, createdAt) {                                                                 // 2
    return Mailer.unsubscribe(_id, createdAt);                                                                     // 3
  }                                                                                                                //
});                                                                                                                //
                                                                                                                   //
DDPRateLimiter.addRule({                                                                                           // 1
  type: 'method',                                                                                                  // 7
  name: 'Mailer:unsubscribe',                                                                                      // 7
  connectionId: function() {                                                                                       // 7
    return true;                                                                                                   // 9
  }                                                                                                                //
}, 1, 60000);                                                                                                      //
                                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/ar.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["ar"] = ["Arabic","العربية"];                                                              // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                                             // 10
if(_.isUndefined(TAPi18n.translations["ar"])) {                                                                    // 11
  TAPi18n.translations["ar"] = {};                                                                                 // 12
}                                                                                                                  // 13
                                                                                                                   // 14
if(_.isUndefined(TAPi18n.translations["ar"][namespace])) {                                                         // 15
  TAPi18n.translations["ar"][namespace] = {};                                                                      // 16
}                                                                                                                  // 17
                                                                                                                   // 18
_.extend(TAPi18n.translations["ar"][namespace], {"Dry_run":"تنفيذ تجريبي","Dry_run_description":"سيتم إرسال رسالة بريدية واحدة إلى نفس العنوان الموجود في خانة \"من\". تأكد من كون ذلك العنوان البريدي فعال","Email_from":"من","Email_subject":"الموضوع","Send_email":"إرسال البريد الإلكتروني","The_emails_are_being_sent":"يتم إرسال رسائل البريد الإلكتروني.","You_have_successfully_unsubscribed":"لقد تم إلغاء اشتراكك بنجاح من القائمة البريدية لدينا.","You_must_provide_the_unsubscribe_link":"يجب توفير رابط [إلغاء الاشتراك]."});
TAPi18n._registerServerTranslator("ar", namespace);                                                                // 20
                                                                                                                   // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/de.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                                              // 8
if(_.isUndefined(TAPi18n.translations["de"])) {                                                                    // 9
  TAPi18n.translations["de"] = {};                                                                                 // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                                         // 13
  TAPi18n.translations["de"][namespace] = {};                                                                      // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["de"][namespace], {"From_email_warning":"<b>Warnung</b>: Der <b>Absender</b> ist Gegenstand deiner Mail-Server-Einstellungen.","From_email_is_required":"Ein Absender muss angegeben werden.","Dry_run":"Probelauf","Dry_run_description":"Es wird nur eine E-Mail an den Empfänger gesendet. Die E-Mail muss einem gültigen Benutzer gehören.","Email_from":"Absender","Email_subject":"Betreff","Email_body":"Nachricht","Mailer":"Mailer","Mailer_body_tags":"Sie <b>müssen</b> [unsubscribe] verwenden, um einen Link zum Abmelden aus dem Verteiler zur Verfügung zu stellen. <br /> Sie können [name] für den Vor- und Nachnamen, [fname] für den Vornamen oder [lname] für den Nachnamen des Benutzers verwenden. <br />Ebenfalls können Sie [email] verwenden, um die E-Mail-Adresse des Benutzers anzugeben.","Query":"Abfrage","Query_description":"Zusätzliche Bedingungen für die Bestimmung, an welche Benutzer die E-Mails gesendet werden sollen. Ausgetragene Benutzer werden automatisch aus der Abfrage entfernt. Es muss ein gültiger JSON sein. Beispiel: \"{\"createdAt\":{\"$gt\":{\"$date\": \"2015-01-01T00:00:00.000Z\"}}}\"","Send_email":"E-Mail senden","The_emails_are_being_sent":"Die E-Mails werden gesendet.","You_have_successfully_unsubscribed":"Sie haben sich erfolgreich von unserem Verteiler abgemeldet.","You_informed_an_invalid_FROM_address":"Sie haben eine ungültige E-Mail-Adresse als Empfänger angegeben.","You_must_provide_the_unsubscribe_link":"Sie müssen einen Link zum Abmelden vom Verteiler angeben."});
TAPi18n._registerServerTranslator("de", namespace);                                                                // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/en.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
// integrate the fallback language translations                                                                    // 8
translations = {};                                                                                                 // 9
translations[namespace] = {"From_email_warning":"<b>Warning</b>: The field <b>From</b> is subject to your mail server settings.","From_email_is_required":"From e-mail is required","Dry_run":"Dry run","Dry_run_description":"Will only send one e-mail, to the same address as in From. The e-mail must belong to a valid user.","Email_from":"From","Email_subject":"Subject","Email_body":"E-mail body","Mailer":"Mailer","Mailer_body_tags":"You <b>must</b> use [unsubscribe] for the unsubscription link.<br />You may use [name], [fname], [lname] for the user's full name, first name or last name, respectively.<br />You may use [email] for the user's e-mail.","Query":"Query","Query_description":"Additional conditions for determining which users to send the e-mail to. Unsubscribed users are automatically removed from the query. It must be a valid JSON. Example: \"{\"createdAt\":{\"$gt\":{\"$date\": \"2015-01-01T00:00:00.000Z\"}}}\"","Send_email":"Send E-mail","The_emails_are_being_sent":"The e-mails are being sent.","You_have_successfully_unsubscribed":"You have successfully unsubscribed from our Mailling List.","You_informed_an_invalid_FROM_address":"You informed an invalid FROM address.","You_must_provide_the_unsubscribe_link":"You must provide the [unsubscribe] link."};
TAPi18n._loadLangFileObject("en", translations);                                                                   // 11
TAPi18n._registerServerTranslator("en", namespace);                                                                // 12
                                                                                                                   // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/es.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                                                     // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                                                    // 9
  TAPi18n.translations["es"] = {};                                                                                 // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                                                         // 13
  TAPi18n.translations["es"][namespace] = {};                                                                      // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["es"][namespace], {"From_email_warning":"<b>Advertencia</b>: El campo <b>De</b> esta sujeto a la configuración en tu servidor de correo.","From_email_is_required":"El campo De del correo electronico es requerido","Dry_run":"Funcionamiento en seco","Dry_run_description":"Se enviara únicamente un correo electronico, a la misma dirección establecida en el campo De. El correo electronico debe pertenecer a un usuario valido.","Email_from":"De","Email_subject":"Asunto","Email_body":"Cuerpo del Correo Electronico","Mailer":"Remitente","Query":"Consulta","Query_description":"Condiciones adicionales para determinar a que usuarios enviar el correo electronico. Los usuarios que optaron por cancelar su suscripción serán eliminados de la consulta. Debe ser JSON valido. Ejemplo: \"{\"createdAt\":{\"$gt\":{\"$date\": \"2015-01-01T00:00:00.000Z\"}}}\"","Send_email":"Enviar Correo Electronico","The_emails_are_being_sent":"Los correos electrónicos están siendo enviados","You_have_successfully_unsubscribed":"Se ha dado de baja correctamente de nuestra lista de Distribución de Correos","You_informed_an_invalid_FROM_address":"Ha ingresado una dirección invalida en el campo De"});
TAPi18n._registerServerTranslator("es", namespace);                                                                // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/fi.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                                               // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                                                    // 9
  TAPi18n.translations["fi"] = {};                                                                                 // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                                                         // 13
  TAPi18n.translations["fi"][namespace] = {};                                                                      // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["fi"][namespace], {"From_email_warning":"<b>Varoitus</b>: Kenttä <b>Lähettäjä</b> tulee olla sähköpostipalvelimesi hyväksymä.","From_email_is_required":"Lähettäjän sähköposti vaaditaan","Dry_run":"Kuivaharjoitus","Dry_run_description":"Lähettää vain yhden sähköpostin, lähettäjän osoitteeseen. Osoite tulee kuulua olemassaolevalle käyttäjälle.","Email_from":"Lähettäjä","Email_subject":"Aihe","Email_body":"Viestin runko","Mailer":"Postittaja","Mailer_body_tags":"Sinun <b>tulee</b> käyttää [unsubscribe] postituslistalta poistumislinkkinä.<br />Voit käyttää [name], [fname], [lname] käyttäjän koko nimen, etunimen tai sukunimen paikalla.<br />Voit käyttää [email] käyttäjän sähköpostin paikalla.","Query":"Kysely","Query_description":"Lisämäärittelyt, joiden perusteella määritellään kenelle lähetetään sähköposteja. Postituslistalta poistuneita ei koskaan sisällytetä vastaanottajiin. Kyselymäärityksen tulee olla validia JSONia. Esimerkiksi:  \"{\"createdAt\":{\"$gt\":{\"$date\": \"2015-01-01T00:00:00.000Z\"}}}\"","Send_email":"Lähetä sähköposti","The_emails_are_being_sent":"Sähköposteja lähetetään.","You_have_successfully_unsubscribed":"Sinut on poistettu onnistuneesti postituslistaltamme.","You_informed_an_invalid_FROM_address":"Virheellinen lähettäjän osoite.","You_must_provide_the_unsubscribe_link":"Sinun on annettava [unsubscribe] -linkki."});
TAPi18n._registerServerTranslator("fi", namespace);                                                                // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/fr.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                                    // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                                    // 9
  TAPi18n.translations["fr"] = {};                                                                                 // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                         // 13
  TAPi18n.translations["fr"][namespace] = {};                                                                      // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["fr"][namespace], {"From_email_warning":"<b>Attention</b> : le champ <b>Expéditeur</b> est déterminé par les paramètres de votre serveur mail.","From_email_is_required":"Le champ \"Expéditeur\" est requis.","Dry_run":"Essai à vide","Dry_run_description":"Envoi un unique e-mail, à l'adresse de l'expéditeur. L'adresse e-mail doit appartenir à un utilisateur valide.","Email_from":"De","Email_subject":"Sujet","Email_body":"Corps du message","Mailer":"Envoi d'e-mail","Mailer_body_tags":"Vous <b>devez</b> utiliser [unsubscribe] pour le lien de désinscription.<br />Vous pouvez utiliser [name], [fname], [lname] pour le nom complet de l'utilisateur, le prénom et le nom de famille respectivement.<br />Vous pouvez utiliser [email] pour l'adresse e-mail de l'utilisateur.","Query":"Requête","Query_description":"Conditions additionnelles pour déterminer à quels utilisateurs l'e-mail sera envoyé. Les utilisateurs désinscrits sont automatiquement retirés de la requête. La requête doit être au format JSON. Exemple : \"{\"createdAt\":{\"$gt\":{\"$date\": \"2015-01-01T00:00:00.000Z\"}}}\"","Send_email":"Envoyer l'e-mail","The_emails_are_being_sent":"Les e-mails sont en cours d'envoi.","You_have_successfully_unsubscribed":"Vous êtes désabonné avec succès de notre liste de diffusion.","You_informed_an_invalid_FROM_address":"Vous avez entré un expéditeur invalide (champ De).","You_must_provide_the_unsubscribe_link":"Vous devez fournir le lien de désinscription [unsubscribe]."});
TAPi18n._registerServerTranslator("fr", namespace);                                                                // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/hr.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["hr"] = ["Croatian","Hrvatski"];                                                           // 8
if(_.isUndefined(TAPi18n.translations["hr"])) {                                                                    // 9
  TAPi18n.translations["hr"] = {};                                                                                 // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["hr"][namespace])) {                                                         // 13
  TAPi18n.translations["hr"][namespace] = {};                                                                      // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["hr"][namespace], {"Email_from":"Od","Send_email":"Pošalji e-mail","The_emails_are_being_sent":"E-mailovi su poslani."});
TAPi18n._registerServerTranslator("hr", namespace);                                                                // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/ja.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                                    // 9
  TAPi18n.translations["ja"] = {};                                                                                 // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                                         // 13
  TAPi18n.translations["ja"][namespace] = {};                                                                      // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["ja"][namespace], {"From_email_warning":"<b>注意</b>: <b>送信元</b> 項目は、メールサーバーの設定の対象になります。","From_email_is_required":"送信元メールアドレスは必須です","Dry_run":"予行練習","Dry_run_description":"送信元のアドレスへ1通のメールを送信します。アドレスは、登録されているユーザーのものでなければなりません。","Email_from":"送信元","Email_subject":"件名","Email_body":"メール本文","Mailer":"メーラー","Mailer_body_tags":"[unsubscribe] を購読解除のリンクとして<b>使わなければなりません</b>。<br />ユーザーのフルネームに [name], [fname], [lname] を使用できます。姓 または 名 にも対応しています。<br />メールアドレスには、 [email] を使用できます。","Query":"条件クエリー","Query_description":"メール送信先のユーザーを決める追加条件。購読解除されたユーザーは、自動的に条件から除外されます。条件は、有効なJSON形式でなければなりません。例:  \"{\"createdAt\":{\"$gt\":{\"$date\": \"2015-01-01T00:00:00.000Z\"}}}\"","Send_email":"メール送信","The_emails_are_being_sent":"メールは送信されました","You_have_successfully_unsubscribed":"メーリングリストから正常に購読解除されました。","You_informed_an_invalid_FROM_address":"入力された送信元アドレスは、正しい書式ではありません。","You_must_provide_the_unsubscribe_link":"[unsubscribe] リンクを入力してください。 "});
TAPi18n._registerServerTranslator("ja", namespace);                                                                // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/km.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["km"] = ["Khmer","ភាសាខ្មែរ"];                                                             // 8
if(_.isUndefined(TAPi18n.translations["km"])) {                                                                    // 9
  TAPi18n.translations["km"] = {};                                                                                 // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["km"][namespace])) {                                                         // 13
  TAPi18n.translations["km"][namespace] = {};                                                                      // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["km"][namespace], {"From_email_warning":"<b>ព្រមាន៖</b>ចន្លោះ<b>FROM</b> គឺជាចំណងជើងទៅម៉ាស៊ីនមេអ៊ីមែលរបស់អ្នកកំណត់។","From_email_is_required":"From អ៊ីមែលគឺត្រូវបំពេញ","Email_from":"ពី","Email_subject":"ប្រធានបទ","Email_body":"រាងកាយអ៊ីមែល","Mailer_body_tags":"អ្នក<b>ត្រូវ</b>ប្រើប្រាស់ [unsubcribe] សម្រាប់ដកដំណភ្ជាប់ជាវជាប្រចាំ។<br/> អ្នកប្រហែលជាត្រូវប្រើប្រាស់ [name], [fname], [lname] ធ្វើជាឈ្មោះពេញរបស់អ្នកប្រើប្រាស់។<br/> អ្នកប្រហែលជាប្រើ [email] ធ្វើជាអ៊ីមែលរបស់អ្នកប្រើប្រាស់។","Send_email":"ផ្ញើ​រ​អ៊ី​ម៉ែ​ល","The_emails_are_being_sent":"នេះ​អ៊ីមែល​ត្រូវ​បាន​បញ្ជូន​។","You_have_successfully_unsubscribed":"អ្នក​បាន unsubscribed ដោយ​ជោគជ័យ​ពី​បញ្ជី Mailling របស់​យើង​។","You_informed_an_invalid_FROM_address":"អ្នកបានបំពេញមិនត្រឹមត្រូវក្នុងចន្លោះ FROM អាស័យដ្ឋាន","You_must_provide_the_unsubscribe_link":"អ្នកត្រូវតែផ្ដល់តំណភ្ជាប់ [unsubscribe] ។"});
TAPi18n._registerServerTranslator("km", namespace);                                                                // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/ko.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["ko"] = ["Korean","한국어"];                                                                  // 8
if(_.isUndefined(TAPi18n.translations["ko"])) {                                                                    // 9
  TAPi18n.translations["ko"] = {};                                                                                 // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["ko"][namespace])) {                                                         // 13
  TAPi18n.translations["ko"][namespace] = {};                                                                      // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["ko"][namespace], {"Email_from":"보내는 이","Email_subject":"제목","Email_body":"이메일 본문","Send_email":"이메일 보내기","The_emails_are_being_sent":"이메일을 전송 중입니다.","You_have_successfully_unsubscribed":"지금부터 당신은 메일링 리스트를 수신하지 않습니다."});
TAPi18n._registerServerTranslator("ko", namespace);                                                                // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/ku.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["ku"] = ["ku","ku"];                                                                       // 8
if(_.isUndefined(TAPi18n.translations["ku"])) {                                                                    // 9
  TAPi18n.translations["ku"] = {};                                                                                 // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["ku"][namespace])) {                                                         // 13
  TAPi18n.translations["ku"][namespace] = {};                                                                      // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["ku"][namespace], {"Dry_run":"بۆ خۆشی","Dry_run_description":"تەنها یەک ئیمەیڵ ئەنێرم، بۆ هەمان ئیمەیڵی ناو فۆرمەکە. ئیمەیڵەکە ئەبێ دروست بێت.","Mailer":"نامەبەر","Query":"داواکاری"});
TAPi18n._registerServerTranslator("ku", namespace);                                                                // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/nl.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                                            // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                                                    // 9
  TAPi18n.translations["nl"] = {};                                                                                 // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                                                         // 13
  TAPi18n.translations["nl"][namespace] = {};                                                                      // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["nl"][namespace], {"From_email_warning":"<b>Waarschuwing</b>: Het veld <b>Afzender</b> is afhankelijk van je mail mail server instellingen.","From_email_is_required":"Afzender e-mailadres is verplicht","Dry_run":"Testrun","Dry_run_description":"Zal slechts één e-mail sturen naar hetzelfde adres als in afzenderveld. De e-mail moet horen bij een geldige gebruiker.","Email_from":"Afzender","Email_subject":"Onderwerp","Email_body":"E-mail tekst","Mailer":"Mailer","Mailer_body_tags":"Je <b>moet</b> [unsubscribe] gebruiken voor een unsubscribe link.<br />Je kunt [name], [fname], [lname] gebruiken voor een gebruikers volledige naam, voorname of achtername.<br />Je kunt [email] gebruiken voor het email adres van de gebruiker.","Query":"Query/vraag","Query_description":"Additional conditions for determining which users to send the e-mail to. Unsubscribed users are automatically removed from the query. It must be a valid JSON. Example: \"{\"createdAt\":{\"$gt\":{\"$date\": \"2015-01-01T00:00:00.000Z\"}}}\"","Send_email":"Verstuur e-mail","The_emails_are_being_sent":"De e-mails worden verzonden.","You_have_successfully_unsubscribed":"U bent uitgeschreven van onze mailinglijst.","You_informed_an_invalid_FROM_address":"You informed an invalid FROM address.","You_must_provide_the_unsubscribe_link":"Je moet een [unsubscribe] link toevoegen."});
TAPi18n._registerServerTranslator("nl", namespace);                                                                // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/pl.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                                               // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                                                    // 9
  TAPi18n.translations["pl"] = {};                                                                                 // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                                                         // 13
  TAPi18n.translations["pl"][namespace] = {};                                                                      // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["pl"][namespace], {"From_email_warning":"<b>Uwaga</b>: Pole <b>Od</b> może być uzależnione od ustawień serwera.","From_email_is_required":"Adres nadawcy jest wymagany","Email_from":"Od","Email_subject":"Temat","Email_body":"Treść wiadomości","Mailer":"Wyślij email użytkownikom","Mailer_body_tags":"<b>Musisz</b> użyć znacznika [unsubscribe] aby zawrzeć w treści odnośnik do rezygnacji z subskrypcji.<br />Możesz użyć znaczników [name], [fname], [lname] by wstawić odpowiednio pełną nazwę użytkownika, jego imię, nazwisko.<br />\nMożesz użyć znacznika [email] by wstawić adres email użytkownika.","Query":"Zapytanie","Send_email":"Wyślij wiadomość","The_emails_are_being_sent":"Wiadomości e-mail są wysyłane.","You_have_successfully_unsubscribed":"Twój email został usunięty z naszej listy powiadomień.","You_informed_an_invalid_FROM_address":"Adres nadawcy jest nieprawidłowy","You_must_provide_the_unsubscribe_link":"Musisz wstawić w treści znacznik [unsubscribe]."});
TAPi18n._registerServerTranslator("pl", namespace);                                                                // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/pt.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["pt"] = ["Portuguese (Portugal)","Português"];                                             // 8
if(_.isUndefined(TAPi18n.translations["pt"])) {                                                                    // 9
  TAPi18n.translations["pt"] = {};                                                                                 // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["pt"][namespace])) {                                                         // 13
  TAPi18n.translations["pt"][namespace] = {};                                                                      // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["pt"][namespace], {"Email_from":"De","Email_subject":"Assunto","Email_body":"Corpo do E-mail","Mailer":"Mailer","Send_email":"Enviar E-mail","You_have_successfully_unsubscribed":"A partir de agora você não está mais cadastrado em nossa lista de e-mails."});
TAPi18n._registerServerTranslator("pt", namespace);                                                                // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/ro.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                                             // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                                    // 9
  TAPi18n.translations["ro"] = {};                                                                                 // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                                         // 13
  TAPi18n.translations["ro"][namespace] = {};                                                                      // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["ro"][namespace], {"From_email_warning":"b>Atenție</b>:Câmpul <b>De la</b> depinde de setările serverului dumneavoastră de email.","From_email_is_required":"E nevoie de adresa de email \"De la\"","Dry_run":"Dry run","Dry_run_description":"Va trimite un singur e-mail, la adresa specificată în CĂTRE. E-mail-ul trebuie să aparțină unui utilizator valid.","Email_from":"De la","Email_subject":"Subiect","Email_body":"Corp E-mail","Mailer":"Mailer","Mailer_body_tags":"<b>Trebuie</b> să folosiți [unsubscribe] pentru link-ul de unsuscribe.<br />Puteți utiliza [name], [fname], [lname] pentru numele întreg, prenume respectiv nume.<br />Puteți folosi [email] pentru e-mailul utilizatorului.","Query":"Interogare","Query_description":"Condiții suplimentare pentru a determina către ce utilizatori se trimite e-mail. Utilizatorii dezabonați sunt eliminați automat din interogare. Trebuie să fie un JSON valid. Exemplu: \"{\" createdAt \": {\" $ GT \": {\" $ data \":\" 2015-01-01T00: 00: 00.000Z \"}}}\"","Send_email":"Trimite email","The_emails_are_being_sent":"E-mail-urile sunt trimise.","You_have_successfully_unsubscribed":"V-ați dezabonat cu succes din lista noastră de email.","You_informed_an_invalid_FROM_address":"Ați utilizat o adresă DE LA invalidă.","You_must_provide_the_unsubscribe_link":"Trebuie să furnizați link-ul de [unsubscribe]."});
TAPi18n._registerServerTranslator("ro", namespace);                                                                // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/ru.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                                             // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                                    // 9
  TAPi18n.translations["ru"] = {};                                                                                 // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                                         // 13
  TAPi18n.translations["ru"][namespace] = {};                                                                      // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["ru"][namespace], {"From_email_warning":"<b>Внимание</b>: Поле <b>От</b> зависит от настроек Вашего почтового сервера.","From_email_is_required":"Требуется адрес отправителя","Dry_run":"Пробный запуск","Dry_run_description":"Мы отправим только один e-mail на адрес, указанный в поле \"От\". E-mail адрес должен принадлежать действительному пользователю.","Email_from":"От","Email_subject":"Тема","Email_body":"Тело сообщения","Mailer":"Отправитель","Mailer_body_tags":"Для того, чтобы отписаться, Вам <b>необходимо</b> перейти [по ссылке]. <br />Вы можете использовать [имя], [фамилию] и [отчество] в качестве полного имени пользователя.<br />Вы можете использовать [email] в качестве электронной почты пользователя.","Query":"Запрос","Query_description":"Дополнительные условия для определения того, каким пользователям отправлять электронную почту. Пользователи, не получающие рассылку, автоматически удалены из запроса. Формат JSON должен быть действителен. Например: \"{\"createdAt\":{\"$gt\":{\"$date\": \"2015-01-01T00:00:00.000Z\"}}}\"","Send_email":"Отправить письмо","The_emails_are_being_sent":"Письма отправляются.","You_have_successfully_unsubscribed":"Вы успешно отписаны от нашей почтовой рассылки.","You_informed_an_invalid_FROM_address":"Вы сообщили неверный адрес отправителя.","You_must_provide_the_unsubscribe_link":"Для того, чтобы [отписаться], Вы должны предоставить эту ссылку."});
TAPi18n._registerServerTranslator("ru", namespace);                                                                // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/sv.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["sv"] = ["Swedish","Svenska"];                                                             // 8
if(_.isUndefined(TAPi18n.translations["sv"])) {                                                                    // 9
  TAPi18n.translations["sv"] = {};                                                                                 // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["sv"][namespace])) {                                                         // 13
  TAPi18n.translations["sv"][namespace] = {};                                                                      // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["sv"][namespace], {"From_email_is_required":"Från e-post krävs","Dry_run_description":"Kommer endast att skicka ett e-postmeddelande, till samma adress som i Från. E-postadressen måste höra till en giltig användare.","Email_from":"Från","Email_subject":"Ämne","Query":"Fråga","Query_description":"Ytterligare villkor för att avgöra vilken användare att skicka e-post till. Användare som inte prenumererar tas automatiskt bort från frågan. Det måste vara ett giltigt JSON. Exempel: \"{\"createdAt\":{\"$gt\":{\"$date\": \"2015-01-01T00:00:00.000Z\"}}}\"","Send_email":"Skicka e-post","The_emails_are_being_sent":"E-postmeddelandena blir skickade.","You_have_successfully_unsubscribed":"Du har blivit avregistrerad från vår e-postlista."});
TAPi18n._registerServerTranslator("sv", namespace);                                                                // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/zh-TW.i18n.json                                       //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["zh-TW"] = ["Chinese (Taiwan)","繁体中文（台湾）"];                                                // 8
if(_.isUndefined(TAPi18n.translations["zh-TW"])) {                                                                 // 9
  TAPi18n.translations["zh-TW"] = {};                                                                              // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["zh-TW"][namespace])) {                                                      // 13
  TAPi18n.translations["zh-TW"][namespace] = {};                                                                   // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["zh-TW"][namespace], {"Send_email":"發送電子郵件","The_emails_are_being_sent":"電子郵件傳送中"});
TAPi18n._registerServerTranslator("zh-TW", namespace);                                                             // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_mailer/packages/rocketchat_maileri18n/zh.i18n.json                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "project",                                                                                      // 2
    namespace = "project";                                                                                         // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                                                  // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                                    // 9
  TAPi18n.translations["zh"] = {};                                                                                 // 10
}                                                                                                                  // 11
                                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                                         // 13
  TAPi18n.translations["zh"][namespace] = {};                                                                      // 14
}                                                                                                                  // 15
                                                                                                                   // 16
_.extend(TAPi18n.translations["zh"][namespace], {"From_email_warning":"<b>警告</b>：<b>From</b>字段来自于邮件服务器的设置。","From_email_is_required":"From 字段是必填项","Dry_run":"发送测试","Dry_run_description":"表单中的 E-mail 都只会收到一封邮件。邮件必须对应有效用户。","Email_subject":"E-mail 标题","Email_body":"E-mail 正文","Mailer":"发件人","Query":"请求","Query_description":"决定向哪些用户发送电子邮件的其它选项。取消订阅的用户会自动从请求中删除。这必须是有效的 JSON 数据，例如：`{\"createdAt\":{\"$gt\":{\"$date\": \"2015-01-01T00:00:00.000Z\"}}}`。","Send_email":"发送 E-mail","The_emails_are_being_sent":"E-mail 已发送。","You_have_successfully_unsubscribed":"您已经成功从邮件列表中取消订阅。","You_informed_an_invalid_FROM_address":"您的 FROM 地址无效。","You_must_provide_the_unsubscribe_link":"必须提供［取消订阅］的链接。"});
TAPi18n._registerServerTranslator("zh", namespace);                                                                // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:mailer'] = {
  Mailer: Mailer
};

})();

//# sourceMappingURL=rocketchat_mailer.js.map
