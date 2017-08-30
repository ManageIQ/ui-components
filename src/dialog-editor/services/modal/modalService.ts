import * as _ from 'lodash';
import * as ng from 'angular';

/**
 * Controller for the Dialog Editor modal service
 * @ngdoc controller
 * @name ModalController
 */
class ModalController {
  public modalTab: string = 'element_information';
  public modalData: any;
  public element: string;
  public categories: any;
  public dialog: any;
  public showTreeView: boolean;

  /*@ngInject*/
  constructor(private dialogDetails: any,
              private $uibModalInstance: any,
              private API: any,
              private DialogEditor: any) {
    ng.extend(this, {
      dialog: this.dialogDetails,
      saveDialogFieldDetails: this.saveDialogFieldDetails,
      addEntry: this.addEntry,
      removeEntry: this.removeEntry,
      deleteField: this.deleteField,
      modalUnchanged: this.modalUnchanged,
      modalTabSet: this.modalTabSet,
      modalTabIsSet: this.modalTabIsSet,
      currentCategoryEntries: this.currentCategoryEntries,
      setResourceAction: this.setResourceAction,
    });
     this.showTreeView = false;

    // recognize edited element type
    if (ng.isUndefined(this.dialog.fieldId)
     && ng.isUndefined(this.dialog.boxId)
     && ng.isDefined(this.dialog.tabId)) {
      this.element = 'tab';
    } else if (ng.isUndefined(this.dialog.fieldId)
            && ng.isDefined(this.dialog.boxId)
            && ng.isDefined(this.dialog.tabId)) {
      this.element = 'box';
    } else if (ng.isDefined(this.dialog.fieldId)
            && ng.isDefined(this.dialog.boxId)
            && ng.isDefined(this.dialog.tabId)) {
      this.element = 'field';
    }

    // clone data from service
    switch (this.element) {
      case 'tab':
        this.modalData = _.cloneDeep(
          this.DialogEditor.getDialogTabs()[
            this.dialog.tabId
          ]
        );
        break;
      case 'box':
        this.modalData = _.cloneDeep(
          this.DialogEditor.getDialogTabs()[
            this.dialog.tabId
          ].dialog_groups[
            this.dialog.boxId
          ]
        );
        break;
      case 'field':
        this.modalData = _.cloneDeep(
          this.DialogEditor.getDialogTabs()[
            this.dialog.tabId
          ].dialog_groups[
            this.dialog.boxId
          ].dialog_fields[
            this.dialog.fieldId
          ]
        );
        // load categories from API, if the field is Tag Control
        if (this.modalData.type === 'DialogFieldTagControl') {
          this.resolveCategories().then(
            (categories: any) => {
              this.categories = categories;
            }
          );
        }
        break;
      default:
        break;
    }
  }

  /**
   * Load categories data from API.
   * @memberof ModalController
   * @function resolveCategories
   */
  public resolveCategories() {
    return this.API.get('/api/categories' +
                        '?expand=resources' +
                        '&attributes=description,single_value,children');
  }

  /**
   * Store the name of the tab, that is currently selected.
   * @memberof ModalController
   * @function modalTabSet
   * @param tab is a name of the tab in the modal
   */
  public modalTabSet(tab: string) {
    this.modalTab = tab;
  }

  /**
   * Returns true/false according to which tab is currently
   * selected in the modal.
   * @memberof ModalController
   * @function modalTabIsSet
   */
  public modalTabIsSet(tab: string) {
    return this.modalTab === tab;
  }

