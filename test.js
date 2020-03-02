
const url = "http://localhost:3001"

function getApi() {

    axios.get(url + "/api")
    .then( (response) => {
        console.log(response)
    })
    .catch( (error) => {
        console.log(error)
    })


    console.log("bla")          
}

function getTimetable() {
    courseId = 'CS335'

    courseId = document.getElementById('courseId').value
    
    axios.post(url + '/api/course/' + courseId)
        .then( (response) => {
            console.log(response)
        })
        .catch( (error) => {
            console.log(error)
        })
}