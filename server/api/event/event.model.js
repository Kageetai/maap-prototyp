'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var EventSchema = new mongoose.Schema({
  name: String,
  description: String,
  url: String,
  start_time: Date,
  end_time: Date,
  external_id: { type: String, required: true },
  pictures: [{ type: String, unique: true }],
  location: { type: mongoose.Schema.ObjectId, ref: 'Location' },
  category: { type: mongoose.Schema.ObjectId, ref: 'Category' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  active: { type: Boolean, default: false }
});

export default mongoose.model('Event', EventSchema);
