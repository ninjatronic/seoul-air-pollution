import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | station', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('station', {});
    assert.ok(model);
  });

  test('it has an id attribute', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('station', {
      id: 1
    });
    assert.equal(model.id, 1);
  });

  test('it has an latitude attribute', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('station', {
      latitude: 2
    });
    assert.equal(model.latitude, 2);
  });

  test('it has an longitude attribute', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('station', {
      longitude: 3
    });
    assert.equal(model.longitude, 3);
  });

  test('it has an name attribute', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('station', {
      name: 'station name'
    });
    assert.equal(model.name, 'station name');
  });

  test('it has an address attribute', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('station', {
      address: 'station address'
    });
    assert.equal(model.address, 'station address');
  });
});
