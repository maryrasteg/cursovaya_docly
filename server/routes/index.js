const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

const clientsRouter = require('./clientsRouter')
const doctorsRouter = require('./doctorsRouter')
const receptionsRouter = require('./receptionsRouter')
const usersRouter = require('./usersRouter')
const proceduresRouter = require('./proceduresRouter')

router.use('/clients', checkRole('USER', 'ADMINISTRATOR'), clientsRouter)
router.use('/user', usersRouter)
router.use('/doctors', checkRole('USER', 'ADMINISTRATOR'), doctorsRouter)
router.use('/receptions', checkRole('USER', 'ADMINISTRATOR'), receptionsRouter)
router.use('/procedures', checkRole('ADMINISTRATOR'), proceduresRouter)

module.exports = router