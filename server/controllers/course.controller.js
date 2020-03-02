import Timetable from './../models/timetable.model'

const courseByID = async (req, res, next, id) => {
    console.log(id)

    var timetable = new Timetable()

    let promise = new Promise((resolve, reject) => {
        timetable.findCourse(id)
        
        setTimeout( () => {
            resolve()
        }, 5000)
    })
    promise.then( () => {
        var t = JSON.stringify(timetable)
        var newT = JSON.parse(t)
        req.timetable = newT
        next()
    }).catch((error) => {
        console.log(error)
    })

    
}

const read = (req, res) => {
    console.log(req.timetable)

    return res.json(req.timetable)
    //console.log(req.timetable.sessions[0].venue_time[0].from.hours)

}



export default {read, courseByID}