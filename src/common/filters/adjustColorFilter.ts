export default class AdjustColor {
  public static filter() {
    return (value, enabled) => {
      // Don't touch the color if it's enabled or unset
      if (enabled || !value) {
        return value;
      } else {
        let r = parseInt(value.substring(1,3), 16);
        let g = parseInt(value.substring(3,5), 16);
        let b = parseInt(value.substring(5,7), 16);

        return `rgba(${r}, ${g}, ${b}, 0.5)`;
      }
    };
  }
}
