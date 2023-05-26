const Router = require('express')
const router = new Router()
const receptionController = require('../controllers/receptionController')

router.post('/add', receptionController.add)
router.get('/list', receptionController.getAll)
router.get('/:clientid', receptionController.getForClient)

module.exports = router