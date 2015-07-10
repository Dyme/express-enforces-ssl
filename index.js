"use strict";

module.exports = function enforceHTTPS() {

	return function(req, res, next) {
		var isHttps = req.secure;
		var isTwilio = req._parsedUrl.pathname.indexOf('dyme-twiml') > 0 ;

		if(isHttps || isTwilio){
			next();
		} else {
			redirectUrl(req, res);
		}
	}
};

var redirectUrl = function (req, res) {
	if (req.method === "GET") {
		res.redirect(301, "https://" + req.headers.host + req.originalUrl);
	} else {
		res.status(403).send("Please use HTTPS when submitting data to this server.");
	}
};
