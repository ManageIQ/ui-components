///<reference path="../tsd.d.ts"/>

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
      console.log(elementData);
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
