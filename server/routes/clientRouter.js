const Router = require('express')
const router = new Router()
const clientController = require('../controllers/clientController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/add', checkRole('ADMINISTRATOR'), clientController.add)
router.post('/edit', checkRole('ADMINISTRATOR'), clientController.edit)
router.delete('/delete', checkRole('ADMINISTRATOR'), clientController.delete)
router.get('/list', clientController.getAll)
router.get('/:id', clientController.getOne)

module.exports = router