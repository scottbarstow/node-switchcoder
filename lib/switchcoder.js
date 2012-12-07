var http = require('http'),
	util = require('util');

var defaultHost = 'https://api.switchcoder.com';


var Client = module.exports.Client = function Client(apiToken, host, opts) {
	if (!(this instanceof Client)) {
		return new Client(apiToken, host, opts);
	}
	console.log("Creating SwitchCoder client")
}

Client.prototype.getPhoneNumber = function(num,opts){
	return new PhoneNumber(this, num, opts);
}

Client.prototype.getScript = function(id, phoneNumber, opts) {
	return new Script(id, phoneNumber, opts)
}


var PhoneNumber = module.exports.PhoneNumber = function PhoneNumber(num, opts) {
	if (!(this instanceof PhoneNumber)) {
		return new PhoneNumber(num, opts)
	}
}

//util.inherits(PhoneNumber)


var Script = module.exports.Script = function Script(id, phoneNumber, opts) {
	if (!(this instanceof Script)) {
		return new Script(phoneNumber, opts)
	}
	this.scriptId = id;
	this.phoneNumber = phoneNumber;
	this.opts = opts;
}

//util.inherits(Script)

Script.prototype.invoke = function() {
	console.log("Called invoke on script : " + this.scriptId);
}


