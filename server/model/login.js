const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const query = require('../config/db')

const signToken = (result) => {
  if (result.length === 0) return
  return jwt.sign({ _id: result[0].ID }, process.env.KEY, {
    expiresIn: Math.floor((Date.now() / 1000) * 60 * 10),
    algorithm: 'HS256',
  })
}

let loadedUser

const login = (req, res, next) => {
  return new Promise((resolve, reject) => {
    query(
      'SELECT * FROM member WHERE email = ?',
      [req.body.email],
      (err, result) => {
        if (err) {
          reject(err)
        } else if (result.length === 0) {
          const errData = {}
          errData.errorMessage = '無此使用者'
          reject(errData)
        }
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          result[0].password
        )
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: '無效的密碼',
          })
        }
        loadedUser = result
        const token = signToken(result)
        resolve(token)
      }
    )
  })
}

const getUserInfo = (req, res, next) => {
  res.status(200).json({
    user: {
      id: loadedUser[0].id,
      username: loadedUser[0].username,
      email: loadedUser[0].email,
      role: loadedUser[0].role,
    },
  })
}

module.exports = { login, getUserInfo }
