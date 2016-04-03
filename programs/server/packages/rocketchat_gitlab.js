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

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/common.coffee.js                                         //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Gitlab, config;                                                                    // 1
                                                                                       //
config = {                                                                             // 1
  serverURL: 'https://gitlab.com',                                                     // 2
  identityPath: '/api/v3/user',                                                        // 2
  addAutopublishFields: {                                                              // 2
    forLoggedInUser: ['services.gitlab'],                                              // 5
    forOtherUsers: ['services.gitlab.username']                                        // 5
  }                                                                                    //
};                                                                                     //
                                                                                       //
Gitlab = new CustomOAuth('gitlab', config);                                            // 1
                                                                                       //
if (Meteor.isServer) {                                                                 // 10
  Meteor.startup(function() {                                                          // 11
    return RocketChat.models.Settings.findById('API_Gitlab_URL').observe({             //
      added: function(record) {                                                        // 13
        config.serverURL = RocketChat.settings.get('API_Gitlab_URL');                  // 14
        return Gitlab.configure(config);                                               //
      },                                                                               //
      changed: function(record) {                                                      // 13
        config.serverURL = RocketChat.settings.get('API_Gitlab_URL');                  // 17
        return Gitlab.configure(config);                                               //
      }                                                                                //
    });                                                                                //
  });                                                                                  //
} else {                                                                               //
  Meteor.startup(function() {                                                          // 20
    return Tracker.autorun(function() {                                                //
      if (RocketChat.settings.get('API_Gitlab_URL')) {                                 // 22
        config.serverURL = RocketChat.settings.get('API_Gitlab_URL');                  // 23
        return Gitlab.configure(config);                                               //
      }                                                                                //
    });                                                                                //
  });                                                                                  //
}                                                                                      //
                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/startup.coffee.js                                        //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.settings.addGroup('OAuth', function() {                                     // 1
  return this.section('GitLab', function() {                                           //
    var enableQuery;                                                                   // 3
    enableQuery = {                                                                    // 3
      _id: 'Accounts_OAuth_Gitlab',                                                    // 3
      value: true                                                                      // 3
    };                                                                                 //
    this.add('Accounts_OAuth_Gitlab', false, {                                         // 3
      type: 'boolean',                                                                 // 4
      "public": true                                                                   // 4
    });                                                                                //
    this.add('API_Gitlab_URL', '', {                                                   // 3
      type: 'string',                                                                  // 5
      enableQuery: enableQuery,                                                        // 5
      "public": true                                                                   // 5
    });                                                                                //
    this.add('Accounts_OAuth_Gitlab_id', '', {                                         // 3
      type: 'string',                                                                  // 6
      enableQuery: enableQuery                                                         // 6
    });                                                                                //
    this.add('Accounts_OAuth_Gitlab_secret', '', {                                     // 3
      type: 'string',                                                                  // 7
      enableQuery: enableQuery                                                         // 7
    });                                                                                //
    return this.add('Accounts_OAuth_Gitlab_callback_url', '_oauth/gitlab', {           //
      type: 'relativeUrl',                                                             // 8
      readonly: true,                                                                  // 8
      force: true,                                                                     // 8
      enableQuery: enableQuery                                                         // 8
    });                                                                                //
  });                                                                                  //
});                                                                                    // 1
                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/packages/rocketchat_gitlabi18n/de.i18n.json              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var _ = Package.underscore._,                                                          // 1
    package_name = "project",                                                          // 2
    namespace = "project";                                                             // 3
                                                                                       // 4
if (package_name != "project") {                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                              // 6
}                                                                                      // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                  // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                 // 10
if(_.isUndefined(TAPi18n.translations["de"])) {                                        // 11
  TAPi18n.translations["de"] = {};                                                     // 12
}                                                                                      // 13
                                                                                       // 14
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                             // 15
  TAPi18n.translations["de"][namespace] = {};                                          // 16
}                                                                                      // 17
                                                                                       // 18
