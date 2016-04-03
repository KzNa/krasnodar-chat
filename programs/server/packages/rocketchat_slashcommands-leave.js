(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var RocketChat = Package['rocketchat:lib'].RocketChat;

/* Package-scope variables */
var __coffeescriptShare;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rocketchat_slashcommands-leave/leave.coffee.js           //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                     // 1
/*                                                                   // 1
 * Leave is a named function that will replace /leave commands       //
 * @param {Object} message - The message object                      //
 */                                                                  //
var Leave;                                                           // 1
                                                                     //
if (Meteor.isClient) {                                               // 6
  RocketChat.slashCommands.add('leave', void 0, {                    // 7
    description: 'Leave the current channel',                        // 8
    params: ''                                                       // 8
  });                                                                //
  RocketChat.slashCommands.add('part', void 0, {                     // 7
    description: 'Leave the current channel',                        // 12
    params: ''                                                       // 12
  });                                                                //
} else {                                                             //
  Leave = (function() {                                              // 15
    function Leave(command, params, item) {                          // 16
      if (command === "leave" || command === "part") {               // 17
        Meteor.call('leaveRoom', item.rid);                          // 18
      }                                                              //
    }                                                                //
                                                                     //
    return Leave;                                                    //
                                                                     //
  })();                                                              //
  RocketChat.slashCommands.add('leave', Leave);                      // 15
  RocketChat.slashCommands.add('part', Leave);                       // 15
}                                                                    //
                                                                     //
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:slashcommands-leave'] = {};

})();

//# sourceMappingURL=rocketchat_slashcommands-leave.js.map
