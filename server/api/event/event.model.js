'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  url: { type: String, required: true },
  start: { type: Date, required: true },
  end: Date,
  external_id: { type: String, required: true, unique: true },
  ticket_uri: String,
  pictures: [{ type: String, unique: true }],
  location: { type: mongoose.Schema.ObjectId, ref: 'Location', required: true },
  category: { type: mongoose.Schema.ObjectId, ref: 'Category' },
  attending: Number,
  source: String,
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  active: { type: Boolean, default: false }
});

export default mongoose.model('Event', EventSchema);
