export default (axios) => ({
  login(data) {
    return axios.post('/api/login', data)
  },
  getUserData(data) {
    return axios.post('/api/userdata', data)
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
  uploadAvatar(data, progress) {
    return axios.post('/api/uploadavatar', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: progress,
    })
  },
  getAvatar(data) {
    return axios.post('/api/getavatar', data)
  },
})
