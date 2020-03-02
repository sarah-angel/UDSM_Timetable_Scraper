'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _timetable = require('./../models/timetable.model');

var _timetable2 = _interopRequireDefault(_timetable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var courseByID = async function courseByID(req, res, next, id) {
    console.log(id);

    var timetable = new _timetable2.default();

    var promise = new Promise(function (resolve, reject) {
        timetable.findCourse(id);

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

var read = function read(req, res) {
    console.log(req.timetable);

    return res.json(req.timetable);
    //console.log(req.timetable.sessions[0].venue_time[0].from.hours)
};

exports.default = { read: read, courseByID: courseByID };