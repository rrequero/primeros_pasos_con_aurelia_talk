import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'list'], name: 'List',      moduleId: 'list',      nav: true, title: 'List users' },
      { route: ['create'], name: 'Create',      moduleId: 'create',      nav: true, title: 'Create user' },
      { route: ['edit'], name: 'Edit',      moduleId: 'create',      nav: true, title: 'Edit user' }
    ]);

    this.router = router;
  }
  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:3000/');
    });

    this.http = http;
  }
}
