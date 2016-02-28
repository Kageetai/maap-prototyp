'use strict';

angular.module('maapApp')
  .controller('AboutCtrl', function ($scope) {
    //$scope.message = 'Hello';

    $scope.sendMail = function (form) {
      console.log(form);
    };
  });
