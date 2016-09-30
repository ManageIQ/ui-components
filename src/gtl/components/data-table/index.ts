import DataTable from './dataTableComponent';

export default (module: ng.IModule) => {
  module.component('miqDataTable', new DataTable);
};
