(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var CustomOAuth = Package['rocketchat:custom-oauth'].CustomOAuth;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;

/* Package-scope variables */
var __coffeescriptShare, translations;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/common.coffee.js                                        //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var WordPress, config;                                                                   // 1
                                                                                         //
config = {                                                                               // 1
  serverURL: '',                                                                         // 2
  identityPath: '/oauth/me',                                                             // 2
  addAutopublishFields: {                                                                // 2
    forLoggedInUser: ['services.wordpress'],                                             // 5
    forOtherUsers: ['services.wordpress.user_login']                                     // 5
  }                                                                                      //
};                                                                                       //
                                                                                         //
WordPress = new CustomOAuth('wordpress', config);                                        // 1
                                                                                         //
if (Meteor.isServer) {                                                                   // 10
  Meteor.startup(function() {                                                            // 11
    return RocketChat.models.Settings.find({                                             //
      _id: 'API_Wordpress_URL'                                                           // 12
    }).observe({                                                                         //
      added: function(record) {                                                          // 13
        config.serverURL = RocketChat.settings.get('API_Wordpress_URL');                 // 14
        return WordPress.configure(config);                                              //
      },                                                                                 //
      changed: function(record) {                                                        // 13
        config.serverURL = RocketChat.settings.get('API_Wordpress_URL');                 // 17
        return WordPress.configure(config);                                              //
      }                                                                                  //
    });                                                                                  //
  });                                                                                    //
} else {                                                                                 //
  Meteor.startup(function() {                                                            // 20
    return Tracker.autorun(function() {                                                  //
      if (RocketChat.settings.get('API_Wordpress_URL')) {                                // 22
        config.serverURL = RocketChat.settings.get('API_Wordpress_URL');                 // 23
        return WordPress.configure(config);                                              //
      }                                                                                  //
    });                                                                                  //
  });                                                                                    //
}                                                                                        //
                                                                                         //
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/startup.coffee.js                                       //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.settings.addGroup('OAuth', function() {                                       // 1
  return this.section('WordPress', function() {                                          //
    var enableQuery;                                                                     // 3
    enableQuery = {                                                                      // 3
      _id: 'Accounts_OAuth_Wordpress',                                                   // 3
      value: true                                                                        // 3
    };                                                                                   //
    this.add('Accounts_OAuth_Wordpress', false, {                                        // 3
      type: 'boolean',                                                                   // 4
      "public": true                                                                     // 4
    });                                                                                  //
    this.add('API_Wordpress_URL', '', {                                                  // 3
      type: 'string',                                                                    // 5
      enableQuery: enableQuery,                                                          // 5
      "public": true                                                                     // 5
    });                                                                                  //
    this.add('Accounts_OAuth_Wordpress_id', '', {                                        // 3
      type: 'string',                                                                    // 6
      enableQuery: enableQuery                                                           // 6
    });                                                                                  //
    this.add('Accounts_OAuth_Wordpress_secret', '', {                                    // 3
      type: 'string',                                                                    // 7
      enableQuery: enableQuery                                                           // 7
    });                                                                                  //
    return this.add('Accounts_OAuth_Wordpress_callback_url', '_oauth/wordpress', {       //
      type: 'relativeUrl',                                                               // 8
      readonly: true,                                                                    // 8
      force: true,                                                                       // 8
      enableQuery: enableQuery                                                           // 8
    });                                                                                  //
  });                                                                                    //
});                                                                                      // 1
                                                                                         //
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/packages/rocketchat_wordpressi18n/de.i18n.json          //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _ = Package.underscore._,                                                            // 1
    package_name = "project",                                                            // 2
    namespace = "project";                                                               // 3
                                                                                         // 4
if (package_name != "project") {                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                // 6
}                                                                                        // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                    // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                   // 10
if(_.isUndefined(TAPi18n.translations["de"])) {                                          // 11
  TAPi18n.translations["de"] = {};                                                       // 12
}                                                                                        // 13
                                                                                         // 14
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                               // 15
  TAPi18n.translations["de"][namespace] = {};                                            // 16
}                                                                                        // 17
                                                                                         // 18
