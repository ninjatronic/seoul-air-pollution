import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import EmberObject from '@ember/object';
import { set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import window from 'ember-window-mock';

export default class MapComponent extends Component {
  @tracked element;

  @computed('args.{latitude,longitude}')
  get center() {
    return [this.args.latitude, this.args.longitude];
  }

  @computed('args.scale')
  get scale() {
    return this.args.scale;
  }

  @computed('args.geoJson')
  get geoJson() {
    return this.args.geoJson;
  }

  @computed('args.projection')
  get projection() {
    return this.args.projection;
  }

  @computed('element')
  get width() {
    if(this.element) {
      return this.element.getBoundingClientRect().width
    } else {
      return 0;
    }
  }

  @computed('element')
  get height() {
    if(this.element) {
      return this.element.getBoundingClientRect().height
    } else {
      return 0;
    }
  }

  @computed('width', 'height')
  get offset() {
    return [this.width/2, this.height/2]
  }

  @computed('projection', 'center', 'scale', 'offset')
  get d3Projection() {
    return window.d3[this.projection]()
      .center(this.center)
      .scale(this.scale)
      .translate(this.offset);
  }

  @computed('d3Projection')
  get path() {
    return window.d3
      .geoPath()
      .projection(this.d3Projection);
  }

  @computed('geoJson.features[]', 'path')
  get features() {
    let path = this.path;
    let features = [];
    this.geoJson.features
      .filter(this.filterFeature)
      .forEach((feature) => {
        if(path) {
          feature = this.transformFeature(feature);
          set(feature, 'd', path(feature));
          set(feature, 'centroid', path.centroid(feature));
          set(feature, 'centroidX', feature.centroid[0]);
          set(feature, 'centroidY', feature.centroid[1]);
        }
        features.push(EmberObject.create(feature));
      });
    return this.geoJson.features;
  }

  @computed()
  get centreTransform() {
    if(this.center) {
      return `translate(${this.center})`;
    }
    else {
      return 'translate(0,0)';
    }
  }

  // override this
  transformFeature(feature) {
    return feature;
  }

  // override this
  filterFeature(feature) {
    return true;
  }

  @action
  renderMap(element) {
    this.element = element;
  }

  @action
  click(event) {
    if(this.args.onClick) {
      this.args.onClick();
    }
  }
}
