import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | application', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:application');
    assert.ok(controller);
  });

  test('it has the correct bounds', function(assert) {
    let controller = this.owner.lookup('controller:application');
    let bounds = controller.bounds;
    let coords = [
      [
        [126.81365741431686, 37.66354609922539],
        [127.14634258568316, 37.66354609922539],
        [127.14634258568316, 37.44302340345467],
        [126.81365741431686, 37.44302340345467]
      ]
    ];
    assert.equal(bounds.type, 'FeatureCollection');
    assert.equal(bounds.features.length, 1);
    assert.equal(bounds.features[0].type, 'Feature');
    assert.equal(bounds.features[0].geometry.type, 'Polygon');
    assert.deepEqual(bounds.features[0].geometry.coordinates, coords);
  });

});
