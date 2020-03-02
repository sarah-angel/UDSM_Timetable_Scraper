import express from 'express'
import courseCtrl from './../controllers/course.controller'

const router = express.Router()

router.route('/api')
    .get((req, res) => {
    console.log("kjkjk")
    res.send({message: "got it"})
    })

router.route('/api/course/:courseId')
    .post(courseCtrl.read)

router.param('courseId', courseCtrl.courseByID)

export default router