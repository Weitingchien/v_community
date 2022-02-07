const bcrypt = require('bcryptjs')

const encryption = (password) => {
  const hashPassword = bcrypt.hashSync(password, 10) // 密碼加密
  return hashPassword
}

module.exports = encryption