_.extend(TAPi18n.translations["de"][namespace], {"API_Gitlab_URL":"GitLab-URL"});      // 19
TAPi18n._registerServerTranslator("de", namespace);                                    // 20
                                                                                       // 21
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/packages/rocketchat_gitlabi18n/en.i18n.json              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var _ = Package.underscore._,                                                          // 1
    package_name = "project",                                                          // 2
    namespace = "project";                                                             // 3
                                                                                       // 4
if (package_name != "project") {                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                              // 6
}                                                                                      // 7
// integrate the fallback language translations                                        // 8
translations = {};                                                                     // 9
translations[namespace] = {"API_Gitlab_URL":"GitLab URL"};                             // 10
TAPi18n._loadLangFileObject("en", translations);                                       // 11
TAPi18n._registerServerTranslator("en", namespace);                                    // 12
                                                                                       // 13
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/packages/rocketchat_gitlabi18n/es.i18n.json              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var _ = Package.underscore._,                                                          // 1
    package_name = "project",                                                          // 2
    namespace = "project";                                                             // 3
                                                                                       // 4
if (package_name != "project") {                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                              // 6
}                                                                                      // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                         // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                        // 9
  TAPi18n.translations["es"] = {};                                                     // 10
}                                                                                      // 11
                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                             // 13
  TAPi18n.translations["es"][namespace] = {};                                          // 14
}                                                                                      // 15
                                                                                       // 16
_.extend(TAPi18n.translations["es"][namespace], {"API_Gitlab_URL":"URL de GitLab"});   // 17
TAPi18n._registerServerTranslator("es", namespace);                                    // 18
                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/packages/rocketchat_gitlabi18n/fi.i18n.json              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var _ = Package.underscore._,                                                          // 1
    package_name = "project",                                                          // 2
    namespace = "project";                                                             // 3
                                                                                       // 4
if (package_name != "project") {                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                              // 6
}                                                                                      // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                   // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                        // 9
  TAPi18n.translations["fi"] = {};                                                     // 10
}                                                                                      // 11
                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                             // 13
  TAPi18n.translations["fi"][namespace] = {};                                          // 14
}                                                                                      // 15
                                                                                       // 16
_.extend(TAPi18n.translations["fi"][namespace], {"API_Gitlab_URL":"GitLab URL"});      // 17
TAPi18n._registerServerTranslator("fi", namespace);                                    // 18
                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/packages/rocketchat_gitlabi18n/fr.i18n.json              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var _ = Package.underscore._,                                                          // 1
    package_name = "project",                                                          // 2
    namespace = "project";                                                             // 3
                                                                                       // 4
if (package_name != "project") {                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                              // 6
}                                                                                      // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                        // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                        // 9
  TAPi18n.translations["fr"] = {};                                                     // 10
}                                                                                      // 11
                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                             // 13
  TAPi18n.translations["fr"][namespace] = {};                                          // 14
}                                                                                      // 15
                                                                                       // 16
_.extend(TAPi18n.translations["fr"][namespace], {"API_Gitlab_URL":"GitLab URL"});      // 17
TAPi18n._registerServerTranslator("fr", namespace);                                    // 18
                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/packages/rocketchat_gitlabi18n/hr.i18n.json              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var _ = Package.underscore._,                                                          // 1
    package_name = "project",                                                          // 2
    namespace = "project";                                                             // 3
                                                                                       // 4
if (package_name != "project") {                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                              // 6
}                                                                                      // 7
TAPi18n.languages_names["hr"] = ["Croatian","Hrvatski"];                               // 8
if(_.isUndefined(TAPi18n.translations["hr"])) {                                        // 9
  TAPi18n.translations["hr"] = {};                                                     // 10
}                                                                                      // 11
                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["hr"][namespace])) {                             // 13
  TAPi18n.translations["hr"][namespace] = {};                                          // 14
}                                                                                      // 15
                                                                                       // 16
