import * as numeral from 'numeral';

export default class AbbrNumber {
  public static filter() {
    return (value) => {
      let num = numeral(value);
      // Return with the input if it is not a number
      if (!num.value() || num.value().toString() !== value.toString()) {
        return value;
      }

      let abbr = num.format('0.0a');

      if (abbr.match(/\d\.0[a-z]?$/) || abbr.length > 5) {
        // Drop the .0 as we want to save the space
        abbr = num.format('0a');
      }

      return abbr.toUpperCase();
    };
  }
}
