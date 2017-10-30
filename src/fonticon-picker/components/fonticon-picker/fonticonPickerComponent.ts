import FonticonService from '../../services/fonticonService';

export class FonticonPickerController {
  public families = [];
  public fonticons;
  public btnClass = 'btn-default';
  public selected;
  public toSelect;
  public inputName; // TODO: this can be deleted after the form is angularized
  public iconChanged: (args: {selected: any}) => void; // TODO: this can be deleted after the form is angularized
  private modal;

  /*@ngInject*/
  constructor(private MiQFonticonService: FonticonService, private $uibModal) {}

  public addFamily(font) {
    this.families.push(font);
  }

  public openModal() {
    if (this.fonticons === undefined) {
      this.fonticons = this.MiQFonticonService.fetch(this.families);
    }

    this.toSelect = this.selected;

    this.modal = this.$uibModal.open({
      template: require('./fonticon-modal.html'),
      windowClass: 'fonticon-modal',
      keyboard: false,
      size: 'lg',
      controllerAs: '$ctrl',
      controller: ['parent', function(parent) { this.parent = parent; }],
      resolve: {
        parent: () => this
      },
    });
  }

  public closeModal(save) {
    if (save) {
      this.selected = this.toSelect;
      this.iconChanged({selected: this.selected}); // TODO: this can be deleted after the form is angularized
    }
    this.modal.close();
  }

  public markToSelect(icon) {
    this.toSelect = icon;
  }

  public isDisabled(): boolean {
    return !this.toSelect || this.toSelect === this.selected;
  }
}

export default class FonticonPicker implements ng.IComponentOptions {
  public controller = FonticonPickerController;
  public template = require('./fonticon-picker.html');
  public transclude = true;
  public bindings = {
    btnClass: '@?',
    selected: '@',
    inputName: '@', // TODO: this can be deleted after the form is angularized
    iconChanged: '&', // TODO: this can be deleted after the form is angularized
  };
}
