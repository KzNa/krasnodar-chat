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

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/common.coffee.js                                           //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var GitHubEnterprise, config;                                                                       // 3
                                                                                                    //
config = {                                                                                          // 3
  serverURL: '',                                                                                    // 4
  identityPath: '/api/v3/user',                                                                     // 4
  authorizePath: '/login/oauth/authorize',                                                          // 4
  tokenPath: '/login/oauth/access_token',                                                           // 4
  addAutopublishFields: {                                                                           // 4
    forLoggedInUser: ['services.github-enterprise'],                                                // 9
    forOtherUsers: ['services.github-enterprise.username']                                          // 9
  }                                                                                                 //
};                                                                                                  //
                                                                                                    //
GitHubEnterprise = new CustomOAuth('github_enterprise', config);                                    // 3
                                                                                                    //
if (Meteor.isServer) {                                                                              // 14
  Meteor.startup(function() {                                                                       // 15
    return RocketChat.models.Settings.findById('API_GitHub_Enterprise_URL').observe({               //
      added: function(record) {                                                                     // 17
        config.serverURL = RocketChat.settings.get('API_GitHub_Enterprise_URL');                    // 18
        return GitHubEnterprise.configure(config);                                                  //
      },                                                                                            //
      changed: function(record) {                                                                   // 17
        config.serverURL = RocketChat.settings.get('API_GitHub_Enterprise_URL');                    // 21
        return GitHubEnterprise.configure(config);                                                  //
      }                                                                                             //
    });                                                                                             //
  });                                                                                               //
} else {                                                                                            //
  Meteor.startup(function() {                                                                       // 24
    return Tracker.autorun(function() {                                                             //
      if (RocketChat.settings.get('API_GitHub_Enterprise_URL')) {                                   // 26
        config.serverURL = RocketChat.settings.get('API_GitHub_Enterprise_URL');                    // 27
        return GitHubEnterprise.configure(config);                                                  //
      }                                                                                             //
    });                                                                                             //
  });                                                                                               //
}                                                                                                   //
                                                                                                    //
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/startup.coffee.js                                          //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.settings.addGroup('OAuth', function() {                                                  // 1
  return this.section('GitHub Enterprise', function() {                                             //
    var enableQuery;                                                                                // 3
    enableQuery = {                                                                                 // 3
      _id: 'Accounts_OAuth_GitHub_Enterprise',                                                      // 3
      value: true                                                                                   // 3
    };                                                                                              //
    this.add('Accounts_OAuth_GitHub_Enterprise', false, {                                           // 3
      type: 'boolean'                                                                               // 4
    });                                                                                             //
    this.add('API_GitHub_Enterprise_URL', '', {                                                     // 3
      type: 'string',                                                                               // 5
      "public": true,                                                                               // 5
      enableQuery: enableQuery,                                                                     // 5
      i18nDescription: 'API_GitHub_Enterprise_URL_Description'                                      // 5
    });                                                                                             //
    this.add('Accounts_OAuth_GitHub_Enterprise_id', '', {                                           // 3
      type: 'string',                                                                               // 6
      enableQuery: enableQuery                                                                      // 6
    });                                                                                             //
    this.add('Accounts_OAuth_GitHub_Enterprise_secret', '', {                                       // 3
      type: 'string',                                                                               // 7
      enableQuery: enableQuery                                                                      // 7
    });                                                                                             //
    return this.add('Accounts_OAuth_GitHub_Enterprise_callback_url', '_oauth/github_enterprise', {  //
      type: 'relativeUrl',                                                                          // 8
      readonly: true,                                                                               // 8
      force: true,                                                                                  // 8
      enableQuery: enableQuery                                                                      // 8
    });                                                                                             //
  });                                                                                               //
});                                                                                                 // 1
                                                                                                    //
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/ar.i18n.json     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
TAPi18n.languages_names["ar"] = ["Arabic","العربية"];                                               // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                              // 10
if(_.isUndefined(TAPi18n.translations["ar"])) {                                                     // 11
  TAPi18n.translations["ar"] = {};                                                                  // 12
}                                                                                                   // 13
                                                                                                    // 14
