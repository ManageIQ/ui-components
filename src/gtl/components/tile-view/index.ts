import TileView from './tileViewComponent';
import Paging from './pagingComponent';

export default (module: ng.IModule) => {
  module.component('miqTileView', new TileView);
  module.component('miqPaging', new Paging);
};
