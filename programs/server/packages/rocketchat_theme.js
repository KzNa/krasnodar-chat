(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var Logger = Package['rocketchat:logger'].Logger;
var _ = Package.underscore._;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var WebAppHashing = Package['webapp-hashing'].WebAppHashing;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;

/* Package-scope variables */
var __coffeescriptShare, translations;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/server/server.coffee.js                                                   //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var autoprefixer, calculateClientHash, crypto, less, logger;                                           // 1
                                                                                                       //
less = Npm.require('less');                                                                            // 1
                                                                                                       //
autoprefixer = Npm.require('less-plugin-autoprefix');                                                  // 1
                                                                                                       //
crypto = Npm.require('crypto');                                                                        // 1
                                                                                                       //
logger = new Logger('rocketchat:theme', {                                                              // 1
  methods: {                                                                                           // 6
    stop_rendering: {                                                                                  // 7
      type: 'info'                                                                                     // 8
    }                                                                                                  //
  }                                                                                                    //
});                                                                                                    //
                                                                                                       //
calculateClientHash = WebAppHashing.calculateClientHash;                                               // 1
                                                                                                       //
WebAppHashing.calculateClientHash = function(manifest, includeFilter, runtimeConfigOverride) {         // 1
  var css, hash, themeManifestItem;                                                                    // 13
  css = RocketChat.theme.getCss();                                                                     // 13
  WebAppInternals.staticFiles['/__cordova/theme.css'] = WebAppInternals.staticFiles['/theme.css'] = {  // 13
    cacheable: true,                                                                                   // 16
    sourceMapUrl: void 0,                                                                              // 16
    type: 'css',                                                                                       // 16
    content: css                                                                                       // 16
  };                                                                                                   //
  hash = crypto.createHash('sha1').update(css).digest('hex');                                          // 13
  themeManifestItem = _.find(manifest, function(item) {                                                // 13
    return item.path === 'app/theme.css';                                                              // 23
  });                                                                                                  //
  if (themeManifestItem == null) {                                                                     // 24
    themeManifestItem = {};                                                                            // 25
    manifest.push(themeManifestItem);                                                                  // 25
  }                                                                                                    //
  themeManifestItem.path = 'app/theme.css';                                                            // 13
  themeManifestItem.type = 'css';                                                                      // 13
  themeManifestItem.cacheable = true;                                                                  // 13
  themeManifestItem.where = 'client';                                                                  // 13
  themeManifestItem.url = "/theme.css?" + hash;                                                        // 13
  themeManifestItem.size = css.length;                                                                 // 13
  themeManifestItem.hash = hash;                                                                       // 13
  return calculateClientHash.call(this, manifest, includeFilter, runtimeConfigOverride);               //
};                                                                                                     // 12
                                                                                                       //
RocketChat.theme = new ((function() {                                                                  // 1
  _Class.prototype.variables = {};                                                                     // 40
                                                                                                       //
  _Class.prototype.packageCallbacks = [];                                                              // 40
                                                                                                       //
  _Class.prototype.files = ['assets/stylesheets/global/_variables.less', 'assets/stylesheets/utils/_keyframes.import.less', 'assets/stylesheets/utils/_lesshat.import.less', 'assets/stylesheets/utils/_preloader.import.less', 'assets/stylesheets/utils/_reset.import.less', 'assets/stylesheets/utils/_chatops.less', 'assets/stylesheets/animation.css', 'assets/stylesheets/base.less', 'assets/stylesheets/fontello.css', 'assets/stylesheets/rtl.less', 'assets/stylesheets/swipebox.min.css', 'assets/stylesheets/utils/_colors.import.less'];
                                                                                                       //
  function _Class() {                                                                                  // 57
    this.customCSS = '';                                                                               // 58
    RocketChat.settings.add('css', '');                                                                // 58
    RocketChat.settings.addGroup('Layout');                                                            // 58
    this.compileDelayed = _.debounce(Meteor.bindEnvironment(this.compile.bind(this)), 300);            // 58
    RocketChat.settings.onload('*', Meteor.bindEnvironment((function(_this) {                          // 58
      return function(key, value, initialLoad) {                                                       //
        var name;                                                                                      // 66
        if (key === 'theme-custom-css') {                                                              // 66
          if ((value != null ? value.trim() : void 0) !== '') {                                        // 67
            _this.customCSS = value;                                                                   // 68
          }                                                                                            //
        } else if (/^theme-.+/.test(key) === true) {                                                   //
          name = key.replace(/^theme-[a-z]+-/, '');                                                    // 70
          if (_this.variables[name] != null) {                                                         // 71
            _this.variables[name].value = value;                                                       // 72
          }                                                                                            //
        } else {                                                                                       //
          return;                                                                                      // 74
        }                                                                                              //
        return _this.compileDelayed();                                                                 //
      };                                                                                               //
    })(this)));                                                                                        //
  }                                                                                                    //
                                                                                                       //
  _Class.prototype.compile = function() {                                                              // 40
    var content, file, i, j, len, len1, options, packageCallback, ref, ref1, result, start;            // 79
    content = [this.getVariablesAsLess()];                                                             // 79
    ref = this.files;                                                                                  // 83
    for (i = 0, len = ref.length; i < len; i++) {                                                      // 83
      file = ref[i];                                                                                   //
      content.push(Assets.getText(file));                                                              // 83
    }                                                                                                  // 83
    ref1 = this.packageCallbacks;                                                                      // 85
    for (j = 0, len1 = ref1.length; j < len1; j++) {                                                   // 85
      packageCallback = ref1[j];                                                                       //
      result = packageCallback();                                                                      // 86
      if (_.isString(result)) {                                                                        // 87
        content.push(result);                                                                          // 88
      }                                                                                                //
    }                                                                                                  // 85
    content.push(this.customCSS);                                                                      // 79
    content = content.join('\n');                                                                      // 79
    options = {                                                                                        // 79
      compress: true,                                                                                  // 95
      plugins: [new autoprefixer()]                                                                    // 95
    };                                                                                                 //
    start = Date.now();                                                                                // 79
    return less.render(content, options, function(err, data) {                                         //
      logger.stop_rendering(Date.now() - start);                                                       // 102
      if (err != null) {                                                                               // 103
        return console.log(err);                                                                       // 104
      }                                                                                                //
      RocketChat.settings.updateById('css', data.css);                                                 // 102
      return process.emit('message', {                                                                 //
        refresh: 'client'                                                                              // 108
      });                                                                                              //
    });                                                                                                //
  };                                                                                                   //
                                                                                                       //
  _Class.prototype.addVariable = function(type, name, value, persist) {                                // 40
    var config;                                                                                        // 111
    if (persist == null) {                                                                             //
      persist = true;                                                                                  //
    }                                                                                                  //
    this.variables[name] = {                                                                           // 111
      type: type,                                                                                      // 112
      value: value                                                                                     // 112
    };                                                                                                 //
    if (persist === true) {                                                                            // 115
      config = {                                                                                       // 116
        group: 'Layout',                                                                               // 117
        type: type,                                                                                    // 117
        section: 'Colors',                                                                             // 117
        "public": false                                                                                // 117
      };                                                                                               //
      return RocketChat.settings.add("theme-" + type + "-" + name, value, config);                     //
    }                                                                                                  //
  };                                                                                                   //
                                                                                                       //
  _Class.prototype.addPublicColor = function(name, value) {                                            // 40
    return this.addVariable('color', name, value, true);                                               //
  };                                                                                                   //
                                                                                                       //
  _Class.prototype.getVariablesAsObject = function() {                                                 // 40
    var name, obj, ref, variable;                                                                      // 128
    obj = {};                                                                                          // 128
    ref = this.variables;                                                                              // 129
    for (name in ref) {                                                                                // 129
      variable = ref[name];                                                                            //
      obj[name] = variable.value;                                                                      // 130
    }                                                                                                  // 129
    return obj;                                                                                        // 132
  };                                                                                                   //
                                                                                                       //
  _Class.prototype.getVariablesAsLess = function() {                                                   // 40
    var items, name, ref, variable;                                                                    // 135
    items = [];                                                                                        // 135
    ref = this.variables;                                                                              // 136
    for (name in ref) {                                                                                // 136
      variable = ref[name];                                                                            //
      items.push("@" + name + ": " + variable.value + ";");                                            // 137
    }                                                                                                  // 136
    return items.join('\n');                                                                           // 139
  };                                                                                                   //
                                                                                                       //
  _Class.prototype.addPackageAsset = function(cb) {                                                    // 40
    this.packageCallbacks.push(cb);                                                                    // 142
    return this.compileDelayed();                                                                      //
  };                                                                                                   //
                                                                                                       //
  _Class.prototype.getCss = function() {                                                               // 40
    return RocketChat.settings.get('css');                                                             // 146
  };                                                                                                   //
                                                                                                       //
  return _Class;                                                                                       //
                                                                                                       //
})());                                                                                                 //
                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/server/variables.coffee.js                                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.theme.addPublicColor("primary-background-color", "#04436a");                                // 1
                                                                                                       //
RocketChat.theme.addPublicColor("primary-font-color", "#444444");                                      // 1
                                                                                                       //
RocketChat.theme.addPublicColor("secondary-background-color", "#f4f4f4");                              // 1
                                                                                                       //
RocketChat.theme.addPublicColor("secondary-font-color", "#7f7f7f");                                    // 1
                                                                                                       //
RocketChat.theme.addPublicColor("tertiary-background-color", "#eaeaea");                               // 1
                                                                                                       //
RocketChat.theme.addPublicColor("tertiary-font-color", "rgba(255, 255, 255, 0.6)");                    // 1
                                                                                                       //
RocketChat.theme.addPublicColor("quaternary-font-color", "#ffffff");                                   // 1
                                                                                                       //
RocketChat.theme.addPublicColor("action-buttons-color", "#13679a");                                    // 1
                                                                                                       //
RocketChat.theme.addPublicColor("active-channel-background-color", "rgba(255, 255, 255, 0.075)");      // 1
                                                                                                       //
RocketChat.theme.addPublicColor("active-channel-font-color", "rgba(255, 255, 255, 0.75)");             // 1
                                                                                                       //
RocketChat.theme.addPublicColor("blockquote-background", "#cccccc");                                   // 1
                                                                                                       //
RocketChat.theme.addPublicColor("clean-buttons-color", "rgba(0, 0, 0, 0.25)");                         // 1
                                                                                                       //
RocketChat.theme.addPublicColor("code-background", "#f8f8f8");                                         // 1
                                                                                                       //
RocketChat.theme.addPublicColor("code-border", "#cccccc");                                             // 1
                                                                                                       //
RocketChat.theme.addPublicColor("code-color", "#333333");                                              // 1
                                                                                                       //
RocketChat.theme.addPublicColor("content-background-color", "#ffffff");                                // 1
                                                                                                       //
RocketChat.theme.addPublicColor("custom-scrollbar-color", "rgba(255, 255, 255, 0.05)");                // 1
                                                                                                       //
RocketChat.theme.addPublicColor("info-active-font-color", "#ff0000");                                  // 1
                                                                                                       //
RocketChat.theme.addPublicColor("info-font-color", "#aaaaaa");                                         // 1
                                                                                                       //
RocketChat.theme.addPublicColor("input-font-color", "rgba(255, 255, 255, 0.85)");                      // 1
                                                                                                       //
RocketChat.theme.addPublicColor("link-font-color", "#008ce3");                                         // 1
                                                                                                       //
RocketChat.theme.addPublicColor("message-hover-background-color", "rgba(0, 0, 0, 0.025)");             // 1
                                                                                                       //
RocketChat.theme.addPublicColor("smallprint-font-color", "#c2e7ff");                                   // 1
                                                                                                       //
RocketChat.theme.addPublicColor("smallprint-hover-color", "#ffffff");                                  // 1
                                                                                                       //
RocketChat.theme.addPublicColor("status-away", "#fcb316");                                             // 1
                                                                                                       //
RocketChat.theme.addPublicColor("status-busy", "#d30230");                                             // 1
                                                                                                       //
RocketChat.theme.addPublicColor("status-offline", "rgba(150, 150, 150, 0.50)");                        // 1
                                                                                                       //
RocketChat.theme.addPublicColor("status-online", "#35ac19");                                           // 1
                                                                                                       //
RocketChat.theme.addPublicColor("unread-notification-color", "#1dce73");                               // 1
                                                                                                       //
RocketChat.settings.add("theme-custom-css", '', {                                                      // 1
  group: 'Layout',                                                                                     // 34
  type: 'code',                                                                                        // 34
  code: 'text/x-less',                                                                                 // 34
  multiline: true,                                                                                     // 34
  section: 'Custom CSS',                                                                               // 34
  "public": false                                                                                      // 34
});                                                                                                    //
                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/packages/rocketchat_themei18n/ar.i18n.json                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _ = Package.underscore._,                                                                          // 1
    package_name = "project",                                                                          // 2
    namespace = "project";                                                                             // 3
                                                                                                       // 4
if (package_name != "project") {                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                              // 6
}                                                                                                      // 7
TAPi18n.languages_names["ar"] = ["Arabic","العربية"];                                                  // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                                 // 10
if(_.isUndefined(TAPi18n.translations["ar"])) {                                                        // 11
  TAPi18n.translations["ar"] = {};                                                                     // 12
}                                                                                                      // 13
                                                                                                       // 14
if(_.isUndefined(TAPi18n.translations["ar"][namespace])) {                                             // 15
  TAPi18n.translations["ar"][namespace] = {};                                                          // 16
}                                                                                                      // 17
                                                                                                       // 18
_.extend(TAPi18n.translations["ar"][namespace], {"theme-color-blockquote-background":"لون خلفية الاقتباس","theme-color-status-away":"لون حالة بعيد","theme-color-status-busy":"لون حالة مشغول"});
TAPi18n._registerServerTranslator("ar", namespace);                                                    // 20
                                                                                                       // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/packages/rocketchat_themei18n/de.i18n.json                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _ = Package.underscore._,                                                                          // 1
    package_name = "project",                                                                          // 2
    namespace = "project";                                                                             // 3
                                                                                                       // 4
if (package_name != "project") {                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                              // 6
}                                                                                                      // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                                  // 8
if(_.isUndefined(TAPi18n.translations["de"])) {                                                        // 9
  TAPi18n.translations["de"] = {};                                                                     // 10
}                                                                                                      // 11
                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                             // 13
  TAPi18n.translations["de"][namespace] = {};                                                          // 14
}                                                                                                      // 15
                                                                                                       // 16
