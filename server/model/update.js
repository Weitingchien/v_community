const query = require('../config/db')
const update = (req, res, next) => {
  console.log(req.body)
  return new Promise((resolve, reject) => {
    query(
      'SELECT email FROM member WHERE email = ?',
      req.body.email,
      (err, results) => {
        console.log(results)
        const data = {}
        if (err) {
          console.log('1')
          reject(err)
        }
        if (results.length >= 2) {
          console.log('2')
          data.errorMessage = '此email已經有人使用'
          reject(data)
        }
        query(
          'UPDATE member SET username = ?, email = ? WHERE email = ?',
          [req.body.username, req.body.email, req.body.email],
          (err, result) => {
            if (err) {
              console.log('3')
              reject(err)
            }
            resolve(result)
          }
        )
      }
    )
  })
}

module.exports = update
