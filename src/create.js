import { inject} from 'aurelia-framework';
import {  HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Create {
  heading = 'Create User';
  name = '';
  surname = '';
  number = ''
  previousValue = this.fullName;

  constructor(http) {
    this.http = http;
  }

  get fullName() {
    return `${this.name} ${this.surname}`;
  }

  submit() {
    var body = json({
      name: this.fullName,
      number: this.number
    });
    this.http.fetch('registers', {
      method: 'post',
      body: body
    }).then(data => {
      this.previousValue = this.fullName;
      window.location.path = '/';
    })


  }

  canDeactivate() {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
  activate(params, routeConfig) {
    if(params.name){

      return this.http.fetch(`registers/${params.name}`)
      .then(response => response.json())
      .then(user => {
        this.name = user.name.split(' ')[0];
        this.surname = user.name.split(' ')[1];
        this.number = user.number;
        this.heading = `Edit ${this.fullName} user`;
      });
    }
  }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}