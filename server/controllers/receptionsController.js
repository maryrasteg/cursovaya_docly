const ApiError = require('../error/ApiError')
const {Reception, Doctor, Client, Procedure} = require('../models/models')
const {Note} = require('../models/models')
const {Op} = require("sequelize");
class ReceptionsController {
    async add(req, res, next) {
        try {
            const {date, time, clientId, doctorId, procedureId, note} = req.body
            const reception = await Reception.create({date, time, clientId, doctorId, procedureId, note})
            return res.json(reception)
        } catch (e) {
            next(ApiError.basRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        let {page, limit, selectedDoctor, searchDate} = req.query
        page = page || 1
        limit = limit || 20
        searchDate = searchDate || ""
        let offset = page * limit - limit
        let receptions
        try {
            if(selectedDoctor && !searchDate){
                receptions = await Reception.findAndCountAll({limit, offset, include: [
                        { model: Doctor, where: {id: {[Op.col]: 'doctorId'}}},
                        { model: Client, where: {id: {[Op.col]: 'clientId'}}},
                        { model: Procedure, where: {'id': {[Op.col]: 'procedureId'}}}
                    ], where: {doctorId: selectedDoctor.id},
                    order: [['date', 'DESC']]},)
            }
            else if(!selectedDoctor && searchDate){
                receptions = await Reception.findAndCountAll({limit, offset, include: [
                        { model: Doctor, where: {id: {[Op.col]: 'doctorId'}}},
                        { model: Client, where: {id: {[Op.col]: 'clientId'}}},
                        { model: Procedure, where: {'id': {[Op.col]: 'procedureId'}}}
                    ], where: {date: searchDate},
                    order: [['date', 'DESC']]},)
            }
            else if(selectedDoctor &&  searchDate){
                receptions = await Reception.findAndCountAll({limit, offset, include: [
                        { model: Doctor, where: {id: {[Op.col]: 'doctorId'}}},
                        { model: Client, where: {id: {[Op.col]: 'clientId'}}},
                        { model: Procedure, where: {'id': {[Op.col]: 'procedureId'}}}
                    ], where: {date: searchDate, doctorId: selectedDoctor.id},
                    order: [['date', 'DESC']]},)
            }
            else {
                receptions = await Reception.findAndCountAll({
                    limit, offset, include: [
                        {model: Doctor, where: {id: {[Op.col]: 'doctorId'}}},
                        {model: Client, where: {id: {[Op.col]: 'clientId'}}},
                        {model: Procedure, where: {'id': {[Op.col]: 'procedureId'}}}
                    ],
                    order: [['date', 'DESC']]
                })
            }
            const doctors = await Doctor.findAll()
            const procedures = await Procedure.findAll()
            return res.json({"receptions": receptions, "doctors": doctors, "procedures": procedures})
        }
        catch (e) {
            next(ApiError.basRequest(e.message))
        }
    }

    async getForClient(req, res) {
        const {id} = req.params
        const reception = await Reception.findAll({where: {clientId: id}, order: [['date', 'DESC']]})
        return res.json(reception)
    }

    async getOne(req, res) {
        const {id} = req.params
        const reception = await Reception.findOne({where: {id: id}, include: [
                {model: Doctor, where: {id: {[Op.col]: 'doctorId'}}},
                {model: Client, where: {id: {[Op.col]: 'clientId'}}},
                {model: Procedure, where: {id: {[Op.col]: 'procedureId'}}}
            ]})
        return res.json(reception)
    }

    async getMonth(req, res, next) {
        try {
            const startDate = new Date()
            const endDate = new Date()

            const reception = await Reception.findAll({
                where: {
                    date: {
                        [Op.between]: [endDate.setMonth(endDate.getMonth() - 1), startDate]
                    }},
                    include:[ { model: Procedure, required: true }, { model: Doctor, required: true }, { model: Client, required: true }],
                order: [['date', 'DESC']],
            })
            return res.json(reception)
        } catch (e) {
            next(ApiError.basRequest(e.message))
        }
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

module.exports = new ReceptionsController()