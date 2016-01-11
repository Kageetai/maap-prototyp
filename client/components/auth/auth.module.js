'use strict';

angular.module('maapApp.auth', [
  'maapApp.constants',
  'maapApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
