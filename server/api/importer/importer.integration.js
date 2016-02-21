'use strict';

var app = require('../..');
import request from 'supertest';

var newImporter;

describe('Importer API:', function() {

  describe('GET /api/importers', function() {
    var importers;

    beforeEach(function(done) {
      request(app)
        .get('/api/importers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          importers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      importers.should.be.instanceOf(Array);
    });

  });

  //describe('POST /api/importers', function() {
  //  beforeEach(function(done) {
  //    request(app)
  //      .post('/api/importers')
  //      .send({
  //        name: 'New Importer',
  //        info: 'This is the brand new importer!!!'
  //      })
  //      .expect(201)
  //      .expect('Content-Type', /json/)
  //      .end((err, res) => {
  //        if (err) {
  //          return done(err);
  //        }
  //        newImporter = res.body;
  //        done();
  //      });
  //  });
  //
  //  it('should respond with the newly created importer', function() {
  //    newImporter.name.should.equal('New Importer');
  //    newImporter.info.should.equal('This is the brand new importer!!!');
  //  });
  //
  //});

  //describe('GET /api/importers/:id', function() {
  //  var importer;
  //
  //  beforeEach(function(done) {
  //    request(app)
  //      .get('/api/importers/' + newImporter._id)
  //      .expect(200)
  //      .expect('Content-Type', /json/)
  //      .end((err, res) => {
  //        if (err) {
  //          return done(err);
  //        }
  //        importer = res.body;
  //        done();
  //      });
  //  });
  //
  //  afterEach(function() {
  //    importer = {};
  //  });
  //
  //  it('should respond with the requested importer', function() {
  //    importer.name.should.equal('New Importer');
  //    importer.info.should.equal('This is the brand new importer!!!');
  //  });
  //
  //});

  //describe('PUT /api/importers/:id', function() {
  //  var updatedImporter;
  //
  //  beforeEach(function(done) {
  //    request(app)
  //      .put('/api/importers/' + newImporter._id)
  //      .send({
  //        name: 'Updated Importer',
  //        info: 'This is the updated importer!!!'
  //      })
  //      .expect(200)
  //      .expect('Content-Type', /json/)
  //      .end(function(err, res) {
  //        if (err) {
  //          return done(err);
  //        }
  //        updatedImporter = res.body;
  //        done();
  //      });
  //  });
  //
  //  afterEach(function() {
  //    updatedImporter = {};
  //  });
  //
  //  it('should respond with the updated importer', function() {
  //    updatedImporter.name.should.equal('Updated Importer');
  //    updatedImporter.info.should.equal('This is the updated importer!!!');
  //  });
  //
  //});

  //describe('DELETE /api/importers/:id', function() {
  //
  //  it('should respond with 204 on successful removal', function(done) {
  //    request(app)
  //      .delete('/api/importers/' + newImporter._id)
  //      .expect(204)
  //      .end((err, res) => {
  //        if (err) {
  //          return done(err);
  //        }
  //        done();
  //      });
  //  });
  //
  //  it('should respond with 404 when importer does not exist', function(done) {
  //    request(app)
  //      .delete('/api/importers/' + newImporter._id)
  //      .expect(404)
  //      .end((err, res) => {
  //        if (err) {
  //          return done(err);
  //        }
  //        done();
  //      });
  //  });
  //
  //});

});
