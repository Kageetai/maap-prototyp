'use strict';

Number.prototype.toRad = function() {
  return this * Math.PI / 180;
};

angular.module('maapApp')
  .service('Locator', function ($q) {
    var position;
    function calculateDistance(lat, lon) {
      //SOURCE: http://www.movable-type.co.uk/scripts/latlong.html
      var R = 6371000; // metres
      var φ1 = position.latitude.toRad();
      var φ2 = lat.toRad();
      var Δφ = (lat-position.latitude).toRad();
      var Δλ = (lon-position.longitude).toRad();

      var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      return R * c;
    }
    return {
      locate: function () {
        var deferred = $q.defer();
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(pos) {
            position = pos.coords;
            deferred.resolve(pos.coords);
          });
        } else {
          deferred.reject();
          console.log('No support of geolocation');
        }
        return deferred.promise;
      },
      getDistance: function(lat, lon) {
        if (position === undefined) {
          locate().then((pos) => {
            return calculateDistance(lat, lon);
          });
        }
        return calculateDistance(lat, lon);
      }
    };
  });
