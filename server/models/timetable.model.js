import cheerio from 'cheerio'
import axios from 'axios'
import config from './../../config/config'

const BASE_URL = config.timetable_url
var $ = null

function Timetable() {
    this.course = ''
    this.sessions = []
}

Timetable.prototype.findCourse = function (courseId) {
    var timetable = this
    console.log("find course proto")

    axios.get(BASE_URL + 'list.html').then((response) => {
        $ = cheerio.load(response.data)
        
        let courses;

        //list of courses is in a <nobr> tag with a child <a name='gA'/>
        //courses are <li> array
        $('nobr').each( (i, element) => {
            let a = $(element).find('a').attr('name')

            if ( a == 'gA' ){
                courses = $(element).children('li')
                
                return false
            }
        })

        //loops through the courses list to find match for give courseId
        $(courses).each( (i, element) => {
            if ( $(courses[i]).text() == '\n' + courseId + '\n'){
                console.log('found the course!!')
                timetable.course = courseId

                //sends url of the table page for the courseId
                timetable.getTable($(courses[i]).children('a').attr('href'))

                return false
            }
        })


    }).catch((error) => {
        console.log(error)
    })
}

Timetable.prototype.getTable = function (tableUrl) {
    console.log(tableUrl)

    axios.get(BASE_URL + tableUrl).then((response) => {
        $ = cheerio.load(response.data)

        //each day's sessions is on it's own <tr>
        //<th> contains the name of the day of the row
        //<td> contains individual lesson sessions
        var day = $('tr').each( (i, element) => {
            //skip the first row with time headings
            if( i != 0 ){
                let dayText = $(element).find('th').text()
                
                var daySess = new IDaySession()
                daySess.setDay(dayText)

                var lessons = $(element).find('td')
                daySess.setVenueTime(lessons)
                //console.log(daySess)
                if(daySess.venue_time.length != 0 )
                    this.sessions.push(daySess)
            }
        })
    })
}

function IDaySession() {
    this.day = ''
    this.venue_time = []
}

IDaySession.prototype.setDay = function(dayText) {
    this.day = dayText.replace('\n', '') //remove leading or trailing spaces
}

IDaySession.prototype.setVenueTime = function(lessons) {
    //each lesson has three <a> tags
    //the first <a> is blank [0]
    //the second <a> has 'type, time' [1]
    //the third <a> has venue [2]
    $(lessons).each( (i, element) => {
        var a = $(element).find('a')
        
        if ($(a).text() != ''){
            var venueTime = new IVenueTime()

            $(a).each( (i, element) => {
                if ( i == 1 ){
                    venueTime.setTime($(element).text().split(" ")[1])
                }
                else if ( i == 2 ){
                    venueTime.setVenue($(element).text())
                }
            })

            this.venue_time.push(venueTime)

        }
    })
}

function IVenueTime() {
    this.venue = ''
    this.from = null
    this.to = null
}

IVenueTime.prototype.setTime = function(timeString){

    var from = new SessionTime()
    from.setHoursMin(timeString.split('-')[0])
    this.from = from

    var to = new SessionTime()
    to.setHoursMin(timeString.split('-')[1])
    this.to = to

}

IVenueTime.prototype.setVenue = function(venue){
    this.venue = venue
}

//24hour time
function SessionTime() {
    this.hours = null
    this.minutes = null
}

SessionTime.prototype.setHoursMin = function(time){
    this.hours = time.split(':')[0]
    this.minutes = time.split(':')[1]
}
export default Timetable