_.extend(TAPi18n.translations["de"][namespace], {"API_Wordpress_URL":"Wordpress-URL","Accounts_OAuth_Wordpress":"Anmeldung über Wordpress","Accounts_OAuth_Wordpress_id":"WordPress-ID","Accounts_OAuth_Wordpress_secret":"Wordpress-Secret","Accounts_OAuth_Wordpress_callback_url":"Wordpress-Callback-URL"});
TAPi18n._registerServerTranslator("de", namespace);                                      // 20
                                                                                         // 21
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/packages/rocketchat_wordpressi18n/en.i18n.json          //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _ = Package.underscore._,                                                            // 1
    package_name = "project",                                                            // 2
    namespace = "project";                                                               // 3
                                                                                         // 4
if (package_name != "project") {                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                // 6
}                                                                                        // 7
// integrate the fallback language translations                                          // 8
translations = {};                                                                       // 9
translations[namespace] = {"API_Wordpress_URL":"WordPress URL","Accounts_OAuth_Wordpress":"WordPress Login","Accounts_OAuth_Wordpress_id":"WordPress Id","Accounts_OAuth_Wordpress_secret":"WordPress Secret","Accounts_OAuth_Wordpress_callback_url":"Wordpress Callback URL"};
TAPi18n._loadLangFileObject("en", translations);                                         // 11
TAPi18n._registerServerTranslator("en", namespace);                                      // 12
                                                                                         // 13
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/packages/rocketchat_wordpressi18n/es.i18n.json          //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _ = Package.underscore._,                                                            // 1
    package_name = "project",                                                            // 2
    namespace = "project";                                                               // 3
                                                                                         // 4
if (package_name != "project") {                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                // 6
}                                                                                        // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                           // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                          // 9
  TAPi18n.translations["es"] = {};                                                       // 10
}                                                                                        // 11
                                                                                         // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                               // 13
  TAPi18n.translations["es"][namespace] = {};                                            // 14
}                                                                                        // 15
                                                                                         // 16
_.extend(TAPi18n.translations["es"][namespace], {"API_Wordpress_URL":"URL de Wordpress","Accounts_OAuth_Wordpress":"Inicio de Sesion con Wordpress","Accounts_OAuth_Wordpress_id":"Id de Wordpress","Accounts_OAuth_Wordpress_secret":"Secreto de Wordpress"});
TAPi18n._registerServerTranslator("es", namespace);                                      // 18
                                                                                         // 19
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/packages/rocketchat_wordpressi18n/fi.i18n.json          //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _ = Package.underscore._,                                                            // 1
    package_name = "project",                                                            // 2
    namespace = "project";                                                               // 3
                                                                                         // 4
if (package_name != "project") {                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                // 6
}                                                                                        // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                     // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                          // 9
  TAPi18n.translations["fi"] = {};                                                       // 10
}                                                                                        // 11
                                                                                         // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                               // 13
  TAPi18n.translations["fi"][namespace] = {};                                            // 14
}                                                                                        // 15
                                                                                         // 16
_.extend(TAPi18n.translations["fi"][namespace], {"API_Wordpress_URL":"WordPress URL","Accounts_OAuth_Wordpress":"WordPress-kirjautuminen","Accounts_OAuth_Wordpress_id":"WordPress ID","Accounts_OAuth_Wordpress_secret":"Wordpress Secret"});
TAPi18n._registerServerTranslator("fi", namespace);                                      // 18
                                                                                         // 19
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/packages/rocketchat_wordpressi18n/fr.i18n.json          //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _ = Package.underscore._,                                                            // 1
    package_name = "project",                                                            // 2
    namespace = "project";                                                               // 3
                                                                                         // 4
if (package_name != "project") {                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                // 6
}                                                                                        // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                          // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                          // 9
  TAPi18n.translations["fr"] = {};                                                       // 10
}                                                                                        // 11
                                                                                         // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                               // 13
  TAPi18n.translations["fr"][namespace] = {};                                            // 14
}                                                                                        // 15
                                                                                         // 16
