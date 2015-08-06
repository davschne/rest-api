require('angular/angular');

var usersApp = angular.module('usersApp', []);

require('./users/users-controller')(usersApp);
require('./users/edit-controller')(usersApp);
