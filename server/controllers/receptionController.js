const ApiError = require('../error/ApiError')
const {Reception, Doctor, Client, Procedure} = require('../models/models')
const {Note} = require('../models/models')
const {Op} = require("sequelize");
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
        let {page, limit, selectedDoctor} = req.query
        page = page || 1
        limit = limit || 20
        let offset = page * limit - limit
        let receptions
        if(selectedDoctor){
            receptions = await Reception.findAndCountAll({limit, offset, include: [
                    { model: Doctor, where: {id: {[Op.col]: 'doctorId'}}},
                    { model: Client, where: {id: {[Op.col]: 'clientId'}}},
                    { model: Procedure, where: {'id': {[Op.col]: 'procedureId'}}}
                ], where: {doctorId: selectedDoctor.id}})
        } else {
            receptions = await Reception.findAndCountAll({
                limit, offset, include: [
                    {model: Doctor, where: {id: {[Op.col]: 'doctorId'}}},
                    {model: Client, where: {id: {[Op.col]: 'clientId'}}},
                    {model: Procedure, where: {'id': {[Op.col]: 'procedureId'}}}
                ]
            })
        }
        // let receptions
        // if(name.length <= 2){
        //     receptions = await Reception.findAndCountAll({limit, offset, include: [
        //         { model: Doctor, where: {id: {[Op.col]: 'Receptions.doctorId'}}},
        //             { model: Client, where: {id: {[Op.col]: 'Receptions.clientId'}}}
        //         ]})
        // } else {
        //     receptions = await Client.findAndCountAll({limit, offset, where: { 'surname': { [Op.like]: '%' + name.charAt(0).toUpperCase() + name.toLowerCase().slice(1) + '%' }}})
        // }
        const doctors = await Doctor.findAll()
        return res.json({"receptions": receptions, "doctors": doctors})
    }

    async getForClient(req, res) {
        const {id} = req.params
        const reception = await Reception.findAll({where: {clientId: id}})
        return res.json(reception)
    }
}

module.exports = new ReceptionController()