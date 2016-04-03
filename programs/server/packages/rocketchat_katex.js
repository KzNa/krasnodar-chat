(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var s = Package['underscorestring:underscore.string'].s;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;

/* Package-scope variables */
var __coffeescriptShare, translations;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/rocketchat_katex/settings.coffee.js                                                    //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function() {                                                                        // 1
  return RocketChat.settings.add('Katex_Enabled', false, {                                         //
    type: 'boolean',                                                                               // 2
    group: 'Message',                                                                              // 2
    section: 'Katex',                                                                              // 2
    "public": true,                                                                                // 2
    i18nLabel: 'Katex_Enabled'                                                                     // 2
  });                                                                                              //
});                                                                                                // 1
                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/rocketchat_katex/katex.coffee.js                                                       //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                                   // 1
/*                                                                                                 // 1
 * KaTeX is a fast, easy-to-use JavaScript library for TeX math rendering on the web.              //
 * https://github.com/Khan/KaTeX                                                                   //
 */                                                                                                //
var Katex, cb;                                                                                     // 1
                                                                                                   //
Katex = (function() {                                                                              // 1
  var Boundary;                                                                                    // 7
                                                                                                   //
  function Katex() {}                                                                              //
                                                                                                   //
  Katex.prototype.delimiters_map = {                                                               // 7
    '\\[': {                                                                                       // 7
      closer: '\\]',                                                                               // 8
      displayMode: true                                                                            // 8
    },                                                                                             //
    '\\(': {                                                                                       // 7
      closer: '\\)',                                                                               // 9
      displayMode: false                                                                           // 9
    }                                                                                              //
  };                                                                                               //
                                                                                                   //
  Katex.prototype.find_opening_delimiter = function(str) {                                         // 7
    var b, match, match_index, matches, o, pos, positions;                                         // 19
    matches = (function() {                                                                        // 19
      var ref, results;                                                                            //
      ref = this.delimiters_map;                                                                   // 19
      results = [];                                                                                // 19
      for (b in ref) {                                                                             //
        o = ref[b];                                                                                //
        results.push({                                                                             // 19
          options: o,                                                                              // 19
          pos: str.indexOf(b)                                                                      // 19
        });                                                                                        //
      }                                                                                            // 19
      return results;                                                                              //
    }).call(this);                                                                                 //
    positions = (function() {                                                                      // 19
      var i, len, results;                                                                         //
      results = [];                                                                                // 20
      for (i = 0, len = matches.length; i < len; i++) {                                            //
        b = matches[i];                                                                            //
        if (b.pos >= 0) {                                                                          //
          results.push(b.pos);                                                                     // 20
        }                                                                                          //
      }                                                                                            // 20
      return results;                                                                              //
    })();                                                                                          //
    if (positions.length === 0) {                                                                  // 23
      return null;                                                                                 // 24
    }                                                                                              //
    pos = Math.min.apply(Math, positions);                                                         // 19
    match_index = ((function() {                                                                   // 19
      var i, len, results;                                                                         //
      results = [];                                                                                // 29
      for (i = 0, len = matches.length; i < len; i++) {                                            //
        b = matches[i];                                                                            //
        results.push(b.pos);                                                                       // 29
      }                                                                                            // 29
      return results;                                                                              //
    })()).indexOf(pos);                                                                            //
    match = matches[match_index];                                                                  // 19
    return match;                                                                                  // 32
  };                                                                                               //
                                                                                                   //
  Boundary = (function() {                                                                         // 7
    function Boundary() {}                                                                         //
                                                                                                   //
    Boundary.prototype.length = function() {                                                       // 35
      return this.end - this.start;                                                                // 36
    };                                                                                             //
                                                                                                   //
    return Boundary;                                                                               //
                                                                                                   //
  })();                                                                                            //
                                                                                                   //
  Katex.prototype.get_latex_boundaries = function(str, opening_delimiter_match) {                  // 7
    var closer, closer_index, inner, outer;                                                        // 41
    inner = new Boundary;                                                                          // 41
    outer = new Boundary;                                                                          // 41
    closer = opening_delimiter_match.options.closer;                                               // 41
    outer.start = opening_delimiter_match.pos;                                                     // 41
    inner.start = opening_delimiter_match.pos + closer.length;                                     // 41
    closer_index = str.substr(inner.start).indexOf(closer);                                        // 41
    if (closer_index < 0) {                                                                        // 52
      return null;                                                                                 // 53
    }                                                                                              //
    inner.end = inner.start + closer_index;                                                        // 41
    outer.end = inner.end + closer.length;                                                         // 41
    return {                                                                                       // 58
      outer: outer,                                                                                // 58
      inner: inner                                                                                 // 58
    };                                                                                             //
  };                                                                                               //
                                                                                                   //
  Katex.prototype.find_latex = function(str) {                                                     // 7
    var match, opening_delimiter_match;                                                            // 65
    if (!(str.length && ((opening_delimiter_match = this.find_opening_delimiter(str)) != null))) {
      return null;                                                                                 // 66
    }                                                                                              //
    match = this.get_latex_boundaries(str, opening_delimiter_match);                               // 65
    if (match != null) {                                                                           //
      match.options = opening_delimiter_match.options;                                             //
    }                                                                                              //
    return match;                                                                                  // 72
  };                                                                                               //
                                                                                                   //
  Katex.prototype.extract_latex = function(str, match) {                                           // 7
    var after, before, latex;                                                                      // 77
    before = str.substr(0, match.outer.start);                                                     // 77
    after = str.substr(match.outer.end);                                                           // 77
    latex = str.substr(match.inner.start, match.inner.length());                                   // 77
    latex = s.unescapeHTML(latex);                                                                 // 77
    return {                                                                                       // 83
      before: before,                                                                              // 83
      latex: latex,                                                                                // 83
      after: after                                                                                 // 83
    };                                                                                             //
  };                                                                                               //
                                                                                                   //
  Katex.prototype.render_latex = function(latex, displayMode) {                                    // 7
    var display_mode, e, rendered;                                                                 // 88
    try {                                                                                          // 88
      rendered = katex.renderToString(latex, {                                                     // 89
        displayMode: displayMode                                                                   // 89
      });                                                                                          //
    } catch (_error) {                                                                             //
      e = _error;                                                                                  // 91
      display_mode = displayMode ? "block" : "inline";                                             // 91
      rendered = "<div class=\"katex-error katex-" + display_mode + "-error\">";                   // 91
      rendered += "" + e.message;                                                                  // 91
      rendered += "</div>";                                                                        // 91
    }                                                                                              //
    return rendered;                                                                               // 96
  };                                                                                               //
                                                                                                   //
  Katex.prototype.render = function(str) {                                                         // 7
    var match, parts, rendered, result;                                                            // 100
    result = '';                                                                                   // 100
    while (true) {                                                                                 // 102
      match = this.find_latex(str);                                                                // 105
      if (match == null) {                                                                         // 106
        result += str;                                                                             // 107
        break;                                                                                     // 108
      }                                                                                            //
      parts = this.extract_latex(str, match);                                                      // 105
      rendered = this.render_latex(parts.latex, match.options.displayMode);                        // 105
      result += parts.before + rendered;                                                           // 105
      str = parts.after;                                                                           // 105
    }                                                                                              //
    return result;                                                                                 // 120
  };                                                                                               //
                                                                                                   //
  Katex.prototype.render_message = function(message) {                                             // 7
    var msg;                                                                                       // 125
    if (RocketChat.settings.get('Katex_Enabled')) {                                                // 125
      msg = message;                                                                               // 126
      if (!_.isString(message)) {                                                                  // 128
        if (_.trim(message.html)) {                                                                // 129
          msg = message.html;                                                                      // 130
        } else {                                                                                   //
          return message;                                                                          // 132
        }                                                                                          //
      }                                                                                            //
      msg = this.render(msg);                                                                      // 126
      if (!_.isString(message)) {                                                                  // 136
        message.html = msg;                                                                        // 137
      } else {                                                                                     //
        message = msg;                                                                             // 139
      }                                                                                            //
    }                                                                                              //
    return message;                                                                                // 141
  };                                                                                               //
                                                                                                   //
  return Katex;                                                                                    //
                                                                                                   //
})();                                                                                              //
                                                                                                   //
