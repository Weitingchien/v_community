const query = require('../config/db')
const getUserProfileContent = (req, res, next) => {
  return new Promise((resolve, reject) => {
    query(
      'SELECT username, email FROM member WHERE id = ?',
      [req.body.id],
      (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      }
    )
  })
}

module.exports = getUserProfileContent
