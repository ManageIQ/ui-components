"use strict";
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
    dialogs: '/dialog-user',
    treeView: '/tree-view',
    treeSelector: '/tree-selector',
    miqSelect: '/miq-select',
  },
  nodePackages: 'node_modules/',
  get stylesheetPath() {
    return this.stylesheetFolder + '/[name]' + '.css';
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
    return path.join(__dirname, this.distFolder);
  }
};
