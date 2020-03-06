import express from 'express'
import courseCtrl from './../controllers/course.controller'

const router = express.Router()

router.route('/api/course/:courseId')
    .get(courseCtrl.read)

router.param('courseId', courseCtrl.courseByID)

export default router