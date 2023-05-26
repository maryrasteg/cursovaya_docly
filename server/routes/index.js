const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

const clientRouter = require('./clientRouter')
const doctorRouter = require('./doctorRouter')
const receptionRouter = require('./receptionRouter')
const userRouter = require('./userRouter')

router.use('/clients', checkRole('USER', 'ADMINISTRATOR'), clientRouter)
router.use('/user', userRouter)
router.use('/doctor', checkRole('USER', 'ADMINISTRATOR'), doctorRouter)
router.use('/receptions', checkRole('USER', 'ADMINISTRATOR'), receptionRouter)

module.exports = router