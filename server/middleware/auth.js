const jwt = require('jsonwebtoken')
const query = require('../config/db')
// const role = require('../config/role')

const verify = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    return res.status(401).send({
      message: '未進行身分驗證',
    })
  }
  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: '未經授權',
      })
    }
    const result = query(
      'SELECT username, email FROM member WHERE ID = ?',
      decoded._id
    )
    if (result[0].ID === decoded._id) {
      req.userId = decoded._id
      next()
    }
  })
}

/* const isSuperAdmin = (req, res, next) => {
  db.query(
    'SELECT role FROM member WHERE ID = ?',
    req.userId,
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err })
      }
      if (result[0].role === role.superadmin) {
        return next()
      }
      return res.status(403).send({ message: '需要superadmin權限' })
    }
  )
}

const isAdmin = (req, res, next) => {
  db.query(
    'SELECT role FROM member WHERE ID = ?',
    req.userId,
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err })
      }
      if (result[0].role === role.admin) {
        return next()
      }
      return res.status(403).send({ message: '需要admin權限' })
    }
  )
}

const isMember = (req, res, next) => {
  db.query(
    'SELECT role FROM member WHERE ID = ?',
    req.userId,
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err })
      }
      if (result[0].role === role.member) {
        return next()
      }
      return res.status(403).send({ message: '需要member權限' })
    }
  )
}

const isGuest = (req, res, next) => {
  db.query(
    'SELECT role FROM member WHERE ID = ?',
    req.userId,
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err })
      }
      if (result[0].role === role.guest) {
        return next()
      }
      return res.status(403).send({ message: '需要guest權限' })
    }
  )
} */

module.exports = {
  verify,
  /*   isSuperAdmin,
  isAdmin,
  isMember,
  isGuest, */
}
