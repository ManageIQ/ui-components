/**
 * @interface
 */
export interface ISite {
  url: string;
  title: string;
  tooltip?: string;
  iconClass: any;
}

/**
 * Controller for site switcher component
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name SiteSwitcherController
 */
export class SiteSwitcherController {
}

/**
 * @description
 *    Component for showing a site switcher drop down for moving between different UI's.
 *    Settings object example:
 *    ```javascript
 *    {
 *      sites: [{
 *        title: 'Launch Operations UI',
 *        tooltip: 'Launch Operations UI',
 *        iconClass: 'fa-cogs',
 *        url: 'http://www.manageiq.com'
 *      }, {
 *        title: 'Launch Service UI',
 *        tooltip: 'Launch Service UI',
 *        iconClass: 'fa-cog',
 *        url: 'http://www.manageiq.com'
 *      }, {
 *        title: 'Home',
 *        tooltip: 'Home',
 *        iconClass: 'fa-home',
 *        url: 'http://www.manageiq.com'
 *      }]
 *    }
 *    ```
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name miqSiteSwitcher
 * @attr {Array} sites
 *     An array of sites to display in the switcher (includes url, iconClass, tooltip and title).
 *     Since we use typescript this attribute has specific type of: `Array<ISite>`
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
