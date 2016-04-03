(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var Inject = Package['meteorhacks:inject-initial'].Inject;
var FastRender = Package['meteorhacks:fast-render'].FastRender;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var Promise = Package.promise.Promise;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rocketchat_ui-master/server/inject.js                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Inject.rawBody('page-loading', '\n\t<div class="page-loading">\n\t\t<div class="spinner">\n\t\t\t<div class="rect1"></div>\n\t\t\t<div class="rect2"></div>\n\t\t\t<div class="rect3"></div>\n\t\t\t<div class="rect4"></div>\n\t\t\t<div class="rect5"></div>\n\t\t</div>\n\t</div>');
///////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rocketchat_ui-master/server/fastRender.js                //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
FastRender.onAllRoutes(function (path) {                             // 1
	this.subscribe('settings');                                         // 2
	this.subscribe("meteor.loginServiceConfiguration");                 // 3
});                                                                  //
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:ui-master'] = {};

})();

//# sourceMappingURL=rocketchat_ui-master.js.map
