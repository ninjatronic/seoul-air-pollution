import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | map-feature', function(hooks) {
  setupRenderingTest(hooks);

  var feature = {
    d: [[1,2],[3,4]],
    properties: {
      id: 'id',
      class: 'class'
    }
  };

  test('it renders a path element', async function(assert) {
    this.set('feature', feature);
    await render(hbs`<MapFeature @feature={{feature}}/>`);
    let path = this.element.querySelector('PATH');
    assert.equal(path.tagName.trim(), 'PATH');
  });

  test('the path element has the correct id', async function(assert) {
    this.set('feature', feature);
    await render(hbs`<MapFeature @feature={{feature}}/>`);
    let path = this.element.querySelector('PATH');
    assert.equal(path.getAttribute('id').trim(), feature.properties.id);
  });

  test('the path element has the correct class', async function(assert) {
    this.set('feature', feature);
    await render(hbs`<MapFeature @feature={{feature}}/>`);
    let path = this.element.querySelector('PATH');
    assert.equal(path.getAttribute('class').trim(), feature.properties.class);
  });

  test('the path element has the correct d', async function(assert) {
    this.set('feature', feature);
    await render(hbs`<MapFeature @feature={{feature}}/>`);
    let path = this.element.querySelector('PATH');
    assert.equal(path.getAttribute('d').trim(), feature.d);
  });

  test('calls the onClick callback with the id when clicked', async function(assert) {
    let result;
    this.set('feature', feature);
    this.set('onClick', (id) => {
      result = id;
    });
    await render(hbs`<MapFeature @feature={{feature}} @onClick={{onClick}}/>`);
    let path = this.element.querySelector('PATH');
    await click(path);
    assert.equal(result, feature.properties.id);
  });

  test('does not error when clicked if no onClick callback is given', async function(assert) {
    this.set('feature', feature);
    await render(hbs`<MapFeature @feature={{feature}}/>`);
    let path = this.element.querySelector('PATH');
    await click(path);
    assert.ok(path);
  });
});
