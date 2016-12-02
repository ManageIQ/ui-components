/**
 * Controller for site switcher component
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name SiteSwitcherController
 */
export class SiteSwitcherController {
  public showSwitcher: boolean = false;

  /**
    * Public method for showing the switcher drop down
    * @memberof SiteSwitcherController
    * @function toggleSwitcher
    */
  public toggleSwitcher() {
    this.showSwitcher = !this.showSwitcher;
    console.log(this.showSwitcher + ' changed');
  }
}

/**
 * @description
 *    Component for showing a site switcher drop down for moving between different UI's.
 *    Settings object example:
 *    ```javascript
 *    {
 *      sites: [],
 *    }
 *    ```
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name miqSiteSwitcher
 * @attr {Object} sites 
 *     An array of sites to display in the switcher (includes url, iconClass and title)
 *
 * @example
 * <miq-site-switcher sites="sites">
 * </miq-site-switcher>
 */
export default class SiteSwitcher implements ng.IComponentOptions {
  public controller = SiteSwitcherController;
  public template = require<string>('./site-switcher.html');
  public controllerAs = 'ctrl';
  public bindings: any = {
    sites: '<'
  };
}
