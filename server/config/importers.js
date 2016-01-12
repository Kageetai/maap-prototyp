'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = [{
  name: 'Facebook',
  module: './importers/facebook',
  options: {
    clientID: '1667337793508705',
    clientSecret: '4bdadef27b563935f74529dd5ddad3d0',
    city: 'berlin',
    limit: 1000,
    googleApi: 'AIzaSyDg-dG8PxdovBkEbxQJGjINP3T8N0J6nAI'
  }
}];
