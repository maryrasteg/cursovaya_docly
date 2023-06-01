const Router = require('express')
const router = new Router()
const proceduresController = require('../controllers/proceduresController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/add', checkRole('ADMINISTRATOR'), proceduresController.add)
router.get('/', checkRole('ADMINISTRATOR'), proceduresController.list)
router.put('/update', checkRole('ADMINISTRATOR'), proceduresController.update)

module.exports = router