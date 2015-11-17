import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router'
import 'fetch';


@inject(HttpClient, Router)
export class List {
  heading = 'Users';
  users = [];

  constructor(http, router) {

    this.http = http;
    this.router = router;
  }

  edit(user){
      this.router.navigateToRoute('Edit', { name:user.name}, {replace: true});
  }

  new(){
    this.router.navigateToRoute('Create');
  }

  delete(user){
    debugger;
      if(confirm(`Are your sure to delete to ${user.name} ?`)){
        this.http.fetch(`registers/${user.name}`, {
          method:'delete'
        })

          .then(() => {
            debugger;
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
