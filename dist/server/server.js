'use strict';

var _config = require('./../config/config');

var _config2 = _interopRequireDefault(_config);

var _express = require('./express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_express2.default.listen(_config2.default.port, function (err) {
    if (err) {
        console.log(err);
    }
    console.info('Server started on port ' + _config2.default.port);
});