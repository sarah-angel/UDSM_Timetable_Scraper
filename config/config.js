import dotenv from 'dotenv'

dotenv.config()

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    timetable_url: process.env.TIMETABLE_URL || 'http://timetable.udsm.ac.tz/',
    course_list_path: process.env.COURSE_LIST_PATH || 'list.html'
}

export default config
