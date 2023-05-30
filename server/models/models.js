const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: 'WAIT', allowNull: false},
})

const Client = sequelize.define('client',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    surname: {type: DataTypes.STRING, allowNull: false},
    first_name: {type: DataTypes.STRING, allowNull: false},
    middle_name: {type: DataTypes.STRING, allowNull: true},
    genderId: {type: DataTypes.INTEGER, allowNull: true},
    phone: {type: DataTypes.STRING, allowNull: true},
    birth: {type: DataTypes.DATEONLY, allowNull: true},
    createdAt: {type: DataTypes.DATE, allowNull: true},
    updatedAt: {type: DataTypes.DATE, allowNull: true}
})

const Doctor = sequelize.define('doctor',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    surname: {type: DataTypes.STRING, allowNull: false},
    first_name: {type: DataTypes.STRING, allowNull: false},
    middle_name: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    birth: {type: DataTypes.DATEONLY, allowNull: true},
    positionId: {type: DataTypes.INTEGER, allowNull: true},
    rate: {type: DataTypes.INTEGER, allowNull: true},
})

const Reception = sequelize.define('reception',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    doctorId: {type: DataTypes.INTEGER, allowNull: false},
    clientId: {type: DataTypes.INTEGER, allowNull: false},
    date: {type: DataTypes.DATEONLY, allowNull: false},
    time: {type: DataTypes.TIME, allowNull: false},
    procedureId: {type: DataTypes.INTEGER, allowNull: false},
})

const Procedure = sequelize.define('procedure',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    duration: {type: DataTypes.INTEGER, allowNull: false}
})

const Position = sequelize.define('position',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Gender = sequelize.define('gender',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

// Doctor.hasMany(Reception)
// Reception.belongsTo(Doctor)

Client.hasMany(Reception)
Doctor.hasMany(Reception)
Reception.belongsTo(Client)
Reception.belongsTo(Doctor)

Reception.hasOne(Procedure)
Reception.belongsTo(Procedure)

Client.hasOne(Gender)
Gender.belongsTo(Client)

Position.hasOne(Doctor)
Doctor.belongsTo(Position)

module.exports = {
    User,
    Client,
    Doctor,
    Reception,
    Procedure,
    Position,
    Gender,
}