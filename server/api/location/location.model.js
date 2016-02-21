'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  info: String,
  url: String,
  address: {
    country: String,
    city: String,
    street: String,
    zip: String
  },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  external_id: { type: String, required: true, unique: true },
  source: { type: String, required: true },
  pictures: [{ type: String, unique: true }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  active: Boolean
});

export default mongoose.model('Location', LocationSchema);
