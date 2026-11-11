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
  public static instance: AvailableComponentsService;
  public availableComponents: IAvailableGroup[];

  public constructor() {
    if (AvailableComponentsService.instance) {
      return AvailableComponentsService.instance;
    }
    this.initComponents();
    AvailableComponentsService.instance = this;
  }

  public initComponents() {
    this.availableComponents = [
      new AvailableGroup('dialog', 'Dialog Components', '/dialog', []),
      new AvailableGroup('tree-view', 'Tree Components', '/tree', [])
    ];
  }
}
