import Model, { attr } from '@ember-data/model';

export default class StationModel extends Model {
  @attr('number') latitude
  @attr('number') longitude
  @attr('string') name
  @attr('string') address
}
