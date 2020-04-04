import MapComponent from 'seoul-air-pollution/components/map';
import { set } from '@ember/object';

export default class SeoulMapComponent extends MapComponent {

  transformFeature(feature) {

    if(feature.properties.water) {
      set(feature.properties, 'class', 'water');
    } else if (feature.properties.highway) {
      set(feature.properties, 'class', `highway highway-${feature.properties.highway}`);
    } else if (feature.properties.boundary == 'national_park') {
      set(feature.properties, 'class', 'national-park');
    }

    return feature;
  }

  filterFeature(feature) {
    let water = feature.properties.water;
    let highway = feature.properties.highway;
    let boundary = feature.properties.boundary;
    let nationalPark = boundary == 'national_park';
    return (water || highway || nationalPark);
  }

}
