const query = require('../config/db')

const postArticles = (userArticles) => {
  console.log(userArticles)
  return new Promise((resolve, reject) => {
    query('INSERT INTO articles SET ?', userArticles, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

module.exports = postArticles
