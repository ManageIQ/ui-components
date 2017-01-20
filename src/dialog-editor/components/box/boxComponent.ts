import * as ng from 'angular';
import * as _ from 'lodash';

/**
 * Controller for the Dialog Editor box component
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name BoxController
 */
class BoxController {
  public sortableOptionsBox: any;
  public sortableOptionsFields: any;
  public service: any;
  public dialogTabs: any;

  /*@ngInject*/
  constructor(private DialogEditor: any) {
  }

  /**
   * Load service to be able to access it form the template.
   * Load status of tabs.
   * @memberof BoxController
   * @function $onInit
   */
  public $onInit() {
    this.service = this.DialogEditor;
    this.dialogTabs = this.DialogEditor.getDialogTabs();
    // Rules for Drag&Drop sorting of boxes
    this.sortableOptionsBox = {
      axis: 'y',
      cancel: '.nosort',
      cursor: 'move',
      opacity: 0.5,
      revert: 50,
      stop: function(e: any, ui: any) {
        let sortedBox = ui.item.scope();
        // update indexes of other boxes after changing their order
        this.DialogEditor.updatePositions(
          sortedBox.$parent.tab.dialog_groups
        );
      },
    };
    // Rules for Drag&Drop sorting of elements inside of boxes
    this.sortableOptionsFields = {
      axis: 'y',
      cancel: '.nosort',
      cursor: 'move',
      revert: 50,
      stop: function(e: any, ui: any) {
        let sortedField = ui.item.scope();
        // update indexes of other fields after changing their order
        this.DialogEditor.updatePositions(
          sortedField.$parent.box.dialog_fields
        );
      },
    };
  }

  /**
   * Add a new box to the list.
   * The new box is automatically appended to the last position of the list
   * @memberof BoxController
   * @function addBox
   */
  public addBox() {
    this.dialogTabs[this.DialogEditor.activeTab].dialog_groups
      .push(
        {
          description: __('Description'),
          label: __('Label'),
          display: 'edit',
          position: 0,
          dialog_fields: [],
        }
      );
  }

  /**
   * Remove box and all its content from the dialog.
   * @memberof BoxController
   * @function removeBox
   * @param {number} id as index of removed box
   */
  public removeBox(id: number) {
    _.remove(
      this.dialogTabs[this.DialogEditor.activeTab].dialog_groups,
      function(box) {
        return box.position === id;
      }
    );
    // update indexes of other boxes after removing
    this.DialogEditor.updatePositions(
      this.dialogTabs[this.DialogEditor.activeTab].dialog_groups
    );
  }

  /**
   * Handle Drag&Drop event.
   * @memberof BoxController
   * @function droppableOptions
   * @param {number} event jQuery object
   * @param {number} ui jQuery object
   */
  public droppableOptions(e: any, ui: any) {
    let droppedItem = ng.element(e.target).scope();
    // update indexes of other boxes after changing their order
    this.DialogEditor.updatePosition(
      droppedItem.box.dialog_fields
    );
  }

  /**
   * Show modal to edit label and description of the box.
   * @memberof BoxController
   * @function editDialogModal
   * @param {number} tab is an index of tab, where the box is placed
   * @param {number} box is an index of box
   */
  public editDialogModal(tab: number, box: number) {
    this.DialogEditor.showModal(tab, box);
  }
}

/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name dialogEditorBoxes
 * @description
 *    Component implementing behaviour for the boxes inside of
 *    the dialogs tabs.
 * @example
 * <dialog-editor-boxes>
 * </dialog-editor-boxes>
 */
export default class Box {
  public template = require('./box.html');
  public controller: any = BoxController;
  public controllerAs: string = 'vm';
}
