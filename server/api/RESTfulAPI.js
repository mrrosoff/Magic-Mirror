
const login = require("./garage/login");
const garage = require("./garage/garage");
const weather = require("./garage/weather");

module.exports = [...login, ...garage, ...weather];
