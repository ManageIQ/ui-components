describe('limitToSuffix tests', () =>  {
  let longText, shortText;
  const start = 5, end = 5;
  beforeEach(() => {
    angular.mock.module('miqStaticAssets.gtl');
    longText = 'someLongTextWithSomeTextToBeLonger';
    shortText = 'short';
  });

  it('should strip long text based on start and end',
    inject((limitToSuffixFilter) => {
      expect(limitToSuffixFilter(longText, start, end).length).toBe(start + end + 3);
    })
  );

  it('should NOT strip short text based on start and end',
    inject((limitToSuffixFilter) => {
      expect(limitToSuffixFilter(shortText, start, end).length).toBe(shortText.length);
    })
  );
});
