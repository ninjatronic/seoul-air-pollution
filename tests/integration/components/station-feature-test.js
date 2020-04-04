import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | station-feature', function(hooks) {
  setupRenderingTest(hooks);

  let station = {
    id: 1,
    longitude: 2,
    latitude: 3,
    name: 'station',
    address: 'address'
  };

  let path = {};

  let projection = function(point) {
    return [point[1], point[0]];
  };

  test('it renders a rect', async function(assert) {
    this.set('station', station);
    this.set('path', path);
    this.set('projection', projection);
    await render(hbs`
      <StationFeature
        @station={{station}}
        @path={{path}}
        @projection={{projection}}/>`);
    let rect = this.element.querySelector('rect');
    assert.ok(rect);
  });

  test('the rect has the correct class', async function(assert) {
    this.set('station', station);
    this.set('path', path);
    this.set('projection', projection);
    await render(hbs`
      <StationFeature
        @station={{station}}
        @path={{path}}
        @projection={{projection}}/>`);
    let rect = this.element.querySelector('rect');
    assert.equal(rect.getAttribute('class'), 'station');
  });

  test('the rect has the correct transform', async function(assert) {
    this.set('station', station);
    this.set('path', path);
    this.set('projection', projection);
    await render(hbs`
      <StationFeature
        @station={{station}}
        @path={{path}}
        @projection={{projection}}/>`);
    let rect = this.element.querySelector('rect');
    assert.equal(rect.getAttribute('transform'), 'translate(3,2)');
  });

  test('the rect has the correct width', async function(assert) {
    this.set('station', station);
    this.set('path', path);
    this.set('projection', projection);
    await render(hbs`
      <StationFeature
        @station={{station}}
        @path={{path}}
        @projection={{projection}}/>`);
    let rect = this.element.querySelector('rect');
    assert.equal(rect.getAttribute('width'), 10);
  });

  test('the rect has the correct height', async function(assert) {
    this.set('station', station);
    this.set('path', path);
    this.set('projection', projection);
    await render(hbs`
      <StationFeature
        @station={{station}}
        @path={{path}}
        @projection={{projection}}/>`);
    let rect = this.element.querySelector('rect');
    assert.equal(rect.getAttribute('height'), 10);
  });

  test('it calls onClick with the station id when clicked', async function(assert) {
    let result;
    let onClick = (id) => {
      result = id;
    };
    this.set('station', station);
    this.set('path', path);
    this.set('projection', projection);
    this.set('onClick', onClick);
    await render(hbs`
      <StationFeature
        @station={{station}}
        @path={{path}}
        @projection={{projection}}
        @onClick={{onClick}}/>`);
    let rect = this.element.querySelector('rect');
    await click(rect);
    assert.equal(result, station.id);
  });

});
