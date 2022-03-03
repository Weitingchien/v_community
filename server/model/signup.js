const query = require('../config/db')

const signUp = (memberData) => {
  console.log(memberData)
  const data = {}
  return new Promise((resolve, reject) => {
    query(
      'SELECT email, username FROM member WHERE email = ? OR username = ?',
      [memberData.email, memberData.username],
      (err, result) => {
        if (err) {
          reject(err)
        }
        if (result.length >= 1) {
          data.errorMessage = '已經有重複的使用者名稱或是email'
          reject(data)
        } else {
          query('INSERT INTO member SET ?', memberData, (err, result) => {
            if (err) {
              reject(err)
            }
            resolve(result)
          })
        }
      }
    )
  })
}

module.exports = signUp
