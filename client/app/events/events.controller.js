'use strict';

(function() {

class EventsController {

  constructor($http, $location, Locator) {
    this.locator = Locator;
    this.events = [];
    this.eventsFilter = ($location.search().f) ? $location.search().f : null;
    Locator.locate().then((coords) => {
      this.userCoords = coords;
    });

    var promises = [
      $http.get('/api/importers')
        .then(response => {
          this.importers = response.data;
        }),
      $http.get('/api/events')
        .then(response => {
          this.events = response.data;
        })
    ];

    Promise.all(promises).then(() => {
      this.events.map((event) => {
        event.location.coordinates.latitude = event.location.coordinates.lat;
        event.location.coordinates.longitude = event.location.coordinates.lng;
        event.distance = Locator.getDistance(event.location.coordinates.lat, event.location.coordinates.lng);
        event.color = this.importers.filter((ele) => {
          return ele.name.toLowerCase() === event.source.toLowerCase();
        })[0].color;
        return event;
      })
    });
  }
}

angular.module('maapApp')
  .controller('EventsCtrl', EventsController);

})();
