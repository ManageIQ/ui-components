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
  public modalOptions: any;
  public visible: boolean;
  public elementInfo: any;
  private uibModalInstance;

  /*@ngInject*/
  constructor(private $uibModal: any,
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

  }

  public loadModalData(elem: any) {
    if (elem !== undefined) {
      // clone data from service
      let elements = {
        tab: this.loadModalTabData(elem.tabId),
        box: this.loadModalBoxData(elem.tabId, elem.boxId),
        field: this.loadModalFieldData(elem.tabId, elem.boxId, elem.fieldId)
      };

      this.modalData = elem.type in elements &&
        _.cloneDeep(elements[elem.type]);

      if (elem.type === 'field') {
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
  }

  public loadModalTabData(tab: number) {
    let tabList = this.DialogEditor.getDialogTabs();
    return tabList[tab];
  }

  public loadModalBoxData(tab: number, box: number) {
    let tabList = this.DialogEditor.getDialogTabs();
    let boxList = tabList[tab];
    return boxList.dialog_groups[box];
  }

  public loadModalFieldData(tab: number, box: number, field: number) {
    let tabList = this.DialogEditor.getDialogTabs();
    let boxList = tabList[tab];
    let fieldList = boxList.dialog_groups[box];
    return fieldList.dialog_fields[field];
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

  public $onChanges(changesObj: any) {
    if (changesObj.modalOptions && this.modalOptions) {
      this.showModal(this.modalOptions);
    }
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
          this.elementInfo.boxId],
      field: this.DialogEditor.getDialogTabs()[
        this.DialogEditor.activeTab].dialog_groups[
          this.elementInfo.boxId].dialog_fields[
            this.elementInfo.fieldId]
    };
    return this.elementInfo.type in elements &&
      _.isMatch(elements[this.elementInfo.type], this.modalData);
  }

  /**
   * Store modified data back to the service.
   * @memberof ModalController
   * @function saveDialogFieldDetails
   */
  public saveDialogFieldDetails() {
    switch (this.elementInfo.type) {
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
              this.elementInfo.boxId],
          { label: this.modalData.label,
            description: this.modalData.description }
        );
        break;
      case 'field':
        this.DialogEditor.getDialogTabs()[
          this.DialogEditor.activeTab].dialog_groups[
            this.elementInfo.boxId].dialog_fields[
              this.elementInfo.fieldId] = this.modalData;
        break;
      default:
        break;
    }

    // close modal
    this.uibModalInstance.close();
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
        this.elementInfo.boxId
      ].dialog_fields,
      (field: any) => field.position === this.elementInfo.fieldId
    );

    // close modal
    this.uibModalInstance.close();
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

  public showModal(options: any) {
    this.loadModalData(this.elementInfo);
    this.uibModalInstance = this.$uibModal.open(options);
    return this.uibModalInstance.result.catch(() => undefined);
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
    modalOptions: '<',
    visible: '<',
    elementInfo: '<'
  };
}
