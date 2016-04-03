(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var RocketChatFile = Package['rocketchat:file'].RocketChatFile;
var RocketChat = Package['rocketchat:lib'].RocketChat;

/* Package-scope variables */
var __coffeescriptShare;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rocketchat_assets/server/assets.coffee.js                                                             //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var assets, key, mime, sizeOf, value,                                                                             // 1
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
                                                                                                                  //
sizeOf = Npm.require('image-size');                                                                               // 1
                                                                                                                  //
mime = Npm.require('mime-types');                                                                                 // 1
                                                                                                                  //
mime.extensions['image/vnd.microsoft.icon'] = ['ico'];                                                            // 1
                                                                                                                  //
this.RocketChatAssetsInstance = new RocketChatFile.GridFS({                                                       // 1
  name: 'assets'                                                                                                  // 7
});                                                                                                               //
                                                                                                                  //
assets = {                                                                                                        // 1
  'logo': {                                                                                                       // 11
    label: 'logo (svg, png)',                                                                                     // 12
    defaultUrl: 'images/logo/logo.svg?v=3',                                                                       // 12
    constraints: {                                                                                                // 12
      type: 'image',                                                                                              // 15
      extensions: ['svg', 'png'],                                                                                 // 15
      width: void 0,                                                                                              // 15
      height: void 0                                                                                              // 15
    }                                                                                                             //
  },                                                                                                              //
  'favicon.ico': {                                                                                                // 11
    label: 'favicon.ico',                                                                                         // 20
    defaultUrl: 'favicon.ico?v=3',                                                                                // 20
    constraints: {                                                                                                // 20
      type: 'image',                                                                                              // 23
      extensions: ['ico'],                                                                                        // 23
      width: void 0,                                                                                              // 23
      height: void 0                                                                                              // 23
    }                                                                                                             //
  },                                                                                                              //
  'favicon.svg': {                                                                                                // 11
    label: 'favicon.svg',                                                                                         // 28
    defaultUrl: 'images/logo/icon.svg?v=3',                                                                       // 28
    constraints: {                                                                                                // 28
      type: 'image',                                                                                              // 31
      extensions: ['svg'],                                                                                        // 31
      width: void 0,                                                                                              // 31
      height: void 0                                                                                              // 31
    }                                                                                                             //
  },                                                                                                              //
  'favicon_64.png': {                                                                                             // 11
    label: 'favicon.png (64x64)',                                                                                 // 36
    defaultUrl: 'images/logo/favicon-64x64.png?v=3',                                                              // 36
    constraints: {                                                                                                // 36
      type: 'image',                                                                                              // 39
      extensions: ['png'],                                                                                        // 39
      width: 64,                                                                                                  // 39
      height: 64                                                                                                  // 39
    }                                                                                                             //
  },                                                                                                              //
  'favicon_96.png': {                                                                                             // 11
    label: 'favicon.png (96x96)',                                                                                 // 44
    defaultUrl: 'images/logo/favicon-96x96.png?v=3',                                                              // 44
    constraints: {                                                                                                // 44
      type: 'image',                                                                                              // 47
      extensions: ['png'],                                                                                        // 47
      width: 96,                                                                                                  // 47
      height: 96                                                                                                  // 47
    }                                                                                                             //
  },                                                                                                              //
  'favicon_128.png': {                                                                                            // 11
    label: 'favicon.png (128x128)',                                                                               // 52
    defaultUrl: 'images/logo/favicon-128x128.png?v=3',                                                            // 52
    constraints: {                                                                                                // 52
      type: 'image',                                                                                              // 55
      extensions: ['png'],                                                                                        // 55
      width: 128,                                                                                                 // 55
      height: 128                                                                                                 // 55
    }                                                                                                             //
  },                                                                                                              //
  'favicon_192.png': {                                                                                            // 11
    label: 'favicon.png (192x192)',                                                                               // 60
    defaultUrl: 'images/logo/android-chrome-192x192.png?v=3',                                                     // 60
    constraints: {                                                                                                // 60
      type: 'image',                                                                                              // 63
      extensions: ['png'],                                                                                        // 63
      width: 192,                                                                                                 // 63
      height: 192                                                                                                 // 63
    }                                                                                                             //
  },                                                                                                              //
  'favicon_256.png': {                                                                                            // 11
    label: 'favicon.png (256x256)',                                                                               // 68
    defaultUrl: 'images/logo/favicon-256x256.png?v=3',                                                            // 68
    constraints: {                                                                                                // 68
      type: 'image',                                                                                              // 71
      extensions: ['png'],                                                                                        // 71
      width: 256,                                                                                                 // 71
      height: 256                                                                                                 // 71
    }                                                                                                             //
  }                                                                                                               //
};                                                                                                                //
                                                                                                                  //
RocketChat.settings.addGroup('Assets');                                                                           // 1
                                                                                                                  //
for (key in assets) {                                                                                             // 78
  value = assets[key];                                                                                            //
  RocketChat.settings.add("Assets_" + key, '', {                                                                  // 79
    type: 'asset',                                                                                                // 79
    group: 'Assets',                                                                                              // 79
    fileConstraints: value.constraints,                                                                           // 79
    i18nLabel: value.label,                                                                                       // 79
    asset: key                                                                                                    // 79
  });                                                                                                             //
}                                                                                                                 // 78
                                                                                                                  //
Meteor.methods({                                                                                                  // 1
  unsetAsset: function(asset) {                                                                                   // 83
    var hasPermission;                                                                                            // 84
    if (!Meteor.userId()) {                                                                                       // 84
      throw new Meteor.Error('invalid-user', "[methods] unsetAsset -> Invalid user");                             // 85
    }                                                                                                             //
    hasPermission = RocketChat.authz.hasPermission(Meteor.userId(), 'manage-assets');                             // 84
    if (!hasPermission) {                                                                                         // 88
      throw new Meteor.Error('manage-assets-not-allowed', "[methods] unsetAsset -> Manage assets not allowed");   // 89
    }                                                                                                             //
    if (assets[asset] == null) {                                                                                  // 91
      throw new Meteor.Error("Invalid_asset");                                                                    // 92
    }                                                                                                             //
    RocketChatAssetsInstance.deleteFile(asset);                                                                   // 84
    return RocketChat.settings.clearById("Assets_" + asset);                                                      //
  }                                                                                                               //
});                                                                                                               //
                                                                                                                  //
Meteor.methods({                                                                                                  // 1
  setAsset: function(binaryContent, contentType, asset) {                                                         // 99
    var dimensions, file, hasPermission, ref, rs, ws;                                                             // 100
    if (!Meteor.userId()) {                                                                                       // 100
      throw new Meteor.Error('invalid-user', "[methods] setAsset -> Invalid user");                               // 101
    }                                                                                                             //
    hasPermission = RocketChat.authz.hasPermission(Meteor.userId(), 'manage-assets');                             // 100
    if (!hasPermission) {                                                                                         // 104
      throw new Meteor.Error('manage-assets-not-allowed', "[methods] unsetAsset -> Manage assets not allowed");   // 105
    }                                                                                                             //
    if (assets[asset] == null) {                                                                                  // 107
      throw new Meteor.Error("Invalid_asset");                                                                    // 108
    }                                                                                                             //
    if (ref = mime.extension(contentType), indexOf.call(assets[asset].constraints.extensions, ref) < 0) {         // 110
      throw new Meteor.Error("Invalid_file_type", contentType);                                                   // 111
    }                                                                                                             //
    file = new Buffer(binaryContent, 'binary');                                                                   // 100
    if ((assets[asset].constraints.width != null) || (assets[asset].constraints.height != null)) {                // 115
      dimensions = sizeOf(file);                                                                                  // 116
      if ((assets[asset].constraints.width != null) && assets[asset].constraints.width !== dimensions.width) {    // 118
        throw new Meteor.Error("Invalid_file_width");                                                             // 119
      }                                                                                                           //
      if ((assets[asset].constraints.height != null) && assets[asset].constraints.height !== dimensions.height) {
        throw new Meteor.Error("Invalid_file_height");                                                            // 122
      }                                                                                                           //
    }                                                                                                             //
    rs = RocketChatFile.bufferToStream(file);                                                                     // 100
    RocketChatAssetsInstance.deleteFile(asset);                                                                   // 100
    ws = RocketChatAssetsInstance.createWriteStream(asset, contentType);                                          // 100
    ws.on('end', Meteor.bindEnvironment(function() {                                                              // 100
      return Meteor.setTimeout(function() {                                                                       //
        return RocketChat.settings.updateById("Assets_" + asset, "/assets/" + asset);                             //
      }, 200);                                                                                                    //
    }));                                                                                                          //
    rs.pipe(ws);                                                                                                  // 100
  }                                                                                                               //
});                                                                                                               //
                                                                                                                  //
WebApp.connectHandlers.use('/assets/', Meteor.bindEnvironment(function(req, res, next) {                          // 1
  var file, params, ref, ref1, ref2, reqModifiedHeader;                                                           // 137
  params = {                                                                                                      // 137
    asset: decodeURIComponent(req.url.replace(/^\//, '').replace(/\?.*$/, ''))                                    // 138
  };                                                                                                              //
  file = RocketChatAssetsInstance.getFileWithReadStream(params.asset);                                            // 137
  if (file == null) {                                                                                             // 144
    if (((ref = assets[params.asset]) != null ? ref.defaultUrl : void 0) != null) {                               // 145
      res.writeHead(301, {                                                                                        // 146
        Location: Meteor.absoluteUrl(assets[params.asset].defaultUrl)                                             // 147
      });                                                                                                         //
    } else {                                                                                                      //
      res.writeHead(404);                                                                                         // 149
    }                                                                                                             //
    res.end();                                                                                                    // 145
    return;                                                                                                       // 151
  }                                                                                                               //
  reqModifiedHeader = req.headers["if-modified-since"];                                                           // 137
  if (reqModifiedHeader != null) {                                                                                // 154
    if (reqModifiedHeader === ((ref1 = file.uploadDate) != null ? ref1.toUTCString() : void 0)) {                 // 155
      res.setHeader('Last-Modified', reqModifiedHeader);                                                          // 156
      res.writeHead(304);                                                                                         // 156
      res.end();                                                                                                  // 156
      return;                                                                                                     // 159
    }                                                                                                             //
  }                                                                                                               //
  res.setHeader('Cache-Control', 'public, max-age=0');                                                            // 137
  res.setHeader('Expires', '-1');                                                                                 // 137
  res.setHeader('Last-Modified', ((ref2 = file.uploadDate) != null ? ref2.toUTCString() : void 0) || new Date().toUTCString());
  res.setHeader('Content-Type', file.contentType);                                                                // 137
  res.setHeader('Content-Length', file.length);                                                                   // 137
  file.readStream.pipe(res);                                                                                      // 137
}));                                                                                                              // 136
                                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:assets'] = {};

})();

//# sourceMappingURL=rocketchat_assets.js.map
