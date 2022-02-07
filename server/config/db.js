const mysql = require('mysql')
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: '',
  database: process.env.DATABASE,
})

const query = (sql, options, callback) => {
  console.log(sql, options, callback)
  pool.getConnection((err, conn) => {
    if (err) {
      callback(err, null, null)
    } else {
      conn.query(sql, options, (err, results, fields) => {
        callback(err, results, fields)
      })
      conn.release()
    }
  })
}

module.exports = query
