import {IDialogs} from './dialog';
/**
 * This is abstract controller for implementing fields and methods used by Dialog components
 * @memberof miqStaticAssets.dialog
 * @ngdoc controller
 * @name DialogClass
 */
export abstract class DialogClass implements IDialogs {
  public dialog: any;
  public refreshField: any;
  public onUpdate: any;
  public inputDisabled: boolean;

    /*@ngInject*/
  constructor() {
    return;
  }
}
