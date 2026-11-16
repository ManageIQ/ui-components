import services from './services';
import components from './components';
import * as angular from 'angular';

export const app = angular.module('miqStaticAssets.dialogUser', []);
services(app);
components(app);
