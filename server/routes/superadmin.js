const router = require('express').Router()
const auth = require('../middleware/auth')

router.get('/superadmin/management', [auth.verify], (req, res, next) => {
  res.status(200).json('超級管理員介面')
})

module.exports = router