RocketChat.katex = new Katex;                                                                      // 1
                                                                                                   //
cb = RocketChat.katex.render_message.bind(RocketChat.katex);                                       // 1
                                                                                                   //
RocketChat.callbacks.add('renderMessage', cb);                                                     // 1
                                                                                                   //
if (Meteor.isClient) {                                                                             // 148
  Blaze.registerHelper('RocketChatKatex', function(text) {                                         // 149
    return RocketChat.katex.render_message(text);                                                  // 150
  });                                                                                              //
}                                                                                                  //
                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/rocketchat_katex/packages/rocketchat_katexi18n/de.i18n.json                            //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
var _ = Package.underscore._,                                                                      // 1
    package_name = "project",                                                                      // 2
    namespace = "project";                                                                         // 3
                                                                                                   // 4
if (package_name != "project") {                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                          // 6
}                                                                                                  // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                              // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                             // 10
if(_.isUndefined(TAPi18n.translations["de"])) {                                                    // 11
  TAPi18n.translations["de"] = {};                                                                 // 12
}                                                                                                  // 13
                                                                                                   // 14
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                         // 15
  TAPi18n.translations["de"][namespace] = {};                                                      // 16
}                                                                                                  // 17
                                                                                                   // 18
_.extend(TAPi18n.translations["de"][namespace], {"Katex_Enabled":"Katex ist aktiviert."});         // 19
TAPi18n._registerServerTranslator("de", namespace);                                                // 20
                                                                                                   // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/rocketchat_katex/packages/rocketchat_katexi18n/en.i18n.json                            //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
