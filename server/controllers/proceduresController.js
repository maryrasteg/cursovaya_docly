const ApiError = require('../error/ApiError')
const {Procedure, Doctor, Client} = require('../models/models')

class ProceduresController {

    async add(req, res, next) {
        const {name, price, duration} = req.body
        const procedure = await Procedure.create({name: name, price: price, duration: duration})
        return res.json(procedure)
    }
    async list(req, res, next) {
        let {page, limit} = req.query
        page = page || 1
        limit = limit || 20
        let offset = page * limit - limit
        try {
            const users = await Procedure.findAndCountAll({limit, offset, order: [['name', 'ASC']]})
            return res.json(users)
        } catch (e) {
            next(ApiError.basRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.query;
            const {name, price, duration} = req.body
            await Procedure.update({name: name, price: price, duration: duration}, {where: {id: id}})
            return res.json("Procedure updated!")
        } catch (e) {
            next(ApiError.basRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.query;
            Procedure.destroy({
                where: {
                    id: id
                }
            }).then(function(rowDeleted){
                if(rowDeleted === 1){
                    return res.json("Процедура успешно удалена!");
                }
            }, function(err){
                next(ApiError.basRequest(err))
            });
        } catch (e) {
            next(ApiError.basRequest(e.message))
        }
    }
}

module.exports = new ProceduresController()