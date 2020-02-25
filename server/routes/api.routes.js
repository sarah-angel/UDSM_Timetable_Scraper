import express from 'express'

const router = express.Router()

router.route('/api')
    .get((req, res) => {
    console.log("kjkjk")
    })

export default router