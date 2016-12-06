import SiteSwitcher from './siteSwitcherComponent';

describe('SiteSwitcher test', () => {
  let bindings;

  let sites = [{
    title: 'Launch Operations UI',
    tooltip: 'Launch Operations UI',
    iconClass: 'fa-cogs',
    url: 'http://www.google.com'
  }, {
    title: 'Launch Service UI',
    tooltip: 'Launch Service UI',
    iconClass: 'fa-cog',
    url: 'http://www.cnn.com'
  }, {
    title: 'Home',
    tooltip: 'Home',
    iconClass: 'fa-home',
    url: 'http://www.redhat.com'
  }];

  describe('component', () => {
    let scope, compile, compiledElement;
    beforeEach(() => {
      angular.mock.module('miqStaticAssets.siteSwitcher');
      angular.mock.inject(($rootScope, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });

      scope.sites = sites;
      compiledElement = compile(
        angular.element(
          `<miq-site-switcher site="sites">
              </miq-site-switcher>`
        ))(scope);
      scope.$digest();
    });

    it('creates site switcher with embedded hrefs', () => {
      let header = compiledElement[0].querySelector('.miq-siteswitcher');
      expect(header).toBeDefined();
      expect(header.querySelectorAll('.miq-siteswitcher-icon').length).toBe(1);
    });
  });
});
