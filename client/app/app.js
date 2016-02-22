'use strict';

angular.module('maapApp', [
  'maapApp.auth',
  'maapApp.admin',
  'maapApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'uiGmapgoogle-maps',
  '720kb.socialshare'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDxHmFqesCdTNc2e6Q45364edVZgc847qs',
      //v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'geometry,visualization'
    });
  });
