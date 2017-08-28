import Pagination from './paginationComponent';
import Paging from './pagingComponent';

export default (module: ng.IModule) => {
  module.component('miqPagination', new Pagination);
  module.component('miqPaging', new Paging);
};
