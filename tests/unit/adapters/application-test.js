import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | application', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:application');
    assert.ok(adapter);
  });

  test('it builds the correct url', function(assert) {
    let adapter = this.owner.lookup('adapter:application');
    let modelName = 'station';
    let requestType = 'findAll'
    let expected = '/stations.dataset.json';
    let url = adapter.buildURL(modelName, null, null, requestType);
    assert.equal(url, expected);
  });
});
