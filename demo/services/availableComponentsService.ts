///<reference path="../tsd.d.ts"/>

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
                     public components: IAvailComponent[]) {}
}

export class AvailableComponent implements IAvailComponent {
  public constructor(public name: string,
                     public title: string,
                     public location: string,
                     public template: string,
                     public controller: string) {}
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
          require<string>('./../views/toolbar-menu/basic.html'),
          'demoToolbarMenu as vm'),
        new AvailableComponent('custom_html', '' +
          'Custom Html Toolbar Menu',
          '/custom',
          require<string>('./../views/toolbar-menu/custom-html.html'),
          'demoToolbarMenu as vm')
      ])
    ];
  }
}
