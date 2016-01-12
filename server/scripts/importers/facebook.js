'use strict';

//var q = require('q');
import rp from 'request-promise';
import _ from 'lodash';
var existingLocations, city, limit, accesstoken, google, createdBy;

var FacebookImport = {
  init: function (user, locations, options) {
    return new Promise((resolve, reject) => {
      accesstoken = 'CAACEdEose0cBALgUwsXdO7dZBMNlZBBX9gji7tZAVBZAc822HsFrVwVoD06eZBBbRGkSQmwfHZBQaLqbAzoCZAfAiOXOhpU6TB20pzufX7zRMw9b9mLMBMTu34NE687bwQ6nNTZBMnBZBZAIESNZBEWHtagwxiItho6LvHxZAx7vNrTLNNItZACMdtNby0kLZBKMwldsS8lezfu1bLdQZDZD';
      google = options.googleApi;
      existingLocations = locations;
      createdBy = user;
      city = options.city;
      limit = options.limit;

      resolve()
    });
  },
  run: function () {
    return new Promise((resolve, reject) => {

      var fields = ['id',
          'place',
          'name',
          'start_time',
          'end_time',
          'cover.fields(id,source)',
          'picture.type(large)',
          'attending_count',
          'maybe_count'],
        since = (new Date().getTime() / 1000).toFixed();

      rp.get(encodeURI('https://graph.facebook.com/v2.5/search?q=' + city + '&type=event&fields=' + fields + '&limit=' + limit + '&access_token=' + accesstoken))
        .then((res) => {
          console.log("res received");
          var events = JSON.parse(res).data;
          for (var i = 0; i < events.length; i++) {
            if (events[i].place == undefined || events[i].place.location == undefined) {
              continue; // skip the event if there is no place or location
            }
            events[i].start = events[i].start_time;
            events[i].end = events[i].end_time;
            events[i].pictures = [];
            events[i].createdBy = createdBy;
            events[i].url = 'http://www.facebook.com/events/' + events[i].id;
            if (events[i].cover) events[i].pictures.push(events[i].cover.source);
            if (events[i].picture) events[i].pictures.push(events[i].picture.data.url);

            var exLoc;
            if ((exLoc = _.findWhere(existingLocations, {external_id: events[i].place.id})) !== undefined) { // does the location already exist in our database?
              events[i].location = exLoc;
            } else {
              //TODO create new locations
            }
          }
          resolve(events);
        })
        .catch((e) => {
          console.error(e);
          reject(e);
        });

    });
  }
};

exports = module.exports = FacebookImport;
