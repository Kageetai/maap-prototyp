'use strict';

module.exports = [{
  name: 'Facebook',
  module: './importers/facebook',
  options: {
    baseUrl: 'https://graph.facebook.com/v2.5/',
    clientID: '1667337793508705',
    clientSecret: '4bdadef27b563935f74529dd5ddad3d0',
    city: 'berlin',
    limit: 1000,
    googleApi: 'AIzaSyDg-dG8PxdovBkEbxQJGjINP3T8N0J6nAI'
  },
  active: true
}, {
  name: 'Meetup',
  module: './importers/meetup',
  options: {
    baseUrl: 'https://api.meetup.com/2/',
    apiKey: 'f3e104f4605f104a3a5d196740376a',
    city: 'berlin',
    country: 'de',
    limit: 1000,
    googleApi: 'AIzaSyDg-dG8PxdovBkEbxQJGjINP3T8N0J6nAI'
  },
  active: true
}];
