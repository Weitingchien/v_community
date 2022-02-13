const router = require('express').Router()
const multer = require('multer')
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
router.get('/user', normalInstance.toLogin)
<<<<<<< Updated upstream
=======
router.post('/updateuser', normalInstance.updateUser)
router.post(
  '/uploadavatar',
  upload.single('avatar'),
  normalInstance.uploadImage
)
>>>>>>> Stashed changes

module.exports = router
