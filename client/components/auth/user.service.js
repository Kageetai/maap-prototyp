'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    addSavedEvent: {
      method: 'PUT',
      params: {
        controller:'addsavedevent'
      }
    },
    removeSavedEvent: {
      method: 'PUT',
      params: {
        controller:'removesavedevent'
      }
    },
    events: {
      method: 'GET',
      isArray: true,
      params: {
        controller:'events'
      }
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    }
  });
}

angular.module('maapApp.auth')
  .factory('User', UserResource);

})();
