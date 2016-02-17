'use strict';

(function() {

class MainController {

  constructor($http) {
    this.$http = $http;
    this.awesomeThings = [];
    this.events = [];
    this.map = {
      center: {
        latitude: 52.520007,
        longitude: 13.404954
      },
      zoom: 13
    };

    $http.get('/api/events').then(response => {
      this.events = response.data.map((event) => {
        event.location.coordinates.latitude = event.location.coordinates.lat;
        event.location.coordinates.longitude = event.location.coordinates.lng;
        return event;
      });
    });

    this.markersEvents = {
      click: function (gMarker, eventName, model) {
        console.log(model);
      }
    };
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('maapApp')
  .controller('MainController', MainController);

})();
