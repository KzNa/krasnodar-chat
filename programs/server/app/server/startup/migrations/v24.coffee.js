(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/startup/migrations/v24.coffee.js                             //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.Migrations.add({                                            // 1
  version: 24,                                                         // 2
  up: function() {                                                     // 2
    return RocketChat.models.Permissions.remove({                      //
      _id: 'access-rocket-permissions'                                 // 4
    });                                                                //
  }                                                                    //
});                                                                    //
                                                                       //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=v24.coffee.js.map
