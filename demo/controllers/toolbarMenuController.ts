import {ComponentDemo} from '../services/availableComponentBuilder';
@ComponentDemo({
  name: 'basic',
  title: 'Basic Toolbar Menu',
  template: require('./../views/toolbar-menu/basic.html'),
  group: 'toolbar-menu',
  controller: 'demoToolbarMenu as vm'
})
@ComponentDemo({
  name: 'custom_html',
  title: 'Custom Html Toolbar Menu',
  template: require('./../views/toolbar-menu/custom-html.html'),
  location: '/custom',
  group: 'toolbar-menu',
  controller: 'demoToolbarMenu as vm'
})
export default class ToolbarMenuController {
  public toolbarMenu: any;
  public customToolbarItems: any;
  public toolbarMenuViews: any;

  public constructor(private MiQToolbarSettingsService: any, private MiQEndpointsService: any, private $window: any) {
    this.setEndpoints();
    this.MiQToolbarSettingsService.getSettings()
      .then(dataResponse => {
        this.toolbarMenu = dataResponse.items;
        this.toolbarMenuViews = dataResponse.dataViews;
      });
    this.setEndpoints(true);
    this.MiQToolbarSettingsService.getSettings()
      .then(dataResponse => {
        this.customToolbarItems = dataResponse.items;
      });
    this.$window.callFunction = (target) => {
      const elementData = {
        target: target,
        'function-call': target.getAttribute('data-function'),
        'function-data': JSON.parse(target.getAttribute('data-function-data'))
      };
    };

  }

  public onViewClick(item: any) {
    this.toolbarMenuViews.forEach((item: any) => {
      item.selected = false;
    });
    item.selected = true;
  }

  private setEndpoints(isCustom = false) {
    this.MiQEndpointsService.rootPoint = '/data';
    this.MiQEndpointsService.endpoints.toolbarSettings = isCustom ? '/custom_toolbar.json' : '/toolbar.json';
  }
}
