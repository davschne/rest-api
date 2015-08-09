require('../../src/js/client.js');
require('angular-mocks');

describe('users controllers', function() {

  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('usersApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var usersController = $ControllerConstructor('usersController', {$scope: $scope});
    expect(typeof usersController).toBe('object');
    expect(typeof $scope.getAll).toBe('function');
    expect(Array.isArray($scope.users)).toBe(true);
  });

  describe('REST interface', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('usersController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

  });

  describe('helper functions for editing', function() {

    var testUsers;

    beforeEach(angular.mock.inject(function($rootScope) {
      $scope = $rootScope.$new();
      $ControllerConstructor('usersController', {$scope: $scope});
      testUsers = [
        {username: "Larry", address: {city: "Lawrenceburg"}},
        {username: "Moe", address: {city: "Mobile"}},
        {username: "Curly", address: {city: "Curlew"}}
      ];
    }));

    describe('cancelEdit', function() {

      it('should restore the element in the array $scope.users that references the argument user to the value of $scope.userCache, set property .editing on restored user to false, remove property .original on restored user, and set $scope.userCache to null', function() {

        $scope.users = testUsers;
        $scope.userCache = {username: "Louis", address: {city: "Louisville"}, original: $scope.users[1]};
        $scope.cancelEdit($scope.users[1]);

        expect($scope.users[1].username).toBe("Louis");
        expect($scope.users[1].address.city).toBe("Louisville");
        expect($scope.users[1].editing).toBe(false);
        expect($scope.users[1].original).toBeUndefined();
        expect($scope.userCache).toBeNull();
      });

      it('some text', function() {
        console.log("In some text:", $scope.users);
      })
    });

    describe('editUser', function() {
      it('should cancel an in-progress edit if necessary, deep copy all properties of argument user to $scope.userCache, set additional property .original on $scope.userCache to reference the argument user, and set .editing property of argument user to true', function() {

        $scope.users = [];
        $scope.users[1] = {username: "Louis", address: {city: "Louisville"}};
        $scope.users[2] = testUsers[2];
        $scope.userCache = {username: "Moe", address: {city: "Mobile"}};
        $scope.userCache.original = $scope.users[1];
        $scope.editUser($scope.users[2]);

        expect($scope.users[1].username).toBe("Moe");

        expect($scope.userCache.username).toBe("Curly");
        expect($scope.userCache.address.city).toBe("Curlew");
        expect($scope.userCache.original).toBe($scope.users[2]);
        expect($scope.users[2].editing).toBe(true);
      });
    });
  });
});
