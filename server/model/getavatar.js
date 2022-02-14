const query = require('../config/db')
const getAvatar = (req, res, next) => {
  console.log('觸發getAvatar函式')
  console.log(req.body)
  return new Promise((resolve, reject) => {
    query(
      'SELECT avatar FROM member WHERE id = ?',
      req.body.userid,
      (err, result) => {
        if (err) {
          reject(err)
        } else if (result.length === 0) {
          const errData = {}
          errData.errorMessage = '無此使用者'
          reject(errData)
        }
        resolve(result)
      }
    )
  })
}

module.exports = getAvatar