if(_.isUndefined(TAPi18n.translations["ar"][namespace])) {                                          // 15
  TAPi18n.translations["ar"][namespace] = {};                                                       // 16
}                                                                                                   // 17
                                                                                                    // 18
_.extend(TAPi18n.translations["ar"][namespace], {"API_GitHub_Enterprise_URL_Description":"مثال: http://domain.com (بدون الشرطة المائلة في الأخير)"});
TAPi18n._registerServerTranslator("ar", namespace);                                                 // 20
                                                                                                    // 21
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/de.i18n.json     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                               // 8
if(_.isUndefined(TAPi18n.translations["de"])) {                                                     // 9
  TAPi18n.translations["de"] = {};                                                                  // 10
}                                                                                                   // 11
                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                          // 13
  TAPi18n.translations["de"][namespace] = {};                                                       // 14
}                                                                                                   // 15
                                                                                                    // 16
_.extend(TAPi18n.translations["de"][namespace], {"Accounts_OAuth_GitHub_Enterprise":"OAuth aktivieren","API_GitHub_Enterprise_URL":"Server-URL","Accounts_OAuth_GitHub_Enterprise_id":"Client-ID","Accounts_OAuth_GitHub_Enterprise_secret":"Client-Secret","Accounts_OAuth_GitHub_Enterprise_callback_url":"GitHub-Enterprise-Callback-URL","API_GitHub_Enterprise_URL_Description":"Beispiel: http://domain.com (ohne Schrägstrich am Ende)"});
TAPi18n._registerServerTranslator("de", namespace);                                                 // 18
                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/en.i18n.json     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
// integrate the fallback language translations                                                     // 8
translations = {};                                                                                  // 9
translations[namespace] = {"Accounts_OAuth_GitHub_Enterprise":"OAuth Enabled","API_GitHub_Enterprise_URL":"Server URL","Accounts_OAuth_GitHub_Enterprise_id":"Client Id","Accounts_OAuth_GitHub_Enterprise_secret":"Client Secret","Accounts_OAuth_GitHub_Enterprise_callback_url":"GitHub Enterprise Callback URL","API_GitHub_Enterprise_URL_Description":"Example: http://domain.com (excluding trailing slash)"};
TAPi18n._loadLangFileObject("en", translations);                                                    // 11
TAPi18n._registerServerTranslator("en", namespace);                                                 // 12
                                                                                                    // 13
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/es.i18n.json     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                                      // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                                     // 9
  TAPi18n.translations["es"] = {};                                                                  // 10
}                                                                                                   // 11
                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                                          // 13
  TAPi18n.translations["es"][namespace] = {};                                                       // 14
}                                                                                                   // 15
                                                                                                    // 16
_.extend(TAPi18n.translations["es"][namespace], {"Accounts_OAuth_GitHub_Enterprise":"OAuth Habilitado","API_GitHub_Enterprise_URL":"URL del Servidor","Accounts_OAuth_GitHub_Enterprise_id":"Id de Cliente","Accounts_OAuth_GitHub_Enterprise_secret":"Secreto de Cliente","API_GitHub_Enterprise_URL_Description":"Ejemplo: http://domain.com (sin incluir la diagonal final)"});
TAPi18n._registerServerTranslator("es", namespace);                                                 // 18
                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/fi.i18n.json     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                                // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                                     // 9
  TAPi18n.translations["fi"] = {};                                                                  // 10
}                                                                                                   // 11
                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                                          // 13
  TAPi18n.translations["fi"][namespace] = {};                                                       // 14
}                                                                                                   // 15
                                                                                                    // 16
