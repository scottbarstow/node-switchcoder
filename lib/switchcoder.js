var http = require('https'),
  querystring = require('querystring'),
	util = require('util');

var defaultHost = 'api.switchcoder.com';


var Client = module.exports.Client = function Client(apiToken, host, opts) {
	if (!(this instanceof Client)) {
		return new Client(apiToken, host, opts);
	}
	this.apiToken = apiToken;
	this.host = host || defaultHost;
	this.opts = opts;
	console.log("Creating SwitchCoder client")
}

Client.prototype.getPhoneNumber = function(num,opts){
	return new PhoneNumber(num, opts);
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
	this.number = num;
	this.opts = opts;
}


var Code = module.exports.Code = function Code(id, phoneNumber, opts) {
	if (!(this instanceof Code)) {
		return new Code(phoneNumber, opts)
	}
	this.id = id;
	this.phoneNumber = phoneNumber;
	this.opts = opts;
}

Code.prototype.invoke = function(queryParameters, body, callback) {
	var queryParameters = queryParameters || {},
		body = body || "",
		callback = callback || function(){};
	
	//handle if just invoking the code without parameters or body
	if(typeof arguments[0] === 'function' && arguments.length === 1 ){
		callback = arguments[0];
		body = "";
		queryParameters = {};
	}
	
	var contentLength = body.length || 0;
	var queryString = querystring.stringify(queryParameters);

	var headers = {'Content-Type':'application/json', 'Content-Length':contentLength, 'api_token':this.client.apiToken}

	if(this.phoneNumber !== undefined){
		headers["phoneNumber"] = this.phoneNumber.number;
	}	

	var response = new Object();
	var httpOptions = {
		host : this.client.host,
		port: 443,
		path: '/code/' + this.id + '/invoke?' + queryString,
		method: "POST",
		headers: headers
	};
	
	var req = http.request(httpOptions, function(res){
		response.statusCode = res.statusCode;
		res.on('data', function(chunk){
			response.data = chunk
			callback(null, response);
		});
	});
	req.on('error', function(e) {
		callback(e)
	});
	
  if(contentLength > 0)
  {
 		req.write(JSON.stringify(body));
  }
	req.end();
}


