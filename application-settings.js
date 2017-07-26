"use strict";
module.exports = {
  stylesFolder: '/styles',
  sourceFolder: '/src',
  distFolder: '/dist',
  javascriptFolder: 'js',
  stylesheetFolder: 'css',
  appName: 'ui-components',
  modules: {
    toolbar: '/toolbar',
    common: '/common',
    dialogEditor: '/dialog-editor',
    gtl: '/gtl',
    siteSwitcher: '/site-switcher',
    fonticonPicker: '/fonticon-picker',
    dialogs: '/dialog-user'
  },
  nodePackages: 'node_modules/',
  get stylesheetPath() {
    return this.stylesheetFolder + '/[name]' + '.css';
  },
  get indexLocation() {
    return __dirname + '/demo/index.html';
  },
  isMinified: function (production) {
    return (!production ? '.js' : '.min.js');
  },
  get sassRootFolder() {
    return '.' + this.sourceFolder + this.stylesFolder;
  },
  get sassEntryPoint() {
    return this.sassRootFolder + '/' + this.appName + '.scss'
  },
  get tsEntryPoint() {
    return '.' + this.sourceFolder + '/index.ts'
  },
  get tsModules() {
    let availableObjects = [];
    Object.keys(this.modules).forEach(key => {
      availableObjects.push('.' + this.sourceFolder + this.modules[key]);
    });
    return availableObjects;
  },
  get outputFolder() {
    return __dirname + this.distFolder
  }
};
