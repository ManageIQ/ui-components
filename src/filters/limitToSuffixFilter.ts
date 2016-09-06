export default class LimitToSuffix {
  public static filter() {
    return (value, start, end) => {
      return value.length > start + end + 3 ? `${value.slice(0, start)}...${value.slice(-end)}` : value;
    };
  }
}