_.extend(TAPi18n.translations["de"][namespace], {"theme-color-action-buttons-color":"Farbe des Aktionsbuttons","theme-color-active-channel-background-color":"Hintergrundfarbe von aktiven Kanälen","theme-color-active-channel-font-color":"Schriftfarbe von aktiven Kanälen","theme-color-blockquote-background":"Hintergrundfarbe der Blockquotes ","theme-color-clean-buttons-color":"Farbe des Säuberungsknopfs","theme-color-code-background":"Hintergrundfarbe des Codes","theme-color-code-border":"Randfarbe des Codes","theme-color-code-color":"Farbe des Codes","theme-color-content-background-color":"Hintergrundfarbe des Inhalts","theme-color-custom-scrollbar-color":"Benutzerdefinierte Farbe der Scrollbar","theme-color-info-active-font-color":"Schriftfarbe von aktiven Informationen","theme-color-info-font-color":"Schriftfarbe von Informationen","theme-color-input-font-color":"Schriftfarbe der Eingabe","theme-color-link-font-color":"Schriftfarbe des Links","theme-color-message-hover-background-color":"Hintergrundfarbe beim Mauskontakt mit einer Nachricht","theme-color-primary-background-color":"Primäre Hintergrundfarbe ","theme-color-primary-font-color":"Primäre Schriftfarbe","theme-color-quaternary-font-color":"Quartäre Schriftfarbe","theme-color-secondary-background-color":"Sekundäre Hintergrundfarbe","theme-color-secondary-font-color":"Sekundäre Schriftfarbe","theme-color-smallprint-font-color":"Schriftfarbe des Kleingedrucktem","theme-color-smallprint-hover-color":"Farbe bei Mauskontakt mit Kleingedrucktem","theme-color-status-away":"Farbe des Status \"abwesend\"","theme-color-status-busy":"Farbe des Status \"beschäftigt\"","theme-color-status-offline":"Farbe des Status \"offline\"\n","theme-color-status-online":"Farbe des Status \"online\"","theme-color-tertiary-background-color":"Tertiäre Hintergrundfarbe ","theme-color-tertiary-font-color":"Tertiäre Schriftfarbe","theme-color-unread-notification-color":"Farbe von ungelesenen Benachrichtigungen","theme-custom-css":"Benutzerdefiniertes CSS"});
TAPi18n._registerServerTranslator("de", namespace);                                                    // 18
                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/packages/rocketchat_themei18n/en.i18n.json                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _ = Package.underscore._,                                                                          // 1
    package_name = "project",                                                                          // 2
    namespace = "project";                                                                             // 3
                                                                                                       // 4
