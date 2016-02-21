'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var importerCtrlStub = {
  index: 'importerCtrl.index',
  show: 'importerCtrl.show',
  create: 'importerCtrl.create',
  update: 'importerCtrl.update',
  destroy: 'importerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var importerIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './importer.controller': importerCtrlStub
});

describe('Importer API Router:', function() {

  it('should return an express router instance', function() {
    importerIndex.should.equal(routerStub);
  });

  describe('GET /api/importers', function() {

    it('should route to importer.controller.index', function() {
      routerStub.get
        .withArgs('/', 'importerCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  //describe('GET /api/importers/:id', function() {
  //
  //  it('should route to importer.controller.show', function() {
  //    routerStub.get
  //      .withArgs('/:id', 'importerCtrl.show')
  //      .should.have.been.calledOnce;
  //  });
  //
  //});

  //describe('POST /api/importers', function() {
  //
  //  it('should route to importer.controller.create', function() {
  //    routerStub.post
  //      .withArgs('/', 'importerCtrl.create')
  //      .should.have.been.calledOnce;
  //  });
  //
  //});

  //describe('PUT /api/importers/:id', function() {
  //
  //  it('should route to importer.controller.update', function() {
  //    routerStub.put
  //      .withArgs('/:id', 'importerCtrl.update')
  //      .should.have.been.calledOnce;
  //  });
  //
  //});

  //describe('PATCH /api/importers/:id', function() {
  //
  //  it('should route to importer.controller.update', function() {
  //    routerStub.patch
  //      .withArgs('/:id', 'importerCtrl.update')
  //      .should.have.been.calledOnce;
  //  });
  //
  //});

  //describe('DELETE /api/importers/:id', function() {
  //
  //  it('should route to importer.controller.destroy', function() {
  //    routerStub.delete
  //      .withArgs('/:id', 'importerCtrl.destroy')
  //      .should.have.been.calledOnce;
  //  });
  //
  //});

});
