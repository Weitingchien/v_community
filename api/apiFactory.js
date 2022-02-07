export default (axios) => ({
  login(data) {
    return axios.post('/api/login', data)
  },
  signUp(data) {
    return axios.post('/api/signup', data)
  },
  member() {
    return axios.get('/api/member')
  },
})
