'use strict';
/* eslint-env node */
const path = require('path');

module.exports = {
  stylesFolder: '/styles',
  sourceFolder: '/src',
  distFolder: '/dist',
  javascriptFolder: 'js',
  stylesheetFolder: 'css',
  appName: 'ui-components',
  modules: {
    common: '/common',
    dialogEditor: '/dialog-editor',
    fonticonPicker: '/fonticon-picker',
    dialogs: '/dialog-user',
    treeView: '/tree-view',
    treeSelector: '/tree-selector',
    miqSelect: '/miq-select',
  },
  nodePackages: 'node_modules/',
  get stylesheetPath() {
    return this.stylesheetFolder + '/[name]' + '.css';
  },
  get indexLocation() {
    return path.join(__dirname, '/demo/index.html');
  },
  isMinified: function(production) {
    return (! production ? '.js' : '.min.js');
  },
  get sassRootFolder() {
    return '.' + this.sourceFolder + this.stylesFolder;
  },
  get sassEntryPoint() {
    return this.sassRootFolder + '/' + this.appName + '.scss';
  },
  get tsEntryPoint() {
    return '.' + this.sourceFolder + '/index.ts';
  },
  get tsModules() {
    const availableObjects = [];
    Object.keys(this.modules).forEach(key => {
      availableObjects.push('.' + this.sourceFolder + this.modules[key]);
    });
    return availableObjects;
  },
  get outputFolder() {
    return path.join(__dirname, this.distFolder);
  },
};