_.extend(TAPi18n.translations["fi"][namespace], {"Accounts_OAuth_GitHub_Enterprise":"OAuth Käytössä","API_GitHub_Enterprise_URL":"Server URL","Accounts_OAuth_GitHub_Enterprise_id":"Client ID","Accounts_OAuth_GitHub_Enterprise_secret":"Client Secret","API_GitHub_Enterprise_URL_Description":"Esim: http://example.com (ei kauttaviivaa loppuun)"});
TAPi18n._registerServerTranslator("fi", namespace);                                                 // 18
                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/fr.i18n.json     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                     // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                     // 9
  TAPi18n.translations["fr"] = {};                                                                  // 10
}                                                                                                   // 11
                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                          // 13
  TAPi18n.translations["fr"][namespace] = {};                                                       // 14
}                                                                                                   // 15
                                                                                                    // 16
_.extend(TAPi18n.translations["fr"][namespace], {"Accounts_OAuth_GitHub_Enterprise":"OAuth activé","API_GitHub_Enterprise_URL":"URL du serveur","Accounts_OAuth_GitHub_Enterprise_id":"GitHub Entreprise ID","Accounts_OAuth_GitHub_Enterprise_secret":"GitHub Entreprise Secret","Accounts_OAuth_GitHub_Enterprise_callback_url":"GitHub Entreprise URL de Callback","API_GitHub_Enterprise_URL_Description":"Exemple: http://domain.com (sans slash final)"});
TAPi18n._registerServerTranslator("fr", namespace);                                                 // 18
                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/hr.i18n.json     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
TAPi18n.languages_names["hr"] = ["Croatian","Hrvatski"];                                            // 8
if(_.isUndefined(TAPi18n.translations["hr"])) {                                                     // 9
  TAPi18n.translations["hr"] = {};                                                                  // 10
}                                                                                                   // 11
                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["hr"][namespace])) {                                          // 13
  TAPi18n.translations["hr"][namespace] = {};                                                       // 14
}                                                                                                   // 15
                                                                                                    // 16
_.extend(TAPi18n.translations["hr"][namespace], {"API_GitHub_Enterprise_URL":"GitHub Enterprise"});
TAPi18n._registerServerTranslator("hr", namespace);                                                 // 18
                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/ja.i18n.json     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                                 // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                     // 9
  TAPi18n.translations["ja"] = {};                                                                  // 10
}                                                                                                   // 11
                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                          // 13
  TAPi18n.translations["ja"][namespace] = {};                                                       // 14
}                                                                                                   // 15
                                                                                                    // 16
_.extend(TAPi18n.translations["ja"][namespace], {"Accounts_OAuth_GitHub_Enterprise":"OAuth によるログインを有効にする","API_GitHub_Enterprise_URL":"サーバー URL","Accounts_OAuth_GitHub_Enterprise_id":"クライアント ID","Accounts_OAuth_GitHub_Enterprise_secret":"クライアント シークレットキー","Accounts_OAuth_GitHub_Enterprise_callback_url":"GitHub Enterprise コールバック URL","API_GitHub_Enterprise_URL_Description":"例: http://domain.com (末尾のスラッシュを除く)"});
TAPi18n._registerServerTranslator("ja", namespace);                                                 // 18
                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/km.i18n.json     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
TAPi18n.languages_names["km"] = ["Khmer","ភាសាខ្មែរ"];                                              // 8
if(_.isUndefined(TAPi18n.translations["km"])) {                                                     // 9
  TAPi18n.translations["km"] = {};                                                                  // 10
}                                                                                                   // 11
                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["km"][namespace])) {                                          // 13
  TAPi18n.translations["km"][namespace] = {};                                                       // 14
}                                                                                                   // 15
                                                                                                    // 16
_.extend(TAPi18n.translations["km"][namespace], {"Accounts_OAuth_GitHub_Enterprise":"OAuth បានអនុញ្ញាតិ","API_GitHub_Enterprise_URL":"GitHub Enterprise","Accounts_OAuth_GitHub_Enterprise_id":"លេខសម្គាល់ Client","Accounts_OAuth_GitHub_Enterprise_secret":"Client សម្ងាត់","API_GitHub_Enterprise_URL_Description":"ចំណាំ: សូមដកចេញនូវ trailing slash"});
TAPi18n._registerServerTranslator("km", namespace);                                                 // 18
                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/ko.i18n.json     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
