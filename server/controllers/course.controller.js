import Timetable from './../models/timetable.model'

const courseByID = async (req, res, next, id) => {

    var timetable = new Timetable()

    let promise = new Promise((resolve, reject) => {
        timetable.findCourse(id)
        
        //UDSM website takes long to respond
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

const read = async (req, res) => {

    return res.json(req.timetable)
}



export default {read, courseByID}