_.extend(TAPi18n.translations["fr"][namespace], {"API_Wordpress_URL":"WordPress URL","Accounts_OAuth_Wordpress":"WordPress Login","Accounts_OAuth_Wordpress_id":"WordPress ID ","Accounts_OAuth_Wordpress_secret":"WordPress Secret","Accounts_OAuth_Wordpress_callback_url":"WordPress URL de Callback"});
TAPi18n._registerServerTranslator("fr", namespace);                                      // 18
                                                                                         // 19
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/packages/rocketchat_wordpressi18n/hr.i18n.json          //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _ = Package.underscore._,                                                            // 1
    package_name = "project",                                                            // 2
    namespace = "project";                                                               // 3
                                                                                         // 4
if (package_name != "project") {                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                // 6
}                                                                                        // 7
TAPi18n.languages_names["hr"] = ["Croatian","Hrvatski"];                                 // 8
if(_.isUndefined(TAPi18n.translations["hr"])) {                                          // 9
  TAPi18n.translations["hr"] = {};                                                       // 10
}                                                                                        // 11
                                                                                         // 12
if(_.isUndefined(TAPi18n.translations["hr"][namespace])) {                               // 13
  TAPi18n.translations["hr"][namespace] = {};                                            // 14
}                                                                                        // 15
                                                                                         // 16
_.extend(TAPi18n.translations["hr"][namespace], {"API_Wordpress_URL":"WordPress link"});
TAPi18n._registerServerTranslator("hr", namespace);                                      // 18
                                                                                         // 19
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/packages/rocketchat_wordpressi18n/ja.i18n.json          //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _ = Package.underscore._,                                                            // 1
    package_name = "project",                                                            // 2
    namespace = "project";                                                               // 3
                                                                                         // 4
if (package_name != "project") {                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                // 6
}                                                                                        // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                      // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                          // 9
  TAPi18n.translations["ja"] = {};                                                       // 10
}                                                                                        // 11
                                                                                         // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                               // 13
  TAPi18n.translations["ja"][namespace] = {};                                            // 14
}                                                                                        // 15
                                                                                         // 16
_.extend(TAPi18n.translations["ja"][namespace], {"API_Wordpress_URL":"WordPress URL","Accounts_OAuth_Wordpress":"WordPress によるログインを有効にする","Accounts_OAuth_Wordpress_id":"WordPress ID","Accounts_OAuth_Wordpress_secret":"WordPress シークレットキー","Accounts_OAuth_Wordpress_callback_url":"Wordpress コールバック URL"});
TAPi18n._registerServerTranslator("ja", namespace);                                      // 18
                                                                                         // 19
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/packages/rocketchat_wordpressi18n/km.i18n.json          //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _ = Package.underscore._,                                                            // 1
    package_name = "project",                                                            // 2
    namespace = "project";                                                               // 3
                                                                                         // 4
if (package_name != "project") {                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                // 6
}                                                                                        // 7
TAPi18n.languages_names["km"] = ["Khmer","ភាសាខ្មែរ"];                                   // 8
if(_.isUndefined(TAPi18n.translations["km"])) {                                          // 9
  TAPi18n.translations["km"] = {};                                                       // 10
}                                                                                        // 11
                                                                                         // 12
if(_.isUndefined(TAPi18n.translations["km"][namespace])) {                               // 13
  TAPi18n.translations["km"][namespace] = {};                                            // 14
}                                                                                        // 15
                                                                                         // 16
_.extend(TAPi18n.translations["km"][namespace], {"API_Wordpress_URL":"តំណភ្ជាប់ URL របស់ WordPress","Accounts_OAuth_Wordpress":"ការឡុកចូល Wordpress","Accounts_OAuth_Wordpress_id":"លេខសម្គាល់ WordPress","Accounts_OAuth_Wordpress_secret":"WordPress សម្ងាត់"});
TAPi18n._registerServerTranslator("km", namespace);                                      // 18
                                                                                         // 19
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/packages/rocketchat_wordpressi18n/ko.i18n.json          //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _ = Package.underscore._,                                                            // 1
    package_name = "project",                                                            // 2
    namespace = "project";                                                               // 3
                                                                                         // 4
if (package_name != "project") {                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                // 6
}                                                                                        // 7
TAPi18n.languages_names["ko"] = ["Korean","한국어"];                                        // 8
if(_.isUndefined(TAPi18n.translations["ko"])) {                                          // 9
  TAPi18n.translations["ko"] = {};                                                       // 10
}                                                                                        // 11
                                                                                         // 12
