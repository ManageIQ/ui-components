import * as ng from 'angular';

export class QuaditemController {}

export default class Quaditem implements ng.IComponentOptions {
  public controller = QuaditemController;
  public template = require('./quaditem.html');
  public bindings : any = {
    data: '<'
  };
}
