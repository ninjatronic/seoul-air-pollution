import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | application', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:application');
    assert.ok(controller);
  });

  test('it has the correct latitude', function(assert) {
    let controller = this.owner.lookup('controller:application');
    assert.equal(controller.latitude, 126.980);
  });

  test('it has the correct longitude', function(assert) {
    let controller = this.owner.lookup('controller:application');
    assert.equal(controller.longitude, 37.553);
  });

  test('it has the correct scale', function(assert) {
    let controller = this.owner.lookup('controller:application');
    assert.equal(controller.scale, 126000);
  });

});
