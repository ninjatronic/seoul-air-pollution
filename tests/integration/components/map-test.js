import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { default as window, reset } from 'ember-window-mock';

function setupContext(context, options = {}) {
  context.set('class', options.class);
  context.set('id', options.id);
  context.set('latitude', options.latitude || 0);
  context.set('longitude', options.longitude || 0);
  context.set('scale', options.scale || 0);
  context.set('projection', options.projection || 'projection');
  context.set('onClick', options.onClick);
  context.set('geoJson', options.geoJson || {
    features: []
  });
}

module('Integration | Component | map', function(hooks) {

  hooks.beforeEach(() => {
    reset();
    function projectionFunc(feature) {
      return [feature.x, feature.y]
    }
    function projection(type) {
      return projectionFunc;
    };
    function geoPath() {
      return {
        projection: projection
      };
    };
    projectionFunc.centroid = (feature) => {
      return [feature.x, feature.y];
    };
    window.d3 = {
      projection: () => {
        return {
          center: () => {
            return {
              scale: () => {
                return {
                  translate: () => {}
                };
              }
            };
          }
        };
      },
      geoPath: geoPath
    };
  });

  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    setupContext(this);

    await render(hbs`
      <Map @class={{class}} @id={{id}}
        @latitude={{latitude}}
        @longitude={{longitude}}
        @scale={{scale}}
        @projection={{projection}}
        @geoJson={{geoJson}}>
      </Map>
    `);

    let map = this.element.querySelector('div');
    assert.ok(map);
  });

  test('it contains a div', async function(assert) {
    setupContext(this);

    await render(hbs`
      <Map @class={{class}} @id={{id}}
        @latitude={{latitude}}
        @longitude={{longitude}}
        @scale={{scale}}
        @projection={{projection}}
        @geoJson={{geoJson}}>
      </Map>
    `);

    let map = this.element.querySelector('div');
    assert.equal(map.tagName.trim(), 'DIV');
  });

  test('the div has the correct class set', async function(assert) {
    let options = {
      class: 'class'
    }
    setupContext(this, options);

    await render(hbs`
      <Map @class={{class}} @id={{id}}
        @latitude={{latitude}}
        @longitude={{longitude}}
        @scale={{scale}}
        @projection={{projection}}
        @geoJson={{geoJson}}>
      </Map>
    `);

    let map = this.element.querySelector('div');
    assert.equal(map.getAttribute('class').trim(), options.class);
  });

  test('the div has the correct id set', async function(assert) {
    let options = {
      id: 'id'
    }
    setupContext(this, options);

    await render(hbs`
      <Map @class={{class}} @id={{id}}
        @latitude={{latitude}}
        @longitude={{longitude}}
        @scale={{scale}}
        @projection={{projection}}
        @geoJson={{geoJson}}>
      </Map>
    `);

    let map = this.element.querySelector('div');
    assert.equal(map.getAttribute('id').trim(), options.id);
  });

  test('the div contains an svg element', async function(assert) {
    let options = {
      id: 'id'
    }
    setupContext(this, options);

    await render(hbs`
      <Map @class={{class}} @id={{id}}
        @latitude={{latitude}}
        @longitude={{longitude}}
        @scale={{scale}}
        @projection={{projection}}
        @geoJson={{geoJson}}>
      </Map>
    `);

    let map = this.element.querySelector('div');
    let svg = map.querySelector('svg');
    assert.ok(svg);
  });

  test('the svg element calls onClick when clicked', async function(assert) {
    let called;
    let options = {
      onClick: () => {
        called = true;
      }
    }
    setupContext(this, options);

    await render(hbs`
      <Map @class={{class}} @id={{id}}
        @latitude={{latitude}}
        @longitude={{longitude}}
        @scale={{scale}}
        @projection={{projection}}
        @geoJson={{geoJson}}
        @onClick={{onClick}}>
      </Map>
    `);

    let map = this.element.querySelector('div');
    let svg = map.querySelector('svg');

    await click(svg);

    assert.ok(called);
  });

  test('the svg element produces no error when clicked with no onClick supplied', async function(assert) {
    setupContext(this);

    await render(hbs`
      <Map @class={{class}} @id={{id}}
        @latitude={{latitude}}
        @longitude={{longitude}}
        @scale={{scale}}
        @projection={{projection}}
        @geoJson={{geoJson}}>
      </Map>
    `);

    let map = this.element.querySelector('div');
    let svg = map.querySelector('svg');

    await click(svg);

    assert.ok(map);
  });

  test('the map renders each feature', async function(assert) {
    let options = {
      geoJson: {
        features: [{
          x: 1,
          y: 2
        },{
          x: 3,
          y: 4
        }]
      }
    }
    setupContext(this, options);

    await render(hbs`
      <Map @class={{class}} @id={{id}}
        @latitude={{latitude}}
        @longitude={{longitude}}
        @scale={{scale}}
        @projection={{projection}}
        @geoJson={{geoJson}}
        as |features path|>
          {{#each features as |feature|}}
            <text>
              <tspan>
                {{feature.d}}
              </tspan>
              <tspan>
                {{feature.centroid}}
              </tspan>
              <tspan>
                {{feature.centroidX}}
              </tspan>
              <tspan>
                {{feature.centroidY}}
              </tspan>
            </text>
          {{/each}}
      </Map>
    `);

    let map = this.element.querySelector('div');
    let svg = map.querySelector('svg');

    let txt = svg.querySelectorAll('text');

    assert.equal(txt[0].querySelectorAll('tspan')[0].textContent.trim(), '1,2');
    assert.equal(txt[0].querySelectorAll('tspan')[1].textContent.trim(), '1,2');
    assert.equal(txt[0].querySelectorAll('tspan')[2].textContent.trim(), '1');
    assert.equal(txt[0].querySelectorAll('tspan')[3].textContent.trim(), '2');

    assert.equal(txt[1].querySelectorAll('tspan')[0].textContent.trim(), '3,4');
    assert.equal(txt[1].querySelectorAll('tspan')[1].textContent.trim(), '3,4');
    assert.equal(txt[1].querySelectorAll('tspan')[2].textContent.trim(), '3');
    assert.equal(txt[1].querySelectorAll('tspan')[3].textContent.trim(), '4');
  });
});
