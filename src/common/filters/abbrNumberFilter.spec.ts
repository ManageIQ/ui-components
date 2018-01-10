import AbbrNumber from './abbrNumberFilter';

describe('Filter: abbrNumber', function() {
  let filter = AbbrNumber.filter();

  it('abbreviates numbers', function() {
    expect(filter('4')).toBe('4');
    expect(filter('42')).toBe('42');
    expect(filter('420')).toBe('420');
    expect(filter('4200')).toBe('4.2K');
  });

  it('returns with the same text', function() {
    expect(filter('text')).toBe('text');
    expect(filter('123text')).toBe('123text');
  })
});