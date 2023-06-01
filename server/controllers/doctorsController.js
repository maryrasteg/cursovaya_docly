const ApiError = require('../error/ApiError')
const {Doctor, Client, User, Reception} = require('../models/models')
const {Op} = require("sequelize");
class DoctorsController {
    async add(req, res, next) {
        const {surname, first_name, middle_name, phone, birth} = req.body
        const doctor = await Doctor.create({surname: surname, first_name: first_name, middle_name: middle_name, phone: phone, birth: birth})
        return res.json({doctor})
    }

    async update(req, res, next) {
        try {
            const {id} = req.query;
            const {surname, first_name, middle_name, birth, phone} = req.body
            await Doctor.update({surname: surname, first_name: first_name, middle_name: middle_name, birth: birth, phone: phone}, {where: {id: id}})
            return res.json("Врач изменен успешно!")
        } catch (e) {
            next(ApiError.basRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        let {page, limit} = req.query
        page = page || 1
        limit = limit || 20
        let offset = page * limit - limit
        try {
            const doctors = await Doctor.findAndCountAll({limit, offset, order: [['surname', 'ASC']]})
            return res.json(doctors)
        } catch (e) {
            next(ApiError.basRequest(e.message))
        }
    }

    async getOne(req, res, next){

    }

    async delete(req, res, next){
        try {
            const {id} = req.query;
            Doctor.destroy({
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

module.exports = new DoctorsController()