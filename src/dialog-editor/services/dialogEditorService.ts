import * as _ from 'lodash';

export default class DialogEditorService {
  public data: any = {};
  public activeTab: number = 0;

  /**
   * Store data passed in parameter.
   * @memberof DialogEditorService
   * @function setData
   * @param {any} nested object containing data of the dialog
   */
  public setData(data: any) {
    this.data = data;
  }

  /**
   * Return dialog id loaded at service.
   * @memberof DialogEditorService
   * @function getDialogId
   */
  public getDialogId() {
    return this.data.content[0].id;
  }

  /**
   * Return dialog label loaded at service.
   * @memberof DialogEditorService
   * @function getDialogLabel
   */
  public getDialogLabel() {
    return this.data.content[0].label;
  }

  /**
   * Return dialog description loaded at service.
   * @memberof DialogEditorService
   * @function getDialogDescription
   */
  public getDialogDescription() {
    return this.data.content[0].description;
  }

  /**
   * Return dialog tabs loaded at service.
   * @memberof DialogEditorService
   * @function getDialogTabs
   */
  public getDialogTabs() {
    return this.data.content[0].dialog_tabs;
  }

  public getDynamicFields(idToExclude) {
    let dynamicFields = [];
    _.forEach(this.data.content[0].dialog_tabs, (tab: any) => {
      _.forEach(tab.dialog_groups, (group: any) => {
        _.forEach(group.dialog_fields, (field: any) => {
          if (field.dynamic === true && field.id !== idToExclude) {
            dynamicFields.push(field);
          }
        });
      });
    });

    return dynamicFields;
  }

  /**
   * Update positions for elements in array.
   * @memberof DialogEditorService
   * @function updatePositions
   * @param {any[]} array of elements to sort
   */
  public updatePositions(elements: any[]) {
    elements.forEach((value, key) => value.position = key);
  }
}
