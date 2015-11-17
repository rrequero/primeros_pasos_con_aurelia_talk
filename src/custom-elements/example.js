import {customElement, bindable} from 'aurelia-framework';

@customElement('example')
export class Example {
  @bindable to;

  speak(){
    alert(`Hello ${this.to}!`);
  }
}
