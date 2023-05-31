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

    async getAll(req, res, next) {
        let {page, limit, selectedDoctor} = req.query
        page = page || 1
        limit = limit || 20
        let offset = page * limit - limit
        let receptions
        try {
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
            const doctors = await Doctor.findAll()
            return res.json({"receptions": receptions, "doctors": doctors})
        }
        catch (e) {
            next(ApiError.basRequest(e.message))
        }
    }

    async getForClient(req, res) {
        const {id} = req.params
        const reception = await Reception.findAll({where: {clientId: id}})
        return res.json(reception)
    }

    async getOne(req, res) {
        const {id} = req.params
        const reception = await Reception.findOne({where: {id: id}, include: [
                {model: Doctor, where: {id: {[Op.col]: 'doctorId'}}},
                {model: Client, where: {id: {[Op.col]: 'clientId'}}},
                {model: Procedure, where: {'id': {[Op.col]: 'procedureId'}}}
            ]})
        return res.json(reception)
    }

    async delete(req, res, next){
        try {
            const {id} = req.query;
            Reception.destroy({
                where: {
                    id: id
                }
            }).then(function(rowDeleted){
                if(rowDeleted === 1){
                    return res.json("Deleted successfully");
                }
            }, function(err){
                next(ApiError.basRequest(err))
            });
        } catch (e) {
            next(ApiError.basRequest(e.message))
        }
    }
}

module.exports = new ReceptionController()