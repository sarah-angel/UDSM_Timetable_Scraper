"use strict";

var url = "http://localhost:3001";

function getApi() {

    axios.get(url + "/api").then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });

    console.log("bla");
}

function getTimetable() {
    courseId = 'CS335';

    courseId = document.getElementById('courseId').value;

    axios.post(url + '/api/course/' + courseId).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}