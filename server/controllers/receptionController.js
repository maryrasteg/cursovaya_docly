const ApiError = require('../error/ApiError')
const {Reception} = require('../models/models')
const {Note} = require('../models/models')
class ReceptionController {
    async add(req, res, next) {
        try {
            const {doctorId, clientId, date, time, procedureId, note} = req.body
            const reception = await Reception.create({doctorId, clientId, date, time, procedureId, note})
            return res.json(reception)
        } catch (e) {
            next(ApiError.basRequest(e.message))
        }
    }

    async getAll(req, res) {

    }

    async getForClient(req, res) {
        const {id} = req.params
        const reception = await Reception.findAll({where: {clientId: id}})
        return res.json(reception)
    }
}

module.exports = new ReceptionController()