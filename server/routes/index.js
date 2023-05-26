const Router = require('express')
const router = new Router()

const clientRouter = require('./clientRouter')
const doctorRouter = require('./doctorRouter')
const receptionRouter = require('./receptionRouter')
const userRouter = require('./userRouter')

router.use('/clients', clientRouter)
router.use('/user', userRouter)
router.use('/doctor', doctorRouter)
router.use('/receptions', receptionRouter)

module.exports = router