if (package_name != "project") {                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                              // 6
}                                                                                                      // 7
// integrate the fallback language translations                                                        // 8
translations = {};                                                                                     // 9
translations[namespace] = {"theme-color-action-buttons-color":"Actions Buttons Color","theme-color-active-channel-background-color":"Active Channel Background Color","theme-color-active-channel-font-color":"Active Channel Font Color","theme-color-blockquote-background":"Blockquote Background Color","theme-color-clean-buttons-color":"Clean Buttons Color","theme-color-code-background":"Code Background Color","theme-color-code-border":"Code Border Color","theme-color-code-color":"Code Color","theme-color-content-background-color":"Content Background Color","theme-color-custom-scrollbar-color":"Custom Scrollbar Color","theme-color-info-active-font-color":"Active Info Font Color","theme-color-info-font-color":"Info Font Color","theme-color-input-font-color":"Input Font Color","theme-color-link-font-color":"Link Font Color","theme-color-message-hover-background-color":"Message Hover BG Color","theme-color-primary-background-color":"Primary Background Color","theme-color-primary-font-color":"Primary Font Color","theme-color-quaternary-font-color":"Quaternary Font Color","theme-color-secondary-background-color":"Secondary Background Color","theme-color-secondary-font-color":"Secondary Font Color","theme-color-smallprint-font-color":"Small Print Font Color","theme-color-smallprint-hover-color":"Small Print Hover Color","theme-color-status-away":"Away Status Color","theme-color-status-busy":"Busy Status Color","theme-color-status-offline":"Offline Status Color","theme-color-status-online":"Online Status Color","theme-color-tertiary-background-color":"Tertiary Background Color","theme-color-tertiary-font-color":"Tertiary Font Color","theme-color-unread-notification-color":"Unread Notifications Color","theme-custom-css":"Custom CSS"};
TAPi18n._loadLangFileObject("en", translations);                                                       // 11
TAPi18n._registerServerTranslator("en", namespace);                                                    // 12
                                                                                                       // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/packages/rocketchat_themei18n/es.i18n.json                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _ = Package.underscore._,                                                                          // 1
    package_name = "project",                                                                          // 2
    namespace = "project";                                                                             // 3
                                                                                                       // 4
