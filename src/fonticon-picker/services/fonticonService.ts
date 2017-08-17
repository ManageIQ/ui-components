import * as _ from 'lodash';

export default class FonticonService {
  public fetch(families: any): any {
    return _.reduce(families, (result: any, value: any) => {
      result[value.selector] = FonticonService.filterRules(value.selector);
      return result;
    }, {});
  }

  private static filterRules(family: string): any[] {
    return _.chain(document.styleSheets)
      .map((oneSheet: any) => oneSheet.cssRules)
      .map((rule: any) => _.filter(rule, value => FonticonService.isFontIcon(value, family)))
      .filter((rules: any) => rules.length !== 0)
      .map((rules: any[]) => _.map(rules, (value: any) => FonticonService.clearRule(value.selectorText, family)))
      .flatten()
      .reduce((result: any[], value: string) => [...result, FonticonService.makeRuleObject(family, value)], [])
      .value();
  }

  private static isFontIcon(value, family): boolean {
    return value.selectorText && value.selectorText.indexOf(family) === 1 && value.cssText.indexOf('content:') !== -1;
  }

  private static clearRule(rule: string, family: string): string {
    let re = new RegExp(`.*(${family}\-[a-z0-9\-\_]+).*`);
    return rule.replace(re, '$1');
  }

  private static makeRuleObject(family, value): any {
    return {
      'class': `${family} ${value}`,
      'selector': `.${family}.${value}`
    };
  }
}
