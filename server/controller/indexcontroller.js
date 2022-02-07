const encryption = require('../model/encryption')
const { login, getUserInfo } = require('../model/login')
const signUp = require('../model/signup')

class Normal {
  toLogin(req, res, next) {
    if (req.url === '/login') {
      login(req, res, next)
        .then((token) => {
          res.status(200).json({ token })
        })
        .catch((err) => {
          res.status(500).json({ message: err.errorMessage })
          throw err
        })
    }
    if (req.url === '/user') {
      getUserInfo(req, res, next)
    }
  }

  toSignUp(req, res, next) {
    const { username, email, password } = req.body
    const encryptPassword = encryption(password)
    const memberData = {
      username,
      email,
      password: encryptPassword,
    }
    signUp(memberData)
      .then((result) => {
        res.status(201).json({ message: 'User was registered successfully' })
      })
      .catch((err) => {
        res.status(500).json({ message: err.errorMessage })
      })
  }
}

module.exports = Normal