if (package_name != "project") {                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                              // 6
}                                                                                                      // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                                         // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                                        // 9
  TAPi18n.translations["es"] = {};                                                                     // 10
}                                                                                                      // 11
                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                                             // 13
  TAPi18n.translations["es"][namespace] = {};                                                          // 14
}                                                                                                      // 15
                                                                                                       // 16
_.extend(TAPi18n.translations["es"][namespace], {"theme-color-blockquote-background":"Color del Fondo del Bloque de Citas","theme-color-code-background":"Color del Fondo de Bloque de Codigo","theme-color-code-border":"Color del Borde del Bloque de Codigo","theme-color-code-color":"Codigo del Color","theme-color-content-background-color":"Color del Fondo del Contenido","theme-color-info-active-font-color":"Color de la Fuente de la Información Activa","theme-color-info-font-color":"Color de la Fuente de Informacion","theme-color-input-font-color":"Color de la Fuente de Entrada","theme-color-link-font-color":"Color de la Fuente de los Hipervinculos","theme-color-primary-background-color":"Color Primario del Fondo ","theme-color-primary-font-color":"Color Primario de la Fuente","theme-color-secondary-background-color":"Color Secundario del Fondo","theme-color-secondary-font-color":"Color Secundario de la Fuente","theme-color-status-away":"Color del Estado Ausente","theme-color-status-offline":"Color del Estado Desconectado","theme-color-status-online":"Color del Estado Conectado"});
TAPi18n._registerServerTranslator("es", namespace);                                                    // 18
                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/packages/rocketchat_themei18n/fi.i18n.json                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _ = Package.underscore._,                                                                          // 1
    package_name = "project",                                                                          // 2
    namespace = "project";                                                                             // 3
                                                                                                       // 4
if (package_name != "project") {                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                              // 6
}                                                                                                      // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                                   // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                                        // 9
  TAPi18n.translations["fi"] = {};                                                                     // 10
}                                                                                                      // 11
                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                                             // 13
  TAPi18n.translations["fi"][namespace] = {};                                                          // 14
}                                                                                                      // 15
                                                                                                       // 16
_.extend(TAPi18n.translations["fi"][namespace], {"theme-color-action-buttons-color":"Toimintapainikkeiden väri","theme-color-active-channel-background-color":"Aktiivisen kanavan taustaväri","theme-color-active-channel-font-color":"Aktiivisen kanavan tekstin väri","theme-color-blockquote-background":"Lainauksen taustaväri","theme-color-code-background":"Koodin taustaväri","theme-color-code-border":"Koodin reunusväri","theme-color-code-color":"Koodin väri","theme-color-content-background-color":"Sisällön taustaväri","theme-color-custom-scrollbar-color":"Vierityspalkin väri (custom)","theme-color-info-active-font-color":"Aktiivisen infon fontin väri","theme-color-info-font-color":"Infon fontin väri","theme-color-input-font-color":"Syötteen fontin väri","theme-color-link-font-color":"Linkin fontin väri","theme-color-message-hover-background-color":"Message Hover BG Color","theme-color-primary-background-color":"Ensisijainen taustaväri","theme-color-primary-font-color":"Ensisijainen fontin väri","theme-color-quaternary-font-color":"Neljäs tekstin väri","theme-color-secondary-background-color":"Toissijainen taustaväri","theme-color-secondary-font-color":"Toissijainen fontin väri","theme-color-smallprint-font-color":"Pienen tekstin fontin väri","theme-color-smallprint-hover-color":"Pienen tekstin korostusväri","theme-color-status-away":"Poissa-tilan väri","theme-color-status-busy":"Varattu-tilan väri","theme-color-status-offline":"Offline-tilan väri","theme-color-status-online":"Online-tilan väri","theme-color-tertiary-background-color":"Tertiäärinen (se kolmas) taustaväri","theme-color-tertiary-font-color":"Tertiäärinen (se kolmas) fontin väri"});
TAPi18n._registerServerTranslator("fi", namespace);                                                    // 18
                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/packages/rocketchat_themei18n/fr.i18n.json                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _ = Package.underscore._,                                                                          // 1
    package_name = "project",                                                                          // 2
    namespace = "project";                                                                             // 3
                                                                                                       // 4
