'use strict';

(function() {

  class EventController {

    constructor($http, $stateParams, $location) {
      this.$http = $http;
      this.url = $location.absUrl();
      this.map = {
        center: {
          latitude: 52.520007,
          longitude: 13.404954
        },
        zoom: 15,
        options: {
          mapTypeControl: false,
          streetViewControl: false,
          scrollwheel: false
        }
      };

      var promises = [
        $http.get('/api/importers')
          .then(response => {
            this.importers = response.data;
          }),
        $http.get('/api/events/' + $stateParams.id)
          .then(response => {
            this.event = response.data;
            console.log(this.event);
          })
      ];

      Promise.all(promises).then(() => {
        this.event.location.coordinates.latitude = this.event.location.coordinates.lat;
        this.event.location.coordinates.longitude = this.event.location.coordinates.lng;
        this.event.color = this.importers.filter((ele) => {
          return ele.name.toLowerCase() === this.event.source.toLowerCase();
        })[0].color;
        this.map.center.latitude = this.event.location.coordinates.lat;
        this.map.center.longitude = this.event.location.coordinates.lng;
        //this.event.icon = {
        //  path: google.maps.SymbolPath.CIRCLE,
        //  scale: 10,
        //  strokeWeight: 1,
        //  fillColor: this.event.color,
        //  fillOpacity: 1
        //};
      });
    }
  }

  angular.module('maapApp')
    .controller('EventCtrl', EventController);

})();
