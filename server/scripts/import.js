'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from '../config/environment';
import importers from '../config/importers';

import Event from '../api/event/event.model';
import User from '../api/user/user.model';
import Location from '../api/location/location.model';

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

var admin;

// Populate DB with sample data
if (config.seedDB) {
  User.find({}).removeAsync()
    .then(() => {
      User.create({
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin'
      })
      .then((user) => {
        admin = user;
        runImports();
      }
    );
  });
} else {
  User.findOneAsync({role: 'admin'})
  .then((user) => {
    admin = user;
    runImports();
  });
}

function runImports() {
  var importer;

  Location.find({}, function (locations) {
    for (var i = 0; i < importers.length; i++) {
      console.log('Running importer: ' + importers[i].name);

      importer = new require(importers[i].module);
      importer.init(admin._id, locations, importers[i].options)
        .then(importer.run)
        .then(function (events) {
          console.log(events);
          //Event.find({}).remove(function () {
          //  Event.create(events, function (err, created) {
          //    if (err) {
          //      console.log(err);
          //    } else {
          //      console.log("  imported " + created.length + " events");
          //    }
          //  });
          //});
        });
    }
  });

}

//exports = module.exports = app;
