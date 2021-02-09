# Angular UI Components for ManageIQ

[![Build Status](https://travis-ci.com/ManageIQ/ui-components.svg?branch=master)](https://travis-ci.com/ManageIQ/ui-components)
[![Coverage Status](https://coveralls.io/repos/github/ManageIQ/ui-components/badge.svg)](https://coveralls.io/github/ManageIQ/ui-components)

[![Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ManageIQ/manageiq/ui)


## Purpose

NOTE: The ManageIQ UI is moving off Angular.js to React, as such, the role of this repository has shifted.
Components specific to just ui-classic have been moved to manageiq-ui-classic [ManageIQ/manageiq-ui-classic#6716](https://github.com/ManageIQ/manageiq-ui-classic/issues/6716)
What remains are components shared by manageiq-ui-classic and ui-service and release branches that can be used to release fixes for previous releases.


## Shared components:

* `dialog-user` - dialog runner; used by ui-classic and ui-service
* `miq-select` - fork of `pf-select`, wraps `bootstrap-select` jQuery plugin for angular; used by ui-classic, ui-service and dialog-user
* `miq-tree-selector` - selecting a method from an automate tree; used by ui-classic automate modal and dialog-user
* `miq-tree-view` - a tree component; used by ui-classic explorer trees and miq-tree-selector


## Technologies used

* Angular 1.5+
* Typescript
* Webpack
* Yarn


## Architecture

![ManageIQ UI Components Architecture](MiQ-UI-Architecture.jpg)


## Development Environment

You need [Node.js](https://docs.npmjs.com/getting-started/installing-node) and [Yarn](https://classic.yarnpkg.com/en/docs/install/).

Install local node dependencies, build them and the components.
```
yarn
yarn run build
```

To run demo:
```
yarn run build-dev
yarn run start
```

To run tests:
```
yarn run build-dev
yarn run test
```

To extract i18n strings for translation:

```
yarn run gettext:extract
```


#### Documentation

If you want to release ui-components, see [these](https://github.com/ManageIQ/ui-components/wiki) [two](https://github.com/ManageIQ/ui-components/wiki/Releasing-a-new-version) wiki articles.

There's also a `demo/` folder with runnable demos of each component.


#### ManageIQ version mapping

|@manageiq/ui-components version|ManageIQ release|
|-|-|
|1.5|master/lasker|
|1.4|kasparov
|1.3|jansa|
|1.2|ivanchuk|
|1.1|hammer|
|1.0|gaprindashvili|
