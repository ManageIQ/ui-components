(function() {
  'use strict';

  angular.module('miqStaticAssets.dialogEditor')
    .directive('dialogEditorModalFieldTemplate', function() {
      return {
        templateUrl: function(tElement, tAttrs) {
          return 'app/components/dialog-editor-modal-field-template/' + tAttrs.template;
        },
        scope: true,
      };
    });
})();
