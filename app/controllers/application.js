import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked geoJson;

  @tracked longitude = 37.553;
  @tracked latitude = 126.980;
  @tracked scale = 126000;
}
