describe('modalComponentSpec', () => {
  let bindings;
  describe('controller', () => {
    let modalComponent;

    beforeEach(() => {
      bindings = {
        modalData: { options: { category_id: '10' } }
      };
      angular.mock.module('miqStaticAssets.dialogEditor');
      angular.mock.module('ui.bootstrap');
      angular.mock.inject($componentController => {
      modalComponent = $componentController('dialogEditorModal', {API: {} }, bindings);
      });
    });

    describe('#setupCategoryOptions', () => {
      it('sets the id, name and description entries for the selected tag control', () => {
        modalComponent.categories = { resources : [{'id': '10', 'description': 'CategoryName'}] };
        modalComponent.setupCategoryOptions();
        expect(modalComponent.modalData.options.category_name).toEqual('category_name');
        expect(modalComponent.modalData.options.category_description).toEqual('CategoryName');
      });
    });
  });
});
