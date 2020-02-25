const cheerio = require('cheerio');
const request = require('request');
const axios = require('axios')

const BASE_URL = 'http://timetable.udsm.ac.tz/'



request({
    method: 'GET',
    url: BASE_URL + 'list.html'
}, (err, res, body) => {
    if (err) 
        return console.error(err);
    
    
    let $ = cheerio.load(body);

    let courses;
    
    $('nobr').each( (i, e) => {
        let a = $(e).find('a').attr('name')
        
        if ( a == 'gA' )
            courses = $(e).children('li')
           // console.log(a)
        //courses[i] = $(this).text();
    });

    $(courses).each( (i, el) => {
        if ( $(courses[i]).text() == '\nCS335\n')
            getTable($(courses[i]).children('a').attr('href'))    
        //console.log( $(courses[i]).children('a').attr('href'))
    })
})




//input: url to the specific course timetable
function getTable(tableUrl){
    axios.get(BASE_URL + tableUrl).then((response) => {
        let $ = cheerio.load(response.data)

        json = {
            MON: null,
            TUE: null,
            WED: null,
            THUR: null,
            FRI: null
        }
        
        day = $('tr').each( (i, element) => {
            //skip the first row with time headings
            if (i != 0){
                console.log($(element).find('th').text())
                lessons = $(element).find('td')//.text()

                lessonDetailList = getLessonDetails(lessons, $)

                // $(lesson[0]).map( part => {
                //     console.log($(part).text())
                // })

                console.log(lessonDetailList);
                
            }
                
        })

    })
}

//input: list of lessons in a day
function getLessonDetails(lessons, $){
    lessonDetailList = []    
    console.log(lessons.length);

    //either get list of <a> for all lessons in the day
    //or get list of 3 <a> for each lesson and loop through lessons??
    
    $(lessons).each( (i, element) => {
        x = $(element).find('a')

        //the first <a> in every lesson is blank
        //second <a> has lesson 'type, time'
        //third <a> has lesson venue
        //skip the first <a> out of 3

        lesson = {
            time: '',
            venue: ''
        }
        $(x).each((i, element) => {
            if ( i == 1 ){
                lesson.time = $(element).text().split(" ")[1]
            }
            else if ( i == 2) {
                lesson.venue = $(element).text()
            } 
        })

        if(lesson.time != '' )
            lessonDetailList.push(lesson)
    })

    return lessonDetailList
}

    

    

//getTable('resource/g8397.html');