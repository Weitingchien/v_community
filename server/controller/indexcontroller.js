const encryption = require('../model/encryption')
const { login, getUserInfo } = require('../model/login')
const signUp = require('../model/signup')
const update = require('../model/update')
const uploadAvatar = require('../model/uploadavatar')
const getAvatar = require('../model/getavatar')
const getUserProfileContent = require('../model/getuserprofilecontent')
const postArticles = require('../model/postarticles')
const articles = require('../model/articles')

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

  uploadImage(req, res, next) {
    uploadAvatar(req, res, next)
      .then((result) => {
        console.log(result)
        return res.status(200).send({ result })
      })
      .catch((err) => {
        res.status(500).json({ message: err.errorMessage })
      })
  }

  getImage(req, res, next) {
    getAvatar(req, res, next)
      .then((result) => {
        return res.status(200).send({ result })
      })
      .catch((err) => {
        res.status(500).json({ message: err.errorMessage })
      })
  }

  getUserData(req, res, next) {
    getUserProfileContent(req, res, next)
      .then((result) => {
        return res.status(200).send({ result })
      })
      .catch((err) => {
        res.status(500).json({ message: err.errorMessage })
      })
  }

  updateUser(req, res, next) {
    update(req, res, next)
      .then((result) => {
        return res.status(200).send({ result })
      })
      .catch((err) => {
        res.status(500).json({ message: err.errorMessage })
      })
  }

  toPostArticles(req, res, next) {
    const { id, content, title, topic, issue } = req.body
    const userArticles = {
      id,
      content,
      title,
      topic,
      issue,
    }
    postArticles(userArticles)
      .then((result) => {
        res.status(200).send({ result })
      })
      .catch((err) => {
        res.status(500).send({ message: err })
      })
  }

  getArticles(req, res, next) {
    articles()
      .then((result) => {
        res.status(200).send({ result })
      })
      .catch((err) => {
        res.status(500).send({ message: err })
      })
  }
}

module.exports = Normal
