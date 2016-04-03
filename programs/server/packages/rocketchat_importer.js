(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var ECMAScript = Package.ecmascript.ECMAScript;
var check = Package.check.check;
var Match = Package.check.Match;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var __coffeescriptShare, Importer, translations;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/lib/_importer.coffee.js                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                                                      // 1
                                                                                                                      //
Importer = {};                                                                                                        // 1
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/lib/importTool.coffee.js                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Importer.Importers = {};                                                                                              // 1
                                                                                                                      //
Importer.AddImporter = function(name, importer, options) {                                                            // 1
  if (Importer.Importers[name] == null) {                                                                             // 4
    return Importer.Importers[name] = {                                                                               //
      name: options.name,                                                                                             // 6
      importer: importer,                                                                                             // 6
      fileTypeRegex: options.fileTypeRegex,                                                                           // 6
      description: options.description                                                                                // 6
    };                                                                                                                //
  }                                                                                                                   //
};                                                                                                                    // 3
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/server/classes/ImporterBase.coffee.js                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };                                 // 14
                                                                                                                      //
Importer.Base = Importer.Base = (function() {                                                                         // 14
  Base.MaxBSONSize = 8000000;                                                                                         // 15
                                                                                                                      //
  Base.http = Npm.require('http');                                                                                    // 15
                                                                                                                      //
  Base.https = Npm.require('https');                                                                                  // 15
                                                                                                                      //
  Base.getBSONSize = function(object) {                                                                               // 15
    return MongoInternals.NpmModules.mongodb.module.BSON.calculateObjectSize(object);                                 //
  };                                                                                                                  //
                                                                                                                      //
  Base.getBSONSafeArraysFromAnArray = function(theArray) {                                                            // 15
    var BSONSize, i, maxSize, safeArrays;                                                                             // 27
    BSONSize = Importer.Base.getBSONSize(theArray);                                                                   // 27
    maxSize = Math.floor(theArray.length / (Math.ceil(BSONSize / Importer.Base.MaxBSONSize)));                        // 27
    safeArrays = [];                                                                                                  // 27
    i = 0;                                                                                                            // 27
    while (i < theArray.length) {                                                                                     // 31
      safeArrays.push(theArray.slice(i, i += maxSize));                                                               // 32
    }                                                                                                                 //
    return safeArrays;                                                                                                // 33
  };                                                                                                                  //
                                                                                                                      //
  function Base(name, description, fileTypeRegex) {                                                                   // 41
    var importId;                                                                                                     // 42
    this.name = name;                                                                                                 // 42
    this.description = description;                                                                                   // 42
    this.fileTypeRegex = fileTypeRegex;                                                                               // 42
    this.uploadFile = bind(this.uploadFile, this);                                                                    // 42
    this.updateRecord = bind(this.updateRecord, this);                                                                // 42
    this.addCountCompleted = bind(this.addCountCompleted, this);                                                      // 42
    this.addCountToTotal = bind(this.addCountToTotal, this);                                                          // 42
    this.updateProgress = bind(this.updateProgress, this);                                                            // 42
    this.getProgress = bind(this.getProgress, this);                                                                  // 42
    this.getSelection = bind(this.getSelection, this);                                                                // 42
    this.startImport = bind(this.startImport, this);                                                                  // 42
    this.prepare = bind(this.prepare, this);                                                                          // 42
    this.progress = new Importer.Progress(this.name);                                                                 // 42
    this.collection = Importer.RawImports;                                                                            // 42
    this.AdmZip = Npm.require('adm-zip');                                                                             // 42
    importId = Importer.Imports.insert({                                                                              // 42
      'type': this.name,                                                                                              // 45
      'ts': Date.now(),                                                                                               // 45
      'status': this.progress.step,                                                                                   // 45
      'valid': true,                                                                                                  // 45
      'user': Meteor.user()._id                                                                                       // 45
    });                                                                                                               //
    this.importRecord = Importer.Imports.findOne(importId);                                                           // 42
    this.users = {};                                                                                                  // 42
    this.channels = {};                                                                                               // 42
    this.messages = {};                                                                                               // 42
  }                                                                                                                   //
                                                                                                                      //
  Base.prototype.prepare = function(dataURI, sentContentType, fileName) {                                             // 15
    if (!this.fileTypeRegex.test(sentContentType)) {                                                                  // 60
      throw new Error("Invalid file uploaded to import " + this.name + " data from.");                                // 61
    }                                                                                                                 //
    this.updateProgress(Importer.ProgressStep.PREPARING_STARTED);                                                     // 60
    return this.updateRecord({                                                                                        //
      'file': fileName                                                                                                // 64
    });                                                                                                               //
  };                                                                                                                  //
                                                                                                                      //
  Base.prototype.startImport = function(importSelection) {                                                            // 15
    if (importSelection === void 0) {                                                                                 // 74
      throw new Error("No selected users and channel data provided to the " + this.name + " importer.");              // 75
    } else if (importSelection.users === void 0) {                                                                    //
      throw new Error("Users in the selected data wasn't found, it must but at least an empty array for the " + this.name + " importer.");
    } else if (importSelection.channels === void 0) {                                                                 //
      throw new Error("Channels in the selected data wasn't found, it must but at least an empty array for the " + this.name + " importer.");
    }                                                                                                                 //
    return this.updateProgress(Importer.ProgressStep.IMPORTING_STARTED);                                              //
  };                                                                                                                  //
                                                                                                                      //
  Base.prototype.getSelection = function() {                                                                          // 15
    throw new Error("Invalid 'getSelection' called on " + this.name + ", it must be overridden and super can not be called.");
  };                                                                                                                  //
                                                                                                                      //
  Base.prototype.getProgress = function() {                                                                           // 15
    return this.progress;                                                                                             // 94
  };                                                                                                                  //
                                                                                                                      //
  Base.prototype.updateProgress = function(step) {                                                                    // 15
    this.progress.step = step;                                                                                        // 101
    console.log(this.name + " is now at " + step + ".");                                                              // 101
    this.updateRecord({                                                                                               // 101
      'status': this.progress.step                                                                                    // 104
    });                                                                                                               //
    return this.progress;                                                                                             // 106
  };                                                                                                                  //
                                                                                                                      //
  Base.prototype.addCountToTotal = function(count) {                                                                  // 15
    this.progress.count.total = this.progress.count.total + count;                                                    // 113
    this.updateRecord({                                                                                               // 113
      'count.total': this.progress.count.total                                                                        // 114
    });                                                                                                               //
    return this.progress;                                                                                             // 116
  };                                                                                                                  //
                                                                                                                      //
  Base.prototype.addCountCompleted = function(count) {                                                                // 15
    this.progress.count.completed = this.progress.count.completed + count;                                            // 123
    if ((this.progress.count.completed % 500 === 0) || this.progress.count.completed >= this.progress.count.total) {  // 127
      this.updateRecord({                                                                                             // 128
        'count.completed': this.progress.count.completed                                                              // 128
      });                                                                                                             //
    }                                                                                                                 //
    return this.progress;                                                                                             // 130
  };                                                                                                                  //
                                                                                                                      //
  Base.prototype.updateRecord = function(fields) {                                                                    // 15
    Importer.Imports.update({                                                                                         // 137
      _id: this.importRecord._id                                                                                      // 137
    }, {                                                                                                              //
      $set: fields                                                                                                    // 137
    });                                                                                                               //
    this.importRecord = Importer.Imports.findOne(this.importRecord._id);                                              // 137
    return this.importRecord;                                                                                         // 140
  };                                                                                                                  //
                                                                                                                      //
  Base.prototype.uploadFile = function(details, fileUrl, user, room, timeStamp) {                                     // 15
    var requestModule;                                                                                                // 151
    console.log("Uploading the file " + details.name + " from " + fileUrl + ".");                                     // 151
    requestModule = /https/i.test(fileUrl) ? Importer.Base.https : Importer.Base.http;                                // 151
    return requestModule.get(fileUrl, Meteor.bindEnvironment(function(stream) {                                       //
      var fileId;                                                                                                     // 155
      fileId = Meteor.fileStore.create(details);                                                                      // 155
      if (fileId) {                                                                                                   // 156
        return Meteor.fileStore.write(stream, fileId, function(err, file) {                                           //
          var attachment, msg, ref, url;                                                                              // 158
          if (err) {                                                                                                  // 158
            throw new Error(err);                                                                                     // 159
          } else {                                                                                                    //
            url = file.url.replace(Meteor.absoluteUrl(), '/');                                                        // 161
            attachment = {                                                                                            // 161
              title: "File Uploaded: " + file.name,                                                                   // 164
              title_link: url                                                                                         // 164
            };                                                                                                        //
            if (/^image\/.+/.test(file.type)) {                                                                       // 167
              attachment.image_url = url;                                                                             // 168
              attachment.image_type = file.type;                                                                      // 168
              attachment.image_size = file.size;                                                                      // 168
              attachment.image_dimensions = (ref = file.identify) != null ? ref.size : void 0;                        // 168
            }                                                                                                         //
            if (/^audio\/.+/.test(file.type)) {                                                                       // 173
              attachment.audio_url = url;                                                                             // 174
              attachment.audio_type = file.type;                                                                      // 174
              attachment.audio_size = file.size;                                                                      // 174
            }                                                                                                         //
            if (/^video\/.+/.test(file.type)) {                                                                       // 178
              attachment.video_url = url;                                                                             // 179
              attachment.video_type = file.type;                                                                      // 179
              attachment.video_size = file.size;                                                                      // 179
            }                                                                                                         //
            msg = {                                                                                                   // 161
              rid: details.rid,                                                                                       // 184
              ts: timeStamp,                                                                                          // 184
              msg: '',                                                                                                // 184
              file: {                                                                                                 // 184
                _id: file._id                                                                                         // 188
              },                                                                                                      //
              groupable: false,                                                                                       // 184
              attachments: [attachment]                                                                               // 184
            };                                                                                                        //
            return RocketChat.sendMessage(user, msg, room);                                                           //
          }                                                                                                           //
        });                                                                                                           //
      } else {                                                                                                        //
        return console.error("Failed to create the store for " + fileUrl + "!!!");                                    //
      }                                                                                                               //
    }));                                                                                                              //
  };                                                                                                                  //
                                                                                                                      //
  return Base;                                                                                                        //
                                                                                                                      //
})();                                                                                                                 //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/server/classes/ImporterProgress.coffee.js                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Importer.Progress = Importer.Progress = (function() {                                                                 // 2
  function Progress(name) {                                                                                           // 7
    this.name = name;                                                                                                 // 8
    this.step = Importer.ProgressStep.NEW;                                                                            // 8
    this.count = {                                                                                                    // 8
      completed: 0,                                                                                                   // 9
      total: 0                                                                                                        // 9
    };                                                                                                                //
  }                                                                                                                   //
                                                                                                                      //
  return Progress;                                                                                                    //
                                                                                                                      //
})();                                                                                                                 //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/server/classes/ImporterProgressStep.coffee.js                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Importer.ProgressStep = Object.freeze({                                                                               // 2
  NEW: 'importer_new',                                                                                                // 3
  PREPARING_STARTED: 'importer_preparing_started',                                                                    // 3
  PREPARING_USERS: 'importer_preparing_users',                                                                        // 3
  PREPARING_CHANNELS: 'importer_preparing_channels',                                                                  // 3
  PREPARING_MESSAGES: 'importer_preparing_messages',                                                                  // 3
  USER_SELECTION: 'importer_user_selection',                                                                          // 3
  IMPORTING_STARTED: 'importer_importing_started',                                                                    // 3
  IMPORTING_USERS: 'importer_importing_users',                                                                        // 3
  IMPORTING_CHANNELS: 'importer_importing_channels',                                                                  // 3
  IMPORTING_MESSAGES: 'importer_importing_messages',                                                                  // 3
  FINISHING: 'importer_finishing',                                                                                    // 3
  DONE: 'importer_done',                                                                                              // 3
  ERROR: 'importer_import_failed',                                                                                    // 3
  CANCELLED: 'importer_import_cancelled'                                                                              // 3
});                                                                                                                   //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/server/classes/ImporterSelection.coffee.js                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Importer.Selection = Importer.Selection = (function() {                                                               // 2
  function Selection(name, users, channels) {                                                                         // 9
    this.name = name;                                                                                                 // 9
    this.users = users;                                                                                               // 9
    this.channels = channels;                                                                                         // 9
  }                                                                                                                   //
                                                                                                                      //
  return Selection;                                                                                                   //
                                                                                                                      //
})();                                                                                                                 //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/server/classes/ImporterSelectionChannel.coffee.js                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Importer.SelectionChannel = Importer.SelectionChannel = (function() {                                                 // 2
  function SelectionChannel(channel_id, name, is_archived, do_import) {                                               // 10
    this.channel_id = channel_id;                                                                                     // 10
    this.name = name;                                                                                                 // 10
    this.is_archived = is_archived;                                                                                   // 10
    this.do_import = do_import;                                                                                       // 10
  }                                                                                                                   //
                                                                                                                      //
  return SelectionChannel;                                                                                            //
                                                                                                                      //
})();                                                                                                                 //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/server/classes/ImporterSelectionUser.coffee.js                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Importer.SelectionUser = Importer.SelectionUser = (function() {                                                       // 2
  function SelectionUser(user_id, username, email, is_deleted, is_bot, do_import) {                                   // 12
    this.user_id = user_id;                                                                                           // 12
    this.username = username;                                                                                         // 12
    this.email = email;                                                                                               // 12
    this.is_deleted = is_deleted;                                                                                     // 12
    this.is_bot = is_bot;                                                                                             // 12
    this.do_import = do_import;                                                                                       // 12
  }                                                                                                                   //
                                                                                                                      //
  return SelectionUser;                                                                                               //
                                                                                                                      //
})();                                                                                                                 //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/server/models/Imports.coffee.js                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;                                                                                        //
                                                                                                                      //
