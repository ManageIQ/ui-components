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
/******/ 	return __webpack_require__(__webpack_require__.s = 59);
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
/* 2 */,
/* 3 */
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
    function DataViewClass() {
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
        this.onCheckAll(true);
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
/* 4 */
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
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var services_1 = __webpack_require__(37);
var components_1 = __webpack_require__(34);
var angular = __webpack_require__(1);
var common;
(function (common) {
    common.app = angular.module('miqStaticAssets.common', []);
    services_1.default(common.app);
    components_1.default(common.app);
})(common || (common = {}));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var services_1 = __webpack_require__(48);
var filters_1 = __webpack_require__(44);
var components_1 = __webpack_require__(40);
var angular = __webpack_require__(1);
var gtl;
(function (gtl) {
    gtl.app = angular.module('miqStaticAssets.gtl', []);
    services_1.default(gtl.app);
    filters_1.default(gtl.app);
    components_1.default(gtl.app);
})(gtl || (gtl = {}));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var angular = __webpack_require__(1);
var miqStaticAssets;
(function (miqStaticAssets) {
    angular.module('miqStaticAssets', [
        'miqStaticAssets.toolbar',
        'miqStaticAssets.common',
        'miqStaticAssets.gtl',
        'miqStaticAssets.siteSwitcher'
    ]);
})(miqStaticAssets || (miqStaticAssets = {}));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var siteSwitcherComponent_1 = __webpack_require__(49);
var angular = __webpack_require__(1);
var siteSwitcher;
(function (siteSwitcher) {
    siteSwitcher.app = angular.module('miqStaticAssets.siteSwitcher', []);
    siteSwitcher.app.component('miqSiteSwitcher', new siteSwitcherComponent_1.default);
})(siteSwitcher || (siteSwitcher = {}));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var services_1 = __webpack_require__(56);
var components_1 = __webpack_require__(50);
var angular = __webpack_require__(1);
var toolbar;
(function (toolbar) {
    toolbar.app = angular.module('miqStaticAssets.toolbar', ['ngSanitize']);
    services_1.default(toolbar.app);
    components_1.default(toolbar.app);
})(toolbar || (toolbar = {}));


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports) {

module.exports = "<div class=\"miq-data-table\">\n  <div ng-if=\"tableCtrl.settings.isLoading\" class=\"spinner spinner-lg\"></div>\n  <div class=\"row miq-pagination\" ng-if=\"tableCtrl.rows && tableCtrl.rows.length !== 0\">\n    <div ng-if=\"tableCtrl.rows.length !== 0\" class=\"miq-select-all col-md-2 col-lg-2 col-xs-2\">\n      <label>{{tableCtrl.settings.selectAllTitle}}: </label>\n      <input type=\"checkbox\" ng-model=\"isChecked\" ng-click=\"tableCtrl.onCheckAll(isChecked)\" title=\"{{tableCtrl.settings.selectAllTitle}}\" />\n    </div>\n    <div class=\"miq-per-page col-md-2 col-lg-2 col-xs-3\">\n      <label>{{tableCtrl.perPage.label}}: </label>\n      <miq-toolbar-list on-item-click=\"tableCtrl.perPageClick(item)\"\n                        drop-down-class=\"tableCtrl.settings.dropDownClass\"\n                        toolbar-list=\"tableCtrl.perPage\"></miq-toolbar-list>\n    </div>\n    <miq-sort-items class=\"col-md-2 col-lg-2 col-xs-2\"\n                    sort-object=\"tableCtrl.settings.sortBy\"\n                    headers=\"tableCtrl.columns\"\n                    drop-down-class=\"tableCtrl.settings.dropDownClass\"\n                    on-sort=\"tableCtrl.onSortClick(sortObject.colId, isAscending)\"></miq-sort-items>\n    <div class=\"miq-paging col-md-3 col-lg-3 col-xs-5\" ng-if=\"tableCtrl.rows && tableCtrl.rows.length !== 0\">\n      <miq-paging settings=\"tableCtrl.settings\" on-change-page=\"tableCtrl.setTablePage(pageNumber)\"></miq-paging>\n    </div>\n  </div>\n  <table class=\"table table-bordered table-striped table-hover mig-table-with-footer mig-table\" ng-if=\"tableCtrl.rows.length !== 0\">\n    <thead>\n    <tr>\n      <th class=\"narrow miq-select\">\n        <input ng-if=\"tableCtrl.rows.length !== 0\" type=\"checkbox\" ng-model=\"isChecked\" ng-click=\"tableCtrl.onCheckAll(isChecked)\" title=\"{{tableCtrl.settings.selectAllTitle}}\" />\n      </th>\n      <th ng-if=\"$index !== 0\"\n          ng-repeat=\"column in tableCtrl.columns track by $index\"\n          ng-click=\"tableCtrl.onSortClick($index, !!tableCtrl.settings.sortBy && !tableCtrl.settings.sortBy.isAscending)\"\n          ng-class=\"tableCtrl.getColumnClass(column)\">\n        {{column.text}}\n        <div class=\"pull-right\" ng-if=\"tableCtrl.isFilteredBy(column)\" >\n          <i class=\"fa\" ng-class=\"tableCtrl.getSortClass()\"></i>\n        </div>\n      </th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr ng-repeat=\"row in tableCtrl.rows\"\n        ng-class=\"{active : row.selected}\"\n        ng-click=\"tableCtrl.onRowClick({item: row, event: $event})\">\n      <td ng-repeat=\"(columnKey, column) in tableCtrl.columns\" ng-class=\"{narrow: row.cells[columnKey].is_checkbox}\">\n        <input ng-if=\"row.cells[columnKey].is_checkbox\"\n               ng-click=\"tableCtrl.onItemSelected({item: row, isSelected: isSelected})\"\n               onclick=\"event.stopPropagation();\"\n               type=\"checkbox\"\n               ng-model=\"isSelected\"\n               name=\"check_{{row.id}}\"\n               value=\"{{row.id}}\"\n               ng-checked=\"row.checked\"\n               class=\"list-grid-checkbox\">\n        <i ng-if=\"row.cells[columnKey].icon && tableCtrl.isIconOrImage(row, columnKey)\"\n           class=\"{{row.cells[columnKey].icon}}\"\n           title=\"row.cells[columnKey].title\"></i>\n        <img ng-if=\"row.cells[columnKey].icon === null && tableCtrl.isIconOrImage(row, columnKey)\"\n             ng-src=\"{{row.img_url}}\"\n             alt=\"{{row.cells[columnKey].title}}\"\n             title=\"{{row.cells[columnKey].title}}\" />\n        <span ng-if=\"row.cells[columnKey].text\">\n              {{row.cells[columnKey].text}}\n          </span>\n      </td>\n    </tr>\n    </tbody>\n  </table>\n</div>\n"

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "<ul class=\"pagination\">\n  <li>\n    <a ng-class=\"{disabled: pagingCtrl.settings.current === 1}\"\n       ng-click=\"pagingCtrl.onChangePage({pageNumber: 1})\"\n       href=\"javascript:void(0)\">\n      <span class=\"i fa fa-angle-double-left\"></span>\n    </a>\n  </li>\n  <li>\n    <a ng-class=\"{disabled: pagingCtrl.settings.current === 1}\"\n       ng-click=\"pagingCtrl.onChangePage({pageNumber: pagingCtrl.settings.current - 1})\"\n       href=\"javascript:void(0)\">\n      <span class=\"i fa fa-angle-left\"></span>\n    </a>\n  </li>\n  <li ng-repeat=\"page in pagingCtrl.updatePages(pagingCtrl.settings.total) track by $index\">\n    <a ng-class=\"{disabled: pagingCtrl.settings.current === (page + 1)}\"\n       href=\"javascript:void(0)\"\n       ng-click=\"pagingCtrl.onChangePage({pageNumber: page + 1})\">\n      {{page + 1}}\n    </a>\n  </li>\n  <li>\n    <a ng-class=\"{disabled: (pagingCtrl.settings.current) === pagingCtrl.settings.total}\"\n       ng-click=\"pagingCtrl.onChangePage({pageNumber: (pagingCtrl.settings.current + 1)})\"\n       href=\"javascript:void(0)\">\n      <span class=\"i fa fa-angle-right\"></span>\n    </a>\n  </li>\n  <li>\n    <a ng-class=\"{disabled: (pagingCtrl.settings.current) === pagingCtrl.settings.total}\"\n       ng-click=\"pagingCtrl.onChangePage({pageNumber: pagingCtrl.settings.total})\"\n       href=\"javascript:void(0)\">\n      <span class=\"i fa fa-angle-double-right\"></span>\n    </a>\n  </li>\n</ul>\n"

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "<div class=\"miq-tile-section\">\n    <div ng-if=\"tileCtrl.settings.isLoading\" class=\"spinner spinner-lg\"></div>\n    <div class=\"row miq-pagination\" ng-if=\"tileCtrl.rows && tileCtrl.rows.length !== 0\">\n      <div ng-if=\"tileCtrl.rows.length !== 0\" class=\"miq-select-all col-md-2 col-lg-2 col-xs-2\">\n        <label>{{tileCtrl.settings.selectAllTitle}}: </label>\n        <input type=\"checkbox\" ng-model=\"isChecked\" ng-click=\"tileCtrl.onCheckAllTiles(isChecked)\" title=\"{{tileCtrl.settings.selectAllTitle}}\" />\n      </div>\n      <div class=\"miq-per-page col-md-2 col-lg-2 col-xs-3\">\n        <label>{{tileCtrl.perPage.label}}: </label>\n        <miq-toolbar-list on-item-click=\"tileCtrl.perPageClick(item)\"\n                          drop-down-class=\"tileCtrl.settings.dropDownClass\"\n                          toolbar-list=\"tileCtrl.perPage\"></miq-toolbar-list>\n      </div>\n      <miq-sort-items class=\"col-md-2 col-lg-2 col-xs-2\"\n                      sort-object=\"tileCtrl.settings.sortBy\"\n                      headers=\"tileCtrl.columns\"\n                      drop-down-class=\"tileCtrl.settings.dropDownClass\"\n                      on-sort=\"tileCtrl.onSortClick(sortObject.colId, isAscending)\"></miq-sort-items>\n      <div class=\"miq-paging col-md-3 col-lg-3 col-xs-5\" ng-if=\"tileCtrl.rows && tileCtrl.rows.length !== 0\">\n        <miq-paging settings=\"tileCtrl.settings\" on-change-page=\"tileCtrl.setPage(pageNumber)\"></miq-paging>\n      </div>\n    </div>\n  <div pf-card-view\n       config=\"tileCtrl.options\"\n       items=\"tileCtrl.rows\"\n       class=\"miq-tile-view\"\n       ng-class=\"tileCtrl.tileClass()\">\n    <div ng-switch=\"config.type\">\n      <ng-switch-when ng-switch-when=\"small\">\n        <div class=\"miq-tile-head\">\n          <a href=\"javascript:void(0)\" title=\"{{config.fetchTileName(item)}}\" ng-click=\"config.onItemClick(item, $event)\">{{config.fetchTileName(item) | limitToSuffix : 5 : 5 }}</a>\n        </div>\n        <div class=\"miq-quadicon\">\n          <a href=\"javascript:void(0)\" ng-click=\"config.onItemClick(item, $event)\">\n            <div ng-bind-html=\"config.trustAsHtmlQuadicon(item)\"></div>\n          </a>\n        </div>\n      </ng-switch-when>\n      <ng-switch-when ng-switch-when=\"big\">\n        <a href=\"javascript:void(0)\" ng-click=\"config.onItemClick(item, $event)\">{{config.fetchTileName(item)}}</a>\n        <div class=\"row miq-row-margin-only-top \">\n          <div class=\"col-md-3 col-lg-3 col-xs-3 miq-icon-section\">\n            <a href=\"javascript:void(0)\" ng-click=\"config.onItemClick(item, $event)\">\n              <div ng-bind-html=\"config.trustAsHtmlQuadicon(item)\"></div>\n            </a>\n          </div>\n          <div class=\"col-md-9 col-lg-9 col-xs-9 miq-info-section\">\n            <dl class=\"dl-horizontal tile\">\n              <dt ng-repeat-start=\"(key, header) in config.columns | limitTo: 7 track by $index\" ng-if=\"header.text && header.text.indexOf('Name') === -1\" title=\"{{header.text}}\">{{header.text}}:</dt>\n              <dd ng-repeat-end ng-if=\"header.text && header.text.indexOf('Name') === -1\" title=\"{{item.cells[key].text}}\">{{item.cells[key].text | limitToSuffix : 25 : 25}}</dd>\n            </dl>\n          </div>\n        </div>\n      </ng-switch-when>\n    </div>\n  </div>\n</div>\n"

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "<div class=\"dropdown miq-siteswitcher\">\n  <button class=\"btn btn-link dropdown-toggle\" type=\"button\" id=\"domain-switcher\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\n    <span class=\"fa fa-lg fa-th miq-siteswitcher-icon\"></span>\n  </button>\n  <div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"domain-switcher\">\n    <div ng-repeat=\"site in ctrl.sites\" class=\"miq-siteswitcher-entry\">\n      <a class=\"miq-siteswitcher-link\" ng-href=\"{{site.url}}\" target=\"_blank\">\n        <span title=\"{{site.tooltip}}\" class=\"fa fa-3x\" ng-class=\"site.iconClass\"></span>\n        <div>{{site.title}}</div>\n      </a>\n    </div>\n  </div>\n</div>\n"

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "<button title=\"{{toolbarButton.title}}\"\n        data-explorer=\"{{toolbarButton.explorer}}\"\n        data-confirm-tb=\"{{toolbarButton.confirm}}\"\n        id=\"{{toolbarButton.id}}\"\n        name=\"{{toolbarButton.name}}\"\n        type=\"button\"\n        class=\"btn btn-default\"\n        data-click=\"{{toolbarButton.id}}\"\n        data-url=\"{{toolbarButton.url}}\"\n        data-url_parms=\"{{toolbarButton.url_parms}}\"\n        data-prompt=\"{{toolbarButton.prompt}}\"\n        ng-class=\"{active: toolbarButton.selected, disabled: !toolbarButton.enabled}\"\n        ng-hide=\"toolbarButton.hidden\"\n        ng-click=\"onItemClick({item: toolbarButton, $event: $event})\">\n  <i ng-if=\"toolbarButton.icon && toolbarButton.text\" class=\"{{toolbarButton.icon}}\" style=\"margin-right: 5px;\"></i>\n  <i ng-if=\"toolbarButton.icon && !toolbarButton.text\" class=\"{{toolbarButton.icon}}\"></i>\n  <img ng-if=\"toolbarButton.img_url && !toolbarButton.icon\" ng-src=\"{{toolbarButton.img_url}}\"\n       data-enabled=\"{{toolbarButton.img_url}}\"\n       data-disabled=\"{{toolbarButton.img_url}}\">\n  {{toolbarButton.text}}\n</button>\n"

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group\" ng-class=\"vm.dropDownClass\" dropdown ng-if=\"vm.isEmpty\">\n  <button type=\"button\" dropdown-toggle class=\"btn dropdown-toggle btn-default\"\n          ng-class=\"{disabled: !vm.toolbarList.enabled}\" title=\"{{vm.toolbarList.title}}\">\n    <i class=\"{{vm.toolbarList.icon}}\" style=\"margin-right: 5px;\" ng-if=\"vm.toolbarList.icon\"></i>\n    {{vm.toolbarList.text}}\n    <span class=\"caret\"></span>\n  </button>\n  <ul class=\"dropdown-menu\" role=\"menu\">\n    <li ng-repeat=\"item in vm.toolbarList.items track by $index\" ng-class=\"{disabled: !item.enabled}\">\n      <a ng-if=\"item.type !== 'separator'\"\n         ng-hide=\"item.hidden\"\n         href=\"\"\n         title=\"{{item.title}}\"\n         data-explorer=\"{{item.explorer}}\"\n         data-confirm-tb=\"{{item.confirm}}\"\n         ng-click=\"vm.onItemClick({item: item, $event: $event})\"\n         data-function=\"{{item.data.function}}\"\n         data-function-data=\"{{item.data['function-data']}}\"\n         data-target=\"{{item.data.target}}\"\n         data-toggle=\"{{item.data.toggle}}\"\n         data-click=\"{{item.id}}\"\n         name=\"{{item.id}}\"\n         id=\"{{item.id}}\"\n         data-url_parms=\"{{item.url_parms}}\"\n         data-prompt=\"{{item.prompt}}\"\n         data-url=\"{{item.url}}\">\n        <i ng-if=\"item.icon && item.text\" class=\"{{item.icon}}\" style=\"margin-right: 5px;\"></i>\n        <i ng-if=\"item.icon && !item.text\" class=\"{{item.icon}}\"></i>\n        <img ng-if=\"item.img_url && !item.icon\" ng-src=\"{{item.img_url}}\"\n             data-enabled=\"{{item.img_url}}\"\n             data-disabled=\"{{item.img_url}}\">\n        {{item.text}}\n      </a>\n      <div ng-if=\"item.type === 'separator'\" class=\"divider \" role=\"presentation\" ng-hide=\"item.hidden\"></div>\n    </li>\n  </ul>\n</div>\n"

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "<div class=\"toolbar-pf-actions miq-toolbar-actions\">\n  <div class=\"form-group miq-toolbar-group\"\n       ng-repeat=\"toolbarItem in vm.toolbarItems\"\n       ng-if=\"vm.hasContent(toolbarItem)\">\n    <ng-repeat ng-repeat=\"item in toolbarItem \">\n      <miq-toolbar-button ng-if=\"item.type === vm.getButtonType()\"\n                          toolbar-button=\"item\"\n                          on-item-click=\"vm.onItemClick(item, $event)\">\n      </miq-toolbar-button>\n      <miq-toolbar-button ng-if=\"item.type === vm.getButtonTwoState() && item.id.indexOf('view_') === -1\"\n                          toolbar-button=\"item\"\n                          on-item-click=\"vm.onItemClick(item, $event)\">\n      </miq-toolbar-button>\n      <miq-toolbar-list ng-if=\"item.type === vm.getToolbarListType() && item.items.length > 0\"\n                        toolbar-list=\"item\"\n                        on-item-click=\"vm.onItemClick(item, $event)\">\n      </miq-toolbar-list>\n      <div ng-if=\"item.name == 'custom' && item.args && item.args.html\"\n           ng-bind-html=\"vm.trustAsHtml(item.args.html)\"\n           class=\"miq-custom-html\"></div>\n    </ng-repeat>\n  </div>\n  <miq-toolbar-view toolbar-views=\"vm.toolbarViews\"\n                    on-item-click=\"vm.onViewClick({item: item, $event: $event})\"\n                    class=\"miq-view-list\">\n  </miq-toolbar-view>\n</div>\n"

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = "<div class=\"toolbar-pf-view-selector pull-right form-group\">\n  <button class=\"btn btn-link\"\n          ng-repeat=\"item in vm.toolbarViews\"\n          ng-class=\"{active: item.selected}\"\n          title=\"{{item.title}}\"\n          id=\"{{item.id}}\"\n          data-url=\"{{item.url}}\"\n          data-url_parms=\"{{item.url_parms}}\"\n          data-prompt=\"{{item.prompt}}\"\n          ng-click=\"vm.onItemClick({item: item, $event: $event})\"\n          name=\"{{item.name}}\">\n    <i class=\"{{item.icon}}\" style=\"\"></i>\n  </button>\n</div>\n"

/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var sortItemsComponent_1 = __webpack_require__(35);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.component('miqSortItems', new sortItemsComponent_1.default);
};


