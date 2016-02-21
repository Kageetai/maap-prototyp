/**
 * Importer model events
 */

'use strict';

import {EventEmitter} from 'events';
//var Importer = require('./importer.model');
var ImporterEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ImporterEvents.setMaxListeners(0);

// Model events
var events = {
  //'save': 'save',
  //'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Importer.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ImporterEvents.emit(event + ':' + doc._id, doc);
    ImporterEvents.emit(event, doc);
  }
}

export default ImporterEvents;
