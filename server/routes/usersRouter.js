const Router = require('express')
const router = new Router()
const usersController = require('../controllers/usersController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', usersController.registration)
router.post('/login', usersController.login)
router.get('/auth', authMiddleware, usersController.check)
router.get('/list', checkRole('ADMINISTRATOR'), usersController.list)
router.put('/edit', checkRole('ADMINISTRATOR'), usersController.update)

module.exports = router