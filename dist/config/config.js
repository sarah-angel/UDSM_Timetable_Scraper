'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    timetable_url: process.env.TIMETABLE_URL || 'http://timetable.udsm.ac.tz/',
    course_list_path: process.env.COURSE_LIST_PATH || 'list.html'
};

exports.default = config;