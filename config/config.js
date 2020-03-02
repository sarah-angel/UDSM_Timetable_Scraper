import dotenv from 'dotenv'

dotenv.config()

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    timetable_url: process.env.TIMETABLE_URL || 'http://timetable.udsm.ac.tz/'
}

export default config
