var http = require('https'),
  querystring = require('querystring'),
	util = require('util');

var defaultHost = 'https://api.switchcoder.com';


var Client = module.exports.Client = function Client(apiToken, host, opts) {
	if (!(this instanceof Client)) {
		return new Client(apiToken, host, opts);
	}
	this.apiToken = apiToken;
	this.host = host;
	this.opts = opts;
	console.log("Creating SwitchCoder client")
}

Client.prototype.getPhoneNumber = function(num,opts){
	return new PhoneNumber(this, num, opts);
}

Client.prototype.getCode = function(id, phoneNumber, opts) {
	var script = new Code(id, phoneNumber, opts);
	script.client = this;
	return script;
}


var PhoneNumber = module.exports.PhoneNumber = function PhoneNumber(num, opts) {
	if (!(this instanceof PhoneNumber)) {
		return new PhoneNumber(num, opts)
	}
}


var Code = module.exports.Code = function Code(id, phoneNumber, opts) {
	if (!(this instanceof Code)) {
		return new Code(phoneNumber, opts)
	}
	this.id = id;
	this.phoneNumber = phoneNumber;
	this.opts = opts;
}

Code.prototype.invoke = function(method, parameters, body) {
	var queryString = querystring.stringify(parameters);

	var httpOptions = {
		host : this.client.host,
		port: 443,
		path: '/code/' + this.id + '/invoke?' + queryString,
		method: method,
		headers: {'Content-Type':'application/json', 'api_token':this.client.apiToken}		
	};
	
	
	var req = http.request(httpOptions, function(res){
		console.log('STATUS: ' + res.statusCode);
		res.on('data', function(chunk){
			console.log('BODY: ' + chunk)
		});
	});
	req.on('error', function(e) {
		console.log("Error with request: " + e.message);
	});
	
	req.end();
}


