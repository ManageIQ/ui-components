# Angular UI Components for ManageIQ

[![score](https://www.bithound.io/github/ManageIQ/ui-components/badges/score.svg)](https://www.bithound.io/github/ManageIQ/ui-components)
[![dependencies](https://www.bithound.io/github/ManageIQ/ui-components/badges/dependencies.svg)](https://www.bithound.io/github/ManageIQ/ui-components/master/dependencies/npm)
[![Build Status](https://travis-ci.org/ManageIQ/ui-components.svg)](https://travis-ci.org/ManageIQ/ui-components)


## Architectural Goals

   * Separate git repository from ManageIQ
   * Components communicate via REST with ManageIQ API
   * Maintain routing inside ManageIQ (routes.rb)


## Architecture

![ManageIQ UI Components Architecture](MiQ-UI-Architecture.jpg)

## Angular 1.5 Components

We are recommending [Angular 1.5 Components](https://docs.angularjs.org/guide/component) instead of Angular Directives
for better compatibility and easier upgrade to Angular 2.0.

For a great overview of using Angular 1.5.x Components please see: [NG-Conf 2016: Components, Components, Components!...and Angular 1.5 - Pete Bacon Darwin](https://www.youtube.com/watch?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j&v=AMwjDibFxno&ab_channel=ng-conf)


## Development Environment

You need to have installed [Node.js >= 6  and npm >= 3](https://docs.npmjs.com/getting-started/installing-node) on your system.

Install these node packages globally in the system
```
npm install -g typings bower webpack wiredep-cli typescript typescript-formatter
```

Install local node dependencies
```
npm install
```

To run:
```
npm start
```

To run tests:
```
npm t
```

Before submitting code, run the following command to format the code according to the tslint rules:
```
tsmft -r
```

This formats the code according to the tslint rules.

#### Documentation

If you want to see documentation for each component, controller, filter, etc. run
```
npm run-script build-docs
```
This will generate docs from JS docs and after running `npm start` this documentation will be available on `localhost:4000/docs`
