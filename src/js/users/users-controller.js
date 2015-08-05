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
          $scope.errors.push({msg: 'Couldn\'t retrieve users'});
          console.log(res.data);
        });
    };
  }]);
};
