const ApiError = require('../error/ApiError')
const {Doctor} = require('../models/models')
class DoctorController {
    async add(req, res, next) {
        try {
            const {surname, first_name, middle_name, phone, birth, positionId, rate} = req.body
            const doctor = await Doctor.create({surname, first_name, middle_name, phone, birth, positionId, rate})
            return res.json({doctor})
        } catch (e) {
            next(ApiError.basRequest(e.message))
        }
    }

    async edit(req, res) {

    }

    async getAll(req, res) {

    }

    async getOne(req, res) {

    }
}

module.exports = new DoctorController()