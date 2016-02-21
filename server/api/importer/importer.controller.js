/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/importers              ->  index
 * POST    /api/importers              ->  create
 * GET     /api/importers/:id          ->  show
 * PUT     /api/importers/:id          ->  update
 * DELETE  /api/importers/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import importers from '../../config/importers';
//import Importer from './importer.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

//function saveUpdates(updates) {
//  return function(entity) {
//    var updated = _.merge(entity, updates);
//    return updated.saveAsync()
//      .spread(updated => {
//        return updated;
//      });
//  };
//}

//function removeEntity(res) {
//  return function(entity) {
//    if (entity) {
//      return entity.removeAsync()
//        .then(() => {
//          res.status(204).end();
//        });
//    }
//  };
//}

//function handleEntityNotFound(res) {
//  return function(entity) {
//    if (!entity) {
//      res.status(404).end();
//      return null;
//    }
//    return entity;
//  };
//}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Importers
export function index(req, res) {
  var promise = new Promise((resolve, reject) => {
    resolve(importers.map((imp) => {
      return imp.name;
    }));
  });

  promise
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Importer from the DB
//export function show(req, res) {
//  Importer.findByIdAsync(req.params.id)
//    .then(handleEntityNotFound(res))
//    .then(respondWithResult(res))
//    .catch(handleError(res));
//}

// Creates a new Importer in the DB
//export function create(req, res) {
//  Importer.createAsync(req.body)
//    .then(respondWithResult(res, 201))
//    .catch(handleError(res));
//}

// Updates an existing Importer in the DB
//export function update(req, res) {
//  if (req.body._id) {
//    delete req.body._id;
//  }
//  Importer.findByIdAsync(req.params.id)
//    .then(handleEntityNotFound(res))
//    .then(saveUpdates(req.body))
//    .then(respondWithResult(res))
//    .catch(handleError(res));
//}

// Deletes a Importer from the DB
//export function destroy(req, res) {
//  Importer.findByIdAsync(req.params.id)
//    .then(handleEntityNotFound(res))
//    .then(removeEntity(res))
//    .catch(handleError(res));
//}
