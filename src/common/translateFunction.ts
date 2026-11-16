export function __(translateString: string) {
  if (Object.prototype.hasOwnProperty.call(window, '__')) {
    return (window as any)['__'](translateString);
  } else {
    return translateString;
  }
}
