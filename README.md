# Angular UI Components for ManageIQ

[![score](https://www.bithound.io/github/ManageIQ/ui-components/badges/score.svg)](https://www.bithound.io/github/ManageIQ/ui-components)
[![dependencies](https://www.bithound.io/github/ManageIQ/ui-components/badges/dependencies.svg)](https://www.bithound.io/github/ManageIQ/ui-components/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/ManageIQ/ui-components/badges/devDependencies.svg)](https://www.bithound.io/github/ManageIQ/ui-components/master/dependencies/npm)
[![Known Vulnerabilities](https://snyk.io/test/github/mtho11/ui-components/badge.svg)](https://snyk.io/test/github/mtho11/ui-components)
[![Build Status](https://travis-ci.org/ManageIQ/ui-components.svg?branch=master)](https://travis-ci.com/github/ManageIQ/ui-components)
[![Coverage Status](https://coveralls.io/repos/github/ManageIQ/ui-components/badge.svg)](https://coveralls.io/github/ManageIQ/ui-components)

[![Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ManageIQ/manageiq/ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Purpose

The purpose of this repository is to provide reusable components for the [ManageIQ](http:github.com/manageiq/manageiq)
project. These are not general purpose components, but specific to ManageIQ, however, reusable across all of
ManageIQ (providers). The intention is to provide components that are reusable in various ways. Many of these components
are 'Smart Components' that know how to communicate to backend endpoints(data-driven by provider) and retrieve relevant data for
the component's configuration.

As we achieve greater reuse, the idea is to move more and more components to this repository. Creating a repository for
*smart* reusable components (specific to a domain) across providers.

## Architectural Goals

* Separate git repository from ManageIQ
* Components communicate via REST with ManageIQ API
* Maintain routing inside ManageIQ (routes.rb)

## Technologies

* Angular 1.5+ (soon to be Angular 2.x)
* Typescript
* Webpack
* Yarn

## Architecture

![ManageIQ UI Components Architecture](MiQ-UI-Architecture.jpg)

## Angular 1.5 Components

We are recommending [Angular 1.5 Components](https://docs.angularjs.org/guide/component) instead of Angular Directives
for better compatibility and easier upgrade to Angular 2.0.

For a great overview of using Angular 1.5.x Components please see: [NG-Conf 2016: Components, Components, Components!...and Angular 1.5 - Pete Bacon Darwin](https://www.youtube.com/watch?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j&v=AMwjDibFxno&ab_channel=ng-conf)


## Development Environment

You need to have installed [Node.js >= 16  and npm >= 8](https://docs.npmjs.com/getting-started/installing-node) on your system.
It is recommended to use a node version manager such as [n](https://www.npmjs.com/package/n). If you have node installed then it is
just `yarn global add n` and then `n lts` to use the latest LTS version of node (see the docs for switching versions).

Install these node packages globally in the system
```
npm install -g yarn
yarn global add webpack wiredep-cli typescript typescript-formatter
```

After [yarn](http://yarn.io) is installed, it is pretty much a replacement for npm, with faster, more dependable  builds
but still utilizing the npm packages.

See comparison: [npm vs. yarn commands](https://yarnpkg.com/en/docs/migrating-from-npm)

Install local node dependencies
```
yarn
```

Create library dependencies (run this every time you make any changes to `vendor.ts`) - no need to worry about any TS
errors. Also, if you are pushing some changes please run this command so you will push minifed version of JS and CSS.
```
yarn run build
```

To run:
```
yarn start
```

To run tests:
```
yarn
yarn run build-dev
yarn run test
```

Before submitting code, run the following command to format the code according to the tslint rules:
```
tsmft -r
```

This formats the code according to the tslint rules.

#### Documentation

If you want to see documentation for each component, controller, filter, etc. run
```
yarn run-script build-docs
```
This will generate docs from JS docs and after running `yarn start` this documentation will be available on `localhost:4000/docs`

If you want to release ui-components look at documentation in Wiki of this repository.

#### ManageIQ version mapping

1.4 - master/K-release
1.3 - jansa
1.2 - ivanchuk  
1.1 - hammer  
1.0 - gaprindashvili
