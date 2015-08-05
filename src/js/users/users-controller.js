module.exports = function(app) {
  app.controller('usersController', ['$scope', function($scope) {
    $scope.text = 'This app is for storing and retrieving user information.';
  }]);
};
