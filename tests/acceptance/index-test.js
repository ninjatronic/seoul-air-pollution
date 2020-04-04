import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /index renders the map', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.ok(document.querySelectorAll('#map svg path').length);
    assert.ok(document.querySelectorAll('#map svg rect').length);
  });
});
