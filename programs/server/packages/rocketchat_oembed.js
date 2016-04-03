(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var changeCase = Package['konecty:change-case'].changeCase;
var RocketChat = Package['rocketchat:lib'].RocketChat;

/* Package-scope variables */
var __coffeescriptShare, OEmbed;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_oembed/server/server.coffee.js                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var URL, getRelevantHeaders, getRelevantMetaTags, getUrlContent, gunzipSync, http, https, inflateSync, querystring, zlib;        
                                                                                                                      //
URL = Npm.require('url');                                                                                             // 1
                                                                                                                      //
http = Npm.require('http');                                                                                           // 1
                                                                                                                      //
https = Npm.require('https');                                                                                         // 1
                                                                                                                      //
zlib = Npm.require('zlib');                                                                                           // 1
                                                                                                                      //
querystring = Npm.require('querystring');                                                                             // 1
                                                                                                                      //
gunzipSync = Meteor.wrapAsync(zlib.gunzip.bind(zlib));                                                                // 1
                                                                                                                      //
inflateSync = Meteor.wrapAsync(zlib.inflate.bind(zlib));                                                              // 1
                                                                                                                      //
OEmbed = {};                                                                                                          // 1
                                                                                                                      //
getUrlContent = function(urlObj, redirectCount, callback) {                                                           // 1
  var httpOrHttps, opts, parsedUrl, request;                                                                          // 13
  if (redirectCount == null) {                                                                                        //
    redirectCount = 5;                                                                                                //
  }                                                                                                                   //
  if (_.isString(urlObj)) {                                                                                           // 13
    urlObj = URL.parse(urlObj);                                                                                       // 14
  }                                                                                                                   //
  opts = {                                                                                                            // 13
    method: 'GET',                                                                                                    // 17
    port: urlObj.port,                                                                                                // 17
    hostname: urlObj.hostname,                                                                                        // 17
    path: urlObj.path,                                                                                                // 17
    rejectUnauthorized: !RocketChat.settings.get('Allow_Invalid_SelfSigned_Certs'),                                   // 17
    headers: {                                                                                                        // 17
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36'
    }                                                                                                                 //
  };                                                                                                                  //
  httpOrHttps = urlObj.protocol === 'https:' ? https : http;                                                          // 13
  parsedUrl = _.pick(urlObj, ['host', 'hash', 'pathname', 'protocol', 'port', 'query', 'search']);                    // 13
  RocketChat.callbacks.run('oembed:beforeGetUrlContent', {                                                            // 13
    requestOptions: opts,                                                                                             // 30
    parsedUrl: parsedUrl                                                                                              // 30
  });                                                                                                                 //
  request = httpOrHttps.request(opts, Meteor.bindEnvironment(function(response) {                                     // 13
    var chunks, chunksTotalLength, ref;                                                                               // 34
    if (((ref = response.statusCode) === 301 || ref === 302 || ref === 307) && (response.headers.location != null)) {
      request.abort();                                                                                                // 35
      console.log(response.headers.location);                                                                         // 35
      if (redirectCount <= 0) {                                                                                       // 38
        return callback(null, {                                                                                       // 39
          parsedUrl: parsedUrl                                                                                        // 39
        });                                                                                                           //
      }                                                                                                               //
      getUrlContent(response.headers.location, --redirectCount, callback);                                            // 35
      return;                                                                                                         // 42
    }                                                                                                                 //
    if (response.statusCode !== 200) {                                                                                // 44
      return callback(null, {                                                                                         // 45
        parsedUrl: parsedUrl                                                                                          // 45
      });                                                                                                             //
    }                                                                                                                 //
    chunks = [];                                                                                                      // 34
    chunksTotalLength = 0;                                                                                            // 34
    response.on('data', function(chunk) {                                                                             // 34
      chunks.push(chunk);                                                                                             // 50
      chunksTotalLength += chunk.length;                                                                              // 50
      if (chunksTotalLength > 250000) {                                                                               // 52
        return request.abort();                                                                                       //
      }                                                                                                               //
    });                                                                                                               //
    response.on('end', Meteor.bindEnvironment(function() {                                                            // 34
      var buffer;                                                                                                     // 56
      buffer = Buffer.concat(chunks);                                                                                 // 56
      try {                                                                                                           // 58
        if (response.headers['content-encoding'] === 'gzip') {                                                        // 59
          buffer = gunzipSync(buffer);                                                                                // 60
        } else if (response.headers['content-encoding'] === 'deflate') {                                              //
          buffer = inflateSync(buffer);                                                                               // 62
        }                                                                                                             //
      } catch (_error) {}                                                                                             //
      return callback(null, {                                                                                         //
        headers: response.headers,                                                                                    // 64
        body: buffer.toString(),                                                                                      // 64
        parsedUrl: parsedUrl                                                                                          // 64
      });                                                                                                             //
    }));                                                                                                              //
    return response.on('error', function(error) {                                                                     //
      return callback(null, {                                                                                         //
        error: error,                                                                                                 // 71
        parsedUrl: parsedUrl                                                                                          // 71
      });                                                                                                             //
    });                                                                                                               //
  }));                                                                                                                //
  request.on('error', function(error) {                                                                               // 13
    return callback(null, {                                                                                           //
      error: error,                                                                                                   // 77
      parsedUrl: parsedUrl                                                                                            // 77
    });                                                                                                               //
  });                                                                                                                 //
  return request.end();                                                                                               //
};                                                                                                                    // 12
                                                                                                                      //
OEmbed.getUrlMeta = function(url, withFragment) {                                                                     // 1
  var content, getUrlContentSync, header, headers, metas, path, queryStringObj, ref, urlObj, value;                   // 85
  getUrlContentSync = Meteor.wrapAsync(getUrlContent);                                                                // 85
  urlObj = URL.parse(url);                                                                                            // 85
  if (withFragment != null) {                                                                                         // 89
    queryStringObj = querystring.parse(urlObj.query);                                                                 // 90
    queryStringObj._escaped_fragment_ = '';                                                                           // 90
    urlObj.query = querystring.stringify(queryStringObj);                                                             // 90
    path = urlObj.pathname;                                                                                           // 90
    if (urlObj.query != null) {                                                                                       // 95
      path += '?' + urlObj.query;                                                                                     // 96
    }                                                                                                                 //
    urlObj.path = path;                                                                                               // 90
  }                                                                                                                   //
  content = getUrlContentSync(urlObj, 5);                                                                             // 85
  metas = void 0;                                                                                                     // 85
  if ((content != null ? content.body : void 0) != null) {                                                            // 104
    metas = {};                                                                                                       // 105
    content.body.replace(/<title>((.|\n)+?)<\/title>/gmi, function(meta, title) {                                     // 105
      return metas.pageTitle = title;                                                                                 //
    });                                                                                                               //
    content.body.replace(/<meta[^>]*(?:name|property)=[']([^']*)['][^>]*content=[']([^']*)['][^>]*>/gmi, function(meta, name, value) {
      return metas[changeCase.camelCase(name)] = value;                                                               //
    });                                                                                                               //
    content.body.replace(/<meta[^>]*(?:name|property)=["]([^"]*)["][^>]*content=["]([^"]*)["][^>]*>/gmi, function(meta, name, value) {
      return metas[changeCase.camelCase(name)] = value;                                                               //
    });                                                                                                               //
    content.body.replace(/<meta[^>]*content=[']([^']*)['][^>]*(?:name|property)=[']([^']*)['][^>]*>/gmi, function(meta, value, name) {
      return metas[changeCase.camelCase(name)] = value;                                                               //
    });                                                                                                               //
    content.body.replace(/<meta[^>]*content=["]([^"]*)["][^>]*(?:name|property)=["]([^"]*)["][^>]*>/gmi, function(meta, value, name) {
      return metas[changeCase.camelCase(name)] = value;                                                               //
    });                                                                                                               //
    if (metas.fragment === '!' && (withFragment == null)) {                                                           // 122
      return OEmbed.getUrlMeta(url, true);                                                                            // 123
    }                                                                                                                 //
  }                                                                                                                   //
  headers = void 0;                                                                                                   // 85
  if ((content != null ? content.headers : void 0) != null) {                                                         // 127
    headers = {};                                                                                                     // 128
    ref = content.headers;                                                                                            // 129
    for (header in ref) {                                                                                             // 129
      value = ref[header];                                                                                            //
      headers[changeCase.camelCase(header)] = value;                                                                  // 130
    }                                                                                                                 // 129
  }                                                                                                                   //
  RocketChat.callbacks.run('oembed:afterParseContent', {                                                              // 85
    meta: metas,                                                                                                      // 133
    headers: headers,                                                                                                 // 133
    parsedUrl: content.parsedUrl,                                                                                     // 133
    content: content                                                                                                  // 133
  });                                                                                                                 //
  return {                                                                                                            // 138
    meta: metas,                                                                                                      // 138
    headers: headers,                                                                                                 // 138
    parsedUrl: content.parsedUrl                                                                                      // 138
  };                                                                                                                  //
};                                                                                                                    // 84
                                                                                                                      //
OEmbed.getUrlMetaWithCache = function(url, withFragment) {                                                            // 1
  var cache, data;                                                                                                    // 145
  cache = RocketChat.models.OEmbedCache.findOneById(url);                                                             // 145
  if (cache != null) {                                                                                                // 146
    return cache.data;                                                                                                // 147
  }                                                                                                                   //
  data = OEmbed.getUrlMeta(url, withFragment);                                                                        // 145
  if (data != null) {                                                                                                 // 151
    RocketChat.models.OEmbedCache.createWithIdAndData(url, data);                                                     // 152
    return data;                                                                                                      // 154
  }                                                                                                                   //
};                                                                                                                    // 144
                                                                                                                      //
getRelevantHeaders = function(headersObj) {                                                                           // 1
  var headers, key, ref, value;                                                                                       // 159
  headers = {};                                                                                                       // 159
  for (key in headersObj) {                                                                                           // 160
    value = headersObj[key];                                                                                          //
    if (((ref = key.toLowerCase()) === 'contenttype' || ref === 'contentlength') && (value != null ? value.trim() : void 0) !== '') {
      headers[key] = value;                                                                                           // 162
    }                                                                                                                 //
  }                                                                                                                   // 160
  if (Object.keys(headers).length > 0) {                                                                              // 164
    return headers;                                                                                                   // 165
  }                                                                                                                   //
};                                                                                                                    // 158
                                                                                                                      //
getRelevantMetaTags = function(metaObj) {                                                                             // 1
  var key, tags, value;                                                                                               // 169
  tags = {};                                                                                                          // 169
  for (key in metaObj) {                                                                                              // 170
    value = metaObj[key];                                                                                             //
    if (/^(og|fb|twitter|oembed).+|description|title|pageTitle$/.test(key.toLowerCase()) && (value != null ? value.trim() : void 0) !== '') {
      tags[key] = value;                                                                                              // 172
    }                                                                                                                 //
  }                                                                                                                   // 170
  if (Object.keys(tags).length > 0) {                                                                                 // 174
    return tags;                                                                                                      // 175
  }                                                                                                                   //
};                                                                                                                    // 168
                                                                                                                      //
OEmbed.RocketUrlParser = function(message) {                                                                          // 1
  var changed, data, i, item, len, ref;                                                                               // 179
  if (Array.isArray(message.urls)) {                                                                                  // 179
    changed = false;                                                                                                  // 180
    ref = message.urls;                                                                                               // 181
    for (i = 0, len = ref.length; i < len; i++) {                                                                     // 181
      item = ref[i];                                                                                                  //
      data = OEmbed.getUrlMetaWithCache(item.url);                                                                    // 182
      if (data != null) {                                                                                             // 184
        if (data.meta != null) {                                                                                      // 185
          item.meta = getRelevantMetaTags(data.meta);                                                                 // 186
        }                                                                                                             //
        if (data.headers != null) {                                                                                   // 188
          item.headers = getRelevantHeaders(data.headers);                                                            // 189
        }                                                                                                             //
        item.parsedUrl = data.parsedUrl;                                                                              // 185
        changed = true;                                                                                               // 185
      }                                                                                                               //
    }                                                                                                                 // 181
    if (changed === true) {                                                                                           // 194
      RocketChat.models.Messages.setUrlsById(message._id, message.urls);                                              // 195
    }                                                                                                                 //
  }                                                                                                                   //
  return message;                                                                                                     // 197
};                                                                                                                    // 178
                                                                                                                      //
RocketChat.settings.get('API_Embed', function(key, value) {                                                           // 1
  if (value) {                                                                                                        // 200
    return RocketChat.callbacks.add('afterSaveMessage', OEmbed.RocketUrlParser, RocketChat.callbacks.priority.LOW, 'API_Embed');
  } else {                                                                                                            //
    return RocketChat.callbacks.remove('afterSaveMessage', 'API_Embed');                                              //
  }                                                                                                                   //
});                                                                                                                   // 199
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_oembed/server/providers.coffee.js                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Providers, QueryString, URL, providers;                                                                           // 1
                                                                                                                      //
URL = Npm.require('url');                                                                                             // 1
                                                                                                                      //
QueryString = Npm.require('querystring');                                                                             // 1
                                                                                                                      //
Providers = (function() {                                                                                             // 1
  function Providers() {}                                                                                             //
                                                                                                                      //
  Providers.prototype.providers = [];                                                                                 // 5
                                                                                                                      //
  Providers.getConsumerUrl = function(provider, url) {                                                                // 5
    var urlObj;                                                                                                       // 8
    urlObj = URL.parse(provider.endPoint, true);                                                                      // 8
    urlObj.query['url'] = url;                                                                                        // 8
    delete urlObj.search;                                                                                             // 8
    return URL.format(urlObj);                                                                                        // 11
  };                                                                                                                  //
                                                                                                                      //
  Providers.prototype.registerProvider = function(provider) {                                                         // 5
    return this.providers.push(provider);                                                                             //
  };                                                                                                                  //
                                                                                                                      //
  Providers.prototype.getProviders = function() {                                                                     // 5
    return this.providers;                                                                                            // 17
  };                                                                                                                  //
                                                                                                                      //
  Providers.prototype.getProviderForUrl = function(url) {                                                             // 5
    return _.find(this.providers, function(provider) {                                                                // 20
      var candidate;                                                                                                  // 21
      candidate = _.find(provider.urls, function(re) {                                                                // 21
        return re.test(url);                                                                                          // 22
      });                                                                                                             //
      return candidate != null;                                                                                       // 23
    });                                                                                                               //
  };                                                                                                                  //
                                                                                                                      //
  return Providers;                                                                                                   //
                                                                                                                      //
})();                                                                                                                 //
                                                                                                                      //
providers = new Providers();                                                                                          // 1
                                                                                                                      //
providers.registerProvider({                                                                                          // 1
  urls: [new RegExp('https?://soundcloud.com/\\S+')],                                                                 // 27
  endPoint: 'https://soundcloud.com/oembed?format=json&maxheight=150'                                                 // 27
});                                                                                                                   //
                                                                                                                      //
providers.registerProvider({                                                                                          // 1
  urls: [new RegExp('https?://vimeo.com/[^/]+'), new RegExp('https?://vimeo.com/channels/[^/]+/[^/]+'), new RegExp('https://vimeo.com/groups/[^/]+/videos/[^/]+')],
  endPoint: 'https://vimeo.com/api/oembed.json?maxheight=200'                                                         // 30
});                                                                                                                   //
                                                                                                                      //
providers.registerProvider({                                                                                          // 1
  urls: [new RegExp('https?://www.youtube.com/\\S+'), new RegExp('https?://www.youtu.be/\\S+')],                      // 33
  endPoint: 'https://www.youtube.com/oembed?maxheight=200'                                                            // 33
});                                                                                                                   //
                                                                                                                      //
providers.registerProvider({                                                                                          // 1
  urls: [new RegExp('https?://www.rdio.com/\\S+'), new RegExp('https?://rd.io/\\S+')],                                // 36
  endPoint: 'https://www.rdio.com/api/oembed/?format=json&maxheight=150'                                              // 36
});                                                                                                                   //
                                                                                                                      //
providers.registerProvider({                                                                                          // 1
  urls: [new RegExp('https?://www.slideshare.net/[^/]+/[^/]+')],                                                      // 39
  endPoint: 'https://www.slideshare.net/api/oembed/2?format=json&maxheight=200'                                       // 39
});                                                                                                                   //
                                                                                                                      //
providers.registerProvider({                                                                                          // 1
  urls: [new RegExp('https?://www.dailymotion.com/video/\\S+')],                                                      // 42
  endPoint: 'https://www.dailymotion.com/services/oembed?maxheight=200'                                               // 42
});                                                                                                                   //
                                                                                                                      //
RocketChat.oembed = {};                                                                                               // 1
                                                                                                                      //
RocketChat.oembed.providers = providers;                                                                              // 1
                                                                                                                      //
RocketChat.callbacks.add('oembed:beforeGetUrlContent', function(data) {                                               // 1
  var consumerUrl, provider, url;                                                                                     // 49
  if (data.parsedUrl != null) {                                                                                       // 49
    url = URL.format(data.parsedUrl);                                                                                 // 50
    provider = providers.getProviderForUrl(url);                                                                      // 50
    if (provider != null) {                                                                                           // 52
      consumerUrl = Providers.getConsumerUrl(provider, url);                                                          // 53
      consumerUrl = URL.parse(consumerUrl, true);                                                                     // 53
      _.extend(data.parsedUrl, consumerUrl);                                                                          // 53
      data.requestOptions.port = consumerUrl.port;                                                                    // 53
      data.requestOptions.hostname = consumerUrl.hostname;                                                            // 53
      return data.requestOptions.path = consumerUrl.path;                                                             //
    }                                                                                                                 //
  }                                                                                                                   //
});                                                                                                                   // 48
                                                                                                                      //
RocketChat.callbacks.add('oembed:afterParseContent', function(data) {                                                 // 1
  var metas, provider, queryString, ref, ref1, url;                                                                   // 61
  if (((ref = data.parsedUrl) != null ? ref.query : void 0) != null) {                                                // 61
    queryString = data.parsedUrl.query;                                                                               // 62
    if (_.isString(data.parsedUrl.query)) {                                                                           // 63
      queryString = QueryString.parse(data.parsedUrl.query);                                                          // 64
    }                                                                                                                 //
    if (queryString.url != null) {                                                                                    // 65
      url = queryString.url;                                                                                          // 66
      provider = providers.getProviderForUrl(url);                                                                    // 66
      if (provider != null) {                                                                                         // 68
        if (((ref1 = data.content) != null ? ref1.body : void 0) != null) {                                           // 69
          metas = JSON.parse(data.content.body);                                                                      // 70
          _.each(metas, function(value, key) {                                                                        // 70
            if (_.isString(value)) {                                                                                  // 72
              return data.meta[changeCase.camelCase('oembed_' + key)] = value;                                        //
            }                                                                                                         //
          });                                                                                                         //
          return data.meta['oembedUrl'] = url;                                                                        //
        }                                                                                                             //
      }                                                                                                               //
    }                                                                                                                 //
  }                                                                                                                   //
});                                                                                                                   // 60
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_oembed/server/models/OEmbedCache.coffee.js                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;                                                                                        //
                                                                                                                      //
RocketChat.models.OEmbedCache = new ((function(superClass) {                                                          // 1
  extend(_Class, superClass);                                                                                         // 2
                                                                                                                      //
  function _Class() {                                                                                                 // 2
    this._initModel('oembed_cache');                                                                                  // 3
  }                                                                                                                   //
                                                                                                                      //
  _Class.prototype.findOneById = function(_id, options) {                                                             // 2
    var query;                                                                                                        // 8
    query = {                                                                                                         // 8
      _id: _id                                                                                                        // 9
    };                                                                                                                //
    return this.findOne(query, options);                                                                              // 11
  };                                                                                                                  //
                                                                                                                      //
  _Class.prototype.createWithIdAndData = function(_id, data) {                                                        // 2
    var record;                                                                                                       // 16
    record = {                                                                                                        // 16
      _id: _id,                                                                                                       // 17
      data: data,                                                                                                     // 17
      updatedAt: new Date                                                                                             // 17
    };                                                                                                                //
    record._id = this.insert(record);                                                                                 // 16
    return record;                                                                                                    // 22
  };                                                                                                                  //
                                                                                                                      //
  return _Class;                                                                                                      //
                                                                                                                      //
})(RocketChat.models._Base));                                                                                         //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:oembed'] = {
  OEmbed: OEmbed
};

})();

//# sourceMappingURL=rocketchat_oembed.js.map
