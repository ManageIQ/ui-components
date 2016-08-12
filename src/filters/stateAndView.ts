import {IToolbarItem} from '../interfaces/toolbar';
import {ToolbarType} from '../interfaces/toolbarType';

/**
 * @memberof miqStaticAssets
 * @ngdoc filter
 * @name StateAndViewFilter
 */
export default class StateAndViewFilter {
  /**
   * Filter items based on type and id. Type has to be {@link miqStaticAssets.ToolbarType.BUTTON_TWO_STATE} and id
   * can't start with `view_`.
   * @memberof StateAndView
   * @function filter
   * @returns {function(any): any}
   */
  public static filter() {
    return (toolbarItems: Array<IToolbarItem>): any => {
      return toolbarItems.filter((toolbarItem: IToolbarItem) => {
        return toolbarItem.type === ToolbarType.BUTTON_TWO_STATE && toolbarItem.id.indexOf('view_') === -1;
      });
    };
  }
}