_.extend(TAPi18n.translations["hr"][namespace], {"API_Gitlab_URL":"GitLab link"});     // 17
TAPi18n._registerServerTranslator("hr", namespace);                                    // 18
                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/packages/rocketchat_gitlabi18n/ja.i18n.json              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var _ = Package.underscore._,                                                          // 1
    package_name = "project",                                                          // 2
    namespace = "project";                                                             // 3
                                                                                       // 4
if (package_name != "project") {                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                              // 6
}                                                                                      // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                    // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                        // 9
  TAPi18n.translations["ja"] = {};                                                     // 10
}                                                                                      // 11
                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                             // 13
  TAPi18n.translations["ja"][namespace] = {};                                          // 14
}                                                                                      // 15
                                                                                       // 16
_.extend(TAPi18n.translations["ja"][namespace], {"API_Gitlab_URL":"GitLab URL"});      // 17
TAPi18n._registerServerTranslator("ja", namespace);                                    // 18
                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/packages/rocketchat_gitlabi18n/km.i18n.json              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var _ = Package.underscore._,                                                          // 1
    package_name = "project",                                                          // 2
    namespace = "project";                                                             // 3
                                                                                       // 4
if (package_name != "project") {                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                              // 6
}                                                                                      // 7
TAPi18n.languages_names["km"] = ["Khmer","ភាសាខ្មែរ"];                                 // 8
if(_.isUndefined(TAPi18n.translations["km"])) {                                        // 9
  TAPi18n.translations["km"] = {};                                                     // 10
}                                                                                      // 11
                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["km"][namespace])) {                             // 13
  TAPi18n.translations["km"][namespace] = {};                                          // 14
}                                                                                      // 15
                                                                                       // 16
_.extend(TAPi18n.translations["km"][namespace], {"API_Gitlab_URL":"URL របស់ GitLab"});
TAPi18n._registerServerTranslator("km", namespace);                                    // 18
                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/packages/rocketchat_gitlabi18n/ko.i18n.json              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var _ = Package.underscore._,                                                          // 1
    package_name = "project",                                                          // 2
    namespace = "project";                                                             // 3
                                                                                       // 4
if (package_name != "project") {                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                              // 6
}                                                                                      // 7
TAPi18n.languages_names["ko"] = ["Korean","한국어"];                                      // 8
if(_.isUndefined(TAPi18n.translations["ko"])) {                                        // 9
  TAPi18n.translations["ko"] = {};                                                     // 10
}                                                                                      // 11
                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ko"][namespace])) {                             // 13
  TAPi18n.translations["ko"][namespace] = {};                                          // 14
}                                                                                      // 15
                                                                                       // 16
_.extend(TAPi18n.translations["ko"][namespace], {"API_Gitlab_URL":"GitLab URL"});      // 17
TAPi18n._registerServerTranslator("ko", namespace);                                    // 18
                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/packages/rocketchat_gitlabi18n/nl.i18n.json              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var _ = Package.underscore._,                                                          // 1
    package_name = "project",                                                          // 2
    namespace = "project";                                                             // 3
                                                                                       // 4
if (package_name != "project") {                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                              // 6
}                                                                                      // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                        // 9
  TAPi18n.translations["nl"] = {};                                                     // 10
}                                                                                      // 11
                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                             // 13
  TAPi18n.translations["nl"][namespace] = {};                                          // 14
}                                                                                      // 15
                                                                                       // 16
_.extend(TAPi18n.translations["nl"][namespace], {"API_Gitlab_URL":"GitLab URL"});      // 17
TAPi18n._registerServerTranslator("nl", namespace);                                    // 18
                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/packages/rocketchat_gitlabi18n/pl.i18n.json              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var _ = Package.underscore._,                                                          // 1
    package_name = "project",                                                          // 2
    namespace = "project";                                                             // 3
                                                                                       // 4
