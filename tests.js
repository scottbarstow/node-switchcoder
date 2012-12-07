var switchCoder = require('./index.js')

var client = new switchCoder.Client("123", "http://test.com");
client.getScript(123, new switchCoder.PhoneNumber("12345"), null).invoke();