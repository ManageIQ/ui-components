export function __(translateString) {
  if (window.hasOwnProperty('__')) {
    return window['__'](translateString);
  } else {
    return translateString;
  }
}
