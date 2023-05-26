const ApiError = require('../error/ApiError')
const {Client} = require('../models/models')


class ClientController {
    async add(req, res, next) {
        try {
            const {surname, first_name, middle_name, genderId, phone, birth} = req.body
            const client = await Client.create({surname, first_name, middle_name, genderId, phone, birth})
            return res.json(client)
        } catch (e) {
            next(ApiError.basRequest(e.message))
        }
    }

    async edit(req, res) {
        try {
            const {id} = req.query;
            const {surname, first_name, middle_name, genderId, phone, birth} = req.body
            await Client.update({surname: surname, first_name: first_name, middle_name: middle_name, genderId: genderId, phone: phone, birth: birth}, {where: {id: id}})
            return res.json("updated successfully")
        } catch (e) {
            next(ApiError.basRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {page, limit} = req.query
        page = page || 1
        limit = limit || 20
        let offset = page * limit - limit
        const clients = await Client.findAndCountAll({limit, offset})
        return res.json(clients)
    }

    async getOne(req, res) {
        const {id} = req.params
        const client = await Client.findOne({where: {id}})
        return res.json(client)
    }
}

module.exports = new ClientController()