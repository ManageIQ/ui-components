import AdjustColor from './adjustColorFilter';

describe('Filter: adjustColor', function() {
  let filter = AdjustColor.filter();

  it('does not alter if enabled or undefined', function() {
    expect(filter(undefined, true)).toBe(undefined);
    expect(filter(undefined, false)).toBe(undefined);
    expect(filter('#123456', true)).toBe('#123456');
  });

  it('returns with an rgba call', function() {
    expect(filter('#123456', false)).toBe('rgba(18, 52, 86, 0.5)');
  });
});
