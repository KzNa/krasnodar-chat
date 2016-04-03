(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;

/* Package-scope variables */
var __coffeescriptShare, translations, WebRTC;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/server/settings.coffee.js                                         //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.settings.addGroup('WebRTC', function() {                                             // 1
  this.add('WebRTC_Enable_Channel', false, {                                                    // 2
    type: 'boolean',                                                                            // 2
    group: 'WebRTC',                                                                            // 2
    "public": true                                                                              // 2
  });                                                                                           //
  this.add('WebRTC_Enable_Private', true, {                                                     // 2
    type: 'boolean',                                                                            // 3
    group: 'WebRTC',                                                                            // 3
    "public": true                                                                              // 3
  });                                                                                           //
  this.add('WebRTC_Enable_Direct', true, {                                                      // 2
    type: 'boolean',                                                                            // 4
    group: 'WebRTC',                                                                            // 4
    "public": true                                                                              // 4
  });                                                                                           //
  return this.add('WebRTC_Servers', 'stun:stun.l.google.com:19302, stun:23.21.150.121, team%40rocket.chat:demo@turn:numb.viagenie.ca:3478', {
    type: 'string',                                                                             // 5
    group: 'WebRTC',                                                                            // 5
    "public": true                                                                              // 5
  });                                                                                           //
});                                                                                             // 1
                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/ar.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["ar"] = ["Arabic","العربية"];                                           // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                          // 10
if(_.isUndefined(TAPi18n.translations["ar"])) {                                                 // 11
  TAPi18n.translations["ar"] = {};                                                              // 12
}                                                                                               // 13
                                                                                                // 14
if(_.isUndefined(TAPi18n.translations["ar"][namespace])) {                                      // 15
  TAPi18n.translations["ar"][namespace] = {};                                                   // 16
}                                                                                               // 17
                                                                                                // 18
