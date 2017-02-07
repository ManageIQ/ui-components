export default class TranslateService {
  /*@ngInject*/
  constructor(private $window: any) {}

  public translateString(stringToTranslate) {
    return this.$window.__(stringToTranslate);
  }
}
