'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _timetable = require('./../models/timetable.model');

var _timetable2 = _interopRequireDefault(_timetable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var courseByID = async function courseByID(req, res, next, id) {

    var timetable = new _timetable2.default();

    var promise = new Promise(function (resolve, reject) {
        timetable.findCourse(id);

        //UDSM website takes long to respond
        setTimeout(function () {
            resolve();
        }, 5000);
    });
    promise.then(function () {
        var t = JSON.stringify(timetable);
        var newT = JSON.parse(t);
        req.timetable = newT;
        next();
    }).catch(function (error) {
        console.log(error);
    });
};

var read = async function read(req, res) {

    return res.json(req.timetable);
};

exports.default = { read: read, courseByID: courseByID };