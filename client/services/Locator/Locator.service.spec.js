'use strict';

describe('Service: Locator', function () {

  // load the service's module
  beforeEach(module('maapApp'));

  // instantiate service
  var Locator;
  beforeEach(inject(function (_Locator_) {
    Locator = _Locator_;
  }));

  it('should do something', function () {
    expect(!!Locator).toBe(true);
  });

});
