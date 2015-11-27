import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {Service} from './test';


@inject(HttpClient, Router, Service)
export class List {
  heading = 'Users';
  users = [];

  constructor(http, router, service) {
    this.http = http;
    this.router = router;
    this.service = service;
    this.service.setName('Juan');
  }

  edit(user){
      this.router.navigateToRoute('Edit', { name:user.name}, {replace: true});
  }

  new(){
    this.router.navigateToRoute('Create');
  }

  delete(user){
      if(confirm(`Are your sure to delete to ${user.name} ?`)){
        this.http.fetch(`registers/${user.name}`, {
          method:'delete'
        })
          .then(() => {
            return this.updateList()
          });
      }
  }

  updateList(){
    return this.http.fetch('registers')
      .then(response => response.json())
      .then(users => {
        this.users = users
      });
  }

  activate() {
    return this.updateList();
  }
}
