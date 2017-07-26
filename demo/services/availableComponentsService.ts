export interface IAvailComponent {
  name: string;
  title: string;
  location: string;
  template: string;
  controller: string;
}

export interface IAvailableGroup {
  name: string;
  title: string;
  location: string;
  components: IAvailComponent[];
}

export class AvailableGroup implements IAvailableGroup {
  public constructor(public name: string,
    public title: string,
    public location: string,
    public components: IAvailComponent[]) { }
}

export class AvailableComponent implements IAvailComponent {
  public constructor(public name: string,
    public title: string,
    public location: string,
    public template: string,
    public controller: string) { }
}
export default class AvailableComponentsService {
  public availableComponents: IAvailableGroup[];

  public constructor() {
    this.initComponents();
  }

  private initComponents() {
    this.availableComponents = [
      new AvailableGroup('toolbar-menu', 'Toolbar Menu Components', '/toolbar-menu', [
        new AvailableComponent('basic', '' +
          'Basic Toolbar Menu',
          '/basic',
          require('./../views/toolbar-menu/basic.html'),
          'demoToolbarMenu as vm'),
        new AvailableComponent('custom_html', '' +
          'Custom Html Toolbar Menu',
          '/custom',
          require('./../views/toolbar-menu/custom-html.html'),
          'demoToolbarMenu as vm')
      ]),
      new AvailableGroup('tile-menu', 'Tile Components', '/tile-view', [
        new AvailableComponent('small',
          'Small tile',
          '/small',
          require('./../views/tile-view/small.html'),
          'demoDataTable as vm'),
        new AvailableComponent('big',
          'Big tile',
          '/big',
          require('./../views/tile-view/big.html'),
          'demoDataTable as vm'),
      ]),
      new AvailableGroup('data-table', 'Data table Components', '/data-table', [
        new AvailableComponent('basic',
          'Basic data table',
          '/basic',
          require('./../views/data-table/basic.html'), 'demoDataTable as vm')
      ]),
      new AvailableGroup('site-switcher', 'Site Switcher Components', '/site-switcher', [
        new AvailableComponent('basic',
          'Site switcher',
          '/basic',
          require('./../views/site-switcher/basic.html'), 'demoSiteSwitcher as vm')
      ]),
      new AvailableGroup('fonticon-picker', 'Fonticon Picker Components', '/fonticon-picker', [
        new AvailableComponent('basic',
          'Fonticon picker',
          '/basic',
          require('./../views/fonticon-picker/basic.html'), 'demoFonticonPicker as vm')
      ]),
      new AvailableGroup('dialog-user', 'Dialog-User Component', '/dialog-user', [
        new AvailableComponent('dialog-user',
          'Dialog-user',
          '/dialog-user',
          require('./../views/dialogs/main.html'), 'demoDialogs as vm')
      ])
    ];
  }
}
