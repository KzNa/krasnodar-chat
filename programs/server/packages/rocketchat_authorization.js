(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;

/* Package-scope variables */
var __coffeescriptShare, subscriptions, users, translations;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/lib/rocketchat.coffee.js                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.authz = {};                                                                                               // 1
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/models/Permissions.coffee.js                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;                                                                                       //
                                                                                                                     //
RocketChat.models.Permissions = new ((function(superClass) {                                                         // 1
  extend(_Class, superClass);                                                                                        // 2
                                                                                                                     //
  function _Class() {                                                                                                // 2
    this._initModel('permissions');                                                                                  // 3
  }                                                                                                                  //
                                                                                                                     //
  _Class.prototype.findByRole = function(role, options) {                                                            // 2
    var query;                                                                                                       // 7
    query = {                                                                                                        // 7
      roles: role                                                                                                    // 8
    };                                                                                                               //
    return this.find(query, options);                                                                                // 10
  };                                                                                                                 //
                                                                                                                     //
  _Class.prototype.findOneById = function(_id) {                                                                     // 2
    return this.findOne(_id);                                                                                        // 13
  };                                                                                                                 //
                                                                                                                     //
  _Class.prototype.createOrUpdate = function(name, roles) {                                                          // 2
    return this.upsert({                                                                                             //
      _id: name                                                                                                      // 16
    }, {                                                                                                             //
      $set: {                                                                                                        // 16
        roles: roles                                                                                                 // 16
      }                                                                                                              //
    });                                                                                                              //
  };                                                                                                                 //
                                                                                                                     //
  _Class.prototype.addRole = function(permission, role) {                                                            // 2
    return this.update({                                                                                             //
      _id: permission                                                                                                // 19
    }, {                                                                                                             //
      $addToSet: {                                                                                                   // 19
        roles: role                                                                                                  // 19
      }                                                                                                              //
    });                                                                                                              //
  };                                                                                                                 //
                                                                                                                     //
  _Class.prototype.removeRole = function(permission, role) {                                                         // 2
    return this.update({                                                                                             //
      _id: permission                                                                                                // 22
    }, {                                                                                                             //
      $pull: {                                                                                                       // 22
        roles: role                                                                                                  // 22
      }                                                                                                              //
    });                                                                                                              //
  };                                                                                                                 //
                                                                                                                     //
  return _Class;                                                                                                     //
                                                                                                                     //
})(RocketChat.models._Base));                                                                                        //
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/models/Roles.coffee.js                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;                                                                                       //
                                                                                                                     //
RocketChat.models.Roles = new ((function(superClass) {                                                               // 1
  extend(_Class, superClass);                                                                                        // 2
                                                                                                                     //
  function _Class() {                                                                                                // 2
    this._initModel('roles');                                                                                        // 3
    this.tryEnsureIndex({                                                                                            // 3
      'name': 1                                                                                                      // 4
    });                                                                                                              //
    this.tryEnsureIndex({                                                                                            // 3
      'scope': 1                                                                                                     // 5
    });                                                                                                              //
  }                                                                                                                  //
                                                                                                                     //
  _Class.prototype.findUsersInRole = function(name, scope, options) {                                                // 2
    var ref, role, roleScope;                                                                                        // 8
    role = this.findOne(name);                                                                                       // 8
    roleScope = (role != null ? role.scope : void 0) || 'Users';                                                     // 8
    return (ref = RocketChat.models[roleScope]) != null ? typeof ref.findUsersInRoles === "function" ? ref.findUsersInRoles(name, scope, options) : void 0 : void 0;
  };                                                                                                                 //
                                                                                                                     //
  _Class.prototype.isUserInRoles = function(userId, roles, scope) {                                                  // 2
    roles = [].concat(roles);                                                                                        // 13
    return _.some(roles, (function(_this) {                                                                          //
      return function(roleName) {                                                                                    //
        var ref, role, roleScope;                                                                                    // 15
        role = _this.findOne(roleName);                                                                              // 15
        roleScope = (role != null ? role.scope : void 0) || 'Users';                                                 // 15
        return (ref = RocketChat.models[roleScope]) != null ? typeof ref.isUserInRole === "function" ? ref.isUserInRole(userId, roleName, scope) : void 0 : void 0;
      };                                                                                                             //
    })(this));                                                                                                       //
  };                                                                                                                 //
                                                                                                                     //
  _Class.prototype.createOrUpdate = function(name, scope, description, protectedRole) {                              // 2
    var updateData;                                                                                                  // 20
    if (scope == null) {                                                                                             //
      scope = 'Users';                                                                                               //
    }                                                                                                                //
    updateData = {};                                                                                                 // 20
    updateData.name = name;                                                                                          // 20
    updateData.scope = scope;                                                                                        // 20
    if (description != null) {                                                                                       // 24
      updateData.description = description;                                                                          // 25
    }                                                                                                                //
    if (protectedRole != null) {                                                                                     // 26
      updateData["protected"] = protectedRole;                                                                       // 27
    }                                                                                                                //
    return this.upsert({                                                                                             //
      _id: name                                                                                                      // 29
    }, {                                                                                                             //
      $set: updateData                                                                                               // 29
    });                                                                                                              //
  };                                                                                                                 //
                                                                                                                     //
  _Class.prototype.addUserRoles = function(userId, roles, scope) {                                                   // 2
    var i, len, ref, results, role, roleName, roleScope;                                                             // 32
    roles = [].concat(roles);                                                                                        // 32
    results = [];                                                                                                    // 33
    for (i = 0, len = roles.length; i < len; i++) {                                                                  //
      roleName = roles[i];                                                                                           //
      role = this.findOne(roleName);                                                                                 // 34
      roleScope = (role != null ? role.scope : void 0) || 'Users';                                                   // 34
      results.push((ref = RocketChat.models[roleScope]) != null ? typeof ref.addRolesByUserId === "function" ? ref.addRolesByUserId(userId, roleName, scope) : void 0 : void 0);
    }                                                                                                                // 33
    return results;                                                                                                  //
  };                                                                                                                 //
                                                                                                                     //
  _Class.prototype.removeUserRoles = function(userId, roles, scope) {                                                // 2
    var i, len, ref, results, role, roleName, roleScope;                                                             // 39
    roles = [].concat(roles);                                                                                        // 39
    results = [];                                                                                                    // 40
    for (i = 0, len = roles.length; i < len; i++) {                                                                  //
      roleName = roles[i];                                                                                           //
      role = this.findOne(roleName);                                                                                 // 41
      roleScope = (role != null ? role.scope : void 0) || 'Users';                                                   // 41
      results.push((ref = RocketChat.models[roleScope]) != null ? typeof ref.removeRolesByUserId === "function" ? ref.removeRolesByUserId(userId, roleName, scope) : void 0 : void 0);
    }                                                                                                                // 40
    return results;                                                                                                  //
  };                                                                                                                 //
                                                                                                                     //
  return _Class;                                                                                                     //
                                                                                                                     //
})(RocketChat.models._Base));                                                                                        //
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/models/Base.js                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
RocketChat.models._Base.prototype.roleBaseQuery = function(userId, scope) { return {} }                              // 1
                                                                                                                     // 2
RocketChat.models._Base.prototype.findRolesByUserId = function(userId, options) {                                    // 3
	var query = this.roleBaseQuery(userId);                                                                             // 4
	return this.find(query, { fields: { roles: 1 } });                                                                  // 5
}                                                                                                                    // 6
                                                                                                                     // 7
RocketChat.models._Base.prototype.isUserInRole = function(userId, roleName, scope) {                                 // 8
	var query = this.roleBaseQuery(userId, scope);                                                                      // 9
	query.roles = roleName;                                                                                             // 10
	return !_.isUndefined(this.findOne(query));                                                                         // 11
}                                                                                                                    // 12
                                                                                                                     // 13
RocketChat.models._Base.prototype.addRolesByUserId = function(userId, roles, scope) {                                // 14
	var roles = [].concat(roles);                                                                                       // 15
	var query = this.roleBaseQuery(userId, scope);                                                                      // 16
	var update = {                                                                                                      // 17
		$addToSet: {                                                                                                       // 18
			roles: { $each: roles }                                                                                           // 19
		}                                                                                                                  // 20
	}                                                                                                                   // 21
	return this.update(query, update);                                                                                  // 22
}                                                                                                                    // 23
                                                                                                                     // 24
RocketChat.models._Base.prototype.removeRolesByUserId = function(userId, roles, scope) {                             // 25
	var roles = [].concat(roles);                                                                                       // 26
	var query = this.roleBaseQuery(userId, scope);                                                                      // 27
	var update = {                                                                                                      // 28
		$pullAll: {                                                                                                        // 29
			roles: roles                                                                                                      // 30
		}                                                                                                                  // 31
	}                                                                                                                   // 32
	return this.update(query, update);                                                                                  // 33
}                                                                                                                    // 34
                                                                                                                     // 35
RocketChat.models._Base.prototype.findUsersInRoles = function() {                                                    // 36
	throw new Meteor.Error('overwrite-function', 'You must overwrite this function in the extended classes');           // 37
}                                                                                                                    // 38
                                                                                                                     // 39
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/models/Users.js                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
RocketChat.models.Users.roleBaseQuery = function(userId, scope) {                                                    // 1
	return { _id: userId }                                                                                              // 2
}                                                                                                                    // 3
                                                                                                                     // 4
RocketChat.models.Users.findUsersInRoles = function(roles, scope, options) {                                         // 5
	roles = [].concat(roles);                                                                                           // 6
                                                                                                                     // 7
	var query = {                                                                                                       // 8
		roles: { $in: roles }                                                                                              // 9
	}                                                                                                                   // 10
                                                                                                                     // 11
	return this.find(query, options);                                                                                   // 12
}                                                                                                                    // 13
                                                                                                                     // 14
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/models/Subscriptions.js                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
RocketChat.models.Subscriptions.roleBaseQuery = function(userId, scope) {                                            // 1
	var query = { "u._id": userId }                                                                                     // 2
	if (!_.isUndefined(scope)) {                                                                                        // 3
		query.rid = scope;                                                                                                 // 4
	}                                                                                                                   // 5
	return query;                                                                                                       // 6
}                                                                                                                    // 7
                                                                                                                     // 8
RocketChat.models.Subscriptions.findUsersInRoles = function(roles, scope, options) {                                 // 9
	roles = [].concat(roles);                                                                                           // 10
                                                                                                                     // 11
	var query = {                                                                                                       // 12
		roles: { $in: roles }                                                                                              // 13
	}                                                                                                                   // 14
                                                                                                                     // 15
	if (scope) {                                                                                                        // 16
		query.rid = scope;                                                                                                 // 17
	}                                                                                                                   // 18
                                                                                                                     // 19
	subscriptions = this.find(query).fetch();                                                                           // 20
                                                                                                                     // 21
	users = _.compact(_.map(subscriptions, function(subscription) {                                                     // 22
		if ('undefined' !== typeof subscription.u && 'undefined' !== typeof subscription.u._id)                            // 23
			return subscription.u._id                                                                                         // 24
	}));                                                                                                                // 25
                                                                                                                     // 26
	return RocketChat.models.Users.find({ _id: { $in: users } }, options);                                              // 27
}                                                                                                                    // 28
                                                                                                                     // 29
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/functions/addUserRoles.coffee.js                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.authz.addUserRoles = function(userId, roleNames, scope) {                                                 // 1
  var existingRoleNames, i, invalidRoleNames, len, role, user;                                                       // 2
  if (!userId || !roleNames) {                                                                                       // 2
    return false;                                                                                                    // 3
  }                                                                                                                  //
  user = RocketChat.models.Users.findOneById(userId);                                                                // 2
  if (!user) {                                                                                                       // 6
    throw new Meteor.Error('invalid-user');                                                                          // 7
  }                                                                                                                  //
  roleNames = [].concat(roleNames);                                                                                  // 2
  existingRoleNames = _.pluck(RocketChat.authz.getRoles(), '_id');                                                   // 2
  invalidRoleNames = _.difference(roleNames, existingRoleNames);                                                     // 2
  if (!_.isEmpty(invalidRoleNames)) {                                                                                // 13
    for (i = 0, len = invalidRoleNames.length; i < len; i++) {                                                       // 14
      role = invalidRoleNames[i];                                                                                    //
      RocketChat.models.Roles.createOrUpdate(role);                                                                  // 15
    }                                                                                                                // 14
  }                                                                                                                  //
  RocketChat.models.Roles.addUserRoles(userId, roleNames, scope);                                                    // 2
  return true;                                                                                                       // 19
};                                                                                                                   // 1
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/functions/getRoles.coffee.js                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.authz.getRoles = function() {                                                                             // 1
  return RocketChat.models.Roles.find().fetch();                                                                     // 2
};                                                                                                                   // 1
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/functions/getUsersInRole.coffee.js                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.authz.getUsersInRole = function(roleName, scope, options) {                                               // 1
  return RocketChat.models.Roles.findUsersInRole(roleName, scope, options);                                          // 2
};                                                                                                                   // 1
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/functions/hasPermission.coffee.js                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.authz.hasPermission = function(userId, permissionId, scope) {                                             // 1
  var permission;                                                                                                    // 2
  permission = RocketChat.models.Permissions.findOne(permissionId);                                                  // 2
  return RocketChat.models.Roles.isUserInRoles(userId, permission.roles, scope);                                     // 3
};                                                                                                                   // 1
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/functions/hasRole.coffee.js                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.authz.hasRole = function(userId, roleNames, scope) {                                                      // 1
  roleNames = [].concat(roleNames);                                                                                  // 2
  return RocketChat.models.Roles.isUserInRoles(userId, roleNames, scope);                                            // 3
};                                                                                                                   // 1
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/functions/removeUserFromRoles.coffee.js                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.authz.removeUserFromRoles = function(userId, roleNames, scope) {                                          // 1
  var existingRoleNames, invalidRoleNames, user;                                                                     // 2
  if (!userId || !roleNames) {                                                                                       // 2
    return false;                                                                                                    // 3
  }                                                                                                                  //
  user = RocketChat.models.Users.findOneById(userId);                                                                // 2
  if (user == null) {                                                                                                // 6
    throw new Meteor.Error('invalid-user');                                                                          // 7
  }                                                                                                                  //
  roleNames = [].concat(roleNames);                                                                                  // 2
  existingRoleNames = _.pluck(RocketChat.authz.getRoles(), 'name');                                                  // 2
  invalidRoleNames = _.difference(roleNames, existingRoleNames);                                                     // 2
  if (!_.isEmpty(invalidRoleNames)) {                                                                                // 13
    throw new Meteor.Error('invalid-role');                                                                          // 14
  }                                                                                                                  //
  RocketChat.models.Roles.removeUserRoles(userId, roleNames, scope);                                                 // 2
  return true;                                                                                                       // 18
};                                                                                                                   // 1
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/publications/permissions.js                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('permissions', function () {                                                                          // 1
	return RocketChat.models.Permissions.find({});                                                                      // 2
});                                                                                                                  // 3
                                                                                                                     // 4
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/publications/roles.coffee.js                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('roles', function() {                                                                                 // 1
  if (!this.userId) {                                                                                                // 2
    return this.ready();                                                                                             // 3
  }                                                                                                                  //
  return RocketChat.models.Roles.find();                                                                             // 5
});                                                                                                                  // 1
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/publications/scopedRoles.js                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/**                                                                                                                  // 1
 * Publish logged-in user's roles so client-side checks can work.                                                    // 2
 */                                                                                                                  // 3
Meteor.publish('scopedRoles', function (scope) {                                                                     // 4
	if (!this.userId || _.isUndefined(RocketChat.models[scope]) || !_.isFunction(RocketChat.models[scope].findRolesByUserId)) {
		this.ready()                                                                                                       // 6
		return                                                                                                             // 7
	}                                                                                                                   // 8
                                                                                                                     // 9
	return RocketChat.models[scope].findRolesByUserId(this.userId);                                                     // 10
});                                                                                                                  // 11
                                                                                                                     // 12
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/publications/usersInRole.coffee.js                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('usersInRole', function(roleName, page) {                                                             // 1
  var itemsPerPage, pagination;                                                                                      // 2
  if (page == null) {                                                                                                //
    page = 1;                                                                                                        //
  }                                                                                                                  //
  if (!this.userId) {                                                                                                // 2
    return this.ready();                                                                                             // 3
  }                                                                                                                  //
  if (!RocketChat.authz.hasPermission(this.userId, 'access-permissions')) {                                          // 5
    throw new Meteor.Error("not-authorized");                                                                        // 6
  }                                                                                                                  //
  itemsPerPage = 20;                                                                                                 // 2
  pagination = {                                                                                                     // 2
    sort: {                                                                                                          // 10
      name: 1                                                                                                        // 11
    },                                                                                                               //
    limit: itemsPerPage,                                                                                             // 10
    offset: itemsPerPage * (page - 1)                                                                                // 10
  };                                                                                                                 //
  return RocketChat.authz.getUsersInRole(roleName, null, pagination);                                                // 15
});                                                                                                                  // 1
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/methods/addUserToRole.coffee.js                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                     // 1
  'authorization:addUserToRole': function(roleName, username, scope) {                                               // 2
    var user;                                                                                                        // 3
    if (!Meteor.userId() || !RocketChat.authz.hasPermission(Meteor.userId(), 'access-permissions')) {                // 3
      throw new Meteor.Error("not-authorized");                                                                      // 4
    }                                                                                                                //
    if (!roleName || !_.isString(roleName) || !username || !_.isString(username)) {                                  // 6
      throw new Meteor.Error('invalid-arguments');                                                                   // 7
    }                                                                                                                //
    user = RocketChat.models.Users.findOneByUsername(username, {                                                     // 3
      fields: {                                                                                                      // 9
        _id: 1                                                                                                       // 9
      }                                                                                                              //
    });                                                                                                              //
    if ((user != null ? user._id : void 0) == null) {                                                                // 11
      throw new Meteor.Error('user-not-found', 'User_not_found');                                                    // 12
    }                                                                                                                //
    return RocketChat.models.Roles.addUserRoles(user._id, roleName, scope);                                          // 14
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/methods/deleteRole.coffee.js                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                     // 1
  'authorization:deleteRole': function(roleName) {                                                                   // 2
    var existingUsers, ref, role, roleScope;                                                                         // 3
    if (!Meteor.userId() || !RocketChat.authz.hasPermission(Meteor.userId(), 'access-permissions')) {                // 3
      throw new Meteor.Error("not-authorized");                                                                      // 4
    }                                                                                                                //
    role = RocketChat.models.Roles.findOne(roleName);                                                                // 3
    if (role == null) {                                                                                              // 7
      throw new Meteor.Error('invalid-role');                                                                        // 8
    }                                                                                                                //
    if (role["protected"]) {                                                                                         // 10
      throw new Meteor.Error('protected-role', 'Cannot_delete_a_protected_role');                                    // 11
    }                                                                                                                //
    roleScope = role.scope || 'Users';                                                                               // 3
    existingUsers = (ref = RocketChat.models[roleScope]) != null ? typeof ref.findUsersInRoles === "function" ? ref.findUsersInRoles(roleName) : void 0 : void 0;
    if ((existingUsers != null ? existingUsers.count() : void 0) > 0) {                                              // 16
      throw new Meteor.Error('role-in-use', 'Cannot_delete_role_because_its_in_use');                                // 17
    }                                                                                                                //
    return RocketChat.models.Roles.remove(role.name);                                                                // 19
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/methods/removeUserFromRole.coffee.js                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                     // 1
  'authorization:removeUserFromRole': function(roleName, username) {                                                 // 2
    var user;                                                                                                        // 3
    if (!Meteor.userId() || !RocketChat.authz.hasPermission(Meteor.userId(), 'access-permissions')) {                // 3
      throw new Meteor.Error("not-authorized");                                                                      // 4
    }                                                                                                                //
    if (!roleName || !_.isString(roleName) || !username || !_.isString(username)) {                                  // 6
      throw new Meteor.Error('invalid-arguments');                                                                   // 7
    }                                                                                                                //
    user = Meteor.users.findOne({                                                                                    // 3
      username: username                                                                                             // 9
    }, {                                                                                                             //
      fields: {                                                                                                      // 9
        _id: 1                                                                                                       // 9
      }                                                                                                              //
    });                                                                                                              //
    if ((user != null ? user._id : void 0) == null) {                                                                // 11
      throw new Meteor.Error('user-not-found');                                                                      // 12
    }                                                                                                                //
    return RocketChat.models.Roles.removeUserRoles(user._id, roleName);                                              // 14
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/methods/saveRole.coffee.js                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                     // 1
  'authorization:saveRole': function(_id, roleData) {                                                                // 2
    if (!Meteor.userId() || !RocketChat.authz.hasPermission(Meteor.userId(), 'access-permissions')) {                // 3
      throw new Meteor.Error("not-authorized");                                                                      // 4
    }                                                                                                                //
    if (roleData.name == null) {                                                                                     // 6
      throw new Meteor.Error('invalid-data', 'Role name is required');                                               // 7
    }                                                                                                                //
    return RocketChat.models.Roles.createOrUpdate(roleData.name, 'Users', roleData.description);                     // 9
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/methods/addPermissionToRole.coffee.js                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                     // 1
  'authorization:addPermissionToRole': function(permission, role) {                                                  // 2
    if (!Meteor.userId() || !RocketChat.authz.hasPermission(Meteor.userId(), 'access-permissions')) {                // 3
      throw new Meteor.Error("not-authorized");                                                                      // 4
    }                                                                                                                //
    return RocketChat.models.Permissions.addRole(permission, role);                                                  //
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/methods/removeRoleFromPermission.coffee.js                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                     // 1
  'authorization:removeRoleFromPermission': function(permission, role) {                                             // 2
    if (!Meteor.userId() || !RocketChat.authz.hasPermission(Meteor.userId(), 'access-permissions')) {                // 3
      throw new Meteor.Error("not-authorized");                                                                      // 4
    }                                                                                                                //
    return RocketChat.models.Permissions.removeRole(permission, role);                                               //
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/server/startup.coffee.js                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function() {                                                                                          // 1
  var defaultRoles, i, j, len, len1, permission, permissions, results, role;                                         // 7
  permissions = [                                                                                                    // 7
    {                                                                                                                //
      _id: 'view-statistics',                                                                                        // 9
      roles: ['admin']                                                                                               // 9
    }, {                                                                                                             //
      _id: 'run-import',                                                                                             // 12
      roles: ['admin']                                                                                               // 12
    }, {                                                                                                             //
      _id: 'view-privileged-setting',                                                                                // 15
      roles: ['admin']                                                                                               // 15
    }, {                                                                                                             //
      _id: 'edit-privileged-setting',                                                                                // 18
      roles: ['admin']                                                                                               // 18
    }, {                                                                                                             //
      _id: 'view-room-administration',                                                                               // 21
      roles: ['admin']                                                                                               // 21
    }, {                                                                                                             //
      _id: 'view-user-administration',                                                                               // 24
      roles: ['admin']                                                                                               // 24
    }, {                                                                                                             //
      _id: 'view-full-other-user-info',                                                                              // 27
      roles: ['admin']                                                                                               // 27
    }, {                                                                                                             //
      _id: 'add-user',                                                                                               // 30
      roles: ['admin']                                                                                               // 30
    }, {                                                                                                             //
      _id: 'edit-other-user-info',                                                                                   // 33
      roles: ['admin']                                                                                               // 33
    }, {                                                                                                             //
      _id: 'edit-other-user-password',                                                                               // 36
      roles: ['admin']                                                                                               // 36
    }, {                                                                                                             //
      _id: 'assign-admin-role',                                                                                      // 39
      roles: ['admin']                                                                                               // 39
    }, {                                                                                                             //
      _id: 'edit-other-user-active-status',                                                                          // 42
      roles: ['admin']                                                                                               // 42
    }, {                                                                                                             //
      _id: 'delete-user',                                                                                            // 45
      roles: ['admin']                                                                                               // 45
    }, {                                                                                                             //
      _id: 'view-other-user-channels',                                                                               // 48
      roles: ['admin']                                                                                               // 48
    }, {                                                                                                             //
      _id: 'add-oauth-service',                                                                                      // 51
      roles: ['admin']                                                                                               // 51
    }, {                                                                                                             //
      _id: 'run-migration',                                                                                          // 54
      roles: ['admin']                                                                                               // 54
    }, {                                                                                                             //
      _id: 'create-c',                                                                                               // 57
      roles: ['admin', 'user']                                                                                       // 57
    }, {                                                                                                             //
      _id: 'delete-c',                                                                                               // 60
      roles: ['admin']                                                                                               // 60
    }, {                                                                                                             //
      _id: 'edit-room',                                                                                              // 63
      roles: ['admin', 'moderator', 'owner']                                                                         // 63
    }, {                                                                                                             //
      _id: 'edit-message',                                                                                           // 66
      roles: ['admin', 'moderator', 'owner']                                                                         // 66
    }, {                                                                                                             //
      _id: 'delete-message',                                                                                         // 69
      roles: ['admin', 'moderator', 'owner']                                                                         // 69
    }, {                                                                                                             //
      _id: 'remove-user',                                                                                            // 72
      roles: ['admin', 'moderator', 'owner']                                                                         // 72
    }, {                                                                                                             //
      _id: 'mute-user',                                                                                              // 75
      roles: ['admin', 'moderator', 'owner']                                                                         // 75
    }, {                                                                                                             //
      _id: 'ban-user',                                                                                               // 78
      roles: ['admin', 'moderator', 'owner']                                                                         // 78
    }, {                                                                                                             //
      _id: 'set-moderator',                                                                                          // 81
      roles: ['admin', 'owner']                                                                                      // 81
    }, {                                                                                                             //
      _id: 'set-owner',                                                                                              // 84
      roles: ['admin']                                                                                               // 84
    }, {                                                                                                             //
      _id: 'create-p',                                                                                               // 87
      roles: ['admin', 'user']                                                                                       // 87
    }, {                                                                                                             //
      _id: 'delete-p',                                                                                               // 90
      roles: ['admin']                                                                                               // 90
    }, {                                                                                                             //
      _id: 'delete-d',                                                                                               // 93
      roles: ['admin']                                                                                               // 93
    }, {                                                                                                             //
      _id: 'bulk-register-user',                                                                                     // 96
      roles: ['admin']                                                                                               // 96
    }, {                                                                                                             //
      _id: 'bulk-create-c',                                                                                          // 99
      roles: ['admin']                                                                                               // 99
    }, {                                                                                                             //
      _id: 'view-c-room',                                                                                            // 102
      roles: ['admin', 'user', 'bot']                                                                                // 102
    }, {                                                                                                             //
      _id: 'view-p-room',                                                                                            // 105
      roles: ['admin', 'user']                                                                                       // 105
    }, {                                                                                                             //
      _id: 'view-d-room',                                                                                            // 108
      roles: ['admin', 'user']                                                                                       // 108
    }, {                                                                                                             //
      _id: 'access-permissions',                                                                                     // 111
      roles: ['admin']                                                                                               // 111
    }, {                                                                                                             //
      _id: 'manage-assets',                                                                                          // 114
      roles: ['admin']                                                                                               // 114
    }, {                                                                                                             //
      _id: 'manage-integrations',                                                                                    // 117
      roles: ['admin', 'bot']                                                                                        // 117
    }, {                                                                                                             //
      _id: 'manage-oauth-apps',                                                                                      // 120
      roles: ['admin']                                                                                               // 120
    }, {                                                                                                             //
      _id: 'view-logs',                                                                                              // 123
      roles: ['admin']                                                                                               // 123
    }                                                                                                                //
  ];                                                                                                                 //
  for (i = 0, len = permissions.length; i < len; i++) {                                                              // 127
    permission = permissions[i];                                                                                     //
    if (RocketChat.models.Permissions.findOneById(permission._id) == null) {                                         // 128
      RocketChat.models.Permissions.upsert(permission._id, {                                                         // 129
        $set: permission                                                                                             // 129
      });                                                                                                            //
    }                                                                                                                //
  }                                                                                                                  // 127
  defaultRoles = [                                                                                                   // 7
    {                                                                                                                //
      name: 'admin',                                                                                                 // 132
      scope: 'Users',                                                                                                // 132
      description: 'Rocket.Chat admins'                                                                              // 132
    }, {                                                                                                             //
      name: 'moderator',                                                                                             // 133
      scope: 'Subscriptions',                                                                                        // 133
      description: 'Room moderators'                                                                                 // 133
    }, {                                                                                                             //
      name: 'owner',                                                                                                 // 134
      scope: 'Subscriptions',                                                                                        // 134
      description: 'Room owners'                                                                                     // 134
    }, {                                                                                                             //
      name: 'user',                                                                                                  // 135
      scope: 'Users',                                                                                                // 135
      description: 'Users'                                                                                           // 135
    }, {                                                                                                             //
      name: 'bot',                                                                                                   // 136
      scope: 'Users',                                                                                                // 136
      description: 'Bots'                                                                                            // 136
    }                                                                                                                //
  ];                                                                                                                 //
  results = [];                                                                                                      // 139
  for (j = 0, len1 = defaultRoles.length; j < len1; j++) {                                                           //
    role = defaultRoles[j];                                                                                          //
    results.push(RocketChat.models.Roles.createOrUpdate(role.name, role.scope, role.description, true));             // 140
  }                                                                                                                  // 139
  return results;                                                                                                    //
});                                                                                                                  // 1
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/ar.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["ar"] = ["Arabic","العربية"];                                                                // 8
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];                                                               // 10
if(_.isUndefined(TAPi18n.translations["ar"])) {                                                                      // 11
  TAPi18n.translations["ar"] = {};                                                                                   // 12
}                                                                                                                    // 13
                                                                                                                     // 14
if(_.isUndefined(TAPi18n.translations["ar"][namespace])) {                                                           // 15
  TAPi18n.translations["ar"][namespace] = {};                                                                        // 16
}                                                                                                                    // 17
                                                                                                                     // 18
_.extend(TAPi18n.translations["ar"][namespace], {"Add_user":"إضافة مستخدم","Back_to_permissions":"العودة إلى التصريحات","Permissions":"التصريحات","Saving":"جاري الحفظ","User_added":"تمت إضافة المستخدم","User_not_found":"لم يتم العثور على المستخدم","User_removed":"تم إزالة المستخدم"});
TAPi18n._registerServerTranslator("ar", namespace);                                                                  // 20
                                                                                                                     // 21
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/de.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["de"] = ["German","Deutsch"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["de"])) {                                                                      // 9
  TAPi18n.translations["de"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                                           // 13
  TAPi18n.translations["de"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["de"][namespace], {"Add_user":"Benutzer hinzufügen","Back_to_permissions":"Zurück zu den Berechtigungen","Cannot_delete_a_protected_role":"Eine geschützte Rolle kann nicht gelöscht werden.","Cannot_delete_role_because_its_in_use":"Die Rolle kann nicht gelöscht werden, da sie gerade verwendet wird.","New_role":"Neue Rolle","Permissions":"Berechtigungen","Role":"Rolle","Role_Editing":"Rolle bearbeiten","Role_removed":"Die Rolle wurde entfernt.","Saving":"Speichern","There_are_no_users_in_this_role":"Es sind dieser Rolle keine Benutzer zugeordnet.","User_added":"Der Benutzer <em>__user_added__</em> wurde hinzugefügt.","User_not_found":"Der Benutzer konnte nicht gefunden werden.","User_removed":"Der Benutzer wurde gelöscht.","Users_in_role":"Zugeordnete Nutzer"});
TAPi18n._registerServerTranslator("de", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/el.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["el"] = ["Greek","Ελληνικά"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["el"])) {                                                                      // 9
  TAPi18n.translations["el"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["el"][namespace])) {                                                           // 13
  TAPi18n.translations["el"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["el"][namespace], {"User_added":"Ο χρήστης <em>__user_added__</em> πρστέθηκε."});      // 17
TAPi18n._registerServerTranslator("el", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/en.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
// integrate the fallback language translations                                                                      // 8
translations = {};                                                                                                   // 9
translations[namespace] = {"Add_user":"Add user","Back_to_permissions":"Back to permissions","Cannot_delete_a_protected_role":"Cannot delete a protected role","Cannot_delete_role_because_its_in_use":"Cannot delete role because it's in use","New_role":"New role","Permissions":"Permissions","Role":"Role","Role_Editing":"Role Editing","Role_removed":"Role removed","Saving":"Saving","There_are_no_users_in_this_role":"There are no users in this role.","User_added":"User added","User_not_found":"User not found","User_removed":"User removed","Users_in_role":"Users in role"};
TAPi18n._loadLangFileObject("en", translations);                                                                     // 11
TAPi18n._registerServerTranslator("en", namespace);                                                                  // 12
                                                                                                                     // 13
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/es.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["es"] = ["Spanish (Spain)","Español"];                                                       // 8
if(_.isUndefined(TAPi18n.translations["es"])) {                                                                      // 9
  TAPi18n.translations["es"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                                                           // 13
  TAPi18n.translations["es"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["es"][namespace], {"Add_user":"Agregar Usuario","Back_to_permissions":"Regresar a permisos","Cannot_delete_a_protected_role":"No puede eliminar un rol protegido","Cannot_delete_role_because_its_in_use":"No puede eliminar el rol porque esta en uso","New_role":"Rol nuevo","Permissions":"Permisos","Role":"Rol","Role_Editing":"Ediciones de Roles","Role_removed":"Rol Eliminado","Saving":"Guardando","There_are_no_users_in_this_role":"No hay ningún usuario en este rol","User_added":"Usuario <em>__user_added__</em> añadido.","User_not_found":"Usuario no encontrado","User_removed":"Usuario eliminado","Users_in_role":"Usuarios en el rol"});
TAPi18n._registerServerTranslator("es", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/fi.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["fi"])) {                                                                      // 9
  TAPi18n.translations["fi"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {                                                           // 13
  TAPi18n.translations["fi"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["fi"][namespace], {"Add_user":"Lisää käyttäjä","Back_to_permissions":"Takaisin käyttöoikeuksiin","Cannot_delete_a_protected_role":"Et voi poistaa suojattua roolia","Cannot_delete_role_because_its_in_use":"Et voi poistaa roolia, koska se on käytössä","New_role":"Uusi rooli","Permissions":"Oikeudet","Role":"Rooli","Role_Editing":"Roolin muokkaaminen","Role_removed":"Rooli poistettu","Saving":"Tallennetaan","There_are_no_users_in_this_role":"Roolissa ei ole käyttäjiä","User_added":"Käyttäjä <em>__user_added__</em> lisätty.","User_not_found":"Käyttäjää ei löydy","User_removed":"Käyttäjä on poistettu","Users_in_role":"Roolin käyttäjiä"});
TAPi18n._registerServerTranslator("fi", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/fr.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["fr"] = ["French (France)","Français"];                                                      // 8
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                                      // 9
  TAPi18n.translations["fr"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                           // 13
  TAPi18n.translations["fr"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["fr"][namespace], {"Add_user":"Ajouter un utilisateur","Back_to_permissions":"Retour aux permissions","Cannot_delete_a_protected_role":"Impossible de supprimer un rôle protégé","Cannot_delete_role_because_its_in_use":"Impossible de supprimer le rôle car il est utilisé","New_role":"Nouveau rôle","Permissions":"Permissions","Role":"Rôle","Role_Editing":"Édition des rôles","Role_removed":"Rôle retiré","Saving":"Enregistrement en cours","There_are_no_users_in_this_role":"Il n'y a aucun utilisateur avec ce rôle.","User_added":"L'utilisateur <em>__user_added__</em> a été ajouté","User_not_found":"Utilisateur introuvable","User_removed":"Utilisateur retiré","Users_in_role":"Utilisateurs ayant ce rôle"});
TAPi18n._registerServerTranslator("fr", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/he.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["he"] = ["Hebrew","עברית"];                                                                  // 8
if(_.isUndefined(TAPi18n.translations["he"])) {                                                                      // 9
  TAPi18n.translations["he"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["he"][namespace])) {                                                           // 13
  TAPi18n.translations["he"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["he"][namespace], {"Add_user":"הוספת משתמש","Back_to_permissions":"חזרה להרשאות","Cannot_delete_a_protected_role":"לא ניתן למחוק תפקיד מוגן.","New_role":"תפקיד חדש","Permissions":"הרשאות","Role":"תפקיד","Role_Editing":"עריכת תפקידים","Role_removed":"התפקיד הוסר","Saving":"בשמירה","There_are_no_users_in_this_role":"אין משתמשים בתפקיד זה.","User_added":"המשתמש נוסף.","User_not_found":"המשתמש לא נמצא","User_removed":"המשתמש הוסר","Users_in_role":"משתמשים בתפקיד"});
TAPi18n._registerServerTranslator("he", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/hr.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["hr"] = ["Croatian","Hrvatski"];                                                             // 8
if(_.isUndefined(TAPi18n.translations["hr"])) {                                                                      // 9
  TAPi18n.translations["hr"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["hr"][namespace])) {                                                           // 13
  TAPi18n.translations["hr"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["hr"][namespace], {"Add_user":"Dodaj korisnika","Back_to_permissions":"Povratak na dozvole","Permissions":"Dopuštenja","Role":"Uloga","Saving":"Spremanje","There_are_no_users_in_this_role":"Nema korisnika u toj ulozi.","User_added":"Korisnik <em>__user_added__</em> je dodan.","User_not_found":"Korisnik nije pronađen","User_removed":"Korisnik je uklonjen","Users_in_role":"Korisnici u ulozi"});
TAPi18n._registerServerTranslator("hr", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/hu.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["hu"] = ["Hungarian","Magyar"];                                                              // 8
if(_.isUndefined(TAPi18n.translations["hu"])) {                                                                      // 9
  TAPi18n.translations["hu"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["hu"][namespace])) {                                                           // 13
  TAPi18n.translations["hu"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["hu"][namespace], {"User_added":"<em>__user_added__</em> hozzáadva."});                // 17
TAPi18n._registerServerTranslator("hu", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/it.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["it"] = ["Italian","Italiano"];                                                              // 8
if(_.isUndefined(TAPi18n.translations["it"])) {                                                                      // 9
  TAPi18n.translations["it"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["it"][namespace])) {                                                           // 13
  TAPi18n.translations["it"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["it"][namespace], {"User_added":"Utente <em>__user_added__</em> aggiunto."});          // 17
TAPi18n._registerServerTranslator("it", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/ja.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["ja"] = ["Japanese","日本語"];                                                                  // 8
if(_.isUndefined(TAPi18n.translations["ja"])) {                                                                      // 9
  TAPi18n.translations["ja"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["ja"][namespace])) {                                                           // 13
  TAPi18n.translations["ja"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["ja"][namespace], {"Add_user":"ユーザーを追加","Back_to_permissions":"権限へ戻る","Cannot_delete_a_protected_role":"保護されているロールは、削除できません","Cannot_delete_role_because_its_in_use":"ロールを使用中のため、削除できません","New_role":"新しいロール","Permissions":"権限","Role":"ロール","Role_Editing":"ロール編集","Role_removed":"ロールを削除しました","Saving":"保存しています","There_are_no_users_in_this_role":"このロールを割り当てられたユーザーはいません。","User_added":"ユーザーを追加しました","User_not_found":"ユーザーが見つからないか、パスワードが間違っています","User_removed":"ユーザーを削除しました","Users_in_role":"ロールを割り当て中のユーザー"});
TAPi18n._registerServerTranslator("ja", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/km.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["km"] = ["Khmer","ភាសាខ្មែរ"];                                                               // 8
if(_.isUndefined(TAPi18n.translations["km"])) {                                                                      // 9
  TAPi18n.translations["km"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["km"][namespace])) {                                                           // 13
  TAPi18n.translations["km"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["km"][namespace], {"User_added":"អ្នក​ប្រើ <em>__user_added__</em> បាន​បន្ថែម"});      // 17
TAPi18n._registerServerTranslator("km", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/ko.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["ko"] = ["Korean","한국어"];                                                                    // 8
if(_.isUndefined(TAPi18n.translations["ko"])) {                                                                      // 9
  TAPi18n.translations["ko"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["ko"][namespace])) {                                                           // 13
  TAPi18n.translations["ko"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["ko"][namespace], {"Add_user":"사용자 추가","New_role":"새로운 역할","Permissions":"권한","Saving":"저장 중","User_added":"사용자 추가함.","User_not_found":"사용자를 찾을 수 없음","User_removed":"사용자 제거됨"});
TAPi18n._registerServerTranslator("ko", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/ku.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["ku"] = ["ku","ku"];                                                                         // 8
if(_.isUndefined(TAPi18n.translations["ku"])) {                                                                      // 9
  TAPi18n.translations["ku"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["ku"][namespace])) {                                                           // 13
  TAPi18n.translations["ku"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["ku"][namespace], {"User_added":"بەکارهێنەر زیادکرا"});                                // 17
TAPi18n._registerServerTranslator("ku", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/ms-MY.i18n.json                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["ms-MY"] = ["ms-MY","ms-MY"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["ms-MY"])) {                                                                   // 9
  TAPi18n.translations["ms-MY"] = {};                                                                                // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["ms-MY"][namespace])) {                                                        // 13
  TAPi18n.translations["ms-MY"][namespace] = {};                                                                     // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["ms-MY"][namespace], {"User_added":"Pengguna <em>__user_added__</em> ditambah."});     // 17
TAPi18n._registerServerTranslator("ms-MY", namespace);                                                               // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/nl.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["nl"] = ["Dutch","Nederlands"];                                                              // 8
if(_.isUndefined(TAPi18n.translations["nl"])) {                                                                      // 9
  TAPi18n.translations["nl"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["nl"][namespace])) {                                                           // 13
  TAPi18n.translations["nl"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["nl"][namespace], {"Add_user":"Gebruikers toevoegen","Back_to_permissions":"Terug naar machtigingen","Cannot_delete_a_protected_role":"Kan een beschermde rol niet verwijderen","Cannot_delete_role_because_its_in_use":"Kan rol niet verwijderen omdat het in gebruik is","New_role":"Nieuwe rol","Permissions":"Machtigingen","Role":"Rol","Role_Editing":"Rol bewerken","Role_removed":"Rol verwijderd","Saving":"Opslaan","There_are_no_users_in_this_role":"Er zijn geen gebruikers met deze rol.","User_added":"Gebruiker toegevoegd","User_not_found":"Gebruiker niet gevonden","User_removed":"Gebruiker verwijderd","Users_in_role":"Gebruikers met rol"});
TAPi18n._registerServerTranslator("nl", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/pl.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["pl"] = ["Polish","Polski"];                                                                 // 8
if(_.isUndefined(TAPi18n.translations["pl"])) {                                                                      // 9
  TAPi18n.translations["pl"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["pl"][namespace])) {                                                           // 13
  TAPi18n.translations["pl"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["pl"][namespace], {"Add_user":"Dodaj użytkownika","Back_to_permissions":"Powrót do uprawnień","New_role":"Nowa rola","Permissions":"Uprawnienia","Role":"Rola","Role_Editing":"Edycja ról","Role_removed":"Rola usunięta","Saving":"Zapisywanie","There_are_no_users_in_this_role":"Ta rola nie ma przypisanych użytkowników.","User_added":"Użytkownik <em>__user_added__</em> dodany.","User_not_found":"Użytkownik nie znaleziony","User_removed":"Użytkownik usunięty"});
TAPi18n._registerServerTranslator("pl", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/pt.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["pt"] = ["Portuguese (Portugal)","Português"];                                               // 8
if(_.isUndefined(TAPi18n.translations["pt"])) {                                                                      // 9
  TAPi18n.translations["pt"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["pt"][namespace])) {                                                           // 13
  TAPi18n.translations["pt"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["pt"][namespace], {"Add_user":"Adicionar usuário","Back_to_permissions":"Voltar para permissões","Cannot_delete_a_protected_role":"Não é possível remover um papel protegido","Cannot_delete_role_because_its_in_use":"Não é possível remover o papel pois ele está em uso","New_role":"Novo papel","Permissions":"Permissões","Role":"Papel","Role_Editing":"Edição de Papel","Role_removed":"Papel Removido","Saving":"Salvando","There_are_no_users_in_this_role":"Não há usuários neste papel.","User_added":"Usuário adicionado","User_not_found":"Usuário não encontrado","User_removed":"Usuário removido","Users_in_role":"Usuários no papel"});
TAPi18n._registerServerTranslator("pt", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/ro.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["ro"] = ["Romanian","Română"];                                                               // 8
if(_.isUndefined(TAPi18n.translations["ro"])) {                                                                      // 9
  TAPi18n.translations["ro"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {                                                           // 13
  TAPi18n.translations["ro"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["ro"][namespace], {"Add_user":"Adaugă utilizator","Back_to_permissions":"Înapoi la permisiuni","Cannot_delete_a_protected_role":"Nu se poate șterge un rol protejat","Cannot_delete_role_because_its_in_use":"Nu se poate șterge rol, deoarece este în uz","New_role":"Rol nou","Permissions":"Permisiuni","Role":"Rol","Role_Editing":"Editare rol","Role_removed":"Rol eliminat","Saving":"Salvare...","There_are_no_users_in_this_role":"Nu există utilizatori în acest rol.","User_added":"Utilizator adăugat","User_not_found":"Utilizatorul nu a fost găsit","User_removed":"Utilizator eliminat","Users_in_role":"Utilizatorii în rol"});
TAPi18n._registerServerTranslator("ro", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/ru.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["ru"] = ["Russian","Русский"];                                                               // 8
if(_.isUndefined(TAPi18n.translations["ru"])) {                                                                      // 9
  TAPi18n.translations["ru"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {                                                           // 13
  TAPi18n.translations["ru"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["ru"][namespace], {"Add_user":"Добавить пользователя","Back_to_permissions":"Назад к настройкам прав","Cannot_delete_a_protected_role":"Нельзя удалить защищённую позицию","Cannot_delete_role_because_its_in_use":"Нельзя удалить позицию, потому что она используется","New_role":"Новая должность","Permissions":"Настройка прав","Role":"Должность","Role_Editing":"Редактировать роль","Role_removed":"Удаленная должность","Saving":"Сохранение","There_are_no_users_in_this_role":"Пользователей в этой должности не найдено.","User_added":"Пользователь <em>__user_added__</em> добавлен.","User_not_found":"Пользователь не найден","User_removed":"Пользователь удален","Users_in_role":"Пользователи с ролью"});
TAPi18n._registerServerTranslator("ru", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/sr.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["sr"] = ["Serbian","Српски језик"];                                                          // 8
if(_.isUndefined(TAPi18n.translations["sr"])) {                                                                      // 9
  TAPi18n.translations["sr"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["sr"][namespace])) {                                                           // 13
  TAPi18n.translations["sr"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["sr"][namespace], {"User_added":"Корисник/ца додат(а)"});                              // 17
TAPi18n._registerServerTranslator("sr", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/sv.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["sv"] = ["Swedish","Svenska"];                                                               // 8
if(_.isUndefined(TAPi18n.translations["sv"])) {                                                                      // 9
  TAPi18n.translations["sv"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["sv"][namespace])) {                                                           // 13
  TAPi18n.translations["sv"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["sv"][namespace], {"Add_user":"Lägg till användare","Back_to_permissions":"Tillbaka till tillstånd","Cannot_delete_a_protected_role":"Det går inte att radera en skyddad roll","Cannot_delete_role_because_its_in_use":"Det går inte att radera rollen eftersom den används","New_role":"Ny roll","Permissions":"Tillstånd","Role":"Roll","Role_removed":"Roll borttagen","Saving":"Sparar","There_are_no_users_in_this_role":"Det finns inga användare med den rollen.","User_added":"Användare adderad ","User_not_found":"Användare inte hittad","User_removed":"Användare borttagen","Users_in_role":"Användare i rollen"});
TAPi18n._registerServerTranslator("sv", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/ta-IN.i18n.json                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["ta-IN"] = ["ta-IN","ta-IN"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["ta-IN"])) {                                                                   // 9
  TAPi18n.translations["ta-IN"] = {};                                                                                // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["ta-IN"][namespace])) {                                                        // 13
  TAPi18n.translations["ta-IN"][namespace] = {};                                                                     // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["ta-IN"][namespace], {"User_added":"பயனர் <em>__user_added__</em>சேர்க்கப்பட்டார்."});
TAPi18n._registerServerTranslator("ta-IN", namespace);                                                               // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/tr.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["tr"] = ["Turkish","Türkçe"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["tr"])) {                                                                      // 9
  TAPi18n.translations["tr"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["tr"][namespace])) {                                                           // 13
  TAPi18n.translations["tr"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["tr"][namespace], {"User_added":"<em>__user_added__</em> eklendi."});                  // 17
TAPi18n._registerServerTranslator("tr", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/ug.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["ug"] = ["Uighur","Uyƣurqə"];                                                                // 8
if(_.isUndefined(TAPi18n.translations["ug"])) {                                                                      // 9
  TAPi18n.translations["ug"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["ug"][namespace])) {                                                           // 13
  TAPi18n.translations["ug"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["ug"][namespace], {"User_added":"<em>__user_added__</em> ئەزا قوشۇلدى."});             // 17
TAPi18n._registerServerTranslator("ug", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/uk.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["uk"] = ["Ukrainian","Українська"];                                                          // 8
if(_.isUndefined(TAPi18n.translations["uk"])) {                                                                      // 9
  TAPi18n.translations["uk"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["uk"][namespace])) {                                                           // 13
  TAPi18n.translations["uk"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["uk"][namespace], {"User_added":"Користувач <em>__user_added__</em> доданий."});       // 17
TAPi18n._registerServerTranslator("uk", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/zh-HK.i18n.json                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["zh-HK"] = ["Chinese (Hong Kong)","繁体中文（香港）"];                                               // 8
if(_.isUndefined(TAPi18n.translations["zh-HK"])) {                                                                   // 9
  TAPi18n.translations["zh-HK"] = {};                                                                                // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["zh-HK"][namespace])) {                                                        // 13
  TAPi18n.translations["zh-HK"][namespace] = {};                                                                     // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["zh-HK"][namespace], {"User_added":"已添加用户 <em>__user_added__</em> 。"});                // 17
TAPi18n._registerServerTranslator("zh-HK", namespace);                                                               // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/zh-TW.i18n.json                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["zh-TW"] = ["Chinese (Taiwan)","繁体中文（台湾）"];                                                  // 8
if(_.isUndefined(TAPi18n.translations["zh-TW"])) {                                                                   // 9
  TAPi18n.translations["zh-TW"] = {};                                                                                // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["zh-TW"][namespace])) {                                                        // 13
  TAPi18n.translations["zh-TW"][namespace] = {};                                                                     // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["zh-TW"][namespace], {"Add_user":"加入使用者","Back_to_permissions":"回到權限","New_role":"新角色","Role":"角色","Role_Editing":"角色編輯","User_added":"已新增用戶 <em>__user_added__</em> 。"});
TAPi18n._registerServerTranslator("zh-TW", namespace);                                                               // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_authorization/packages/rocketchat_authorizationi18n/zh.i18n.json                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "project",                                                                                        // 2
    namespace = "project";                                                                                           // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
TAPi18n.languages_names["zh"] = ["Chinese","中文"];                                                                    // 8
if(_.isUndefined(TAPi18n.translations["zh"])) {                                                                      // 9
  TAPi18n.translations["zh"] = {};                                                                                   // 10
}                                                                                                                    // 11
                                                                                                                     // 12
if(_.isUndefined(TAPi18n.translations["zh"][namespace])) {                                                           // 13
  TAPi18n.translations["zh"][namespace] = {};                                                                        // 14
}                                                                                                                    // 15
                                                                                                                     // 16
_.extend(TAPi18n.translations["zh"][namespace], {"Add_user":"新增用户","Back_to_permissions":"返回权限页","Cannot_delete_a_protected_role":"禁止删除受保护的角色","Cannot_delete_role_because_its_in_use":"禁止删除该角色，因为它正在使用中","New_role":"新角色","Permissions":"权限","Role":"角色","Role_Editing":"编辑角色","Role_removed":"角色已删除","Saving":"保存中","There_are_no_users_in_this_role":"该角色没有对应用户。","User_added":"已添加用户 <em>__user_added__</em> 。","User_not_found":"用户不存在","User_removed":"用户已被删除","Users_in_role":"用户存在于该角色"});
TAPi18n._registerServerTranslator("zh", namespace);                                                                  // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:authorization'] = {};

})();

//# sourceMappingURL=rocketchat_authorization.js.map
