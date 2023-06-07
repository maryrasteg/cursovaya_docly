const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {}, //removed ssl
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)

// module.exports = new Sequelize('postgres://postgres_docly_client:h5vtopc3hpujO8KkB4B6HqDPShyertad@dpg-chvhedorddlbpl0efgkg-a.oregon-postgres.render.com/clinic_3gzp', {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//         ssl: true,
//         native:true
//     }, //removed ssl
// });