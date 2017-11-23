import {ComponentDemo} from '../services/availableComponentBuilder';
@ComponentDemo({
  name: 'basic',
  title: 'Site switcher',
  template: require('./../views/site-switcher/basic.html'),
  group: 'site-switcher',
  controller: 'demoSiteSwitcher as vm'
})
export default class SiteSwitcherController {
  public sites: any;
  constructor() {
    this.sites = [{
      title: 'Operations UI',
      tooltip: 'Launch Operations UI',
      iconClass: 'fa-cogs',
      url: 'http://www.google.com'
    }, {
      title: 'Service UI',
      tooltip: 'Launch Service UI',
      iconClass: 'fa-cog',
      url: 'http://www.cnn.com'
    }, {
      title: 'Home',
      tooltip: 'Home',
      iconClass: 'fa-home',
      url: 'http://www.redhat.com'
    }];
  }
}
