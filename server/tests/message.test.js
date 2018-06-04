const expect = require('expect');
const {generateMessage} = require('../utils/message');

describe('generateMessage', () => {
  it('should generate correct message', () => {
    let from = 'caspar@example.com';
    let text = 'Text message';

    let genMessage = generateMessage(from, text);

    expect(genMessage).toMatchObject({
      from,
      text
    })
    expect(typeof genMessage.createdAt).toBe('number');
  });
});
