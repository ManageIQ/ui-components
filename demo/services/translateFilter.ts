if (!window.__) {
  window.__ = (s) => s;
}

export default class TranslateFilter {
  public static filter() {
    return (value) => {
      return value;
    };
  }
}
