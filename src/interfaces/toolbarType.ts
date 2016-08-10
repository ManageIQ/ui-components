/**
 * Enum for toolbar types. It holds string value of item's type, so accessing these values can be called as:
 * ```Javascript
 * ToolbarType.BUTTON.toString();
 * ```
 * To string method will return string representation of enum type.
 * @memberof miqStaticAssets
 * @ngdoc enum
 * @name ToolbarType
 */
export default class ToolbarType {

  /**
   * Toolbar type BUTTON, string: `button`.
   * @memberof ToolbarType
   * @function BUTTON
   * @type {ToolbarType}
   */
  public static BUTTON = new ToolbarType('button');

  /**
   * Toolbar type BUTTON_TWO_STATE, string: `buttonTwoState`.
   * @memberof ToolbarType
   * @function BUTTON_TWO_STATE
   * @type {ToolbarType}
   */
  public static BUTTON_TWO_STATE = new ToolbarType('buttonTwoState');

  /**
   * Toolbar type BUTTON_SELECT, string: `buttonSelect`.
   * @memberof ToolbarType
   * @function BUTTON_SELECT
   * @type {ToolbarType}
   */
  public static BUTTON_SELECT = new ToolbarType('buttonSelect');

  /**
   * Toolbar type CUSTOM, string: `custom`.
   * @memberof ToolbarType
   * @function CUSTOM
   * @type {ToolbarType}
   */
  public static CUSTOM = new ToolbarType('custom');

  constructor(public value: string) {}

  /**
   * It will return string value of selected toolbar type.
   * @memberof ToolbarType
   * @function toString
   * @returns {string} value of toolbar type.
   */
  public toString(): string {
    return this.value;
  }
}
