/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = ".";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 88);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = _;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var modalFieldTemplateComponent_1 = __webpack_require__(3);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.component('dialogEditorModalFieldTemplate', new modalFieldTemplateComponent_1.default);
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Controller for the Dialog Editor Modal Field Template component
 * @ngdoc controller
 * @name ModalFieldController
 */
var ModalFieldController = (function () {
    function ModalFieldController() {
    }
    return ModalFieldController;
}());
/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name dialogEditorModalFieldTemplate
 * @description
 *    Component contains templates for the modal for each field type
 * @example
 * <dialog-editor-modal-field-template ng-switch-when="DialogFieldTextBox"
 *                                     template="text-box.html"
 *                                     modal-data="vm.modalData">
 * </dialog-editor-modal-field-template>
 */
var ModalFieldTemplate = (function () {
    function ModalFieldTemplate() {
        /*@ngInject*/
        this.template = function ($element, $attrs) { return __webpack_require__(86)("./" + $attrs.template); };
        this.template.$inject = ["$element", "$attrs"];
        this.scope = true;
        this.controllerAs = 'vm';
        this.bindings = {
            modalData: '=',
            categories: '=?',
            addEntry: '&?',
            removeEntry: '&?',
            currentCategoryEntries: '&?',
            resolveCategories: '&?',
        };
    }
    return ModalFieldTemplate;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ModalFieldTemplate;


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _ = __webpack_require__(0);
/**
 * This is abstract controller for implementing shared methods between data table and tile views.
 * @memberof miqStaticAssets.gtl
 * @ngdoc controller
 * @name DataViewClass
 */
var DataViewClass = (function () {
    /*@ngInject*/
    DataViewClass.$inject = ["MiQTranslateService"];
    function DataViewClass(MiQTranslateService) {
        this.MiQTranslateService = MiQTranslateService;
        this.currentPageView = 1;
    }
    /**
     * Public method which will perform checking all entities.
     * @memberof DataViewClass
     * @function onCheckAll
     * @param isChecked true | false based on checked value.
     */
    DataViewClass.prototype.onCheckAll = function (isChecked) {
        var _this = this;
        _.each(this.rows, function (oneRow) {
            _this.onItemSelected({ item: oneRow, isSelected: isChecked });
        });
    };
    /**
     * Helper method which will pass sortId and isAscending to parent controller.
     * @memberof DataViewClass
     * @function onSortClick
     * @param sortId id of sorted header column.
     * @param isAscending true | false based on ascending order.
     */
    DataViewClass.prototype.onSortClick = function (sortId, isAscending) {
        this.onSort({ headerId: sortId, isAscending: isAscending });
    };
    /**
     * Helper method for calculating loading more items after selecting how many items per page should be visible.
     * @memberof DataViewClass
     * @function perPageClick
     * @param item {Object} enhanced IToolbarItem with value.
     */
    DataViewClass.prototype.perPageClick = function (item) {
        var maxPage = Math.ceil(this.settings.items / item.value);
        this.currentPageView = this.currentPageView > maxPage ? maxPage : this.currentPageView;
        var start = DataViewClass.calculateStartIndex(this.currentPageView, item.value);
        this.loadMoreItems({ start: start, perPage: item.value });
    };
    /**
     * Helper method for calculating what page should be visible, it works with perPage and total amount of values.
     * @memberof DataViewClass
     * @function setPage
     * @param pageNumber {number} number of desired page, if this page is out of bound, it will be rounded.
     */
    DataViewClass.prototype.setPage = function (pageNumber) {
        if (pageNumber > this.settings.total) {
            this.currentPageView = this.settings.total;
            pageNumber = this.currentPageView;
        }
        this.currentPageView = pageNumber;
        var start = DataViewClass.calculateStartIndex(pageNumber, this.settings.perpage);
        this.loadMoreItems({ start: start, perPage: this.settings.perpage });
    };
    DataViewClass.prototype.translateOf = function (start, end, total) {
        return this.settings && this.settings.hasOwnProperty('translateTotalof') ?
            this.settings.translateTotalOf(start, end, total) :
            start + " - " + end + " of " + total;
    };
    DataViewClass.prototype.setPagingNumbers = function () {
        if (this.settings.hasOwnProperty('current') && this.settings.hasOwnProperty('perpage')) {
            this.settings.startIndex =
                this.settings.startIndex ||
                    DataViewClass.calculateStartIndex(this.settings.current, this.settings.perpage);
            if (this.settings.current === this.settings.total) {
                this.settings.endIndex = this.settings.items - 1;
            }
            else {
                this.settings.endIndex = this.settings.current * this.settings.perpage - 1;
            }
        }
    };
    /**
     * Helper static method for calculating start index based on pageNumber and number of visible items.
     * @memberof DataViewClass
     * @function calculateStartIndex
     * @param pageNumber {number} current page number.
     * @param perPage {number} how many of items are visible per page.
     * @returns {number} start index for limit filter.
     */
    DataViewClass.calculateStartIndex = function (pageNumber, perPage) {
        return (pageNumber - 1) * perPage;
    };
    return DataViewClass;
}());
exports.DataViewClass = DataViewClass;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Enum for toolbar types. It holds string value of item's type.
 * @memberof miqStaticAssets
 * @ngdoc enum
 * @name ToolbarType
 */
exports.ToolbarType = {
    /**
     * Button type: `button`
     * @type {string}
     */
    BUTTON: 'button',
    /**
     * Button two state type: `buttonTwoState`
     * @type {string}
     */
    BUTTON_TWO_STATE: 'buttonTwoState',
    /**
     * Button select type: `buttonSelect`
     * @type {string}
     */
    BUTTON_SELECT: 'buttonSelect',
    /**
     * Custom type: `custom`
     * @type {string}
     */
    CUSTOM: 'custom',
    /**
     * Separator type: `separator`
     * @type {string}
     */
    SEPARATOR: 'separator'
};


/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var services_1 = __webpack_require__(52);
var components_1 = __webpack_require__(49);
var angular = __webpack_require__(1);
var common;
(function (common) {
    common.app = angular.module('miqStaticAssets.common', []);
    /*@ngInject*/
    common.app.config(["$windowProvider", function ($windowProvider) {
        var windowService = $windowProvider.$get();
        if (!windowService.hasOwnProperty('__')) {
            windowService.__ = function (translateString) { return translateString; };
        }
    }]);
    services_1.default(common.app);
    components_1.default(common.app);
})(common || (common = {}));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var services_1 = __webpack_require__(64);
var components_1 = __webpack_require__(58);
var angular = __webpack_require__(1);
var dialogEditor;
(function (dialogEditor) {
    dialogEditor.app = angular.module('miqStaticAssets.dialogEditor', [
        'ui.sortable',
        'ngDragDrop',
        'frapontillo.bootstrap-switch'
    ]);
    services_1.default(dialogEditor.app);
    components_1.default(dialogEditor.app);
})(dialogEditor || (dialogEditor = {}));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var services_1 = __webpack_require__(76);
var filters_1 = __webpack_require__(72);
var components_1 = __webpack_require__(68);
var angular = __webpack_require__(1);
var gtl;
(function (gtl) {
    gtl.app = angular.module('miqStaticAssets.gtl', []);
    services_1.default(gtl.app);
    filters_1.default(gtl.app);
    components_1.default(gtl.app);
})(gtl || (gtl = {}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var angular = __webpack_require__(1);
var miqStaticAssets;
(function (miqStaticAssets) {
    angular.module('miqStaticAssets', [
        'miqStaticAssets.toolbar',
        'miqStaticAssets.common',
        'miqStaticAssets.dialogEditor',
        'miqStaticAssets.gtl',
        'miqStaticAssets.siteSwitcher'
    ]);
})(miqStaticAssets || (miqStaticAssets = {}));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var siteSwitcherComponent_1 = __webpack_require__(77);
var angular = __webpack_require__(1);
var siteSwitcher;
(function (siteSwitcher) {
    siteSwitcher.app = angular.module('miqStaticAssets.siteSwitcher', []);
    siteSwitcher.app.component('miqSiteSwitcher', new siteSwitcherComponent_1.default);
})(siteSwitcher || (siteSwitcher = {}));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var services_1 = __webpack_require__(84);
var components_1 = __webpack_require__(78);
var angular = __webpack_require__(1);
var toolbar;
(function (toolbar) {
    toolbar.app = angular.module('miqStaticAssets.toolbar', ['ngSanitize']);
    services_1.default(toolbar.app);
    components_1.default(toolbar.app);
})(toolbar || (toolbar = {}));


/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, exports) {

module.exports = "<div class='dialog'>\n  <div style=\"background-color: #f1f1f1; padding: 20px;\"\n       ng-model='vm.dialogTabs[vm.service.activeTab].dialog_groups'\n       ui-sortable='vm.sortableOptionsBox'\n       ng-repeat='tab in vm.dialogTabs'\n       ng-if='tab.position === vm.service.activeTab'>\n    <!-- tab content -->\n    <div ng-repeat='box in tab.dialog_groups track by $index'>\n      <div class=\"panel panel-default\"\n           data-drop='true'\n           jqyoui-droppable='{multiple: true, onDrop: \"vm.droppableOptions\"}'\n           ng-model='box.dialog_fields'>\n        <div class=\"panel-heading\">\n          <i class=\"pficon-edit\"\n             ng-click='vm.editDialogModal(\n               vm.service.activeTab,\n               box.position\n             )'></i>\n          <strong>{{ box.label }}</strong>\n          <button type=\"button\" class=\"close\"\n                  ng-click=\"vm.removeBox(box.position)\">\n            <span aria-hidden=\"true\">\n              <i class=\"fa fa-times\"></i>\n            </span>\n          </button>\n        </div>\n        <div class=\"panel-body\">\n          <div ui-sortable='vm.sortableOptionsFields'\n               ng-model='box.dialog_fields'>\n            <div class=\"well well-lg nosort\"\n                 ng-if='box.dialog_fields.length === 0'>\n              <i class=\"fa fa-object-group\"></i>\n              {{ 'Drag your components here' | translate }}\n            </div>\n            <div ng-repeat='field in box.dialog_fields'>\n              <form class=\"form-horizontal\">\n                <dialog-editor-field box-position=\"box.position\" field-data='field'></dialog-editor-field>\n              </form>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"blank-slate-pf nosort\"\n         ng-if='tab.dialog_groups.length === 0'\n         ng-click='vm.addBox()'>\n      <div class=\"blank-slate-pf-icon\">\n        <i class=\"fa fa-plus-circle\"></i>\n      </div>\n      <h1 translate>Start with adding a box</h1>\n    </div>\n    <div class=\"panel panel-default nosort\">\n      <a ng-click='vm.addBox()' translate>\n        <i class=\"pficon-add-circle-o\"></i>&nbsp;Create Box\n      </a>\n    </div>\n  </div>\n</div>\n"

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "<div ng-switch on=\"vm.fieldData.type\" class=\"form-group\">\n  <label class=\"control-label col-sm-2\">{{ vm.fieldData.label }}</label>\n  <div class=\"col-sm-5\">\n\n    <!-- text box -->\n    <input ng-switch-when=\"DialogFieldTextBox\"\n           ng-model=\"vm.fieldData.default_value\"\n           class=\"form-control\"\n           type=\"{{ vm.fieldData.options.protected ? 'password' : 'text' }}\"\n           placeholder=\"{{'Default value'|translate}}\">\n\n    <!-- text area -->\n    <textarea ng-switch-when=\"DialogFieldTextAreaBox\"\n              ng-model=\"vm.fieldData.default_value\"\n              class=\"form-control\"\n              rows=\"4\">\n      {{ vm.fieldData.default_value }}\n    </textarea>\n\n    <!-- check box -->\n    <input ng-switch-when=\"DialogFieldCheckBox\"\n           ng-model=\"vm.fieldData.default_value\"\n           ng-true-value=\"'t'\"\n           class=\"form-control\"\n           type=\"checkbox\">\n\n    <!-- date control -->\n    <input ng-switch-when=\"DialogFieldDateControl\"\n           pf-datepicker options=\"vm.fieldData.options\"\n           ng-disabled=\"true\"\n           date=\"vm.fieldData.default_value\">\n\n    <!-- date time control -->\n    <div ng-switch-when=\"DialogFieldDateTimeControl\">\n      <div class=\"col-sm-6 dateTimePadding\">\n        <input ng-model=\"vm.fieldData.default_value\"\n               pf-datepicker options=\"vm.fieldData.dateOptions\"\n               date=\"vm.fieldData.default_value\">\n      </div>\n      <div class=\"col-sm-6\">\n        <timepicker ng-model=\"vm.fieldData.default_value\"></timepicker>\n      </div>\n    </div>\n\n    <!-- drop down list -->\n    <select ng-switch-when=\"DialogFieldDropDownList\"\n            ng-model=\"vm.fieldData.default_value\"\n            class=\"form-control\">\n      <option ng-repeat=\"option in vm.fieldData.values\"\n              value=\"{{ option[0] }}\">\n        {{ option[1] }}\n      </option>\n    </select>\n\n    <!-- radio button -->\n    <span ng-switch-when=\"DialogFieldRadioButton\"\n          class=\"btn-group\">\n      <label ng-repeat=\"option in vm.fieldData.values\"\n             class=\"btn btn-primary\">\n        <input type=\"radio\"\n               ng-model=\"vm.fieldData.default_value\"\n               name=\"vm.fieldData.name\"\n               value=\"option[0]\">\n        {{ option[1] }}\n      </label>\n    </span>\n\n    <!-- tag control -->\n    <select ng-switch-when=\"DialogFieldTagControl\"\n            class=\"form-control\">\n      <option ng-repeat=\"option in vm.fieldData.values\"\n              value=\"{{ option[0] }}\">\n        {{ option[1] }}\n      </option>\n    </select>\n\n  </div>\n  <div class=\"col-sm-5\">\n    <button type=\"button\" class=\"close\"\n            ng-click=\"vm.editDialogModal(\n              vm.service.activeTab,\n              vm.boxPosition,\n              vm.fieldData.position\n            )\">\n      <span aria-hidden=\"true\">\n        <i class=\"pficon-edit\"></i>\n      </span>\n    </button>\n  </div>\n</div>\n"

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = "<!-- text check box -->\n<div pf-form-group pf-label=\"{{'Default value'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.default_value\"\n         ng-true-value=\"'t'\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate }}\">\n</div>\n<div pf-form-group pf-label=\"{{'Required'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.required\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Read only'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.read_only\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Auto refresh on change'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.trigger_auto_refresh\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n"

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "<!-- date time control -->\n<div pf-form-group pf-label=\"{{'Read only'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.read_only\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Auto refresh on change'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.trigger_auto_refresh\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Show Past Dates'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.options.show_past_dates\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n"

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = "<!-- any dynamic element -->\n<div pf-form-group pf-label=\"{{'Entry Point'|translate}}\">\n  <!-- TODO: until treepicker and API for it are in the SSUI -->\n  <input ng-model=\"vm.modalData.resource_action.ae_namespace\"/>\n</div>\n<div pf-form-group pf-label=\"{{'Show Refresh Button'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.show_refresh_button\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate }}\"/>\n</div>\n<div pf-form-group pf-label=\"{{'Load Values on Init'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.load_values_on_init\"\n         switch-active=\"{{vm.modalData.show_refresh_button}}\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\"/>\n</div>\n<div pf-form-group pf-label=\"{{'Auto refresh'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.auto_refresh\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\"/>\n</div>\n<div pf-form-group pf-label=\"{{'Auto refresh on change'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.trigger_auto_refresh\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\"/>\n</div>\n"

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = "<!-- radio button -->\n<div pf-form-group pf-label=\"{{'Required'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.required\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Read only'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.read_only\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Visible'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.visible\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Auto refresh on change'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.trigger_auto_refresh\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Default value'|translate}}\">\n  <select class=\"form-control\" ng-model=\"vm.modalData.options.default_value\"\n          ng-options=\"entry as entry[0] for entry in vm.modalData.values\">\n    <option selected=\"selected\" value=\"\" translate>None</option>\n  </select>\n</div>\n<div pf-form-group pf-label=\"{{'Value type'|translate}}\">\n  <select class=\"form-control\" ng-model=\"vm.modalData.data_type\">\n    <option value=\"integer\" translate>Integer</option>\n    <option selected=\"selected\" value=\"string\" translate>String</option>\n  </select>\n</div>\n<div pf-form-group pf-label=\"{{'Sort by'|translate}}\">\n  <select class=\"form-control\" ng-model=\"vm.modalData.options.sort_by\">\n    <option value=\"none\" translate>None</option>\n    <option value=\"description\" translate>Description</option>\n    <option value=\"value\" translate>Value</option>\n  </select>\n</div>\n<div pf-form-group pf-label=\"{{'Sort order'|translate}}\">\n  <select class=\"form-control\" ng-model=\"vm.modalData.options.sort_order\">\n    <option selected=\"selected\" value=\"ascending\" translate>Ascending</option>\n    <option value=\"descending\" translate>Descending</option>\n  </select>\n</div>\n<div pf-form-group class=\"form-inline\" pf-label=\"{{'Entries'|translate}}\" required>\n  <div ng-repeat=\"entry in vm.modalData.values\">\n    <input id=\"label\" name=\"label\"\n           ng-model=\"entry[0]\" type=\"text\" placeholder=\"Key\" required/>\n    <input id=\"label\" name=\"label\"\n           ng-model=\"entry[1]\" type=\"text\" placeholder=\"Value\" required/>\n    <a ng-click='vm.removeEntry(entry)'><i class='pficon-close'></i></a>\n  </div>\n  <a ng-click='vm.addEntry()'><i class='pficon-add-circle-o'></i></a>\n</div>\n"

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = "<!-- tag-contorl -->\n<div pf-form-group pf-label=\"{{'Required'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.required\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Read only'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.read_only\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Visible'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.visible\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Auto refresh on change'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.trigger_auto_refresh\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Category'|translate}}\">\n  <select class=\"form-control\" ng-model=\"vm.modalData.options.category_id\"\n          ng-options=\"category.id.toString() as category.description for category in vm.categories.resources\">\n    <option selected=\"selected\" value=\"\" translate>None</option>\n  </select>\n</div>\n<div pf-form-group pf-label=\"{{'Single value'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.options.force_single_value\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Value type'|translate}}\">\n  <select class=\"form-control\" ng-model=\"vm.modalData.data_type\">\n    <option value=\"integer\" translate>Integer</option>\n    <option selected=\"selected\" value=\"string\" translate>String</option>\n  </select>\n</div>\n<div pf-form-group pf-label=\"{{'Sort by'|translate}}\">\n  <select class=\"form-control\" ng-model=\"vm.modalData.options.sort_by\">\n    <option value=\"none\" translate>None</option>\n    <option value=\"description\" translate>Description</option>\n    <option value=\"value\" translate>Value</option>\n  </select>\n</div>\n<div pf-form-group pf-label=\"{{'Sort order'|translate}}\">\n  <select class=\"form-control\" ng-model=\"vm.modalData.options.sort_order\">\n    <option selected=\"selected\" value=\"ascending\" translate>Ascending</option>\n    <option value=\"descending\" translate>Descending</option>\n  </select>\n</div>\n<div pf-form-group class=\"form-inline\" pf-label=\"{{'Entries'|translate}}\" required>\n  <div ng-repeat=\"entry in vm.currentCategoryEntries().children\">\n    <input id=\"label\" name=\"label\"\n           ng-model=\"entry.description\" type=\"text\" placeholder=\"Key\" readonly/>\n  </div>\n</div>\n"

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = "<!-- text area box -->\n<div pf-form-group pf-input-class=\"col-sm-9\" pf-label=\"{{'Default value'|translate}}\">\n  <textarea id=\"default_value\" name=\"default_value\"\n            ng-model=\"vm.modalData.default_value\">\n    {{ vm.modalData.default_value }}\n  </textarea>\n</div>\n<div pf-form-group pf-label=\"{{'Required'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.required\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Read only'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.read_only\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Visible'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.visible\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Auto refresh on change'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.trigger_auto_refresh\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Validation'|translate}}\">\n  <input id=\"validator_rule\" name=\"validator_rule\"\n         ng-model=\"vm.modalData.validator_rule\"/>\n</div>\n"

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = "<!-- text box -->\n<div pf-form-group pf-label=\"{{'Default value'|translate}}\">\n  <input id=\"default_value\" name=\"default_value\"\n         ng-model=\"vm.modalData.default_value\"\n         type=\"{{vm.modalData.options.protected ? 'password' : 'text'}}\"/>\n</div>\n<div pf-form-group pf-label=\"{{'Protected'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.options.protected\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate }}\"/>\n</div>\n<div pf-form-group pf-label=\"{{'Required'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.required\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\"/>\n</div>\n<div pf-form-group pf-label=\"{{'Read only'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.read_only\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\"/>\n</div>\n<div pf-form-group pf-label=\"{{'Visible'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.visible\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\">\n</div>\n<div pf-form-group pf-label=\"{{'Auto refresh on change'|translate}}\">\n  <input bs-switch\n         ng-model=\"vm.modalData.trigger_auto_refresh\"\n         type=\"checkbox\"\n         switch-on-text=\"{{'Yes'|translate}}\"\n         switch-off-text=\"{{'No'|translate}}\"/>\n</div>\n<div pf-form-group pf-label=\"{{'Validation'|translate}}\">\n  <input id=\"validator_rule\" name=\"validator_rule\"\n          ng-model=\"vm.modalData.validator_rule\"/>\n</div>\n"

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = "<ul ui-sortable='vm.sortableOptions'\n    ng-model='vm.tabList'\n    class='nav nav-tabs'\n    data-tabs='tabs'>\n  <li ng-class='{active: tab.active}' ng-repeat='tab in vm.tabList'>\n    <a class=\"select-tab\" ng-click='vm.selectTab(tab.position)' data-toggle='tab'>\n      <i class=\"pficon-edit\" ng-click='vm.editDialogModal(tab.position)'></i>\n      {{ tab.label }}\n      <i class='delete-tab glyphicon glyphicon-remove' ng-click='vm.deleteTab(tab.position)'></i>\n    </a>\n  </li>\n  <li class='nosort'>\n    <a ng-click='vm.addTab()'>\n      <i class='pficon-add-circle-o'></i>\n      &nbsp; {{ 'Create Tab' | translate }}\n    </a>\n  </li>\n</ul>\n"

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid container-cards-pf\">\n  <div class=\"row row-cards-pf\">\n    <div class=\"col-xs-6 col-sm-4 col-md-4\"\n         ng-repeat='dialogField in vm.fields'\n         data-drag=\"true\"\n         jqyoui-draggable=\"{animate:true, placeholder: 'keep', deepCopy: true}\"\n         data-jqyoui-options=\"{revert: 'invalid', helper: 'clone'}\"\n         ng-model=\"dialogField.placeholders\">\n      <div class=\"card-pf card-pf-aggregate-status\">\n        <h2 class=\"card-pf-title\">\n          {{dialogField.label}}\n        </h2>\n        <div class=\"card-pf-body\">\n          <p class=\"card-pf-aggregate-status-notifications\">\n            <span class=\"card-pf-aggregate-status-notification\">\n              <i ng-class=\"dialogField.icon\"></i>\n            </span>\n          </p>\n        </div>\n      </div>\n    </div>\n  </div><!-- /row -->\n</div><!-- /container -->\n"

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <button type=\"button\" class=\"close\" ng-click=\"$dismiss()\" aria-hidden=\"true\">\n    <span class=\"pficon pficon-close\"></span>\n  </button>\n  <h4 class=\"modal-title\" id=\"myModalLabel\" translate>Edit Dialog field</h4>\n</div>\n\n<div class=\"modal-body\">\n  <ul class=\"nav nav-tabs dialog-editor-tab-list\">\n    <li ng-class=\"{active:vm.modalTabIsSet('element_information')}\">\n      <a ng-click=\"vm.modalTabSet('element_information')\" translate>Element Information</a>\n    </li>\n    <li ng-if=\"vm.element === 'field'\" ng-class=\"{active:vm.modalTabIsSet('options')}\">\n      <a ng-click=\"vm.modalTabSet('options')\" translate>Options</a>\n    </li>\n    <li ng-if=\"vm.element === 'field'\" ng-class=\"{active:vm.modalTabIsSet('advanced')}\">\n      <a ng-click=\"vm.modalTabSet('advanced')\" translate>Advanced</a>\n    </li>\n  </ul>\n  <!-- general details same for each component - element information -->\n  <div ng-show=\"vm.modalTabIsSet('element_information')\">\n    <form class=\"form-horizontal\">\n      <div pf-form-group pf-label=\"{{'Label'|translate}}\" required>\n        <input id=\"label\" name=\"label\"\n               ng-model=\"vm.modalData.label\" type=\"text\" required/>\n      </div>\n      <div ng-if=\"vm.element === 'field'\"\n           pf-form-group\n           pf-label=\"{{'Name'|translate}}\" required>\n        <input id=\"name\" name=\"name\"\n               ng-model=\"vm.modalData.name\" type=\"text\" required/>\n      </div>\n      <div pf-form-group pf-input-class=\"col-sm-9\" pf-label=\"{{'Description'|translate}}\">\n        <textarea id=\"description\" name=\"description\" ng-model=\"vm.modalData.description\">\n          {{ vm.modalData.description }}\n        </textarea>\n      </div>\n      <div ng-if=\"vm.element === 'field' && vm.modalData.type !== 'DialogFieldTagControl'\"\n           pf-form-group\n           pf-label=\"{{'Dynamic'|translate}}\">\n        <input bs-switch\n               ng-model=\"vm.modalData.dynamic\"\n               type=\"checkbox\"\n               switch-on-text=\"{{'Yes'|translate}}\"\n               switch-off-text=\"{{'No'|translate}}\"/>\n      </div>\n    </form>\n  </div>\n  <!-- field specific details -->\n  <div ng-show=\"vm.modalTabIsSet('options')\">\n    <form class=\"form-horizontal\">\n      <div ng-if=\"!vm.modalData.dynamic\" ng-switch on=\"vm.modalData.type\">\n        <dialog-editor-modal-field-template ng-switch-when=\"DialogFieldTextBox\"\n                                            template=\"text-box.html\"\n                                            modal-data=\"vm.modalData\">\n        </dialog-editor-modal-field-template>\n        <dialog-editor-modal-field-template ng-switch-when=\"DialogFieldTextAreaBox\"\n                                            template=\"text-area-box.html\"\n                                            modal-data=\"vm.modalData\">\n        </dialog-editor-modal-field-template>\n        <dialog-editor-modal-field-template ng-switch-when=\"DialogFieldCheckBox\"\n                                            template=\"check-box.html\"\n                                            modal-data=\"vm.modalData\">\n        </dialog-editor-modal-field-template>\n        <dialog-editor-modal-field-template ng-switch-when=\"DialogFieldDateControl\"\n                                            template=\"date-time-control.html\"\n                                            modal-data=\"vm.modalData\">\n        </dialog-editor-modal-field-template>\n        <dialog-editor-modal-field-template ng-switch-when=\"DialogFieldDateTimeControl\"\n                                            template=\"date-time-control.html\"\n                                            modal-data=\"vm.modalData\">\n        </dialog-editor-modal-field-template>\n        <dialog-editor-modal-field-template ng-switch-when=\"DialogFieldRadioButton\"\n                                            template=\"radio-button-drop-down-list.html\"\n                                            add-entry=\"vm.addEntry\"\n                                            remove-entry=\"vm.removeEntry\"\n                                            modal-data=\"vm.modalData\">\n        </dialog-editor-modal-field-template>\n        <dialog-editor-modal-field-template ng-switch-when=\"DialogFieldDropDownList\"\n                                            template=\"radio-button-drop-down-list.html\"\n                                            add-entry=\"vm.addEntry\"\n                                            remove-entry=\"vm.removeEntry\"\n                                            modal-data=\"vm.modalData\">\n        </dialog-editor-modal-field-template>\n        <dialog-editor-modal-field-template ng-switch-when=\"DialogFieldTagControl\"\n                                            template=\"tag-control.html\"\n                                            current-category-entries=\"vm.currentCategoryEntries\"\n                                            categories=\"vm.categories\"\n                                            resolve-categories=\"vm.resolveCategories\"\n                                            modal-data=\"vm.modalData\">\n        </dialog-editor-modal-field-template>\n      </div>\n      <div ng-if=\"vm.modalData.dynamic\">\n        <dialog-editor-modal-field-template template=\"dynamic.html\">\n        </dialog-editor-modal-field-template>\n      </div>\n    </form>\n  </div>\n  <!-- general details same for each field - advanced -->\n  <div ng-show=\"vm.modalTabIsSet('advanced')\">\n    <form class=\"form-horizontal\">\n      <div pf-form-group pf-label=\"{{'Reconfigurable'|translate}}\">\n        <input bs-switch\n               ng-model=\"vm.modalData.reconfigurable\"\n               type=\"checkbox\"\n               switch-on-text=\"{{'Yes'|translate}}\"\n               switch-off-text=\"{{'No'|translate}}\" >\n      </div>\n    </form>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button class=\"btn btn-danger\"\n          type=\"button\"\n          ng-click=\"vm.deleteField()\" translate>Delete</button>\n  <button type=\"button\" class=\"btn btn-default\" ng-click=\"$dismiss()\" translate>Cancel</button>\n  <button type=\"button\"\n          class=\"btn btn-primary\"\n          ng-click=\"vm.saveDialogFieldDetails()\"\n          ng-disabled=\"vm.modalUnchanged()\" translate>Save\n  </button>\n</div>\n"

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = "<div class=\"miq-data-table\">\n  <div ng-if=\"tableCtrl.settings.isLoading\" class=\"spinner spinner-lg\"></div>\n  <div class=\"row miq-pagination\" ng-if=\"tableCtrl.rows && tableCtrl.rows.length !== 0\">\n    <div ng-if=\"tableCtrl.rows.length !== 0\" class=\"miq-select-all col-md-2 col-lg-2 col-xs-2\">\n      <label>{{tableCtrl.settings.selectAllTitle}}: </label>\n      <input type=\"checkbox\" ng-model=\"isChecked\" ng-click=\"tableCtrl.onCheckAll(isChecked)\" title=\"{{tableCtrl.settings.selectAllTitle}}\" />\n    </div>\n    <miq-sort-items class=\"miq-sort-items col-md-2 col-lg-2 col-xs-2\"\n                    sort-object=\"tableCtrl.settings.sortBy\"\n                    headers=\"tableCtrl.columns\"\n                    drop-down-class=\"tableCtrl.settings.dropDownClass\"\n                    on-sort=\"tableCtrl.onSortClick(sortObject.colId, isAscending)\"></miq-sort-items>\n    <div class=\"col-md-7 col-lg-7 col-xs-7\">\n      <div class=\"miq-pager\">\n        <div class=\"miq-per-page\">\n          <miq-toolbar-list on-item-click=\"tableCtrl.perPageClick(item)\"\n                            drop-down-class=\"tableCtrl.settings.dropDownClass\"\n                            toolbar-list=\"tableCtrl.perPage\"></miq-toolbar-list>\n        </div>\n        <div class=\"miq-paging\" ng-if=\"tableCtrl.rows && tableCtrl.rows.length !== 0\">\n          <miq-paging settings=\"tableCtrl.settings\" on-change-page=\"tableCtrl.setTablePage(pageNumber)\"></miq-paging>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-1 col-lg-1 col-xs-1 miq-page-counter\">\n      <label>\n        {{tableCtrl.translateOf(tableCtrl.settings.startIndex, tableCtrl.settings.endIndex, tableCtrl.settings.items)}}\n      </label>\n    </div>\n  </div>\n  <table class=\"table table-bordered table-striped table-hover mig-table-with-footer mig-table\"\n         ng-if=\"tableCtrl.rows && tableCtrl.rows.length !== 0\">\n    <thead>\n    <tr>\n      <th class=\"narrow\">\n\n      </th>\n      <th ng-if=\"$index !== 0\"\n          ng-repeat=\"column in tableCtrl.columns track by $index\"\n          ng-click=\"tableCtrl.onSortClick($index, !!tableCtrl.settings.sortBy && !tableCtrl.settings.sortBy.isAscending)\"\n          ng-class=\"tableCtrl.getColumnClass(column)\">\n        {{column.text}}\n        <div class=\"pull-right\" ng-if=\"tableCtrl.isFilteredBy(column)\" >\n          <i class=\"fa\" ng-class=\"tableCtrl.getSortClass()\"></i>\n        </div>\n      </th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr ng-repeat=\"row in tableCtrl.rows\"\n        ng-class=\"{active : row.selected}\"\n        ng-click=\"tableCtrl.onRowClick({item: row, event: $event})\">\n      <td ng-repeat=\"(columnKey, column) in tableCtrl.columns\" ng-class=\"{narrow: row.cells[columnKey].is_checkbox}\">\n        <input ng-if=\"row.cells[columnKey].is_checkbox\"\n               ng-click=\"tableCtrl.onItemSelected({item: row, isSelected: isSelected})\"\n               onclick=\"event.stopPropagation();\"\n               type=\"checkbox\"\n               ng-model=\"isSelected\"\n               name=\"check_{{row.id}}\"\n               value=\"{{row.id}}\"\n               ng-checked=\"row.checked\"\n               class=\"list-grid-checkbox\">\n        <i ng-if=\"row.cells[columnKey].icon && tableCtrl.isIconOrImage(row, columnKey)\"\n           class=\"{{row.cells[columnKey].icon}}\"\n           title=\"row.cells[columnKey].title\"></i>\n        <img ng-if=\"row.cells[columnKey].icon === null && tableCtrl.isIconOrImage(row, columnKey)\"\n             ng-src=\"{{row.img_url}}\"\n             alt=\"{{row.cells[columnKey].title}}\"\n             title=\"{{row.cells[columnKey].title}}\" />\n        <span ng-if=\"row.cells[columnKey].text\">\n              {{row.cells[columnKey].text}}\n          </span>\n      </td>\n    </tr>\n    </tbody>\n  </table>\n</div>\n"

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = "<ul class=\"pagination\">\n  <li>\n    <a ng-class=\"{disabled: pagingCtrl.settings.current === 1}\"\n       ng-click=\"pagingCtrl.onChangePage({pageNumber: 1})\"\n       href=\"javascript:void(0)\">\n      <span class=\"i fa fa-angle-double-left\"></span>\n    </a>\n  </li>\n  <li>\n    <a ng-class=\"{disabled: pagingCtrl.settings.current === 1}\"\n       ng-click=\"pagingCtrl.onChangePage({pageNumber: pagingCtrl.settings.current - 1})\"\n       href=\"javascript:void(0)\">\n      <span class=\"i fa fa-angle-left\"></span>\n    </a>\n  </li>\n  <li ng-repeat=\"page in pagingCtrl.updatePages(pagingCtrl.settings.total) track by $index\">\n    <a ng-class=\"{disabled: pagingCtrl.settings.current === (page + 1)}\"\n       href=\"javascript:void(0)\"\n       ng-click=\"pagingCtrl.onChangePage({pageNumber: page + 1})\">\n      {{page + 1}}\n    </a>\n  </li>\n  <li>\n    <a ng-class=\"{disabled: (pagingCtrl.settings.current) === pagingCtrl.settings.total}\"\n       ng-click=\"pagingCtrl.onChangePage({pageNumber: (pagingCtrl.settings.current + 1)})\"\n       href=\"javascript:void(0)\">\n      <span class=\"i fa fa-angle-right\"></span>\n    </a>\n  </li>\n  <li>\n    <a ng-class=\"{disabled: (pagingCtrl.settings.current) === pagingCtrl.settings.total}\"\n       ng-click=\"pagingCtrl.onChangePage({pageNumber: pagingCtrl.settings.total})\"\n       href=\"javascript:void(0)\">\n      <span class=\"i fa fa-angle-double-right\"></span>\n    </a>\n  </li>\n</ul>\n"

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = "<div class=\"miq-tile-section\">\n    <div ng-if=\"tileCtrl.settings.isLoading\" class=\"spinner spinner-lg\"></div>\n    <div class=\"row miq-pagination\" ng-if=\"tileCtrl.rows && tileCtrl.rows.length !== 0\">\n      <div class=\"miq-select-all col-md-2 col-lg-2 col-xs-2\">\n        <label>{{tileCtrl.settings.selectAllTitle}}: </label>\n        <input type=\"checkbox\" ng-model=\"isChecked\" ng-click=\"tileCtrl.onCheckAllTiles(isChecked)\" title=\"{{tileCtrl.settings.selectAllTitle}}\" />\n      </div>\n      <miq-sort-items class=\"miq-sort-items col-md-2 col-lg-2 col-xs-2\"\n                      sort-object=\"tileCtrl.settings.sortBy\"\n                      headers=\"tileCtrl.columns\"\n                      drop-down-class=\"tileCtrl.settings.dropDownClass\"\n                      on-sort=\"tileCtrl.onSortClick(sortObject.colId, isAscending)\"></miq-sort-items>\n      <div class=\"col-md-7 col-lg-7 col-xs-7\">\n        <div class=\"miq-pager\">\n          <div class=\"miq-per-page\">\n            <miq-toolbar-list on-item-click=\"tileCtrl.perPageClick(item)\"\n                              drop-down-class=\"tileCtrl.settings.dropDownClass\"\n                              toolbar-list=\"tileCtrl.perPage\"></miq-toolbar-list>\n          </div>\n          <div class=\"miq-paging\" ng-if=\"tileCtrl.rows && tileCtrl.rows.length !== 0\">\n            <miq-paging settings=\"tileCtrl.settings\" on-change-page=\"tileCtrl.setPage(pageNumber)\"></miq-paging>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-1 col-lg-1 col-xs-1 miq-page-counter\">\n        <label>\n          {{tileCtrl.translateOf(tileCtrl.settings.startIndex, tileCtrl.settings.endIndex, tileCtrl.settings.items)}}\n        </label>\n      </div>\n    </div>\n  <div pf-card-view\n       config=\"tileCtrl.options\"\n       items=\"tileCtrl.rows\"\n       class=\"miq-tile-view\"\n       ng-class=\"tileCtrl.tileClass()\">\n    <div ng-switch=\"config.type\">\n      <ng-switch-when ng-switch-when=\"small\">\n        <div class=\"miq-tile-head\">\n          <a href=\"javascript:void(0)\" title=\"{{config.fetchTileName(item)}}\" ng-click=\"config.onItemClick(item, $event)\">{{config.fetchTileName(item) | limitToSuffix : 5 : 5 }}</a>\n        </div>\n        <div class=\"miq-quadicon\">\n          <a href=\"javascript:void(0)\" ng-click=\"config.onItemClick(item, $event)\">\n            <div ng-bind-html=\"config.trustAsHtmlQuadicon(item)\"></div>\n          </a>\n        </div>\n      </ng-switch-when>\n      <ng-switch-when ng-switch-when=\"big\">\n        <a href=\"javascript:void(0)\" ng-click=\"config.onItemClick(item, $event)\">{{config.fetchTileName(item)}}</a>\n        <div class=\"row miq-row-margin-only-top \">\n          <div class=\"col-md-3 col-lg-3 col-xs-3 miq-icon-section\">\n            <a href=\"javascript:void(0)\" ng-click=\"config.onItemClick(item, $event)\">\n              <div ng-bind-html=\"config.trustAsHtmlQuadicon(item)\"></div>\n            </a>\n          </div>\n          <div class=\"col-md-9 col-lg-9 col-xs-9 miq-info-section\">\n            <dl class=\"dl-horizontal tile\">\n              <dt ng-repeat-start=\"(key, header) in config.columns | limitTo: 7 track by $index\" ng-if=\"header.text && header.text.indexOf('Name') === -1\" title=\"{{header.text}}\">{{header.text}}:</dt>\n              <dd ng-repeat-end ng-if=\"header.text && header.text.indexOf('Name') === -1\" title=\"{{item.cells[key].text}}\">{{item.cells[key].text | limitToSuffix : 25 : 25}}</dd>\n            </dl>\n          </div>\n        </div>\n      </ng-switch-when>\n    </div>\n  </div>\n</div>\n"

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = "<div class=\"dropdown miq-siteswitcher\">\n  <button class=\"btn btn-link dropdown-toggle\" type=\"button\" id=\"domain-switcher\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\n    <span class=\"fa fa-lg fa-th miq-siteswitcher-icon\"></span>\n  </button>\n  <div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"domain-switcher\">\n    <div ng-repeat=\"site in ctrl.sites\" class=\"miq-siteswitcher-entry\">\n      <a class=\"miq-siteswitcher-link\" ng-href=\"{{site.url}}\" target=\"_blank\">\n        <span title=\"{{site.tooltip}}\" class=\"fa fa-3x\" ng-class=\"site.iconClass\"></span>\n        <div>{{site.title}}</div>\n      </a>\n    </div>\n  </div>\n</div>\n"

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = "<button title=\"{{toolbarButton.title}}\"\n        data-explorer=\"{{toolbarButton.explorer}}\"\n        data-confirm-tb=\"{{toolbarButton.confirm}}\"\n        id=\"{{toolbarButton.id}}\"\n        name=\"{{toolbarButton.name}}\"\n        type=\"button\"\n        class=\"btn btn-default\"\n        data-click=\"{{toolbarButton.id}}\"\n        data-url=\"{{toolbarButton.url}}\"\n        data-url_parms=\"{{toolbarButton.url_parms}}\"\n        data-prompt=\"{{toolbarButton.prompt}}\"\n        ng-class=\"{active: toolbarButton.selected, disabled: !toolbarButton.enabled}\"\n        ng-hide=\"toolbarButton.hidden\"\n        ng-click=\"onItemClick({item: toolbarButton, $event: $event})\">\n  <i ng-if=\"toolbarButton.icon && toolbarButton.text\" class=\"{{toolbarButton.icon}}\" style=\"margin-right: 5px;\"></i>\n  <i ng-if=\"toolbarButton.icon && !toolbarButton.text\" class=\"{{toolbarButton.icon}}\"></i>\n  <img ng-if=\"toolbarButton.img_url && !toolbarButton.icon\" ng-src=\"{{toolbarButton.img_url}}\"\n       data-enabled=\"{{toolbarButton.img_url}}\"\n       data-disabled=\"{{toolbarButton.img_url}}\">\n  {{toolbarButton.text}}\n</button>\n"

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group\" ng-class=\"vm.dropDownClass\" dropdown ng-if=\"vm.isEmpty\">\n  <button type=\"button\" dropdown-toggle class=\"btn dropdown-toggle btn-default\"\n          ng-class=\"{disabled: !vm.toolbarList.enabled}\" title=\"{{vm.toolbarList.title}}\">\n    <i class=\"{{vm.toolbarList.icon}}\" style=\"margin-right: 5px;\" ng-if=\"vm.toolbarList.icon\"></i>\n    {{vm.toolbarList.text}}\n    <span class=\"caret\"></span>\n  </button>\n  <ul class=\"dropdown-menu\" role=\"menu\">\n    <li ng-repeat=\"item in vm.toolbarList.items track by $index\" ng-class=\"{disabled: !item.enabled}\">\n      <a ng-if=\"item.type !== 'separator'\"\n         ng-hide=\"item.hidden\"\n         href=\"\"\n         title=\"{{item.title}}\"\n         data-explorer=\"{{item.explorer}}\"\n         data-confirm-tb=\"{{item.confirm}}\"\n         ng-click=\"vm.onItemClick({item: item, $event: $event})\"\n         data-function=\"{{item.data.function}}\"\n         data-function-data=\"{{item.data['function-data']}}\"\n         data-target=\"{{item.data.target}}\"\n         data-toggle=\"{{item.data.toggle}}\"\n         data-click=\"{{item.id}}\"\n         name=\"{{item.id}}\"\n         id=\"{{item.id}}\"\n         data-url_parms=\"{{item.url_parms}}\"\n         data-prompt=\"{{item.prompt}}\"\n         data-url=\"{{item.url}}\">\n        <i ng-if=\"item.icon && item.text\" class=\"{{item.icon}}\" style=\"margin-right: 5px;\"></i>\n        <i ng-if=\"item.icon && !item.text\" class=\"{{item.icon}}\"></i>\n        <img ng-if=\"item.img_url && !item.icon\" ng-src=\"{{item.img_url}}\"\n             data-enabled=\"{{item.img_url}}\"\n             data-disabled=\"{{item.img_url}}\">\n        {{item.text}}\n      </a>\n      <div ng-if=\"item.type === 'separator'\" class=\"divider \" role=\"presentation\" ng-hide=\"item.hidden\"></div>\n    </li>\n  </ul>\n</div>\n"

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = "<div class=\"toolbar-pf-actions miq-toolbar-actions\">\n  <div class=\"form-group miq-toolbar-group\"\n       ng-repeat=\"toolbarItem in vm.toolbarItems\"\n       ng-if=\"vm.hasContent(toolbarItem)\">\n    <ng-repeat ng-repeat=\"item in toolbarItem \">\n      <miq-toolbar-button ng-if=\"item.type === vm.getButtonType()\"\n                          toolbar-button=\"item\"\n                          on-item-click=\"vm.onItemClick(item, $event)\">\n      </miq-toolbar-button>\n      <miq-toolbar-button ng-if=\"item.type === vm.getButtonTwoState() && item.id.indexOf('view_') === -1\"\n                          toolbar-button=\"item\"\n                          on-item-click=\"vm.onItemClick(item, $event)\">\n      </miq-toolbar-button>\n      <miq-toolbar-list ng-if=\"item.type === vm.getToolbarListType() && item.items.length > 0\"\n                        toolbar-list=\"item\"\n                        on-item-click=\"vm.onItemClick(item, $event)\">\n      </miq-toolbar-list>\n      <div ng-if=\"item.name == 'custom' && item.args && item.args.html\"\n           ng-bind-html=\"vm.trustAsHtml(item.args.html)\"\n           class=\"miq-custom-html\"></div>\n    </ng-repeat>\n  </div>\n  <miq-toolbar-view toolbar-views=\"vm.toolbarViews\"\n                    on-item-click=\"vm.onViewClick({item: item, $event: $event})\"\n                    class=\"miq-view-list\">\n  </miq-toolbar-view>\n</div>\n"

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = "<div class=\"toolbar-pf-view-selector pull-right form-group\">\n  <button class=\"btn btn-link\"\n          ng-repeat=\"item in vm.toolbarViews\"\n          ng-class=\"{active: item.selected}\"\n          title=\"{{item.title}}\"\n          id=\"{{item.id}}\"\n          data-url=\"{{item.url}}\"\n          data-url_parms=\"{{item.url_parms}}\"\n          data-prompt=\"{{item.prompt}}\"\n          ng-click=\"vm.onItemClick({item: item, $event: $event})\"\n          name=\"{{item.name}}\">\n    <i class=\"{{item.icon}}\" style=\"\"></i>\n  </button>\n</div>\n"

/***/ }),
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var sortItemsComponent_1 = __webpack_require__(50);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.component('miqSortItems', new sortItemsComponent_1.default);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _ = __webpack_require__(0);
/**
 * Controller for sort items component, it filters headers to fit config object of `pf-sort`.
 * @memberof miqStaticAssets.common
 * @ngdoc controller
 * @name SortItemsController
 */
var SortItemsController = (function () {
    /* @ngInject */
    SortItemsController.$inject = ["$element", "$timeout"];
    function SortItemsController($element, $timeout) {
        this.$element = $element;
        this.$timeout = $timeout;
        this.initOptions();
    }
    /**
     * Angular's method for checking one way data bounded properties changes.
     * @memberof SortItemsController
     * @function $onChanges
     * @param changesObj {Object} angular changes object.
     */
    SortItemsController.prototype.$onChanges = function (changesObj) {
        if (changesObj.headers) {
            this.fillFields();
            if (this.sortObject) {
                this.setSortItem();
            }
        }
        if (changesObj.dropDownClass) {
            this.applyClass();
        }
    };
    SortItemsController.prototype.$postLink = function () {
        var _this = this;
        //we have to wait for rendering of components, hence $timeout
        this.$timeout(function () { return _this.applyClass(); });
    };
    /**
     * Public method for setting item which is currently sorted by. It will take id of object in `headers` as `colId`,
     * it's text as actual Id and same applies to `title`.
     * @memberof SortItemsController
     * @function setSortItem
     */
    SortItemsController.prototype.setSortItem = function () {
        if (this.sortObject && this.sortObject.sortObject && this.sortObject && this.sortObject.sortObject.text) {
            this.options.currentField = {
                colId: _.findIndex(this.headers, this.sortObject.sortObject),
                id: this.sortObject.sortObject.text.toLowerCase(),
                title: this.sortObject.sortObject.text
            };
            this.options.isAscending = this.sortObject.isAscending;
        }
    };
    /**
     * Public method which is called after constructing this controller. It will set default values for config object,
     * along side with sort method.
     * @memberof SortItemsController
     * @function initOptions
     */
    SortItemsController.prototype.initOptions = function () {
        var _this = this;
        this.options = {
            fields: [],
            onSortChange: function (item, isAscending) { return _this.onSort({ sortObject: item, isAscending: isAscending }); },
            currentField: {}
        };
    };
    /**
     * Private method which will filter out and transform headers to config object. This function will filter out all
     * columns which has `is_narrow` and no `text` is set fot them. Also it will use each header key as `colId`,
     * text as `id` and again text as `title`.
     * @memberof SortItemsController
     * @function fillFields
     */
    SortItemsController.prototype.fillFields = function () {
        var _this = this;
        _.each(this.headers, function (oneCol, key) {
            if (!oneCol.hasOwnProperty('is_narrow') && oneCol.hasOwnProperty('text')) {
                _this.options.fields.push({
                    colId: key,
                    id: oneCol.text.toLowerCase(),
                    title: oneCol.text
                });
            }
        });
    };
    /**
     * Method for applying additional class for dropdown.
     * dropDownClass can be either string of classes, or array.
     */
    SortItemsController.prototype.applyClass = function () {
        if (this.dropDownClass) {
            Array.isArray(this.dropDownClass) ?
                (_a = this.$element.find('.dropdown')).addClass.apply(_a, this.dropDownClass) :
                this.$element.find('.dropdown').addClass(this.dropDownClass);
        }
        var _a;
    };
    return SortItemsController;
}());
exports.SortItemsController = SortItemsController;
/**
 * @description
 *    Component for showing sort component. See {@link miqStaticAssets.common.SortItemsController} on how functions
 *    and properties are handled, This component requires `pf-sort` (see
 *    <a href="http://angular-patternfly.rhcloud.com/#/api/patternfly.sort.directive:pfSort">patternfly's
 *    implemetnation</a>) component to be part of application scope.
 *    If you do not provide such component no sort will be show. `pf-sort` requires `config` property which consists of:
 *    ```javascript
 *    config = {
 *      fields: [],
 *      onSortChange: (item: any, isAscending: boolean) => void,
 *      currentField: {}
 *    }
 *    ```
 * @memberof miqStaticAssets.common
 * @ngdoc component
 * @name miqSortItems
 * @attr {Expression} onSort function which is called after sorting has changed.
 * @attr {Object} headers items which will be present in sort chooser.
 * @attr {Object} sortObject object which is currently sorted by.
 * @example
 * <miq-sort-items on-sort="ctrl.onSort(sortObject, isAscending)"
 *                 headers="ctrl.headers"
 *                 sort-object="ctrl.currentSortObject">
 * </miq-sort-items>
 */
var SortItems = (function () {
    function SortItems() {
        this.replace = true;
        this.template = "<div pf-sort config=\"vm.options\"></div>";
        this.controller = SortItemsController;
        this.controllerAs = 'vm';
        this.bindings = {
            onSort: '&',
            headers: '<',
            sortObject: '<',
            dropDownClass: '<'
        };
    }
    return SortItems;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SortItems;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DefaultEndpoints = (function () {
    function DefaultEndpoints() {
        this.listDataTable = '/list';
        this.deleteItemDataTable = '/delete';
        this.validateItem = '/validate';
        this.createItem = '/create';
        this.providerSettings = '/list_providers_settings';
        this.toolbarSettings = '/toolbar';
    }
    return DefaultEndpoints;
}());
exports.DefaultEndpoints = DefaultEndpoints;
var EndpointsService = (function () {
    function EndpointsService() {
        this.rootPoint = '';
        this.endpoints = new DefaultEndpoints;
    }
    return EndpointsService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EndpointsService;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var endpointsService_1 = __webpack_require__(51);
var translateService_1 = __webpack_require__(53);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.service('MiQEndpointsService', endpointsService_1.default);
    module.service('MiQTranslateService', translateService_1.default);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TranslateService = (function () {
    /*@ngInject*/
    TranslateService.$inject = ["$window"];
    function TranslateService($window) {
        this.$window = $window;
    }
    TranslateService.prototype.translateString = function (stringToTranslate) {
        return this.$window.__(stringToTranslate);
    };
    return TranslateService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TranslateService;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ng = __webpack_require__(1);
var _ = __webpack_require__(0);
/**
 * Controller for the Dialog Editor box component
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name BoxController
 */
var BoxController = (function () {
    /*@ngInject*/
    BoxController.$inject = ["DialogEditor", "DialogEditorModal"];
    function BoxController(DialogEditor, DialogEditorModal) {
        this.DialogEditor = DialogEditor;
        this.DialogEditorModal = DialogEditorModal;
    }
    /**
     * Load service to be able to access it form the template.
     * Load status of tabs.
     * @memberof BoxController
     * @function $onInit
     */
    BoxController.prototype.$onInit = function () {
        var _this = this;
        this.service = this.DialogEditor;
        this.dialogTabs = this.DialogEditor.getDialogTabs();
        // Rules for Drag&Drop sorting of boxes
        this.sortableOptionsBox = {
            axis: 'y',
            cancel: '.nosort',
            cursor: 'move',
            opacity: 0.5,
            revert: 50,
            stop: function (e, ui) {
                var sortedBox = ui.item.scope().$parent.tab.dialog_groups;
                // update indexes of other boxes after changing their order
                _this.DialogEditor.updatePositions(sortedBox);
            },
        };
        // Rules for Drag&Drop sorting of elements inside of boxes
        this.sortableOptionsFields = {
            axis: 'y',
            cancel: '.nosort',
            cursor: 'move',
            revert: 50,
            stop: function (e, ui) {
                var sortedField = ui.item.scope().$parent.box.dialog_fields;
                // update indexes of other fields after changing their order
                _this.DialogEditor.updatePositions(sortedField);
            },
        };
    };
    /**
     * Add a new box to the list.
     * The new box is automatically appended to the last position of the list
     * @memberof BoxController
     * @function addBox
     */
    BoxController.prototype.addBox = function () {
        this.dialogTabs[this.DialogEditor.activeTab].dialog_groups
            .push({
            description: __('Description'),
            label: __('Label'),
            display: 'edit',
            position: 0,
            dialog_fields: [],
        });
        // update indexes of other boxes after adding a new one
        this.DialogEditor.updatePositions(this.dialogTabs[this.DialogEditor.activeTab].dialog_groups);
    };
    /**
     * Remove box and all its content from the dialog.
     * @memberof BoxController
     * @function removeBox
     * @param {number} id as index of removed box
     */
    BoxController.prototype.removeBox = function (id) {
        _.remove(this.dialogTabs[this.DialogEditor.activeTab].dialog_groups, function (box) { return box.position === id; });
        // update indexes of other boxes after removing
        this.DialogEditor.updatePositions(this.dialogTabs[this.DialogEditor.activeTab].dialog_groups);
    };
    /**
     * Handle Drag&Drop event.
     * @memberof BoxController
     * @function droppableOptions
     * @param {number} event jQuery object
     * @param {number} ui jQuery object
     */
    BoxController.prototype.droppableOptions = function (e, ui) {
        var droppedItem = ng.element(e.target).scope();
        // update indexes of other boxes after changing their order
        this.DialogEditor.updatePositions(droppedItem.box.dialog_fields);
    };
    /**
     * Show modal to edit label and description of the box.
     * @memberof BoxController
     * @function editDialogModal
     * @param {number} tab is an index of tab, where the box is placed
     * @param {number} box is an index of box
     */
    BoxController.prototype.editDialogModal = function (tab, box) {
        this.DialogEditorModal.showModal(tab, box);
    };
    return BoxController;
}());
/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name dialogEditorBoxes
 * @description
 *    Component implementing behaviour for the boxes inside of
 *    the dialogs tabs.
 * @example
 * <dialog-editor-boxes>
 * </dialog-editor-boxes>
 */
var Box = (function () {
    function Box() {
        this.template = __webpack_require__(23);
        this.controller = BoxController;
        this.controllerAs = 'vm';
    }
    return Box;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Box;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var boxComponent_1 = __webpack_require__(54);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.component('dialogEditorBoxes', new boxComponent_1.default);
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Controller for the Dialog Editor field component
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name FieldController
 */
var FieldController = (function () {
    /*@ngInject*/
    FieldController.$inject = ["DialogEditor", "DialogEditorModal"];
    function FieldController(DialogEditor, DialogEditorModal) {
        this.DialogEditor = DialogEditor;
        this.DialogEditorModal = DialogEditorModal;
    }
    /**
     * Load service to be able to access it form the template.
     * @memberof FieldController
     * @function $onInit
     */
    FieldController.prototype.$onInit = function () {
        this.service = this.DialogEditor;
    };
    /**
     * Show modal to edit details of the component
     * @memberof FieldController
     * @function editDialogModal
     * @param {number} tab is an index of tab, where the box is placed
     * @param {number} box is an index of box, where the field is placed
     * @param {number} field is an index of field
     */
    FieldController.prototype.editDialogModal = function (tab, box, field) {
        this.DialogEditorModal.showModal(tab, box, field);
    };
    return FieldController;
}());
/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name dialogEditorField
 * @description
 *    Component implementing behaviour for the fields inside of
 *    the dialogs boxes.
 * @example
 * <dialog-editor-field box-position="box.position"
 *                      field-data='field'
 * </dialog-editor-field>
 */
var Field = (function () {
    function Field() {
        this.template = __webpack_require__(24);
        this.controller = FieldController;
        this.controllerAs = 'vm';
        this.bindings = {
            fieldData: '<',
            boxPosition: '<',
        };
    }
    return Field;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Field;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fieldComponent_1 = __webpack_require__(56);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.component('dialogEditorField', new fieldComponent_1.default);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tab_list_1 = __webpack_require__(59);
var box_1 = __webpack_require__(55);
var field_1 = __webpack_require__(57);
var toolbox_1 = __webpack_require__(61);
var modal_field_template_1 = __webpack_require__(2);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    tab_list_1.default(module);
    box_1.default(module);
    field_1.default(module);
    toolbox_1.default(module);
    modal_field_template_1.default(module);
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tabListComponent_1 = __webpack_require__(60);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.component('dialogEditorTabs', new tabListComponent_1.default);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ng = __webpack_require__(1);
var _ = __webpack_require__(0);
/**
 * Controller for the Dialog Editor tab list component
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name TabListController
 */
var TabListController = (function () {
    /*@ngInject*/
    TabListController.$inject = ["DialogEditor", "DialogEditorModal"];
    function TabListController(DialogEditor, DialogEditorModal) {
        this.DialogEditor = DialogEditor;
        this.DialogEditorModal = DialogEditorModal;
    }
    /**
     * Activate the first tab in tab list, if there is any.
     * @memberof TabListController
     * @function onInit
     */
    TabListController.prototype.$onInit = function () {
        var _this = this;
        // load tabs data from the service
        this.tabList = this.DialogEditor.getDialogTabs();
        // set active tab
        if (this.tabList.length !== 0) {
            this.DialogEditor.activeTab = 0;
            this.tabList[this.DialogEditor.activeTab].active = true;
        }
        // set options for sorting tabs in list
        this.sortableOptions = {
            cancel: '.nosort',
            cursor: 'move',
            helper: 'clone',
            revert: 50,
            stop: function (e, ui) {
                var sortedTab = ui.item.scope();
                var tabList = sortedTab.$parent.dialogEditorTabs.tabList;
                _this.DialogEditor.updatePositions(tabList);
                _this.DialogEditor.activeTab = _.find(tabList, { active: true }).position;
            },
        };
    };
    /**
     * Add a new tab to the list.
     * New tab is automatically appended to the last position of the list and
     * set as active.
     * @memberof TabListController
     * @function addTab
     */
    TabListController.prototype.addTab = function () {
        // deactivate currently active tab
        this.tabList.forEach(function (tab) { return tab.active = false; });
        // create a new tab
        var nextIndex = this.tabList.length;
        this.tabList.push({
            description: __('New tab ') + nextIndex,
            displat: 'edit',
            label: __('New tab ') + nextIndex,
            position: nextIndex,
            active: true,
            dialog_groups: [],
        });
        this.DialogEditor.activeTab = nextIndex;
        this.DialogEditor.updatePositions(this.tabList);
    };
    /**
     * Delete tab and all its content from the dialog.
     * After removing tab, position attributes needs to be updated.
     * If the tab to delete is active in the moment of the deletion, the
     * activity goes to the other tab.
     * @memberof TabListController
     * @function removeTab
     * @param {number} id is an index of remove tab
     */
    TabListController.prototype.removeTab = function (id) {
        // pass the activity to other tab, if the deleted is active
        if (this.tabList[id].active) {
            if ((this.tabList.length - 1) === this.tabList[id].position &&
                (this.tabList.length - 1) !== 0) {
                // active tab was at the end → new active tab is on previous index
                this.tabList[id - 1].active = true;
            }
            else if ((this.tabList.length - 1) > this.tabList[id].position) {
                // active tab was not at the end → new active tab is on following index
                this.tabList[id + 1].active = true;
            }
        }
        // remove tab with matching id
        _.remove(this.tabList, function (tab) { return tab.position === id; });
        // update indexes of other tabs after removing
        if (this.tabList.length !== 0) {
            this.DialogEditor.updatePositions(this.tabList);
        }
        else {
            return;
        }
        // set activity in the service
        var activeTabData = _.find(this.tabList, { active: true });
        if (ng.isDefined(activeTabData)) {
            this.DialogEditor.activeTab = activeTabData.position;
        }
    };
    /**
     * Assign activity to the selected tab.
     * @memberof TabListController
     * @function selectTab
     * @param {number} id is an index of remove tab
     */
    TabListController.prototype.selectTab = function (id) {
        // deactivate currently active
        var deselectedTab = _.find(this.tabList, { active: true });
        deselectedTab.active = false;
        // activate selected
        var selectedTab = this.tabList[id];
        selectedTab.active = true;
        this.DialogEditor.activeTab = id;
    };
    /**
     * Show modal to edit label and description of the tab
     * @memberof TabListController
     * @function editDialogModal
     * @param {number} tab is an index of tab
     */
    TabListController.prototype.editDialogModal = function (tab) {
        this.DialogEditorModal.showModal(tab);
    };
    return TabListController;
}());
/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name dialogEditorTabs
 * @description
 *    Component implementing behaviour for the tabs inside of
 *    the dialogs.
 * @example
 * <dialog-editor-tabs>
 * </dialog-editor-tabs>
 */
var TabList = (function () {
    function TabList() {
        this.template = __webpack_require__(32);
        this.controller = TabListController;
        this.controllerAs = 'vm';
    }
    return TabList;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TabList;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toolboxComponent_1 = __webpack_require__(62);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.component('dialogEditorFieldStatic', new toolboxComponent_1.default);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DialogField = (function () {
    function DialogField(type, icon, label, options) {
        if (options === void 0) { options = {}; }
        this.icon = icon;
        this.label = label;
        this.placeholders = Object.assign({
            name: '',
            description: '',
            type: type,
            display: 'edit',
            display_method_options: {},
            read_only: false,
            required: false,
            required_method_options: {},
            default_value: '',
            values_method_options: {},
            label: label,
            position: 0,
            dynamic: false,
            show_refresh_button: false,
            load_values_on_init: false,
            auto_refresh: false,
            trigger_auto_refresh: false,
            reconfigurable: false,
            visible: true,
            options: {
                protected: false,
            },
            resource_action: { resource_type: 'DialogField', ae_attributes: {} },
        }, options);
    }
    return DialogField;
}());
/**
 * Controller for the Dialog Editor toolbox component
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name ToolboxController
 */
var ToolboxController = (function () {
    function ToolboxController() {
        this.fields = {
            dialogFieldTextBox: new DialogField('DialogFieldTextBox', 'fa fa-font', __('Text Box')),
            dialogFieldTextAreaBox: new DialogField('DialogFieldTextAreaBox', 'fa fa-file-text-o', __('Text Area')),
            dialogFieldCheckBox: new DialogField('DialogFieldCheckBox', 'fa fa-check-square-o', __('Check Box')),
            dialogFieldDropDownList: new DialogField('DialogFieldDropDownList', 'fa fa-caret-square-o-down', __('Dropdown List'), {
                data_type: 'string',
                values: [],
                options: { sort_by: 'description', sort_order: 'ascending' },
            }),
            dialogFieldRadioButton: new DialogField('DialogFieldRadioButton', 'fa fa-circle-o', __('Radio Button'), {
                data_type: 'string',
                values: [],
                options: { sort_by: 'description', sort_order: 'ascending' },
            }),
            dialogFieldDateControl: new DialogField('DialogFieldDateControl', 'fa fa-calendar', __('Date Control')),
            dialogFieldDateTimeControl: new DialogField('DialogFieldDateTimeControl', 'fa fa-clock-o', __('Date Time Control')),
            dialogFieldTagControl: new DialogField('DialogFieldTagControl', 'fa fa-tags', __('Tag Control'), {
                data_type: 'string',
                values: [],
                options: {
                    force_single_value: false,
                    sort_by: 'description',
                    sort_order: 'ascending',
                },
            }),
        };
    }
    return ToolboxController;
}());
exports.ToolboxController = ToolboxController;
/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name dialogEditorFieldStatic
 * @description
 *    Component is used as a toolbox for the Dialog Editor.
 * @example
 * <dialog-editor-field-static>
 * </dialog-editor-field-static>
 */
var Toolbox = (function () {
    function Toolbox() {
        this.template = __webpack_require__(33);
        this.controller = ToolboxController;
        this.controllerAs = 'vm';
    }
    return Toolbox;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Toolbox;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DialogEditorService = (function () {
    function DialogEditorService() {
        this.data = {};
        this.activeTab = 0;
    }
    /**
     * Store data passed in parameter.
     * @memberof DialogEditorService
     * @function setData
     * @param {any} nested object containing data of the dialog
     */
    DialogEditorService.prototype.setData = function (data) {
        this.data = data;
    };
    /**
     * Return dialog id loaded at service.
     * @memberof DialogEditorService
     * @function getDialogId
     */
    DialogEditorService.prototype.getDialogId = function () {
        return this.data.content[0].id;
    };
    /**
     * Return dialog label loaded at service.
     * @memberof DialogEditorService
     * @function getDialogLabel
     */
    DialogEditorService.prototype.getDialogLabel = function () {
        return this.data.content[0].label;
    };
    /**
     * Return dialog description loaded at service.
     * @memberof DialogEditorService
     * @function getDialogDescription
     */
    DialogEditorService.prototype.getDialogDescription = function () {
        return this.data.content[0].description;
    };
    /**
     * Return dialog tabs loaded at service.
     * @memberof DialogEditorService
     * @function getDialogTabs
     */
    DialogEditorService.prototype.getDialogTabs = function () {
        return this.data.content[0].dialog_tabs;
    };
    /**
     * Update positions for elements in array.
     * @memberof DialogEditorService
     * @function updatePositions
     * @param {any[]} array of elements to sort
     */
    DialogEditorService.prototype.updatePositions = function (elements) {
        elements.forEach(function (value, key) { return value.position = key; });
    };
    return DialogEditorService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DialogEditorService;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dialogEditorService_1 = __webpack_require__(63);
var modalService_1 = __webpack_require__(65);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.service('DialogEditor', dialogEditorService_1.default);
    module.service('DialogEditorModal', modalService_1.default);
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _ = __webpack_require__(0);
var ng = __webpack_require__(1);
/**
 * Controller for the Dialog Editor modal service
 * @ngdoc controller
 * @name ModalController
 */
var ModalController = (function () {
    /*@ngInject*/
    ModalController.$inject = ["dialogDetails", "$uibModalInstance", "CollectionsApi", "DialogEditor"];
    function ModalController(dialogDetails, $uibModalInstance, CollectionsApi, DialogEditor) {
        var _this = this;
        this.dialogDetails = dialogDetails;
        this.$uibModalInstance = $uibModalInstance;
        this.CollectionsApi = CollectionsApi;
        this.DialogEditor = DialogEditor;
        this.modalTab = 'element_information';
        ng.extend(this, {
            dialog: this.dialogDetails,
            saveDialogFieldDetails: this.saveDialogFieldDetails,
            addEntry: this.addEntry,
            removeEntry: this.removeEntry,
            deleteField: this.deleteField,
            modalUnchanged: this.modalUnchanged,
            modalTabSet: this.modalTabSet,
            modalTabIsSet: this.modalTabIsSet,
            currentCategoryEntries: this.currentCategoryEntries,
        });
        // recognize edited element type
        if (ng.isUndefined(this.dialog.fieldId)
            && ng.isUndefined(this.dialog.boxId)
            && ng.isDefined(this.dialog.tabId)) {
            this.element = 'tab';
        }
        else if (ng.isUndefined(this.dialog.fieldId)
            && ng.isDefined(this.dialog.boxId)
            && ng.isDefined(this.dialog.tabId)) {
            this.element = 'box';
        }
        else if (ng.isDefined(this.dialog.fieldId)
            && ng.isDefined(this.dialog.boxId)
            && ng.isDefined(this.dialog.tabId)) {
            this.element = 'field';
        }
        // clone data from service
        switch (this.element) {
            case 'tab':
                this.modalData = _.cloneDeep(this.DialogEditor.getDialogTabs()[this.dialog.tabId]);
                break;
            case 'box':
                this.modalData = _.cloneDeep(this.DialogEditor.getDialogTabs()[this.dialog.tabId].dialog_groups[this.dialog.boxId]);
                break;
            case 'field':
                this.modalData = _.cloneDeep(this.DialogEditor.getDialogTabs()[this.dialog.tabId].dialog_groups[this.dialog.boxId].dialog_fields[this.dialog.fieldId]);
                // load categories from API, if the field is Tag Control
                if (this.modalData.type === 'DialogFieldTagControl') {
                    this.resolveCategories().then(function (categories) {
                        _this.categories = categories;
                    });
                }
                break;
            default:
                break;
        }
    }
    /**
     * Load categories data from API.
     * @memberof ModalController
     * @function resolveCategories
     */
    ModalController.prototype.resolveCategories = function () {
        var options = {
            expand: 'resources',
            attributes: ['description', 'single_value', 'children'],
        };
        return this.CollectionsApi.query('categories', options);
    };
    /**
     * Store the name of the tab, that is currently selected.
     * @memberof ModalController
     * @function modalTabSet
     * @param tab is a name of the tab in the modal
     */
    ModalController.prototype.modalTabSet = function (tab) {
        this.modalTab = tab;
    };
    /**
     * Returns true/false according to which tab is currently
     * selected in the modal.
     * @memberof ModalController
     * @function modalTabIsSet
     */
    ModalController.prototype.modalTabIsSet = function (tab) {
        return this.modalTab === tab;
    };
    /**
     * Check for changes in the modal.
     * @memberof ModalController
     * @function modalUnchanged
     */
    ModalController.prototype.modalUnchanged = function () {
        switch (this.element) {
            case 'tab':
                return _.isMatch(this.DialogEditor.getDialogTabs()[this.DialogEditor.activeTab], this.modalData);
            case 'box':
                return _.isMatch(this.DialogEditor.getDialogTabs()[this.DialogEditor.activeTab].dialog_groups[this.dialog.boxId], this.modalData);
            case 'field':
                return _.isMatch(this.DialogEditor.getDialogTabs()[this.DialogEditor.activeTab].dialog_groups[this.dialog.boxId].dialog_fields[this.dialog.fieldId], this.modalData);
            default:
                break;
        }
    };
    /**
     * Store modified data back to the service.
     * @memberof ModalController
     * @function saveDialogFieldDetails
     */
    ModalController.prototype.saveDialogFieldDetails = function () {
        // TODO: add verification for required forms
        // store data to service
        switch (this.element) {
            case 'tab':
                this.DialogEditor.getDialogTabs()[this.DialogEditor.activeTab].label = this.modalData.label;
                // description
                this.DialogEditor.getDialogTabs()[this.DialogEditor.activeTab].description = this.modalData.description;
                break;
            case 'box':
                // label
                this.DialogEditor.getDialogTabs()[this.DialogEditor.activeTab].dialog_groups[this.dialog.boxId].label = this.modalData.label;
                // description
                this.DialogEditor.getDialogTabs()[this.DialogEditor.activeTab].dialog_groups[this.dialog.boxId].description = this.modalData.description;
                break;
            case 'field':
                this.DialogEditor.getDialogTabs()[this.DialogEditor.activeTab].dialog_groups[this.dialog.boxId].dialog_fields[this.dialog.fieldId] = this.modalData;
                break;
            default:
                break;
        }
        // close modal
        this.$uibModalInstance.close();
    };
    /**
     * Delete dialog field selected in modal.
     * @memberof ModalController
     * @function deleteField
     */
    ModalController.prototype.deleteField = function () {
        var _this = this;
        _.remove(this.DialogEditor.getDialogTabs()[this.DialogEditor.activeTab].dialog_groups[this.dialog.boxId].dialog_fields, function (field) { return field.position === _this.dialog.fieldId; });
        // close modal
        this.$uibModalInstance.close();
    };
    /**
     * Add entry for radio button / dropdown select.
     * @memberof ModalFieldController
     * @function addEntry
     */
    ModalController.prototype.addEntry = function () {
        this.modalData.values.push(['', '']);
    };
    /**
     * Remove entry for radio button / dropdown select
     * @memberof ModalFieldController
     * @function removeEntry
     * @param entry to remove from array
     */
    ModalController.prototype.removeEntry = function (entry) {
        _.pull(this.modalData.values, entry);
    };
    /**
     * Finds entries for the selected category.
     * @memberof ModalController
     * @function currentCategoryEntries
     */
    ModalController.prototype.currentCategoryEntries = function () {
        if (ng.isDefined(this.categories)) {
            return _.find(this.categories.resources, 'id', Number(this.modalData.options.category_id));
        }
    };
    return ModalController;
}());
var ModalService = (function () {
    /** @ngInject */
    ModalService.$inject = ["$uibModal"];
    function ModalService($uibModal) {
        this.$uibModal = $uibModal;
    }
    /**
     * Show modal of the element.
     * @memberof ModalService
     * @function showModal
     * @param {number} index of tab, where the box is placed
     * @param {number} index of box, where the field is placed
     * @param {number} index of field
     */
    ModalService.prototype.showModal = function (tab, box, field) {
        var modalOptions = {
            template: __webpack_require__(34),
            controller: ModalController,
            controllerAs: 'vm',
            size: 'lg',
            resolve: {
                dialogDetails: function () {
                    return { tabId: tab, boxId: box, fieldId: field };
                },
            },
        };
        var modal = this.$uibModal.open(modalOptions);
        return modal.result.catch(function () { return undefined; });
    };
    return ModalService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ModalService;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstractDataViewClass_1 = __webpack_require__(5);
var _ = __webpack_require__(0);
/**
 * This controller is for managing data table entities. It extends {@link miqStaticAssets.gtl.DataViewClass}
 * which is abstract class with basic methods for filtering, sorting and limiting entries in data table.
 * @extends miqStaticAssets.gtl.DataViewClass
 * @memberof miqStaticAssets.gtl
 * @ngdoc controller
 * @name DataTableController
 */
var DataTableController = (function (_super) {
    __extends(DataTableController, _super);
    function DataTableController() {
        _super.apply(this, arguments);
    }
    /**
     * This method will check if user wants to go to non existent page and will validate it.
     * @memberof DataTableController
     * @function setTablePage
     * @param pageNumber {Number} desired page.
     */
    DataTableController.prototype.setTablePage = function (pageNumber) {
        pageNumber = Number(pageNumber);
        if (_.isNaN(pageNumber)) {
            this.currentPageView = this.settings.current;
            pageNumber = this.currentPageView;
        }
        else {
            if (pageNumber <= 0) {
                this.currentPageView = 1;
                pageNumber = 1;
            }
            this.setPage(pageNumber);
        }
    };
    /**
     * Public method for getting column class, narrow column with checkbox or image.
     * @memberof DataTableController
     * @function getColumnClass
     * @param column {Object} header column. This column will have `is_narrow` property set to true and `narrow` class
     * will be present in classes.
     * @returns {Object} angular class object. `{narrow: boolean}`
     */
    DataTableController.prototype.getColumnClass = function (column) {
        return {
            narrow: column.is_narrow
        };
    };
    /**
     * Public method for checking if column of table is icon or image.
     * @memberof DataTableController
     * @function isIconOrImage
     * @param row {object} whole row with data.
     * @param columnKey header column key.
     * @returns {boolean} true | false, if column is image or icon.
     */
    DataTableController.prototype.isIconOrImage = function (row, columnKey) {
        return row && row.cells &&
            (row.cells[columnKey].hasOwnProperty('icon') || row.cells[columnKey].hasOwnProperty('image'));
    };
    /**
     * Public method for finding out if it's filtered by header column.
     * @memberof DataTableController
     * @function isFilteredBy
     * @param column column which is checked if it's filtered by.
     * @returns {boolean} true | false if `this.settings.sortBy.sortObject.col_idx` is equal to `column.col_idx`.
     */
    DataTableController.prototype.isFilteredBy = function (column) {
        return !!this.settings.sortBy && (this.settings.sortBy.sortObject.col_idx === column.col_idx);
    };
    /**
     * Public method for getting sort class, either `fa-sort-asc` or `fa-sort-desc`.
     * @memberof DataTableController
     * @function getSortClass
     * @returns {Object} angular class object: `{fa-sort-asc: boolean, fa-sort-desc: boolean}`
     */
    DataTableController.prototype.getSortClass = function () {
        return {
            'fa-sort-asc': !!this.settings.sortBy && this.settings.sortBy.isAscending,
            'fa-sort-desc': !(!!this.settings.sortBy && this.settings.sortBy.isAscending)
        };
    };
    /**
     * Angular's $onchange function to find out if one of bounded option has changed.
     * @memberof DataTableController
     * @function $onChanges
     * @param changesObj angular changed object.
     */
    DataTableController.prototype.$onChanges = function (changesObj) {
        var _this = this;
        if (changesObj.settings && this.settings) {
            this.currentPageView = this.settings.current;
        }
        if (changesObj.perPage) {
            this.perPage.text += ' ' + this.perPage.labelItems;
            this.perPage.items = this.perPage.items.map(function (oneItem) {
                oneItem.text += ' ' + _this.perPage.labelItems;
                return oneItem;
            });
        }
        this.setPagingNumbers();
    };
    return DataTableController;
}(abstractDataViewClass_1.DataViewClass));
exports.DataTableController = DataTableController;
/**
 * @description
 *    Component for data table.
 * @memberof miqStaticAssets.gtl
 * @ngdoc component
 * @name miqDataTable
 * @attr {Object} rows
 *    Array of rows which will be displayed.
 * @attr {Object} perPage
 *    Object which will be displayed as dropdown picker to filter number of rows.
 * @attr {Object} columns
 *    Columns which will be displayed as header in table.
 * @attr {Object} settings
 *    Table settings look at {@see ITableSettings} for more information.
 * @attr {Expression} loadMoreItems
 *    Function which will be called upon loading more items. Function call has to have `start`, `perPage` params.
 * @attr {Expression} onSort
 *    Function to triggering sorting items. Function call has to have `headerId`, `isAscending` params.
 * @attr {Expression} onRowClick
 *    Function which will be executed when click on row event is fired. Function call has to have `item` param.
 * @attr {Expression} onItemSelected
 *    Function to be called on selecting item (trough selectbox next to each row). Function call has to have `item`,
 *    `isSelected` params.
 * @example
 * <miq-data-table rows="ctrl.rows"
 *                 columns="ctrl.columns"
 *                 per-page="ctrl.perPage"
 *                 settings="ctrl.settings"
 *                 load-more-items="ctrl.onLoadMoreItems(start, perPage)"
 *                 on-sort="ctrl.onSort(headerId, isAscending)"
 *                 on-row-click="ctrl.onRowClick(item)"
 *                 on-item-selected="ctrl.onItemSelect(item, isSelected)">
 * </miq-data-table>
 */
var DataTable = (function () {
    function DataTable() {
        this.replace = true;
        this.template = __webpack_require__(35);
        this.controller = DataTableController;
        this.transclude = true;
        this.controllerAs = 'tableCtrl';
        this.bindings = {
            rows: '<',
            columns: '<',
            perPage: '<',
            settings: '<',
            loadMoreItems: '&',
            onSort: '&',
            onRowClick: '&',
            onItemSelected: '&'
        };
    }
    return DataTable;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DataTable;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dataTableComponent_1 = __webpack_require__(66);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.component('miqDataTable', new dataTableComponent_1.default);
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var data_table_1 = __webpack_require__(67);
var tile_view_1 = __webpack_require__(69);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    data_table_1.default(module);
    tile_view_1.default(module);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tileViewComponent_1 = __webpack_require__(71);
var pagingComponent_1 = __webpack_require__(70);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.component('miqTileView', new tileViewComponent_1.default);
    module.component('miqPaging', new pagingComponent_1.default);
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _ = __webpack_require__(0);
/**
 * Controller for paging component
 * @memberof miqStaticAssets.gtl
 * @ngdoc controller
 * @name PagingController
 */
var PagingController = (function () {
    function PagingController() {
        this.MAX_PAGES = 6;
    }
    /**
     * Public method for updating current paging, it will limit number of visible pages to `MAX_PAGES`.
     * @memberof PagingController
     * @function updatePages
     * @param total number of all item's pages.
     * @returns {any} array with page numbers which will be visible.
     */
    PagingController.prototype.updatePages = function (total) {
        var _this = this;
        if (total > this.MAX_PAGES) {
            var currentPage_1 = (this.settings.current < (this.settings.total - this.MAX_PAGES + 1)) ?
                this.settings.current :
                (this.settings.total - this.MAX_PAGES + 1);
            this.pages = _.times(this.MAX_PAGES, function (item) { return (currentPage_1 + item) - 1; });
        }
        else {
            this.pages = new Array(total);
            _.each(this.pages, function (item, key) {
                _this.pages[key] = key;
            });
        }
        return this.pages;
    };
    return PagingController;
}());
exports.PagingController = PagingController;
/**
 * @description
 *    Component for show paging for some long list (e.g. these are used in tile lists).
 *    Settings object example:
 *    ```javascript
 *    {
 *      current: 1,
 *      total: 5
 *    }
 *    ```
 * @memberof miqStaticAssets.gtl
 * @ngdoc component
 * @name miqPaging
 * @attr {Object} settings
 *    settings for paging component. It has `current` attribute `Number` and total `Number`
 *
 * @attr {Expression} onChangePage
 *    object which is currently sorted by.
 * @example
 * <miq-paging settings="settings"
 *             on-change-page="setPage(pageNumber)">
 * </miq-paging>
 */
var Paging = (function () {
    function Paging() {
        this.replace = true;
        this.controller = PagingController;
        this.template = __webpack_require__(36);
        this.controllerAs = 'pagingCtrl';
        this.bindings = {
            settings: '<',
            onChangePage: '&'
        };
    }
    return Paging;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Paging;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tileType_1 = __webpack_require__(74);
var abstractDataViewClass_1 = __webpack_require__(5);
var _ = __webpack_require__(0);
/**
 * Controller for tile components. It extends {@link miqStaticAssets.gtl.DataViewClass}.
 * @memberof miqStaticAssets.gtl
 * @ngdoc controller
 * @name TileViewController
 */
var TileViewController = (function (_super) {
    __extends(TileViewController, _super);
    /* @ngInject */
    TileViewController.$inject = ["$sce", "MiQTranslateService"];
    function TileViewController($sce, MiQTranslateService) {
        _super.call(this, MiQTranslateService);
        this.$sce = $sce;
        this.initOptions();
    }
    /**
     * Method for creating basic options for tiles.
     * @memberof TileViewController
     * @function initOptions
     */
    TileViewController.prototype.initOptions = function () {
        var _this = this;
        this.options = {
            selectionMatchProp: 'id',
            selectItems: false,
            multiSelect: true,
            showSelectBox: true,
            selectedItems: this.filterSelected(),
            onClick: function (item, event) { return _this.onTileClick(item); },
            onCheckBoxChange: function (item) { return _this.onTileSelect(item); },
            onItemClick: function (item, $event) { return _this.onRowClick({ item: item, event: $event }); },
            fetchTileName: function (item) { return _this.fetchTileName(item); },
            trustAsHtmlQuadicon: function (item) { return _this.trustAsHtmlQuadicon(item); },
            type: this.type
        };
    };
    /**
     * Method for enabling quadicons html to be displayed inside tile.
     * @memberof TileViewController
     * @function trustAsHtmlQuadicon
     * @param item item with quadicon.
     * @returns {any} trusted html object, which cn be used as `bind-html`.
     */
    TileViewController.prototype.trustAsHtmlQuadicon = function (item) {
        return this.$sce.trustAsHtml(item.quadicon);
    };
    /**
     * Method for fetching name of item, it will try to guess which column should be showed as name of tile, usually it's
     * column with Name in them.
     * @memberof TileViewController
     * @function fetchTileName
     * @param item which will be displayed in tile. If no column with name is not present third cell text will be used.
     * @returns {string} text which will be displayed as tile header.
     */
    TileViewController.prototype.fetchTileName = function (item) {
        var nameIndex = _.findIndex(this.columns, function (oneColumn) { return oneColumn.text && oneColumn.text.indexOf('Name') !== -1; });
        return (nameIndex !== -1 && item.cells && item.cells[nameIndex]) ?
            item.cells[nameIndex]['text'] :
            item.cells[2]['text'];
    };
    /**
     * Angular's method for fetching change events.
     * @memberof TileViewController
     * @function $onChanges
     * @param changesObj angular's change object.
     */
    TileViewController.prototype.$onChanges = function (changesObj) {
        var _this = this;
        if (changesObj.type) {
            this.options.type = this.type;
        }
        else if (changesObj.columns) {
            this.options.columns = this.columns;
        }
        if (changesObj.perPage) {
            this.perPage.text += ' ' + this.perPage.labelItems;
            this.perPage.items = this.perPage.items.map(function (oneItem) {
                oneItem.text += ' ' + _this.perPage.labelItems;
                return oneItem;
            });
        }
        this.setPagingNumbers();
    };
    /**
     * Method which will be called when clicking on tile.
     * @memberof TileViewController
     * @function onTileClick
     * @param item which tile was clicked.
     */
    TileViewController.prototype.onTileClick = function (item) {
        this.onItemSelected({ item: item, isSelected: !item.selected });
    };
    TileViewController.prototype.onTileSelect = function (item) {
        this.onItemSelected({ item: item, isSelected: item.selected });
    };
    /**
     * Method for checking all tiles and then filtering selected items.
     * @memberof TileViewController
     * @function tileClass
     * @param isSelected true | false.
     */
    TileViewController.prototype.onCheckAllTiles = function (isSelected) {
        this.onCheckAll(isSelected);
        this.options.selectedItems = this.filterSelected();
    };
    /**
     * Method for filtering selected tiles based on checked property.
     * @memberof TileViewController
     * @function tileClass
     * @returns filtered array of checked items.
     */
    TileViewController.prototype.filterSelected = function () {
        return _.filter(this.rows, { checked: true });
    };
    /**
     * Angular's method for getting tile's class based on it's type.
     * @memberof TileViewController
     * @function tileClass
     * @returns {Object} it will return angular class object: `{miq-small-tile: boolean, miq-tile-with-body: boolean}`
     */
    TileViewController.prototype.tileClass = function () {
        return {
            'miq-small-tile': this.type === tileType_1.TileType.SMALL,
            'miq-tile-with-body': this.type === tileType_1.TileType.BIG
        };
    };
    return TileViewController;
}(abstractDataViewClass_1.DataViewClass));
exports.TileViewController = TileViewController;
/**
 * @description
 *    Component for tile list. This component requires pf-tile to be part of angular's components. For patternfly's
 *    implementation look at
 *    <a href="http://angular-patternfly.rhcloud.com/#/api/patternfly.views.directive:pfCardView">pfCardView</a>
 * @memberof miqStaticAssets.gtl
 * @ngdoc component
 * @name miqTileView
 * @attr {Object} type
 *    Type of tile look at {@see miqStaticAssets.gtl.TileType}
 * @attr {Object} rows
 *    Array of rows which will be displayed.
 * @attr {Object} perPage
 *    Object which will be displayed as dropdown picker to filter number of tiles.
 * @attr {Object} columns
 *    Columns which will be displayed as header in tile.
 * @attr {Object} settings
 *    Tile settings look at {@see ITableSettings} for more information.
 * @attr {Expression} loadMoreItems
 *    Function which will be called upon loading more items. Function call has to have `start`, `perPage` params.
 * @attr {Expression} onSort
 *    Function to triggering sorting items. Function call has to have `headerId`, `isAscending` params.
 * @attr {Expression} onRowClick
 *    Function which will be executed when click on tile event is fired. Function call has to have `item` param.
 * @attr {Expression} onItemSelected
 *    Function to be called on selecting item (trough clicking on tile). Function call has to have `item`, `isSelected`
 *    params.
 * @example
 * <miq-tile-view type="ctrl.type"
 *                rows="ctrl.rows"
 *                columns="ctrl.columns"
 *                per-page="ctrl.perPage"
 *                settings="ctrl.settings"
 *                load-more-items="ctrl.onLoadMoreItems(start, perPage)"
 *                on-sort="ctrl.onSort(headerId, isAscending)"
 *                on-row-click="ctrl.onRowClick(item)"
 *                on-item-selected="ctrl.onItemSelect(item, isSelected)>
 * </miq-tile-view>
 */
var TileView = (function () {
    function TileView() {
        this.replace = true;
        this.controller = TileViewController;
        this.template = __webpack_require__(37);
        this.controllerAs = 'tileCtrl';
        this.bindings = {
            type: '<',
            rows: '<',
            columns: '<',
            perPage: '<',
            settings: '<',
            loadMoreItems: '&',
            onSort: '&',
            onRowClick: '&',
            onItemSelected: '&'
        };
    }
    return TileView;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TileView;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var limitToSuffixFilter_1 = __webpack_require__(73);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.filter('limitToSuffix', limitToSuffixFilter_1.default.filter);
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LimitToSuffix = (function () {
    function LimitToSuffix() {
    }
    LimitToSuffix.filter = function () {
        return function (value, start, end) {
            return value.length > start + end + 3 ? value.slice(0, start) + "..." + value.slice(-end) : value;
        };
    };
    return LimitToSuffix;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LimitToSuffix;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Enum for tile types. It holds string value of types for tiles.
 * @memberof miqStaticAssets.gtl
 * @ngdoc enum
 * @name TileType
 */
exports.TileType = {
    /**
     * Tile type: `small`
     * @type {string}
     */
    SMALL: 'small',
    /**
     * Tile type: `big`
     * @type {string}
     */
    BIG: 'big'
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _ = __webpack_require__(0);
/**
 * @memberof miqStaticAssets.gtl
 * @ngdoc service
 * @name DataTableService
 * @param $http {ng.IHttpService} http service for fetching rows and columns of data table.
 * @param MiQEndpointsService {Object} service which holds endpoints to each data store.
 */
var DataTableService = (function () {
    /*@ngInject*/
    DataTableService.$inject = ["$http", "MiQEndpointsService"];
    function DataTableService($http, MiQEndpointsService) {
        this.$http = $http;
        this.MiQEndpointsService = MiQEndpointsService;
    }
    /**
     * Public method for fetching data from url combined from `MiQEndpointsService.rootPoint` and
     * `MiQEndpointsService.endpoints.listDataTable`. Result will be promise with type `IRowsColsResponse`. Which is
     * ```javascript
     * interface IRowsColsResponse {
     *  rows: any[];
     *  cols: any[];
     *  settings: ITableSettings;
     * }
     * ```
     * @methodOf miqStaticAssets.gtl
     * @memberof DataTableService
     * @function retrieveRowsAndColumnsFromUrl
     * @returns {ng.IPromise<IRowsColsResponse>} promise with type `IRowsColsResponse`.
     */
    DataTableService.prototype.retrieveRowsAndColumnsFromUrl = function (modelName, activeTree, currId, isExplorer, settings) {
        var _this = this;
        return this.fetchData(DataTableService.generateConfig(modelName, activeTree, currId, isExplorer, settings))
            .then(function (responseData) {
            _this.columns = responseData.data.data.head;
            _this.rows = responseData.data.data.rows;
            _this.settings = responseData.data.settings;
            return {
                cols: _this.columns,
                rows: _this.rows,
                settings: responseData.data.settings
            };
        });
    };
    /**
     * Method which will do actual http get request using $http service.
     * @param config which contains config params.
     * @returns {IHttpPromise<any>} promise for later data filtering.
     */
    DataTableService.prototype.fetchData = function (config) {
        return this.$http.get(this.MiQEndpointsService.rootPoint + this.MiQEndpointsService.endpoints.listDataTable, config);
    };
    /**
     * Static function which will generate http get config from given variables.
     * @param modelName string with name of model.
     * @param activeTree string with active tree.
     * @param currId ID of current item.
     * @param isExplorer
     * @param settings
     * @returns {{params: {}}} config object with params set.
     */
    DataTableService.generateConfig = function (modelName, activeTree, currId, isExplorer, settings) {
        var config = { params: {} };
        _.assign(config.params, DataTableService.generateModelConfig(modelName));
        _.assign(config.params, DataTableService.generateActiveTreeConfig(activeTree));
        _.assign(config.params, DataTableService.generateModuleIdConfig(currId));
        _.assign(config.params, DataTableService.generateExplorerConfig(isExplorer));
        _.assign(config.params, DataTableService.generateParamsFromSettings(settings));
        return config;
    };
    /**
     * Static function for generating model object, this object will be assigned to `config.params`.
     * @param modelName name of currently selected model.
     * @returns {any|{model: any}} object if any model is selected.
     */
    DataTableService.generateModelConfig = function (modelName) {
        return modelName && { model: modelName };
    };
    /**
     * Static function for generating active tree object, this object will be assigned to `config.params`.
     * @param activeTree name of currently selected tree.
     * @returns {any|{active_tree: any}} object if any tree is selected.
     */
    DataTableService.generateActiveTreeConfig = function (activeTree) {
        return activeTree && { active_tree: activeTree };
    };
    /**
     * Static function for generating module id object, this object will be assigned to `config.params`.
     * @param currId currently selected module's ID.
     * @returns {any|{model_id: any}} object if any module ID is present.
     */
    DataTableService.generateModuleIdConfig = function (currId) {
        return currId && currId !== null && { model_id: currId };
    };
    /**
     *
     * @param isExplorer
     * @returns {any|boolean|{explorer: any}}
     */
    DataTableService.generateExplorerConfig = function (isExplorer) {
        return isExplorer && isExplorer !== null && { explorer: isExplorer };
    };
    DataTableService.generateParamsFromSettings = function (settings) {
        var params = {};
        if (settings) {
            _.assign(params, settings.current && { page: settings.current });
            _.assign(params, settings.perpage && { ppsetting: settings.perpage });
            _.assign(params, settings.sortBy && settings.sortBy.sortObject && { sort_choice: settings.sortBy.sortObject.text });
            _.assign(params, settings.sortBy && settings.sortBy.isAscending && { is_ascending: settings.sortBy.isAscending });
        }
        return params;
    };
    return DataTableService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DataTableService;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dataTableService_1 = __webpack_require__(75);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.service('MiQDataTableService', dataTableService_1.default);
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Controller for site switcher component
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name SiteSwitcherController
 */
var SiteSwitcherController = (function () {
    function SiteSwitcherController() {
    }
    return SiteSwitcherController;
}());
exports.SiteSwitcherController = SiteSwitcherController;
/**
 * @description
 *    Component for showing a site switcher drop down for moving between different UI's.
 *    Settings object example:
 *    ```javascript
 *    {
 *      sites: [{
 *        title: 'Launch Operations UI',
 *        tooltip: 'Launch Operations UI',
 *        iconClass: 'fa-cogs',
 *        url: 'http://www.manageiq.com'
 *      }, {
 *        title: 'Launch Service UI',
 *        tooltip: 'Launch Service UI',
 *        iconClass: 'fa-cog',
 *        url: 'http://www.manageiq.com'
 *      }, {
 *        title: 'Home',
 *        tooltip: 'Home',
 *        iconClass: 'fa-home',
 *        url: 'http://www.manageiq.com'
 *      }]
 *    }
 *    ```
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name miqSiteSwitcher
 * @attr {Array} sites
 *     An array of sites to display in the switcher (includes url, iconClass, tooltip and title).
 *     Since we use typescript this attribute has specific type of: `Array<ISite>`
 *
 * @example
 * <miq-site-switcher sites="sites">
 * </miq-site-switcher>
 */
var SiteSwitcher = (function () {
    function SiteSwitcher() {
        this.controller = SiteSwitcherController;
        this.template = __webpack_require__(38);
        this.controllerAs = 'ctrl';
        this.bindings = {
            sites: '<'
        };
    }
    return SiteSwitcher;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SiteSwitcher;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toolbar_menu_1 = __webpack_require__(79);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    toolbar_menu_1.default(module);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toolbarComponent_1 = __webpack_require__(81);
var toolbarButtonDirective_1 = __webpack_require__(80);
var toolbarListComponent_1 = __webpack_require__(82);
var toolbarViewComponent_1 = __webpack_require__(83);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.component('miqToolbarMenu', new toolbarComponent_1.default);
    module.component('miqToolbarList', new toolbarListComponent_1.default);
    module.component('miqToolbarView', new toolbarViewComponent_1.default);
    module.directive('miqToolbarButton', toolbarButtonDirective_1.default.Factory());
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @memberof miqStaticAssets
 * @ngdoc directive
 * @name miqToolbarButton
 * @description
 *    Directive withou controller. It will create new toolbar button in toolbar.
 *
 * @attr {Expression} onItemClick
 *    Method for handling clicking on this button (will be called with `{item: item}` object).
 * @attr {IToolbarItem} toolbarButton
 *    Toolbar item based on which will be this button generated.
 * @example
 * <miq-toolbar-button toolbar-button="toolbarButton"
 *                   on-item-click="ctrl.onClick(item)">
 * </miq-toolbar-button>
 */
var ToolbarButton = (function () {
    function ToolbarButton() {
        this.replace = true;
        this.template = __webpack_require__(39);
        this.scope = {
            toolbarButton: '<',
            onItemClick: '&'
        };
    }
    ToolbarButton.Factory = function () {
        var directive = function () { return new ToolbarButton(); };
        directive.$inject = [];
        return directive;
    };
    return ToolbarButton;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ToolbarButton;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toolbarType_1 = __webpack_require__(6);
/**
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name ToolbarController
 * @param $window {ng.IWindowService} window service for redirecting to non angular pages.
 * @param $location {ng.ILocationService} location service to handle redirect to different angular pages.
 * @param $sce {ng.ISCEService} service for enabling html strings to be html objects injected to page as html and not as
 * string.
 */
var ToolbarController = (function () {
    /*@ngInject*/
    ToolbarController.$inject = ["$window", "$location", "$sce"];
    function ToolbarController($window, $location, $sce) {
        this.$window = $window;
        this.$location = $location;
        this.$sce = $sce;
    }
    /**
     * Handle clicking on item in toolbar.
     * Check what function has item for handling click action it's one of [actionUrl, redirectUrl, actionFunction,
     * eventFunction].
     *    * actionUrl      - will perform location path change.
     *    * redirectUrl    - will perform window redirect.
     *    * actionFunction - will perform call without any arguments.
     *    * eventFunction  - will perform call to this function with $event specified.
     * @memberof ToolbarController
     * @function onItemClick
     * @param {Object} item what was clicked in toolbar (member of toolbar items).
     * @param {Object} $event for passing it to eventFunction of item (good for checking target).
     */
    ToolbarController.prototype.onItemClick = function (item, $event) {
        if (item.hasOwnProperty('actionUrl')) {
            this.$location.path(item.actionUrl);
        }
        else if (item.hasOwnProperty('redirectUrl')) {
            this.$window.location.replace(item.redirectUrl);
        }
        else if (item.hasOwnProperty('actionFunction')) {
            item.actionFunction();
        }
        else if (item.hasOwnProperty('eventFunction')) {
            item.eventFunction($event);
        }
    };
    /**
     * Filter out items which does not have buttons, select or custom html in them and check if array is not empty. If
     * this array would be empty there is no content which could be shown in toolbar group.
     *    * see {@link miqStaticAssets.ToolbarController#isButtonOrSelect} on how it is checked button or select item.
     *    * see {@link miqStaticAssets.ToolbarController#isCustom} on how it is checked custom html item.
     * @memberof ToolbarController
     * @function hasContent
     * @param {Array<IToolbarItem>} toolbarItem array of items which are checked for content.
     * @returns {boolean} true|false isEmpty or not.
     */
    ToolbarController.prototype.hasContent = function (toolbarItem) {
        return toolbarItem && toolbarItem.filter(function (item) {
            return item && (ToolbarController.isButtonOrSelect(item) || ToolbarController.isCustom(item));
        }).length !== 0;
    };
    /**
     * Escape html custom data and make them available for html insertion to toolbar.
     * @memberof ToolbarController
     * @function hasContent
     * @param escapedString html string without escaped items.
     * @returns {any} html object, this object can be bound to see
     * {@link https://docs.angularjs.org/api/ng/directive/ngBindHtml}
     */
    ToolbarController.prototype.trustAsHtml = function (escapedString) {
        escapedString = ToolbarController.htmlDecode(escapedString);
        return this.$sce.trustAsHtml(escapedString);
    };
    /**
     * Helper method for getting string value of {@link ToolbarType.BUTTON_SELECT}
     * @memberof ToolbarController
     * @function getToolbarListType
     * @returns {string}
     */
    ToolbarController.prototype.getToolbarListType = function () {
        return toolbarType_1.ToolbarType.BUTTON_SELECT;
    };
    /**
     * Helper method for getting string value of {@link ToolbarType.BUTTON}
     * @memberof ToolbarController
     * @function getToolbarListType
     * @returns {string}
     */
    ToolbarController.prototype.getButtonType = function () {
        return toolbarType_1.ToolbarType.BUTTON;
    };
    /**
     * Helper method for getting string value of {@link ToolbarType.CUSTOM}
     * @memberof ToolbarController
     * @function getToolbarListType
     * @returns {string}
     */
    ToolbarController.prototype.getCustomType = function () {
        return toolbarType_1.ToolbarType.CUSTOM;
    };
    ToolbarController.prototype.getButtonTwoState = function () {
        return toolbarType_1.ToolbarType.BUTTON_TWO_STATE;
    };
    /**
     * Private static function for decoding html.
     * @memberof ToolbarController
     * @function htmlDecode
     * @param input html string containing custom html.
     * @returns {string} unescaped html string.
     */
    ToolbarController.htmlDecode = function (input) {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
    };
    /**
     * Private static function for checking if toolbar item has name and if this name is `"custom"`.
     * @memberof ToolbarController
     * @function hasContent
     * @param {IToolbarItem} item which is checked for name property.
     * @returns {boolean} true|false if it's item with custom html.
     */
    ToolbarController.isCustom = function (item) {
        return item.name && item.name === toolbarType_1.ToolbarType.CUSTOM;
    };
    /**
     * Private static function for checking if toolbar item type and if this type is button or select.
     *    * see {@link miqStaticAssets.ToolbarController#isButtonSelect} on how it's checked for select type.
     *    * see {@link miqStaticAssets.ToolbarController#isButton} on how it's checked for button type.
     * @memberof ToolbarController
     * @function isButtonOrSelect
     * @param {IToolbarItem} item which is checked for type property.
     * @returns {boolean} true|false if it's item with button or button select type.
     */
    ToolbarController.isButtonOrSelect = function (item) {
        return item.type && ((ToolbarController.isButtonSelect(item) && item.items && item.items.length !== 0)
            || ToolbarController.isButton(item)
            || ToolbarController.isButtonTwoState(item));
    };
    ToolbarController.isButtonTwoState = function (item) {
        return item.type === toolbarType_1.ToolbarType.BUTTON_TWO_STATE;
    };
    /**
     * Private static function for checking if toolbar item type is buttonSelect.
     * @memberof ToolbarController
     * @function isButtonSelect
     * @param {IToolbarItem} item item which is checked for type property.
     * @returns {boolean} true|false if it's item with type equals to `"buttonSelect"`.
     */
    ToolbarController.isButtonSelect = function (item) {
        return item.type === toolbarType_1.ToolbarType.BUTTON_SELECT;
    };
    /**
     * Private static function for checking if toolbar item type is button.
     * @memberof ToolbarController
     * @function isButton
     * @param {IToolbarItem} item item which is checked for type property.
     * @returns {boolean} true|false if it's item with type equals to `"button"`.
     */
    ToolbarController.isButton = function (item) {
        return item.type === toolbarType_1.ToolbarType.BUTTON;
    };
    return ToolbarController;
}());
exports.ToolbarController = ToolbarController;
/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name miqToolbarMenu
 * @description
 *    This component is for whole toolbar implementation. It's advantages are, that it takes custom components as well
 *    so they can be used instead of just plain JS objects (pass html inside toolbarItems attribute).
 *    See {@link miqStaticAssets.ToolbarController} for implementation of all methods and behavior of this component.
 *    Attribute toolbarItems for custom html needs to have set `args.html`:
 *    ```JSON
 *    [[
 *      {"name" : "custom",
 *      "args" : {
 *        ...
 *        "html" : "<div>html string, this string will be generated as part of form group</div>"
 *        ...
 *      }}
 *    ]]
 *    ```
 *    How each button is treated see {@link miqStaticAssets.ToolbarController#hasContent} and observe each static
 *    function which
 *    is responsible for deciding what type of button will be used.
 *
 * @attr {Expression} onViewClick
 *    Method which will be executed when clicked on view. See {@link miqStaticAssets.ToolbarController#onViewClick}
 *    which arguments are
 *    needed.
 * @attr {Array} toolbarViews
 *    List of all views which are used in toolbar. Since we use typescript this attribute has specific type of:
 *    `Array<IToolbarItem>` See {@link IToolbarItem} for entities of toolbarViews.
 * @attr {Array} toolbarItems
 *    List of all items which are used in toolbar. Since we use typescript this attribute has specific type of:
 *    `Array<Array<IToolbarItem>>` See {@link IToolbarItem} for entities of toolbarItems.
 * @example
 * <miq-toolbar-menu toolbar-views="ctrl.toolbarViews"
 *                   toolbar-items="ctrl.toolbarItems"
 *                   on-view-click="ctrl.onClick(item)">
 * </miq-toolbar-menu>
 */
var Toolbar = (function () {
    function Toolbar() {
        this.replace = true;
        this.template = __webpack_require__(41);
        this.controller = ToolbarController;
        this.controllerAs = 'vm';
        this.bindings = {
            toolbarViews: '<',
            toolbarItems: '<',
            onViewClick: '&'
        };
    }
    return Toolbar;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Toolbar;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name ToolbarListController
 * @implements {IToolbarListBindings}
 */
var ToolbarListController = (function () {
    function ToolbarListController() {
        this.isEmpty = false;
    }
    /**
     * Angular's function to observe on changes.
     * @memberof ToolbarListController
     * @function isToolbarEmpty
     * @param changesObj changed object.
     */
    ToolbarListController.prototype.$onChanges = function (changesObj) {
        if (changesObj.toolbarList) {
            this.isEmpty = this.isToolbarEmpty();
        }
    };
    /**
     * Method which filters out
     * @memberof ToolbarListController
     * @function isToolbarEmpty
     * @returns {boolean}
     */
    ToolbarListController.prototype.isToolbarEmpty = function () {
        return this.toolbarList &&
            this.toolbarList.items &&
            this.toolbarList.items.filter(function (item) { return !item.hidden; }).length > 0;
    };
    return ToolbarListController;
}());
exports.ToolbarListController = ToolbarListController;
/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name miqToolbarList
 * @description
 *    Component which will generate list in toolbar with toolbarItems as dropdown menu.
 *
 * @attr {Expression} onItemClick
 *    Method which will be executed when clicked on view. See
 *    {@link miqStaticAssets.ToolbarListController#onItemClick} which arguments are
 *    needed.
 * @attr {Array} toolbarItems
 *    List of all items which are used in toolbar. Since we use typescript this attribute has specific type of:
 *    `Array<Array<IToolbarItem>>` See {@link IToolbarItem} for entities of toolbarItems.
 * @example
 * <miq-toolbar-list toolbar-list="ctrl.toolbarItems"
 *                   on-item-click="ctrl.onClick(item)">
 * </miq-toolbar-list>
 */
var ToolbarList = (function () {
    function ToolbarList() {
        this.replace = true;
        this.template = __webpack_require__(40);
        this.controller = ToolbarListController;
        this.controllerAs = 'vm';
        this.bindings = {
            toolbarList: '<',
            onItemClick: '&',
            dropDownClass: '<'
        };
    }
    return ToolbarList;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ToolbarList;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name ToolbarViewController
 * @implements {IToolbarViewBindings}
 */
var ToolbarViewController = (function () {
    function ToolbarViewController() {
    }
    return ToolbarViewController;
}());
exports.ToolbarViewController = ToolbarViewController;
/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name miqToolbarView
 * @description
 *    Component which will generate list in toolbar with toolbarItems as dropdown menu.
 *
 * @attr {Expression} onItemClick
 *    Method which will be executed when clicked on view.
 * @attr {Array} toolbarViews
 *    List of all views which are used in toolbar.
 * @example
 * <miq-toolbar-view toolbar-views="ctrl.toolbarViews"
 *                   on-item-click="ctrl.onClick(item)">
 * </miq-toolbar-view>
 */
var ToolbarView = (function () {
    function ToolbarView() {
        this.replace = false;
        this.template = __webpack_require__(42);
        this.controller = ToolbarViewController;
        this.controllerAs = 'vm';
        this.bindings = {
            toolbarViews: '<',
            onItemClick: '&'
        };
    }
    return ToolbarView;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ToolbarView;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toolbarSettingsService_1 = __webpack_require__(85);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.service('MiQToolbarSettingsService', toolbarSettingsService_1.default);
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toolbarType_1 = __webpack_require__(6);
var _ = __webpack_require__(0);
var ToolbarSettingsService = (function () {
    /*@ngInject*/
    ToolbarSettingsService.$inject = ["$http", "MiQEndpointsService"];
    function ToolbarSettingsService($http, MiQEndpointsService) {
        this.$http = $http;
        this.MiQEndpointsService = MiQEndpointsService;
        this.countSelected = 0;
    }
    /**
     * FIXME: the method is obsolete and should be removed once setCount is being used instead
     * @param isClicked
     */
    ToolbarSettingsService.prototype.checkboxClicked = function (isClicked) {
        isClicked ? this.countSelected++ : this.countSelected--;
        this.updateByCount();
    };
    /**
     * Update the selected item count, and enable/disable onwhen toolbar items
     * @param count - the number of currently selected items
     */
    ToolbarSettingsService.prototype.setCount = function (count) {
        this.countSelected = count;
        this.updateByCount();
    };
    /**
      * Traverses through all the items and enables them by number of selected items.
      */
    ToolbarSettingsService.prototype.updateByCount = function () {
        var _this = this;
        _.chain(this.items)
            .flatten()
            .filter(function (item) { return item; })
            .each(function (item) {
            _this.enableToolbarItemByCountSelected(item);
        })
            .map('items')
            .flatten()
            .filter(function (item) { return item; })
            .each(function (item) {
            _this.enableToolbarItemByCountSelected(item);
        })
            .value();
    };
    /**
     *
     * @param toolbarObject
     * @returns {{items: Array<Array<IToolbarItem>>, dataViews: Array<IToolbarItem>}}
     */
    ToolbarSettingsService.prototype.generateToolbarObject = function (toolbarObject) {
        this.countSelected = 0;
        this.items = this.separateItems(toolbarObject.filter(function (item) { return !!item; }));
        this.dataViews = this.filterViews();
        return {
            items: this.items,
            dataViews: this.dataViews
        };
    };
    /**
     *
     * @returns {ng.IPromise<IToolbarSettings>}
     * @param getData
     */
    ToolbarSettingsService.prototype.getSettings = function (getData) {
        var _this = this;
        return this.httpGet(this.MiQEndpointsService.rootPoint + this.MiQEndpointsService.endpoints.toolbarSettings, getData).then(function (items) { return _this.generateToolbarObject(items); });
    };
    /**
     * Helper method for separating items in toolbar by separators.
     * @param toolbarItems all toolbar items.
     * @returns {Array} of separated items.
     */
    ToolbarSettingsService.prototype.separateItems = function (toolbarItems) {
        var separatedArray = [];
        toolbarItems.forEach(function (items) {
            var arrayIndex = separatedArray.push([]);
            items.forEach(function (item) {
                if (item.type !== toolbarType_1.ToolbarType.SEPARATOR) {
                    separatedArray[arrayIndex - 1].push(item);
                }
                else {
                    arrayIndex = separatedArray.push([]);
                }
            });
        });
        return separatedArray;
    };
    /**
     *
     * @returns {Array<IToolbarItem>}
     */
    ToolbarSettingsService.prototype.filterViews = function () {
        return _.flatten(this.items)
            .filter(function (item) { return item && item.id && item.id.indexOf('view_') === 0; });
    };
    /**
     *
     * @param url
     * @param dataObject
     * @returns {ng.IPromise<Array<Array<IToolbarItem>>>}
     */
    ToolbarSettingsService.prototype.httpGet = function (url, dataObject) {
        return this.$http.get(url, { params: dataObject })
            .then(function (dataResponse) { return dataResponse.data; });
    };
    /**
     *
     * @param toolbarItem
     */
    ToolbarSettingsService.prototype.enableToolbarItemByCountSelected = function (toolbarItem) {
        if (toolbarItem.onwhen) {
            if (toolbarItem.onwhen.slice(-1) === '+') {
                toolbarItem.enabled = this.countSelected >= ToolbarSettingsService.parseNumberFromWhen(toolbarItem.onwhen);
            }
            else {
                toolbarItem.enabled = this.countSelected === parseInt(toolbarItem.onwhen, 10);
            }
        }
    };
    /**
     *
     * @param onWhen
     * @returns {number}
     */
    ToolbarSettingsService.parseNumberFromWhen = function (onWhen) {
        return onWhen.indexOf('+') !== -1 ? parseInt(onWhen.slice(0, onWhen.length - 1), 10) : parseInt(onWhen, 10);
    };
    return ToolbarSettingsService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ToolbarSettingsService;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./check-box.html": 25,
	"./date-time-control.html": 26,
	"./dynamic.html": 27,
	"./index": 2,
	"./index.ts": 2,
	"./modalFieldTemplateComponent": 3,
	"./modalFieldTemplateComponent.ts": 3,
	"./radio-button-drop-down-list.html": 28,
	"./tag-control.html": 29,
	"./text-area-box.html": 30,
	"./text-box.html": 31
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 86;


/***/ }),
/* 87 */,
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(8);
__webpack_require__(13);
__webpack_require__(15);
__webpack_require__(10);
__webpack_require__(11);
__webpack_require__(12);
module.exports = __webpack_require__(14);


/***/ })
/******/ ]);
//# sourceMappingURL=ui-components.js.map