/***/ }),
/* 35 */
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
        this.options.currentField = {
            colId: _.findIndex(this.headers, this.sortObject.sortObject),
            id: this.sortObject.sortObject.text.toLowerCase(),
            title: this.sortObject.sortObject.text
        };
        this.options.isAscending = this.sortObject.isAscending;
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
/* 36 */
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var endpointsService_1 = __webpack_require__(36);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.service('MiQEndpointsService', endpointsService_1.default);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstractDataViewClass_1 = __webpack_require__(3);
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
        if (changesObj.settings && this.settings) {
            this.currentPageView = this.settings.current;
        }
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
        this.template = __webpack_require__(20);
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dataTableComponent_1 = __webpack_require__(38);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.component('miqDataTable', new dataTableComponent_1.default);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var data_table_1 = __webpack_require__(39);
var tile_view_1 = __webpack_require__(41);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    data_table_1.default(module);
    tile_view_1.default(module);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tileViewComponent_1 = __webpack_require__(43);
var pagingComponent_1 = __webpack_require__(42);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.component('miqTileView', new tileViewComponent_1.default);
    module.component('miqPaging', new pagingComponent_1.default);
};


/***/ }),
/* 42 */
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
        this.template = __webpack_require__(21);
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tileType_1 = __webpack_require__(46);
var abstractDataViewClass_1 = __webpack_require__(3);
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
    TileViewController.$inject = ["$sce"];
    function TileViewController($sce) {
        _super.call(this);
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
        if (changesObj.type) {
            this.options.type = this.type;
        }
        else if (changesObj.columns) {
            this.options.columns = this.columns;
        }
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
        this.template = __webpack_require__(22);
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var limitToSuffixFilter_1 = __webpack_require__(45);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.filter('limitToSuffix', limitToSuffixFilter_1.default.filter);
};


