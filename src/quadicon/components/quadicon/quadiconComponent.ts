import * as ng from 'angular';

export class QuadiconController {
  public data : any;
  public quadSet = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'middle'];

  public isQuad() : boolean {
    return this.quadSet.some(quad => this.data[quad]);
  }

  public getBackground(item) {
    return this.data[item] && this.data[item].background ? {'background': this.data[item].background} : {};
  }
}

export default class Quadicon implements ng.IComponentOptions {
  public controller = QuadiconController;
  public template = require('./quadicon.html');
  public bindings : any = {
    data: '<',
  };
}
