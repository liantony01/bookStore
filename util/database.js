// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'store_schema',
//     password: 'password'
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('store_schema', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
});


module.exports = sequelize;