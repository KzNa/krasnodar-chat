(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/startup/cron.coffee.js                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var generateStatistics;                                                // 2
                                                                       //
SyncedCron.config({                                                    // 2
  collectionName: 'rocketchat_cron_history'                            // 3
});                                                                    //
                                                                       //
generateStatistics = function() {                                      // 2
  var statistics;                                                      // 6
  statistics = RocketChat.statistics.save();                           // 6
  statistics.host = Meteor.absoluteUrl();                              // 6
  if (!RocketChat.settings.get('Statistics_opt_out')) {                // 8
    HTTP.post('https://rocket.chat/stats', {                           // 9
      data: statistics                                                 // 10
    });                                                                //
  }                                                                    //
};                                                                     // 5
                                                                       //
Meteor.startup(function() {                                            // 2
  return Meteor.defer(function() {                                     //
    generateStatistics();                                              // 15
    SyncedCron.add({                                                   // 15
      name: 'Generate and save statistics',                            // 19
      schedule: function(parser) {                                     // 19
        return parser.text('every 1 hour');                            // 21
      },                                                               //
      job: generateStatistics                                          // 19
    });                                                                //
    return SyncedCron.start();                                         //
  });                                                                  //
});                                                                    // 13
                                                                       //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=cron.coffee.js.map
