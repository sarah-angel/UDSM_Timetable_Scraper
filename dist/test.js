'use strict';

var url = "http://localhost:3001";

function getTimetable() {

    courseId = document.getElementById('courseId').value;

    axios.get(url + '/api/course/' + courseId).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}