const Router = require('express')
const router = new Router()
const doctorController = require('../controllers/doctorController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/add', checkRole('ADMINISTRATOR'), doctorController.add)
router.post('/edit', checkRole('ADMINISTRATOR'),doctorController.edit)
router.get('/list', doctorController.getAll)
router.get('/:id', doctorController.getOne)

module.exports = router