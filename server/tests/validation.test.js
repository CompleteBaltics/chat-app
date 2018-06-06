const expect = require('expect');
const {isRealString} = require('../utils/validation');

describe('validation for string', () => {
  it('should reject non-standard string', () => {
    let tst = 10;

    expect(isRealString(tst)).toBe(false);
  });

  it('should reject string with only spaves', () => {
    let tst = '      ';

    expect(isRealString(tst)).toBe(false);
  });

  it('should reject non-standard string', () => {
    let tst = 'This+is+a+test';

    expect(isRealString(tst)).toBe(true);
  });
});