if (package_name != "project") {                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                              // 6
}                                                                                                      // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                        // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                        // 9
  TAPi18n.translations["fr"] = {};                                                                     // 10
}                                                                                                      // 11
                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                             // 13
  TAPi18n.translations["fr"][namespace] = {};                                                          // 14
}                                                                                                      // 15
                                                                                                       // 16
_.extend(TAPi18n.translations["fr"][namespace], {"theme-color-action-buttons-color":"Couleur des boutons d'action","theme-color-active-channel-background-color":"Couleur d'arrière plan du canal actif","theme-color-active-channel-font-color":"Couleur de police du canal actif","theme-color-blockquote-background":"Couleur d'arrière plan des citations","theme-color-clean-buttons-color":"Couleur des boutons neutres","theme-color-code-background":"Couleur d'arrière plan du code","theme-color-code-border":"Couleur des bordures du code","theme-color-code-color":"Couleur du code","theme-color-content-background-color":"Couleur d'arrière plan du contenu","theme-color-custom-scrollbar-color":"Couleur personnalisée de la barre de défilement","theme-color-info-active-font-color":"Couleur de la police des informations actives","theme-color-info-font-color":"Couleur de la police des informations","theme-color-input-font-color":"Couleur de la police du champ de saisie","theme-color-link-font-color":"Couleur de la police des liens","theme-color-message-hover-background-color":"Couleur d'arrière plan des messages au survol","theme-color-primary-background-color":"Couleur d'arrière plan principale","theme-color-primary-font-color":"Couleur de la police principale","theme-color-quaternary-font-color":"Quatrième couleur de police","theme-color-secondary-background-color":"Couleur d'arrière plan secondaire","theme-color-secondary-font-color":"Couleur de police secondaire","theme-color-smallprint-font-color":"Couleur de la police des petits messages","theme-color-smallprint-hover-color":"Couleur de survol des petits messages","theme-color-status-away":"Couleur du statut \"Absent\"","theme-color-status-busy":"Couleur du statut \"Occupé\"","theme-color-status-offline":"Couleur du statut \"Hors-ligne\"","theme-color-status-online":"Couleur du statut \"Connecté\"","theme-color-tertiary-background-color":"Couleur de fond tertiaire (contenu)","theme-color-tertiary-font-color":"Couleur de police tertiaire (contenu)","theme-color-unread-notification-color":"Couleur des notifications non-lues","theme-custom-css":"CSS personnalisé"});
TAPi18n._registerServerTranslator("fr", namespace);                                                    // 18
                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/packages/rocketchat_themei18n/ja.i18n.json                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _ = Package.underscore._,                                                                          // 1
    package_name = "project",                                                                          // 2
    namespace = "project";                                                                             // 3
                                                                                                       // 4
if (package_name != "project") {                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                              // 6
}                                                                                                      // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                                    // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                        // 9
  TAPi18n.translations["ja"] = {};                                                                     // 10
}                                                                                                      // 11
                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                             // 13
  TAPi18n.translations["ja"][namespace] = {};                                                          // 14
}                                                                                                      // 15
                                                                                                       // 16
_.extend(TAPi18n.translations["ja"][namespace], {"theme-color-action-buttons-color":"アクション ボタン色","theme-color-active-channel-background-color":"アクティブなチャンネル 背景色","theme-color-active-channel-font-color":"アクティブなチャンネル 文字色","theme-color-blockquote-background":"引用 背景色","theme-color-clean-buttons-color":"操作 ボタン色","theme-color-code-background":"コード 背景色","theme-color-code-border":"コード 枠色","theme-color-code-color":"コード色","theme-color-content-background-color":"コンテンツ 背景色","theme-color-custom-scrollbar-color":"カスタム スクロールバー色","theme-color-info-active-font-color":"アクティブな情報 文字色","theme-color-info-font-color":"情報 文字色","theme-color-input-font-color":"入力 文字色","theme-color-link-font-color":"リンク 文字色","theme-color-message-hover-background-color":"メッセージ ホバー 背景色","theme-color-primary-background-color":"基本 背景色","theme-color-primary-font-color":"基本 文字色","theme-color-quaternary-font-color":"四次 文字色","theme-color-secondary-background-color":"二次 背景色","theme-color-secondary-font-color":"二次 文字色","theme-color-smallprint-font-color":"小さい表示 文字色","theme-color-smallprint-hover-color":"小さい表示 ホバー 文字色","theme-color-status-away":"離席中 ステータス色","theme-color-status-busy":"取り込み中 ステータス色","theme-color-status-offline":"状態を隠す ステータス色","theme-color-status-online":"オンライン ステータス色","theme-color-tertiary-background-color":"三次 背景色","theme-color-tertiary-font-color":"三次 文字色","theme-color-unread-notification-color":"未読 通知色","theme-custom-css":"カスタム CSS"});
TAPi18n._registerServerTranslator("ja", namespace);                                                    // 18
                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/packages/rocketchat_themei18n/km.i18n.json                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _ = Package.underscore._,                                                                          // 1
    package_name = "project",                                                                          // 2
    namespace = "project";                                                                             // 3
                                                                                                       // 4
if (package_name != "project") {                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                              // 6
}                                                                                                      // 7
TAPi18n.languages_names["km"] = ["Khmer","ភាសាខ្មែរ"];                                                 // 8
if(_.isUndefined(TAPi18n.translations["km"])) {                                                        // 9
  TAPi18n.translations["km"] = {};                                                                     // 10
}                                                                                                      // 11
                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["km"][namespace])) {                                             // 13
  TAPi18n.translations["km"][namespace] = {};                                                          // 14
}                                                                                                      // 15
                                                                                                       // 16
