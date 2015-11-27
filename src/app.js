import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'list'], name: 'List',moduleId: 'list', nav: true, title: 'List users' },
      { route: ['create'], name: 'Create',moduleId: 'create', nav: true, title: 'Create user' },
      { route: ['edit/:name'], name: 'Edit',moduleId: 'create', nav: false, title: 'Edit user' },
      { route: ['form'], name: 'Form',moduleId: 'form', nav: true, title: 'Forms example' }
    ]);

    this.router = router;
  }
  constructor(http) {
    http.configure(config => {
      config
        .withBaseUrl('http://localhost:3000/');
    });

    this.http = http;
  }
}