Importer.Imports = new (Importer.Imports = (function(superClass) {                                                    // 1
  extend(Imports, superClass);                                                                                        // 2
                                                                                                                      //
  function Imports() {                                                                                                // 2
    this._initModel('import');                                                                                        // 3
  }                                                                                                                   //
                                                                                                                      //
  return Imports;                                                                                                     //
                                                                                                                      //
})(RocketChat.models._Base));                                                                                         //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/server/models/RawImports.coffee.js                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;                                                                                        //
                                                                                                                      //
Importer.RawImports = new (Importer.RawImports = (function(superClass) {                                              // 1
  extend(RawImports, superClass);                                                                                     // 2
                                                                                                                      //
  function RawImports() {                                                                                             // 2
    this._initModel('raw_imports');                                                                                   // 3
  }                                                                                                                   //
                                                                                                                      //
  return RawImports;                                                                                                  //
                                                                                                                      //
})(RocketChat.models._Base));                                                                                         //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/server/methods/getImportProgress.coffee.js                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                      // 1
  getImportProgress: function(name) {                                                                                 // 2
    var ref;                                                                                                          // 3
    if (!Meteor.userId()) {                                                                                           // 3
      throw new Meteor.Error(203, 'User_logged_out');                                                                 // 4
    }                                                                                                                 //
    if (Importer.Importers[name] != null) {                                                                           // 6
      return (ref = Importer.Importers[name].importerInstance) != null ? ref.getProgress() : void 0;                  // 7
    } else {                                                                                                          //
      throw new Meteor.Error('importer-not-defined', 'importer_not_defined_properly', {                               // 9
        importerName: name                                                                                            // 9
      });                                                                                                             //
    }                                                                                                                 //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/server/methods/getSelectionData.coffee.js                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                      // 1
  getSelectionData: function(name) {                                                                                  // 2
    var progress, ref;                                                                                                // 3
    if (!Meteor.userId()) {                                                                                           // 3
      throw new Meteor.Error(203, 'User_logged_out');                                                                 // 4
    }                                                                                                                 //
    if (((ref = Importer.Importers[name]) != null ? ref.importerInstance : void 0) != null) {                         // 6
      progress = Importer.Importers[name].importerInstance.getProgress();                                             // 7
      switch (progress.step) {                                                                                        // 8
        case Importer.ProgressStep.USER_SELECTION:                                                                    // 8
          return Importer.Importers[name].importerInstance.getSelection();                                            // 10
        default:                                                                                                      // 8
          return false;                                                                                               // 12
      }                                                                                                               // 8
    } else {                                                                                                          //
      throw new Meteor.Error('importer-not-defined', 'importer_not_defined_properly', {                               // 14
        importerName: name                                                                                            // 14
      });                                                                                                             //
    }                                                                                                                 //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/server/methods/prepareImport.coffee.js                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                      // 1
  prepareImport: function(name, dataURI, contentType, fileName) {                                                     // 2
    var ref;                                                                                                          // 3
    if (!Meteor.userId()) {                                                                                           // 3
      throw new Meteor.Error(203, 'User_logged_out');                                                                 // 4
    }                                                                                                                 //
    if (((ref = Importer.Importers[name]) != null ? ref.importerInstance : void 0) != null) {                         // 6
      return Importer.Importers[name].importerInstance.prepare(dataURI, contentType, fileName);                       //
    } else {                                                                                                          //
      throw new Meteor.Error('importer-not-defined', 'importer_not_defined_properly', {                               // 9
        importerName: name                                                                                            // 9
      });                                                                                                             //
    }                                                                                                                 //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/server/methods/restartImport.coffee.js                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                      // 1
  restartImport: function(name) {                                                                                     // 2
    var importer;                                                                                                     // 3
    if (!Meteor.userId()) {                                                                                           // 3
      throw new Meteor.Error(203, 'User_logged_out');                                                                 // 4
    }                                                                                                                 //
    if (Importer.Importers[name] != null) {                                                                           // 6
      importer = Importer.Importers[name];                                                                            // 7
      importer.importerInstance.updateProgress(Importer.ProgressStep.CANCELLED);                                      // 7
      importer.importerInstance.updateRecord({                                                                        // 7
        valid: false                                                                                                  // 9
      });                                                                                                             //
      importer.importerInstance = void 0;                                                                             // 7
      importer.importerInstance = new importer.importer(importer.name, importer.description, importer.fileTypeRegex);
      return importer.importerInstance.getProgress();                                                                 // 12
    } else {                                                                                                          //
      throw new Meteor.Error('importer-not-defined', 'importer_not_defined_properly', {                               // 14
        importerName: name                                                                                            // 14
      });                                                                                                             //
    }                                                                                                                 //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/server/methods/setupImporter.coffee.js                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                      // 1
  setupImporter: function(name) {                                                                                     // 2
    var importer, ref;                                                                                                // 3
    if (!Meteor.userId()) {                                                                                           // 3
      throw new Meteor.Error(203, 'User_logged_out');                                                                 // 4
    }                                                                                                                 //
    if (((ref = Importer.Importers[name]) != null ? ref.importer : void 0) != null) {                                 // 6
      importer = Importer.Importers[name];                                                                            // 7
      if (importer.importerInstance) {                                                                                // 9
        return importer.importerInstance.getProgress();                                                               // 10
      } else {                                                                                                        //
        importer.importerInstance = new importer.importer(importer.name, importer.description, importer.fileTypeRegex);
        return importer.importerInstance.getProgress();                                                               // 13
      }                                                                                                               //
    } else {                                                                                                          //
      console.warn("Tried to setup " + name + " as an importer.");                                                    // 15
      throw new Meteor.Error('importer-not-defined', 'importer_not_defined_properly', {                               // 16
        importerName: name                                                                                            // 16
      });                                                                                                             //
    }                                                                                                                 //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/server/methods/startImport.coffee.js                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                      // 1
  startImport: function(name, input) {                                                                                // 2
    var channelsSelection, ref, selection, usersSelection;                                                            // 4
    if (!Meteor.userId()) {                                                                                           // 4
      throw new Meteor.Error(203, 'User_logged_out');                                                                 // 5
    }                                                                                                                 //
    if (((ref = Importer.Importers[name]) != null ? ref.importerInstance : void 0) != null) {                         // 7
      usersSelection = input.users.map(function(user) {                                                               // 8
        return new Importer.SelectionUser(user.user_id, user.username, user.email, user.is_deleted, user.is_bot, user.do_import);
      });                                                                                                             //
      channelsSelection = input.channels.map(function(channel) {                                                      // 8
        return new Importer.SelectionChannel(channel.channel_id, channel.name, channel.is_archived, channel.do_import);
      });                                                                                                             //
      selection = new Importer.Selection(name, usersSelection, channelsSelection);                                    // 8
      return Importer.Importers[name].importerInstance.startImport(selection);                                        //
    } else {                                                                                                          //
      throw new Meteor.Error('importer-not-defined', 'importer_not_defined_properly', {                               // 16
        importerName: name                                                                                            // 16
      });                                                                                                             //
    }                                                                                                                 //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/server/startup/setImportsToInvalid.coffee.js                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function() {                                                                                           // 1
  Importer.Imports.update({}, {                                                                                       // 4
    $set: {                                                                                                           // 4
      valid: false                                                                                                    // 4
    }                                                                                                                 //
  }, {                                                                                                                //
    multi: true                                                                                                       // 4
  });                                                                                                                 //
  return Importer.Imports.find({                                                                                      //
    valid: {                                                                                                          // 7
      $ne: true                                                                                                       // 7
    }                                                                                                                 //
  }).forEach(function(item) {                                                                                         //
    return Importer.RawImports.remove({                                                                               //
      'import': item._id,                                                                                             // 8
      'importer': item.type                                                                                           // 8
    });                                                                                                               //
  });                                                                                                                 //
});                                                                                                                   // 1
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/packages/rocketchat_importeri18n/de.i18n.json                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                                                 // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                                                // 10
if(_.isUndefined(TAPi18n.translations["de"])) {                                                                       // 11
  TAPi18n.translations["de"] = {};                                                                                    // 12
}                                                                                                                     // 13
                                                                                                                      // 14
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                                            // 15
  TAPi18n.translations["de"][namespace] = {};                                                                         // 16
}                                                                                                                     // 17
                                                                                                                      // 18
_.extend(TAPi18n.translations["de"][namespace], {"Importer_Archived":"archiviert","Importer_done":"Die Daten wurden erfolgreich importiert!","Importer_finishing":"Import abgeschlossen.","Importer_From_Description":"Importiert Daten von __from__ nach Rocket.Chat.","Importer_import_cancelled":"Der Import wurde abgebrochen.","Importer_import_failed":"Während des Importierens ist ein Fehler aufgetreten.","Importer_importing_channels":"Importiere die Kanäle.","Importer_importing_messages":"Importiere die Nachrichten.","Importer_importing_started":"Starte den Importer.","Importer_importing_users":"Importiere die Benutzer.","Importer_not_defined_properly":"Der Importer wurde nicht richtig definiert, eine Importklasse fehlt.","Importer_not_in_progress":"Der Importer läuft derzeit nicht.","Importer_Prepare_Restart_Import":"Import neu starten","Importer_Prepare_Start_Import":"Import starten","Importer_Prepare_Uncheck_Archived_Channels":"Markierung für archivierte Kanäle entfernen","Importer_Prepare_Uncheck_Deleted_Users":"Gelöschte Nutzer deaktivieren","Importer_progress_error":"Fehler beim Erhalt des Verlaufs des Imports.","Importer_setup_error":"Bei der Konfiguration des Importers ist ein Fehler aufgetreten.","Invalid_Export_File":"Die angegebene Datei ist keine gültige %s Exportdatei.","Invalid_Import_File_Type":"Ungültiges Dateiformat zum Importieren."});
TAPi18n._registerServerTranslator("de", namespace);                                                                   // 20
                                                                                                                      // 21
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/packages/rocketchat_importeri18n/en.i18n.json                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
// integrate the fallback language translations                                                                       // 8
translations = {};                                                                                                    // 9
translations[namespace] = {"Importer_Archived":"Archived","Importer_done":"Importing complete!","Importer_finishing":"Finishing up the import.","Importer_From_Description":"Imports __from__'s data into Rocket.Chat.","Importer_import_cancelled":"Import cancelled.","Importer_import_failed":"An error occured while running the import.","Importer_importing_channels":"Importing the channels.","Importer_importing_messages":"Importing the messages.","Importer_importing_started":"Starting the import.","Importer_importing_users":"Importing the users.","Importer_not_defined_properly":"The importer was not defined correctly, it is missing the Import class.","Importer_not_in_progress":"The importer is currently not running.","Importer_Prepare_Restart_Import":"Restart Import","Importer_Prepare_Start_Import":"Start Importing","Importer_Prepare_Uncheck_Archived_Channels":"Uncheck Archived Channels","Importer_Prepare_Uncheck_Deleted_Users":"Uncheck Deleted Users","Importer_progress_error":"Failed to get the progress for the import.","Importer_setup_error":"An error occured while setting up the importer.","Invalid_Export_File":"The file uploaded isn't a valid %s export file.","Invalid_Import_File_Type":"Invalid Import file type."};
TAPi18n._loadLangFileObject("en", translations);                                                                      // 11
TAPi18n._registerServerTranslator("en", namespace);                                                                   // 12
                                                                                                                      // 13
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/packages/rocketchat_importeri18n/fr.i18n.json                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                                       // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                                       // 9
  TAPi18n.translations["fr"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                            // 13
  TAPi18n.translations["fr"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["fr"][namespace], {"Importer_Archived":"Archivé","Importer_done":"Importation réussie !","Importer_finishing":"Finalisation de l'import","Importer_From_Description":"Importer les données de __from__ dans Rocket.Chat.","Importer_import_cancelled":"Importation annulé","Importer_import_failed":"Un erreur est survenue pendant l'importation.","Importer_importing_channels":"Importation des canaux.","Importer_importing_messages":"Importation des messages.","Importer_importing_started":"Début de l'importation.","Importer_importing_users":"Importation des utilisateurs.","Importer_not_defined_properly":"L'importateur n'a pas été défini correctement, il manque la classe Import.","Importer_not_in_progress":"L'importateur n'est pas en cours d'exécution.","Importer_Prepare_Restart_Import":"Recommencer l’Importation","Importer_Prepare_Start_Import":"Commencer l'Importation","Importer_Prepare_Uncheck_Archived_Channels":"Désélectionner les Canaux Archivés","Importer_Prepare_Uncheck_Deleted_Users":"Désélectionner les Utilisateurs Supprimés","Importer_progress_error":"Impossible d'obtenir l'état de l'importation.","Importer_setup_error":"Une erreur est survenue lors du paramétrage de l'importateur.","Invalid_Export_File":"Le fichier transmis n'est pas un fichier d'exportation valide de %s","Invalid_Import_File_Type":"Format du fichier d'importation invalide."});
TAPi18n._registerServerTranslator("fr", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/packages/rocketchat_importeri18n/ja.i18n.json                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                                                   // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                                       // 9
  TAPi18n.translations["ja"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                                            // 13
  TAPi18n.translations["ja"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["ja"][namespace], {"Importer_done":"インポートが完了しました!","Importer_From_Description":"__from__ のデータを Rocket.Chat へインポート","Importer_import_cancelled":"インポートをキャンセルしました。","Importer_import_failed":"インポート中にエラーが発生しました。","Importer_Prepare_Restart_Import":"インポートを再実行する","Importer_Prepare_Start_Import":"インポートを開始","Importer_progress_error":"インポートの進行状況を取得するのに失敗しました。"});
TAPi18n._registerServerTranslator("ja", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/packages/rocketchat_importeri18n/ro.i18n.json                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                                       // 9
  TAPi18n.translations["ro"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                                            // 13
  TAPi18n.translations["ro"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["ro"][namespace], {"Importer_Archived":"Arhivat","Importer_done":"Import complet!","Importer_finishing":"Se finalizează import.","Importer_import_cancelled":"Import anulat.","Importer_import_failed":"A Apărut o eroare în timpul importului.","Importer_importing_messages":"Se imoprtă mesajele.","Importer_Prepare_Restart_Import":"Reîncepe import","Importer_Prepare_Start_Import":"Începe import","Invalid_Export_File":"Fișierul încărcat nu este un fișier valid de export.","Invalid_Import_File_Type":"Tip fișier de date invalid."});
TAPi18n._registerServerTranslator("ro", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/packages/rocketchat_importeri18n/ru.i18n.json                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                                       // 9
  TAPi18n.translations["ru"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                                            // 13
  TAPi18n.translations["ru"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["ru"][namespace], {"Importer_Archived":"Удаленные","Importer_done":"Импорт данных завершен!","Importer_finishing":"Завершить импорт данных.","Importer_From_Description":"Импортировать данные из __from__ в Rocket.Chat.","Importer_import_cancelled":"Импорт данных отменен.","Importer_import_failed":"Во время импорта данных возникла ошибка.","Importer_importing_channels":"Импортировать каналы.","Importer_importing_messages":"Импортировать сообщения.","Importer_importing_started":"Начать импорт данных.","Importer_importing_users":"Импортировать пользователей.","Importer_not_defined_properly":"Импортер не был определен правильно, не хватает классификации импорта.","Importer_not_in_progress":"Импортер на данный момент не в сети.","Importer_Prepare_Restart_Import":"Перезапустить импорт данных.","Importer_Prepare_Start_Import":"Начать импорт данных.","Importer_Prepare_Uncheck_Archived_Channels":"Снимите флажок с удаленных каналов","Importer_Prepare_Uncheck_Deleted_Users":"Снимите флажок с удаленных пользователей","Importer_progress_error":"Произошла ошибка при выполнении импорта данных.","Importer_setup_error":"При настройке импортера возникла ошибка.","Invalid_Export_File":"Загруженный файл не является действительным экспортным файлом %s.","Invalid_Import_File_Type":"Недействительный тип импортируемого файла."});
TAPi18n._registerServerTranslator("ru", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/packages/rocketchat_importeri18n/sv.i18n.json                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["sv"] = ["Swedish","Svenska"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["sv"])) {                                                                       // 9
  TAPi18n.translations["sv"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["sv"][namespace])) {                                                            // 13
  TAPi18n.translations["sv"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["sv"][namespace], {"Importer_done":"Importering färdig!","Importer_finishing":"Avslutar importen.","Importer_import_cancelled":"Importering avbryten.","Importer_import_failed":"Ett fel uppstod under importen.","Importer_importing_channels":"Importerar kanalerna.","Importer_importing_messages":"Importerar meddelandena.","Importer_importing_started":"Startar importen.","Importer_importing_users":"Importerar användarna.","Importer_Prepare_Restart_Import":"Starta om import","Importer_Prepare_Start_Import":"Börja importera"});
TAPi18n._registerServerTranslator("sv", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_importer/packages/rocketchat_importeri18n/zh.i18n.json                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "project",                                                                                         // 2
    namespace = "project";                                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                                                     // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                                       // 9
  TAPi18n.translations["zh"] = {};                                                                                    // 10
}                                                                                                                     // 11
                                                                                                                      // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                                            // 13
  TAPi18n.translations["zh"][namespace] = {};                                                                         // 14
}                                                                                                                     // 15
                                                                                                                      // 16
_.extend(TAPi18n.translations["zh"][namespace], {"Importer_Archived":"已归档","Importer_done":"已完成导入！","Importer_finishing":"导入即将完成。","Importer_From_Description":"将 __from__ 数据导入 Rocket.Chat。","Importer_import_cancelled":"已取消导入","Importer_import_failed":"导入过程中发生错误！","Importer_importing_channels":"导入频道。","Importer_importing_messages":"倒入信息。","Importer_importing_started":"开始导入。","Importer_importing_users":"导入用户。","Importer_not_defined_properly":"导入所用帐号错误，未指定导入class。","Importer_not_in_progress":"导入工具没有正常运行。","Importer_Prepare_Restart_Import":"重新导入","Importer_Prepare_Start_Import":"开始导入","Importer_Prepare_Uncheck_Archived_Channels":"取消选中已归档的频道","Importer_Prepare_Uncheck_Deleted_Users":"取消选中已删除的用户","Importer_setup_error":"设置导入工具时发生了错误。","Invalid_Export_File":"上传的文件不是有效的导出文件。","Invalid_Import_File_Type":"无效的导入文件类型。"});
TAPi18n._registerServerTranslator("zh", namespace);                                                                   // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:importer'] = {
  Importer: Importer
};

})();

//# sourceMappingURL=rocketchat_importer.js.map
