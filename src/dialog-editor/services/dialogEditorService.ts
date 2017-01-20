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

  /**
   * Update positions for elements in array.
   * @memberof DialogEditorService
   * @function updatePositions
   * @param {any[]} array of elements to sort
   */
  public updatePosition(elements: any[]) {
    if (elements.length !== 0) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].position = i;
      }
    }
  }
}
