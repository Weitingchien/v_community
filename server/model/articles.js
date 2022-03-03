const query = require('../config/db')
const articles = (req, res, next) => {
  return new Promise((resolve, reject) => {
    query(
      'SELECT member.username, articles.topic, articles.issue, articles.title, articles.content, FROM_UNIXTIME(UNIX_TIMESTAMP(articles.created_at), "%Y/%m/%d %H:%i:%S %p %W") as created_at, FROM_UNIXTIME(UNIX_TIMESTAMP(articles.updated_at), "%Y/%m/%d %H:%i:%S %p %W") as updated_at FROM articles LEFT JOIN member ON articles.id = member.id',
      (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      }
    )
  })
}

module.exports = articles
