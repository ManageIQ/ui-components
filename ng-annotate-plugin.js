'use strict';
/* eslint-env node */
// Minimal webpack 5 plugin that runs ng-annotate over emitted JS assets.
// Replaces the abandoned ng-annotate-webpack-plugin which used the webpack 3 API.
const ngAnnotate = require('ng-annotate');
const { RawSource } = require('webpack').sources;

class NgAnnotatePlugin {
  constructor(options) {
    this.options = Object.assign({ add: true }, options);
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('NgAnnotatePlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'NgAnnotatePlugin',
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
        },
        (assets) => {
          for (const filename of Object.keys(assets)) {
            if (! filename.endsWith('.js')) {
              continue;
            }
            const source = assets[filename].source();
            const result = ngAnnotate(source, this.options);
            if (! result.errors) {
              compilation.updateAsset(filename, new RawSource(result.src));
            }
          }
        }
      );
    });
  }
}

module.exports = NgAnnotatePlugin;