var _ = Package.underscore._,                                                                      // 1
    package_name = "project",                                                                      // 2
    namespace = "project";                                                                         // 3
                                                                                                   // 4
if (package_name != "project") {                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                          // 6
}                                                                                                  // 7
// integrate the fallback language translations                                                    // 8
translations = {};                                                                                 // 9
translations[namespace] = {"Katex_Enabled":"Katex Enabled"};                                       // 10
TAPi18n._loadLangFileObject("en", translations);                                                   // 11
TAPi18n._registerServerTranslator("en", namespace);                                                // 12
                                                                                                   // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/rocketchat_katex/packages/rocketchat_katexi18n/fr.i18n.json                            //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
var _ = Package.underscore._,                                                                      // 1
    package_name = "project",                                                                      // 2
    namespace = "project";                                                                         // 3
                                                                                                   // 4
if (package_name != "project") {                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                          // 6
}                                                                                                  // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                    // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                    // 9
  TAPi18n.translations["fr"] = {};                                                                 // 10
}                                                                                                  // 11
                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                         // 13
  TAPi18n.translations["fr"][namespace] = {};                                                      // 14
}                                                                                                  // 15
                                                                                                   // 16
_.extend(TAPi18n.translations["fr"][namespace], {"Katex_Enabled":"Katex activé"});                 // 17
TAPi18n._registerServerTranslator("fr", namespace);                                                // 18
                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/rocketchat_katex/packages/rocketchat_katexi18n/ja.i18n.json                            //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
var _ = Package.underscore._,                                                                      // 1
    package_name = "project",                                                                      // 2
    namespace = "project";                                                                         // 3
                                                                                                   // 4
if (package_name != "project") {                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                          // 6
}                                                                                                  // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                                // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                    // 9
  TAPi18n.translations["ja"] = {};                                                                 // 10
}                                                                                                  // 11
                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                         // 13
  TAPi18n.translations["ja"][namespace] = {};                                                      // 14
}                                                                                                  // 15
                                                                                                   // 16
_.extend(TAPi18n.translations["ja"][namespace], {"Katex_Enabled":"Katex を有効にする"});                 // 17
TAPi18n._registerServerTranslator("ja", namespace);                                                // 18
                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/rocketchat_katex/packages/rocketchat_katexi18n/ro.i18n.json                            //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
var _ = Package.underscore._,                                                                      // 1
    package_name = "project",                                                                      // 2
    namespace = "project";                                                                         // 3
                                                                                                   // 4
if (package_name != "project") {                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                          // 6
}                                                                                                  // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                             // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                    // 9
  TAPi18n.translations["ro"] = {};                                                                 // 10
}                                                                                                  // 11
                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                         // 13
  TAPi18n.translations["ro"][namespace] = {};                                                      // 14
}                                                                                                  // 15
                                                                                                   // 16
_.extend(TAPi18n.translations["ro"][namespace], {"Katex_Enabled":"Katex activat"});                // 17
TAPi18n._registerServerTranslator("ro", namespace);                                                // 18
                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/rocketchat_katex/packages/rocketchat_katexi18n/ru.i18n.json                            //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
var _ = Package.underscore._,                                                                      // 1
    package_name = "project",                                                                      // 2
    namespace = "project";                                                                         // 3
                                                                                                   // 4
if (package_name != "project") {                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                          // 6
}                                                                                                  // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                             // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                    // 9
  TAPi18n.translations["ru"] = {};                                                                 // 10
}                                                                                                  // 11
                                                                                                   // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                         // 13
  TAPi18n.translations["ru"][namespace] = {};                                                      // 14
}                                                                                                  // 15
                                                                                                   // 16
_.extend(TAPi18n.translations["ru"][namespace], {"Katex_Enabled":"Katex включен"});                // 17
TAPi18n._registerServerTranslator("ru", namespace);                                                // 18
                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:katex'] = {};

})();

//# sourceMappingURL=rocketchat_katex.js.map