if (package_name != "project") {                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                              // 6
}                                                                                      // 7
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                   // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                        // 9
  TAPi18n.translations["pl"] = {};                                                     // 10
}                                                                                      // 11
                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                             // 13
  TAPi18n.translations["pl"][namespace] = {};                                          // 14
}                                                                                      // 15
                                                                                       // 16
_.extend(TAPi18n.translations["pl"][namespace], {"API_Gitlab_URL":"Adres GitLab"});    // 17
TAPi18n._registerServerTranslator("pl", namespace);                                    // 18
                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/packages/rocketchat_gitlabi18n/pt.i18n.json              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var _ = Package.underscore._,                                                          // 1
    package_name = "project",                                                          // 2
    namespace = "project";                                                             // 3
                                                                                       // 4
if (package_name != "project") {                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                              // 6
}                                                                                      // 7
TAPi18n.languages_names["pt"] = ["Portuguese (Portugal)","Português"];                 // 8
if(_.isUndefined(TAPi18n.translations["pt"])) {                                        // 9
  TAPi18n.translations["pt"] = {};                                                     // 10
}                                                                                      // 11
                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["pt"][namespace])) {                             // 13
  TAPi18n.translations["pt"][namespace] = {};                                          // 14
}                                                                                      // 15
                                                                                       // 16
_.extend(TAPi18n.translations["pt"][namespace], {"API_Gitlab_URL":"URL do GitLab"});   // 17
TAPi18n._registerServerTranslator("pt", namespace);                                    // 18
                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/packages/rocketchat_gitlabi18n/ro.i18n.json              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var _ = Package.underscore._,                                                          // 1
    package_name = "project",                                                          // 2
    namespace = "project";                                                             // 3
                                                                                       // 4
if (package_name != "project") {                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                              // 6
}                                                                                      // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                 // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                        // 9
  TAPi18n.translations["ro"] = {};                                                     // 10
}                                                                                      // 11
                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                             // 13
  TAPi18n.translations["ro"][namespace] = {};                                          // 14
}                                                                                      // 15
                                                                                       // 16
_.extend(TAPi18n.translations["ro"][namespace], {"API_Gitlab_URL":"GitLab URL"});      // 17
TAPi18n._registerServerTranslator("ro", namespace);                                    // 18
                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/packages/rocketchat_gitlabi18n/ru.i18n.json              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var _ = Package.underscore._,                                                          // 1
    package_name = "project",                                                          // 2
    namespace = "project";                                                             // 3
                                                                                       // 4
if (package_name != "project") {                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                              // 6
}                                                                                      // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                 // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                        // 9
  TAPi18n.translations["ru"] = {};                                                     // 10
}                                                                                      // 11
                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                             // 13
  TAPi18n.translations["ru"][namespace] = {};                                          // 14
}                                                                                      // 15
                                                                                       // 16
_.extend(TAPi18n.translations["ru"][namespace], {"API_Gitlab_URL":"GitLab URL"});      // 17
TAPi18n._registerServerTranslator("ru", namespace);                                    // 18
                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_gitlab/packages/rocketchat_gitlabi18n/zh.i18n.json              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var _ = Package.underscore._,                                                          // 1
    package_name = "project",                                                          // 2
    namespace = "project";                                                             // 3
                                                                                       // 4
if (package_name != "project") {                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                              // 6
}                                                                                      // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                      // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                        // 9
  TAPi18n.translations["zh"] = {};                                                     // 10
}                                                                                      // 11
                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                             // 13
  TAPi18n.translations["zh"][namespace] = {};                                          // 14
}                                                                                      // 15
                                                                                       // 16
_.extend(TAPi18n.translations["zh"][namespace], {"API_Gitlab_URL":"GitLab URL"});      // 17
TAPi18n._registerServerTranslator("zh", namespace);                                    // 18
                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:gitlab'] = {};

})();

//# sourceMappingURL=rocketchat_gitlab.js.map
