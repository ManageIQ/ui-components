(function() {
  'use strict';

  angular.module('miqStaticAssets.dialogEditor')
    .directive('dialogEditorModalFieldTemplate', function() {
      return {
        template: function(tElement, tAttrs) {
          return require('./' + tAttrs.template);
        },
        scope: true,
      };
    });
})();
