export default class AdjustColor {
  public static filter() {
    return (value, enabled) => {
      // Don't touch the color if it's enabled or unset
      if (enabled || !value) {
        return value;
      } else {
        const r = parseInt(value.substring(1,3), 16);
        const g = parseInt(value.substring(3,5), 16);
        const b = parseInt(value.substring(5,7), 16);

        return `rgba(${r}, ${g}, ${b}, 0.5)`;
      }
    };
  }
}
