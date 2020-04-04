import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class ApplicationRoute extends Route {

  model() {
    return fetch('/seoul.geojson').then((response) => {
      return response.json().then((geoJson) => {
        return {
          geoJson: geoJson
        };
      });
    });
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    model = this.controllerFor('application').model;
    this.controllerFor('application').set('geoJson', model.geoJson);
  }

}