_.extend(TAPi18n.translations["km"][namespace], {"theme-color-blockquote-background":"ពណ៌ផ្ទៃខាងក្រោយនៃ Blockquote","theme-color-code-background":"កូដពណ៌ផ្ទៃខាងក្រោម","theme-color-code-border":"កូដពណ៌ជាយ","theme-color-code-color":"កូដពណ៌","theme-color-content-background-color":"ពណ៌ផ្ទៃខាងក្រោយអត្ថបទ","theme-color-info-active-font-color":"ពណ៌ពុម្ពអក្សររបស់ Active Info","theme-color-info-font-color":"ពណ៌ពុម្ពអក្សររបស់ Info","theme-color-input-font-color":"ពណ៌ពុម្ពអក្សរបញ្ចូល","theme-color-link-font-color":"ពណ៌ពុម្ពអក្សរតំណភ្ជាប់","theme-color-primary-background-color":"ពណ៌អាទិភាពផ្ទៃខាងក្រោយ","theme-color-primary-font-color":"ពណ៌អាទិភាពពុម្ពអក្សរ","theme-color-secondary-background-color":"ពណ៌បន្ទាប់បន្សំផ្ទៃខាងក្រោយ","theme-color-secondary-font-color":"ពណ៌បន្ទាប់បន្សំពុម្ពអក្សរ","theme-color-status-away":"ពណ៌ស្ថានភាពនៅឆ្ងាយ","theme-color-status-busy":"ពណ៌ស្ថានភាពរវល់","theme-color-status-offline":"ពណ៌ស្ថានភាពក្រៅបណ្តាញ","theme-color-status-online":"ពណ៌ស្ថានភាពលើបណ្តាញ"});
TAPi18n._registerServerTranslator("km", namespace);                                                    // 18
                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/packages/rocketchat_themei18n/ko.i18n.json                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _ = Package.underscore._,                                                                          // 1
    package_name = "project",                                                                          // 2
    namespace = "project";                                                                             // 3
                                                                                                       // 4
if (package_name != "project") {                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                              // 6
}                                                                                                      // 7
TAPi18n.languages_names["ko"] = ["Korean","한국어"];                                                      // 8
if(_.isUndefined(TAPi18n.translations["ko"])) {                                                        // 9
  TAPi18n.translations["ko"] = {};                                                                     // 10
}                                                                                                      // 11
                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ko"][namespace])) {                                             // 13
  TAPi18n.translations["ko"][namespace] = {};                                                          // 14
}                                                                                                      // 15
                                                                                                       // 16
_.extend(TAPi18n.translations["ko"][namespace], {"theme-color-blockquote-background":"인용구 배경색","theme-color-code-background":"코드 배경색","theme-color-code-border":"코드 테두리 색상","theme-color-code-color":"코드 색상","theme-color-content-background-color":"콘텐츠 배경색","theme-color-info-font-color":"글자 색상 정보","theme-color-primary-background-color":"기본 배경색","theme-color-primary-font-color":"기본 글자 색상","theme-color-secondary-background-color":"보조 배경색","theme-color-secondary-font-color":"보조 글자 색상","theme-color-status-away":"자리비움 상태 색상","theme-color-status-busy":"바쁨 상태 색상","theme-color-status-offline":"보지않음 상태 색상","theme-color-status-online":"온라인 상태 색상"});
TAPi18n._registerServerTranslator("ko", namespace);                                                    // 18
                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/packages/rocketchat_themei18n/nl.i18n.json                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _ = Package.underscore._,                                                                          // 1
    package_name = "project",                                                                          // 2
    namespace = "project";                                                                             // 3
                                                                                                       // 4
if (package_name != "project") {                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                              // 6
}                                                                                                      // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                                // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                                        // 9
  TAPi18n.translations["nl"] = {};                                                                     // 10
}                                                                                                      // 11
                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                                             // 13
  TAPi18n.translations["nl"][namespace] = {};                                                          // 14
}                                                                                                      // 15
                                                                                                       // 16
_.extend(TAPi18n.translations["nl"][namespace], {"theme-color-action-buttons-color":"Aktie knoppen kleur","theme-color-active-channel-background-color":"Actieve Kanaal Achtergrondkleur","theme-color-active-channel-font-color":"Actieve Kanaal Tekstkleur","theme-color-blockquote-background":"Blockquote Achtergrondkleur","theme-color-clean-buttons-color":"Clean Buttons Color","theme-color-code-background":"Code Achtergrondkleur","theme-color-code-border":"Code Randkleur","theme-color-code-color":"Code Kleur","theme-color-content-background-color":"Inhoud Achtergrondkleur","theme-color-custom-scrollbar-color":"Handmatige Scrollbarkleur","theme-color-info-active-font-color":"Aktieve Info Tekstkleur","theme-color-info-font-color":"Info Tekstkleur","theme-color-input-font-color":"Input Tekstkleur","theme-color-link-font-color":"Link Tekstkleur","theme-color-message-hover-background-color":"Achtergrondkleur als muis er boven is","theme-color-primary-background-color":"Primaire Achtergrondkleur","theme-color-primary-font-color":"Primaire Tekstkleur","theme-color-quaternary-font-color":"Quaternary Font Color","theme-color-secondary-background-color":"Secondaire Achtergrondkleur","theme-color-secondary-font-color":"Secondaire Tekstkleur","theme-color-smallprint-font-color":"Kleine-tekst Tekstkleur","theme-color-smallprint-hover-color":"Small Print Hover Color","theme-color-status-away":"Afwezig Statuskleur","theme-color-status-busy":"Bezet Statuskleur","theme-color-status-offline":"Offline Statuskleur","theme-color-status-online":"Online Statuskleur","theme-color-tertiary-background-color":"Tertiaire Achtergronkleur","theme-color-tertiary-font-color":"Tertiaire Tekstkleur ","theme-color-unread-notification-color":"Ongelezen Notificaties Kleur"});
TAPi18n._registerServerTranslator("nl", namespace);                                                    // 18
                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/packages/rocketchat_themei18n/pl.i18n.json                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _ = Package.underscore._,                                                                          // 1
    package_name = "project",                                                                          // 2
    namespace = "project";                                                                             // 3
                                                                                                       // 4
