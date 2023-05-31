const Router = require('express')
const router = new Router()
const receptionController = require('../controllers/receptionController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/add', receptionController.add)
router.get('/list', receptionController.getAll)
router.get('client/:clientid', receptionController.getForClient)
router.get('/:id', receptionController.getOne)
router.delete('/delete', checkRole('ADMINISTRATOR'), receptionController.delete)

module.exports = router