if(_.isUndefined(TAPi18n.translations["ko"][namespace])) {                               // 13
  TAPi18n.translations["ko"][namespace] = {};                                            // 14
}                                                                                        // 15
                                                                                         // 16
_.extend(TAPi18n.translations["ko"][namespace], {"API_Wordpress_URL":"WordPress URL","Accounts_OAuth_Wordpress":"WordPress 로그인","Accounts_OAuth_Wordpress_id":"WordPress ID","Accounts_OAuth_Wordpress_secret":"WordPress 암호"});
TAPi18n._registerServerTranslator("ko", namespace);                                      // 18
                                                                                         // 19
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/packages/rocketchat_wordpressi18n/ms-MY.i18n.json       //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _ = Package.underscore._,                                                            // 1
    package_name = "project",                                                            // 2
    namespace = "project";                                                               // 3
                                                                                         // 4
if (package_name != "project") {                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                // 6
}                                                                                        // 7
TAPi18n.languages_names["ms-MY"] = ["ms-MY","ms-MY"];                                    // 8
if(_.isUndefined(TAPi18n.translations["ms-MY"])) {                                       // 9
  TAPi18n.translations["ms-MY"] = {};                                                    // 10
}                                                                                        // 11
                                                                                         // 12
if(_.isUndefined(TAPi18n.translations["ms-MY"][namespace])) {                            // 13
  TAPi18n.translations["ms-MY"][namespace] = {};                                         // 14
}                                                                                        // 15
                                                                                         // 16
_.extend(TAPi18n.translations["ms-MY"][namespace], {"API_Wordpress_URL":" URL WordPress","Accounts_OAuth_Wordpress":"Daftar masuk WordPress","Accounts_OAuth_Wordpress_id":" ID WordPress","Accounts_OAuth_Wordpress_secret":"WordPress Secret"});
TAPi18n._registerServerTranslator("ms-MY", namespace);                                   // 18
                                                                                         // 19
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/packages/rocketchat_wordpressi18n/nl.i18n.json          //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _ = Package.underscore._,                                                            // 1
    package_name = "project",                                                            // 2
    namespace = "project";                                                               // 3
                                                                                         // 4
if (package_name != "project") {                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                // 6
}                                                                                        // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                  // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                          // 9
  TAPi18n.translations["nl"] = {};                                                       // 10
}                                                                                        // 11
                                                                                         // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                               // 13
  TAPi18n.translations["nl"][namespace] = {};                                            // 14
}                                                                                        // 15
                                                                                         // 16
_.extend(TAPi18n.translations["nl"][namespace], {"API_Wordpress_URL":"WordPress URL","Accounts_OAuth_Wordpress":"WordPress Inloggen","Accounts_OAuth_Wordpress_id":"WordPress Id","Accounts_OAuth_Wordpress_secret":"WordPress Geheim (secret)"});
TAPi18n._registerServerTranslator("nl", namespace);                                      // 18
                                                                                         // 19
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/packages/rocketchat_wordpressi18n/pl.i18n.json          //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _ = Package.underscore._,                                                            // 1
    package_name = "project",                                                            // 2
    namespace = "project";                                                               // 3
                                                                                         // 4
if (package_name != "project") {                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                // 6
}                                                                                        // 7
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                     // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                          // 9
  TAPi18n.translations["pl"] = {};                                                       // 10
}                                                                                        // 11
                                                                                         // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                               // 13
  TAPi18n.translations["pl"][namespace] = {};                                            // 14
}                                                                                        // 15
                                                                                         // 16
_.extend(TAPi18n.translations["pl"][namespace], {"API_Wordpress_URL":"WordPress URL","Accounts_OAuth_Wordpress":"WordPress Login","Accounts_OAuth_Wordpress_id":"WordPress Id","Accounts_OAuth_Wordpress_secret":"WordPress Secret"});
TAPi18n._registerServerTranslator("pl", namespace);                                      // 18
                                                                                         // 19
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/packages/rocketchat_wordpressi18n/pt.i18n.json          //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _ = Package.underscore._,                                                            // 1
    package_name = "project",                                                            // 2
    namespace = "project";                                                               // 3
                                                                                         // 4