if (package_name != "project") {                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                              // 6
}                                                                                                      // 7
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                                   // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                                        // 9
  TAPi18n.translations["pl"] = {};                                                                     // 10
}                                                                                                      // 11
                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                                             // 13
  TAPi18n.translations["pl"][namespace] = {};                                                          // 14
}                                                                                                      // 15
                                                                                                       // 16
_.extend(TAPi18n.translations["pl"][namespace], {"theme-color-blockquote-background":"Kolor tła bloku cytatu","theme-color-code-background":"Kolor tła bloku kodu","theme-color-code-border":"Kolor ramki bloku kodu","theme-color-code-color":"Kolor czcionki bloku kodu","theme-color-content-background-color":"Kolor tła zawartości","theme-color-info-active-font-color":"Kolor czcionki aktywnej informacji","theme-color-info-font-color":"Kolor czcionki informacji","theme-color-input-font-color":"Kolor czcionki w polach tekstowych","theme-color-link-font-color":"Kolor czcionki odnośników","theme-color-primary-background-color":"Podstawowy kolor tła","theme-color-primary-font-color":"Podstawowy kolor czcionki","theme-color-secondary-background-color":"Dodatkowy kolor tła","theme-color-secondary-font-color":"Dodatkowy kolor czcionki","theme-color-smallprint-font-color":"Kolor czcionki drobnego druku","theme-color-smallprint-hover-color":"Kolor aktywny drobnego druku","theme-color-status-away":"Kolor statusu Zaraz wracam","theme-color-status-busy":"Kolor statusu Zajęty","theme-color-status-offline":"Kolor statusu Niedostępny","theme-color-status-online":"Kolor statusu Online","theme-color-tertiary-background-color":"Trzeciorzędny kolor tła","theme-color-tertiary-font-color":"Trzeciorzędny kolor czcionki"});
TAPi18n._registerServerTranslator("pl", namespace);                                                    // 18
                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/packages/rocketchat_themei18n/ro.i18n.json                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _ = Package.underscore._,                                                                          // 1
    package_name = "project",                                                                          // 2
    namespace = "project";                                                                             // 3
                                                                                                       // 4
if (package_name != "project") {                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                              // 6
}                                                                                                      // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                                 // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                        // 9
  TAPi18n.translations["ro"] = {};                                                                     // 10
}                                                                                                      // 11
                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                             // 13
  TAPi18n.translations["ro"][namespace] = {};                                                          // 14
}                                                                                                      // 15
                                                                                                       // 16
_.extend(TAPi18n.translations["ro"][namespace], {"theme-color-action-buttons-color":"Culoare butoane acțiuni","theme-color-active-channel-background-color":"Culoare de fundal canal activ","theme-color-active-channel-font-color":"Culoare text canal activ","theme-color-blockquote-background":"Culoare de fundal Blockquote ","theme-color-clean-buttons-color":"Culoare butoane curate","theme-color-code-background":"Culoare de fundal cod","theme-color-code-border":"Culoare chenar cod","theme-color-code-color":"Culoare cod","theme-color-content-background-color":"Culoare de fundal conținut","theme-color-custom-scrollbar-color":"Culoare Scrollbar personalizat","theme-color-info-active-font-color":"Culoare text informații activ","theme-color-info-font-color":"Culoare text info","theme-color-input-font-color":"Culoare text input","theme-color-link-font-color":"Culoare text link","theme-color-message-hover-background-color":"Culoare fundal mesaj la 'hover'","theme-color-primary-background-color":"Culoare de fundal primară","theme-color-primary-font-color":"Culoare text primară","theme-color-quaternary-font-color":"Culoare font cuaternar","theme-color-secondary-background-color":"Culoare de fundal secundară","theme-color-secondary-font-color":"Culoare text secundară","theme-color-smallprint-font-color":"Culoare text mic","theme-color-smallprint-hover-color":"Culoare text mic la 'hover'","theme-color-status-away":"Culoare status 'Away'","theme-color-status-busy":"Culoare status 'Ocupat'","theme-color-status-offline":"Culoare status 'Offline'","theme-color-status-online":"Culoare status 'Activ'","theme-color-tertiary-background-color":"Culoare de fundal terțiară","theme-color-tertiary-font-color":"Culoare text terțiară","theme-color-unread-notification-color":"Culoare notificări mesaje necitite","theme-custom-css":"CSS personalizat"});
TAPi18n._registerServerTranslator("ro", namespace);                                                    // 18
                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/packages/rocketchat_themei18n/ru.i18n.json                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _ = Package.underscore._,                                                                          // 1
    package_name = "project",                                                                          // 2
    namespace = "project";                                                                             // 3
                                                                                                       // 4
if (package_name != "project") {                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                              // 6
}                                                                                                      // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                                 // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                        // 9
  TAPi18n.translations["ru"] = {};                                                                     // 10
}                                                                                                      // 11
                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                             // 13
  TAPi18n.translations["ru"][namespace] = {};                                                          // 14
}                                                                                                      // 15
                                                                                                       // 16
