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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = ".";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(14);
	module.exports = __webpack_require__(16);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="tsd.d.ts"/>
	var services_1 = __webpack_require__(17);
	var components_1 = __webpack_require__(20);
	var filters_1 = __webpack_require__(30);
	var miqStaticAssets;
	(function (miqStaticAssets) {
	    miqStaticAssets.app = angular.module('miqStaticAssets', ['ui.bootstrap', 'ui.bootstrap.tabs', 'rx', 'ngSanitize']);
	    services_1.default(miqStaticAssets.app);
	    components_1.default(miqStaticAssets.app);
	    filters_1.default(miqStaticAssets.app);
	})(miqStaticAssets || (miqStaticAssets = {}));


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var endpointsService_1 = __webpack_require__(18);
	var toolbarSettingsService_1 = __webpack_require__(19);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.service('MiQEndpointsService', endpointsService_1.default);
	    module.service('MiQToolbarSettingsService', toolbarSettingsService_1.default);
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

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


/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	var ToolbarSettingsService = (function () {
	    /*@ngInject*/
	    ToolbarSettingsService.$inject = ["$http", "MiQEndpointsService"];
	    function ToolbarSettingsService($http, MiQEndpointsService) {
	        this.$http = $http;
	        this.MiQEndpointsService = MiQEndpointsService;
	        this.countSelected = 0;
	    }
	    /**
	     * Method which will travers trough all items and enables them by number of selected items.
	     * @param isClicked
	     */
	    ToolbarSettingsService.prototype.checkboxClicked = function (isClicked) {
	        var _this = this;
	        isClicked ? this.countSelected++ : this.countSelected--;
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
	        this.items = toolbarObject.filter(function (item) { return !!item; });
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
	        return this.httpGet(this.MiQEndpointsService.rootPoint + this.MiQEndpointsService.endpoints.toolbarSettings, getData).then(function (items) {
	            _this.items = items.filter(function (item) { return !!item; });
	            _this.dataViews = _this.filterViews();
	            return {
	                items: items,
	                dataViews: _this.dataViews
	            };
	        });
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


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var toolbar_menu_1 = __webpack_require__(21);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    toolbar_menu_1.default(module);
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var toolbarComponent_1 = __webpack_require__(22);
	var toolbarButtonDirective_1 = __webpack_require__(24);
	var toolbarListComponent_1 = __webpack_require__(26);
	var toolbarViewComponent_1 = __webpack_require__(28);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.component('miqToolbarMenu', new toolbarComponent_1.default);
	    module.component('miqToolbarList', new toolbarListComponent_1.default);
	    module.component('miqToolbarView', new toolbarViewComponent_1.default);
	    module.directive('miqToolbarButton', toolbarButtonDirective_1.default.Factory());
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var toolbarType_1 = __webpack_require__(32);
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
	            this.$window.location = item.redirectUrl;
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
	        return item.type && (ToolbarController.isButtonSelect(item) || ToolbarController.isButton(item) ||
	            ToolbarController.isButtonTwoState(item));
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
	        this.template = __webpack_require__(23);
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


/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "<div class=\"toolbar-pf-actions miq-toolbar-actions\">\n    <div class=\"form-group miq-toolbar-group\"\n         ng-repeat=\"toolbarItem in vm.toolbarItems\"\n         ng-if=\"vm.hasContent(toolbarItem)\">\n      <miq-toolbar-button ng-repeat=\"item in toolbarItem | filter: {type: vm.getButtonType()}:true\"\n                          toolbar-button=\"item\"\n                          on-item-click=\"vm.onItemClick(item, $event)\">\n      </miq-toolbar-button>\n      <miq-toolbar-button ng-repeat=\"item in toolbarItem | filterByStateAndView\"\n                          toolbar-button=\"item\"\n                          on-item-click=\"vm.onItemClick(item, $event)\">\n      </miq-toolbar-button>\n      <miq-toolbar-list ng-repeat=\"item in toolbarItem | filter: {type: vm.getToolbarListType()}\"\n                        toolbar-list=\"item\"\n                        on-item-click=\"vm.onItemClick(item, $event)\">\n      </miq-toolbar-list>\n      <div ng-repeat=\"item in toolbarItem | filter: {name: 'custom'}\"\n           ng-bind-html=\"vm.trustAsHtml(item.args.html)\"\n           class=\"miq-custom-html\"></div>\n    </div>\n    <miq-toolbar-view toolbar-views=\"vm.toolbarViews\"\n                      on-item-click=\"vm.onViewClick({item: item})\"\n                      class=\"miq-view-list\">\n    </miq-toolbar-view>\n</div>\n"

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

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
	        this.template = __webpack_require__(25);
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


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "<button title=\"{{toolbarButton.title}}\"\n        data-explorer=\"{{item.explorer}}\"\n        data-confirm-tb=\"{{item.confirm}}\"\n        id=\"{{toolbarButton.id}}\"\n        name=\"{{toolbarButton.name}}\"\n        type=\"button\"\n        class=\"btn btn-default\"\n        data-click=\"{{toolbarButton.id}}\"\n        data-url=\"{{toolbarButton.url}}\"\n        data-url_parms=\"{{toolbarButton.url_parms}}\"\n        ng-class=\"{active: toolbarButton.selected, disabled: !toolbarButton.enabled}\"\n        ng-hide=\"toolbarButton.hidden\"\n        ng-click=\"onItemClick({item: toolbarButton, $event: $event})\">\n  <i class=\"{{toolbarButton.icon}}\" style=\"\"></i>&nbsp;\n</button>\n"

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @memberof miqStaticAssets
	 * @ngdoc controller
	 * @name ToolbarListController
	 * @implements {IToolbarListBindings}
	 */
	var ToolbarListController = (function () {
	    function ToolbarListController() {
	    }
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
	        this.template = __webpack_require__(27);
	        this.controller = ToolbarListController;
	        this.controllerAs = 'vm';
	        this.bindings = {
	            toolbarList: '<',
	            onItemClick: '&'
	        };
	    }
	    return ToolbarList;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ToolbarList;


/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "<div class=\"btn-group\" dropdown>\n  <button type=\"button\" dropdown-toggle class=\"btn dropdown-toggle btn-default\"\n          ng-class=\"{disabled: !vm.toolbarList.enabled}\" title=\"{{vm.toolbarList.title}}\">\n    <i class=\"{{vm.toolbarList.icon}}\" style=\"margin-right: 5px;\" ng-if=\"vm.toolbarList.icon\"></i>\n    {{vm.toolbarList.text}}\n    <span class=\"caret\"></span>\n  </button>\n  <ul class=\"dropdown-menu\" role=\"menu\">\n    <li ng-repeat=\"item in vm.toolbarList.items track by $index\" ng-class=\"{disabled: !item.enabled}\">\n      <a ng-if=\"item.type !== 'separator'\"\n         href=\"\"\n         data-explorer=\"{{item.explorer}}\"\n         data-confirm-tb=\"{{item.confirm}}\"\n         ng-click=\"vm.onItemClick({item: item, $event: $event})\"\n         data-function=\"{{item.data.function}}\"\n         data-function-data=\"{{item.data['function-data']}}\"\n         data-target=\"{{item.data.target}}\"\n         data-toggle=\"{{item.data.toggle}}\"\n         data-click=\"{{item.id}}\"\n         name=\"{{item.id}}\"\n         id=\"{{item.id}}\"\n         data-url_parms=\"{{item.url_parms}}\"\n         data-url=\"{{item.url}}\">\n        <i ng-if=\"item.icon\" class=\"{{item.icon}}\"></i>\n        {{item.text}}\n      </a>\n      <div ng-if=\"item.type === 'separator'\" class=\"divider \" role=\"presentation\"></div>\n    </li>\n    <!---->\n  </ul>\n</div>\n"

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

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
	        this.template = __webpack_require__(29);
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


/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "<div class=\"toolbar-pf-view-selector form-group\">\n  <ul class=\"list-inline\">\n    <li ng-repeat=\"item in vm.toolbarViews\" ng-class=\"{active: item.selected}\">\n      <a href=\"javascript:void(0)\"\n         title=\"{{item.title}}\"\n         id=\"{{item.id}}\"\n         data-url=\"{{item.url}}\"\n         data-url_parms=\"{{item.url_parms}}\"\n         ng-click=\"vm.onItemClick({item: item})\"\n         name=\"{{item.name}}\">\n        <i class=\"{{item.icon}}\" style=\"\"></i>\n      </a>\n    </li>\n  </ul>\n</div>\n"

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var stateAndView_1 = __webpack_require__(31);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.filter('filterByStateAndView', stateAndView_1.default.filter);
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var toolbarType_1 = __webpack_require__(32);
	/**
	 * @memberof miqStaticAssets
	 * @ngdoc filter
	 * @name StateAndViewFilter
	 */
	var StateAndViewFilter = (function () {
	    function StateAndViewFilter() {
	    }
	    /**
	     * Filter items based on type and id. Type has to be {@link miqStaticAssets.ToolbarType.BUTTON_TWO_STATE} and id
	     * can't start with `view_`.
	     * @memberof StateAndView
	     * @function filter
	     * @returns {function(any): any}
	     */
	    StateAndViewFilter.filter = function () {
	        return function (toolbarItems) {
	            return toolbarItems.filter(function (toolbarItem) {
	                return toolbarItem.type === toolbarType_1.ToolbarType.BUTTON_TWO_STATE && toolbarItem.id.indexOf('view_') === -1;
	            });
	        };
	    };
	    return StateAndViewFilter;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = StateAndViewFilter;


/***/ },
/* 32 */
/***/ function(module, exports) {

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
	};


/***/ }
/******/ ]);
//# sourceMappingURL=ui-components.js.map