import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | application', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:application');
    assert.ok(route);
  });

  test('the model hook returns geojson', function(assert) {
    let route = this.owner.lookup('route:application');
    return route.model().then((result) => {
      assert.equal(result.geoJson.type, 'FeatureCollection');
    });
  });

  test('the setupController hook sets the geojson property on the controller', function(assert) {
    let route = this.owner.lookup('route:application');
    let controller = this.owner.lookup('controller:application');
    let model = {geoJson: 'geoJson'};

    route.setupController(controller, model);

    assert.equal(controller.geoJson, 'geoJson');
  });
});