/***/ }),
/* 45 */
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
/* 46 */
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
/* 47 */
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dataTableService_1 = __webpack_require__(47);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.service('MiQDataTableService', dataTableService_1.default);
};


/***/ }),
/* 49 */
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
        this.template = __webpack_require__(23);
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toolbar_menu_1 = __webpack_require__(51);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    toolbar_menu_1.default(module);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toolbarComponent_1 = __webpack_require__(53);
var toolbarButtonDirective_1 = __webpack_require__(52);
var toolbarListComponent_1 = __webpack_require__(54);
var toolbarViewComponent_1 = __webpack_require__(55);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.component('miqToolbarMenu', new toolbarComponent_1.default);
    module.component('miqToolbarList', new toolbarListComponent_1.default);
    module.component('miqToolbarView', new toolbarViewComponent_1.default);
    module.directive('miqToolbarButton', toolbarButtonDirective_1.default.Factory());
};


/***/ }),
/* 52 */
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
        this.template = __webpack_require__(24);
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toolbarType_1 = __webpack_require__(4);
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
        this.template = __webpack_require__(26);
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
/* 54 */
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
        this.template = __webpack_require__(25);
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
/* 55 */
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
        this.template = __webpack_require__(27);
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toolbarSettingsService_1 = __webpack_require__(57);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (module) {
    module.service('MiQToolbarSettingsService', toolbarSettingsService_1.default);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toolbarType_1 = __webpack_require__(4);
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
/* 58 */,
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);
__webpack_require__(10);
__webpack_require__(12);
__webpack_require__(8);
__webpack_require__(9);
module.exports = __webpack_require__(11);


/***/ })
/******/ ]);
//# sourceMappingURL=ui-components.js.map