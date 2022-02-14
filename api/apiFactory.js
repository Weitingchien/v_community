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
  updateUser(data) {
    return axios.post('/api/updateuser', data)
  },
  uploadAvatar(data) {
    return axios.post('/api/uploadavatar', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  getAvatar(data) {
    return axios.post('/api/getavatar', data)
  },
})