  /**
   * Check for changes in the modal.
   * @memberof ModalController
   * @function modalUnchanged
   */
  public modalUnchanged() {
    switch (this.element) {
      case 'tab':
        return _.isMatch(
          this.DialogEditor.getDialogTabs()[
            this.DialogEditor.activeTab
          ],
          this.modalData
        );
      case 'box':
        return _.isMatch(
          this.DialogEditor.getDialogTabs()[
            this.DialogEditor.activeTab
          ].dialog_groups[
            this.dialog.boxId
          ],
          this.modalData
        );
      case 'field':
        return _.isMatch(
          this.DialogEditor.getDialogTabs()[
            this.DialogEditor.activeTab
          ].dialog_groups[
            this.dialog.boxId
          ].dialog_fields[
            this.dialog.fieldId
          ],
          this.modalData
        );
      default:
        break;
    }
  }

  /**
   * Store modified data back to the service.
   * @memberof ModalController
   * @function saveDialogFieldDetails
   */
  public saveDialogFieldDetails() {
    // TODO: add verification for required forms
    // store data to service
    switch (this.element) {
      case 'tab':
        this.DialogEditor.getDialogTabs()[
          this.DialogEditor.activeTab
        ].label = this.modalData.label;
        // description
        this.DialogEditor.getDialogTabs()[
          this.DialogEditor.activeTab
        ].description = this.modalData.description;
        break;
      case 'box':
        // label
        this.DialogEditor.getDialogTabs()[
          this.DialogEditor.activeTab
        ].dialog_groups[
          this.dialog.boxId
        ].label = this.modalData.label;
        // description
        this.DialogEditor.getDialogTabs()[
          this.DialogEditor.activeTab
        ].dialog_groups[
          this.dialog.boxId
        ].description = this.modalData.description;
        break;
      case 'field':
        this.DialogEditor.getDialogTabs()[
          this.DialogEditor.activeTab
        ].dialog_groups[
          this.dialog.boxId
        ].dialog_fields[
          this.dialog.fieldId
        ] = this.modalData;
        break;
      default:
        break;
    }

    // close modal
    this.$uibModalInstance.close();
  }

  /**
   * Delete dialog field selected in modal.
   * @memberof ModalController
   * @function deleteField
   */
  public deleteField() {
    _.remove(
      this.DialogEditor.getDialogTabs()[
        this.DialogEditor.activeTab
      ].dialog_groups[
        this.dialog.boxId
      ].dialog_fields,
      (field: any) => field.position === this.dialog.fieldId
    );

    // close modal
    this.$uibModalInstance.close();
  }

  /**
   * Add entry for radio button / dropdown select.
   * @memberof ModalFieldController
   * @function addEntry
   */
  public addEntry() {
    this.modalData.values.push(['', '']);
  }

  /**
   * Remove entry for radio button / dropdown select
   * @memberof ModalFieldController
   * @function removeEntry
   * @param entry to remove from array
   */
  public removeEntry(entry: any) {
    _.pull(this.modalData.values, entry);
  }

  /**
   * Finds entries for the selected category.
   * @memberof ModalController
   * @function currentCategoryEntries
   */
  public currentCategoryEntries() {
    if (ng.isDefined(this.categories)) {
      return _.find(
        this.categories.resources,
        'id',
        this.modalData.options.category_id
      );
    }
  }

  public setResourceAction = (resource) => {
    this.modalData.resource_action.ae_namespace = resource;
  }

  public openTreeView = (open) => {
    this.showTreeView = open;
  }

}

export default class ModalService {
  /** @ngInject */
  constructor(private $uibModal: any) {
  }

  /**
   * Show modal of the element.
   * @memberof ModalService
   * @function showModal
   * @param {number} index of tab, where the box is placed
   * @param {number} index of box, where the field is placed
   * @param {number} index of field
   */
  public showModal(tab: number, box: number, field: number) {
    let modalOptions = {
      template: require('./modal.html'),
      controller: ModalController,
      controllerAs: 'vm',
      size: 'lg',
      resolve: {
        dialogDetails: () => {
          return {tabId: tab, boxId: box, fieldId: field};
        },
      },
    };
    let modal = this.$uibModal.open(modalOptions);

    return modal.result.catch(() => undefined);
  }
}