_.extend(TAPi18n.translations["ru"][namespace], {"theme-color-action-buttons-color":"Цвет кнопок действий","theme-color-active-channel-background-color":"Цвет фона активного канала","theme-color-active-channel-font-color":"Цвет шрифта активного канала","theme-color-blockquote-background":"Blockquote Цвет Фона ","theme-color-clean-buttons-color":"Цвет кнопок \"удалить\"","theme-color-code-background":"Код цвета фона","theme-color-code-border":"Код цвета рамки","theme-color-code-color":"Код цвета","theme-color-content-background-color":"Цвет фона содержимого","theme-color-custom-scrollbar-color":"Пользовательский цвет полосы прокрутки","theme-color-info-active-font-color":"Цвет шрифта актуальной информации","theme-color-info-font-color":"Цвет шрифта информации","theme-color-input-font-color":"Цвет шрифта ввода","theme-color-link-font-color":"Цвет шрифта ссылки","theme-color-message-hover-background-color":"Цвет фона сообщения при наведении","theme-color-primary-background-color":"Основной цвет фона","theme-color-primary-font-color":"Основной цвет шрифта","theme-color-quaternary-font-color":"Четвёртый цвет шрифта","theme-color-secondary-background-color":"Второй цвет фона","theme-color-secondary-font-color":"Второй цвет шрифта","theme-color-smallprint-font-color":"Цвет мелкого шрифта","theme-color-smallprint-hover-color":"Цвет мелкого шрифта при наведении","theme-color-status-away":"Цвет статуса \"Нет на месте\"","theme-color-status-busy":"Цвет статуса \"Занят\"","theme-color-status-offline":"Цвет статуса \"Не в сети\"","theme-color-status-online":"Цвет статуса \"В сети\"","theme-color-tertiary-background-color":"Третий цвет фона","theme-color-tertiary-font-color":"Третий цвет шрифта","theme-color-unread-notification-color":"Цвет непрочитанных уведомлений","theme-custom-css":"Пользовательский CSS"});
TAPi18n._registerServerTranslator("ru", namespace);                                                    // 18
                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/packages/rocketchat_themei18n/sv.i18n.json                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _ = Package.underscore._,                                                                          // 1
    package_name = "project",                                                                          // 2
    namespace = "project";                                                                             // 3
                                                                                                       // 4
if (package_name != "project") {                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                              // 6
}                                                                                                      // 7
TAPi18n.languages_names["sv"] = ["Swedish","Svenska"];                                                 // 8
if(_.isUndefined(TAPi18n.translations["sv"])) {                                                        // 9
  TAPi18n.translations["sv"] = {};                                                                     // 10
}                                                                                                      // 11
                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["sv"][namespace])) {                                             // 13
  TAPi18n.translations["sv"][namespace] = {};                                                          // 14
}                                                                                                      // 15
                                                                                                       // 16
_.extend(TAPi18n.translations["sv"][namespace], {"theme-color-code-background":"Kod bakgrundsfärg","theme-color-code-color":"Kodfärg","theme-color-status-away":"Statusfärg för Borta","theme-color-status-busy":"Statusfärg för Upptagen","theme-color-status-offline":"Statusfärg för Offline","theme-color-status-online":"Statusfärg för Online"});
TAPi18n._registerServerTranslator("sv", namespace);                                                    // 18
                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/packages/rocketchat_themei18n/zh-TW.i18n.json                             //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _ = Package.underscore._,                                                                          // 1
    package_name = "project",                                                                          // 2
    namespace = "project";                                                                             // 3
                                                                                                       // 4
if (package_name != "project") {                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                              // 6
}                                                                                                      // 7
TAPi18n.languages_names["zh-TW"] = ["Chinese (Taiwan)","繁体中文（台湾）"];                                    // 8
if(_.isUndefined(TAPi18n.translations["zh-TW"])) {                                                     // 9
  TAPi18n.translations["zh-TW"] = {};                                                                  // 10
}                                                                                                      // 11
                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["zh-TW"][namespace])) {                                          // 13
  TAPi18n.translations["zh-TW"][namespace] = {};                                                       // 14
}                                                                                                      // 15
                                                                                                       // 16
_.extend(TAPi18n.translations["zh-TW"][namespace], {"theme-color-primary-background-color":"主要背景顏色"});
TAPi18n._registerServerTranslator("zh-TW", namespace);                                                 // 18
                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_theme/packages/rocketchat_themei18n/zh.i18n.json                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _ = Package.underscore._,                                                                          // 1
    package_name = "project",                                                                          // 2
    namespace = "project";                                                                             // 3
                                                                                                       // 4
if (package_name != "project") {                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                              // 6
}                                                                                                      // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                                      // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                        // 9
  TAPi18n.translations["zh"] = {};                                                                     // 10
}                                                                                                      // 11
                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                             // 13
  TAPi18n.translations["zh"][namespace] = {};                                                          // 14
}                                                                                                      // 15
                                                                                                       // 16
_.extend(TAPi18n.translations["zh"][namespace], {"theme-color-action-buttons-color":"行动按钮颜色","theme-color-active-channel-background-color":"活跃频道背景颜色","theme-color-active-channel-font-color":"活跃频道字体颜色","theme-color-blockquote-background":"引用文本的背景颜色","theme-color-clean-buttons-color":"清楚按钮颜色","theme-color-code-background":"代码块的背景颜色","theme-color-code-border":"代码块的边框颜色","theme-color-code-color":"代码颜色","theme-color-content-background-color":"内容的背景色","theme-color-custom-scrollbar-color":"定制滚动条颜色","theme-color-info-active-font-color":"活跃信息的字体颜色","theme-color-info-font-color":"信息的字体颜色","theme-color-input-font-color":"输入框文字的字体颜色","theme-color-link-font-color":"链接的字体颜色","theme-color-message-hover-background-color":"信息悬停背景色","theme-color-primary-background-color":"主背景色","theme-color-primary-font-color":"主要字体颜色","theme-color-quaternary-font-color":"第四级字体颜色","theme-color-secondary-background-color":"第二背景色","theme-color-secondary-font-color":"第二字体颜色","theme-color-smallprint-font-color":"小号打印字体颜色","theme-color-smallprint-hover-color":"小号打印字体悬停颜色","theme-color-status-away":"离开状态颜色","theme-color-status-busy":"忙碌状态颜色","theme-color-status-offline":"离线状态颜色","theme-color-status-online":"在线状态颜色","theme-color-tertiary-background-color":"第三背景颜色","theme-color-tertiary-font-color":"第三字体颜色","theme-color-unread-notification-color":"未读消息颜色"});
TAPi18n._registerServerTranslator("zh", namespace);                                                    // 18
                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:theme'] = {};

})();

//# sourceMappingURL=rocketchat_theme.js.map
