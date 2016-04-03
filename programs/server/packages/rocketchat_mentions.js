(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var RocketChat = Package['rocketchat:lib'].RocketChat;

/* Package-scope variables */
var __coffeescriptShare;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_mentions/server.coffee.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                                                       // 1
/*                                                                                                                     // 1
 * Mentions is a named function that will process Mentions                                                             //
 * @param {Object} message - The message object                                                                        //
 */                                                                                                                    //
var MentionsServer;                                                                                                    // 1
                                                                                                                       //
MentionsServer = (function() {                                                                                         // 1
  function MentionsServer(message) {                                                                                   // 7
    var channels, mentions, msgChannelRegex, msgMentionRegex, verifiedChannels, verifiedMentions;                      // 9
    mentions = [];                                                                                                     // 9
    msgMentionRegex = new RegExp('(?:^|\\s|\\n)(?:@)(' + RocketChat.settings.get('UTF8_Names_Validation') + ')', 'g');
    message.msg.replace(msgMentionRegex, function(match, mention) {                                                    // 9
      return mentions.push(mention);                                                                                   //
    });                                                                                                                //
    if (mentions.length !== 0) {                                                                                       // 13
      mentions = _.unique(mentions);                                                                                   // 14
      verifiedMentions = [];                                                                                           // 14
      mentions.forEach(function(mention) {                                                                             // 14
        var verifiedMention;                                                                                           // 17
        if (mention === 'all') {                                                                                       // 17
          verifiedMention = {                                                                                          // 18
            _id: mention,                                                                                              // 19
            username: mention                                                                                          // 19
          };                                                                                                           //
        } else {                                                                                                       //
          verifiedMention = Meteor.users.findOne({                                                                     // 22
            username: mention                                                                                          // 22
          }, {                                                                                                         //
            fields: {                                                                                                  // 22
              _id: 1,                                                                                                  // 22
              username: 1                                                                                              // 22
            }                                                                                                          //
          });                                                                                                          //
        }                                                                                                              //
        if (verifiedMention != null) {                                                                                 // 24
          return verifiedMentions.push(verifiedMention);                                                               //
        }                                                                                                              //
      });                                                                                                              //
      if (verifiedMentions.length !== 0) {                                                                             // 25
        message.mentions = verifiedMentions;                                                                           // 26
      }                                                                                                                //
    }                                                                                                                  //
    channels = [];                                                                                                     // 9
    msgChannelRegex = new RegExp('(?:^|\\s|\\n)(?:#)(' + RocketChat.settings.get('UTF8_Names_Validation') + ')', 'g');
    message.msg.replace(msgChannelRegex, function(match, mention) {                                                    // 9
      return channels.push(mention);                                                                                   //
    });                                                                                                                //
    if (channels.length !== 0) {                                                                                       // 33
      channels = _.unique(channels);                                                                                   // 34
      verifiedChannels = [];                                                                                           // 34
      channels.forEach(function(mention) {                                                                             // 34
        var verifiedChannel;                                                                                           // 37
        verifiedChannel = RocketChat.models.Rooms.findOneByNameAndType(mention, 'c', {                                 // 37
          fields: {                                                                                                    // 37
            _id: 1,                                                                                                    // 37
            name: 1                                                                                                    // 37
          }                                                                                                            //
        });                                                                                                            //
        if (verifiedChannel != null) {                                                                                 // 38
          return verifiedChannels.push(verifiedChannel);                                                               //
        }                                                                                                              //
      });                                                                                                              //
      if (verifiedChannels.length !== 0) {                                                                             // 40
        message.channels = verifiedChannels;                                                                           // 41
      }                                                                                                                //
    }                                                                                                                  //
    return message;                                                                                                    // 42
  }                                                                                                                    //
                                                                                                                       //
  return MentionsServer;                                                                                               //
                                                                                                                       //
})();                                                                                                                  //
                                                                                                                       //
RocketChat.callbacks.add('beforeSaveMessage', MentionsServer, RocketChat.callbacks.priority.HIGH);                     // 1
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:mentions'] = {};

})();

//# sourceMappingURL=rocketchat_mentions.js.map
