const router = require('express').Router()
const NormalMethod = require('../controller/indexcontroller')

const normalInstance = new NormalMethod()

// login
router.post('/login', normalInstance.toLogin)
router.post('/signup', normalInstance.toSignUp)
router.get('/user', normalInstance.toLogin)

module.exports = router
