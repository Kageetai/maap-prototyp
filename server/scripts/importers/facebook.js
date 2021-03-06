'use strict';

import rp from 'request-promise';
import _ from 'lodash';

var Event, Location, baseUrl, city, limit, accesstoken, google, createdBy;

var FacebookImport = {
  init: function (user, EventModel, LocationModel, options) {
    baseUrl = options.baseUrl;
    google = options.googleApi;
    Event = EventModel;
    Location = LocationModel;
    createdBy = user;
    city = options.city;
    limit = options.limit;

    // request an access token for the app's test user
    return rp.get(encodeURI(baseUrl + options.clientID + '/accounts/test-users?access_token=' + options.clientID + '|' + options.clientSecret))
      .then((res) => {
        accesstoken = JSON.parse(res).data[0].access_token;
      });
  },
  run: function () {
    var fields = ['id',
        'place',
        'name',
        'start_time',
        'end_time',
        //'category',
        'ticket_uri',
        'cover.fields(id,source)',
        'picture.type(large)',
        'attending_count',
        'updated_time',
        'description',
        'maybe_count'],
      since = (new Date().getTime() / 1000).toFixed();

    // query for events via Graph API
    return rp.get(encodeURI(baseUrl + 'search?q=' + city + '&type=event&fields=' + fields + '&limit=' + limit + '&access_token=' + accesstoken))
      .then((res) => {
        // parse the JSON from FB and filter out events without a proper location immediately
        var events = JSON.parse(res).data.filter((e) => {
          return _.has(e, 'place') && _.has(e, 'place.location') && _.has(e, 'place.location.latitude');
        });

        var promises = events.map((event) => {
          //if (!_.has(event, 'place') || !_.has(event, 'place.location') || !_.has(event, 'place.location.latitude')) {
          //  events.splice(index, 1);
          //  return; // skip the event if there is no place or location
          //}

          event.source = 'facebook';
          event.external_id = event.id;
          event.start = event.start_time;
          event.end = (event.end_time) ? event.end_time : null;
          event.createdBy = createdBy;
          event.createdAt = event.updatedAt = event.updated_time;
          event.url = 'http://www.facebook.com/events/' + event.id;
          event.attending = event.attending_count;
          event.pictures = [];
          if (event.cover) event.pictures.push(event.cover.source);
          if (event.picture) event.pictures.push(event.picture.data.url);

          var location = {
            name: event.place.name,
            external_id: event.place.id,
            coordinates: {
              lat: event.place.location.latitude,
              lng: event.place.location.longitude
            },
            address: {
              country: (event.place.location.country) ? event.place.location.country : null,
              city: (event.place.location.city) ? event.place.location.city : null,
              street: (event.place.location.street) ? event.place.location.street : null,
              zip: (event.place.location.zip) ? event.place.location.zip : null
            },
            source: 'meetup',
            createdBy: createdBy
          };

          //TODO fetch info about location from FB before saving
          return Location.findOneAndUpdateAsync({external_id: location.external_id}, location, {upsert: true, new: true})
            .then((loc) => {
              // just save the location ID to the event
              event.location = loc._id;
              //if (condition) {
              //  return XXXOtherFunctionReturningPromise();
              //}
            });
        });
        return Promise.all(promises).then(() => events);
      });
  }
};

exports = module.exports = FacebookImport;
