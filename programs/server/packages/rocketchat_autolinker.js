(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Autolinker = Package['konecty:autolinker'].Autolinker;
var RocketChat = Package['rocketchat:lib'].RocketChat;

/* Package-scope variables */
var __coffeescriptShare;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rocketchat_autolinker/autolinker.coffee.js                                 //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                       // 1
/*                                                                                     // 1
 * AutoLinker is a named function that will replace links on messages                  //
 * @param {Object} message - The message object                                        //
 */                                                                                    //
var AutoLinker;                                                                        // 1
                                                                                       //
AutoLinker = (function() {                                                             // 1
  function AutoLinker(message) {                                                       // 7
    var codeMatch, i, index, len, msgParts, part;                                      // 8
    if (_.trim(message.html)) {                                                        // 8
      msgParts = message.html.split(/(```\w*[\n ]?[\s\S]*?```+?)|(`(?:[^`]+)`)/);      // 10
      for (index = i = 0, len = msgParts.length; i < len; index = ++i) {               // 12
        part = msgParts[index];                                                        //
        if (((part != null ? part.length : void 0) != null) > 0) {                     // 13
          codeMatch = part.match(/(?:```(\w*)[\n ]?([\s\S]*?)```+?)|(?:`(?:[^`]+)`)/);
          if (codeMatch == null) {                                                     // 16
            msgParts[index] = Autolinker.link(part, {                                  // 17
              stripPrefix: false,                                                      // 18
              twitter: false,                                                          // 18
              replaceFn: function(autolinker, match) {                                 // 18
                if (match.getType() === 'url') {                                       // 21
                  return /(:\/\/|www\.).+/.test(match.matchedText);                    // 22
                }                                                                      //
                return true;                                                           // 23
              }                                                                        //
            });                                                                        //
          }                                                                            //
        }                                                                              //
      }                                                                                // 12
      message.html = msgParts.join('');                                                // 10
    }                                                                                  //
    return message;                                                                    // 28
  }                                                                                    //
                                                                                       //
  return AutoLinker;                                                                   //
                                                                                       //
})();                                                                                  //
                                                                                       //
RocketChat.callbacks.add('renderMessage', AutoLinker);                                 // 1
                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:autolinker'] = {};

})();

//# sourceMappingURL=rocketchat_autolinker.js.map
