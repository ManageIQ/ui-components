module.exports = {
  stylesFolder: '/styles',
  sourceFolder: '/src',
  distFolder: '/dist',
  javascriptFolder: 'js',
  stylesheetFolder: 'css',
  appName: 'ui-components',
  bowerLibs: 'libs/',
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
  get sassEntryPoint() {
    return '.' + this.sourceFolder + this.stylesFolder + '/' + this.appName + '.scss'
  },
  get tsEntryPoint() {
    return '.' + this.sourceFolder + '/index.ts'
  },
  get outputFolder() {
    return __dirname + this.distFolder
  }
};