TAPi18n.languages_names["ko"] = ["Korean","한국어"];                                                   // 8
if(_.isUndefined(TAPi18n.translations["ko"])) {                                                     // 9
  TAPi18n.translations["ko"] = {};                                                                  // 10
}                                                                                                   // 11
                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["ko"][namespace])) {                                          // 13
  TAPi18n.translations["ko"][namespace] = {};                                                       // 14
}                                                                                                   // 15
                                                                                                    // 16
_.extend(TAPi18n.translations["ko"][namespace], {"Accounts_OAuth_GitHub_Enterprise":"OAuth 활성화","API_GitHub_Enterprise_URL":"Server URL","Accounts_OAuth_GitHub_Enterprise_id":"Client ID","Accounts_OAuth_GitHub_Enterprise_secret":"Client 암호","API_GitHub_Enterprise_URL_Description":"예: http://domain.com (마지막 슬래시 제외)"});
TAPi18n._registerServerTranslator("ko", namespace);                                                 // 18
                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/nl.i18n.json     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                             // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                                     // 9
  TAPi18n.translations["nl"] = {};                                                                  // 10
}                                                                                                   // 11
                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                                          // 13
  TAPi18n.translations["nl"][namespace] = {};                                                       // 14
}                                                                                                   // 15
                                                                                                    // 16
_.extend(TAPi18n.translations["nl"][namespace], {"Accounts_OAuth_GitHub_Enterprise":"OAuth Ingeschakeld","API_GitHub_Enterprise_URL":"Server URL","Accounts_OAuth_GitHub_Enterprise_id":"Client Id","Accounts_OAuth_GitHub_Enterprise_secret":"Client Secret","API_GitHub_Enterprise_URL_Description":"Voorbeeld: http://domain.com (exclusief slash)"});
TAPi18n._registerServerTranslator("nl", namespace);                                                 // 18
                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/pl.i18n.json     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                                // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                                     // 9
  TAPi18n.translations["pl"] = {};                                                                  // 10
}                                                                                                   // 11
                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                                          // 13
  TAPi18n.translations["pl"][namespace] = {};                                                       // 14
}                                                                                                   // 15
                                                                                                    // 16
_.extend(TAPi18n.translations["pl"][namespace], {"Accounts_OAuth_GitHub_Enterprise":"OAuth Włączone","API_GitHub_Enterprise_URL":"Adres serwera","Accounts_OAuth_GitHub_Enterprise_id":"Client Id","Accounts_OAuth_GitHub_Enterprise_secret":"Client Secret","API_GitHub_Enterprise_URL_Description":"Przykład: http://domain.com (bez końcowego ukośnika)"});
TAPi18n._registerServerTranslator("pl", namespace);                                                 // 18
                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/pt.i18n.json     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
TAPi18n.languages_names["pt"] = ["Portuguese (Portugal)","Português"];                              // 8
if(_.isUndefined(TAPi18n.translations["pt"])) {                                                     // 9
  TAPi18n.translations["pt"] = {};                                                                  // 10
}                                                                                                   // 11
                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["pt"][namespace])) {                                          // 13
  TAPi18n.translations["pt"][namespace] = {};                                                       // 14
}                                                                                                   // 15
                                                                                                    // 16
_.extend(TAPi18n.translations["pt"][namespace], {"Accounts_OAuth_GitHub_Enterprise":"OAuth Ativado","API_GitHub_Enterprise_URL":"URL do servidor","Accounts_OAuth_GitHub_Enterprise_id":"GitHub Id","Accounts_OAuth_GitHub_Enterprise_secret":"Segredo","API_GitHub_Enterprise_URL_Description":"Nota: excluir barra final"});
TAPi18n._registerServerTranslator("pt", namespace);                                                 // 18
                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/ro.i18n.json     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                              // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                     // 9
  TAPi18n.translations["ro"] = {};                                                                  // 10
}                                                                                                   // 11
                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                          // 13
  TAPi18n.translations["ro"][namespace] = {};                                                       // 14
}                                                                                                   // 15
                                                                                                    // 16
