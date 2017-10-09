import * as _ from 'lodash';
import * as ng from 'angular';
import {__} from '../../../common/translateFunction';

/**
 * Controller for the Dialog Editor modal service
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name ModalController
 */
class ModalController {
  public modalTab: string = 'element_information';
  public modalData: any;
  public dynamicFieldList: any;
  public categories: any;
  public modalTitle: string;
  public elementData: any;

  /*@ngInject*/
  constructor(private $uibModal: any,
              private $uibModalInstance: any,
              private API: any,
              private DialogEditor: any) {
    ng.extend(this, {
      saveDialogFieldDetails: this.saveDialogFieldDetails,
      addEntry: this.addEntry,
      removeEntry: this.removeEntry,
      deleteField: this.deleteField,
      modalUnchanged: this.modalUnchanged,
      modalTabSet: this.modalTabSet,
      modalTabIsSet: this.modalTabIsSet,
      currentCategoryEntries: this.currentCategoryEntries,
    });

    // clone data from service
    let elements = {
      tab: this.DialogEditor.getDialogTabs()[
        this.elementData.tabId],
      box: this.DialogEditor.getDialogTabs()[
        this.elementData.tabId].dialog_groups[
          this.elementData.boxId],
      field: this.DialogEditor.getDialogTabs()[
        this.elementData.tabId].dialog_groups[
          this.elementData.boxId].dialog_fields[
            this.elementData.fieldId]
    };
    this.modalData = this.elementData.type in elements &&
      _.cloneDeep(elements[this.elementData.type]);

    if (this.elementData.type === 'field') {
      this.modalData.dynamicFieldList = this.DialogEditor.getDynamicFields(this.modalData.id);

      const dialogFieldResponderIds = _.map(this.modalData.dynamicFieldList, (field) => {
        if (_.includes(this.modalData.dialog_field_responders, field['name'])) {
          return field['id'];
        }
      });

      this.modalData.dialog_field_responders = dialogFieldResponderIds;

      // load categories from API, if the field is Tag Control
      if (this.modalData.type === 'DialogFieldTagControl') {
        this.resolveCategories().then(
          (categories: any) => { this.categories = categories; }
        );
      }
      // set modal title
      if (!this.modalData.dynamic) {
        const titles = {
          DialogFieldTextBox:         __('Text Box'),
          DialogFieldTextAreaBox:     __('Text Area'),
          DialogFieldCheckBox:        __('Check Box'),
          DialogFieldDropDownList:    __('Dropdown'),
          DialogFieldRadioButton:     __('Radio Button'),
          DialogFieldDateControl:     __('Datepicker'),
          DialogFieldDateTimeControl: __('Timepicker'),
          DialogFieldTagControl:      __('Tag Control')
        };
        const titleLabel = this.modalData.type in titles &&
          titles[this.modalData.type];
        this.modalTitle =  __(`Edit ${titleLabel} Field`);
      }
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
    let elements = {
      tab: this.DialogEditor.getDialogTabs()[
        this.DialogEditor.activeTab],
      box: this.DialogEditor.getDialogTabs()[
        this.DialogEditor.activeTab].dialog_groups[
          this.elementData.boxId],
      field: this.DialogEditor.getDialogTabs()[
        this.DialogEditor.activeTab].dialog_groups[
          this.elementData.boxId].dialog_fields[
            this.elementData.fieldId]
    };
    return this.elementData.type in elements &&
      _.isMatch(elements[this.elementData.type], this.modalData);
  }

  /**
   * Store modified data back to the service.
   * @memberof ModalController
   * @function saveDialogFieldDetails
   */
  public saveDialogFieldDetails() {
    switch (this.elementData.type) {
      case 'tab':
        _.assignIn(
          this.DialogEditor.getDialogTabs()[
            this.DialogEditor.activeTab],
          { label: this.modalData.label,
            description: this.modalData.description }
        );
        break;
      case 'box':
        _.assignIn(
          this.DialogEditor.getDialogTabs()[
            this.DialogEditor.activeTab].dialog_groups[
              this.elementData.boxId],
          { label: this.modalData.label,
            description: this.modalData.description }
        );
        break;
      case 'field':
        this.DialogEditor.getDialogTabs()[
          this.DialogEditor.activeTab].dialog_groups[
            this.elementData.boxId].dialog_fields[
              this.elementData.fieldId] = this.modalData;
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
        this.elementData.boxId
      ].dialog_fields,
      (field: any) => field.position === this.elementData.fieldId
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

  public showModal(modalOptions: any) {
    let modal = this.$uibModal.open(modalOptions);
    return modal.result.catch(() => undefined);
  }
}

/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name dialogEditorModal
 * @description
 *    Component implementing behaviour for the boxes inside of
 *    the dialogs tabs.
 * @example
 * <dialog-editor-modal>
 * </dialog-editor-modal>
 */
export default class Modal {
  public template = '';
  public transclude = true;
  public controller: any = ModalController;
  public bindings: any = {
    options: '<',
    visible: '<',
    elementData: '<',
  };
}
