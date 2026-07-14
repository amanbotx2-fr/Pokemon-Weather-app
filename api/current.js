const { proxyWeatherRequest } = require("../lib/weatherProxy");

module.exports = (req, res) => proxyWeatherRequest(req, res, "current");
