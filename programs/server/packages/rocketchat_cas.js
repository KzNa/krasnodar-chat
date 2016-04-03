(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var Logger = Package['rocketchat:logger'].Logger;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var RoutePolicy = Package.routepolicy.RoutePolicy;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var Accounts = Package['accounts-base'].Accounts;
var AccountsServer = Package['accounts-base'].AccountsServer;
var _ = Package.underscore._;

/* Package-scope variables */
var logger, timer, data;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_cas/cas_rocketchat.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
logger = new Logger('CAS', {});                                                                                        // 1
                                                                                                                       // 2
Meteor.startup(function(){                                                                                             // 3
    RocketChat.settings.addGroup('CAS', function() {                                                                   // 4
        this.add("CAS_enabled", false, { type: 'boolean', group: 'CAS', public: true });                               // 5
        this.add("CAS_base_url" , '' , { type: 'string' , group: 'CAS', public: true });                               // 6
        this.add("CAS_login_url" , '' , { type: 'string' , group: 'CAS', public: true });                              // 7
        this.add("CAS_version" , '1.0' , { type: 'select', values: [{ key: '1.0', i18nLabel: '1.0'}], group: 'CAS' });
                                                                                                                       // 9
        this.section('CAS Login Layout', function() {                                                                  // 10
            this.add("CAS_popup_width" , '810' , { type: 'string' , group: 'CAS', public: true });                     // 11
            this.add("CAS_popup_height" , '610' , { type: 'string' , group: 'CAS', public: true });                    // 12
            this.add("CAS_button_label_text" , 'CAS' , { type: 'string' , group: 'CAS'});                              // 13
            this.add("CAS_button_label_color", '#FFFFFF' , { type: 'color' , group: 'CAS'});                           // 14
            this.add("CAS_button_color" , '#13679A' , { type: 'color' , group: 'CAS'});                                // 15
            this.add("CAS_autoclose", true , { type: 'boolean' , group: 'CAS'});                                       // 16
        });                                                                                                            // 17
    });                                                                                                                // 18
});                                                                                                                    // 19
                                                                                                                       // 20
timer = undefined                                                                                                      // 21
                                                                                                                       // 22
function updateServices(record) {                                                                                      // 23
    if( typeof timer != 'undefined' ) {                                                                                // 24
        Meteor.clearTimeout(timer);                                                                                    // 25
    }                                                                                                                  // 26
                                                                                                                       // 27
    timer = Meteor.setTimeout(function() {                                                                             // 28
        data = {                                                                                                       // 29
            // These will pe passed to 'node-cas' as options                                                           // 30
            enabled:          RocketChat.settings.get("CAS_enabled"),                                                  // 31
            base_url:         RocketChat.settings.get("CAS_base_url"),                                                 // 32
            login_url:        RocketChat.settings.get("CAS_login_url"),                                                // 33
            // Rocketchat Visuals                                                                                      // 34
            buttonLabelText:  RocketChat.settings.get("CAS_button_label_text"),                                        // 35
            buttonLabelColor: RocketChat.settings.get("CAS_button_label_color"),                                       // 36
            buttonColor:      RocketChat.settings.get("CAS_button_color"),                                             // 37
            width:            RocketChat.settings.get("CAS_popup_width"),                                              // 38
            height:           RocketChat.settings.get("CAS_popup_height"),                                             // 39
            autoclose:        RocketChat.settings.get("CAS_autoclose"),                                                // 40
        };                                                                                                             // 41
                                                                                                                       // 42
        // Either register or deregister the CAS login service based upon its configuration                            // 43
        if( data.enabled ) {                                                                                           // 44
            logger.info("Enabling CAS login service")                                                                  // 45
            ServiceConfiguration.configurations.upsert({service: 'cas'}, { $set: data });                              // 46
        } else {                                                                                                       // 47
            logger.info("Disabling CAS login service");                                                                // 48
            ServiceConfiguration.configurations.remove({service: 'cas'});                                              // 49
        }                                                                                                              // 50
    }, 2000);                                                                                                          // 51
};                                                                                                                     // 52
                                                                                                                       // 53
function check_record (record) {                                                                                       // 54
    if( /^CAS_.+/.test( record._id )){                                                                                 // 55
        updateServices( record );                                                                                      // 56
    }                                                                                                                  // 57
};                                                                                                                     // 58
                                                                                                                       // 59
RocketChat.models.Settings.find().observe({                                                                            // 60
    added: check_record,                                                                                               // 61
    changed: check_record,                                                                                             // 62
    removed: check_record                                                                                              // 63
});                                                                                                                    // 64
                                                                                                                       // 65
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_cas/cas_server.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Fiber = Npm.require('fibers');                                                                                     // 1
var url = Npm.require('url');                                                                                          // 2
var CAS = Npm.require('cas');                                                                                          // 3
                                                                                                                       // 4
var _casCredentialTokens = {};                                                                                         // 5
                                                                                                                       // 6
RoutePolicy.declare('/_cas/', 'network');                                                                              // 7
                                                                                                                       // 8
// Listen to incoming OAuth http requests                                                                              // 9
WebApp.connectHandlers.use(function(req, res, next) {                                                                  // 10
    // Need to create a Fiber since we're using synchronous http calls and nothing                                     // 11
    // else is wrapping this in a fiber automatically                                                                  // 12
    Fiber(function () {                                                                                                // 13
        middleware(req, res, next);                                                                                    // 14
    }).run();                                                                                                          // 15
});                                                                                                                    // 16
                                                                                                                       // 17
var middleware = function (req, res, next) {                                                                           // 18
    // Make sure to catch any exceptions because otherwise we'd crash                                                  // 19
    // the runner                                                                                                      // 20
    try {                                                                                                              // 21
        var barePath = req.url.substring(0, req.url.indexOf('?'));                                                     // 22
        var splitPath = barePath.split('/');                                                                           // 23
                                                                                                                       // 24
        // Any non-cas request will continue down the default                                                          // 25
        // middlewares.                                                                                                // 26
        if (splitPath[1] !== '_cas') {                                                                                 // 27
            next();                                                                                                    // 28
            return;                                                                                                    // 29
        }                                                                                                              // 30
                                                                                                                       // 31
        // get auth token                                                                                              // 32
        var credentialToken = splitPath[2];                                                                            // 33
        if (!credentialToken) {                                                                                        // 34
            closePopup(res);                                                                                           // 35
            return;                                                                                                    // 36
        }                                                                                                              // 37
                                                                                                                       // 38
        // validate ticket                                                                                             // 39
        casTicket(req, credentialToken, function() {                                                                   // 40
            closePopup(res);                                                                                           // 41
        });                                                                                                            // 42
                                                                                                                       // 43
    } catch (err) {                                                                                                    // 44
        logger.error("Unexpected error : " + err.message);                                                             // 45
        closePopup(res);                                                                                               // 46
    }                                                                                                                  // 47
};                                                                                                                     // 48
                                                                                                                       // 49
var casTicket = function (req, token, callback) {                                                                      // 50
                                                                                                                       // 51
    // get configuration                                                                                               // 52
    if (!RocketChat.settings.get("CAS_enabled")) {                                                                     // 53
        logger.error("Got ticket validation request, but CAS is not enabled");                                         // 54
        callback();                                                                                                    // 55
    }                                                                                                                  // 56
                                                                                                                       // 57
    // get ticket and validate.                                                                                        // 58
    var parsedUrl = url.parse(req.url, true);                                                                          // 59
    var ticketId = parsedUrl.query.ticket;                                                                             // 60
    var baseUrl = RocketChat.settings.get("CAS_base_url");                                                             // 61
    logger.debug("Using CAS_base_url: " + baseUrl);                                                                    // 62
                                                                                                                       // 63
    var cas = new CAS({                                                                                                // 64
        base_url: baseUrl,                                                                                             // 65
        service: Meteor.absoluteUrl() + "_cas/" + token                                                                // 66
    });                                                                                                                // 67
                                                                                                                       // 68
    cas.validate(ticketId, function(err, status, username) {                                                           // 69
        if (err) {                                                                                                     // 70
            logger.error("error when trying to validate " + err);                                                      // 71
        } else {                                                                                                       // 72
            if (status) {                                                                                              // 73
                logger.info("Validated user: " + username);                                                            // 74
                _casCredentialTokens[token] = { id: username };                                                        // 75
            } else {                                                                                                   // 76
                logger.error("Unable to validate ticket: " + ticketId);                                                // 77
            }                                                                                                          // 78
        }                                                                                                              // 79
                                                                                                                       // 80
        callback();                                                                                                    // 81
  });                                                                                                                  // 82
                                                                                                                       // 83
  return;                                                                                                              // 84
};                                                                                                                     // 85
                                                                                                                       // 86
/*                                                                                                                     // 87
 * Register a server-side login handle.                                                                                // 88
 * It is call after Accounts.callLoginMethod() is call from client.                                                    // 89
 *                                                                                                                     // 90
 */                                                                                                                    // 91
 Accounts.registerLoginHandler(function (options) {                                                                    // 92
                                                                                                                       // 93
    if (!options.cas)                                                                                                  // 94
        return undefined;                                                                                              // 95
                                                                                                                       // 96
    if (!_hasCredential(options.cas.credentialToken)) {                                                                // 97
        throw new Meteor.Error(Accounts.LoginCancelledError.numericError,                                              // 98
        'no matching login attempt found');                                                                            // 99
    }                                                                                                                  // 100
                                                                                                                       // 101
    var result = _retrieveCredential(options.cas.credentialToken);                                                     // 102
    var options = { profile: { name: result.id } };                                                                    // 103
                                                                                                                       // 104
    // Search existing user by its external service id                                                                 // 105
    logger.debug("Looking up user with username: " + result.id );                                                      // 106
    var user = Meteor.users.findOne({ 'services.cas.external_id': result.id });                                        // 107
                                                                                                                       // 108
    if (user) {                                                                                                        // 109
        logger.debug("Using existing user for '" + result.id + "' with id: " + user._id);                              // 110
    } else {                                                                                                           // 111
                                                                                                                       // 112
        // Define new user                                                                                             // 113
        var newUser = {                                                                                                // 114
            username: result.id,                                                                                       // 115
            active: true,                                                                                              // 116
            globalRoles: ['user'],                                                                                     // 117
            services: {                                                                                                // 118
                cas: {                                                                                                 // 119
                    external_id: result.id                                                                             // 120
                }                                                                                                      // 121
            }                                                                                                          // 122
        };                                                                                                             // 123
                                                                                                                       // 124
        // Create the user                                                                                             // 125
        logger.debug("User '" + result.id + "'does not exist yet, creating it");                                       // 126
        var userId = Accounts.insertUserDoc({}, newUser);                                                              // 127
                                                                                                                       // 128
        // Fetch and use it                                                                                            // 129
        user = Meteor.users.findOne(userId);                                                                           // 130
        logger.debug("Created new user for '" + result.id + "' with id: " + user._id);                                 // 131
                                                                                                                       // 132
        logger.debug('Joining user to default channels');                                                              // 133
        Meteor.runAsUser(user._id, function() {                                                                        // 134
            Meteor.call('joinDefaultChannels');                                                                        // 135
        });                                                                                                            // 136
                                                                                                                       // 137
    }                                                                                                                  // 138
                                                                                                                       // 139
    return { userId: user._id };                                                                                       // 140
});                                                                                                                    // 141
                                                                                                                       // 142
var _hasCredential = function(credentialToken) {                                                                       // 143
    return _.has(_casCredentialTokens, credentialToken);                                                               // 144
}                                                                                                                      // 145
                                                                                                                       // 146
/*                                                                                                                     // 147
 * Retrieve token and delete it to avoid replaying it.                                                                 // 148
 */                                                                                                                    // 149
var _retrieveCredential = function(credentialToken) {                                                                  // 150
    var result = _casCredentialTokens[credentialToken];                                                                // 151
    delete _casCredentialTokens[credentialToken];                                                                      // 152
    return result;                                                                                                     // 153
}                                                                                                                      // 154
                                                                                                                       // 155
var closePopup = function(res) {                                                                                       // 156
    res.writeHead(200, {'Content-Type': 'text/html'});                                                                 // 157
    var content = '<html><head><script>window.close()</script></head></html>';                                         // 158
    res.end(content, 'utf-8');                                                                                         // 159
}                                                                                                                      // 160
                                                                                                                       // 161
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:cas'] = {};

})();

//# sourceMappingURL=rocketchat_cas.js.map
