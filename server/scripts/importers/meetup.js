'use strict';

import rp from 'request-promise';
import _ from 'lodash';

var Event, Location, baseUrl, apiKey, city, country, limit, google, createdBy;

var MeetupImport = {
  init: function (user, EventModel, LocationModel, options) {
    baseUrl = options.baseUrl;
    apiKey = options.apiKey;
    google = options.googleApi;
    Event = EventModel;
    Location = LocationModel;
    createdBy = user;
    city = options.city;
    country = options.country;
    limit = options.limit;

    return Promise.resolve();
  },
  run: function () {
    var fields = ['id',
        'venue',
        'venue.zip',
        'name',
        'time',
        'end_time',
        'ticket_uri',
        'event_url',
        'photo_url',
        'group_photo',
        'photo_sample',
        'created',
        'updated',
        'description',
        'yes_rsvp_count'],
      since = (new Date().getTime() / 1000).toFixed();

    // query for events via Meetup.com API
    return rp.get(encodeURI(baseUrl + 'open_events?sign=true&key='+apiKey+'&photo-host=secure&page='+limit+'&country='+country+'&city='+city+'&fields='+fields))
      .then((res) => {
        // parse the JSON from meetup and filter out events without a proper location immediately
        var events = JSON.parse(res).results.filter((e) => {
          return _.has(e, 'venue') && _.has(e, 'venue.address_1') && _.has(e, 'venue.lat');
        });

        var promises = events.map((event) => {
          event.external_id = event.id;
          event.start = event.time;
          event.end = (event.duration) ? event.time + event.duration : null;
          event.createdBy = createdBy;
          event.createdAt = event.created;
          event.updatedAt = event.updated;
          event.url = event.event_url;
          event.attending = event.yes_rsvp_count;
          event.pictures = [];
          if (event.photo_url) event.pictures.push(event.photo_url);
          if (event.group_photo) event.pictures.push(event.group_photo);

          var location = {
            name: event.venue.name,
            external_id: event.venue.id,
            coordinates: {
              lat: event.venue.lat,
              lng: event.venue.lon
            },
            address: {
              country: (event.venue.country) ? event.venue.country : null,
              city: (event.venue.city) ? event.venue.city : null,
              street: (event.venue.street) ? event.venue.address_1 : null,
              zip: (event.venue.zip) ? event.venue.zip : null
            }
          };

          return Location.findOneAndUpdateAsync({external_id: location.external_id}, location, {upsert: true, new: true})
            .then((loc) => {
              // just save the location ID to the event
              event.location = loc._id;
            });
        });
        return Promise.all(promises).then(() => events);
      });
  }
};

exports = module.exports = MeetupImport;
