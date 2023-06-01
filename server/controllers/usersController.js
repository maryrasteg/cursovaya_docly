const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Doctor, Client} = require('../models/models')

const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
        )
}

class UsersController {
    async registration(req, res, next) {

        const {login, password, role} = req.body
        if (!login || !password){
            return next(ApiError.basRequest('Некорректный логин или пароль'))
        }
        const candidate = await User.findOne({where: {login}})
        if (candidate){
            return next(ApiError.basRequest('Пользователь с таким логином уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, role, password: hashPassword})
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user){
            return next(ApiError.internal('Пользователь с таким логином не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.role)
        return res.json({token})
    }

    async list(req, res, next) {
        let {page, limit} = req.query
        page = page || 1
        limit = limit || 20
        let offset = page * limit - limit
        try {
            const users = await User.findAndCountAll({limit, offset, order: [['login', 'ASC']]})
            return res.json(users)
        } catch (e) {
            next(ApiError.basRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.query;
            const {login, role} = req.body
            await User.update({login: login, role: role}, {where: {id: id}})
            return res.json("User updated!")
        } catch (e) {
            next(ApiError.basRequest(e.message))
        }
    }
}

module.exports = new UsersController()