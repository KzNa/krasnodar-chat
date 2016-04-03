(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var RateLimiter = Package['rate-limit'].RateLimiter;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var ECMAScript = Package.ecmascript.ECMAScript;
var Random = Package.random.Random;
var check = Package.check.check;
var Match = Package.check.Match;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var DDPRateLimiter = Package['ddp-rate-limiter'].DDPRateLimiter;
var _ = Package.underscore._;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var s = Package['underscorestring:underscore.string'].s;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var Logger = Package['rocketchat:logger'].Logger;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var __coffeescriptShare, RocketChat, userIdsToSendEmail, emailValidation, user, result, translations;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/lib/core.coffee.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                                                       // 1
/*                                                                                                                     // 1
 * Kick off the global namespace for RocketChat.                                                                       //
 * @namespace RocketChat                                                                                               //
 */                                                                                                                    //
                                                                                                                       // 1
                                                                                                                       //
RocketChat = {                                                                                                         // 1
  models: {}                                                                                                           // 7
};                                                                                                                     //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/lib/debug.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.debugLevel = 'debug';                                                                                       // 1
                                                                                                                       //
Meteor.startup(function () {                                                                                           // 3
	RocketChat.settings.onload('Debug_Level', function (key, value, initialLoad) {                                        // 4
		if (value) {                                                                                                         // 5
			RocketChat.debugLevel = value;                                                                                      // 6
		}                                                                                                                    //
	});                                                                                                                   //
                                                                                                                       //
	var value = RocketChat.settings.get('Debug_Level');                                                                   // 10
	if (value) {                                                                                                          // 11
		RocketChat.debugLevel = value;                                                                                       // 12
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
var wrapMethods = function (name, originalHandler, methodsMap) {                                                       // 16
	methodsMap[name] = function () {                                                                                      // 17
		if (RocketChat.debugLevel === 'debug') {                                                                             // 18
			var args = name === "ufsWrite" ? Array.prototype.slice.call(arguments, 1) : arguments;                              // 19
			console.log('[methods]'.green, name, '-> userId:', Meteor.userId(), ', arguments: ', args);                         // 20
		}                                                                                                                    //
                                                                                                                       //
		return originalHandler.apply(this, arguments);                                                                       // 23
	};                                                                                                                    //
};                                                                                                                     //
                                                                                                                       //
var originalMeteorMethods = Meteor.methods;                                                                            // 27
                                                                                                                       //
Meteor.methods = function (methodMap) {                                                                                // 29
	_.each(methodMap, function (handler, name) {                                                                          // 30
		wrapMethods(name, handler, methodMap);                                                                               // 31
	});                                                                                                                   //
	originalMeteorMethods(methodMap);                                                                                     // 33
};                                                                                                                     //
                                                                                                                       //
var originalMeteorPublish = Meteor.publish;                                                                            // 36
                                                                                                                       //
Meteor.publish = function (name, func) {                                                                               // 38
	return originalMeteorPublish(name, function () {                                                                      // 39
		if (RocketChat.debugLevel === 'debug') {                                                                             // 40
			console.log('[publish]'.green, name, '-> userId:', this.userId, ', arguments: ', arguments);                        // 41
		}                                                                                                                    //
                                                                                                                       //
		return func.apply(this, arguments);                                                                                  // 44
	});                                                                                                                   //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/lib/settings.coffee.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                                                       // 1
/*                                                                                                                     // 1
 * RocketChat.settings holds all packages settings                                                                     //
 * @namespace RocketChat.settings                                                                                      //
 */                                                                                                                    //
RocketChat.settings = {                                                                                                // 1
  callbacks: {},                                                                                                       // 6
  ts: new Date,                                                                                                        // 6
  get: function(_id) {                                                                                                 // 6
    var ref;                                                                                                           // 10
    return (ref = Meteor.settings) != null ? ref[_id] : void 0;                                                        // 10
  },                                                                                                                   //
  get: function(_id, callback) {                                                                                       // 6
    var ref, ref1, ref2;                                                                                               // 13
    if (callback != null) {                                                                                            // 13
      RocketChat.settings.onload(_id, callback);                                                                       // 14
      if (((ref = Meteor.settings) != null ? ref[_id] : void 0) != null) {                                             // 15
        return callback(_id, (ref1 = Meteor.settings) != null ? ref1[_id] : void 0);                                   //
      }                                                                                                                //
    } else {                                                                                                           //
      return (ref2 = Meteor.settings) != null ? ref2[_id] : void 0;                                                    // 18
    }                                                                                                                  //
  },                                                                                                                   //
  set: function(_id, value, callback) {                                                                                // 6
    return Meteor.call('saveSetting', _id, value, callback);                                                           //
  },                                                                                                                   //
  batchSet: function(settings, callback) {                                                                             // 6
    var actions, save;                                                                                                 // 28
    save = function(setting) {                                                                                         // 28
      return function(callback) {                                                                                      // 29
        return Meteor.call('saveSetting', setting._id, setting.value, callback);                                       //
      };                                                                                                               //
    };                                                                                                                 //
    actions = _.map(settings, function(setting) {                                                                      // 28
      return save(setting);                                                                                            //
    });                                                                                                                //
    return _(actions).reduceRight(_.wrap, function(err, success) {                                                     //
      return callback(err, success);                                                                                   // 33
    })();                                                                                                              //
  },                                                                                                                   //
  load: function(key, value, initialLoad) {                                                                            // 6
    var callback, i, j, len, len1, ref, ref1, results;                                                                 // 36
    if (RocketChat.settings.callbacks[key] != null) {                                                                  // 36
      ref = RocketChat.settings.callbacks[key];                                                                        // 37
      for (i = 0, len = ref.length; i < len; i++) {                                                                    // 37
        callback = ref[i];                                                                                             //
        callback(key, value, initialLoad);                                                                             // 38
      }                                                                                                                // 37
    }                                                                                                                  //
    if (RocketChat.settings.callbacks['*'] != null) {                                                                  // 40
      ref1 = RocketChat.settings.callbacks['*'];                                                                       // 41
      results = [];                                                                                                    // 41
      for (j = 0, len1 = ref1.length; j < len1; j++) {                                                                 //
        callback = ref1[j];                                                                                            //
        results.push(callback(key, value, initialLoad));                                                               // 42
      }                                                                                                                // 41
      return results;                                                                                                  //
    }                                                                                                                  //
  },                                                                                                                   //
  onload: function(key, callback) {                                                                                    // 6
    var base, i, k, keys, len, results;                                                                                // 52
    keys = [].concat(key);                                                                                             // 52
    results = [];                                                                                                      // 54
    for (i = 0, len = keys.length; i < len; i++) {                                                                     //
      k = keys[i];                                                                                                     //
      if ((base = RocketChat.settings.callbacks)[k] == null) {                                                         //
        base[k] = [];                                                                                                  //
      }                                                                                                                //
      results.push(RocketChat.settings.callbacks[k].push(callback));                                                   // 55
    }                                                                                                                  // 54
    return results;                                                                                                    //
  }                                                                                                                    //
};                                                                                                                     //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/lib/configLogger.coffee.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.settings.get('Log_Package', function(key, value) {                                                          // 1
  return typeof LoggerManager !== "undefined" && LoggerManager !== null ? LoggerManager.showPackage = value : void 0;  //
});                                                                                                                    // 1
                                                                                                                       //
RocketChat.settings.get('Log_File', function(key, value) {                                                             // 1
  return typeof LoggerManager !== "undefined" && LoggerManager !== null ? LoggerManager.showFileAndLine = value : void 0;
});                                                                                                                    // 4
                                                                                                                       //
RocketChat.settings.get('Log_Level', function(key, value) {                                                            // 1
  if (value != null) {                                                                                                 // 8
    if (typeof LoggerManager !== "undefined" && LoggerManager !== null) {                                              //
      LoggerManager.logLevel = parseInt(value);                                                                        //
    }                                                                                                                  //
    return Meteor.setTimeout(function() {                                                                              //
      return typeof LoggerManager !== "undefined" && LoggerManager !== null ? LoggerManager.enable(true) : void 0;     //
    }, 200);                                                                                                           //
  }                                                                                                                    //
});                                                                                                                    // 7
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/lib/callbacks.coffee.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                                                       // 3
/*                                                                                                                     // 3
 * Callback hooks provide an easy way to add extra steps to common operations.                                         //
 * @namespace RocketChat.callbacks                                                                                     //
 */                                                                                                                    //
RocketChat.callbacks = {};                                                                                             // 3
                                                                                                                       //
RocketChat.callbacks.showTime = false;                                                                                 // 3
                                                                                                                       //
                                                                                                                       // 11
/*                                                                                                                     // 11
 * Callback priorities                                                                                                 //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.callbacks.priority = {                                                                                      // 3
  HIGH: -1000,                                                                                                         // 15
  MEDIUM: 0,                                                                                                           // 15
  LOW: 1000                                                                                                            // 15
};                                                                                                                     //
                                                                                                                       //
                                                                                                                       // 19
/*                                                                                                                     // 19
 * Add a callback function to a hook                                                                                   //
 * @param {String} hook - The name of the hook                                                                         //
 * @param {Function} callback - The callback function                                                                  //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.callbacks.add = function(hook, callback, priority, id) {                                                    // 3
  var base, cb, err, i, len, ref;                                                                                      // 26
  if (priority == null) {                                                                                              //
    priority = RocketChat.callbacks.priority.MEDIUM;                                                                   //
  }                                                                                                                    //
  if (!_.isNumber(priority)) {                                                                                         // 27
    priority = RocketChat.callbacks.priority.MEDIUM;                                                                   // 28
  }                                                                                                                    //
  callback.priority = priority;                                                                                        // 26
  callback.id = id || Random.id();                                                                                     // 26
  if ((base = RocketChat.callbacks)[hook] == null) {                                                                   //
    base[hook] = [];                                                                                                   //
  }                                                                                                                    //
  if (RocketChat.callbacks.showTime === true) {                                                                        // 33
    err = new Error;                                                                                                   // 34
    callback.stack = err.stack;                                                                                        // 34
  }                                                                                                                    //
  ref = RocketChat.callbacks[hook];                                                                                    // 38
  for (i = 0, len = ref.length; i < len; i++) {                                                                        // 38
    cb = ref[i];                                                                                                       //
    if (cb.id === callback.id) {                                                                                       // 39
      return;                                                                                                          // 40
    }                                                                                                                  //
  }                                                                                                                    // 38
  RocketChat.callbacks[hook].push(callback);                                                                           // 26
};                                                                                                                     // 24
                                                                                                                       //
                                                                                                                       // 45
/*                                                                                                                     // 45
 * Remove a callback from a hook                                                                                       //
 * @param {string} hook - The name of the hook                                                                         //
 * @param {string} id - The callback's id                                                                              //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.callbacks.remove = function(hookName, id) {                                                                 // 3
  RocketChat.callbacks[hookName] = _.reject(RocketChat.callbacks[hookName], function(callback) {                       // 52
    return callback.id === id;                                                                                         //
  });                                                                                                                  //
};                                                                                                                     // 51
                                                                                                                       //
                                                                                                                       // 56
/*                                                                                                                     // 56
 * Successively run all of a hook's callbacks on an item                                                               //
 * @param {String} hook - The name of the hook                                                                         //
 * @param {Object} item - The post, comment, modifier, etc. on which to run the callbacks                              //
 * @param {Object} [constant] - An optional constant that will be passed along to each callback                        //
 * @returns {Object} Returns the item after it's been through all the callbacks for this hook                          //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.callbacks.run = function(hook, item, constant) {                                                            // 3
  var callbacks;                                                                                                       // 65
  callbacks = RocketChat.callbacks[hook];                                                                              // 65
  if (!!(callbacks != null ? callbacks.length : void 0)) {                                                             // 66
    return _.sortBy(callbacks, function(callback) {                                                                    //
      return callback.priority || RocketChat.callbacks.priority.MEDIUM;                                                // 68
    }).reduce(function(result, callback) {                                                                             //
      var callbackResult, time;                                                                                        // 70
      if (RocketChat.callbacks.showTime === true) {                                                                    // 70
        time = Date.now();                                                                                             // 71
      }                                                                                                                //
      callbackResult = callback(result, constant);                                                                     // 70
      if (RocketChat.callbacks.showTime === true) {                                                                    // 75
        console.log(hook, Date.now() - time);                                                                          // 76
        console.log(callback.stack.split('\n')[2]);                                                                    // 76
      }                                                                                                                //
      return callbackResult;                                                                                           // 79
    }, item);                                                                                                          //
  } else {                                                                                                             //
    return item;                                                                                                       //
  }                                                                                                                    //
};                                                                                                                     // 64
                                                                                                                       //
                                                                                                                       // 85
/*                                                                                                                     // 85
 * Successively run all of a hook's callbacks on an item, in async mode (only works on server)                         //
 * @param {String} hook - The name of the hook                                                                         //
 * @param {Object} item - The post, comment, modifier, etc. on which to run the callbacks                              //
 * @param {Object} [constant] - An optional constant that will be passed along to each callback                        //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.callbacks.runAsync = function(hook, item, constant) {                                                       // 3
  var callbacks;                                                                                                       // 93
  callbacks = RocketChat.callbacks[hook];                                                                              // 93
  if (Meteor.isServer && !!(callbacks != null ? callbacks.length : void 0)) {                                          // 94
    Meteor.defer(function() {                                                                                          // 96
      _.sortBy(callbacks, function(callback) {                                                                         // 98
        return callback.priority || RocketChat.callbacks.priority.MEDIUM;                                              // 98
      }).forEach(function(callback) {                                                                                  //
        callback(item, constant);                                                                                      // 100
      });                                                                                                              //
    });                                                                                                                //
  } else {                                                                                                             //
    return item;                                                                                                       // 104
  }                                                                                                                    //
};                                                                                                                     // 92
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/lib/fileUploadRestrictions.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.fileUploadMediaWhiteList = function () {                                                                    // 1
	var mediaTypeWhiteList = RocketChat.settings.get('FileUpload_MediaTypeWhiteList');                                    // 2
                                                                                                                       //
	if (!mediaTypeWhiteList || mediaTypeWhiteList === '*') {                                                              // 4
		return;                                                                                                              // 5
	}                                                                                                                     //
	return _.map(mediaTypeWhiteList.split(','), function (item) {                                                         // 7
		return item.trim();                                                                                                  // 8
	});                                                                                                                   //
};                                                                                                                     //
                                                                                                                       //
RocketChat.fileUploadIsValidContentType = function (type) {                                                            // 12
	var list, wildCardGlob, wildcards;                                                                                    // 13
	list = RocketChat.fileUploadMediaWhiteList();                                                                         // 14
	if (!list || _.contains(list, type)) {                                                                                // 15
		return true;                                                                                                         // 16
	} else {                                                                                                              //
		wildCardGlob = '/*';                                                                                                 // 18
		wildcards = _.filter(list, function (item) {                                                                         // 19
			return item.indexOf(wildCardGlob) > 0;                                                                              // 20
		});                                                                                                                  //
		if (_.contains(wildcards, type.replace(/(\/.*)$/, wildCardGlob))) {                                                  // 22
			return true;                                                                                                        // 23
		}                                                                                                                    //
	}                                                                                                                     //
	return false;                                                                                                         // 26
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/lib/promises.coffee.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                                                       // 3
/*                                                                                                                     // 3
 * Callback hooks provide an easy way to add extra steps to common operations.                                         //
 * @namespace RocketChat.promises                                                                                      //
 */                                                                                                                    //
RocketChat.promises = {};                                                                                              // 3
                                                                                                                       //
                                                                                                                       // 9
/*                                                                                                                     // 9
 * Callback priorities                                                                                                 //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.promises.priority = {                                                                                       // 3
  HIGH: -1000,                                                                                                         // 13
  MEDIUM: 0,                                                                                                           // 13
  LOW: 1000                                                                                                            // 13
};                                                                                                                     //
                                                                                                                       //
                                                                                                                       // 17
/*                                                                                                                     // 17
 * Add a callback function to a hook                                                                                   //
 * @param {String} hook - The name of the hook                                                                         //
 * @param {Function} callback - The callback function                                                                  //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.promises.add = function(hook, callback, priority, id) {                                                     // 3
  var base, cb, i, len, ref;                                                                                           // 25
  if (priority == null) {                                                                                              //
    priority = RocketChat.promises.priority.MEDIUM;                                                                    //
  }                                                                                                                    //
  if (!_.isNumber(priority)) {                                                                                         // 26
    priority = RocketChat.promises.priority.MEDIUM;                                                                    // 27
  }                                                                                                                    //
  callback.priority = priority;                                                                                        // 25
  callback.id = id || Random.id();                                                                                     // 25
  if ((base = RocketChat.promises)[hook] == null) {                                                                    //
    base[hook] = [];                                                                                                   //
  }                                                                                                                    //
  ref = RocketChat.promises[hook];                                                                                     // 33
  for (i = 0, len = ref.length; i < len; i++) {                                                                        // 33
    cb = ref[i];                                                                                                       //
    if (cb.id === callback.id) {                                                                                       // 34
      return;                                                                                                          // 35
    }                                                                                                                  //
  }                                                                                                                    // 33
  RocketChat.promises[hook].push(callback);                                                                            // 25
};                                                                                                                     // 23
                                                                                                                       //
                                                                                                                       // 40
/*                                                                                                                     // 40
 * Remove a callback from a hook                                                                                       //
 * @param {string} hook - The name of the hook                                                                         //
 * @param {string} id - The callback's id                                                                              //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.promises.remove = function(hookName, id) {                                                                  // 3
  RocketChat.promises[hookName] = _.reject(RocketChat.promises[hookName], function(callback) {                         // 47
    return callback.id === id;                                                                                         //
  });                                                                                                                  //
};                                                                                                                     // 46
                                                                                                                       //
                                                                                                                       // 51
/*                                                                                                                     // 51
 * Successively run all of a hook's callbacks on an item                                                               //
 * @param {String} hook - The name of the hook                                                                         //
 * @param {Object} item - The post, comment, modifier, etc. on which to run the callbacks                              //
 * @param {Object} [constant] - An optional constant that will be passed along to each callback                        //
 * @returns {Object} Returns the item after it's been through all the callbacks for this hook                          //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.promises.run = function(hook, item, constant) {                                                             // 3
  var callbacks;                                                                                                       // 60
  callbacks = RocketChat.promises[hook];                                                                               // 60
  if (!!(callbacks != null ? callbacks.length : void 0)) {                                                             // 61
    callbacks = _.sortBy(callbacks, function(callback) {                                                               // 63
      return callback.priority || RocketChat.promises.priority.MEDIUM;                                                 // 63
    });                                                                                                                //
    return callbacks.reduce(function(previousPromise, callback) {                                                      // 64
      return new Promise(function(resolve, reject) {                                                                   // 65
        return previousPromise.then(function(result) {                                                                 //
          return callback(result, constant).then(resolve, reject);                                                     //
        });                                                                                                            //
      });                                                                                                              //
    }, Promise.resolve(item));                                                                                         //
  } else {                                                                                                             //
    return Promise.resolve(item);                                                                                      // 71
  }                                                                                                                    //
};                                                                                                                     // 59
                                                                                                                       //
                                                                                                                       // 73
/*                                                                                                                     // 73
 * Successively run all of a hook's callbacks on an item, in async mode (only works on server)                         //
 * @param {String} hook - The name of the hook                                                                         //
 * @param {Object} item - The post, comment, modifier, etc. on which to run the callbacks                              //
 * @param {Object} [constant] - An optional constant that will be passed along to each callback                        //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.promises.runAsync = function(hook, item, constant) {                                                        // 3
  var callbacks;                                                                                                       // 81
  callbacks = RocketChat.promises[hook];                                                                               // 81
  if (Meteor.isServer && !!(callbacks != null ? callbacks.length : void 0)) {                                          // 82
    Meteor.defer(function() {                                                                                          // 84
      _.sortBy(callbacks, function(callback) {                                                                         // 86
        return callback.priority || RocketChat.promises.priority.MEDIUM;                                               // 86
      }).forEach(function(callback) {                                                                                  //
        callback(item, constant);                                                                                      // 88
      });                                                                                                              //
    });                                                                                                                //
  } else {                                                                                                             //
    return item;                                                                                                       // 92
  }                                                                                                                    //
};                                                                                                                     // 80
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/lib/slashCommand.coffee.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.slashCommands = {                                                                                           // 1
  commands: {}                                                                                                         // 2
};                                                                                                                     //
                                                                                                                       //
RocketChat.slashCommands.add = function(command, callback, options) {                                                  // 1
  RocketChat.slashCommands.commands[command] = {                                                                       // 5
    command: command,                                                                                                  // 6
    callback: callback,                                                                                                // 6
    params: options != null ? options.params : void 0,                                                                 // 6
    description: options != null ? options.description : void 0                                                        // 6
  };                                                                                                                   //
};                                                                                                                     // 4
                                                                                                                       //
RocketChat.slashCommands.run = function(command, params, item) {                                                       // 1
  var callback, ref;                                                                                                   // 14
  if (((ref = RocketChat.slashCommands.commands[command]) != null ? ref.callback : void 0) != null) {                  // 14
    callback = RocketChat.slashCommands.commands[command].callback;                                                    // 15
    return callback(command, params, item);                                                                            //
  }                                                                                                                    //
};                                                                                                                     // 13
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
  slashCommand: function(command) {                                                                                    // 20
    if (!Meteor.userId()) {                                                                                            // 21
      throw new Meteor.Error(203, t('User_logged_out'));                                                               // 22
    }                                                                                                                  //
    return RocketChat.slashCommands.run(command.cmd, command.params, command.msg);                                     //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/lib/Message.coffee.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.Message = {                                                                                                 // 1
  parse: function(msg, language) {                                                                                     // 2
    var messageType, ref;                                                                                              // 3
    messageType = RocketChat.MessageTypes.getType(msg);                                                                // 3
    if ((messageType != null ? messageType.render : void 0) != null) {                                                 // 4
      return messageType.render(msg);                                                                                  // 5
    } else if ((messageType != null ? messageType.template : void 0) != null) {                                        //
                                                                                                                       // 6
    } else if ((messageType != null ? messageType.message : void 0) != null) {                                         //
      if (!language && (typeof localStorage !== "undefined" && localStorage !== null ? localStorage.getItem('userLanguage') : void 0)) {
        language = localStorage.getItem('userLanguage');                                                               // 10
      }                                                                                                                //
      if ((typeof messageType.data === "function" ? messageType.data(msg) : void 0) != null) {                         // 11
        return TAPi18n.__(messageType.message, messageType.data(msg), language);                                       // 12
      } else {                                                                                                         //
        return TAPi18n.__(messageType.message, {}, language);                                                          // 14
      }                                                                                                                //
    } else {                                                                                                           //
      if (((ref = msg.u) != null ? ref.username : void 0) === RocketChat.settings.get('Chatops_Username')) {           // 16
        msg.html = msg.msg;                                                                                            // 17
        return msg.html;                                                                                               // 18
      }                                                                                                                //
      msg.html = msg.msg;                                                                                              // 16
      if (_.trim(msg.html) !== '') {                                                                                   // 21
        msg.html = _.escapeHTML(msg.html);                                                                             // 22
      }                                                                                                                //
      msg.html = msg.html.replace(/\n/gm, '<br/>');                                                                    // 16
      return msg.html;                                                                                                 // 26
    }                                                                                                                  //
  }                                                                                                                    //
};                                                                                                                     //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/lib/MessageTypes.coffee.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.MessageTypes = new ((function() {                                                                           // 1
  var getType, isSystemMessage, registerType, types;                                                                   // 2
                                                                                                                       //
  function _Class() {}                                                                                                 //
                                                                                                                       //
  types = {};                                                                                                          // 2
                                                                                                                       //
  registerType = function(options) {                                                                                   // 2
    return types[options.id] = options;                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  getType = function(message) {                                                                                        // 2
    return types[message != null ? message.t : void 0];                                                                // 8
  };                                                                                                                   //
                                                                                                                       //
  isSystemMessage = function(message) {                                                                                // 2
    var ref;                                                                                                           // 11
    return (ref = types[message != null ? message.t : void 0]) != null ? ref.system : void 0;                          // 11
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.registerType = registerType;                                                                        // 2
                                                                                                                       //
  _Class.prototype.getType = getType;                                                                                  // 2
                                                                                                                       //
  _Class.prototype.isSystemMessage = isSystemMessage;                                                                  // 2
                                                                                                                       //
  return _Class;                                                                                                       //
                                                                                                                       //
})());                                                                                                                 //
                                                                                                                       //
Meteor.startup(function() {                                                                                            // 1
  RocketChat.MessageTypes.registerType({                                                                               // 18
    id: 'r',                                                                                                           // 19
    system: true,                                                                                                      // 19
    message: 'Room_name_changed',                                                                                      // 19
    data: function(message) {                                                                                          // 19
      return {                                                                                                         // 23
        room_name: message.msg,                                                                                        // 23
        user_by: message.u.username                                                                                    // 23
      };                                                                                                               //
    }                                                                                                                  //
  });                                                                                                                  //
  RocketChat.MessageTypes.registerType({                                                                               // 18
    id: 'au',                                                                                                          // 26
    system: true,                                                                                                      // 26
    message: 'User_added_by',                                                                                          // 26
    data: function(message) {                                                                                          // 26
      return {                                                                                                         // 30
        user_added: message.msg,                                                                                       // 30
        user_by: message.u.username                                                                                    // 30
      };                                                                                                               //
    }                                                                                                                  //
  });                                                                                                                  //
  RocketChat.MessageTypes.registerType({                                                                               // 18
    id: 'ru',                                                                                                          // 33
    system: true,                                                                                                      // 33
    message: 'User_removed_by',                                                                                        // 33
    data: function(message) {                                                                                          // 33
      return {                                                                                                         // 37
        user_removed: message.msg,                                                                                     // 37
        user_by: message.u.username                                                                                    // 37
      };                                                                                                               //
    }                                                                                                                  //
  });                                                                                                                  //
  RocketChat.MessageTypes.registerType({                                                                               // 18
    id: 'ul',                                                                                                          // 40
    system: true,                                                                                                      // 40
    message: 'User_left',                                                                                              // 40
    data: function(message) {                                                                                          // 40
      return {                                                                                                         // 44
        user_left: message.u.username                                                                                  // 44
      };                                                                                                               //
    }                                                                                                                  //
  });                                                                                                                  //
  RocketChat.MessageTypes.registerType({                                                                               // 18
    id: 'uj',                                                                                                          // 47
    system: true,                                                                                                      // 47
    message: 'User_joined_channel',                                                                                    // 47
    data: function(message) {                                                                                          // 47
      return {                                                                                                         // 51
        user: message.u.username                                                                                       // 51
      };                                                                                                               //
    }                                                                                                                  //
  });                                                                                                                  //
  RocketChat.MessageTypes.registerType({                                                                               // 18
    id: 'wm',                                                                                                          // 54
    system: true,                                                                                                      // 54
    message: 'Welcome',                                                                                                // 54
    data: function(message) {                                                                                          // 54
      return {                                                                                                         // 58
        user: message.u.username                                                                                       // 58
      };                                                                                                               //
    }                                                                                                                  //
  });                                                                                                                  //
  RocketChat.MessageTypes.registerType({                                                                               // 18
    id: 'rm',                                                                                                          // 61
    system: true,                                                                                                      // 61
    message: 'Message_removed',                                                                                        // 61
    data: function(message) {                                                                                          // 61
      return {                                                                                                         // 65
        user: message.u.username                                                                                       // 65
      };                                                                                                               //
    }                                                                                                                  //
  });                                                                                                                  //
  RocketChat.MessageTypes.registerType({                                                                               // 18
    id: 'rtc',                                                                                                         // 68
    render: function(message) {                                                                                        // 68
      return RocketChat.callbacks.run('renderRtcMessage', message);                                                    //
    }                                                                                                                  //
  });                                                                                                                  //
  RocketChat.MessageTypes.registerType({                                                                               // 18
    id: 'user-muted',                                                                                                  // 73
    system: true,                                                                                                      // 73
    message: 'User_muted_by',                                                                                          // 73
    data: function(message) {                                                                                          // 73
      return {                                                                                                         // 77
        user_muted: message.msg,                                                                                       // 77
        user_by: message.u.username                                                                                    // 77
      };                                                                                                               //
    }                                                                                                                  //
  });                                                                                                                  //
  RocketChat.MessageTypes.registerType({                                                                               // 18
    id: 'user-unmuted',                                                                                                // 80
    system: true,                                                                                                      // 80
    message: 'User_unmuted_by',                                                                                        // 80
    data: function(message) {                                                                                          // 80
      return {                                                                                                         // 84
        user_unmuted: message.msg,                                                                                     // 84
        user_by: message.u.username                                                                                    // 84
      };                                                                                                               //
    }                                                                                                                  //
  });                                                                                                                  //
  RocketChat.MessageTypes.registerType({                                                                               // 18
    id: 'new-moderator',                                                                                               // 87
    system: true,                                                                                                      // 87
    message: 'User__username__was_added_as_a_moderator_by__user_by_',                                                  // 87
    data: function(message) {                                                                                          // 87
      return {                                                                                                         // 91
        username: message.msg,                                                                                         // 91
        user_by: message.u.username                                                                                    // 91
      };                                                                                                               //
    }                                                                                                                  //
  });                                                                                                                  //
  RocketChat.MessageTypes.registerType({                                                                               // 18
    id: 'moderator-removed',                                                                                           // 94
    system: true,                                                                                                      // 94
    message: 'User__username__was_removed_as_a_moderator_by__user_by_',                                                // 94
    data: function(message) {                                                                                          // 94
      return {                                                                                                         // 98
        username: message.msg,                                                                                         // 98
        user_by: message.u.username                                                                                    // 98
      };                                                                                                               //
    }                                                                                                                  //
  });                                                                                                                  //
  RocketChat.MessageTypes.registerType({                                                                               // 18
    id: 'new-owner',                                                                                                   // 101
    system: true,                                                                                                      // 101
    message: 'User__username__was_added_as_a_owner_by__user_by_',                                                      // 101
    data: function(message) {                                                                                          // 101
      return {                                                                                                         // 105
        username: message.msg,                                                                                         // 105
        user_by: message.u.username                                                                                    // 105
      };                                                                                                               //
    }                                                                                                                  //
  });                                                                                                                  //
  return RocketChat.MessageTypes.registerType({                                                                        //
    id: 'owner-removed',                                                                                               // 108
    system: true,                                                                                                      // 108
    message: 'User__username__was_removed_as_a_owner_by__user_by_',                                                    // 108
    data: function(message) {                                                                                          // 108
      return {                                                                                                         // 112
        username: message.msg,                                                                                         // 112
        user_by: message.u.username                                                                                    // 112
      };                                                                                                               //
    }                                                                                                                  //
  });                                                                                                                  //
});                                                                                                                    // 17
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/lib/RateLimiter.coffee.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.RateLimiter = new ((function() {                                                                            // 1
  function _Class() {}                                                                                                 //
                                                                                                                       //
  _Class.prototype.limitFunction = function(fn, numRequests, timeInterval, matchers) {                                 // 2
    var rateLimiter;                                                                                                   // 3
    rateLimiter = new RateLimiter();                                                                                   // 3
    rateLimiter.addRule(matchers, numRequests, timeInterval);                                                          // 3
    return function() {                                                                                                // 5
      var args, match, rateLimitResult;                                                                                // 6
      match = {};                                                                                                      // 6
      args = arguments;                                                                                                // 6
      _.each(matchers, function(matcher, key) {                                                                        // 6
        return match[key] = args[key];                                                                                 //
      });                                                                                                              //
      rateLimiter.increment(match);                                                                                    // 6
      rateLimitResult = rateLimiter.check(match);                                                                      // 6
      if (rateLimitResult.allowed) {                                                                                   // 13
        return fn.apply(null, arguments);                                                                              // 14
      } else {                                                                                                         //
        throw new Meteor.Error('too-many-requests', "Error, too many requests. Please slow down. You must wait " + (Math.ceil(rateLimitResult.timeToReset / 1000)) + " seconds before trying again.", {
          timeToReset: rateLimitResult.timeToReset                                                                     // 16
        });                                                                                                            //
      }                                                                                                                //
    };                                                                                                                 //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.limitMethod = function(methodName, numRequests, timeInterval, matchers) {                           // 2
    var match;                                                                                                         // 19
    match = {                                                                                                          // 19
      type: 'method',                                                                                                  // 20
      name: methodName                                                                                                 // 20
    };                                                                                                                 //
    _.each(matchers, function(matcher, key) {                                                                          // 19
      return match[key] = matchers[key];                                                                               //
    });                                                                                                                //
    return DDPRateLimiter.addRule(match, numRequests, timeInterval);                                                   //
  };                                                                                                                   //
                                                                                                                       //
  return _Class;                                                                                                       //
                                                                                                                       //
})());                                                                                                                 //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/lib/roomTypes.coffee.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.roomTypes = new ((function() {                                                                              // 1
  var roomTypes, runPublish, setPublish;                                                                               // 2
                                                                                                                       //
  function _Class() {}                                                                                                 //
                                                                                                                       //
  roomTypes = {};                                                                                                      // 2
                                                                                                                       //
                                                                                                                       // 4
  /* add a publish for a room type                                                                                     // 4
  	@param roomType: room type (e.g.: c (for channels), d (for direct channels))                                        //
  	@param callback: function that will return the publish's data                                                       //
   */                                                                                                                  //
                                                                                                                       //
  setPublish = function(roomType, callback) {                                                                          // 2
    var ref;                                                                                                           // 9
    if (((ref = roomTypes[roomType]) != null ? ref.publish : void 0) != null) {                                        // 9
      throw new Meteor.Error('route-publish-exists', 'Publish for the given type already exists');                     // 10
    }                                                                                                                  //
    if (roomTypes[roomType] == null) {                                                                                 // 12
      roomTypes[roomType] = {};                                                                                        // 13
    }                                                                                                                  //
    return roomTypes[roomType].publish = callback;                                                                     //
  };                                                                                                                   //
                                                                                                                       //
                                                                                                                       // 17
  /* run the publish for a room type                                                                                   // 17
  	@param roomType: room type (e.g.: c (for channels), d (for direct channels))                                        //
  	@param identifier: identifier of the room                                                                           //
   */                                                                                                                  //
                                                                                                                       //
  runPublish = function(roomType, identifier) {                                                                        // 2
    if (roomTypes[roomType].publish == null) {                                                                         // 22
      return;                                                                                                          // 22
    }                                                                                                                  //
    return roomTypes[roomType].publish.call(this, identifier);                                                         // 23
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setPublish = setPublish;                                                                            // 2
                                                                                                                       //
  _Class.prototype.runPublish = runPublish;                                                                            // 2
                                                                                                                       //
  return _Class;                                                                                                       //
                                                                                                                       //
})());                                                                                                                 //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/lib/sendNotificationsOnMessage.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals Push */                                                                                                     //
                                                                                                                       //
RocketChat.callbacks.add('afterSaveMessage', function (message, room) {                                                // 3
	// skips this callback if the message was edited                                                                      //
	if (message.editedAt) {                                                                                               // 5
		return message;                                                                                                      // 6
	}                                                                                                                     //
                                                                                                                       //
	var user = RocketChat.models.Users.findOneById(message.u._id);                                                        // 9
                                                                                                                       //
	/*                                                                                                                    //
 Increment unread couter if direct messages                                                                            //
  */                                                                                                                   //
	var indexOf = [].indexOf || function (item) {                                                                         // 14
		for (var i = 0, l = this.length; i < l; i++) {                                                                       // 15
			if (i in this && this[i] === item) {                                                                                // 16
				return i;                                                                                                          // 17
			}                                                                                                                   //
		}                                                                                                                    //
		return -1;                                                                                                           // 20
	};                                                                                                                    //
                                                                                                                       //
	var settings, desktopMentionIds, i, j, len, len1, highlights, mentionIds, highlightsIds, usersWithHighlights, mobileMentionIds, ref, ref1, toAll, userIdsToNotify, userIdsToPushNotify, userOfMention, userOfMentionId, usersOfDesktopMentions, usersOfMentionId, usersOfMentionItem, usersOfMobileMentions;
                                                                                                                       //
	/**                                                                                                                   //
  * Checks if a given user can be notified                                                                             //
  *                                                                                                                    //
  * @param {string} id                                                                                                 //
  * @param {string} type - mobile|desktop                                                                              //
  *                                                                                                                    //
  * @returns {boolean}                                                                                                 //
     */                                                                                                                //
	function canBeNotified(id, type) {                                                                                    // 33
		var types = {                                                                                                        // 34
			mobile: ['dontNotifyDesktopUsers', 'alwaysNotifyDesktopUsers'],                                                     // 35
			desktop: ['dontNotifyMobileUsers', 'alwaysNotifyMobileUsers']                                                       // 36
		};                                                                                                                   //
                                                                                                                       //
		return settings[types[type][0]].indexOf(id) === -1 || settings[types[type][1]].indexOf(id) !== -1;                   // 39
	}                                                                                                                     //
                                                                                                                       //
	/**                                                                                                                   //
  * Chechs if a messages contains a user highlight                                                                     //
  *                                                                                                                    //
  * @param {string} message                                                                                            //
  * @param {array|undefined} highlights                                                                                //
  *                                                                                                                    //
  * @returns {boolean}                                                                                                 //
  */                                                                                                                   //
	function messageContainsHighlight(message, highlights) {                                                              // 50
		if (!highlights || highlights.length === 0) {                                                                        // 51
			return false;                                                                                                       // 51
		}                                                                                                                    //
                                                                                                                       //
		var has = false;                                                                                                     // 53
		highlights.some(function (highlight) {                                                                               // 54
			var regexp = new RegExp(s.escapeRegExp(highlight), 'i');                                                            // 55
			if (regexp.test(message.msg)) {                                                                                     // 56
				has = true;                                                                                                        // 57
				return true;                                                                                                       // 58
			}                                                                                                                   //
		});                                                                                                                  //
                                                                                                                       //
		return has;                                                                                                          // 62
	}                                                                                                                     //
                                                                                                                       //
	settings = {};                                                                                                        // 65
                                                                                                                       //
	settings.alwaysNotifyDesktopUsers = [];                                                                               // 67
	settings.dontNotifyDesktopUsers = [];                                                                                 // 68
	settings.alwaysNotifyMobileUsers = [];                                                                                // 69
	settings.dontNotifyMobileUsers = [];                                                                                  // 70
	RocketChat.models.Subscriptions.findNotificationPreferencesByRoom(room._id).forEach(function (subscription) {         // 71
		if (subscription.desktopNotifications === 'all') {                                                                   // 72
			settings.alwaysNotifyDesktopUsers.push(subscription.u._id);                                                         // 73
		} else if (subscription.desktopNotifications === 'nothing') {                                                        //
			settings.dontNotifyDesktopUsers.push(subscription.u._id);                                                           // 75
		} else if (subscription.mobilePushNotifications === 'all') {                                                         //
			settings.alwaysNotifyMobileUsers.push(subscription.u._id);                                                          // 77
		} else if (subscription.mobilePushNotifications === 'nothing') {                                                     //
			settings.dontNotifyMobileUsers.push(subscription.u._id);                                                            // 79
		}                                                                                                                    //
	});                                                                                                                   //
                                                                                                                       //
	userIdsToNotify = [];                                                                                                 // 83
	userIdsToPushNotify = [];                                                                                             // 84
	usersWithHighlights = [];                                                                                             // 85
	highlights = RocketChat.models.Users.findUsersByUsernamesWithHighlights(room.usernames, { fields: { '_id': 1, 'settings.preferences.highlights': 1 } }).fetch();
                                                                                                                       //
	highlights.forEach(function (user) {                                                                                  // 88
		if (user && user.settings && user.settings.preferences && messageContainsHighlight(message, user.settings.preferences.highlights)) {
			usersWithHighlights.push(user);                                                                                     // 90
		}                                                                                                                    //
	});                                                                                                                   //
                                                                                                                       //
	var push_message = undefined;                                                                                         // 94
	//Set variables depending on Push Notification settings                                                               //
	if (RocketChat.settings.get('Push_show_message')) {                                                                   // 96
		push_message = message.msg;                                                                                          // 97
	} else {                                                                                                              //
		push_message = ' ';                                                                                                  // 99
	}                                                                                                                     //
                                                                                                                       //
	var push_username = undefined;                                                                                        // 102
	var push_room = undefined;                                                                                            // 103
	if (RocketChat.settings.get('Push_show_username_room')) {                                                             // 104
		push_username = '@' + user.username;                                                                                 // 105
		push_room = '#' + room.name + ' ';                                                                                   // 106
	} else {                                                                                                              //
		push_username = ' ';                                                                                                 // 108
		push_room = ' ';                                                                                                     // 109
	}                                                                                                                     //
                                                                                                                       //
	if (room.t == null || room.t === 'd') {                                                                               // 112
		userOfMentionId = message.rid.replace(message.u._id, '');                                                            // 113
		userOfMention = RocketChat.models.Users.findOne({                                                                    // 114
			_id: userOfMentionId                                                                                                // 115
		}, {                                                                                                                 //
			fields: {                                                                                                           // 117
				username: 1,                                                                                                       // 118
				statusConnection: 1                                                                                                // 119
			}                                                                                                                   //
		});                                                                                                                  //
		if (userOfMention != null && canBeNotified(userOfMentionId, 'mobile')) {                                             // 122
			RocketChat.Notifications.notifyUser(userOfMention._id, 'notification', {                                            // 123
				title: '@' + user.username,                                                                                        // 124
				text: message.msg,                                                                                                 // 125
				payload: {                                                                                                         // 126
					rid: message.rid,                                                                                                 // 127
					sender: message.u,                                                                                                // 128
					type: room.t,                                                                                                     // 129
					name: room.name                                                                                                   // 130
				}                                                                                                                  //
			});                                                                                                                 //
		}                                                                                                                    //
		if (userOfMention != null && canBeNotified(userOfMentionId, 'desktop')) {                                            // 134
			if (Push.enabled === true && userOfMention.statusConnection !== 'online') {                                         // 135
				Push.send({                                                                                                        // 136
					from: 'push',                                                                                                     // 137
					title: push_username,                                                                                             // 138
					text: push_message,                                                                                               // 139
					apn: {                                                                                                            // 140
						// ternary operator                                                                                              //
						text: push_username + (push_username !== ' ' && push_message !== ' ' ? ':\n' : '') + push_message                // 142
					},                                                                                                                //
					badge: 1,                                                                                                         // 144
					sound: 'chime',                                                                                                   // 145
					payload: {                                                                                                        // 146
						host: Meteor.absoluteUrl(),                                                                                      // 147
						rid: message.rid,                                                                                                // 148
						sender: message.u,                                                                                               // 149
						type: room.t,                                                                                                    // 150
						name: room.name                                                                                                  // 151
					},                                                                                                                //
					query: {                                                                                                          // 153
						userId: userOfMention._id                                                                                        // 154
					}                                                                                                                 //
				});                                                                                                                //
				return message;                                                                                                    // 157
			}                                                                                                                   //
		}                                                                                                                    //
	} else {                                                                                                              //
		mentionIds = [];                                                                                                     // 161
		if ((ref = message.mentions) != null) {                                                                              // 162
			ref.forEach(function (mention) {                                                                                    // 163
				return mentionIds.push(mention._id);                                                                               // 164
			});                                                                                                                 //
		}                                                                                                                    //
		toAll = mentionIds.indexOf('all') > -1;                                                                              // 167
		if (mentionIds.length > 0 || settings.alwaysNotifyDesktopUsers.length > 0) {                                         // 168
			desktopMentionIds = _.union(mentionIds, settings.alwaysNotifyDesktopUsers);                                         // 169
			desktopMentionIds = _.difference(desktopMentionIds, settings.dontNotifyDesktopUsers);                               // 170
			usersOfDesktopMentions = RocketChat.models.Users.find({                                                             // 171
				_id: {                                                                                                             // 172
					$in: desktopMentionIds                                                                                            // 173
				}                                                                                                                  //
			}, {                                                                                                                //
				fields: {                                                                                                          // 176
					_id: 1,                                                                                                           // 177
					username: 1                                                                                                       // 178
				}                                                                                                                  //
			}).fetch();                                                                                                         //
			if (room.t === 'c' && !toAll) {                                                                                     // 181
				for (i = 0, len = usersOfDesktopMentions.length; i < len; i++) {                                                   // 182
					usersOfMentionItem = usersOfDesktopMentions[i];                                                                   // 183
					if (room.usernames.indexOf(usersOfMentionItem.username) === -1) {                                                 // 184
						Meteor.runAsUser(usersOfMentionItem._id, function () {                                                           // 185
							return Meteor.call('joinRoom', room._id);                                                                       // 186
						});                                                                                                              //
					}                                                                                                                 //
				}                                                                                                                  //
			}                                                                                                                   //
			userIdsToNotify = _.pluck(usersOfDesktopMentions, '_id');                                                           // 191
		}                                                                                                                    //
                                                                                                                       //
		if (mentionIds.length > 0 || settings.alwaysNotifyMobileUsers.length > 0) {                                          // 194
			mobileMentionIds = _.union(mentionIds, settings.alwaysNotifyMobileUsers);                                           // 195
			mobileMentionIds = _.difference(mobileMentionIds, settings.dontNotifyMobileUsers);                                  // 196
			usersOfMobileMentions = RocketChat.models.Users.find({                                                              // 197
				_id: {                                                                                                             // 198
					$in: mobileMentionIds                                                                                             // 199
				}                                                                                                                  //
			}, {                                                                                                                //
				fields: {                                                                                                          // 202
					_id: 1,                                                                                                           // 203
					username: 1,                                                                                                      // 204
					statusConnection: 1                                                                                               // 205
				}                                                                                                                  //
			}).fetch();                                                                                                         //
			userIdsToPushNotify = _.pluck(_.filter(usersOfMobileMentions, function (user) {                                     // 208
				return user.statusConnection !== 'online';                                                                         // 209
			}), '_id');                                                                                                         //
		}                                                                                                                    //
                                                                                                                       //
		if (toAll && ((ref1 = room.usernames) != null ? ref1.length : void 0) > 0) {                                         // 213
			RocketChat.models.Users.find({                                                                                      // 214
				username: {                                                                                                        // 215
					$in: room.usernames                                                                                               // 216
				},                                                                                                                 //
				_id: {                                                                                                             // 218
					$ne: user._id                                                                                                     // 219
				}                                                                                                                  //
			}, {                                                                                                                //
				fields: {                                                                                                          // 222
					_id: 1,                                                                                                           // 223
					username: 1,                                                                                                      // 224
					status: 1,                                                                                                        // 225
					statusConnection: 1                                                                                               // 226
				}                                                                                                                  //
			}).forEach(function (user) {                                                                                        //
				var ref2, ref3, ref4;                                                                                              // 229
				if (((ref2 = user.status) === 'online' || ref2 === 'away' || ref2 === 'busy') && (ref3 = user._id, indexOf.call(settings.dontNotifyDesktopUsers, ref3) < 0)) {
					userIdsToNotify.push(user._id);                                                                                   // 231
				}                                                                                                                  //
				if (user.statusConnection !== 'online' && (ref4 = user._id, indexOf.call(settings.dontNotifyMobileUsers, ref4) < 0)) {
					return userIdsToPushNotify.push(user._id);                                                                        // 234
				}                                                                                                                  //
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		if (usersWithHighlights.length > 0) {                                                                                // 239
			highlightsIds = _.pluck(usersWithHighlights, '_id');                                                                // 240
			userIdsToNotify = userIdsToNotify.concat(highlightsIds);                                                            // 241
			userIdsToPushNotify = userIdsToPushNotify.concat(highlightsIds);                                                    // 242
		}                                                                                                                    //
                                                                                                                       //
		userIdsToNotify = _.compact(_.unique(userIdsToNotify));                                                              // 245
		userIdsToPushNotify = _.compact(_.unique(userIdsToPushNotify));                                                      // 246
                                                                                                                       //
		if (userIdsToNotify.length > 0) {                                                                                    // 248
			for (j = 0, len1 = userIdsToNotify.length; j < len1; j++) {                                                         // 249
				usersOfMentionId = userIdsToNotify[j];                                                                             // 250
				RocketChat.Notifications.notifyUser(usersOfMentionId, 'notification', {                                            // 251
					title: '@' + user.username + ' @ #' + room.name,                                                                  // 252
					text: message.msg,                                                                                                // 253
					payload: {                                                                                                        // 254
						rid: message.rid,                                                                                                // 255
						sender: message.u,                                                                                               // 256
						type: room.t,                                                                                                    // 257
						name: room.name                                                                                                  // 258
					}                                                                                                                 //
				});                                                                                                                //
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		if (userIdsToPushNotify.length > 0) {                                                                                // 264
			if (Push.enabled === true) {                                                                                        // 265
				Push.send({                                                                                                        // 266
					from: 'push',                                                                                                     // 267
					title: push_room + push_username,                                                                                 // 268
					text: push_message,                                                                                               // 269
					apn: {                                                                                                            // 270
						// ternary operator                                                                                              //
						text: push_room + push_username + (push_username !== ' ' && push_room !== ' ' && push_message !== ' ' ? ':\n' : '') + push_message
					},                                                                                                                //
					badge: 1,                                                                                                         // 274
					sound: 'chime',                                                                                                   // 275
					payload: {                                                                                                        // 276
						host: Meteor.absoluteUrl(),                                                                                      // 277
						rid: message.rid,                                                                                                // 278
						sender: message.u,                                                                                               // 279
						type: room.t,                                                                                                    // 280
						name: room.name                                                                                                  // 281
					},                                                                                                                //
					query: {                                                                                                          // 283
						userId: {                                                                                                        // 284
							$in: userIdsToPushNotify                                                                                        // 285
						}                                                                                                                //
					}                                                                                                                 //
				});                                                                                                                //
			}                                                                                                                   //
		}                                                                                                                    //
	}                                                                                                                     //
                                                                                                                       //
	return message;                                                                                                       // 293
}, RocketChat.callbacks.priority.LOW);                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/lib/notifyUsersOnMessage.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.callbacks.add('afterSaveMessage', function (message, room) {                                                // 1
	// skips this callback if the message was edited                                                                      //
	if (message.editedAt) {                                                                                               // 3
		return message;                                                                                                      // 4
	}                                                                                                                     //
                                                                                                                       //
	/**                                                                                                                   //
  * Chechs if a messages contains a user highlight                                                                     //
  *                                                                                                                    //
  * @param {string} message                                                                                            //
  * @param {array|undefined} highlights                                                                                //
  *                                                                                                                    //
  * @returns {boolean}                                                                                                 //
     */                                                                                                                //
	function messageContainsHighlight(message, highlights) {                                                              // 15
		if (!highlights || highlights.length === 0) {                                                                        // 16
			return false;                                                                                                       // 16
		}                                                                                                                    //
                                                                                                                       //
		var has = false;                                                                                                     // 18
		highlights.some(function (highlight) {                                                                               // 19
			var regexp = new RegExp(s.escapeRegExp(highlight), 'i');                                                            // 20
			if (regexp.test(message.msg)) {                                                                                     // 21
				has = true;                                                                                                        // 22
				return true;                                                                                                       // 23
			}                                                                                                                   //
		});                                                                                                                  //
                                                                                                                       //
		return has;                                                                                                          // 27
	}                                                                                                                     //
                                                                                                                       //
	if (room.t != null && room.t === 'd') {                                                                               // 30
		// Update the other subscriptions                                                                                    //
		RocketChat.models.Subscriptions.incUnreadOfDirectForRoomIdExcludingUserId(message.rid, message.u._id, 1);            // 32
	} else {                                                                                                              //
		var mentionIds, toAll, highlightsIds, highlights;                                                                    // 34
                                                                                                                       //
		mentionIds = [];                                                                                                     // 36
		highlightsIds = [];                                                                                                  // 37
		toAll = false;                                                                                                       // 38
		highlights = RocketChat.models.Users.findUsersByUsernamesWithHighlights(room.usernames, { fields: { '_id': 1, 'settings.preferences.highlights': 1 } }).fetch();
                                                                                                                       //
		if (message.mentions != null) {                                                                                      // 41
			message.mentions.forEach(function (mention) {                                                                       // 42
				if (!toAll && mention._id === 'all') {                                                                             // 43
					toAll = true;                                                                                                     // 44
				}                                                                                                                  //
				mentionIds.push(mention._id);                                                                                      // 46
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		highlights.forEach(function (user) {                                                                                 // 50
			if (user && user.settings && user.settings.preferences && messageContainsHighlight(message, user.settings.preferences.highlights)) {
				highlightsIds.push(user._id);                                                                                      // 52
			}                                                                                                                   //
		});                                                                                                                  //
                                                                                                                       //
		if (toAll) {                                                                                                         // 56
			RocketChat.models.Subscriptions.incUnreadForRoomIdExcludingUserId(room._id, message.u._id);                         // 57
		} else if (mentionIds && mentionIds.length > 0 || highlightsIds && highlightsIds.length > 0) {                       //
			RocketChat.models.Subscriptions.incUnreadForRoomIdAndUserIds(room._id, _.compact(_.unique(mentionIds.concat(highlightsIds))));
		}                                                                                                                    //
	}                                                                                                                     //
                                                                                                                       //
	// Update all the room activity tracker fields                                                                        //
	RocketChat.models.Rooms.incMsgCountAndSetLastMessageTimestampById(message.rid, 1, message.ts);                        // 64
                                                                                                                       //
	// Update all other subscriptions to alert their owners but witout incrementing                                       //
	// the unread counter, as it is only for mentions and direct messages                                                 //
	RocketChat.models.Subscriptions.setAlertForRoomIdExcludingUserId(message.rid, message.u._id, true);                   // 68
                                                                                                                       //
	return message;                                                                                                       // 70
}, RocketChat.callbacks.priority.LOW);                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/lib/sendEmailOnMessage.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.callbacks.add('afterSaveMessage', function (message, room) {                                                // 1
	// skips this callback if the message was edited                                                                      //
	if (message.editedAt) {                                                                                               // 3
		return message;                                                                                                      // 4
	}                                                                                                                     //
                                                                                                                       //
	var emailSubject,                                                                                                     // 7
	    usersToSendEmail = {};                                                                                            //
                                                                                                                       //
	if (room.t === 'd') {                                                                                                 // 9
		usersToSendEmail[message.rid.replace(message.u._id, '')] = 1;                                                        // 10
                                                                                                                       //
		emailSubject = TAPi18n.__("Offline_DM_Email", {                                                                      // 12
			site: RocketChat.settings.get('Site_Name'),                                                                         // 13
			user: message.u.username                                                                                            // 14
		});                                                                                                                  //
	} else {                                                                                                              //
		if (message.mentions) {                                                                                              // 18
			message.mentions.forEach(function (mention) {                                                                       // 19
				return usersToSendEmail[mention._id] = 1;                                                                          // 20
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		emailSubject = TAPi18n.__("Offline_Mention_Email", {                                                                 // 24
			site: RocketChat.settings.get('Site_Name'),                                                                         // 25
			user: message.u.username,                                                                                           // 26
			room: room.name                                                                                                     // 27
		});                                                                                                                  //
	}                                                                                                                     //
                                                                                                                       //
	// code duplicate of packages/rocketchat-ui-message/message/message.coffee                                            //
	message.html = s.escapeHTML(message.msg);                                                                             // 32
	message = RocketChat.callbacks.run('renderMessage', message);                                                         // 33
	if (message.tokens && message.tokens.length > 0) {                                                                    // 34
		message.tokens.forEach(function (token) {                                                                            // 35
			token.text = token.text.replace(/([^\$])(\$[^\$])/gm, '$1$$$2');                                                    // 36
			message.html = message.html.replace(token.token, token.text);                                                       // 37
		});                                                                                                                  //
	}                                                                                                                     //
	message.html = message.html.replace(/\n/gm, '<br/>');                                                                 // 40
                                                                                                                       //
	RocketChat.models.Subscriptions.findWithSendEmailByRoomId(room._id).forEach(function (sub) {                          // 42
		switch (sub.emailNotifications) {                                                                                    // 43
			case 'all':                                                                                                         // 44
				usersToSendEmail[sub.u._id] = 'force';                                                                             // 45
				break;                                                                                                             // 46
			case 'mentions':                                                                                                    // 47
				if (usersToSendEmail[sub.u._id]) {                                                                                 // 48
					usersToSendEmail[sub.u._id] = 'force';                                                                            // 49
				}                                                                                                                  //
				break;                                                                                                             // 51
			case 'nothing':                                                                                                     // 51
				delete usersToSendEmail[sub.u._id];                                                                                // 53
				break;                                                                                                             // 54
			case 'default':                                                                                                     // 54
				break;                                                                                                             // 56
		}                                                                                                                    // 56
	});                                                                                                                   //
                                                                                                                       //
	userIdsToSendEmail = Object.keys(usersToSendEmail);                                                                   // 60
                                                                                                                       //
	if (userIdsToSendEmail.length > 0) {                                                                                  // 62
		var usersOfMention = RocketChat.models.Users.getUsersToSendOfflineEmail(userIdsToSendEmail).fetch();                 // 63
                                                                                                                       //
		if (usersOfMention && usersOfMention.length > 0) {                                                                   // 65
			usersOfMention.forEach(function (user) {                                                                            // 66
				if (user.settings && user.settings.preferences && user.settings.preferences.emailNotificationMode && user.settings.preferences.emailNotificationMode === 'disabled' && usersToSendEmail[user._id] !== 'force') {
					return;                                                                                                           // 68
				}                                                                                                                  //
				user.emails.some(function (email) {                                                                                // 70
					if (email.verified) {                                                                                             // 71
						var email = {                                                                                                    // 72
							to: email.address,                                                                                              // 73
							from: RocketChat.settings.get('From_Email'),                                                                    // 74
							subject: emailSubject,                                                                                          // 75
							html: "&gt; " + message.html                                                                                    // 76
						};                                                                                                               //
                                                                                                                       //
						Email.send(email);                                                                                               // 79
                                                                                                                       //
						return true;                                                                                                     // 81
					}                                                                                                                 //
				});                                                                                                                //
			});                                                                                                                 //
		}                                                                                                                    //
	}                                                                                                                     //
                                                                                                                       //
	return message;                                                                                                       // 88
}, RocketChat.callbacks.priority.LOW);                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/models/_Base.coffee.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.models._Base = (function() {                                                                                // 1
  function _Class() {}                                                                                                 //
                                                                                                                       //
  _Class.prototype._baseName = function() {                                                                            // 2
    return 'rocketchat_';                                                                                              // 3
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype._initModel = function(name) {                                                                       // 2
    check(name, String);                                                                                               // 6
    return this.model = new Mongo.Collection(this._baseName() + name);                                                 //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.find = function() {                                                                                 // 2
    return this.model.find.apply(this.model, arguments);                                                               // 11
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findOne = function() {                                                                              // 2
    return this.model.findOne.apply(this.model, arguments);                                                            // 14
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.insert = function() {                                                                               // 2
    return this.model.insert.apply(this.model, arguments);                                                             // 17
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.update = function() {                                                                               // 2
    return this.model.update.apply(this.model, arguments);                                                             // 20
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.upsert = function() {                                                                               // 2
    return this.model.upsert.apply(this.model, arguments);                                                             // 23
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.remove = function() {                                                                               // 2
    return this.model.remove.apply(this.model, arguments);                                                             // 26
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.allow = function() {                                                                                // 2
    return this.model.allow.apply(this.model, arguments);                                                              // 29
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.deny = function() {                                                                                 // 2
    return this.model.deny.apply(this.model, arguments);                                                               // 32
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.ensureIndex = function() {                                                                          // 2
    return this.model._ensureIndex.apply(this.model, arguments);                                                       // 35
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.dropIndex = function() {                                                                            // 2
    return this.model._dropIndex.apply(this.model, arguments);                                                         // 38
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.tryEnsureIndex = function() {                                                                       // 2
    var e;                                                                                                             // 41
    try {                                                                                                              // 41
      return this.ensureIndex.apply(this, arguments);                                                                  // 42
    } catch (_error) {                                                                                                 //
      e = _error;                                                                                                      // 44
      return console.log(e);                                                                                           //
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.tryDropIndex = function() {                                                                         // 2
    var e;                                                                                                             // 47
    try {                                                                                                              // 47
      return this.dropIndex.apply(this, arguments);                                                                    // 48
    } catch (_error) {                                                                                                 //
      e = _error;                                                                                                      // 50
      return console.log(e);                                                                                           //
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       //
  return _Class;                                                                                                       //
                                                                                                                       //
})();                                                                                                                  //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/models/Messages.coffee.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;                                                                                         //
                                                                                                                       //
RocketChat.models.Messages = new ((function(superClass) {                                                              // 1
  extend(_Class, superClass);                                                                                          // 2
                                                                                                                       //
  function _Class() {                                                                                                  // 2
    this._initModel('message');                                                                                        // 3
    this.tryEnsureIndex({                                                                                              // 3
      'rid': 1,                                                                                                        // 5
      'ts': 1                                                                                                          // 5
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'ts': 1                                                                                                          // 6
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'u._id': 1                                                                                                       // 7
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'editedAt': 1                                                                                                    // 8
    }, {                                                                                                               //
      sparse: 1                                                                                                        // 8
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'editedBy._id': 1                                                                                                // 9
    }, {                                                                                                               //
      sparse: 1                                                                                                        // 9
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'rid': 1,                                                                                                        // 10
      't': 1,                                                                                                          // 10
      'u._id': 1                                                                                                       // 10
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'expireAt': 1                                                                                                    // 11
    }, {                                                                                                               //
      expireAfterSeconds: 0                                                                                            // 11
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'msg': 'text'                                                                                                    // 12
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'file._id': 1                                                                                                    // 13
    }, {                                                                                                               //
      sparse: 1                                                                                                        // 13
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'mentions.username': 1                                                                                           // 14
    }, {                                                                                                               //
      sparse: 1                                                                                                        // 14
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'pinned': 1                                                                                                      // 15
    }, {                                                                                                               //
      sparse: 1                                                                                                        // 15
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  _Class.prototype.findOneById = function(_id, options) {                                                              // 2
    var query;                                                                                                         // 20
    query = {                                                                                                          // 20
      _id: _id                                                                                                         // 21
    };                                                                                                                 //
    return this.findOne(query, options);                                                                               // 23
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByMention = function(username, options) {                                                       // 2
    var query;                                                                                                         // 27
    query = {                                                                                                          // 27
      "mentions.username": username                                                                                    // 28
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 30
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findVisibleByMentionAndRoomId = function(username, rid, options) {                                  // 2
    var query;                                                                                                         // 33
    query = {                                                                                                          // 33
      _hidden: {                                                                                                       // 34
        $ne: true                                                                                                      // 34
      },                                                                                                               //
      "mentions.username": username,                                                                                   // 34
      "rid": rid                                                                                                       // 34
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 38
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findVisibleByRoomId = function(roomId, options) {                                                   // 2
    var query;                                                                                                         // 41
    query = {                                                                                                          // 41
      _hidden: {                                                                                                       // 42
        $ne: true                                                                                                      // 43
      },                                                                                                               //
      rid: roomId                                                                                                      // 42
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 46
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findInvisibleByRoomId = function(roomId, options) {                                                 // 2
    var query;                                                                                                         // 49
    query = {                                                                                                          // 49
      _hidden: true,                                                                                                   // 50
      rid: roomId                                                                                                      // 50
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 53
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findVisibleByRoomIdAfterTimestamp = function(roomId, timestamp, options) {                          // 2
    var query;                                                                                                         // 56
    query = {                                                                                                          // 56
      _hidden: {                                                                                                       // 57
        $ne: true                                                                                                      // 58
      },                                                                                                               //
      rid: roomId,                                                                                                     // 57
      ts: {                                                                                                            // 57
        $gt: timestamp                                                                                                 // 61
      }                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 63
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findVisibleByRoomIdBeforeTimestamp = function(roomId, timestamp, options) {                         // 2
    var query;                                                                                                         // 66
    query = {                                                                                                          // 66
      _hidden: {                                                                                                       // 67
        $ne: true                                                                                                      // 68
      },                                                                                                               //
      rid: roomId,                                                                                                     // 67
      ts: {                                                                                                            // 67
        $lt: timestamp                                                                                                 // 71
      }                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 73
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findVisibleByRoomIdBetweenTimestamps = function(roomId, afterTimestamp, beforeTimestamp, options) {
    var query;                                                                                                         // 76
    query = {                                                                                                          // 76
      _hidden: {                                                                                                       // 77
        $ne: true                                                                                                      // 78
      },                                                                                                               //
      rid: roomId,                                                                                                     // 77
      ts: {                                                                                                            // 77
        $gt: afterTimestamp,                                                                                           // 81
        $lt: beforeTimestamp                                                                                           // 81
      }                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 84
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findVisibleCreatedOrEditedAfterTimestamp = function(timestamp, options) {                           // 2
    var query;                                                                                                         // 87
    query = {                                                                                                          // 87
      _hidden: {                                                                                                       // 88
        $ne: true                                                                                                      // 88
      },                                                                                                               //
      $or: [                                                                                                           // 88
        {                                                                                                              //
          ts: {                                                                                                        // 90
            $gt: timestamp                                                                                             // 91
          }                                                                                                            //
        }, {                                                                                                           //
          'editedAt': {                                                                                                // 93
            $gt: timestamp                                                                                             // 94
          }                                                                                                            //
        }                                                                                                              //
      ]                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 97
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findStarredByUserAtRoom = function(userId, roomId, options) {                                       // 2
    var query;                                                                                                         // 100
    query = {                                                                                                          // 100
      _hidden: {                                                                                                       // 101
        $ne: true                                                                                                      // 101
      },                                                                                                               //
      'starred._id': userId,                                                                                           // 101
      rid: roomId                                                                                                      // 101
    };                                                                                                                 //
    console.log('findStarredByUserAtRoom', arguments);                                                                 // 100
    return this.find(query, options);                                                                                  // 107
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findPinnedByRoom = function(roomId, options) {                                                      // 2
    var query;                                                                                                         // 110
    query = {                                                                                                          // 110
      t: {                                                                                                             // 111
        $ne: 'rm'                                                                                                      // 111
      },                                                                                                               //
      _hidden: {                                                                                                       // 111
        $ne: true                                                                                                      // 112
      },                                                                                                               //
      pinned: true,                                                                                                    // 111
      rid: roomId                                                                                                      // 111
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 116
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.getLastTimestamp = function(options) {                                                              // 2
    var query, ref, ref1, ref2;                                                                                        // 119
    if (options == null) {                                                                                             //
      options = {};                                                                                                    //
    }                                                                                                                  //
    query = {                                                                                                          // 119
      ts: {                                                                                                            // 119
        $exists: 1                                                                                                     // 119
      }                                                                                                                //
    };                                                                                                                 //
    options.sort = {                                                                                                   // 119
      ts: -1                                                                                                           // 120
    };                                                                                                                 //
    options.limit = 1;                                                                                                 // 119
    return (ref = this.find(query, options)) != null ? typeof ref.fetch === "function" ? (ref1 = ref.fetch()) != null ? (ref2 = ref1[0]) != null ? ref2.ts : void 0 : void 0 : void 0 : void 0;
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByRoomIdAndMessageIds = function(rid, messageIds, options) {                                    // 2
    var query;                                                                                                         // 126
    query = {                                                                                                          // 126
      rid: rid,                                                                                                        // 127
      _id: {                                                                                                           // 127
        $in: messageIds                                                                                                // 129
      }                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 131
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.cloneAndSaveAsHistoryById = function(_id) {                                                         // 2
    var me, record, ref, ref1;                                                                                         // 134
    me = RocketChat.models.Users.findOneById(Meteor.userId());                                                         // 134
    record = this.findOneById(_id);                                                                                    // 134
    record._hidden = true;                                                                                             // 134
    record.parent = record._id;                                                                                        // 134
    record.editedAt = new Date;                                                                                        // 134
    record.editedBy = {                                                                                                // 134
      _id: Meteor.userId(),                                                                                            // 140
      username: me.username                                                                                            // 140
    };                                                                                                                 //
    record.pinned = record.pinned;                                                                                     // 134
    record.pinnedAt = record.pinnedAt;                                                                                 // 134
    record.pinnedBy = {                                                                                                // 134
      _id: (ref = record.pinnedBy) != null ? ref._id : void 0,                                                         // 145
      username: (ref1 = record.pinnedBy) != null ? ref1.username : void 0                                              // 145
    };                                                                                                                 //
    delete record._id;                                                                                                 // 134
    return this.insert(record);                                                                                        // 149
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setHiddenById = function(_id, hidden) {                                                             // 2
    var query, update;                                                                                                 // 153
    if (hidden == null) {                                                                                              //
      hidden = true;                                                                                                   //
    }                                                                                                                  //
    query = {                                                                                                          // 153
      _id: _id                                                                                                         // 154
    };                                                                                                                 //
    update = {                                                                                                         // 153
      $set: {                                                                                                          // 157
        _hidden: hidden                                                                                                // 158
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 160
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setAsDeletedById = function(_id) {                                                                  // 2
    var me, query, update;                                                                                             // 163
    me = RocketChat.models.Users.findOneById(Meteor.userId());                                                         // 163
    query = {                                                                                                          // 163
      _id: _id                                                                                                         // 165
    };                                                                                                                 //
    update = {                                                                                                         // 163
      $set: {                                                                                                          // 168
        msg: '',                                                                                                       // 169
        t: 'rm',                                                                                                       // 169
        urls: [],                                                                                                      // 169
        mentions: [],                                                                                                  // 169
        attachments: [],                                                                                               // 169
        editedAt: new Date(),                                                                                          // 169
        editedBy: {                                                                                                    // 169
          _id: Meteor.userId(),                                                                                        // 176
          username: me.username                                                                                        // 176
        }                                                                                                              //
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 179
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setPinnedByIdAndUserId = function(_id, pinnedBy, pinned) {                                          // 2
    var query, update;                                                                                                 // 182
    if (pinned == null) {                                                                                              //
      pinned = true;                                                                                                   //
    }                                                                                                                  //
    query = {                                                                                                          // 182
      _id: _id                                                                                                         // 183
    };                                                                                                                 //
    update = {                                                                                                         // 182
      $set: {                                                                                                          // 186
        pinned: pinned,                                                                                                // 187
        pinnedAt: new Date,                                                                                            // 187
        pinnedBy: pinnedBy                                                                                             // 187
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 191
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setUrlsById = function(_id, urls) {                                                                 // 2
    var query, update;                                                                                                 // 194
    query = {                                                                                                          // 194
      _id: _id                                                                                                         // 195
    };                                                                                                                 //
    update = {                                                                                                         // 194
      $set: {                                                                                                          // 198
        urls: urls                                                                                                     // 199
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 201
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.updateAllUsernamesByUserId = function(userId, username) {                                           // 2
    var query, update;                                                                                                 // 204
    query = {                                                                                                          // 204
      'u._id': userId                                                                                                  // 205
    };                                                                                                                 //
    update = {                                                                                                         // 204
      $set: {                                                                                                          // 208
        "u.username": username                                                                                         // 209
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update, {                                                                                // 211
      multi: true                                                                                                      // 211
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.updateUsernameOfEditByUserId = function(userId, username) {                                         // 2
    var query, update;                                                                                                 // 214
    query = {                                                                                                          // 214
      'editedBy._id': userId                                                                                           // 215
    };                                                                                                                 //
    update = {                                                                                                         // 214
      $set: {                                                                                                          // 218
        "editedBy.username": username                                                                                  // 219
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update, {                                                                                // 221
      multi: true                                                                                                      // 221
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.updateUsernameAndMessageOfMentionByIdAndOldUsername = function(_id, oldUsername, newUsername, newMessage) {
    var query, update;                                                                                                 // 224
    query = {                                                                                                          // 224
      _id: _id,                                                                                                        // 225
      "mentions.username": oldUsername                                                                                 // 225
    };                                                                                                                 //
    update = {                                                                                                         // 224
      $set: {                                                                                                          // 229
        "mentions.$.username": newUsername,                                                                            // 230
        "msg": newMessage                                                                                              // 230
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 233
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.updateUserStarById = function(_id, userId, starred) {                                               // 2
    var query, update;                                                                                                 // 236
    query = {                                                                                                          // 236
      _id: _id                                                                                                         // 237
    };                                                                                                                 //
    if (starred) {                                                                                                     // 239
      update = {                                                                                                       // 240
        $addToSet: {                                                                                                   // 241
          starred: {                                                                                                   // 242
            _id: userId                                                                                                // 242
          }                                                                                                            //
        }                                                                                                              //
      };                                                                                                               //
    } else {                                                                                                           //
      update = {                                                                                                       // 244
        $pull: {                                                                                                       // 245
          starred: {                                                                                                   // 246
            _id: Meteor.userId()                                                                                       // 246
          }                                                                                                            //
        }                                                                                                              //
      };                                                                                                               //
    }                                                                                                                  //
    return this.update(query, update);                                                                                 // 248
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.upgradeEtsToEditAt = function() {                                                                   // 2
    var query, update;                                                                                                 // 251
    query = {                                                                                                          // 251
      ets: {                                                                                                           // 252
        $exists: 1                                                                                                     // 252
      }                                                                                                                //
    };                                                                                                                 //
    update = {                                                                                                         // 251
      $rename: {                                                                                                       // 255
        "ets": "editedAt"                                                                                              // 256
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update, {                                                                                // 258
      multi: true                                                                                                      // 258
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.createWithTypeRoomIdMessageAndUser = function(type, roomId, message, user, extraData) {             // 2
    var record;                                                                                                        // 262
    record = {                                                                                                         // 262
      t: type,                                                                                                         // 263
      rid: roomId,                                                                                                     // 263
      ts: new Date,                                                                                                    // 263
      msg: message,                                                                                                    // 263
      u: {                                                                                                             // 263
        _id: user._id,                                                                                                 // 268
        username: user.username                                                                                        // 268
      },                                                                                                               //
      groupable: false                                                                                                 // 263
    };                                                                                                                 //
    _.extend(record, extraData);                                                                                       // 262
    record._id = this.insert(record);                                                                                  // 262
    return record;                                                                                                     // 275
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.createUserJoinWithRoomIdAndUser = function(roomId, user, extraData) {                               // 2
    var message;                                                                                                       // 278
    message = user.username;                                                                                           // 278
    return this.createWithTypeRoomIdMessageAndUser('uj', roomId, message, user, extraData);                            // 279
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.createUserLeaveWithRoomIdAndUser = function(roomId, user, extraData) {                              // 2
    var message;                                                                                                       // 282
    message = user.username;                                                                                           // 282
    return this.createWithTypeRoomIdMessageAndUser('ul', roomId, message, user, extraData);                            // 283
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.createUserRemovedWithRoomIdAndUser = function(roomId, user, extraData) {                            // 2
    var message;                                                                                                       // 286
    message = user.username;                                                                                           // 286
    return this.createWithTypeRoomIdMessageAndUser('ru', roomId, message, user, extraData);                            // 287
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.createUserAddedWithRoomIdAndUser = function(roomId, user, extraData) {                              // 2
    var message;                                                                                                       // 290
    message = user.username;                                                                                           // 290
    return this.createWithTypeRoomIdMessageAndUser('au', roomId, message, user, extraData);                            // 291
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.createCommandWithRoomIdAndUser = function(command, roomId, user, extraData) {                       // 2
    return this.createWithTypeRoomIdMessageAndUser('command', roomId, command, user, extraData);                       // 294
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.createUserMutedWithRoomIdAndUser = function(roomId, user, extraData) {                              // 2
    var message;                                                                                                       // 297
    message = user.username;                                                                                           // 297
    return this.createWithTypeRoomIdMessageAndUser('user-muted', roomId, message, user, extraData);                    // 298
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.createUserUnmutedWithRoomIdAndUser = function(roomId, user, extraData) {                            // 2
    var message;                                                                                                       // 301
    message = user.username;                                                                                           // 301
    return this.createWithTypeRoomIdMessageAndUser('user-unmuted', roomId, message, user, extraData);                  // 302
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.createNewModeratorWithRoomIdAndUser = function(roomId, user, extraData) {                           // 2
    var message;                                                                                                       // 305
    message = user.username;                                                                                           // 305
    return this.createWithTypeRoomIdMessageAndUser('new-moderator', roomId, message, user, extraData);                 // 306
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.createModeratorRemovedWithRoomIdAndUser = function(roomId, user, extraData) {                       // 2
    var message;                                                                                                       // 309
    message = user.username;                                                                                           // 309
    return this.createWithTypeRoomIdMessageAndUser('moderator-removed', roomId, message, user, extraData);             // 310
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.createNewOwnerWithRoomIdAndUser = function(roomId, user, extraData) {                               // 2
    var message;                                                                                                       // 313
    message = user.username;                                                                                           // 313
    return this.createWithTypeRoomIdMessageAndUser('new-owner', roomId, message, user, extraData);                     // 314
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.createOwnerRemovedWithRoomIdAndUser = function(roomId, user, extraData) {                           // 2
    var message;                                                                                                       // 317
    message = user.username;                                                                                           // 317
    return this.createWithTypeRoomIdMessageAndUser('owner-removed', roomId, message, user, extraData);                 // 318
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.removeById = function(_id) {                                                                        // 2
    var query;                                                                                                         // 322
    query = {                                                                                                          // 322
      _id: _id                                                                                                         // 323
    };                                                                                                                 //
    return this.remove(query);                                                                                         // 325
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.removeByRoomId = function(roomId) {                                                                 // 2
    var query;                                                                                                         // 328
    query = {                                                                                                          // 328
      rid: roomId                                                                                                      // 329
    };                                                                                                                 //
    return this.remove(query);                                                                                         // 331
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.removeByUserId = function(userId) {                                                                 // 2
    var query;                                                                                                         // 334
    query = {                                                                                                          // 334
      "u._id": userId                                                                                                  // 335
    };                                                                                                                 //
    return this.remove(query);                                                                                         // 337
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.getMessageByFileId = function(fileID) {                                                             // 2
    return this.findOne({                                                                                              // 340
      'file._id': fileID                                                                                               // 340
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  return _Class;                                                                                                       //
                                                                                                                       //
})(RocketChat.models._Base));                                                                                          //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/models/Reports.coffee.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;                                                                                         //
                                                                                                                       //
RocketChat.models.Reports = new ((function(superClass) {                                                               // 1
  extend(_Class, superClass);                                                                                          // 2
                                                                                                                       //
  function _Class() {                                                                                                  // 2
    this._initModel('reports');                                                                                        // 3
  }                                                                                                                    //
                                                                                                                       //
  _Class.prototype.createWithMessageDescriptionAndUserId = function(message, description, userId, extraData) {         // 2
    var record;                                                                                                        // 8
    record = {                                                                                                         // 8
      message: message,                                                                                                // 9
      description: description,                                                                                        // 9
      ts: new Date(),                                                                                                  // 9
      userId: userId                                                                                                   // 9
    };                                                                                                                 //
    _.extend(record, extraData);                                                                                       // 8
    record._id = this.insert(record);                                                                                  // 8
    return record;                                                                                                     // 17
  };                                                                                                                   //
                                                                                                                       //
  return _Class;                                                                                                       //
                                                                                                                       //
})(RocketChat.models._Base));                                                                                          //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/models/Rooms.coffee.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;                                                                                         //
                                                                                                                       //
RocketChat.models.Rooms = new ((function(superClass) {                                                                 // 1
  extend(_Class, superClass);                                                                                          // 2
                                                                                                                       //
  function _Class() {                                                                                                  // 2
    this._initModel('room');                                                                                           // 3
    this.tryEnsureIndex({                                                                                              // 3
      'name': 1                                                                                                        // 5
    }, {                                                                                                               //
      unique: 1,                                                                                                       // 5
      sparse: 1                                                                                                        // 5
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'default': 1                                                                                                     // 6
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'usernames': 1                                                                                                   // 7
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      't': 1                                                                                                           // 8
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'u._id': 1                                                                                                       // 9
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  _Class.prototype.findOneById = function(_id, options) {                                                              // 2
    var query;                                                                                                         // 14
    query = {                                                                                                          // 14
      _id: _id                                                                                                         // 15
    };                                                                                                                 //
    return this.findOne(query, options);                                                                               // 17
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findOneByName = function(name, options) {                                                           // 2
    var query;                                                                                                         // 20
    query = {                                                                                                          // 20
      name: name                                                                                                       // 21
    };                                                                                                                 //
    return this.findOne(query, options);                                                                               // 23
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findOneByNameAndType = function(name, type, options) {                                              // 2
    var query;                                                                                                         // 26
    query = {                                                                                                          // 26
      name: name,                                                                                                      // 27
      t: type                                                                                                          // 27
    };                                                                                                                 //
    return this.findOne(query, options);                                                                               // 30
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findOneByIdContainigUsername = function(_id, username, options) {                                   // 2
    var query;                                                                                                         // 33
    query = {                                                                                                          // 33
      _id: _id,                                                                                                        // 34
      usernames: username                                                                                              // 34
    };                                                                                                                 //
    return this.findOne(query, options);                                                                               // 37
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findOneByNameAndTypeNotContainigUsername = function(name, type, username, options) {                // 2
    var query;                                                                                                         // 40
    query = {                                                                                                          // 40
      name: name,                                                                                                      // 41
      t: type,                                                                                                         // 41
      usernames: {                                                                                                     // 41
        $ne: username                                                                                                  // 44
      }                                                                                                                //
    };                                                                                                                 //
    return this.findOne(query, options);                                                                               // 46
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findById = function(roomId) {                                                                       // 2
    return this.find({                                                                                                 // 51
      _id: roomId                                                                                                      // 51
    }, options);                                                                                                       //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByType = function(type, options) {                                                              // 2
    var query;                                                                                                         // 54
    query = {                                                                                                          // 54
      t: type                                                                                                          // 55
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 57
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByTypes = function(types, options) {                                                            // 2
    var query;                                                                                                         // 60
    query = {                                                                                                          // 60
      t: {                                                                                                             // 61
        $in: types                                                                                                     // 62
      }                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 64
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByUserId = function(userId, options) {                                                          // 2
    var query;                                                                                                         // 67
    query = {                                                                                                          // 67
      "u._id": userId                                                                                                  // 68
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 70
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByNameContaining = function(name, options) {                                                    // 2
    var nameRegex, query;                                                                                              // 73
    nameRegex = new RegExp(s.trim(s.escapeRegExp(name)), "i");                                                         // 73
    query = {                                                                                                          // 73
      $or: [                                                                                                           // 76
        {                                                                                                              //
          name: nameRegex                                                                                              // 77
        }, {                                                                                                           //
          t: 'd',                                                                                                      // 79
          usernames: nameRegex                                                                                         // 79
        }                                                                                                              //
      ]                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 83
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByNameContainingAndTypes = function(name, types, options) {                                     // 2
    var nameRegex, query;                                                                                              // 86
    nameRegex = new RegExp(s.trim(s.escapeRegExp(name)), "i");                                                         // 86
    query = {                                                                                                          // 86
      t: {                                                                                                             // 89
        $in: types                                                                                                     // 90
      },                                                                                                               //
      $or: [                                                                                                           // 89
        {                                                                                                              //
          name: nameRegex                                                                                              // 92
        }, {                                                                                                           //
          t: 'd',                                                                                                      // 94
          usernames: nameRegex                                                                                         // 94
        }                                                                                                              //
      ]                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 98
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByDefaultAndTypes = function(defaultValue, types, options) {                                    // 2
    var query;                                                                                                         // 101
    query = {                                                                                                          // 101
      "default": defaultValue,                                                                                         // 102
      t: {                                                                                                             // 102
        $in: types                                                                                                     // 104
      }                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 106
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByTypeContainigUsername = function(type, username, options) {                                   // 2
    var query;                                                                                                         // 109
    query = {                                                                                                          // 109
      t: type,                                                                                                         // 110
      usernames: username                                                                                              // 110
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 113
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByTypeContainigUsernames = function(type, username, options) {                                  // 2
    var query;                                                                                                         // 116
    query = {                                                                                                          // 116
      t: type,                                                                                                         // 117
      usernames: {                                                                                                     // 117
        $all: [].concat(username)                                                                                      // 118
      }                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 120
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByTypesAndNotUserIdContainingUsername = function(types, userId, username, options) {            // 2
    var query;                                                                                                         // 123
    query = {                                                                                                          // 123
      t: {                                                                                                             // 124
        $in: types                                                                                                     // 125
      },                                                                                                               //
      uid: {                                                                                                           // 124
        $ne: userId                                                                                                    // 127
      },                                                                                                               //
      usernames: username                                                                                              // 124
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 130
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByContainigUsername = function(username, options) {                                             // 2
    var query;                                                                                                         // 133
    query = {                                                                                                          // 133
      usernames: username                                                                                              // 134
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 136
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByTypeAndName = function(type, name, options) {                                                 // 2
    var query;                                                                                                         // 139
    query = {                                                                                                          // 139
      name: name,                                                                                                      // 140
      t: type                                                                                                          // 140
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 143
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByTypeAndNameContainigUsername = function(type, name, username, options) {                      // 2
    var query;                                                                                                         // 146
    query = {                                                                                                          // 146
      name: name,                                                                                                      // 147
      t: type,                                                                                                         // 147
      usernames: username                                                                                              // 147
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 151
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByTypeAndArchivationState = function(type, archivationstate, options) {                         // 2
    var query;                                                                                                         // 154
    query = {                                                                                                          // 154
      t: type                                                                                                          // 155
    };                                                                                                                 //
    if (archivationstate) {                                                                                            // 157
      query.archived = true;                                                                                           // 158
    } else {                                                                                                           //
      query.archived = {                                                                                               // 160
        $ne: true                                                                                                      // 160
      };                                                                                                               //
    }                                                                                                                  //
    return this.find(query, options);                                                                                  // 162
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByVisitorToken = function(visitorToken, options) {                                              // 2
    var query;                                                                                                         // 165
    query = {                                                                                                          // 165
      "v.token": visitorToken                                                                                          // 166
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 168
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.archiveById = function(_id) {                                                                       // 2
    var query, update;                                                                                                 // 173
    query = {                                                                                                          // 173
      _id: _id                                                                                                         // 174
    };                                                                                                                 //
    update = {                                                                                                         // 173
      $set: {                                                                                                          // 177
        archived: true                                                                                                 // 178
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 180
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.unarchiveById = function(_id) {                                                                     // 2
    var query, update;                                                                                                 // 183
    query = {                                                                                                          // 183
      _id: _id                                                                                                         // 184
    };                                                                                                                 //
    update = {                                                                                                         // 183
      $set: {                                                                                                          // 187
        archived: false                                                                                                // 188
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 190
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.addUsernameById = function(_id, username) {                                                         // 2
    var query, update;                                                                                                 // 193
    query = {                                                                                                          // 193
      _id: _id                                                                                                         // 194
    };                                                                                                                 //
    update = {                                                                                                         // 193
      $addToSet: {                                                                                                     // 197
        usernames: username                                                                                            // 198
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 200
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.addUsernamesById = function(_id, usernames) {                                                       // 2
    var query, update;                                                                                                 // 203
    query = {                                                                                                          // 203
      _id: _id                                                                                                         // 204
    };                                                                                                                 //
    update = {                                                                                                         // 203
      $addToSet: {                                                                                                     // 207
        usernames: {                                                                                                   // 208
          $each: usernames                                                                                             // 209
        }                                                                                                              //
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 211
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.addUsernameByName = function(name, username) {                                                      // 2
    var query, update;                                                                                                 // 214
    query = {                                                                                                          // 214
      name: name                                                                                                       // 215
    };                                                                                                                 //
    update = {                                                                                                         // 214
      $addToSet: {                                                                                                     // 218
        usernames: username                                                                                            // 219
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 221
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.removeUsernameById = function(_id, username) {                                                      // 2
    var query, update;                                                                                                 // 224
    query = {                                                                                                          // 224
      _id: _id                                                                                                         // 225
    };                                                                                                                 //
    update = {                                                                                                         // 224
      $pull: {                                                                                                         // 228
        usernames: username                                                                                            // 229
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 231
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.removeUsernamesById = function(_id, usernames) {                                                    // 2
    var query, update;                                                                                                 // 234
    query = {                                                                                                          // 234
      _id: _id                                                                                                         // 235
    };                                                                                                                 //
    update = {                                                                                                         // 234
      $pull: {                                                                                                         // 238
        usernames: {                                                                                                   // 239
          $in: usernames                                                                                               // 240
        }                                                                                                              //
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 242
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.removeUsernameFromAll = function(username) {                                                        // 2
    var query, update;                                                                                                 // 245
    query = {};                                                                                                        // 245
    update = {                                                                                                         // 245
      $pull: {                                                                                                         // 248
        usernames: username                                                                                            // 249
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update, {                                                                                // 251
      multi: true                                                                                                      // 251
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.removeUsernameByName = function(name, username) {                                                   // 2
    var query, update;                                                                                                 // 254
    query = {                                                                                                          // 254
      name: name                                                                                                       // 255
    };                                                                                                                 //
    update = {                                                                                                         // 254
      $pull: {                                                                                                         // 258
        usernames: username                                                                                            // 259
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 261
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setNameById = function(_id, name) {                                                                 // 2
    var query, update;                                                                                                 // 264
    query = {                                                                                                          // 264
      _id: _id                                                                                                         // 265
    };                                                                                                                 //
    update = {                                                                                                         // 264
      $set: {                                                                                                          // 268
        name: name                                                                                                     // 269
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 271
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.incMsgCountAndSetLastMessageTimestampById = function(_id, inc, lastMessageTimestamp) {              // 2
    var query, update;                                                                                                 // 274
    if (inc == null) {                                                                                                 //
      inc = 1;                                                                                                         //
    }                                                                                                                  //
    query = {                                                                                                          // 274
      _id: _id                                                                                                         // 275
    };                                                                                                                 //
    update = {                                                                                                         // 274
      $set: {                                                                                                          // 278
        lm: lastMessageTimestamp                                                                                       // 279
      },                                                                                                               //
      $inc: {                                                                                                          // 278
        msgs: inc                                                                                                      // 281
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 283
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.replaceUsername = function(previousUsername, username) {                                            // 2
    var query, update;                                                                                                 // 286
    query = {                                                                                                          // 286
      usernames: previousUsername                                                                                      // 287
    };                                                                                                                 //
    update = {                                                                                                         // 286
      $set: {                                                                                                          // 290
        "usernames.$": username                                                                                        // 291
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update, {                                                                                // 293
      multi: true                                                                                                      // 293
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.replaceMutedUsername = function(previousUsername, username) {                                       // 2
    var query, update;                                                                                                 // 296
    query = {                                                                                                          // 296
      muted: previousUsername                                                                                          // 297
    };                                                                                                                 //
    update = {                                                                                                         // 296
      $set: {                                                                                                          // 300
        "muted.$": username                                                                                            // 301
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update, {                                                                                // 303
      multi: true                                                                                                      // 303
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.replaceUsernameOfUserByUserId = function(userId, username) {                                        // 2
    var query, update;                                                                                                 // 306
    query = {                                                                                                          // 306
      "u._id": userId                                                                                                  // 307
    };                                                                                                                 //
    update = {                                                                                                         // 306
      $set: {                                                                                                          // 310
        "u.username": username                                                                                         // 311
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update, {                                                                                // 313
      multi: true                                                                                                      // 313
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setUserById = function(_id, user) {                                                                 // 2
    var query, update;                                                                                                 // 316
    query = {                                                                                                          // 316
      _id: _id                                                                                                         // 317
    };                                                                                                                 //
    update = {                                                                                                         // 316
      $set: {                                                                                                          // 320
        u: {                                                                                                           // 321
          _id: user._id,                                                                                               // 322
          username: user.username                                                                                      // 322
        }                                                                                                              //
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 325
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setTypeById = function(_id, type) {                                                                 // 2
    var query, update;                                                                                                 // 328
    query = {                                                                                                          // 328
      _id: _id                                                                                                         // 329
    };                                                                                                                 //
    update = {                                                                                                         // 328
      $set: {                                                                                                          // 332
        t: type                                                                                                        // 333
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 335
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setTopicById = function(_id, topic) {                                                               // 2
    var query, update;                                                                                                 // 338
    query = {                                                                                                          // 338
      _id: _id                                                                                                         // 339
    };                                                                                                                 //
    update = {                                                                                                         // 338
      $set: {                                                                                                          // 342
        topic: topic                                                                                                   // 343
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 345
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.muteUsernameByRoomId = function(_id, username) {                                                    // 2
    var query, update;                                                                                                 // 348
    query = {                                                                                                          // 348
      _id: _id                                                                                                         // 349
    };                                                                                                                 //
    update = {                                                                                                         // 348
      $addToSet: {                                                                                                     // 352
        muted: username                                                                                                // 353
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 355
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.unmuteUsernameByRoomId = function(_id, username) {                                                  // 2
    var query, update;                                                                                                 // 358
    query = {                                                                                                          // 358
      _id: _id                                                                                                         // 359
    };                                                                                                                 //
    update = {                                                                                                         // 358
      $pull: {                                                                                                         // 362
        muted: username                                                                                                // 363
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 365
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.saveDefaultById = function(_id, defaultValue) {                                                     // 2
    var query, update;                                                                                                 // 368
    query = {                                                                                                          // 368
      _id: _id                                                                                                         // 369
    };                                                                                                                 //
    update = {                                                                                                         // 368
      $set: {                                                                                                          // 372
        "default": defaultValue === 'true'                                                                             // 373
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 375
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.createWithTypeNameUserAndUsernames = function(type, name, user, usernames, extraData) {             // 2
    var room;                                                                                                          // 379
    room = {                                                                                                           // 379
      name: name,                                                                                                      // 380
      t: type,                                                                                                         // 380
      usernames: usernames,                                                                                            // 380
      msgs: 0,                                                                                                         // 380
      u: {                                                                                                             // 380
        _id: user._id,                                                                                                 // 385
        username: user.username                                                                                        // 385
      }                                                                                                                //
    };                                                                                                                 //
    _.extend(room, extraData);                                                                                         // 379
    room._id = this.insert(room);                                                                                      // 379
    return room;                                                                                                       // 391
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.createWithIdTypeAndName = function(_id, type, name, extraData) {                                    // 2
    var room;                                                                                                          // 394
    room = {                                                                                                           // 394
      _id: _id,                                                                                                        // 395
      ts: new Date(),                                                                                                  // 395
      t: type,                                                                                                         // 395
      name: name,                                                                                                      // 395
      usernames: [],                                                                                                   // 395
      msgs: 0                                                                                                          // 395
    };                                                                                                                 //
    _.extend(room, extraData);                                                                                         // 394
    this.insert(room);                                                                                                 // 394
    return room;                                                                                                       // 405
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.removeById = function(_id) {                                                                        // 2
    var query;                                                                                                         // 410
    query = {                                                                                                          // 410
      _id: _id                                                                                                         // 411
    };                                                                                                                 //
    return this.remove(query);                                                                                         // 413
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.removeByTypeContainingUsername = function(type, username) {                                         // 2
    var query;                                                                                                         // 416
    query = {                                                                                                          // 416
      t: type,                                                                                                         // 417
      usernames: username                                                                                              // 417
    };                                                                                                                 //
    return this.remove(query);                                                                                         // 420
  };                                                                                                                   //
                                                                                                                       //
  return _Class;                                                                                                       //
                                                                                                                       //
})(RocketChat.models._Base));                                                                                          //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/models/Settings.coffee.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;                                                                                         //
                                                                                                                       //
RocketChat.models.Settings = new ((function(superClass) {                                                              // 1
  extend(_Class, superClass);                                                                                          // 2
                                                                                                                       //
  function _Class() {                                                                                                  // 2
    this._initModel('settings');                                                                                       // 3
    this.tryEnsureIndex({                                                                                              // 3
      'blocked': 1                                                                                                     // 5
    }, {                                                                                                               //
      sparse: 1                                                                                                        // 5
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'hidden': 1                                                                                                      // 6
    }, {                                                                                                               //
      sparse: 1                                                                                                        // 6
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  _Class.prototype.findOneById = function(_id, options) {                                                              // 2
    var query;                                                                                                         // 10
    query = {                                                                                                          // 10
      _id: _id                                                                                                         // 11
    };                                                                                                                 //
    return this.findOne(query, options);                                                                               // 13
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findById = function(_id) {                                                                          // 2
    var query;                                                                                                         // 17
    query = {                                                                                                          // 17
      _id: _id                                                                                                         // 18
    };                                                                                                                 //
    return this.find(query);                                                                                           // 20
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByIds = function(_id) {                                                                         // 2
    var query;                                                                                                         // 23
    if (_id == null) {                                                                                                 //
      _id = [];                                                                                                        //
    }                                                                                                                  //
    _id = [].concat(_id);                                                                                              // 23
    query = {                                                                                                          // 23
      _id: {                                                                                                           // 26
        $in: _id                                                                                                       // 27
      }                                                                                                                //
    };                                                                                                                 //
    return this.find(query);                                                                                           // 29
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByRole = function(role, options) {                                                              // 2
    var query;                                                                                                         // 32
    query = {                                                                                                          // 32
      role: role                                                                                                       // 33
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 35
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findPublic = function(options) {                                                                    // 2
    var query;                                                                                                         // 38
    query = {                                                                                                          // 38
      "public": true                                                                                                   // 39
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 41
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findNotHiddenPublic = function(ids) {                                                               // 2
    var filter;                                                                                                        // 44
    if (ids == null) {                                                                                                 //
      ids = [];                                                                                                        //
    }                                                                                                                  //
    filter = {                                                                                                         // 44
      hidden: {                                                                                                        // 45
        $ne: true                                                                                                      // 45
      },                                                                                                               //
      "public": true                                                                                                   // 45
    };                                                                                                                 //
    if (ids.length > 0) {                                                                                              // 48
      filter._id = {                                                                                                   // 49
        $in: ids                                                                                                       // 50
      };                                                                                                               //
    }                                                                                                                  //
    return this.find(filter, {                                                                                         // 52
      fields: {                                                                                                        // 52
        _id: 1,                                                                                                        // 52
        value: 1                                                                                                       // 52
      }                                                                                                                //
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findNotHidden = function() {                                                                        // 2
    return this.find({                                                                                                 // 55
      hidden: {                                                                                                        // 55
        $ne: true                                                                                                      // 55
      }                                                                                                                //
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.updateValueById = function(_id, value) {                                                            // 2
    var query, update;                                                                                                 // 59
    query = {                                                                                                          // 59
      blocked: {                                                                                                       // 60
        $ne: true                                                                                                      // 60
      },                                                                                                               //
      _id: _id                                                                                                         // 60
    };                                                                                                                 //
    update = {                                                                                                         // 59
      $set: {                                                                                                          // 64
        value: value                                                                                                   // 65
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 67
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.updateOptionsById = function(_id, options) {                                                        // 2
    var query, update;                                                                                                 // 70
    query = {                                                                                                          // 70
      blocked: {                                                                                                       // 71
        $ne: true                                                                                                      // 71
      },                                                                                                               //
      _id: _id                                                                                                         // 71
    };                                                                                                                 //
    update = {                                                                                                         // 70
      $set: options                                                                                                    // 75
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 77
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.createWithIdAndValue = function(_id, value) {                                                       // 2
    var record;                                                                                                        // 81
    record = {                                                                                                         // 81
      _id: _id,                                                                                                        // 82
      value: value,                                                                                                    // 82
      _createdAt: new Date                                                                                             // 82
    };                                                                                                                 //
    return this.insert(record);                                                                                        // 86
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.removeById = function(_id) {                                                                        // 2
    var query;                                                                                                         // 90
    query = {                                                                                                          // 90
      blocked: {                                                                                                       // 91
        $ne: true                                                                                                      // 91
      },                                                                                                               //
      _id: _id                                                                                                         // 91
    };                                                                                                                 //
    return this.remove(query);                                                                                         // 94
  };                                                                                                                   //
                                                                                                                       //
  return _Class;                                                                                                       //
                                                                                                                       //
})(RocketChat.models._Base));                                                                                          //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/models/Subscriptions.coffee.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;                                                                                         //
                                                                                                                       //
RocketChat.models.Subscriptions = new ((function(superClass) {                                                         // 1
  extend(_Class, superClass);                                                                                          // 2
                                                                                                                       //
  function _Class() {                                                                                                  // 2
    this._initModel('subscription');                                                                                   // 3
    this.tryEnsureIndex({                                                                                              // 3
      'rid': 1,                                                                                                        // 5
      'u._id': 1                                                                                                       // 5
    }, {                                                                                                               //
      unique: 1                                                                                                        // 5
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'rid': 1,                                                                                                        // 6
      'alert': 1,                                                                                                      // 6
      'u._id': 1                                                                                                       // 6
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'rid': 1,                                                                                                        // 7
      'roles': 1                                                                                                       // 7
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'u._id': 1,                                                                                                      // 8
      'name': 1,                                                                                                       // 8
      't': 1                                                                                                           // 8
    }, {                                                                                                               //
      unique: 1                                                                                                        // 8
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'open': 1                                                                                                        // 9
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'alert': 1                                                                                                       // 10
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'unread': 1                                                                                                      // 11
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'ts': 1                                                                                                          // 12
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'ls': 1                                                                                                          // 13
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'desktopNotifications': 1                                                                                        // 14
    }, {                                                                                                               //
      sparse: 1                                                                                                        // 14
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'mobilePushNotifications': 1                                                                                     // 15
    }, {                                                                                                               //
      sparse: 1                                                                                                        // 15
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'emailNotifications': 1                                                                                          // 16
    }, {                                                                                                               //
      sparse: 1                                                                                                        // 16
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  _Class.prototype.findOneByRoomIdAndUserId = function(roomId, userId) {                                               // 2
    var query;                                                                                                         // 21
    query = {                                                                                                          // 21
      rid: roomId,                                                                                                     // 22
      "u._id": userId                                                                                                  // 22
    };                                                                                                                 //
    return this.findOne(query);                                                                                        // 25
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByUserId = function(userId, options) {                                                          // 2
    var query;                                                                                                         // 29
    query = {                                                                                                          // 29
      "u._id": userId                                                                                                  // 30
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 32
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByRoomIdAndRoles = function(roomId, roles, options) {                                           // 2
    var query;                                                                                                         // 36
    roles = [].concat(roles);                                                                                          // 36
    query = {                                                                                                          // 36
      "rid": roomId,                                                                                                   // 38
      "roles": {                                                                                                       // 38
        $in: roles                                                                                                     // 39
      }                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 41
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByType = function(types, options) {                                                             // 2
    var query;                                                                                                         // 44
    query = {                                                                                                          // 44
      t: {                                                                                                             // 45
        $in: types                                                                                                     // 46
      }                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 48
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByNameContainingAndTypes = function(name, types, options) {                                     // 2
    var nameRegex, query;                                                                                              // 51
    nameRegex = new RegExp(s.trim(s.escapeRegExp(name)), "i");                                                         // 51
    query = {                                                                                                          // 51
      t: {                                                                                                             // 54
        $in: types,                                                                                                    // 55
        name: nameRegex                                                                                                // 55
      }                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 58
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.getLastSeen = function(options) {                                                                   // 2
    var query, ref, ref1, ref2;                                                                                        // 61
    if (options == null) {                                                                                             //
      options = {};                                                                                                    //
    }                                                                                                                  //
    query = {                                                                                                          // 61
      ls: {                                                                                                            // 61
        $exists: 1                                                                                                     // 61
      }                                                                                                                //
    };                                                                                                                 //
    options.sort = {                                                                                                   // 61
      ls: -1                                                                                                           // 62
    };                                                                                                                 //
    options.limit = 1;                                                                                                 // 61
    return (ref = this.find(query, options)) != null ? typeof ref.fetch === "function" ? (ref1 = ref.fetch()) != null ? (ref2 = ref1[0]) != null ? ref2.ls : void 0 : void 0 : void 0 : void 0;
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.archiveByRoomIdAndUserId = function(roomId, userId) {                                               // 2
    var query, update;                                                                                                 // 69
    query = {                                                                                                          // 69
      rid: roomId,                                                                                                     // 70
      'u._id': userId                                                                                                  // 70
    };                                                                                                                 //
    update = {                                                                                                         // 69
      $set: {                                                                                                          // 74
        alert: false,                                                                                                  // 75
        open: false,                                                                                                   // 75
        archived: true                                                                                                 // 75
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 79
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.unarchiveByRoomIdAndUserId = function(roomId, userId) {                                             // 2
    var query, update;                                                                                                 // 82
    query = {                                                                                                          // 82
      rid: roomId,                                                                                                     // 83
      'u._id': userId                                                                                                  // 83
    };                                                                                                                 //
    update = {                                                                                                         // 82
      $set: {                                                                                                          // 87
        alert: false,                                                                                                  // 88
        open: true,                                                                                                    // 88
        archived: false                                                                                                // 88
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 92
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.hideByRoomIdAndUserId = function(roomId, userId) {                                                  // 2
    var query, update;                                                                                                 // 95
    query = {                                                                                                          // 95
      rid: roomId,                                                                                                     // 96
      'u._id': userId                                                                                                  // 96
    };                                                                                                                 //
    update = {                                                                                                         // 95
      $set: {                                                                                                          // 100
        alert: false,                                                                                                  // 101
        open: false                                                                                                    // 101
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 104
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.openByRoomIdAndUserId = function(roomId, userId) {                                                  // 2
    var query, update;                                                                                                 // 107
    query = {                                                                                                          // 107
      rid: roomId,                                                                                                     // 108
      'u._id': userId                                                                                                  // 108
    };                                                                                                                 //
    update = {                                                                                                         // 107
      $set: {                                                                                                          // 112
        open: true                                                                                                     // 113
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 115
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setAsReadByRoomIdAndUserId = function(roomId, userId) {                                             // 2
    var query, update;                                                                                                 // 118
    query = {                                                                                                          // 118
      rid: roomId,                                                                                                     // 119
      'u._id': userId                                                                                                  // 119
    };                                                                                                                 //
    update = {                                                                                                         // 118
      $set: {                                                                                                          // 123
        open: true,                                                                                                    // 124
        alert: false,                                                                                                  // 124
        unread: 0,                                                                                                     // 124
        ls: new Date                                                                                                   // 124
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 129
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setFavoriteByRoomIdAndUserId = function(roomId, userId, favorite) {                                 // 2
    var query, update;                                                                                                 // 132
    if (favorite == null) {                                                                                            //
      favorite = true;                                                                                                 //
    }                                                                                                                  //
    query = {                                                                                                          // 132
      rid: roomId,                                                                                                     // 133
      'u._id': userId                                                                                                  // 133
    };                                                                                                                 //
    update = {                                                                                                         // 132
      $set: {                                                                                                          // 137
        f: favorite                                                                                                    // 138
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 140
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.updateNameByRoomId = function(roomId, name) {                                                       // 2
    var query, update;                                                                                                 // 143
    query = {                                                                                                          // 143
      rid: roomId                                                                                                      // 144
    };                                                                                                                 //
    update = {                                                                                                         // 143
      $set: {                                                                                                          // 147
        name: name,                                                                                                    // 148
        alert: true                                                                                                    // 148
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update, {                                                                                // 151
      multi: true                                                                                                      // 151
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setUserUsernameByUserId = function(userId, username) {                                              // 2
    var query, update;                                                                                                 // 154
    query = {                                                                                                          // 154
      "u._id": userId                                                                                                  // 155
    };                                                                                                                 //
    update = {                                                                                                         // 154
      $set: {                                                                                                          // 158
        "u.username": username                                                                                         // 159
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update, {                                                                                // 161
      multi: true                                                                                                      // 161
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setNameForDirectRoomsWithOldName = function(oldName, name) {                                        // 2
    var query, update;                                                                                                 // 164
    query = {                                                                                                          // 164
      name: oldName,                                                                                                   // 165
      t: "d"                                                                                                           // 165
    };                                                                                                                 //
    update = {                                                                                                         // 164
      $set: {                                                                                                          // 169
        name: name                                                                                                     // 170
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update, {                                                                                // 172
      multi: true                                                                                                      // 172
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.incUnreadOfDirectForRoomIdExcludingUserId = function(roomId, userId, inc) {                         // 2
    var query, update;                                                                                                 // 175
    if (inc == null) {                                                                                                 //
      inc = 1;                                                                                                         //
    }                                                                                                                  //
    query = {                                                                                                          // 175
      rid: roomId,                                                                                                     // 176
      t: 'd',                                                                                                          // 176
      'u._id': {                                                                                                       // 176
        $ne: userId                                                                                                    // 179
      }                                                                                                                //
    };                                                                                                                 //
    update = {                                                                                                         // 175
      $set: {                                                                                                          // 182
        alert: true,                                                                                                   // 183
        open: true                                                                                                     // 183
      },                                                                                                               //
      $inc: {                                                                                                          // 182
        unread: inc                                                                                                    // 186
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update, {                                                                                // 188
      multi: true                                                                                                      // 188
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.incUnreadForRoomIdExcludingUserId = function(roomId, userId, inc) {                                 // 2
    var query, update;                                                                                                 // 191
    if (inc == null) {                                                                                                 //
      inc = 1;                                                                                                         //
    }                                                                                                                  //
    query = {                                                                                                          // 191
      rid: roomId,                                                                                                     // 192
      'u._id': {                                                                                                       // 192
        $ne: userId                                                                                                    // 194
      }                                                                                                                //
    };                                                                                                                 //
    update = {                                                                                                         // 191
      $set: {                                                                                                          // 197
        alert: true,                                                                                                   // 198
        open: true                                                                                                     // 198
      },                                                                                                               //
      $inc: {                                                                                                          // 197
        unread: inc                                                                                                    // 201
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update, {                                                                                // 203
      multi: true                                                                                                      // 203
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.incUnreadForRoomIdAndUserIds = function(roomId, userIds, inc) {                                     // 2
    var query, update;                                                                                                 // 206
    if (inc == null) {                                                                                                 //
      inc = 1;                                                                                                         //
    }                                                                                                                  //
    query = {                                                                                                          // 206
      rid: roomId,                                                                                                     // 207
      'u._id': {                                                                                                       // 207
        $in: userIds                                                                                                   // 209
      }                                                                                                                //
    };                                                                                                                 //
    update = {                                                                                                         // 206
      $set: {                                                                                                          // 212
        alert: true,                                                                                                   // 213
        open: true                                                                                                     // 213
      },                                                                                                               //
      $inc: {                                                                                                          // 212
        unread: inc                                                                                                    // 216
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update, {                                                                                // 218
      multi: true                                                                                                      // 218
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setAlertForRoomIdExcludingUserId = function(roomId, userId, alert) {                                // 2
    var query, update;                                                                                                 // 221
    if (alert == null) {                                                                                               //
      alert = true;                                                                                                    //
    }                                                                                                                  //
    query = {                                                                                                          // 221
      rid: roomId,                                                                                                     // 222
      alert: {                                                                                                         // 222
        $ne: alert                                                                                                     // 224
      },                                                                                                               //
      'u._id': {                                                                                                       // 222
        $ne: userId                                                                                                    // 226
      }                                                                                                                //
    };                                                                                                                 //
    update = {                                                                                                         // 221
      $set: {                                                                                                          // 229
        alert: alert,                                                                                                  // 230
        open: true                                                                                                     // 230
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update, {                                                                                // 233
      multi: true                                                                                                      // 233
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.updateTypeByRoomId = function(roomId, type) {                                                       // 2
    var query, update;                                                                                                 // 236
    query = {                                                                                                          // 236
      rid: roomId                                                                                                      // 237
    };                                                                                                                 //
    update = {                                                                                                         // 236
      $set: {                                                                                                          // 240
        t: type                                                                                                        // 241
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update, {                                                                                // 243
      multi: true                                                                                                      // 243
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.addRoleById = function(_id, role) {                                                                 // 2
    var query, update;                                                                                                 // 246
    query = {                                                                                                          // 246
      _id: _id                                                                                                         // 247
    };                                                                                                                 //
    update = {                                                                                                         // 246
      $addToSet: {                                                                                                     // 250
        roles: role                                                                                                    // 251
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 253
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.removeRoleById = function(_id, role) {                                                              // 2
    var query, update;                                                                                                 // 256
    query = {                                                                                                          // 256
      _id: _id                                                                                                         // 257
    };                                                                                                                 //
    update = {                                                                                                         // 256
      $pull: {                                                                                                         // 260
        roles: role                                                                                                    // 261
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 263
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.createWithRoomAndUser = function(room, user, extraData) {                                           // 2
    var subscription;                                                                                                  // 267
    subscription = {                                                                                                   // 267
      open: false,                                                                                                     // 268
      alert: false,                                                                                                    // 268
      unread: 0,                                                                                                       // 268
      ts: room.ts,                                                                                                     // 268
      rid: room._id,                                                                                                   // 268
      name: room.name,                                                                                                 // 268
      t: room.t,                                                                                                       // 268
      u: {                                                                                                             // 268
        _id: user._id,                                                                                                 // 276
        username: user.username                                                                                        // 276
      }                                                                                                                //
    };                                                                                                                 //
    _.extend(subscription, extraData);                                                                                 // 267
    return this.insert(subscription);                                                                                  // 281
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.removeByUserId = function(userId) {                                                                 // 2
    var query;                                                                                                         // 286
    query = {                                                                                                          // 286
      "u._id": userId                                                                                                  // 287
    };                                                                                                                 //
    return this.remove(query);                                                                                         // 289
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.removeByRoomId = function(roomId) {                                                                 // 2
    var query;                                                                                                         // 292
    query = {                                                                                                          // 292
      rid: roomId                                                                                                      // 293
    };                                                                                                                 //
    return this.remove(query);                                                                                         // 295
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.removeByRoomIdAndUserId = function(roomId, userId) {                                                // 2
    var query;                                                                                                         // 298
    query = {                                                                                                          // 298
      rid: roomId,                                                                                                     // 299
      "u._id": userId                                                                                                  // 299
    };                                                                                                                 //
    return this.remove(query);                                                                                         // 302
  };                                                                                                                   //
                                                                                                                       //
  return _Class;                                                                                                       //
                                                                                                                       //
})(RocketChat.models._Base));                                                                                          //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/models/Uploads.coffee.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;                                                                                         //
                                                                                                                       //
RocketChat.models.Uploads = new ((function(superClass) {                                                               // 1
  extend(_Class, superClass);                                                                                          // 2
                                                                                                                       //
  function _Class() {                                                                                                  // 2
    this._initModel('uploads');                                                                                        // 3
    this.tryEnsureIndex({                                                                                              // 3
      'rid': 1                                                                                                         // 5
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'uploadedAt': 1                                                                                                  // 6
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  _Class.prototype.findOneById = function(fileId) {                                                                    // 2
    return this.findOne({                                                                                              //
      _id: fileId                                                                                                      // 9
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findNotHiddenFilesOfRoom = function(roomId, limit) {                                                // 2
    var fileOptions, fileQuery;                                                                                        // 12
    fileQuery = {                                                                                                      // 12
      rid: roomId,                                                                                                     // 13
      complete: true,                                                                                                  // 13
      uploading: false,                                                                                                // 13
      _hidden: {                                                                                                       // 13
        $ne: true                                                                                                      // 17
      }                                                                                                                //
    };                                                                                                                 //
    fileOptions = {                                                                                                    // 12
      limit: limit,                                                                                                    // 20
      sort: {                                                                                                          // 20
        uploadedAt: -1                                                                                                 // 22
      },                                                                                                               //
      fields: {                                                                                                        // 20
        _id: 1,                                                                                                        // 24
        userId: 1,                                                                                                     // 24
        rid: 1,                                                                                                        // 24
        name: 1,                                                                                                       // 24
        type: 1,                                                                                                       // 24
        url: 1,                                                                                                        // 24
        uploadedAt: 1                                                                                                  // 24
      }                                                                                                                //
    };                                                                                                                 //
    return this.find(fileQuery, fileOptions);                                                                          // 32
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.insertFileInit = function(roomId, userId, store, file, extra) {                                     // 2
    var fileData, ref;                                                                                                 // 35
    fileData = {                                                                                                       // 35
      rid: roomId,                                                                                                     // 36
      userId: userId,                                                                                                  // 36
      store: store,                                                                                                    // 36
      complete: false,                                                                                                 // 36
      uploading: true,                                                                                                 // 36
      progress: 0,                                                                                                     // 36
      extension: s.strRightBack(file.name, '.'),                                                                       // 36
      uploadedAt: new Date()                                                                                           // 36
    };                                                                                                                 //
    _.extend(fileData, file, extra);                                                                                   // 35
    if (((ref = this.model.direct) != null ? ref.insert : void 0) != null) {                                           // 47
      file = this.model.direct.insert(fileData);                                                                       // 48
    } else {                                                                                                           //
      file = this.insert(fileData);                                                                                    // 50
    }                                                                                                                  //
    return file;                                                                                                       // 52
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.updateFileComplete = function(fileId, userId, file) {                                               // 2
    var filter, ref, result, update;                                                                                   // 55
    if (!fileId) {                                                                                                     // 55
      return;                                                                                                          // 56
    }                                                                                                                  //
    filter = {                                                                                                         // 55
      _id: fileId,                                                                                                     // 59
      userId: userId                                                                                                   // 59
    };                                                                                                                 //
    update = {                                                                                                         // 55
      $set: {                                                                                                          // 63
        complete: true,                                                                                                // 64
        uploading: false,                                                                                              // 64
        progress: 1                                                                                                    // 64
      }                                                                                                                //
    };                                                                                                                 //
    update.$set = _.extend(file, update.$set);                                                                         // 55
    if (((ref = this.model.direct) != null ? ref.insert : void 0) != null) {                                           // 70
      result = this.model.direct.update(filter, update);                                                               // 71
    } else {                                                                                                           //
      result = this.update(filter, update);                                                                            // 73
    }                                                                                                                  //
    return result;                                                                                                     // 75
  };                                                                                                                   //
                                                                                                                       //
  return _Class;                                                                                                       //
                                                                                                                       //
})(RocketChat.models._Base));                                                                                          //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/models/Users.coffee.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;                                                                                         //
                                                                                                                       //
RocketChat.models.Users = new ((function(superClass) {                                                                 // 1
  extend(_Class, superClass);                                                                                          // 2
                                                                                                                       //
  function _Class() {                                                                                                  // 2
    this.model = Meteor.users;                                                                                         // 3
    this.tryEnsureIndex({                                                                                              // 3
      'roles': 1                                                                                                       // 5
    }, {                                                                                                               //
      sparse: 1                                                                                                        // 5
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'name': 1                                                                                                        // 6
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'lastLogin': 1                                                                                                   // 7
    });                                                                                                                //
    this.tryEnsureIndex({                                                                                              // 3
      'status': 1                                                                                                      // 8
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  _Class.prototype.findOneById = function(_id, options) {                                                              // 2
    return this.findOne(_id, options);                                                                                 // 13
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findOneByUsername = function(username, options) {                                                   // 2
    var query;                                                                                                         // 16
    query = {                                                                                                          // 16
      username: username                                                                                               // 17
    };                                                                                                                 //
    return this.findOne(query, options);                                                                               // 19
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findOneByEmailAddress = function(emailAddress, options) {                                           // 2
    var query;                                                                                                         // 22
    query = {                                                                                                          // 22
      'emails.address': emailAddress                                                                                   // 23
    };                                                                                                                 //
    return this.findOne(query, options);                                                                               // 25
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findOneVerifiedFromSameDomain = function(email, options) {                                          // 2
    var domain, query;                                                                                                 // 28
    domain = s.strRight(email, '@');                                                                                   // 28
    query = {                                                                                                          // 28
      emails: {                                                                                                        // 30
        $elemMatch: {                                                                                                  // 31
          address: {                                                                                                   // 32
            $regex: new RegExp("@" + domain + "$", "i"),                                                               // 33
            $ne: email                                                                                                 // 33
          },                                                                                                           //
          verified: true                                                                                               // 32
        }                                                                                                              //
      }                                                                                                                //
    };                                                                                                                 //
    return this.findOne(query, options);                                                                               // 37
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findOneAdmin = function(admin, options) {                                                           // 2
    var query;                                                                                                         // 40
    query = {                                                                                                          // 40
      admin: admin                                                                                                     // 41
    };                                                                                                                 //
    return this.findOne(query, options);                                                                               // 43
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findOneByIdAndLoginToken = function(_id, token, options) {                                          // 2
    var query;                                                                                                         // 46
    query = {                                                                                                          // 46
      _id: _id,                                                                                                        // 47
      'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(token)                                       // 47
    };                                                                                                                 //
    return this.findOne(query, options);                                                                               // 50
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findUsersNotOffline = function(options) {                                                           // 2
    var query;                                                                                                         // 55
    query = {                                                                                                          // 55
      username: {                                                                                                      // 56
        $exists: 1                                                                                                     // 57
      },                                                                                                               //
      status: {                                                                                                        // 56
        $in: ['online', 'away', 'busy']                                                                                // 59
      }                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 61
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByUsername = function(username, options) {                                                      // 2
    var query;                                                                                                         // 65
    query = {                                                                                                          // 65
      username: username                                                                                               // 66
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 68
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findUsersByUsernamesWithHighlights = function(username, options) {                                  // 2
    var query;                                                                                                         // 71
    query = {                                                                                                          // 71
      username: username,                                                                                              // 72
      'settings.preferences.highlights': {                                                                             // 72
        $exists: true                                                                                                  // 74
      }                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 76
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findActiveByUsernameRegexWithExceptions = function(username, exceptions, options) {                 // 2
    var query, usernameRegex;                                                                                          // 79
    if (exceptions == null) {                                                                                          //
      exceptions = [];                                                                                                 //
    }                                                                                                                  //
    if (options == null) {                                                                                             //
      options = {};                                                                                                    //
    }                                                                                                                  //
    if (!_.isArray(exceptions)) {                                                                                      // 79
      exceptions = [exceptions];                                                                                       // 80
    }                                                                                                                  //
    usernameRegex = new RegExp(username, "i");                                                                         // 79
    query = {                                                                                                          // 79
      $and: [                                                                                                          // 84
        {                                                                                                              //
          active: true                                                                                                 // 85
        }, {                                                                                                           //
          username: {                                                                                                  // 86
            $nin: exceptions                                                                                           // 86
          }                                                                                                            //
        }, {                                                                                                           //
          username: usernameRegex                                                                                      // 87
        }                                                                                                              //
      ]                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 90
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByActiveUsersUsernameExcept = function(username, except, options) {                             // 2
    var query;                                                                                                         // 93
    query = {                                                                                                          // 93
      active: true,                                                                                                    // 94
      $and: [                                                                                                          // 94
        {                                                                                                              //
          username: {                                                                                                  // 96
            $nin: except                                                                                               // 96
          }                                                                                                            //
        }, {                                                                                                           //
          username: username                                                                                           // 97
        }                                                                                                              //
      ]                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 100
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findUsersByNameOrUsername = function(nameOrUsername, options) {                                     // 2
    var query;                                                                                                         // 103
    query = {                                                                                                          // 103
      username: {                                                                                                      // 104
        $exists: 1                                                                                                     // 105
      },                                                                                                               //
      $or: [                                                                                                           // 104
        {                                                                                                              //
          name: nameOrUsername                                                                                         // 108
        }, {                                                                                                           //
          username: nameOrUsername                                                                                     // 109
        }                                                                                                              //
      ]                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 112
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findByUsernameNameOrEmailAddress = function(usernameNameOrEmailAddress, options) {                  // 2
    var query;                                                                                                         // 115
    query = {                                                                                                          // 115
      $or: [                                                                                                           // 116
        {                                                                                                              //
          name: usernameNameOrEmailAddress                                                                             // 117
        }, {                                                                                                           //
          username: usernameNameOrEmailAddress                                                                         // 118
        }, {                                                                                                           //
          'emails.address': usernameNameOrEmailAddress                                                                 // 119
        }                                                                                                              //
      ]                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 122
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findLDAPUsers = function(options) {                                                                 // 2
    var query;                                                                                                         // 125
    query = {                                                                                                          // 125
      ldap: true                                                                                                       // 126
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 128
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.getLastLogin = function(options) {                                                                  // 2
    var query, ref, ref1, ref2;                                                                                        // 131
    if (options == null) {                                                                                             //
      options = {};                                                                                                    //
    }                                                                                                                  //
    query = {                                                                                                          // 131
      lastLogin: {                                                                                                     // 131
        $exists: 1                                                                                                     // 131
      }                                                                                                                //
    };                                                                                                                 //
    options.sort = {                                                                                                   // 131
      lastLogin: -1                                                                                                    // 132
    };                                                                                                                 //
    options.limit = 1;                                                                                                 // 131
    return (ref = this.find(query, options)) != null ? typeof ref.fetch === "function" ? (ref1 = ref.fetch()) != null ? (ref2 = ref1[0]) != null ? ref2.lastLogin : void 0 : void 0 : void 0 : void 0;
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.findUsersByUsernames = function(usernames, options) {                                               // 2
    var query;                                                                                                         // 138
    query = {                                                                                                          // 138
      username: {                                                                                                      // 139
        $in: usernames                                                                                                 // 140
      }                                                                                                                //
    };                                                                                                                 //
    return this.find(query, options);                                                                                  // 142
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.updateLastLoginById = function(_id) {                                                               // 2
    var update;                                                                                                        // 146
    update = {                                                                                                         // 146
      $set: {                                                                                                          // 147
        lastLogin: new Date                                                                                            // 148
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(_id, update);                                                                                   // 150
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setServiceId = function(_id, serviceName, serviceId) {                                              // 2
    var serviceIdKey, update;                                                                                          // 153
    update = {                                                                                                         // 153
      $set: {}                                                                                                         // 154
    };                                                                                                                 //
    serviceIdKey = "services." + serviceName + ".id";                                                                  // 153
    update.$set[serviceIdKey] = serviceId;                                                                             // 153
    return this.update(_id, update);                                                                                   // 159
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setUsername = function(_id, username) {                                                             // 2
    var update;                                                                                                        // 162
    update = {                                                                                                         // 162
      $set: {                                                                                                          // 163
        username: username                                                                                             // 163
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(_id, update);                                                                                   // 165
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setEmail = function(_id, email) {                                                                   // 2
    var update;                                                                                                        // 168
    update = {                                                                                                         // 168
      $set: {                                                                                                          // 169
        'emails.0.address': email,                                                                                     // 170
        'emails.0.verified': false                                                                                     // 170
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(_id, update);                                                                                   // 173
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setEmailVerified = function(_id, email) {                                                           // 2
    var query, update;                                                                                                 // 176
    query = {                                                                                                          // 176
      _id: _id,                                                                                                        // 177
      emails: {                                                                                                        // 177
        $elemMatch: {                                                                                                  // 179
          address: email,                                                                                              // 180
          verified: false                                                                                              // 180
        }                                                                                                              //
      }                                                                                                                //
    };                                                                                                                 //
    update = {                                                                                                         // 176
      $set: {                                                                                                          // 184
        'emails.$.verified': true                                                                                      // 185
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 187
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setName = function(_id, name) {                                                                     // 2
    var update;                                                                                                        // 190
    update = {                                                                                                         // 190
      $set: {                                                                                                          // 191
        name: name                                                                                                     // 192
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(_id, update);                                                                                   // 194
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setAvatarOrigin = function(_id, origin) {                                                           // 2
    var update;                                                                                                        // 197
    update = {                                                                                                         // 197
      $set: {                                                                                                          // 198
        avatarOrigin: origin                                                                                           // 199
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(_id, update);                                                                                   // 201
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.unsetAvatarOrigin = function(_id) {                                                                 // 2
    var update;                                                                                                        // 204
    update = {                                                                                                         // 204
      $unset: {                                                                                                        // 205
        avatarOrigin: 1                                                                                                // 206
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(_id, update);                                                                                   // 208
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setUserActive = function(_id, active) {                                                             // 2
    var update;                                                                                                        // 211
    if (active == null) {                                                                                              //
      active = true;                                                                                                   //
    }                                                                                                                  //
    update = {                                                                                                         // 211
      $set: {                                                                                                          // 212
        active: active                                                                                                 // 213
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(_id, update);                                                                                   // 215
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setAllUsersActive = function(active) {                                                              // 2
    var update;                                                                                                        // 218
    update = {                                                                                                         // 218
      $set: {                                                                                                          // 219
        active: active                                                                                                 // 220
      }                                                                                                                //
    };                                                                                                                 //
    return this.update({}, update, {                                                                                   // 222
      multi: true                                                                                                      // 222
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.unsetLoginTokens = function(_id) {                                                                  // 2
    var update;                                                                                                        // 225
    update = {                                                                                                         // 225
      $set: {                                                                                                          // 226
        "services.resume.loginTokens": []                                                                              // 227
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(_id, update);                                                                                   // 229
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.unsetRequirePasswordChange = function(_id) {                                                        // 2
    var update;                                                                                                        // 232
    update = {                                                                                                         // 232
      $unset: {                                                                                                        // 233
        "requirePasswordChange": true,                                                                                 // 234
        "requirePasswordChangeReason": true                                                                            // 234
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(_id, update);                                                                                   // 237
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.resetPasswordAndSetRequirePasswordChange = function(_id, requirePasswordChange, requirePasswordChangeReason) {
    var update;                                                                                                        // 240
    update = {                                                                                                         // 240
      $unset: {                                                                                                        // 241
        "services.password": 1                                                                                         // 242
      },                                                                                                               //
      $set: {                                                                                                          // 241
        "requirePasswordChange": requirePasswordChange,                                                                // 244
        "requirePasswordChangeReason": requirePasswordChangeReason                                                     // 244
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(_id, update);                                                                                   // 247
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setLanguage = function(_id, language) {                                                             // 2
    var update;                                                                                                        // 250
    update = {                                                                                                         // 250
      $set: {                                                                                                          // 251
        language: language                                                                                             // 252
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(_id, update);                                                                                   // 254
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setProfile = function(_id, profile) {                                                               // 2
    var update;                                                                                                        // 257
    update = {                                                                                                         // 257
      $set: {                                                                                                          // 258
        "settings.profile": profile                                                                                    // 259
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(_id, update);                                                                                   // 261
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setPreferences = function(_id, preferences) {                                                       // 2
    var update;                                                                                                        // 264
    update = {                                                                                                         // 264
      $set: {                                                                                                          // 265
        "settings.preferences": preferences                                                                            // 266
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(_id, update);                                                                                   // 268
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.setUtcOffset = function(_id, utcOffset) {                                                           // 2
    var query, update;                                                                                                 // 271
    query = {                                                                                                          // 271
      _id: _id,                                                                                                        // 272
      utcOffset: {                                                                                                     // 272
        $ne: utcOffset                                                                                                 // 274
      }                                                                                                                //
    };                                                                                                                 //
    update = {                                                                                                         // 271
      $set: {                                                                                                          // 277
        utcOffset: utcOffset                                                                                           // 278
      }                                                                                                                //
    };                                                                                                                 //
    return this.update(query, update);                                                                                 // 280
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.create = function(data) {                                                                           // 2
    var user;                                                                                                          // 285
    user = {                                                                                                           // 285
      createdAt: new Date,                                                                                             // 286
      avatarOrigin: 'none'                                                                                             // 286
    };                                                                                                                 //
    _.extend(user, data);                                                                                              // 285
    return this.insert(user);                                                                                          // 291
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.removeById = function(_id) {                                                                        // 2
    return this.remove(_id);                                                                                           // 296
  };                                                                                                                   //
                                                                                                                       //
                                                                                                                       // 298
  /*                                                                                                                   // 298
  	Find users to send a message by email if:                                                                           //
  	- he is not online                                                                                                  //
  	- has a verified email                                                                                              //
  	- has not disabled email notifications                                                                              //
   */                                                                                                                  //
                                                                                                                       //
  _Class.prototype.getUsersToSendOfflineEmail = function(usersIds) {                                                   // 2
    var query;                                                                                                         // 305
    query = {                                                                                                          // 305
      _id: {                                                                                                           // 306
        $in: usersIds                                                                                                  // 307
      },                                                                                                               //
      status: 'offline',                                                                                               // 306
      statusConnection: {                                                                                              // 306
        $ne: 'online'                                                                                                  // 310
      },                                                                                                               //
      'emails.verified': true                                                                                          // 306
    };                                                                                                                 //
    return this.find(query, {                                                                                          // 313
      fields: {                                                                                                        // 313
        name: 1,                                                                                                       // 313
        username: 1,                                                                                                   // 313
        emails: 1,                                                                                                     // 313
        'settings.preferences.emailNotificationMode': 1                                                                // 313
      }                                                                                                                //
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  return _Class;                                                                                                       //
                                                                                                                       //
})(RocketChat.models._Base));                                                                                          //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/publications/settings.coffee.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('settings', function(ids) {                                                                             // 1
  if (ids == null) {                                                                                                   //
    ids = [];                                                                                                          //
  }                                                                                                                    //
  return RocketChat.models.Settings.findNotHiddenPublic(ids);                                                          // 2
});                                                                                                                    // 1
                                                                                                                       //
Meteor.publish('admin-settings', function() {                                                                          // 1
  if (!this.userId) {                                                                                                  // 5
    return this.ready();                                                                                               // 6
  }                                                                                                                    //
  if (RocketChat.authz.hasPermission(this.userId, 'view-privileged-setting')) {                                        // 8
    return RocketChat.models.Settings.findNotHidden();                                                                 // 9
  } else {                                                                                                             //
    return this.ready();                                                                                               // 11
  }                                                                                                                    //
});                                                                                                                    // 4
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/functions/checkUsernameAvailability.coffee.js                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.checkUsernameAvailability = function(username) {                                                            // 1
  return !Meteor.users.findOne({                                                                                       // 2
    username: {                                                                                                        // 2
      $regex: new RegExp("^" + s.trim(s.escapeRegExp(username)) + "$", "i")                                            // 2
    }                                                                                                                  //
  });                                                                                                                  //
};                                                                                                                     // 1
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/functions/checkEmailAvailability.js                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.checkEmailAvailability = function (email) {                                                                 // 1
	return !Meteor.users.findOne({ "emails.address": { $regex: new RegExp("^" + s.trim(s.escapeRegExp(email)) + "$", "i") } });
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/functions/sendMessage.coffee.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.sendMessage = function(user, message, room, options) {                                                      // 1
  var urls;                                                                                                            // 2
  if (!user || !message || !room._id) {                                                                                // 2
    return false;                                                                                                      // 3
  }                                                                                                                    //
  if (message.ts == null) {                                                                                            // 5
    message.ts = new Date();                                                                                           // 6
  }                                                                                                                    //
  message.u = _.pick(user, ['_id', 'username']);                                                                       // 2
  message.rid = room._id;                                                                                              // 2
  if (room.usernames == null) {                                                                                        // 12
    room = RocketChat.models.Rooms.findOneById(room._id);                                                              // 13
  }                                                                                                                    //
  if (message.parseUrls !== false) {                                                                                   // 15
    if (urls = message.msg.match(/([A-Za-z]{3,9}):\/\/([-;:&=\+\$,\w]+@{1})?([-A-Za-z0-9\.]+)+:?(\d+)?((\/[-\+=!:~%\/\.@\,\w]*)?\??([-\+=&!:;%@\/\.\,\w]+)?(?:#([^\s\)]+))?)?/g)) {
      message.urls = urls.map(function(url) {                                                                          // 17
        return {                                                                                                       //
          url: url                                                                                                     // 17
        };                                                                                                             //
      });                                                                                                              //
    }                                                                                                                  //
  }                                                                                                                    //
  message = RocketChat.callbacks.run('beforeSaveMessage', message);                                                    // 2
  if ((message._id != null) && (options != null ? options.upsert : void 0) === true) {                                 // 21
    RocketChat.models.Messages.upsert({                                                                                // 22
      _id: message._id                                                                                                 // 22
    }, message);                                                                                                       //
  } else {                                                                                                             //
    message._id = RocketChat.models.Messages.insert(message);                                                          // 24
  }                                                                                                                    //
                                                                                                                       // 26
  /*                                                                                                                   // 26
  	Defer other updates as their return is not interesting to the user                                                  //
   */                                                                                                                  //
  Meteor.defer(function() {                                                                                            // 2
    return RocketChat.callbacks.run('afterSaveMessage', message, room);                                                //
  });                                                                                                                  //
  return message;                                                                                                      // 33
};                                                                                                                     // 1
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/functions/settings.coffee.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var blockedSettings, hiddenSettings, ref, ref1;                                                                        // 1
                                                                                                                       //
blockedSettings = {};                                                                                                  // 1
                                                                                                                       //
if ((ref = process.env.SETTINGS_BLOCKED) != null) {                                                                    //
  ref.split(',').forEach(function(settingId) {                                                                         //
    return blockedSettings[settingId] = 1;                                                                             //
  });                                                                                                                  //
}                                                                                                                      //
                                                                                                                       //
hiddenSettings = {};                                                                                                   // 1
                                                                                                                       //
if ((ref1 = process.env.SETTINGS_HIDDEN) != null) {                                                                    //
  ref1.split(',').forEach(function(settingId) {                                                                        //
    return hiddenSettings[settingId] = 1;                                                                              //
  });                                                                                                                  //
}                                                                                                                      //
                                                                                                                       //
RocketChat.settings._sorter = 0;                                                                                       // 1
                                                                                                                       //
                                                                                                                       // 11
/*                                                                                                                     // 11
 * Add a setting                                                                                                       //
 * @param {String} _id                                                                                                 //
 * @param {Mixed} value                                                                                                //
 * @param {Object} setting                                                                                             //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.settings.add = function(_id, value, options) {                                                              // 1
  var ref2, ref3, ref4, updateOperations;                                                                              // 20
  if (options == null) {                                                                                               //
    options = {};                                                                                                      //
  }                                                                                                                    //
  if (!_id || (value == null)) {                                                                                       // 20
    return false;                                                                                                      // 21
  }                                                                                                                    //
  options.packageValue = value;                                                                                        // 20
  options.valueSource = 'packageValue';                                                                                // 20
  options.ts = new Date;                                                                                               // 20
  options.hidden = false;                                                                                              // 20
  options.blocked = options.blocked || false;                                                                          // 20
  if (options.sorter == null) {                                                                                        //
    options.sorter = RocketChat.settings._sorter++;                                                                    //
  }                                                                                                                    //
  if (options.enableQuery != null) {                                                                                   // 30
    options.enableQuery = JSON.stringify(options.enableQuery);                                                         // 31
  }                                                                                                                    //
  if ((typeof process !== "undefined" && process !== null ? (ref2 = process.env) != null ? ref2[_id] : void 0 : void 0) != null) {
    value = process.env[_id];                                                                                          // 34
    if (value.toLowerCase() === "true") {                                                                              // 35
      value = true;                                                                                                    // 36
    } else if (value.toLowerCase() === "false") {                                                                      //
      value = false;                                                                                                   // 38
    }                                                                                                                  //
    options.processEnvValue = value;                                                                                   // 34
    options.valueSource = 'processEnvValue';                                                                           // 34
  } else if (((ref3 = Meteor.settings) != null ? ref3[_id] : void 0) != null) {                                        //
    value = Meteor.settings[_id];                                                                                      // 43
    options.meteorSettingsValue = value;                                                                               // 43
    options.valueSource = 'meteorSettingsValue';                                                                       // 43
  }                                                                                                                    //
  if (options.i18nLabel == null) {                                                                                     // 47
    options.i18nLabel = _id;                                                                                           // 48
  }                                                                                                                    //
  if (options.i18nDescription == null) {                                                                               // 51
    options.i18nDescription = _id + "_Description";                                                                    // 52
  }                                                                                                                    //
  if (blockedSettings[_id] != null) {                                                                                  // 54
    options.blocked = true;                                                                                            // 55
  }                                                                                                                    //
  if (hiddenSettings[_id] != null) {                                                                                   // 57
    options.hidden = true;                                                                                             // 58
  }                                                                                                                    //
  if ((typeof process !== "undefined" && process !== null ? (ref4 = process.env) != null ? ref4['OVERWRITE_SETTING_' + _id] : void 0 : void 0) != null) {
    value = process.env['OVERWRITE_SETTING_' + _id];                                                                   // 61
    if (value.toLowerCase() === "true") {                                                                              // 62
      value = true;                                                                                                    // 63
    } else if (value.toLowerCase() === "false") {                                                                      //
      value = false;                                                                                                   // 65
    }                                                                                                                  //
    options.value = value;                                                                                             // 61
    options.processEnvValue = value;                                                                                   // 61
    options.valueSource = 'processEnvValue';                                                                           // 61
  }                                                                                                                    //
  updateOperations = {                                                                                                 // 20
    $set: options,                                                                                                     // 71
    $setOnInsert: {                                                                                                    // 71
      createdAt: new Date                                                                                              // 73
    }                                                                                                                  //
  };                                                                                                                   //
  if (options.value == null) {                                                                                         // 75
    if (options.force === true) {                                                                                      // 76
      updateOperations.$set.value = options.packageValue;                                                              // 77
    } else {                                                                                                           //
      updateOperations.$setOnInsert.value = value;                                                                     // 79
    }                                                                                                                  //
  }                                                                                                                    //
  if (options.section == null) {                                                                                       // 81
    updateOperations.$unset = {                                                                                        // 82
      section: 1                                                                                                       // 82
    };                                                                                                                 //
  }                                                                                                                    //
  return RocketChat.models.Settings.upsert({                                                                           // 84
    _id: _id                                                                                                           // 84
  }, updateOperations);                                                                                                //
};                                                                                                                     // 17
                                                                                                                       //
                                                                                                                       // 88
/*                                                                                                                     // 88
 * Add a setting group                                                                                                 //
 * @param {String} _id                                                                                                 //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.settings.addGroup = function(_id, options, cb) {                                                            // 1
  if (options == null) {                                                                                               //
    options = {};                                                                                                      //
  }                                                                                                                    //
  if (!_id) {                                                                                                          // 95
    return false;                                                                                                      // 96
  }                                                                                                                    //
  if (_.isFunction(options)) {                                                                                         // 98
    cb = options;                                                                                                      // 99
    options = {};                                                                                                      // 99
  }                                                                                                                    //
  if (options.i18nLabel == null) {                                                                                     // 102
    options.i18nLabel = _id;                                                                                           // 103
  }                                                                                                                    //
  if (options.i18nDescription == null) {                                                                               // 105
    options.i18nDescription = _id + "_Description";                                                                    // 106
  }                                                                                                                    //
  options.ts = new Date;                                                                                               // 95
  options.blocked = false;                                                                                             // 95
  options.hidden = false;                                                                                              // 95
  if (blockedSettings[_id] != null) {                                                                                  // 112
    options.blocked = true;                                                                                            // 113
  }                                                                                                                    //
  if (hiddenSettings[_id] != null) {                                                                                   // 115
    options.hidden = true;                                                                                             // 116
  }                                                                                                                    //
  RocketChat.models.Settings.upsert({                                                                                  // 95
    _id: _id                                                                                                           // 118
  }, {                                                                                                                 //
    $set: options,                                                                                                     // 119
    $setOnInsert: {                                                                                                    // 119
      type: 'group',                                                                                                   // 121
      createdAt: new Date                                                                                              // 121
    }                                                                                                                  //
  });                                                                                                                  //
  if (cb != null) {                                                                                                    // 124
    cb.call({                                                                                                          // 125
      add: function(id, value, options) {                                                                              // 126
        if (options == null) {                                                                                         //
          options = {};                                                                                                //
        }                                                                                                              //
        options.group = _id;                                                                                           // 127
        return RocketChat.settings.add(id, value, options);                                                            //
      },                                                                                                               //
      section: function(section, cb) {                                                                                 // 126
        return cb.call({                                                                                               //
          add: function(id, value, options) {                                                                          // 132
            if (options == null) {                                                                                     //
              options = {};                                                                                            //
            }                                                                                                          //
            options.group = _id;                                                                                       // 133
            options.section = section;                                                                                 // 133
            return RocketChat.settings.add(id, value, options);                                                        //
          }                                                                                                            //
        });                                                                                                            //
      }                                                                                                                //
    });                                                                                                                //
  }                                                                                                                    //
};                                                                                                                     // 92
                                                                                                                       //
                                                                                                                       // 140
/*                                                                                                                     // 140
 * Remove a setting by id                                                                                              //
 * @param {String} _id                                                                                                 //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.settings.removeById = function(_id) {                                                                       // 1
  if (!_id) {                                                                                                          // 147
    return false;                                                                                                      // 148
  }                                                                                                                    //
  return RocketChat.models.Settings.removeById(_id);                                                                   // 150
};                                                                                                                     // 144
                                                                                                                       //
                                                                                                                       // 153
/*                                                                                                                     // 153
 * Update a setting by id                                                                                              //
 * @param {String} _id                                                                                                 //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.settings.updateById = function(_id, value) {                                                                // 1
  if (!_id || (value == null)) {                                                                                       // 160
    return false;                                                                                                      // 161
  }                                                                                                                    //
  return RocketChat.models.Settings.updateValueById(_id, value);                                                       // 163
};                                                                                                                     // 157
                                                                                                                       //
                                                                                                                       // 166
/*                                                                                                                     // 166
 * Update options of a setting by id                                                                                   //
 * @param {String} _id                                                                                                 //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.settings.updateOptionsById = function(_id, options) {                                                       // 1
  if (!_id || (options == null)) {                                                                                     // 173
    return false;                                                                                                      // 174
  }                                                                                                                    //
  return RocketChat.models.Settings.updateOptionsById(_id, options);                                                   // 176
};                                                                                                                     // 170
                                                                                                                       //
                                                                                                                       // 179
/*                                                                                                                     // 179
 * Update a setting by id                                                                                              //
 * @param {String} _id                                                                                                 //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.settings.clearById = function(_id) {                                                                        // 1
  if (_id == null) {                                                                                                   // 186
    return false;                                                                                                      // 187
  }                                                                                                                    //
  return RocketChat.models.Settings.updateValueById(_id, void 0);                                                      // 189
};                                                                                                                     // 183
                                                                                                                       //
                                                                                                                       // 192
/*                                                                                                                     // 192
 * Update a setting by id                                                                                              //
 */                                                                                                                    //
                                                                                                                       //
RocketChat.settings.init = function() {                                                                                // 1
  var initialLoad;                                                                                                     // 196
  initialLoad = true;                                                                                                  // 196
  RocketChat.models.Settings.find().observe({                                                                          // 196
    added: function(record) {                                                                                          // 198
      Meteor.settings[record._id] = record.value;                                                                      // 199
      if (record.env === true) {                                                                                       // 200
        process.env[record._id] = record.value;                                                                        // 201
      }                                                                                                                //
      return RocketChat.settings.load(record._id, record.value, initialLoad);                                          //
    },                                                                                                                 //
    changed: function(record) {                                                                                        // 198
      Meteor.settings[record._id] = record.value;                                                                      // 204
      if (record.env === true) {                                                                                       // 205
        process.env[record._id] = record.value;                                                                        // 206
      }                                                                                                                //
      return RocketChat.settings.load(record._id, record.value, initialLoad);                                          //
    },                                                                                                                 //
    removed: function(record) {                                                                                        // 198
      delete Meteor.settings[record._id];                                                                              // 209
      if (record.env === true) {                                                                                       // 210
        delete process.env[record._id];                                                                                // 211
      }                                                                                                                //
      return RocketChat.settings.load(record._id, void 0, initialLoad);                                                //
    }                                                                                                                  //
  });                                                                                                                  //
  return initialLoad = false;                                                                                          //
};                                                                                                                     // 195
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/functions/setUsername.coffee.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat._setUsername = function(userId, username) {                                                                 // 1
  var nameValidation, previousUsername, ref, rs, user, ws;                                                             // 2
  username = s.trim(username);                                                                                         // 2
  if (!userId || !username) {                                                                                          // 3
    return false;                                                                                                      // 4
  }                                                                                                                    //
  try {                                                                                                                // 6
    nameValidation = new RegExp('^' + RocketChat.settings.get('UTF8_Names_Validation') + '$');                         // 7
  } catch (_error) {                                                                                                   //
    nameValidation = new RegExp('^[0-9a-zA-Z-_.]+$');                                                                  // 9
  }                                                                                                                    //
  if (!nameValidation.test(username)) {                                                                                // 11
    return false;                                                                                                      // 12
  }                                                                                                                    //
  user = RocketChat.models.Users.findOneById(userId);                                                                  // 2
  if (user.username === username) {                                                                                    // 17
    return user;                                                                                                       // 18
  }                                                                                                                    //
  previousUsername = user.username;                                                                                    // 2
  if (!previousUsername || !(username.toLowerCase() === previousUsername.toLowerCase())) {                             // 23
    if (!RocketChat.checkUsernameAvailability(username)) {                                                             // 24
      return false;                                                                                                    // 25
    }                                                                                                                  //
  }                                                                                                                    //
  if (!previousUsername && ((ref = user.emails) != null ? ref.length : void 0) > 0 && RocketChat.settings.get('Accounts_Enrollment_Email')) {
    Accounts.sendEnrollmentEmail(user._id);                                                                            // 31
  }                                                                                                                    //
  if (previousUsername) {                                                                                              // 34
    RocketChat.models.Messages.updateAllUsernamesByUserId(user._id, username);                                         // 35
    RocketChat.models.Messages.updateUsernameOfEditByUserId(user._id, username);                                       // 35
    RocketChat.models.Messages.findByMention(previousUsername).forEach(function(msg) {                                 // 35
      var updatedMsg;                                                                                                  // 39
      updatedMsg = msg.msg.replace(new RegExp("@" + previousUsername, "ig"), "@" + username);                          // 39
      return RocketChat.models.Messages.updateUsernameAndMessageOfMentionByIdAndOldUsername(msg._id, previousUsername, username, updatedMsg);
    });                                                                                                                //
    RocketChat.models.Rooms.replaceUsername(previousUsername, username);                                               // 35
    RocketChat.models.Rooms.replaceMutedUsername(previousUsername, username);                                          // 35
    RocketChat.models.Rooms.replaceUsernameOfUserByUserId(user._id, username);                                         // 35
    RocketChat.models.Subscriptions.setUserUsernameByUserId(user._id, username);                                       // 35
    RocketChat.models.Subscriptions.setNameForDirectRoomsWithOldName(previousUsername, username);                      // 35
    rs = RocketChatFileAvatarInstance.getFileWithReadStream(encodeURIComponent(previousUsername + ".jpg"));            // 35
    if (rs != null) {                                                                                                  // 50
      RocketChatFileAvatarInstance.deleteFile(encodeURIComponent(username + ".jpg"));                                  // 51
      ws = RocketChatFileAvatarInstance.createWriteStream(encodeURIComponent(username + ".jpg"), rs.contentType);      // 51
      ws.on('end', Meteor.bindEnvironment(function() {                                                                 // 51
        return RocketChatFileAvatarInstance.deleteFile(encodeURIComponent(previousUsername + ".jpg"));                 //
      }));                                                                                                             //
      rs.readStream.pipe(ws);                                                                                          // 51
    }                                                                                                                  //
  }                                                                                                                    //
  RocketChat.models.Users.setUsername(user._id, username);                                                             // 2
  user.username = username;                                                                                            // 2
  return user;                                                                                                         // 60
};                                                                                                                     // 1
                                                                                                                       //
RocketChat.setUsername = RocketChat.RateLimiter.limitFunction(RocketChat._setUsername, 1, 60000, {                     // 1
  0: function(userId) {                                                                                                // 63
    return !RocketChat.authz.hasPermission(userId, 'edit-other-user-info');                                            // 63
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/functions/setEmail.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat._setEmail = function (userId, email) {                                                                      // 1
	email = s.trim(email);                                                                                                // 2
	if (!userId) {                                                                                                        // 3
		throw new Meteor.Error('invalid-user', "[methods] setEmail -> Invalid user");                                        // 4
	}                                                                                                                     //
                                                                                                                       //
	if (!email) {                                                                                                         // 7
		throw new Meteor.Error('invalid-email', "[methods] setEmail -> Invalid email");                                      // 8
	}                                                                                                                     //
                                                                                                                       //
	emailValidation = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	if (!emailValidation.test(email)) {                                                                                   // 12
		throw new Meteor.Error('email-invalid', email + " is not a valid e-mail");                                           // 13
	}                                                                                                                     //
                                                                                                                       //
	user = RocketChat.models.Users.findOneById(userId);                                                                   // 16
                                                                                                                       //
	// User already has desired username, return                                                                          //
	if (user.emails && user.emails[0] && user.emails[0].address === email) {                                              // 19
		return user;                                                                                                         // 20
	}                                                                                                                     //
                                                                                                                       //
	// Check e-mail availability                                                                                          //
	if (!RocketChat.checkEmailAvailability(email)) {                                                                      // 24
		throw new Meteor.Error('email-unavailable', email + " is already in use :(");                                        // 25
	}                                                                                                                     //
                                                                                                                       //
	// Set new email                                                                                                      //
	RocketChat.models.Users.setEmail(user._id, email);                                                                    // 29
	user.email = email;                                                                                                   // 30
	return user;                                                                                                          // 31
};                                                                                                                     //
                                                                                                                       //
RocketChat.setEmail = RocketChat.RateLimiter.limitFunction(RocketChat._setEmail, 1, 60000, {                           // 34
	0: function (userId) {                                                                                                // 35
		return !RocketChat.authz.hasPermission(userId, 'edit-other-user-info');                                              // 35
	} // Administrators have permission to change others emails, so don't limit those                                     //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/functions/Notifications.coffee.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var func,                                                                                                              // 1
  slice = [].slice;                                                                                                    //
                                                                                                                       //
RocketChat.Notifications = new ((function() {                                                                          // 1
  function _Class() {                                                                                                  // 2
    var self;                                                                                                          // 3
    self = this;                                                                                                       // 3
    this.debug = false;                                                                                                // 3
    this.streamAll = new Meteor.Stream('notify-all');                                                                  // 3
    this.streamRoom = new Meteor.Stream('notify-room');                                                                // 3
    this.streamUser = new Meteor.Stream('notify-user');                                                                // 3
    this.streamAll.permissions.write(function() {                                                                      // 3
      return false;                                                                                                    // 12
    });                                                                                                                //
    this.streamAll.permissions.read(function() {                                                                       // 3
      return this.userId != null;                                                                                      // 13
    });                                                                                                                //
    this.streamRoom.permissions.write(function() {                                                                     // 3
      return false;                                                                                                    // 15
    });                                                                                                                //
    this.streamRoom.permissions.read(function(eventName) {                                                             // 3
      var roomId, user;                                                                                                // 17
      if (this.userId == null) {                                                                                       // 17
        return false;                                                                                                  // 17
      }                                                                                                                //
      roomId = eventName.split('/')[0];                                                                                // 17
      user = Meteor.users.findOne(this.userId, {                                                                       // 17
        fields: {                                                                                                      // 21
          username: 1                                                                                                  // 21
        }                                                                                                              //
      });                                                                                                              //
      return RocketChat.models.Rooms.findOneByIdContainigUsername(roomId, user.username, {                             // 22
        fields: {                                                                                                      //
          _id: 1                                                                                                       //
        }                                                                                                              //
      }) != null;                                                                                                      //
    });                                                                                                                //
    this.streamUser.permissions.write(function() {                                                                     // 3
      return this.userId != null;                                                                                      // 24
    });                                                                                                                //
    this.streamUser.permissions.read(function(eventName) {                                                             // 3
      var userId;                                                                                                      // 26
      userId = eventName.split('/')[0];                                                                                // 26
      return (this.userId != null) && this.userId === userId;                                                          // 27
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  _Class.prototype.notifyAll = function() {                                                                            // 2
    var args, eventName;                                                                                               // 31
    eventName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];                            // 31
    if (this.debug === true) {                                                                                         // 31
      console.log('notifyAll', arguments);                                                                             // 31
    }                                                                                                                  //
    args.unshift(eventName);                                                                                           // 31
    return this.streamAll.emit.apply(this.streamAll, args);                                                            //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.notifyRoom = function() {                                                                           // 2
    var args, eventName, room;                                                                                         // 37
    room = arguments[0], eventName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];       // 37
    if (this.debug === true) {                                                                                         // 37
      console.log('notifyRoom', arguments);                                                                            // 37
    }                                                                                                                  //
    args.unshift(room + "/" + eventName);                                                                              // 37
    return this.streamRoom.emit.apply(this.streamRoom, args);                                                          //
  };                                                                                                                   //
                                                                                                                       //
  _Class.prototype.notifyUser = function() {                                                                           // 2
    var args, eventName, userId;                                                                                       // 43
    userId = arguments[0], eventName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];     // 43
    if (this.debug === true) {                                                                                         // 43
      console.log('notifyUser', arguments);                                                                            // 43
    }                                                                                                                  //
    args.unshift(userId + "/" + eventName);                                                                            // 43
    return this.streamUser.emit.apply(this.streamUser, args);                                                          //
  };                                                                                                                   //
                                                                                                                       //
  return _Class;                                                                                                       //
                                                                                                                       //
})());                                                                                                                 //
                                                                                                                       //
func = function(eventName, username, typing) {                                                                         // 1
  var e, ref, room, user;                                                                                              // 53
  ref = eventName.split('/'), room = ref[0], e = ref[1];                                                               // 53
  if (e === 'webrtc') {                                                                                                // 55
    return true;                                                                                                       // 56
  }                                                                                                                    //
  if (e === 'typing') {                                                                                                // 58
    user = Meteor.users.findOne(this.userId, {                                                                         // 59
      fields: {                                                                                                        // 59
        username: 1                                                                                                    // 59
      }                                                                                                                //
    });                                                                                                                //
    if ((user != null ? user.username : void 0) === username) {                                                        // 60
      return true;                                                                                                     // 61
    }                                                                                                                  //
  }                                                                                                                    //
  return false;                                                                                                        // 63
};                                                                                                                     // 52
                                                                                                                       //
RocketChat.Notifications.streamRoom.permissions.write(func, false);                                                    // 1
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/addOAuthService.coffee.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                       // 1
  addOAuthService: function(name) {                                                                                    // 2
    if (!Meteor.userId()) {                                                                                            // 3
      throw new Meteor.Error('invalid-user', "[methods] addOAuthService -> Invalid user");                             // 4
    }                                                                                                                  //
    if (RocketChat.authz.hasPermission(Meteor.userId(), 'add-oauth-service') !== true) {                               // 6
      throw new Meteor.Error('not-authorized', '[methods] addOAuthService -> Not authorized');                         // 7
    }                                                                                                                  //
    name = name.toLowerCase().replace(/[^a-z0-9]/g, '');                                                               // 3
    name = s.capitalize(name);                                                                                         // 3
    RocketChat.settings.add("Accounts_OAuth_Custom_" + name, false, {                                                  // 3
      type: 'boolean',                                                                                                 // 11
      group: 'OAuth',                                                                                                  // 11
      section: "Custom OAuth: " + name,                                                                                // 11
      i18nLabel: 'Accounts_OAuth_Custom_Enable',                                                                       // 11
      persistent: true                                                                                                 // 11
    });                                                                                                                //
    RocketChat.settings.add("Accounts_OAuth_Custom_" + name + "_url", '', {                                            // 3
      type: 'string',                                                                                                  // 12
      group: 'OAuth',                                                                                                  // 12
      section: "Custom OAuth: " + name,                                                                                // 12
      i18nLabel: 'Accounts_OAuth_Custom_URL',                                                                          // 12
      persistent: true                                                                                                 // 12
    });                                                                                                                //
    RocketChat.settings.add("Accounts_OAuth_Custom_" + name + "_token_path", '/oauth/token', {                         // 3
      type: 'string',                                                                                                  // 13
      group: 'OAuth',                                                                                                  // 13
      section: "Custom OAuth: " + name,                                                                                // 13
      i18nLabel: 'Accounts_OAuth_Custom_Token_Path',                                                                   // 13
      persistent: true                                                                                                 // 13
    });                                                                                                                //
    RocketChat.settings.add("Accounts_OAuth_Custom_" + name + "_identity_path", '/me', {                               // 3
      type: 'string',                                                                                                  // 14
      group: 'OAuth',                                                                                                  // 14
      section: "Custom OAuth: " + name,                                                                                // 14
      i18nLabel: 'Accounts_OAuth_Custom_Identity_Path',                                                                // 14
      persistent: true                                                                                                 // 14
    });                                                                                                                //
    RocketChat.settings.add("Accounts_OAuth_Custom_" + name + "_authorize_path", '/oauth/authorize', {                 // 3
      type: 'string',                                                                                                  // 15
      group: 'OAuth',                                                                                                  // 15
      section: "Custom OAuth: " + name,                                                                                // 15
      i18nLabel: 'Accounts_OAuth_Custom_Authorize_Path',                                                               // 15
      persistent: true                                                                                                 // 15
    });                                                                                                                //
    RocketChat.settings.add("Accounts_OAuth_Custom_" + name + "_id", '', {                                             // 3
      type: 'string',                                                                                                  // 16
      group: 'OAuth',                                                                                                  // 16
      section: "Custom OAuth: " + name,                                                                                // 16
      i18nLabel: 'Accounts_OAuth_Custom_id',                                                                           // 16
      persistent: true                                                                                                 // 16
    });                                                                                                                //
    RocketChat.settings.add("Accounts_OAuth_Custom_" + name + "_secret", '', {                                         // 3
      type: 'string',                                                                                                  // 17
      group: 'OAuth',                                                                                                  // 17
      section: "Custom OAuth: " + name,                                                                                // 17
      i18nLabel: 'Accounts_OAuth_Custom_Secret',                                                                       // 17
      persistent: true                                                                                                 // 17
    });                                                                                                                //
    RocketChat.settings.add("Accounts_OAuth_Custom_" + name + "_login_style", 'popup', {                               // 3
      type: 'select',                                                                                                  // 18
      group: 'OAuth',                                                                                                  // 18
      section: "Custom OAuth: " + name,                                                                                // 18
      i18nLabel: 'Accounts_OAuth_Custom_Login_Style',                                                                  // 18
      persistent: true,                                                                                                // 18
      values: [                                                                                                        // 18
        {                                                                                                              //
          key: 'redirect',                                                                                             // 18
          i18nLabel: 'Redirect'                                                                                        // 18
        }, {                                                                                                           //
          key: 'popup',                                                                                                // 18
          i18nLabel: 'Popup'                                                                                           // 18
        }, {                                                                                                           //
          key: '',                                                                                                     // 18
          i18nLabel: 'Default'                                                                                         // 18
        }                                                                                                              //
      ]                                                                                                                //
    });                                                                                                                //
    RocketChat.settings.add("Accounts_OAuth_Custom_" + name + "_button_label_text", '', {                              // 3
      type: 'string',                                                                                                  // 19
      group: 'OAuth',                                                                                                  // 19
      section: "Custom OAuth: " + name,                                                                                // 19
      i18nLabel: 'Accounts_OAuth_Custom_Button_Label_Text',                                                            // 19
      persistent: true                                                                                                 // 19
    });                                                                                                                //
    RocketChat.settings.add("Accounts_OAuth_Custom_" + name + "_button_label_color", '#FFFFFF', {                      // 3
      type: 'string',                                                                                                  // 20
      group: 'OAuth',                                                                                                  // 20
      section: "Custom OAuth: " + name,                                                                                // 20
      i18nLabel: 'Accounts_OAuth_Custom_Button_Label_Color',                                                           // 20
      persistent: true                                                                                                 // 20
    });                                                                                                                //
    return RocketChat.settings.add("Accounts_OAuth_Custom_" + name + "_button_color", '#13679A', {                     //
      type: 'string',                                                                                                  // 21
      group: 'OAuth',                                                                                                  // 21
      section: "Custom OAuth: " + name,                                                                                // 21
      i18nLabel: 'Accounts_OAuth_Custom_Button_Color',                                                                 // 21
      persistent: true                                                                                                 // 21
    });                                                                                                                //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/checkRegistrationSecretURL.coffee.js                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                       // 1
  checkRegistrationSecretURL: function(hash) {                                                                         // 2
    return hash === RocketChat.settings.get('Accounts_RegistrationForm_SecretURL');                                    // 3
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/clearRequirePasswordChange.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	clearRequirePasswordChange: function () {                                                                             // 2
		if (!Meteor.userId()) {                                                                                              // 3
			throw new Meteor.Error('invalid-user', "[methods] clearRequirePasswordChange -> Invalid user");                     // 4
		}                                                                                                                    //
                                                                                                                       //
		return RocketChat.models.Users.unsetRequirePasswordChange(Meteor.userId());                                          // 7
	}                                                                                                                     //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/deleteUserOwnAccount.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	deleteUserOwnAccount: function (password) {                                                                           // 2
		if (!Meteor.userId()) {                                                                                              // 3
			throw new Meteor.Error('invalid-user', "[methods] deleteUserOwnAccount -> Invalid user");                           // 4
		}                                                                                                                    //
                                                                                                                       //
		if (!RocketChat.settings.get('Accounts_AllowDeleteOwnAccount')) {                                                    // 7
			throw new Meteor.Error('not-authorized', "[methods] deleteUserOwnAccount -> Not authorized");                       // 8
		}                                                                                                                    //
                                                                                                                       //
		var userId = Meteor.userId();                                                                                        // 11
		var user = RocketChat.models.Users.findOneById(userId);                                                              // 12
                                                                                                                       //
		result = Accounts._checkPassword(user, { digest: password, algorithm: 'sha-256' });                                  // 14
		if (result.error) {                                                                                                  // 15
			throw new Meteor.Error('invalid-password', "[methods] deleteUserOwnAccount -> Invalid password");                   // 16
		}                                                                                                                    //
                                                                                                                       //
		Meteor.defer(function () {                                                                                           // 19
			RocketChat.models.Messages.removeByUserId(userId); // Remove user messages                                          // 20
			RocketChat.models.Subscriptions.findByUserId(userId).forEach(function (subscription) {                              // 21
				var room = RocketChat.models.Rooms.findOneById(subscription.rid);                                                  // 22
				if (room) {                                                                                                        // 23
					if (room.t !== 'c' && room.usernames.length === 1) {                                                              // 24
						RocketChat.models.Rooms.removeById(subscription.rid); // Remove non-channel rooms with only 1 user (the one being deleted)
					}                                                                                                                 //
					if (room.t === 'd') {                                                                                             // 27
						RocketChat.models.Subscriptions.removeByRoomId(subscription.rid);                                                // 28
						RocketChat.models.Messages.removeByRoomId(subscription.rid);                                                     // 29
					}                                                                                                                 //
				}                                                                                                                  //
			});                                                                                                                 //
                                                                                                                       //
			RocketChat.models.Subscriptions.removeByUserId(userId); // Remove user subscriptions                                // 34
			RocketChat.models.Rooms.removeByTypeContainingUsername('d', user.username); // Remove direct rooms with the user    // 35
			RocketChat.models.Rooms.removeUsernameFromAll(user.username); // Remove user from all other rooms                   // 36
			RocketChat.models.Users.removeById(userId); // Remove user from users database                                      // 37
		});                                                                                                                  //
                                                                                                                       //
		return true;                                                                                                         // 40
	}                                                                                                                     //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/joinDefaultChannels.coffee.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                       // 1
  joinDefaultChannels: function(silenced) {                                                                            // 2
    var defaultRooms, user;                                                                                            // 3
    if (!Meteor.userId()) {                                                                                            // 3
      throw new Meteor.Error('invalid-user', "[methods] joinDefaultChannels -> Invalid user");                         // 4
    }                                                                                                                  //
    this.unblock();                                                                                                    // 3
    user = Meteor.user();                                                                                              // 3
    RocketChat.callbacks.run('beforeJoinDefaultChannels', user);                                                       // 3
    defaultRooms = RocketChat.models.Rooms.findByDefaultAndTypes(true, ['c', 'p'], {                                   // 3
      fields: {                                                                                                        // 12
        usernames: 0                                                                                                   // 12
      }                                                                                                                //
    }).fetch();                                                                                                        //
    return defaultRooms.forEach(function(room) {                                                                       //
      RocketChat.models.Rooms.addUsernameById(room._id, user.username);                                                // 17
      if (RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(room._id, user._id) == null) {                      // 19
        RocketChat.models.Subscriptions.createWithRoomAndUser(room, user, {                                            // 22
          ts: new Date(),                                                                                              // 23
          open: true,                                                                                                  // 23
          alert: true,                                                                                                 // 23
          unread: 1                                                                                                    // 23
        });                                                                                                            //
        if (!silenced) {                                                                                               // 29
          return RocketChat.models.Messages.createUserJoinWithRoomIdAndUser(room._id, user);                           //
        }                                                                                                              //
      }                                                                                                                //
    });                                                                                                                //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/removeOAuthService.coffee.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                       // 1
  removeOAuthService: function(name) {                                                                                 // 2
    if (!Meteor.userId()) {                                                                                            // 3
      throw new Meteor.Error('invalid-user', "[methods] removeOAuthService -> Invalid user");                          // 4
    }                                                                                                                  //
    if (RocketChat.authz.hasPermission(Meteor.userId(), 'add-oauth-service') !== true) {                               // 6
      throw new Meteor.Error('not-authorized', '[methods] removeOAuthService -> Not authorized');                      // 7
    }                                                                                                                  //
    name = name.toLowerCase().replace(/[^a-z0-9]/g, '');                                                               // 3
    name = s.capitalize(name);                                                                                         // 3
    RocketChat.settings.removeById("Accounts_OAuth_Custom_" + name);                                                   // 3
    RocketChat.settings.removeById("Accounts_OAuth_Custom_" + name + "_url");                                          // 3
    RocketChat.settings.removeById("Accounts_OAuth_Custom_" + name + "_token_path");                                   // 3
    RocketChat.settings.removeById("Accounts_OAuth_Custom_" + name + "_identity_path");                                // 3
    RocketChat.settings.removeById("Accounts_OAuth_Custom_" + name + "_authorize_path");                               // 3
    RocketChat.settings.removeById("Accounts_OAuth_Custom_" + name + "_id");                                           // 3
    RocketChat.settings.removeById("Accounts_OAuth_Custom_" + name + "_secret");                                       // 3
    RocketChat.settings.removeById("Accounts_OAuth_Custom_" + name + "_button_label_text");                            // 3
    RocketChat.settings.removeById("Accounts_OAuth_Custom_" + name + "_button_label_color");                           // 3
    RocketChat.settings.removeById("Accounts_OAuth_Custom_" + name + "_button_color");                                 // 3
    return RocketChat.settings.removeById("Accounts_OAuth_Custom_" + name + "_login_style");                           //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/robotMethods.coffee.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                       // 1
  'robot.modelCall': function(model, method, args) {                                                                   // 2
    var call, ref;                                                                                                     // 3
    if (!Meteor.userId()) {                                                                                            // 3
      throw new Meteor.Error('invalid-user', '[methods] robot.modelCall -> Invalid user');                             // 4
    }                                                                                                                  //
    if (!RocketChat.authz.hasRole(Meteor.userId(), 'robot')) {                                                         // 6
      throw new Meteor.Error('unauthorized', '[methods] robot.modelCall -> Unauthorized');                             // 7
    }                                                                                                                  //
    if (!_.isFunction((ref = RocketChat.models[model]) != null ? ref[method] : void 0)) {                              // 9
      throw new Meteor.Error('invalid-method', '[methods] robot.modelCall -> Invalid method');                         // 10
    }                                                                                                                  //
    call = RocketChat.models[model][method].apply(RocketChat.models[model], args);                                     // 3
    if ((call != null ? typeof call.fetch === "function" ? call.fetch() : void 0 : void 0) != null) {                  // 14
      return call.fetch();                                                                                             // 15
    } else {                                                                                                           //
      return call;                                                                                                     // 17
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/saveSetting.coffee.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                       // 1
  saveSetting: function(_id, value) {                                                                                  // 2
    var user;                                                                                                          // 3
    if (Meteor.userId() != null) {                                                                                     // 3
      user = Meteor.users.findOne(Meteor.userId());                                                                    // 4
    }                                                                                                                  //
    if (RocketChat.authz.hasPermission(Meteor.userId(), 'edit-privileged-setting') !== true) {                         // 6
      throw new Meteor.Error(503, 'Not authorized');                                                                   // 7
    }                                                                                                                  //
    RocketChat.settings.updateById(_id, value);                                                                        // 3
    return true;                                                                                                       // 11
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/sendInvitationEmail.coffee.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                       // 1
  sendInvitationEmail: function(emails) {                                                                              // 2
    var email, i, len, rfcMailPattern, validEmails;                                                                    // 3
    if (!Meteor.userId()) {                                                                                            // 3
      throw new Meteor.Error('invalid-user', "[methods] sendInvitationEmail -> Invalid user");                         // 4
    }                                                                                                                  //
    if (!RocketChat.authz.hasRole(Meteor.userId(), 'admin')) {                                                         // 6
      throw new Meteor.Error('not-authorized', '[methods] sendInvitationEmail -> Not authorized');                     // 7
    }                                                                                                                  //
    rfcMailPattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    validEmails = _.compact(_.map(emails, function(email) {                                                            // 3
      if (rfcMailPattern.test(email)) {                                                                                // 10
        return email;                                                                                                  // 10
      }                                                                                                                //
    }));                                                                                                               //
    for (i = 0, len = validEmails.length; i < len; i++) {                                                              // 12
      email = validEmails[i];                                                                                          //
      this.unblock();                                                                                                  // 13
      Email.send({                                                                                                     // 13
        to: email,                                                                                                     // 16
        from: RocketChat.settings.get('From_Email'),                                                                   // 16
        subject: RocketChat.settings.get('Invitation_Subject'),                                                        // 16
        html: RocketChat.settings.get('Invitation_HTML')                                                               // 16
      });                                                                                                              //
    }                                                                                                                  // 12
    return validEmails;                                                                                                // 22
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/sendMessage.coffee.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
  sendMessage: function(message, options) {                                                                            // 2
    var ref, ref1, room, user;                                                                                         // 3
    if (((ref = message.msg) != null ? ref.length : void 0) > RocketChat.settings.get('Message_MaxAllowedSize')) {     // 3
      throw new Meteor.Error(400, '[methods] sendMessage -> Message size exceed Message_MaxAllowedSize');              // 4
    }                                                                                                                  //
    if (!Meteor.userId()) {                                                                                            // 6
      throw new Meteor.Error('invalid-user', "[methods] sendMessage -> Invalid user");                                 // 7
    }                                                                                                                  //
    user = RocketChat.models.Users.findOneById(Meteor.userId(), {                                                      // 3
      fields: {                                                                                                        // 9
        username: 1                                                                                                    // 9
      }                                                                                                                //
    });                                                                                                                //
    room = Meteor.call('canAccessRoom', message.rid, user._id);                                                        // 3
    if (!room) {                                                                                                       // 13
      return false;                                                                                                    // 14
    }                                                                                                                  //
    if (ref1 = user.username, indexOf.call(room.muted || [], ref1) >= 0) {                                             // 16
      RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {                                                // 17
        _id: Random.id(),                                                                                              // 17
        rid: room._id,                                                                                                 // 17
        ts: new Date,                                                                                                  // 17
        msg: TAPi18n.__('You_have_been_muted', {}, user.language)                                                      // 17
      });                                                                                                              //
      return false;                                                                                                    // 23
    }                                                                                                                  //
    return RocketChat.sendMessage(user, message, room, options);                                                       //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
DDPRateLimiter.addRule({                                                                                               // 1
  type: 'method',                                                                                                      // 29
  name: 'sendMessage',                                                                                                 // 29
  userId: function(userId) {                                                                                           // 29
    var ref;                                                                                                           // 32
    return ((ref = RocketChat.models.Users.findOneById(userId)) != null ? ref.username : void 0) !== RocketChat.settings.get('RocketBot_Name');
  }                                                                                                                    //
}, 5, 1000);                                                                                                           //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/sendSMTPTestEmail.coffee.js                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                       // 1
  sendSMTPTestEmail: function() {                                                                                      // 2
    var ref, ref1, user;                                                                                               // 3
    if (!Meteor.userId()) {                                                                                            // 3
      throw new Meteor.Error('invalid-user', "[methods] sendSMTPTestEmail -> Invalid user");                           // 4
    }                                                                                                                  //
    user = Meteor.user();                                                                                              // 3
    if (!((ref = user.emails) != null ? (ref1 = ref[0]) != null ? ref1.address : void 0 : void 0)) {                   // 7
      throw new Meteor.Error('invalid-email', "[methods] sendSMTPTestEmail -> Invalid e-mail");                        // 8
    }                                                                                                                  //
    this.unblock();                                                                                                    // 3
    Email.send({                                                                                                       // 3
      to: user.emails[0].address,                                                                                      // 13
      from: RocketChat.settings.get('From_Email'),                                                                     // 13
      subject: "SMTP Test E-mail",                                                                                     // 13
      html: "You have successfully sent an e-mail"                                                                     // 13
    });                                                                                                                //
    console.log('Sending email to ' + user.emails[0].address);                                                         // 3
    return {                                                                                                           // 20
      message: "Your_mail_was_sent_to_s",                                                                              // 20
      params: [user.emails[0].address]                                                                                 // 20
    };                                                                                                                 //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
DDPRateLimiter.addRule({                                                                                               // 1
  type: 'method',                                                                                                      // 27
  name: 'sendSMTPTestEmail',                                                                                           // 27
  userId: function(userId) {                                                                                           // 27
    return true;                                                                                                       // 30
  }                                                                                                                    //
}, 1, 1000);                                                                                                           //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/setAdminStatus.coffee.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                       // 1
  setAdminStatus: function(userId, admin) {                                                                            // 2
    if (!Meteor.userId()) {                                                                                            // 3
      throw new Meteor.Error('invalid-user', "[methods] setAdminStatus -> Invalid user");                              // 4
    }                                                                                                                  //
    if (RocketChat.authz.hasPermission(Meteor.userId(), 'assign-admin-role') !== true) {                               // 6
      throw new Meteor.Error('not-authorized', '[methods] setAdminStatus -> Not authorized');                          // 7
    }                                                                                                                  //
    if (admin) {                                                                                                       // 9
      RocketChat.authz.addUserRoles(userId, 'admin');                                                                  // 10
    } else {                                                                                                           //
      RocketChat.authz.removeUserFromRoles(userId, 'admin');                                                           // 12
    }                                                                                                                  //
    return true;                                                                                                       // 14
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/setRealName.coffee.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                       // 1
  setRealName: function(name) {                                                                                        // 2
    var user;                                                                                                          // 3
    if (!Meteor.userId()) {                                                                                            // 3
      throw new Meteor.Error('invalid-user', "[methods] setRealName -> Invalid user");                                 // 4
    }                                                                                                                  //
    user = Meteor.user();                                                                                              // 3
    if (user.name === name) {                                                                                          // 8
      return name;                                                                                                     // 9
    }                                                                                                                  //
    if (_.trim(name)) {                                                                                                // 11
      name = _.trim(name);                                                                                             // 12
    }                                                                                                                  //
    if (!RocketChat.models.Users.setName(Meteor.userId(), name)) {                                                     // 14
      throw new Meteor.Error('could-not-change-name', "Could not change name");                                        // 15
    }                                                                                                                  //
    return name;                                                                                                       // 17
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/setUsername.coffee.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                       // 1
  setUsername: function(username) {                                                                                    // 2
    var nameValidation, user;                                                                                          // 3
    if (!Meteor.userId()) {                                                                                            // 3
      throw new Meteor.Error('invalid-user', "[methods] setUsername -> Invalid user");                                 // 4
    }                                                                                                                  //
    user = Meteor.user();                                                                                              // 3
    if ((user.username != null) && !RocketChat.settings.get("Accounts_AllowUsernameChange")) {                         // 8
      throw new Meteor.Error(403, "[methods] setUsername -> Username change not allowed");                             // 9
    }                                                                                                                  //
    if (user.username === username) {                                                                                  // 11
      return username;                                                                                                 // 12
    }                                                                                                                  //
    try {                                                                                                              // 14
      nameValidation = new RegExp('^' + RocketChat.settings.get('UTF8_Names_Validation') + '$');                       // 15
    } catch (_error) {                                                                                                 //
      nameValidation = new RegExp('^[0-9a-zA-Z-_.]+$');                                                                // 17
    }                                                                                                                  //
    if (!nameValidation.test(username)) {                                                                              // 19
      throw new Meteor.Error('username-invalid', username + " is not a valid username, use only letters, numbers, dots and dashes");
    }                                                                                                                  //
    if (user.username !== void 0) {                                                                                    // 22
      if (!username.toLowerCase() === user.username.toLowerCase()) {                                                   // 23
        if (!RocketChat.checkUsernameAvailability(username)) {                                                         // 24
          throw new Meteor.Error('username-unavailable', username + " is already in use :(");                          // 25
        }                                                                                                              //
      }                                                                                                                //
    } else {                                                                                                           //
      if (!RocketChat.checkUsernameAvailability(username)) {                                                           // 27
        throw new Meteor.Error('username-unavailable', username + " is already in use :(");                            // 28
      }                                                                                                                //
    }                                                                                                                  //
    if (!RocketChat.setUsername(user._id, username)) {                                                                 // 30
      throw new Meteor.Error('could-not-change-username', "Could not change username");                                // 31
    }                                                                                                                  //
    return username;                                                                                                   // 33
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
RocketChat.RateLimiter.limitMethod('setUsername', 1, 1000, {                                                           // 1
  userId: function(userId) {                                                                                           // 36
    return true;                                                                                                       // 36
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/insertOrUpdateUser.coffee.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                       // 1
  insertOrUpdateUser: function(userData) {                                                                             // 2
    var _id, canAddUser, canEditUser, canEditUserPassword, createUser, nameValidation, updateUser, user;               // 3
    if (!Meteor.userId()) {                                                                                            // 3
      throw new Meteor.Error('invalid-user', "[methods] updateUser -> Invalid user");                                  // 4
    }                                                                                                                  //
    user = Meteor.user();                                                                                              // 3
    canEditUser = RocketChat.authz.hasPermission(user._id, 'edit-other-user-info');                                    // 3
    canAddUser = RocketChat.authz.hasPermission(user._id, 'add-user');                                                 // 3
    if (userData._id && user._id !== userData._id && canEditUser !== true) {                                           // 11
      throw new Meteor.Error('not-authorized', '[methods] updateUser -> Not authorized');                              // 12
    }                                                                                                                  //
    if (!userData._id && canAddUser !== true) {                                                                        // 14
      throw new Meteor.Error('not-authorized', '[methods] updateUser -> Not authorized');                              // 15
    }                                                                                                                  //
    if (!s.trim(userData.name)) {                                                                                      // 17
      throw new Meteor.Error('name-is-required', 'Name field is required');                                            // 18
    }                                                                                                                  //
    if (!s.trim(userData.username)) {                                                                                  // 20
      throw new Meteor.Error('user-name-is-required', 'Username field is required');                                   // 21
    }                                                                                                                  //
    try {                                                                                                              // 23
      nameValidation = new RegExp('^' + RocketChat.settings.get('UTF8_Names_Validation') + '$');                       // 24
    } catch (_error) {                                                                                                 //
      nameValidation = new RegExp('^[0-9a-zA-Z-_.]+$');                                                                // 26
    }                                                                                                                  //
    if (!nameValidation.test(userData.username)) {                                                                     // 28
      throw new Meteor.Error('username-invalid', username + " is not a valid username");                               // 29
    }                                                                                                                  //
    if (!userData._id && !userData.password) {                                                                         // 31
      throw new Meteor.Error('password-is-required', 'Password is required when adding a user');                       // 32
    }                                                                                                                  //
    if (!userData._id) {                                                                                               // 34
      if (!RocketChat.checkUsernameAvailability(userData.username)) {                                                  // 35
        throw new Meteor.Error('username-unavailable', userData.username + " is already in use :(");                   // 36
      }                                                                                                                //
      if (userData.email && !RocketChat.checkEmailAvailability(userData.email)) {                                      // 38
        throw new Meteor.Error('email-unavailable', userData.email + " is already in use :(");                         // 39
      }                                                                                                                //
      createUser = {                                                                                                   // 35
        username: userData.username,                                                                                   // 42
        password: userData.password                                                                                    // 42
      };                                                                                                               //
      if (userData.email) {                                                                                            // 43
        createUser.email = userData.email;                                                                             // 44
      }                                                                                                                //
      _id = Accounts.createUser(createUser);                                                                           // 35
      updateUser = {                                                                                                   // 35
        $set: {                                                                                                        // 49
          name: userData.name                                                                                          // 50
        }                                                                                                              //
      };                                                                                                               //
      if (userData.requirePasswordChange) {                                                                            // 52
        updateUser.$set.requirePasswordChange = userData.requirePasswordChange;                                        // 53
      }                                                                                                                //
      Meteor.users.update({                                                                                            // 35
        _id: _id                                                                                                       // 55
      }, updateUser);                                                                                                  //
      return _id;                                                                                                      // 57
    } else {                                                                                                           //
      Meteor.users.update({                                                                                            // 60
        _id: userData._id                                                                                              // 60
      }, {                                                                                                             //
        $set: {                                                                                                        // 60
          name: userData.name,                                                                                         // 60
          requirePasswordChange: userData.requirePasswordChange                                                        // 60
        }                                                                                                              //
      });                                                                                                              //
      RocketChat.setUsername(userData._id, userData.username);                                                         // 60
      RocketChat.setEmail(userData._id, userData.email);                                                               // 60
      canEditUserPassword = RocketChat.authz.hasPermission(user._id, 'edit-other-user-password');                      // 60
      if (canEditUserPassword && userData.password.trim()) {                                                           // 65
        Accounts.setPassword(userData._id, userData.password.trim());                                                  // 66
      }                                                                                                                //
      return true;                                                                                                     // 68
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/setEmail.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	setEmail: function (email) {                                                                                          // 2
		if (!Meteor.userId()) {                                                                                              // 3
			throw new Meteor.Error('invalid-user', "[methods] setEmail -> Invalid user");                                       // 4
		}                                                                                                                    //
                                                                                                                       //
		user = Meteor.user();                                                                                                // 7
                                                                                                                       //
		if (!RocketChat.settings.get("Accounts_AllowEmailChange")) {                                                         // 9
			throw new Meteor.Error(403, "[methods] setEmail -> E-mail change not allowed");                                     // 10
		}                                                                                                                    //
                                                                                                                       //
		if (user.emails && user.emails[0] && user.emails[0].address === email) {                                             // 13
			return email;                                                                                                       // 14
		}                                                                                                                    //
                                                                                                                       //
		emailValidation = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		if (!emailValidation.test(email)) {                                                                                  // 18
			throw new Meteor.Error('email-invalid', email + " is not a valid e-mail");                                          // 19
		}                                                                                                                    //
                                                                                                                       //
		if (!RocketChat.checkEmailAvailability(email)) {                                                                     // 22
			throw new Meteor.Error('email-unavailable', email + " is already in use :(");                                       // 23
		}                                                                                                                    //
                                                                                                                       //
		if (!RocketChat.setEmail(user._id, email)) {                                                                         // 26
			throw new Meteor.Error('could-not-change-email', "Could not change email");                                         // 27
		}                                                                                                                    //
                                                                                                                       //
		return email;                                                                                                        // 30
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
RocketChat.RateLimiter.limitMethod('setEmail', 1, 1000, {                                                              // 34
	userId: function (userId) {                                                                                           // 35
		return true;                                                                                                         // 35
	}                                                                                                                     //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/methods/restartServer.coffee.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                       // 1
  restart_server: function() {                                                                                         // 2
    if (!Meteor.userId()) {                                                                                            // 3
      throw new Meteor.Error('invalid-user', "[methods] restart_server -> Invalid user");                              // 4
    }                                                                                                                  //
    if (RocketChat.authz.hasRole(Meteor.userId(), 'admin') !== true) {                                                 // 6
      throw new Meteor.Error('not-authorized', '[methods] restart_server -> Not authorized');                          // 7
    }                                                                                                                  //
    Meteor.setTimeout(function() {                                                                                     // 3
      return process.exit(1);                                                                                          //
    }, 2000);                                                                                                          //
    return {                                                                                                           // 13
      message: "The_server_will_restart_in_s_seconds",                                                                 // 14
      params: [2]                                                                                                      // 14
    };                                                                                                                 //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/startup/settingsOnLoadCdnPrefix.coffee.js                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.settings.onload('CDN_PREFIX', function(key, value, initialLoad) {                                           // 1
  if (_.isString(value)) {                                                                                             // 2
    return typeof WebAppInternals !== "undefined" && WebAppInternals !== null ? WebAppInternals.setBundledJsCssPrefix(value) : void 0;
  }                                                                                                                    //
});                                                                                                                    // 1
                                                                                                                       //
Meteor.startup(function() {                                                                                            // 1
  var value;                                                                                                           // 6
  value = RocketChat.settings.get('CDN_PREFIX');                                                                       // 6
  if (_.isString(value)) {                                                                                             // 7
    return typeof WebAppInternals !== "undefined" && WebAppInternals !== null ? WebAppInternals.setBundledJsCssPrefix(value) : void 0;
  }                                                                                                                    //
});                                                                                                                    // 5
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/startup/settingsOnLoadSMTP.coffee.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var buildMailURL;                                                                                                      // 1
                                                                                                                       //
buildMailURL = _.debounce(function() {                                                                                 // 1
  console.log('Updating process.env.MAIL_URL');                                                                        // 2
  if (RocketChat.settings.get('SMTP_Host')) {                                                                          // 3
    process.env.MAIL_URL = "smtp://";                                                                                  // 4
    if (RocketChat.settings.get('SMTP_Username') && RocketChat.settings.get('SMTP_Password')) {                        // 5
      process.env.MAIL_URL += encodeURIComponent(RocketChat.settings.get('SMTP_Username')) + ':' + encodeURIComponent(RocketChat.settings.get('SMTP_Password')) + '@';
    }                                                                                                                  //
    process.env.MAIL_URL += encodeURIComponent(RocketChat.settings.get('SMTP_Host'));                                  // 4
    if (RocketChat.settings.get('SMTP_Port')) {                                                                        // 8
      return process.env.MAIL_URL += ':' + parseInt(RocketChat.settings.get('SMTP_Port'));                             //
    }                                                                                                                  //
  }                                                                                                                    //
}, 500);                                                                                                               // 1
                                                                                                                       //
RocketChat.settings.onload('SMTP_Host', function(key, value, initialLoad) {                                            // 1
  if (_.isString(value)) {                                                                                             // 13
    return buildMailURL();                                                                                             //
  }                                                                                                                    //
});                                                                                                                    // 12
                                                                                                                       //
RocketChat.settings.onload('SMTP_Port', function(key, value, initialLoad) {                                            // 1
  return buildMailURL();                                                                                               //
});                                                                                                                    // 16
                                                                                                                       //
RocketChat.settings.onload('SMTP_Username', function(key, value, initialLoad) {                                        // 1
  if (_.isString(value)) {                                                                                             // 20
    return buildMailURL();                                                                                             //
  }                                                                                                                    //
});                                                                                                                    // 19
                                                                                                                       //
RocketChat.settings.onload('SMTP_Password', function(key, value, initialLoad) {                                        // 1
  if (_.isString(value)) {                                                                                             // 24
    return buildMailURL();                                                                                             //
  }                                                                                                                    //
});                                                                                                                    // 23
                                                                                                                       //
Meteor.startup(function() {                                                                                            // 1
  return buildMailURL();                                                                                               //
});                                                                                                                    // 27
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/startup/oAuthServicesUpdate.coffee.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var OAuthServicesRemove, OAuthServicesUpdate, logger, timer;                                                           // 1
                                                                                                                       //
logger = new Logger('rocketchat:lib', {                                                                                // 1
  methods: {                                                                                                           // 2
    oauth_updated: {                                                                                                   // 3
      type: 'info'                                                                                                     // 4
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
timer = void 0;                                                                                                        // 1
                                                                                                                       //
OAuthServicesUpdate = function() {                                                                                     // 1
  if (timer != null) {                                                                                                 // 8
    Meteor.clearTimeout(timer);                                                                                        // 8
  }                                                                                                                    //
  return timer = Meteor.setTimeout(function() {                                                                        //
    var data, i, len, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, results, service, serviceName, services;
    services = RocketChat.models.Settings.find({                                                                       // 11
      _id: /^(Accounts_OAuth_|Accounts_OAuth_Custom_)[a-z0-9_-]+$/i                                                    // 11
    }).fetch();                                                                                                        //
    results = [];                                                                                                      // 12
    for (i = 0, len = services.length; i < len; i++) {                                                                 //
      service = services[i];                                                                                           //
      logger.oauth_updated(service._id);                                                                               // 13
      serviceName = service._id.replace('Accounts_OAuth_', '');                                                        // 13
      if (serviceName === 'Meteor') {                                                                                  // 16
        serviceName = 'meteor-developer';                                                                              // 17
      }                                                                                                                //
      if (/Accounts_OAuth_Custom_/.test(service._id)) {                                                                // 19
        serviceName = service._id.replace('Accounts_OAuth_Custom_', '');                                               // 20
      }                                                                                                                //
      if (service.value === true) {                                                                                    // 22
        data = {                                                                                                       // 23
          clientId: (ref = RocketChat.models.Settings.findOneById(service._id + "_id")) != null ? ref.value : void 0,  // 24
          secret: (ref1 = RocketChat.models.Settings.findOneById(service._id + "_secret")) != null ? ref1.value : void 0
        };                                                                                                             //
        if (/Accounts_OAuth_Custom_/.test(service._id)) {                                                              // 28
          data.custom = true;                                                                                          // 29
          data.serverURL = (ref2 = RocketChat.models.Settings.findOneById(service._id + "_url")) != null ? ref2.value : void 0;
          data.tokenPath = (ref3 = RocketChat.models.Settings.findOneById(service._id + "_token_path")) != null ? ref3.value : void 0;
          data.identityPath = (ref4 = RocketChat.models.Settings.findOneById(service._id + "_identity_path")) != null ? ref4.value : void 0;
          data.authorizePath = (ref5 = RocketChat.models.Settings.findOneById(service._id + "_authorize_path")) != null ? ref5.value : void 0;
          data.buttonLabelText = (ref6 = RocketChat.models.Settings.findOneById(service._id + "_button_label_text")) != null ? ref6.value : void 0;
          data.buttonLabelColor = (ref7 = RocketChat.models.Settings.findOneById(service._id + "_button_label_color")) != null ? ref7.value : void 0;
          data.loginStyle = (ref8 = RocketChat.models.Settings.findOneById(service._id + "_login_style")) != null ? ref8.value : void 0;
          data.buttonColor = (ref9 = RocketChat.models.Settings.findOneById(service._id + "_button_color")) != null ? ref9.value : void 0;
          new CustomOAuth(serviceName.toLowerCase(), {                                                                 // 29
            serverURL: data.serverURL,                                                                                 // 39
            tokenPath: data.tokenPath,                                                                                 // 39
            identityPath: data.identityPath,                                                                           // 39
            authorizePath: data.authorizePath,                                                                         // 39
            loginStyle: data.loginStyle                                                                                // 39
          });                                                                                                          //
        }                                                                                                              //
        if (serviceName === 'Facebook') {                                                                              // 45
          data.appId = data.clientId;                                                                                  // 46
          delete data.clientId;                                                                                        // 46
        }                                                                                                              //
        if (serviceName === 'Twitter') {                                                                               // 49
          data.consumerKey = data.clientId;                                                                            // 50
          delete data.clientId;                                                                                        // 50
        }                                                                                                              //
        results.push(ServiceConfiguration.configurations.upsert({                                                      // 23
          service: serviceName.toLowerCase()                                                                           // 52
        }, {                                                                                                           //
          $set: data                                                                                                   // 52
        }));                                                                                                           //
      } else {                                                                                                         //
        results.push(ServiceConfiguration.configurations.remove({                                                      //
          service: serviceName.toLowerCase()                                                                           // 54
        }));                                                                                                           //
      }                                                                                                                //
    }                                                                                                                  // 12
    return results;                                                                                                    //
  }, 2000);                                                                                                            //
};                                                                                                                     // 7
                                                                                                                       //
OAuthServicesRemove = function(_id) {                                                                                  // 1
  var serviceName;                                                                                                     // 59
  serviceName = _id.replace('Accounts_OAuth_Custom_', '');                                                             // 59
  return ServiceConfiguration.configurations.remove({                                                                  //
    service: serviceName.toLowerCase()                                                                                 // 60
  });                                                                                                                  //
};                                                                                                                     // 58
                                                                                                                       //
RocketChat.models.Settings.find().observe({                                                                            // 1
  added: function(record) {                                                                                            // 64
    if (/^Accounts_OAuth_.+/.test(record._id)) {                                                                       // 65
      return OAuthServicesUpdate();                                                                                    //
    }                                                                                                                  //
  },                                                                                                                   //
  changed: function(record) {                                                                                          // 64
    if (/^Accounts_OAuth_.+/.test(record._id)) {                                                                       // 69
      return OAuthServicesUpdate();                                                                                    //
    }                                                                                                                  //
  },                                                                                                                   //
  removed: function(record) {                                                                                          // 64
    if (/^Accounts_OAuth_Custom.+/.test(record._id)) {                                                                 // 73
      return OAuthServicesRemove(record._id);                                                                          //
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/server/startup/settings.coffee.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (!RocketChat.models.Settings.findOneById('uniqueID')) {                                                             // 2
  RocketChat.models.Settings.createWithIdAndValue('uniqueID', process.env.DEPLOYMENT_ID || Random.id());               // 3
}                                                                                                                      //
                                                                                                                       //
RocketChat.settings.addGroup('Accounts', function() {                                                                  // 2
  this.add('Accounts_AllowDeleteOwnAccount', false, {                                                                  // 6
    type: 'boolean',                                                                                                   // 6
    "public": true,                                                                                                    // 6
    enableQuery: {                                                                                                     // 6
      _id: 'Accounts_AllowUserProfileChange',                                                                          // 6
      value: true                                                                                                      // 6
    }                                                                                                                  //
  });                                                                                                                  //
  this.add('Accounts_AllowUserProfileChange', true, {                                                                  // 6
    type: 'boolean',                                                                                                   // 7
    "public": true                                                                                                     // 7
  });                                                                                                                  //
  this.add('Accounts_AllowUserAvatarChange', true, {                                                                   // 6
    type: 'boolean',                                                                                                   // 8
    "public": true                                                                                                     // 8
  });                                                                                                                  //
  this.add('Accounts_AllowUsernameChange', true, {                                                                     // 6
    type: 'boolean',                                                                                                   // 9
    "public": true                                                                                                     // 9
  });                                                                                                                  //
  this.add('Accounts_AllowEmailChange', true, {                                                                        // 6
    type: 'boolean',                                                                                                   // 10
    "public": true                                                                                                     // 10
  });                                                                                                                  //
  this.add('Accounts_AllowPasswordChange', true, {                                                                     // 6
    type: 'boolean',                                                                                                   // 11
    "public": true                                                                                                     // 11
  });                                                                                                                  //
  this.add('Accounts_RequireNameForSignUp', true, {                                                                    // 6
    type: 'boolean',                                                                                                   // 12
    "public": true                                                                                                     // 12
  });                                                                                                                  //
  this.add('Accounts_LoginExpiration', 90, {                                                                           // 6
    type: 'int',                                                                                                       // 13
    "public": true                                                                                                     // 13
  });                                                                                                                  //
  this.add('Accounts_ShowFormLogin', true, {                                                                           // 6
    type: 'boolean',                                                                                                   // 14
    "public": true                                                                                                     // 14
  });                                                                                                                  //
  this.add('Accounts_EmailOrUsernamePlaceholder', '', {                                                                // 6
    type: 'string',                                                                                                    // 15
    "public": true,                                                                                                    // 15
    i18nLabel: 'Placeholder_for_email_or_username_login_field'                                                         // 15
  });                                                                                                                  //
  this.add('Accounts_PasswordPlaceholder', '', {                                                                       // 6
    type: 'string',                                                                                                    // 16
    "public": true,                                                                                                    // 16
    i18nLabel: 'Placeholder_for_password_login_field'                                                                  // 16
  });                                                                                                                  //
  this.section('Registration', function() {                                                                            // 6
    this.add('Accounts_EmailVerification', false, {                                                                    // 19
      type: 'boolean',                                                                                                 // 19
      "public": true,                                                                                                  // 19
      enableQuery: {                                                                                                   // 19
        _id: 'SMTP_Host',                                                                                              // 19
        value: {                                                                                                       // 19
          $exists: 1,                                                                                                  // 19
          $ne: ""                                                                                                      // 19
        }                                                                                                              //
      }                                                                                                                //
    });                                                                                                                //
    this.add('Accounts_ManuallyApproveNewUsers', false, {                                                              // 19
      type: 'boolean'                                                                                                  // 20
    });                                                                                                                //
    this.add('Accounts_AllowedDomainsList', '', {                                                                      // 19
      type: 'string',                                                                                                  // 21
      "public": true                                                                                                   // 21
    });                                                                                                                //
    this.add('Accounts_RegistrationForm', 'Public', {                                                                  // 19
      type: 'select',                                                                                                  // 22
      "public": true,                                                                                                  // 22
      values: [                                                                                                        // 22
        {                                                                                                              //
          key: 'Public',                                                                                               // 22
          i18nLabel: 'Accounts_RegistrationForm_Public'                                                                // 22
        }, {                                                                                                           //
          key: 'Disabled',                                                                                             // 22
          i18nLabel: 'Accounts_RegistrationForm_Disabled'                                                              // 22
        }, {                                                                                                           //
          key: 'Secret URL',                                                                                           // 22
          i18nLabel: 'Accounts_RegistrationForm_Secret_URL'                                                            // 22
        }                                                                                                              //
      ]                                                                                                                //
    });                                                                                                                //
    this.add('Accounts_RegistrationForm_SecretURL', Random.id(), {                                                     // 19
      type: 'string'                                                                                                   // 23
    });                                                                                                                //
    this.add('Accounts_RegistrationForm_LinkReplacementText', 'New user registration is currently disabled', {         // 19
      type: 'string',                                                                                                  // 24
      "public": true                                                                                                   // 24
    });                                                                                                                //
    this.add('Accounts_Registration_AuthenticationServices_Enabled', true, {                                           // 19
      type: 'boolean',                                                                                                 // 25
      "public": true                                                                                                   // 25
    });                                                                                                                //
    return this.add('Accounts_PasswordReset', true, {                                                                  //
      type: 'boolean',                                                                                                 // 26
      "public": true                                                                                                   // 26
    });                                                                                                                //
  });                                                                                                                  //
  return this.section('Avatar', function() {                                                                           //
    this.add('Accounts_AvatarResize', true, {                                                                          // 29
      type: 'boolean'                                                                                                  // 29
    });                                                                                                                //
    this.add('Accounts_AvatarSize', 200, {                                                                             // 29
      type: 'int',                                                                                                     // 30
      enableQuery: {                                                                                                   // 30
        _id: 'Accounts_AvatarResize',                                                                                  // 30
        value: true                                                                                                    // 30
      }                                                                                                                //
    });                                                                                                                //
    this.add('Accounts_AvatarStoreType', 'GridFS', {                                                                   // 29
      type: 'select',                                                                                                  // 31
      values: [                                                                                                        // 31
        {                                                                                                              //
          key: 'GridFS',                                                                                               // 31
          i18nLabel: 'GridFS'                                                                                          // 31
        }, {                                                                                                           //
          key: 'FileSystem',                                                                                           // 31
          i18nLabel: 'FileSystem'                                                                                      // 31
        }                                                                                                              //
      ]                                                                                                                //
    });                                                                                                                //
    return this.add('Accounts_AvatarStorePath', '', {                                                                  //
      type: 'string',                                                                                                  // 32
      enableQuery: {                                                                                                   // 32
        _id: 'Accounts_AvatarStoreType',                                                                               // 32
        value: 'FileSystem'                                                                                            // 32
      }                                                                                                                //
    });                                                                                                                //
  });                                                                                                                  //
});                                                                                                                    // 5
                                                                                                                       //
RocketChat.settings.addGroup('OAuth', function() {                                                                     // 2
  this.section('Facebook', function() {                                                                                // 36
    var enableQuery;                                                                                                   // 37
    enableQuery = {                                                                                                    // 37
      _id: 'Accounts_OAuth_Facebook',                                                                                  // 37
      value: true                                                                                                      // 37
    };                                                                                                                 //
    this.add('Accounts_OAuth_Facebook', false, {                                                                       // 37
      type: 'boolean',                                                                                                 // 38
      "public": true                                                                                                   // 38
    });                                                                                                                //
    this.add('Accounts_OAuth_Facebook_id', '', {                                                                       // 37
      type: 'string',                                                                                                  // 39
      enableQuery: enableQuery                                                                                         // 39
    });                                                                                                                //
    this.add('Accounts_OAuth_Facebook_secret', '', {                                                                   // 37
      type: 'string',                                                                                                  // 40
      enableQuery: enableQuery                                                                                         // 40
    });                                                                                                                //
    return this.add('Accounts_OAuth_Facebook_callback_url', '_oauth/facebook', {                                       //
      type: 'relativeUrl',                                                                                             // 41
      readonly: true,                                                                                                  // 41
      force: true,                                                                                                     // 41
      enableQuery: enableQuery                                                                                         // 41
    });                                                                                                                //
  });                                                                                                                  //
  this.section('Google', function() {                                                                                  // 36
    var enableQuery;                                                                                                   // 44
    enableQuery = {                                                                                                    // 44
      _id: 'Accounts_OAuth_Google',                                                                                    // 44
      value: true                                                                                                      // 44
    };                                                                                                                 //
    this.add('Accounts_OAuth_Google', false, {                                                                         // 44
      type: 'boolean',                                                                                                 // 45
      "public": true                                                                                                   // 45
    });                                                                                                                //
    this.add('Accounts_OAuth_Google_id', '', {                                                                         // 44
      type: 'string',                                                                                                  // 46
      enableQuery: enableQuery                                                                                         // 46
    });                                                                                                                //
    this.add('Accounts_OAuth_Google_secret', '', {                                                                     // 44
      type: 'string',                                                                                                  // 47
      enableQuery: enableQuery                                                                                         // 47
    });                                                                                                                //
    return this.add('Accounts_OAuth_Google_callback_url', '_oauth/google', {                                           //
      type: 'relativeUrl',                                                                                             // 48
      readonly: true,                                                                                                  // 48
      force: true,                                                                                                     // 48
      enableQuery: enableQuery                                                                                         // 48
    });                                                                                                                //
  });                                                                                                                  //
  this.section('GitHub', function() {                                                                                  // 36
    var enableQuery;                                                                                                   // 51
    enableQuery = {                                                                                                    // 51
      _id: 'Accounts_OAuth_Github',                                                                                    // 51
      value: true                                                                                                      // 51
    };                                                                                                                 //
    this.add('Accounts_OAuth_Github', false, {                                                                         // 51
      type: 'boolean',                                                                                                 // 52
      "public": true                                                                                                   // 52
    });                                                                                                                //
    this.add('Accounts_OAuth_Github_id', '', {                                                                         // 51
      type: 'string',                                                                                                  // 53
      enableQuery: enableQuery                                                                                         // 53
    });                                                                                                                //
    this.add('Accounts_OAuth_Github_secret', '', {                                                                     // 51
      type: 'string',                                                                                                  // 54
      enableQuery: enableQuery                                                                                         // 54
    });                                                                                                                //
    return this.add('Accounts_OAuth_Github_callback_url', '_oauth/github', {                                           //
      type: 'relativeUrl',                                                                                             // 55
      readonly: true,                                                                                                  // 55
      force: true,                                                                                                     // 55
      enableQuery: enableQuery                                                                                         // 55
    });                                                                                                                //
  });                                                                                                                  //
  this.section('Linkedin', function() {                                                                                // 36
    var enableQuery;                                                                                                   // 58
    enableQuery = {                                                                                                    // 58
      _id: 'Accounts_OAuth_Linkedin',                                                                                  // 58
      value: true                                                                                                      // 58
    };                                                                                                                 //
    this.add('Accounts_OAuth_Linkedin', false, {                                                                       // 58
      type: 'boolean',                                                                                                 // 59
      "public": true                                                                                                   // 59
    });                                                                                                                //
    this.add('Accounts_OAuth_Linkedin_id', '', {                                                                       // 58
      type: 'string',                                                                                                  // 60
      enableQuery: enableQuery                                                                                         // 60
    });                                                                                                                //
    this.add('Accounts_OAuth_Linkedin_secret', '', {                                                                   // 58
      type: 'string',                                                                                                  // 61
      enableQuery: enableQuery                                                                                         // 61
    });                                                                                                                //
    return this.add('Accounts_OAuth_Linkedin_callback_url', '_oauth/linkedin', {                                       //
      type: 'relativeUrl',                                                                                             // 62
      readonly: true,                                                                                                  // 62
      force: true,                                                                                                     // 62
      enableQuery: enableQuery                                                                                         // 62
    });                                                                                                                //
  });                                                                                                                  //
  this.section('Meteor', function() {                                                                                  // 36
    var enableQuery;                                                                                                   // 65
    enableQuery = {                                                                                                    // 65
      _id: 'Accounts_OAuth_Meteor',                                                                                    // 65
      value: true                                                                                                      // 65
    };                                                                                                                 //
    this.add('Accounts_OAuth_Meteor', false, {                                                                         // 65
      type: 'boolean',                                                                                                 // 66
      "public": true                                                                                                   // 66
    });                                                                                                                //
    this.add('Accounts_OAuth_Meteor_id', '', {                                                                         // 65
      type: 'string',                                                                                                  // 67
      enableQuery: enableQuery                                                                                         // 67
    });                                                                                                                //
    this.add('Accounts_OAuth_Meteor_secret', '', {                                                                     // 65
      type: 'string',                                                                                                  // 68
      enableQuery: enableQuery                                                                                         // 68
    });                                                                                                                //
    return this.add('Accounts_OAuth_Meteor_callback_url', '_oauth/meteor', {                                           //
      type: 'relativeUrl',                                                                                             // 69
      readonly: true,                                                                                                  // 69
      force: true,                                                                                                     // 69
      enableQuery: enableQuery                                                                                         // 69
    });                                                                                                                //
  });                                                                                                                  //
  return this.section('Twitter', function() {                                                                          //
    var enableQuery;                                                                                                   // 72
    enableQuery = {                                                                                                    // 72
      _id: 'Accounts_OAuth_Twitter',                                                                                   // 72
      value: true                                                                                                      // 72
    };                                                                                                                 //
    this.add('Accounts_OAuth_Twitter', false, {                                                                        // 72
      type: 'boolean',                                                                                                 // 73
      "public": true                                                                                                   // 73
    });                                                                                                                //
    this.add('Accounts_OAuth_Twitter_id', '', {                                                                        // 72
      type: 'string',                                                                                                  // 74
      enableQuery: enableQuery                                                                                         // 74
    });                                                                                                                //
    this.add('Accounts_OAuth_Twitter_secret', '', {                                                                    // 72
      type: 'string',                                                                                                  // 75
      enableQuery: enableQuery                                                                                         // 75
    });                                                                                                                //
    return this.add('Accounts_OAuth_Twitter_callback_url', '_oauth/twitter', {                                         //
      type: 'relativeUrl',                                                                                             // 76
      readonly: true,                                                                                                  // 76
      force: true,                                                                                                     // 76
      enableQuery: enableQuery                                                                                         // 76
    });                                                                                                                //
  });                                                                                                                  //
});                                                                                                                    // 34
                                                                                                                       //
RocketChat.settings.addGroup('General', function() {                                                                   // 2
  this.add('Site_Url', typeof __meteor_runtime_config__ !== "undefined" && __meteor_runtime_config__ !== null ? __meteor_runtime_config__.ROOT_URL : void 0, {
    type: 'string',                                                                                                    // 81
    i18nDescription: 'Site_Url_Description',                                                                           // 81
    "public": true                                                                                                     // 81
  });                                                                                                                  //
  this.add('Site_Name', 'Rocket.Chat', {                                                                               // 81
    type: 'string',                                                                                                    // 82
    "public": true                                                                                                     // 82
  });                                                                                                                  //
  this.add('Language', '', {                                                                                           // 81
    type: 'language',                                                                                                  // 83
    "public": true                                                                                                     // 83
  });                                                                                                                  //
  this.add('Allow_Invalid_SelfSigned_Certs', false, {                                                                  // 81
    type: 'boolean'                                                                                                    // 84
  });                                                                                                                  //
  this.add('Disable_Favorite_Rooms', false, {                                                                          // 81
    type: 'boolean'                                                                                                    // 85
  });                                                                                                                  //
  this.add('CDN_PREFIX', '', {                                                                                         // 81
    type: 'string'                                                                                                     // 86
  });                                                                                                                  //
  this.add('Force_SSL', false, {                                                                                       // 81
    type: 'boolean',                                                                                                   // 87
    "public": true                                                                                                     // 87
  });                                                                                                                  //
  this.add('GoogleTagManager_id', '', {                                                                                // 81
    type: 'string',                                                                                                    // 88
    "public": true                                                                                                     // 88
  });                                                                                                                  //
  this.add('Restart', 'restart_server', {                                                                              // 81
    type: 'action',                                                                                                    // 89
    actionText: 'Restart_the_server'                                                                                   // 89
  });                                                                                                                  //
  this.section('UTF8', function() {                                                                                    // 81
    this.add('UTF8_Names_Validation', '[0-9a-zA-Z-_.]+', {                                                             // 92
      type: 'string',                                                                                                  // 92
      "public": true,                                                                                                  // 92
      i18nDescription: 'UTF8_Names_Validation_Description'                                                             // 92
    });                                                                                                                //
    return this.add('UTF8_Names_Slugify', true, {                                                                      //
      type: 'boolean',                                                                                                 // 93
      "public": true                                                                                                   // 93
    });                                                                                                                //
  });                                                                                                                  //
  return this.section('Reporting', function() {                                                                        //
    return this.add('Statistics_opt_out', false, {                                                                     //
      type: 'boolean',                                                                                                 // 96
      i18nLabel: "Opt_out_statistics"                                                                                  // 96
    });                                                                                                                //
  });                                                                                                                  //
});                                                                                                                    // 79
                                                                                                                       //
RocketChat.settings.addGroup('SMTP', function() {                                                                      // 2
  this.add('SMTP_Host', '', {                                                                                          // 100
    type: 'string',                                                                                                    // 100
    env: true                                                                                                          // 100
  });                                                                                                                  //
  this.add('SMTP_Port', '', {                                                                                          // 100
    type: 'string',                                                                                                    // 101
    env: true                                                                                                          // 101
  });                                                                                                                  //
  this.add('SMTP_Username', '', {                                                                                      // 100
    type: 'string',                                                                                                    // 102
    env: true                                                                                                          // 102
  });                                                                                                                  //
  this.add('SMTP_Password', '', {                                                                                      // 100
    type: 'password',                                                                                                  // 103
    env: true                                                                                                          // 103
  });                                                                                                                  //
  this.add('From_Email', '', {                                                                                         // 100
    type: 'string',                                                                                                    // 104
    placeholder: 'email@domain'                                                                                        // 104
  });                                                                                                                  //
  this.add('SMTP_Test_Button', 'sendSMTPTestEmail', {                                                                  // 100
    type: 'action',                                                                                                    // 105
    actionText: 'Send_a_test_mail_to_my_user'                                                                          // 105
  });                                                                                                                  //
  return this.section('Invitation', function() {                                                                       //
    this.add('Invitation_Subject', 'You have been invited to Rocket.Chat', {                                           // 108
      type: 'string'                                                                                                   // 108
    });                                                                                                                //
    this.add('Invitation_HTML', '<h2>You have been invited to <h1>Rocket.Chat</h1></h2><p>Go to ' + (typeof __meteor_runtime_config__ !== "undefined" && __meteor_runtime_config__ !== null ? __meteor_runtime_config__.ROOT_URL : void 0) + ' and try the best open source chat solution available today!</p>', {
      type: 'string',                                                                                                  // 109
      multiline: true                                                                                                  // 109
    });                                                                                                                //
    return this.add('Accounts_Enrollment_Email', '', {                                                                 //
      type: 'string',                                                                                                  // 110
      multiline: true                                                                                                  // 110
    });                                                                                                                //
  });                                                                                                                  //
});                                                                                                                    // 99
                                                                                                                       //
RocketChat.settings.addGroup('Message', function() {                                                                   // 2
  this.add('Message_AllowEditing', true, {                                                                             // 114
    type: 'boolean',                                                                                                   // 114
    "public": true                                                                                                     // 114
  });                                                                                                                  //
  this.add('Message_AllowEditing_BlockEditInMinutes', 0, {                                                             // 114
    type: 'int',                                                                                                       // 115
    "public": true,                                                                                                    // 115
    i18nDescription: 'Message_AllowEditing_BlockEditInMinutesDescription'                                              // 115
  });                                                                                                                  //
  this.add('Message_AllowDeleting', true, {                                                                            // 114
    type: 'boolean',                                                                                                   // 116
    "public": true                                                                                                     // 116
  });                                                                                                                  //
  this.add('Message_AllowPinning', true, {                                                                             // 114
    type: 'boolean',                                                                                                   // 117
    "public": true                                                                                                     // 117
  });                                                                                                                  //
  this.add('Message_ShowEditedStatus', true, {                                                                         // 114
    type: 'boolean',                                                                                                   // 118
    "public": true                                                                                                     // 118
  });                                                                                                                  //
  this.add('Message_ShowDeletedStatus', false, {                                                                       // 114
    type: 'boolean',                                                                                                   // 119
    "public": true                                                                                                     // 119
  });                                                                                                                  //
  this.add('Message_KeepHistory', false, {                                                                             // 114
    type: 'boolean',                                                                                                   // 120
    "public": true                                                                                                     // 120
  });                                                                                                                  //
  this.add('Message_MaxAllowedSize', 5000, {                                                                           // 114
    type: 'int',                                                                                                       // 121
    "public": true                                                                                                     // 121
  });                                                                                                                  //
  this.add('Message_ShowFormattingTips', true, {                                                                       // 114
    type: 'boolean',                                                                                                   // 122
    "public": true                                                                                                     // 122
  });                                                                                                                  //
  this.add('Message_AudioRecorderEnabled', true, {                                                                     // 114
    type: 'boolean',                                                                                                   // 123
    "public": true,                                                                                                    // 123
    i18nDescription: 'Message_AudioRecorderEnabledDescription'                                                         // 123
  });                                                                                                                  //
  this.add('Message_GroupingPeriod', 300, {                                                                            // 114
    type: 'int',                                                                                                       // 124
    "public": true,                                                                                                    // 124
    i18nDescription: 'Message_GroupingPeriodDescription'                                                               // 124
  });                                                                                                                  //
  this.add('API_Embed', true, {                                                                                        // 114
    type: 'boolean',                                                                                                   // 125
    "public": true                                                                                                     // 125
  });                                                                                                                  //
  return this.add('API_EmbedDisabledFor', '', {                                                                        //
    type: 'string',                                                                                                    // 126
    "public": true,                                                                                                    // 126
    i18nDescription: 'API_EmbedDisabledFor_Description'                                                                // 126
  });                                                                                                                  //
});                                                                                                                    // 113
                                                                                                                       //
RocketChat.settings.addGroup('Meta', function() {                                                                      // 2
  this.add('Meta_language', '', {                                                                                      // 130
    type: 'string'                                                                                                     // 130
  });                                                                                                                  //
  this.add('Meta_fb_app_id', '', {                                                                                     // 130
    type: 'string'                                                                                                     // 131
  });                                                                                                                  //
  this.add('Meta_robots', '', {                                                                                        // 130
    type: 'string'                                                                                                     // 132
  });                                                                                                                  //
  this.add('Meta_google-site-verification', '', {                                                                      // 130
    type: 'string'                                                                                                     // 133
  });                                                                                                                  //
  return this.add('Meta_msvalidate01', '', {                                                                           //
    type: 'string'                                                                                                     // 134
  });                                                                                                                  //
});                                                                                                                    // 129
                                                                                                                       //
RocketChat.settings.addGroup('Push', function() {                                                                      // 2
  this.add('Push_debug', false, {                                                                                      // 138
    type: 'boolean',                                                                                                   // 138
    "public": true                                                                                                     // 138
  });                                                                                                                  //
  this.add('Push_enable', true, {                                                                                      // 138
    type: 'boolean',                                                                                                   // 139
    "public": true                                                                                                     // 139
  });                                                                                                                  //
  this.add('Push_enable_gateway', true, {                                                                              // 138
    type: 'boolean'                                                                                                    // 140
  });                                                                                                                  //
  this.add('Push_gateway', 'https://rocket.chat', {                                                                    // 138
    type: 'string'                                                                                                     // 141
  });                                                                                                                  //
  this.add('Push_production', true, {                                                                                  // 138
    type: 'boolean',                                                                                                   // 142
    "public": true                                                                                                     // 142
  });                                                                                                                  //
  this.add('Push_test_push', 'push_test', {                                                                            // 138
    type: 'action',                                                                                                    // 143
    actionText: 'Send_a_test_push_to_my_user'                                                                          // 143
  });                                                                                                                  //
  this.section('Certificates_and_Keys', function() {                                                                   // 138
    this.add('Push_apn_passphrase', '', {                                                                              // 146
      type: 'string'                                                                                                   // 146
    });                                                                                                                //
    this.add('Push_apn_key', '', {                                                                                     // 146
      type: 'string',                                                                                                  // 147
      multiline: true                                                                                                  // 147
    });                                                                                                                //
    this.add('Push_apn_cert', '', {                                                                                    // 146
      type: 'string',                                                                                                  // 148
      multiline: true                                                                                                  // 148
    });                                                                                                                //
    this.add('Push_apn_dev_passphrase', '', {                                                                          // 146
      type: 'string'                                                                                                   // 149
    });                                                                                                                //
    this.add('Push_apn_dev_key', '', {                                                                                 // 146
      type: 'string',                                                                                                  // 150
      multiline: true                                                                                                  // 150
    });                                                                                                                //
    this.add('Push_apn_dev_cert', '', {                                                                                // 146
      type: 'string',                                                                                                  // 151
      multiline: true                                                                                                  // 151
    });                                                                                                                //
    this.add('Push_gcm_api_key', '', {                                                                                 // 146
      type: 'string'                                                                                                   // 152
    });                                                                                                                //
    return this.add('Push_gcm_project_number', '', {                                                                   //
      type: 'string',                                                                                                  // 153
      "public": true                                                                                                   // 153
    });                                                                                                                //
  });                                                                                                                  //
  return this.section('Privacy', function() {                                                                          //
    this.add('Push_show_username_room', true, {                                                                        // 156
      type: 'boolean',                                                                                                 // 156
      "public": true                                                                                                   // 156
    });                                                                                                                //
    return this.add('Push_show_message', true, {                                                                       //
      type: 'boolean',                                                                                                 // 157
      "public": true                                                                                                   // 157
    });                                                                                                                //
  });                                                                                                                  //
});                                                                                                                    // 137
                                                                                                                       //
RocketChat.settings.addGroup('Layout', function() {                                                                    // 2
  this.section('Content', function() {                                                                                 // 162
    this.add('Layout_Home_Title', 'Home', {                                                                            // 163
      type: 'string',                                                                                                  // 163
      "public": true                                                                                                   // 163
    });                                                                                                                //
    this.add('Layout_Home_Body', 'Welcome to Rocket.Chat <br> Go to APP SETTINGS -> Layout to customize this intro.', {
      type: 'code',                                                                                                    // 164
      code: 'text/html',                                                                                               // 164
      multiline: true,                                                                                                 // 164
      "public": true                                                                                                   // 164
    });                                                                                                                //
    this.add('Layout_Terms_of_Service', 'Terms of Service <br> Go to APP SETTINGS -> Layout to customize this page.', {
      type: 'code',                                                                                                    // 165
      code: 'text/html',                                                                                               // 165
      multiline: true,                                                                                                 // 165
      "public": true                                                                                                   // 165
    });                                                                                                                //
    this.add('Layout_Privacy_Policy', 'Privacy Policy <br> Go to APP SETTINGS -> Layout to customize this page.', {    // 163
      type: 'code',                                                                                                    // 166
      code: 'text/html',                                                                                               // 166
      multiline: true,                                                                                                 // 166
      "public": true                                                                                                   // 166
    });                                                                                                                //
    return this.add('Layout_Sidenav_Footer', '<div><a href="https://github.com/RocketChat/Rocket.Chat" class="logo" target="_blank"> <img src="/images/logo/logo.svg?v=3" /></a><div class="github-tagline"><span class="icon-pencil" style="color: #994C00"></span> with <span class="icon-heart" style="color: red"></span> on <span class="icon-github-circled"></span></div></div>', {
      type: 'code',                                                                                                    // 167
      code: 'text/html',                                                                                               // 167
      "public": true,                                                                                                  // 167
      i18nDescription: 'Layout_Sidenav_Footer_description'                                                             // 167
    });                                                                                                                //
  });                                                                                                                  //
  this.section('Custom Scripts', function() {                                                                          // 162
    this.add('Custom_Script_Logged_Out', '//Add your script', {                                                        // 170
      type: 'code',                                                                                                    // 170
      multiline: true,                                                                                                 // 170
      "public": true                                                                                                   // 170
    });                                                                                                                //
    return this.add('Custom_Script_Logged_In', '//Add your script', {                                                  //
      type: 'code',                                                                                                    // 171
      multiline: true,                                                                                                 // 171
      "public": true                                                                                                   // 171
    });                                                                                                                //
  });                                                                                                                  //
  return this.section('Login', function() {                                                                            //
    this.add('Layout_Login_Header', '<a class="logo" href="/"><img src="/assets/logo?v=3" /></a>', {                   // 174
      type: 'code',                                                                                                    // 174
      code: 'text/html',                                                                                               // 174
      multiline: true,                                                                                                 // 174
      "public": true                                                                                                   // 174
    });                                                                                                                //
    return this.add('Layout_Login_Terms', 'By proceeding to create your account and use Rocket.Chat, you are agreeing to our <a href="/terms-of-service">Terms of Service</a> and <a href="/privacy-policy">Privacy Policy</a>. If you do not agree, you cannot use Rocket.Chat.', {
      type: 'string',                                                                                                  // 175
      multiline: true,                                                                                                 // 175
      "public": true                                                                                                   // 175
    });                                                                                                                //
  });                                                                                                                  //
});                                                                                                                    // 160
                                                                                                                       //
RocketChat.settings.addGroup('Logs', function() {                                                                      // 2
  this.add('Debug_Level', 'error', {                                                                                   // 179
    type: 'select',                                                                                                    // 179
    values: [                                                                                                          // 179
      {                                                                                                                //
        key: 'error',                                                                                                  // 179
        i18nLabel: 'Only_errors'                                                                                       // 179
      }, {                                                                                                             //
        key: 'debug',                                                                                                  // 179
        i18nLabel: 'All_logs'                                                                                          // 179
      }                                                                                                                //
    ]                                                                                                                  //
  });                                                                                                                  //
  this.add('Log_Level', '0', {                                                                                         // 179
    type: 'select',                                                                                                    // 180
    values: [                                                                                                          // 180
      {                                                                                                                //
        key: '0',                                                                                                      // 180
        i18nLabel: '0_Errors_Only'                                                                                     // 180
      }, {                                                                                                             //
        key: '1',                                                                                                      // 180
        i18nLabel: '1_Errors_and_Information'                                                                          // 180
      }, {                                                                                                             //
        key: '2',                                                                                                      // 180
        i18nLabel: '2_Erros_Information_and_Debug'                                                                     // 180
      }                                                                                                                //
    ],                                                                                                                 //
    "public": true                                                                                                     // 180
  });                                                                                                                  //
  this.add('Log_Package', false, {                                                                                     // 179
    type: 'boolean',                                                                                                   // 181
    "public": true                                                                                                     // 181
  });                                                                                                                  //
  this.add('Log_File', false, {                                                                                        // 179
    type: 'boolean',                                                                                                   // 182
    "public": true                                                                                                     // 182
  });                                                                                                                  //
  return this.add('Log_View_Limit', 1000, {                                                                            //
    type: 'int'                                                                                                        // 183
  });                                                                                                                  //
});                                                                                                                    // 178
                                                                                                                       //
RocketChat.settings.init();                                                                                            // 2
                                                                                                                       //
Meteor.startup(function() {                                                                                            // 2
  return RocketChat.models.Settings.update({                                                                           //
    ts: {                                                                                                              // 190
      $lt: RocketChat.settings.ts                                                                                      // 190
    },                                                                                                                 //
    persistent: {                                                                                                      // 190
      $ne: true                                                                                                        // 190
    }                                                                                                                  //
  }, {                                                                                                                 //
    $set: {                                                                                                            // 190
      hidden: true                                                                                                     // 190
    }                                                                                                                  //
  }, {                                                                                                                 //
    multi: true                                                                                                        // 190
  });                                                                                                                  //
});                                                                                                                    // 189
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/lib/startup/settingsOnLoadSiteUrl.coffee.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var url;                                                                                                               // 1
                                                                                                                       //
if (Meteor.isServer) {                                                                                                 // 1
  url = Npm.require('url');                                                                                            // 2
}                                                                                                                      //
                                                                                                                       //
RocketChat.settings.get('Site_Url', function(key, value) {                                                             // 1
  var ref;                                                                                                             // 5
  if ((value != null ? value.trim() : void 0) !== '') {                                                                // 5
    __meteor_runtime_config__.ROOT_URL = value;                                                                        // 6
    if (((ref = Meteor.absoluteUrl.defaultOptions) != null ? ref.rootUrl : void 0) != null) {                          // 8
      Meteor.absoluteUrl.defaultOptions.rootUrl = value;                                                               // 9
    }                                                                                                                  //
    if (Meteor.isServer) {                                                                                             // 11
      RocketChat.hostname = url.parse(value).hostname;                                                                 // 12
      process.env.MOBILE_ROOT_URL = value;                                                                             // 12
      process.env.MOBILE_DDP_URL = value;                                                                              // 12
      if (typeof WebAppInternals !== "undefined" && WebAppInternals !== null ? WebAppInternals.generateBoilerplate : void 0) {
        return WebAppInternals.generateBoilerplate();                                                                  //
      }                                                                                                                //
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    // 4
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/rocketchat.info.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.Info = {                                                                                                    // 1
    "version": "0.24.0",                                                                                               // 2
    "build": {                                                                                                         // 3
        "date": "2016-03-28T19:30:41.202Z",                                                                            // 4
        "nodeVersion": "v0.10.40",                                                                                     // 5
        "arch": "x64",                                                                                                 // 6
        "platform": "linux",                                                                                           // 7
        "osRelease": "3.13.0-40-generic",                                                                              // 8
        "totalMemmory": 63320141824,                                                                                   // 9
        "freeMemmory": 37974036480,                                                                                    // 10
        "cpus": 32                                                                                                     // 11
    },                                                                                                                 // 12
    "travis": {                                                                                                        // 13
        "buildNumber": "3773",                                                                                         // 14
        "branch": "0.24.0",                                                                                            // 15
        "tag": "0.24.0"                                                                                                // 16
    },                                                                                                                 // 17
    "commit": {                                                                                                        // 18
        "hash": "bd85f1cab5d76c47f3f645fefc26c2e1d9031d9c",                                                            // 19
        "date": "Mon Mar 28 16:20:07 2016 -0300",                                                                      // 20
        "author": "Gabriel Engel",                                                                                     // 21
        "subject": "Merge branch 'develop'",                                                                           // 22
        "tag": "0.24.0",                                                                                               // 23
        "branch": "HEAD"                                                                                               // 24
    }                                                                                                                  // 25
}                                                                                                                      // 26
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/ar.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["ar"] = ["Arabic","العربية"];                                                                  // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                                                 // 10
if(_.isUndefined(TAPi18n.translations["ar"])) {                                                                        // 11
  TAPi18n.translations["ar"] = {};                                                                                     // 12
}                                                                                                                      // 13
                                                                                                                       // 14
if(_.isUndefined(TAPi18n.translations["ar"][namespace])) {                                                             // 15
  TAPi18n.translations["ar"][namespace] = {};                                                                          // 16
}                                                                                                                      // 17
                                                                                                                       // 18
_.extend(TAPi18n.translations["ar"][namespace], {"All_logs":"كل السجلات","Delete":"حذف","Edit":"تعديل"});              // 19
TAPi18n._registerServerTranslator("ar", namespace);                                                                    // 20
                                                                                                                       // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/de.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                                                  // 8
if(_.isUndefined(TAPi18n.translations["de"])) {                                                                        // 9
  TAPi18n.translations["de"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                                             // 13
  TAPi18n.translations["de"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["de"][namespace], {"All_logs":"Alle Protokolle","Debug_Level":"Debug-Level","Delete":"Löschen","Edit":"Bearbeiten","Only_errors":"Nur Fehler"});
TAPi18n._registerServerTranslator("de", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/en.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
// integrate the fallback language translations                                                                        // 8
translations = {};                                                                                                     // 9
translations[namespace] = {"All_logs":"All logs","Debug_Level":"Debug Level","Delete":"Delete","Edit":"Edit","Only_errors":"Only errors"};
TAPi18n._loadLangFileObject("en", translations);                                                                       // 11
TAPi18n._registerServerTranslator("en", namespace);                                                                    // 12
                                                                                                                       // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/es.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                                                         // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                                                        // 9
  TAPi18n.translations["es"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                                                             // 13
  TAPi18n.translations["es"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["es"][namespace], {"All_logs":"Todos los registros","Debug_Level":"Nivel de depuración ","Delete":"Eliminar","Edit":"Editar","Only_errors":"Solamente errores"});
TAPi18n._registerServerTranslator("es", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/fi.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                                                   // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                                                        // 9
  TAPi18n.translations["fi"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                                                             // 13
  TAPi18n.translations["fi"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["fi"][namespace], {"All_logs":"Kaikki lokit","Debug_Level":"Debug-taso","Delete":"Poista","Edit":"Muokkaa","Only_errors":"Vain virheet"});
TAPi18n._registerServerTranslator("fi", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/fr.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                                        // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                                        // 9
  TAPi18n.translations["fr"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                             // 13
  TAPi18n.translations["fr"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["fr"][namespace], {"All_logs":"Tous les journaux","Debug_Level":"Niveau Debug","Delete":"Supprimer","Edit":"Modifier","Only_errors":"Erreurs uniquement"});
TAPi18n._registerServerTranslator("fr", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/he.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["he"] = ["Hebrew","עברית"];                                                                    // 8
if(_.isUndefined(TAPi18n.translations["he"])) {                                                                        // 9
  TAPi18n.translations["he"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["he"][namespace])) {                                                             // 13
  TAPi18n.translations["he"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["he"][namespace], {"All_logs":"כל היומנים","Debug_Level":"רמת פירוט","Delete":"מחיקה","Edit":"עריכה","Only_errors":"שגיאות בלבד"});
TAPi18n._registerServerTranslator("he", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/hr.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["hr"] = ["Croatian","Hrvatski"];                                                               // 8
if(_.isUndefined(TAPi18n.translations["hr"])) {                                                                        // 9
  TAPi18n.translations["hr"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["hr"][namespace])) {                                                             // 13
  TAPi18n.translations["hr"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["hr"][namespace], {"Delete":"Obriši","Edit":"Uredi"});                                   // 17
TAPi18n._registerServerTranslator("hr", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/ja.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                                                    // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                                        // 9
  TAPi18n.translations["ja"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                                             // 13
  TAPi18n.translations["ja"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["ja"][namespace], {"All_logs":"すべてのログ","Debug_Level":"デバッグ レベル","Delete":"削除","Edit":"編集","Only_errors":"エラーのみ"});
TAPi18n._registerServerTranslator("ja", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/km.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["km"] = ["Khmer","ភាសាខ្មែរ"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["km"])) {                                                                        // 9
  TAPi18n.translations["km"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["km"][namespace])) {                                                             // 13
  TAPi18n.translations["km"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["km"][namespace], {"Delete":"លុប","Edit":"កែ​សម្រួល"});                                  // 17
TAPi18n._registerServerTranslator("km", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/ko.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["ko"] = ["Korean","한국어"];                                                                      // 8
if(_.isUndefined(TAPi18n.translations["ko"])) {                                                                        // 9
  TAPi18n.translations["ko"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ko"][namespace])) {                                                             // 13
  TAPi18n.translations["ko"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["ko"][namespace], {"Delete":"삭제","Edit":"수정"});                                          // 17
TAPi18n._registerServerTranslator("ko", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/ms-MY.i18n.json                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["ms-MY"] = ["ms-MY","ms-MY"];                                                                  // 8
if(_.isUndefined(TAPi18n.translations["ms-MY"])) {                                                                     // 9
  TAPi18n.translations["ms-MY"] = {};                                                                                  // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ms-MY"][namespace])) {                                                          // 13
  TAPi18n.translations["ms-MY"][namespace] = {};                                                                       // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["ms-MY"][namespace], {"Delete":"Padam","Edit":"Sunting"});                               // 17
TAPi18n._registerServerTranslator("ms-MY", namespace);                                                                 // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/nl.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                                                        // 9
  TAPi18n.translations["nl"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                                                             // 13
  TAPi18n.translations["nl"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["nl"][namespace], {"All_logs":"Alle logs","Debug_Level":"Debug Nivo","Delete":"Verwijder","Edit":"Wijzig","Only_errors":"Alleen fouten"});
TAPi18n._registerServerTranslator("nl", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/pl.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                                                   // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                                                        // 9
  TAPi18n.translations["pl"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                                                             // 13
  TAPi18n.translations["pl"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["pl"][namespace], {"Delete":"Usuń","Edit":"Edycja"});                                    // 17
TAPi18n._registerServerTranslator("pl", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/pt.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["pt"] = ["Portuguese (Portugal)","Português"];                                                 // 8
if(_.isUndefined(TAPi18n.translations["pt"])) {                                                                        // 9
  TAPi18n.translations["pt"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["pt"][namespace])) {                                                             // 13
  TAPi18n.translations["pt"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["pt"][namespace], {"Delete":"Deletar","Edit":"Editar"});                                 // 17
TAPi18n._registerServerTranslator("pt", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/ro.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                                        // 9
  TAPi18n.translations["ro"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                                             // 13
  TAPi18n.translations["ro"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["ro"][namespace], {"All_logs":"Toate înregistrările","Debug_Level":"Debug Level","Delete":"Șterge","Edit":"Editează","Only_errors":"Doar erori"});
TAPi18n._registerServerTranslator("ro", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/ru.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                                        // 9
  TAPi18n.translations["ru"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                                             // 13
  TAPi18n.translations["ru"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["ru"][namespace], {"All_logs":"Все записи","Debug_Level":"Уровень отладки","Delete":"Удалить","Edit":"Редактировать","Only_errors":"Только ошибки"});
TAPi18n._registerServerTranslator("ru", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/sv.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["sv"] = ["Swedish","Svenska"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["sv"])) {                                                                        // 9
  TAPi18n.translations["sv"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["sv"][namespace])) {                                                             // 13
  TAPi18n.translations["sv"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["sv"][namespace], {"Delete":"Radera","Edit":"Redigera","Only_errors":"Endast fel"});     // 17
TAPi18n._registerServerTranslator("sv", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/tr.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["tr"] = ["Turkish","Türkçe"];                                                                  // 8
if(_.isUndefined(TAPi18n.translations["tr"])) {                                                                        // 9
  TAPi18n.translations["tr"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["tr"][namespace])) {                                                             // 13
  TAPi18n.translations["tr"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["tr"][namespace], {"Delete":"Sil","Edit":"Düzenle"});                                    // 17
TAPi18n._registerServerTranslator("tr", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/zh-HK.i18n.json                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["zh-HK"] = ["Chinese (Hong Kong)","繁体中文（香港）"];                                                 // 8
if(_.isUndefined(TAPi18n.translations["zh-HK"])) {                                                                     // 9
  TAPi18n.translations["zh-HK"] = {};                                                                                  // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["zh-HK"][namespace])) {                                                          // 13
  TAPi18n.translations["zh-HK"][namespace] = {};                                                                       // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["zh-HK"][namespace], {"Delete":"删除","Edit":"编辑"});                                       // 17
TAPi18n._registerServerTranslator("zh-HK", namespace);                                                                 // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/zh-TW.i18n.json                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["zh-TW"] = ["Chinese (Taiwan)","繁体中文（台湾）"];                                                    // 8
if(_.isUndefined(TAPi18n.translations["zh-TW"])) {                                                                     // 9
  TAPi18n.translations["zh-TW"] = {};                                                                                  // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["zh-TW"][namespace])) {                                                          // 13
  TAPi18n.translations["zh-TW"][namespace] = {};                                                                       // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["zh-TW"][namespace], {"Delete":"刪除","Edit":"編輯"});                                       // 17
TAPi18n._registerServerTranslator("zh-TW", namespace);                                                                 // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_lib/packages/rocketchat_libi18n/zh.i18n.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "project",                                                                                          // 2
    namespace = "project";                                                                                             // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                                                      // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                                        // 9
  TAPi18n.translations["zh"] = {};                                                                                     // 10
}                                                                                                                      // 11
                                                                                                                       // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                                             // 13
  TAPi18n.translations["zh"][namespace] = {};                                                                          // 14
}                                                                                                                      // 15
                                                                                                                       // 16
_.extend(TAPi18n.translations["zh"][namespace], {"All_logs":"所有日志","Debug_Level":"调试级别","Delete":"删除","Edit":"编辑","Only_errors":"仅错误"});
TAPi18n._registerServerTranslator("zh", namespace);                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:lib'] = {
  RocketChat: RocketChat
};

})();

//# sourceMappingURL=rocketchat_lib.js.map
