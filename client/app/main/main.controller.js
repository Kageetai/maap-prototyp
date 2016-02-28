'use strict';

(function() {

class MainController {

  constructor($scope, $filter, $http, Auth, Locator) {
    this.Auth = Auth;
    this.hasSavedEvent = Auth.hasSavedEvent;
    this.locator = Locator;
    this.awesomeThings = [];
    this.events = [];
    this.filteredEvents = [];
    this.map = {
      center: {
        latitude: 52.520007,
        longitude: 13.404954
      },
      zoom: 13,
      options: {
        mapTypeControl: false,
        streetViewControl: false
      }
    };

    this.locator.locate().then((pos) => {
      this.userCoords = pos;
      this.map.center.latitude = pos.latitude;
      this.map.center.longitude = pos.longitude;
    });

    $scope.$watch("searchTerm", (searchTerm) => {
      this.filteredEvents = $filter("filter")(this.events, searchTerm);
      console.log(this.filteredEvents.length);
      if (!this.filteredEvents){
        return;
      }
    });

    $http.get('assets/gmap-styles.json')
      .then((res) => {
        this.map.options.styles = res.data;
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
        event.color = this.importers.filter((ele) => {
          return ele.name.toLowerCase() === event.source.toLowerCase();
        })[0].color;
        event.icon = {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          strokeWeight: 1,
          fillColor: event.color,
          fillOpacity: 1
        };
        return event;
      });
      this.filteredEvents = this.events;
    });

    this.markersEvents = {
      click: (gMarker, eventName, model) => {
        this.selEvent = model;
        console.log(model);
      }
    };
  }

  saveEvent(event) {
    this.Auth.addSavedEvent(event._id).then((user) => {
      console.log('Event saved');
    });
  }

  removeEvent(event) {
    this.Auth.removeSavedEvent(event._id).then((user) => {
      console.log('Event removed');
    });
  }
}

angular.module('maapApp')
  .controller('MainController', MainController);

})();
