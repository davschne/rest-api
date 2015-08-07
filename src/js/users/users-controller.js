var _ = require('lodash');

function handle(res, msg) {
  $scope.errors.push({msg: msg});
  console.log(res.data);
};

module.exports = function(app) {
  app.controller('usersController', ['$scope', '$http', function($scope, $http) {
    $scope.users = [];
    $scope.errors = [];
    $scope.userCache = null;

    $scope.getAll = function() {
      $http.get('/api/users')
        .then(function(res) {
          $scope.users = res.data;
        })
        .catch(function(res) {
          handle(res, 'Couldn\'t retrieve users');
        });
    };

    $scope.create = function(user) {
      $scope.newUser = null;
      $http.post('/api/users', user)
        .then(function(res) {
          $scope.users.push(res.data);
        })
        .catch(function(res) {
          handle(res, 'Error creating user');
        });
    };

    $scope.destroy = function(user) {
      $http.delete('/api/users/' + user._id)
        .then(function(res) {
          $scope.users.splice($scope.users.indexOf(user), 1);
        })
        .catch(function(res) {
          handle(res, 'Error deleting user');
        });
    };

    $scope.update = function(user) {
      $http.put('/api/users/' + user._id, user)
        .then(function(res) {
          user.editing = false;
          $scope.userCache = null;
        })
        .catch(function(res) {
          $scope.cancelEdit(user);
          handle(res, 'Error updating user');
        });
    };

    $scope.editUser = function(user) {
      if ($scope.userCache) {
        $scope.cancelEdit($scope.userCache.original);
      }
      $scope.userCache = _.cloneDeep(user);
      $scope.userCache.original = user;
      user.editing = true;
    };

    $scope.cancelEdit = function(user) {
      delete $scope.userCache.original;
      var restore = $scope.userCache;
      restore.editing = false;
      $scope.userCache = null;
      $scope.users[$scope.users.indexOf(user)] = restore;
    };
  }]);
};
