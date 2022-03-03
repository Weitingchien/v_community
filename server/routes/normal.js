const router = require('express').Router()
const multer = require('multer')
const auth = require('../middleware/auth')
const NormalMethod = require('../controller/indexcontroller')
const normalInstance = new NormalMethod()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: 2 * 1024 * 1024 }, // 限制2MV
  /*   fileFilter(req, file, callback) {
    if (!file.mimetype.match(/^image/)) {
      callback(null, false)
    } else {
      callback(null, true)
    }
  }, */
})

// login
router.post('/login', normalInstance.toLogin)
router.post('/signup', normalInstance.toSignUp)
router.get('/user', auth.verify, normalInstance.toLogin)
router.post('/userdata', auth.verify, normalInstance.getUserData)
router.post('/updateuser', auth.verify, normalInstance.updateUser)
router.post(
  '/uploadavatar',
  auth.verify,
  upload.single('avatar'),
  normalInstance.uploadImage
)
router.post('/getavatar', auth.verify, normalInstance.getImage)
router.post('/postarticles', auth.verify, normalInstance.toPostArticles)
router.get('/getarticles', normalInstance.getArticles)

module.exports = router
