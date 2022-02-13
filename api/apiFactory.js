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
<<<<<<< Updated upstream
=======
  updateUser(data) {
    return axios.post('/api/updateuser', data)
  },
  uploadAvatar(data) {
    return axios.post('/api/uploadavatar', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
>>>>>>> Stashed changes
})
