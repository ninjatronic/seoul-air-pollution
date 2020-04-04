import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class ApplicationRoute extends Route {
  @service store;

  model() {
    return this.store.findAll('station').then((stations) => {
      return fetch('/seoul.geojson').then((response) => {
        return response.json().then((geoJson) => {
          return {
            geoJson: geoJson,
            stations: stations
          };
        });
      });
    });
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    model = this.controllerFor('application').model;
    this.controllerFor('application').set('geoJson', model.geoJson);
    this.controllerFor('application').set('model', model.stations);
  }

}
