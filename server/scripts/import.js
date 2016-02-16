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
  var promises = importers.filter((imp) => {
    if (!imp.active) {
      console.log(imp.name + ' Importer inactive');
      return false;
    }
    return true;
  }).map((imp) => {
    console.log(imp.name + ' Importer running');

    var importer = new require(imp.module);
    return importer.init(admin._id, Event, Location, imp.options)
      .then(importer.run)
      .then((events) => {
        //TODO check for existing events
        return Event.createAsync(events)
          .then((events) => {
            console.log(imp.name + ' Events created: ' + events.length);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  });

  Promise.all(promises).then(() => {
    mongoose.disconnect();
    console.log('Importers finished');
  })
}

//exports = module.exports = app;
