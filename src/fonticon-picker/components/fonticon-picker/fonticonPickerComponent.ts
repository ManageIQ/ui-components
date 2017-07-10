import FonticonService from '../../services/fonticonService';

export class FonticonPickerController {
  public families = [];
  public fonticons;
  public btnClass = 'btn-default';
  public selected;
  public toSelect;
  public inputName;
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
    }
    this.modal.close();
  }

  public markToSelect(icon) {
    this.toSelect = icon;
  }
}

export default class FonticonPicker implements ng.IComponentOptions {
  public controller = FonticonPickerController;
  public template = require('./fonticon-picker.html');
  public transclude = true;
  public bindings = {
    btnClass: '@?',
    selected: '@',
    inputName: '@'
  };
}