if (package_name != "project") {                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                // 6
}                                                                                        // 7
TAPi18n.languages_names["pt"] = ["Portuguese (Portugal)","Português"];                   // 8
if(_.isUndefined(TAPi18n.translations["pt"])) {                                          // 9
  TAPi18n.translations["pt"] = {};                                                       // 10
}                                                                                        // 11
                                                                                         // 12
if(_.isUndefined(TAPi18n.translations["pt"][namespace])) {                               // 13
  TAPi18n.translations["pt"][namespace] = {};                                            // 14
}                                                                                        // 15
                                                                                         // 16
_.extend(TAPi18n.translations["pt"][namespace], {"API_Wordpress_URL":"URL do WordPress","Accounts_OAuth_Wordpress":"Login WordPress","Accounts_OAuth_Wordpress_id":"WordPress ID","Accounts_OAuth_Wordpress_secret":"WordPress Secret"});
TAPi18n._registerServerTranslator("pt", namespace);                                      // 18
                                                                                         // 19
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/packages/rocketchat_wordpressi18n/ro.i18n.json          //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _ = Package.underscore._,                                                            // 1
    package_name = "project",                                                            // 2
    namespace = "project";                                                               // 3
                                                                                         // 4
if (package_name != "project") {                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                // 6
}                                                                                        // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                   // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                          // 9
  TAPi18n.translations["ro"] = {};                                                       // 10
}                                                                                        // 11
                                                                                         // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                               // 13
  TAPi18n.translations["ro"][namespace] = {};                                            // 14
}                                                                                        // 15
                                                                                         // 16
_.extend(TAPi18n.translations["ro"][namespace], {"API_Wordpress_URL":"URL WordPress","Accounts_OAuth_Wordpress":"Autentificare WordPress","Accounts_OAuth_Wordpress_id":" Id WordPress","Accounts_OAuth_Wordpress_secret":"WordPress Secret"});
TAPi18n._registerServerTranslator("ro", namespace);                                      // 18
                                                                                         // 19
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/packages/rocketchat_wordpressi18n/ru.i18n.json          //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _ = Package.underscore._,                                                            // 1
    package_name = "project",                                                            // 2
    namespace = "project";                                                               // 3
                                                                                         // 4
if (package_name != "project") {                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                // 6
}                                                                                        // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                   // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                          // 9
  TAPi18n.translations["ru"] = {};                                                       // 10
}                                                                                        // 11
                                                                                         // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                               // 13
  TAPi18n.translations["ru"][namespace] = {};                                            // 14
}                                                                                        // 15
                                                                                         // 16
_.extend(TAPi18n.translations["ru"][namespace], {"API_Wordpress_URL":"WordPress URL","Accounts_OAuth_Wordpress":"WordPress логин","Accounts_OAuth_Wordpress_id":"WordPress ID","Accounts_OAuth_Wordpress_secret":"Пароль WordPress","Accounts_OAuth_Wordpress_callback_url":"Обратный URL-адрес Wordpress"});
TAPi18n._registerServerTranslator("ru", namespace);                                      // 18
                                                                                         // 19
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/rocketchat_wordpress/packages/rocketchat_wordpressi18n/zh.i18n.json          //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _ = Package.underscore._,                                                            // 1
    package_name = "project",                                                            // 2
    namespace = "project";                                                               // 3
                                                                                         // 4
if (package_name != "project") {                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                // 6
}                                                                                        // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                        // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                          // 9
  TAPi18n.translations["zh"] = {};                                                       // 10
}                                                                                        // 11
                                                                                         // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                               // 13
  TAPi18n.translations["zh"][namespace] = {};                                            // 14
}                                                                                        // 15
                                                                                         // 16
_.extend(TAPi18n.translations["zh"][namespace], {"API_Wordpress_URL":"WordPress API URL","Accounts_OAuth_Wordpress":"WordPress 帐号登录","Accounts_OAuth_Wordpress_id":"WordPress ID","Accounts_OAuth_Wordpress_secret":"WordPress Secret","Accounts_OAuth_Wordpress_callback_url":"Wordpress Callback URL"});
TAPi18n._registerServerTranslator("zh", namespace);                                      // 18
                                                                                         // 19
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:wordpress'] = {};

})();

//# sourceMappingURL=rocketchat_wordpress.js.map
