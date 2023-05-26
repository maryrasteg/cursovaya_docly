const ApiError = require('../error/ApiError')
const {Reception} = require('../models/models')
const {Note} = require('../models/models')
class ReceptionController {
    async add(req, res, next) {
        try {
            const {doctorId, clientId, date, time, procedureId, note} = req.body
            const reception = await Reception.create({doctorId, clientId, date, time, procedureId})

            if(note){
                Note.create({
                    receptionId: reception.id,
                    note: note,
                    clientId: clientId
                })
            }

            return res.json(reception)
        } catch (e) {
            next(ApiError.basRequest(e.message))
        }
    }

    async getAll(req, res) {

    }

    async getForClient(req, res) {
        const {clientid} = req.params
        const reception = await Reception.findAll({where: {clientId: clientid}, include: [{model: Note, as: 'note'}]})
        return res.json(reception)
    }
}

module.exports = new ReceptionController()