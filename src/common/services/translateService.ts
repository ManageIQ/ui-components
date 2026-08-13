export default class TranslateService {
  public static $inject = ['$window'];
  constructor(private $window: any) {}

  public translateString(stringToTranslate) {
    return this.$window.__(stringToTranslate);
  }
}
