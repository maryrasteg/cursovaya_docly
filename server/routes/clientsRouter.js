const Router = require('express')
const router = new Router()
const clientsController = require('../controllers/clientsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/add', checkRole('ADMINISTRATOR'), clientsController.add)
router.post('/edit', checkRole('ADMINISTRATOR'), clientsController.edit)
router.delete('/delete', checkRole('ADMINISTRATOR'), clientsController.delete)
router.get('/list', clientsController.getAll)
router.get('/:id', clientsController.getOne)

module.exports = router