# Angular UI Components for ManageIQ

[![CI](https://github.com/ManageIQ/ui-components/actions/workflows/ci.yaml/badge.svg?branch=master)](https://github.com/ManageIQ/ui-components/actions/workflows/ci.yaml)
[![Coverage Status](https://coveralls.io/repos/github/ManageIQ/ui-components/badge.svg)](https://coveralls.io/github/ManageIQ/ui-components)
[![Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ManageIQ/manageiq/ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![score](https://www.bithound.io/github/ManageIQ/ui-components/badges/score.svg)](https://www.bithound.io/github/ManageIQ/ui-components)
[![dependencies](https://www.bithound.io/github/ManageIQ/ui-components/badges/dependencies.svg)](https://www.bithound.io/github/ManageIQ/ui-components/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/ManageIQ/ui-components/badges/devDependencies.svg)](https://www.bithound.io/github/ManageIQ/ui-components/master/dependencies/npm)
[![Known Vulnerabilities](https://snyk.io/test/github/mtho11/ui-components/badge.svg)](https://snyk.io/test/github/mtho11/ui-components)

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

* Angular 1.8.3
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

You need to have installed [Node.js >= 20 and npm >= 9](https://docs.npmjs.com/getting-started/installing-node) on your system.
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
errors. Also, if you are pushing some changes please run this command so you will push minified version of JS and CSS.
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
yarn build-docs
```
This will generate docs from JS docs and after running `yarn start` this documentation will be available on `localhost:4000/docs`

#### Building a release

In order to build a release you must first update the version number in the `package.json`.
Once you have done that you can run `bin/build` which will run a docker container to execute the build, copy the .tgz file, and optionally publish to npm.

```
$ bin/build
STEP 1/8: FROM python:2.7-buster
STEP 2/8: ENV NVM_DIR /usr/local/nvm
--> e0e3eb98af68
STEP 3/8: RUN mkdir -p $NVM_DIR
--> 6980bbe41ba8
...
yarn pack v1.22.22
success Wrote tarball to "/ui-components/manageiq-ui-components-v1.6.1.tgz".
Done in 0.20s.
COMMIT docker.io/manageiq/ui-components:latest
Successfully tagged docker.io/manageiq/ui-components:latest

Package 'pkg/manageiq-ui-components-v1.6.1.tgz' has been built.

Publish the package now? (y/N)
```

#### ManageIQ version mapping

1.6 - master, radjabov, spassky
1.5 - petrosian, quinteros
1.4 - kasparov, lasker, morphy, najdorf, oparin
1.3 - jansa
1.2 - ivanchuk
1.1 - hammer
1.0 - gaprindashvili
