const query = require('../config/db')
const uploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('沒有檔案')
  }
  return new Promise((resolve, reject) => {
    query(
      'UPDATE member SET avatar = ? WHERE id = ?',
      [req.file.buffer, req.body.userid],
      (err, result) => {
        if (err) {
          reject(err)
        } else if (result.length === 0) {
          const errData = {}
          errData.errorMessage = '無此使用者'
          reject(errData)
        }
        query(
          'SELECT avatar FROM member WHERE id = ?',
          req.body.userid,
          (err, result) => {
            if (err) {
              reject(err)
            }
            resolve(result)
          }
        )
      }
    )
  })
}

module.exports = uploadAvatar
