const Router = require('express')
const router = new Router()
const receptionsController = require('../controllers/receptionsController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/add', receptionsController.add)
router.get('/list', receptionsController.getAll)
router.get('/month', checkRole('ADMINISTRATOR'), receptionsController.getMonth)
router.get('client/:clientid', receptionsController.getForClient)
router.get('/:id', receptionsController.getOne)
router.delete('/delete', checkRole('ADMINISTRATOR'), receptionsController.delete)

module.exports = router