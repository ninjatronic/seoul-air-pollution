import JSONAPIAdapter from '@ember-data/adapter/json-api';
import config from 'seoul-air-pollution/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {

  buildURL(...args) {
    return `${config.rootURL}${super.buildURL(...args).replace(/^\/+/, '')}.dataset.json`;
  }
}
