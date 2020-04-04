import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked geoJson;

  @tracked bounds = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [126.81365741431686, 37.66354609922539],
            [127.14634258568316, 37.66354609922539],
            [127.14634258568316, 37.44302340345467],
            [126.81365741431686, 37.44302340345467]
          ]
        ]
      }
    }]
  };

}
