'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _course = require('./../controllers/course.controller');

var _course2 = _interopRequireDefault(_course);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/api').get(function (req, res) {
    console.log("kjkjk");
    res.send({ message: "got it" });
});

router.route('/api/course/:courseId').post(_course2.default.read);

router.param('courseId', _course2.default.courseByID);

exports.default = router;