function handle(res, msg) {
  $scope.errors.push({msg: msg});
  console.log(res.data);
};

module.exports = function(app) {
  app.controller('usersController', ['$scope', '$http', function($scope, $http) {
    $scope.users = [];
    $scope.errors = [];
    $scope.getAll = function() {
      $http.get('/api/users')
        .then(function(res) {
          $scope.users = res.data;
        })
        .catch(function(res) {
          handle(res, 'Couldn\'t retrieve users');
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
  }]);
};
