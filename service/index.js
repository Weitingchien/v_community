import axios from 'axios'

const service = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  // withCredentials: true, // axios預設是不會攜帶cookie，所以要這邊設定為true才會攜帶cookie
})

service.interceptors.response.use(null, (error) => {
  if (error.response.status === 403) {
    this.$nuxt.error({ statusCode: 403, message: '未授權' })
  }
  return Promise.reject(error)
})

export default service
