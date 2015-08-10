require('../../src/js/client.js');
require('angular-mocks');

describe('users controllers', function() {

  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('usersApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controller('usersController', {$scope: $scope});
  }));

  describe('REST interface', function() {

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getAll', function() {
      it('should make a GET request to /api/users and replace $scope.users with the response data', function() {
        $httpBackend.expectGET('/api/users').respond(200, [{username: 'Jimbo'}]);
        $scope.getAll();
        $httpBackend.flush();
        expect($scope.users.length).toBe(1);
        expect($scope.users[0].username).toBe('Jimbo');
      });
    });

    describe('create', function() {
      it('should make a POST request to /api/users, sending the argument user as request body, push the response body to $scope.users, and set $scope.newUser to null', function() {
        $httpBackend.expectPOST('/api/users').respond(200, {username: 'Vincent'});
        $scope.users = [{username: 'Billy Bob'}];
        $scope.newUser = [{username: 'Vinny'}];
        $scope.create($scope.newUser);
        $httpBackend.flush();
        expect($scope.users.length).toBe(2);
        expect($scope.users[1].username).toBe('Vincent');
        expect($scope.newUser).toBeNull();
      });
    });

    describe('destroy', function() {
      it('should make a DELETE request to /api/users/ + argument user._id and remove the argument user from $scope.users on a successful response', function() {
        var user = {_id: 'YourMom', username: 'Regina'};
        $scope.users = [{_id: 123, username: 'Jenny'}, user, {_id: 456, username: 'Alice'}];
        $httpBackend.expectDELETE('/api/users/' + user._id).respond(200);
        $scope.destroy(user);
        $httpBackend.flush();
        expect($scope.users.length).toBe(2);
        expect($scope.users.indexOf(user)).toBe(-1);
        expect($scope.users[0]._id).toBe(123);
        expect($scope.users[1]._id).toBe(456);
      });
    });

    describe('update', function() {
      it('should make a PUT request to /api/users/ + argument user._id, sending the argument user as request body, set the .editing property on the argument user to false, and set $scope.userCache to null', function() {
        var user = {_id: 'hi', username: 'YoMama', editing: true};
        $scope.userCache = {data: "yep"};
        $httpBackend.expectPUT('/api/users/' + user._id, user).respond(200);
        $scope.update(user);
        $httpBackend.flush();
        expect(user.editing).toBe(false);
        expect($scope.userCache).toBeNull();
      });
    });
  });

  describe('helper functions for editing', function() {

    var testUsers;

    beforeEach(function() {
      testUsers = [
        {username: "Larry", address: {city: "Lawrenceburg"}},
        {username: "Moe", address: {city: "Mobile"}},
        {username: "Curly", address: {city: "Curlew"}}
      ];
    });

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
