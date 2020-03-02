'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('./../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_URL = _config2.default.timetable_url;
var $ = null;

function Timetable() {
    this.course = '';
    this.sessions = [];
}

Timetable.prototype.findCourse = function (courseId) {
    var timetable = this;
    console.log("find course proto");

    _axios2.default.get(BASE_URL + 'list.html').then(function (response) {
        $ = _cheerio2.default.load(response.data);

        var courses = void 0;

        //list of courses is in a <nobr> tag with a child <a name='gA'/>
        //courses are <li> array
        $('nobr').each(function (i, element) {
            var a = $(element).find('a').attr('name');

            if (a == 'gA') {
                courses = $(element).children('li');

                return false;
            }
        });

        //loops through the courses list to find match for give courseId
        $(courses).each(function (i, element) {
            if ($(courses[i]).text() == '\n' + courseId + '\n') {
                console.log('found the course!!');
                timetable.course = courseId;

                //sends url of the table page for the courseId
                timetable.getTable($(courses[i]).children('a').attr('href'));

                return false;
            }
        });
    }).catch(function (error) {
        console.log(error);
    });
};

Timetable.prototype.getTable = function (tableUrl) {
    var _this = this;

    console.log(tableUrl);

    _axios2.default.get(BASE_URL + tableUrl).then(function (response) {
        $ = _cheerio2.default.load(response.data);

        //each day's sessions is on it's own <tr>
        //<th> contains the name of the day of the row
        //<td> contains individual lesson sessions
        var day = $('tr').each(function (i, element) {
            //skip the first row with time headings
            if (i != 0) {
                var dayText = $(element).find('th').text();

                var daySess = new IDaySession();
                daySess.setDay(dayText);

                var lessons = $(element).find('td');
                daySess.setVenueTime(lessons);
                //console.log(daySess)
                if (daySess.venue_time.length != 0) _this.sessions.push(daySess);
            }
        });
    });
};

function IDaySession() {
    this.day = '';
    this.venue_time = [];
}

IDaySession.prototype.setDay = function (dayText) {
    this.day = dayText.replace('\n', ''); //remove leading or trailing spaces
};

IDaySession.prototype.setVenueTime = function (lessons) {
    var _this2 = this;

    //each lesson has three <a> tags
    //the first <a> is blank [0]
    //the second <a> has 'type, time' [1]
    //the third <a> has venue [2]
    $(lessons).each(function (i, element) {
        var a = $(element).find('a');

        if ($(a).text() != '') {
            var venueTime = new IVenueTime();

            $(a).each(function (i, element) {
                if (i == 1) {
                    venueTime.setTime($(element).text().split(" ")[1]);
                } else if (i == 2) {
                    venueTime.setVenue($(element).text());
                }
            });

            _this2.venue_time.push(venueTime);
        }
    });
};

function IVenueTime() {
    this.venue = '';
    this.from = null;
    this.to = null;
}

IVenueTime.prototype.setTime = function (timeString) {

    var from = new SessionTime();
    from.setHoursMin(timeString.split('-')[0]);
    this.from = from;

    var to = new SessionTime();
    to.setHoursMin(timeString.split('-')[1]);
    this.to = to;
};

IVenueTime.prototype.setVenue = function (venue) {
    this.venue = venue;
};

//24hour time
function SessionTime() {
    this.hours = null;
    this.minutes = null;
}

SessionTime.prototype.setHoursMin = function (time) {
    this.hours = time.split(':')[0];
    this.minutes = time.split(':')[1];
};
exports.default = Timetable;