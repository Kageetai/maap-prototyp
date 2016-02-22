'use strict';

(function() {

class MainController {

  constructor($http, Locator) {
    this.$http = $http;
    this.locator = Locator;
    this.awesomeThings = [];
    this.events = [];
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
      })
    });

    this.markersEvents = {
      click: (gMarker, eventName, model) => {
        this.selEvent = model;
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
