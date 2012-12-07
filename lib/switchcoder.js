var http = require('http');
var defaultHost = 'https://api.switchcoder.com';

function Client(apiToken, host, opts )
{
	if(!(this instanceof Client)){
		return new Client(apiToken, host, opts);
	}
}

module.exports = Client;

Client.prototype.getPhoneNumber(num, opts)
{
	return new PhoneNumber(this, num, opts);
}

