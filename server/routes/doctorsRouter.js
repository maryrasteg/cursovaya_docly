const Router = require('express')
const router = new Router()
const doctorsController = require('../controllers/doctorsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/add', checkRole('ADMINISTRATOR'), doctorsController.add)
router.put('/edit', checkRole('ADMINISTRATOR'),doctorsController.update)
router.delete('/delete', checkRole('ADMINISTRATOR'),doctorsController.delete)
router.get('/list', doctorsController.getAll)
router.get('/:id', doctorsController.getOne)

module.exports = router