_.extend(TAPi18n.translations["ar"][namespace], {"WebRTC_Enable_Channel":"تمكين للقنوات العامة","WebRTC_Enable_Direct":"تمكين للرسائل المباشرة","WebRTC_Enable_Private":"تمكين للقنوات الخاصة"});
TAPi18n._registerServerTranslator("ar", namespace);                                             // 20
                                                                                                // 21
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/de.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                           // 8
if(_.isUndefined(TAPi18n.translations["de"])) {                                                 // 9
  TAPi18n.translations["de"] = {};                                                              // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                      // 13
  TAPi18n.translations["de"][namespace] = {};                                                   // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["de"][namespace], {"WebRTC_Enable_Channel":"Für öffentliche Kanäle aktivieren","WebRTC_Enable_Direct":"Für private Nachrichten aktivieren","WebRTC_Enable_Private":"Für private Kanäle aktivieren","WebRTC_Servers":"STUN/TURN-Server","WebRTC_Servers_Description":"Kommata-getrennte Liste von STUN- und TURN-Servern.<br/>Benutzernamen, Passwörter und Ports sind in diesen Formaten erlaubt: `username:password@stun:host:port` oder `username:password@turn:host:port"});
TAPi18n._registerServerTranslator("de", namespace);                                             // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/en.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
// integrate the fallback language translations                                                 // 8
translations = {};                                                                              // 9
translations[namespace] = {"WebRTC_Enable_Channel":"Enable for Public Channels","WebRTC_Enable_Direct":"Enable for Direct Messages","WebRTC_Enable_Private":"Enable for Private Channels","WebRTC_Servers":"STUN/TURN Servers","WebRTC_Servers_Description":"A list of STUN and TURN servers separated by comma.<br/>Username, password and port are allowed in the format `username:password@stun:host:port` or `username:password@turn:host:port`."};
TAPi18n._loadLangFileObject("en", translations);                                                // 11
TAPi18n._registerServerTranslator("en", namespace);                                             // 12
                                                                                                // 13
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/es.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                                  // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                                 // 9
  TAPi18n.translations["es"] = {};                                                              // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                                      // 13
  TAPi18n.translations["es"][namespace] = {};                                                   // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["es"][namespace], {"WebRTC_Enable_Channel":"Habilitar para Canales Publicos","WebRTC_Enable_Direct":"Habilitar para Mensajes Directos","WebRTC_Enable_Private":"Habilitar para Canales Privados"});
TAPi18n._registerServerTranslator("es", namespace);                                             // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/fi.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                            // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                                 // 9
  TAPi18n.translations["fi"] = {};                                                              // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                                      // 13
  TAPi18n.translations["fi"][namespace] = {};                                                   // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["fi"][namespace], {"WebRTC_Enable_Channel":"Ota käyttöön julkisilla kanavilla","WebRTC_Enable_Direct":"Ota käyttöön yksityisviesteissä","WebRTC_Enable_Private":"Ota käyttöön privaattiryhmissä"});
TAPi18n._registerServerTranslator("fi", namespace);                                             // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/fr.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                 // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                 // 9
  TAPi18n.translations["fr"] = {};                                                              // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                      // 13
  TAPi18n.translations["fr"][namespace] = {};                                                   // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["fr"][namespace], {"WebRTC_Enable_Channel":"Activer pour les canaux publics","WebRTC_Enable_Direct":"Activer pour les messages privés","WebRTC_Enable_Private":"Activer pour les groupes privés","WebRTC_Servers":"Serveurs STUN/TURN","WebRTC_Servers_Description":"Une liste de serveurs STUN et TURN séparés par une virgule.<br/> Vous pouvez utiliser utilisateur, mot de passe et port selon le format `utilisateur:motdepasse@stun:hôte:port` ou `utilisateur:motdepasse@turn:hôte:port`."});
TAPi18n._registerServerTranslator("fr", namespace);                                             // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/he.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["he"] = ["Hebrew","עברית"];                                             // 8
if(_.isUndefined(TAPi18n.translations["he"])) {                                                 // 9
  TAPi18n.translations["he"] = {};                                                              // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["he"][namespace])) {                                      // 13
  TAPi18n.translations["he"][namespace] = {};                                                   // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["he"][namespace], {"WebRTC_Enable_Direct":"אפשר הודעות ישירות"});
TAPi18n._registerServerTranslator("he", namespace);                                             // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/hr.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["hr"] = ["Croatian","Hrvatski"];                                        // 8
if(_.isUndefined(TAPi18n.translations["hr"])) {                                                 // 9
  TAPi18n.translations["hr"] = {};                                                              // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["hr"][namespace])) {                                      // 13
  TAPi18n.translations["hr"][namespace] = {};                                                   // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["hr"][namespace], {"WebRTC_Enable_Channel":"Omogući za javne kanale","WebRTC_Enable_Direct":"Omogući za izravne poruke","WebRTC_Enable_Private":"Omogući za privatne kanale"});
TAPi18n._registerServerTranslator("hr", namespace);                                             // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/ja.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                             // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                 // 9
  TAPi18n.translations["ja"] = {};                                                              // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                      // 13
  TAPi18n.translations["ja"][namespace] = {};                                                   // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["ja"][namespace], {"WebRTC_Enable_Channel":"パブリックチャンネルで有効にする","WebRTC_Enable_Direct":"ダイレクトメッセージで有効にする","WebRTC_Enable_Private":"プライベートチャンネルで有効にする","WebRTC_Servers":"STUN/TURN サーバー","WebRTC_Servers_Description":"カンマ区切りの STUN と TRUN サーバー一覧。<br/>ユーザー名、パスワードとポートは、`ユーザー名:パスワード@stun:ホスト:ポート` または `ユーザー名:パスワード@turn:ホスト:ポート` の形式で指定してください。"});
TAPi18n._registerServerTranslator("ja", namespace);                                             // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/km.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["km"] = ["Khmer","ភាសាខ្មែរ"];                                          // 8
if(_.isUndefined(TAPi18n.translations["km"])) {                                                 // 9
  TAPi18n.translations["km"] = {};                                                              // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["km"][namespace])) {                                      // 13
  TAPi18n.translations["km"][namespace] = {};                                                   // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["km"][namespace], {"WebRTC_Enable_Channel":"អនុញ្ញាតិគ្រប់ប៉ុស្តិ៍សាធារណ","WebRTC_Enable_Direct":"អនុញ្ញតិសារផ្ទាល់","WebRTC_Enable_Private":"អនុញ្ញាតិគ្រប់ប៉ុស្តិ៍ឯកជន"});
TAPi18n._registerServerTranslator("km", namespace);                                             // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/ko.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["ko"] = ["Korean","한국어"];                                               // 8
if(_.isUndefined(TAPi18n.translations["ko"])) {                                                 // 9
  TAPi18n.translations["ko"] = {};                                                              // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["ko"][namespace])) {                                      // 13
  TAPi18n.translations["ko"][namespace] = {};                                                   // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["ko"][namespace], {"WebRTC_Enable_Channel":"공개 채널 사용","WebRTC_Enable_Direct":"귓속말 사용","WebRTC_Enable_Private":"비밀 그룹 사용"});
TAPi18n._registerServerTranslator("ko", namespace);                                             // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/nl.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                         // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                                 // 9
  TAPi18n.translations["nl"] = {};                                                              // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                                      // 13
  TAPi18n.translations["nl"][namespace] = {};                                                   // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["nl"][namespace], {"WebRTC_Enable_Channel":"Toestaan voor openbare kanalen","WebRTC_Enable_Direct":"Toestaan directe berichten","WebRTC_Enable_Private":"Toestaan voor privé-berichten"});
TAPi18n._registerServerTranslator("nl", namespace);                                             // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/pl.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                            // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                                 // 9
  TAPi18n.translations["pl"] = {};                                                              // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                                      // 13
  TAPi18n.translations["pl"][namespace] = {};                                                   // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["pl"][namespace], {"WebRTC_Enable_Channel":"Włącz dla kanałów publicznych","WebRTC_Enable_Direct":"Włącz dla prywatnych wiadomości","WebRTC_Enable_Private":"Włącz dla grup prywatnych"});
TAPi18n._registerServerTranslator("pl", namespace);                                             // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/pt.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["pt"] = ["Portuguese (Portugal)","Português"];                          // 8
if(_.isUndefined(TAPi18n.translations["pt"])) {                                                 // 9
  TAPi18n.translations["pt"] = {};                                                              // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["pt"][namespace])) {                                      // 13
  TAPi18n.translations["pt"][namespace] = {};                                                   // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["pt"][namespace], {"WebRTC_Enable_Channel":"Habilitar para canais públicos","WebRTC_Enable_Direct":"Ativar Mensagens Diretas","WebRTC_Enable_Private":"Habilitar para canais privados"});
TAPi18n._registerServerTranslator("pt", namespace);                                             // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/ro.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                          // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                 // 9
  TAPi18n.translations["ro"] = {};                                                              // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                      // 13
  TAPi18n.translations["ro"][namespace] = {};                                                   // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["ro"][namespace], {"WebRTC_Enable_Channel":"Activați pentru canale publice","WebRTC_Enable_Direct":"Activați pentru mesaje directe","WebRTC_Enable_Private":"Activați pentru canale private"});
TAPi18n._registerServerTranslator("ro", namespace);                                             // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/ru.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                          // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                 // 9
  TAPi18n.translations["ru"] = {};                                                              // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                      // 13
  TAPi18n.translations["ru"][namespace] = {};                                                   // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["ru"][namespace], {"WebRTC_Enable_Channel":"Включить для публичных чатов","WebRTC_Enable_Direct":"Включить для личных сообщений","WebRTC_Enable_Private":"Включить для приватных чатов","WebRTC_Servers":"Серверы STUN/TURN ","WebRTC_Servers_Description":"Список STUN/TURN серверов разделен запятой.<br/>Имя пользователя, пароль и порт разрешены в формате `username:password@stun:host:port` или`username:password@turn:host:port`."});
TAPi18n._registerServerTranslator("ru", namespace);                                             // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/sv.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["sv"] = ["Swedish","Svenska"];                                          // 8
if(_.isUndefined(TAPi18n.translations["sv"])) {                                                 // 9
  TAPi18n.translations["sv"] = {};                                                              // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["sv"][namespace])) {                                      // 13
  TAPi18n.translations["sv"][namespace] = {};                                                   // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["sv"][namespace], {"WebRTC_Enable_Channel":"Aktivera för publika kanaler\n","WebRTC_Enable_Direct":"Aktivera för direktmeddelanden\n","WebRTC_Enable_Private":"Aktivera för privata kanaler"});
TAPi18n._registerServerTranslator("sv", namespace);                                             // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/zh-TW.i18n.json                    //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["zh-TW"] = ["Chinese (Taiwan)","繁体中文（台湾）"];                             // 8
if(_.isUndefined(TAPi18n.translations["zh-TW"])) {                                              // 9
  TAPi18n.translations["zh-TW"] = {};                                                           // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["zh-TW"][namespace])) {                                   // 13
  TAPi18n.translations["zh-TW"][namespace] = {};                                                // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["zh-TW"][namespace], {"WebRTC_Enable_Channel":"允許公共頻道","WebRTC_Enable_Private":"允許私人頻道"});
TAPi18n._registerServerTranslator("zh-TW", namespace);                                          // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_webrtc/packages/rocketchat_webrtci18n/zh.i18n.json                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var _ = Package.underscore._,                                                                   // 1
    package_name = "project",                                                                   // 2
    namespace = "project";                                                                      // 3
                                                                                                // 4
if (package_name != "project") {                                                                // 5
    namespace = TAPi18n.packages[package_name].namespace;                                       // 6
}                                                                                               // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                               // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                 // 9
  TAPi18n.translations["zh"] = {};                                                              // 10
}                                                                                               // 11
                                                                                                // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                      // 13
  TAPi18n.translations["zh"][namespace] = {};                                                   // 14
}                                                                                               // 15
                                                                                                // 16
_.extend(TAPi18n.translations["zh"][namespace], {"WebRTC_Enable_Channel":"允许公共频道","WebRTC_Enable_Direct":"允许直接信息","WebRTC_Enable_Private":"允许私有频道"});
TAPi18n._registerServerTranslator("zh", namespace);                                             // 18
                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:webrtc'] = {
  WebRTC: WebRTC
};

})();

//# sourceMappingURL=rocketchat_webrtc.js.map
