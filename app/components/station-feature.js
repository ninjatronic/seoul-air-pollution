import Component from '@glimmer/component';
import { action, computed } from '@ember/object';

export default class StationComponent extends Component {

  size = 10;

  @computed('args.station')
  get station() {
    return this.args.station;
  }

  @computed('args.path')
  get path() {
    return this.args.path;
  }

  @computed('args.projection')
  get projection() {
    return this.args.projection;
  }

  @computed('station.{x,y}', 'projection')
  get centroid() {
    return this.projection([this.station.longitude, this.station.latitude]);
  }

  @computed('centroid')
  get transform() {
    if(this.centroid) {
      return `translate(${this.centroid})`;
    }
    else {
      return 'translate(0,0)';
    }
  }

  @action
  click(event) {
    if(this.args.onClick) {
      this.args.onClick(this.station.id);
      event.stopPropagation();
    }
  }

}
