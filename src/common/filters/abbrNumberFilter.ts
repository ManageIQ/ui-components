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
      // Drop the .0 as we want to save the space
      return (abbr.match(/\d\.0[a-z]?$/) ? num.format('0a') : abbr).toUpperCase();
    };
  }
}
