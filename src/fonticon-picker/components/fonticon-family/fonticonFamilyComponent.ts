import { FonticonPickerController } from '../fonticon-picker/fonticonPickerComponent';

class FonticonFamilyController {
  public FonticonPickerCtrl : FonticonPickerController;
  private title : string;
  private selector : string;

  public $onInit() {
    this.FonticonPickerCtrl.addFamily({
      title: this.title,
      selector: this.selector
    });
  }
}

export default class FonticonPicker implements ng.IComponentOptions {
  public controller = FonticonFamilyController;
  public require = {
    FonticonPickerCtrl: '^miqFonticonPicker'
  };
  public bindings = {
    title: '@',
    selector: '@'
  };
}