_.extend(TAPi18n.translations["ro"][namespace], {"Accounts_OAuth_GitHub_Enterprise":"OAuth Activat","API_GitHub_Enterprise_URL":"URL-ul serverului","Accounts_OAuth_GitHub_Enterprise_id":"Client ID","Accounts_OAuth_GitHub_Enterprise_secret":"Client Secret","API_GitHub_Enterprise_URL_Description":"Exemplu: http://domain.com (fără '/' la final)"});
TAPi18n._registerServerTranslator("ro", namespace);                                                 // 18
                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/ru.i18n.json     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                              // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                     // 9
  TAPi18n.translations["ru"] = {};                                                                  // 10
}                                                                                                   // 11
                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                          // 13
  TAPi18n.translations["ru"][namespace] = {};                                                       // 14
}                                                                                                   // 15
                                                                                                    // 16
_.extend(TAPi18n.translations["ru"][namespace], {"Accounts_OAuth_GitHub_Enterprise":"OAuth включен","API_GitHub_Enterprise_URL":"URL-адрес сервера","Accounts_OAuth_GitHub_Enterprise_id":"Client Id","Accounts_OAuth_GitHub_Enterprise_secret":"Client Secret","Accounts_OAuth_GitHub_Enterprise_callback_url":"Обратный URL-адрес GitHub Enterprise","API_GitHub_Enterprise_URL_Description":"Пример: http://domain.com (без завершающего слэша)"});
TAPi18n._registerServerTranslator("ru", namespace);                                                 // 18
                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/zh-TW.i18n.json  //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
TAPi18n.languages_names["zh-TW"] = ["Chinese (Taiwan)","繁体中文（台湾）"];                                 // 8
if(_.isUndefined(TAPi18n.translations["zh-TW"])) {                                                  // 9
  TAPi18n.translations["zh-TW"] = {};                                                               // 10
}                                                                                                   // 11
                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["zh-TW"][namespace])) {                                       // 13
  TAPi18n.translations["zh-TW"][namespace] = {};                                                    // 14
}                                                                                                   // 15
                                                                                                    // 16
_.extend(TAPi18n.translations["zh-TW"][namespace], {"API_GitHub_Enterprise_URL":"伺服器網址"});          // 17
TAPi18n._registerServerTranslator("zh-TW", namespace);                                              // 18
                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/rocketchat_github-enterprise/packages/rocketchat_github-enterprisei18n/zh.i18n.json     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _ = Package.underscore._,                                                                       // 1
    package_name = "project",                                                                       // 2
    namespace = "project";                                                                          // 3
                                                                                                    // 4
if (package_name != "project") {                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                           // 6
}                                                                                                   // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                                   // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                     // 9
  TAPi18n.translations["zh"] = {};                                                                  // 10
}                                                                                                   // 11
                                                                                                    // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                          // 13
  TAPi18n.translations["zh"][namespace] = {};                                                       // 14
}                                                                                                   // 15
                                                                                                    // 16
_.extend(TAPi18n.translations["zh"][namespace], {"Accounts_OAuth_GitHub_Enterprise":"已启用 GitHub 企业帐号登录","API_GitHub_Enterprise_URL":"GitHub 企业版地址","Accounts_OAuth_GitHub_Enterprise_id":"客户端 ID","Accounts_OAuth_GitHub_Enterprise_secret":"客户端 Secret","Accounts_OAuth_GitHub_Enterprise_callback_url":"GitHub Enterprise Callback URL","API_GitHub_Enterprise_URL_Description":"例如：http://domain.com （不需要结尾的斜线）"});
TAPi18n._registerServerTranslator("zh", namespace);                                                 // 18
                                                                                                    // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:github-enterprise'] = {};

})();

//# sourceMappingURL=rocketchat_github-enterprise.js.map
