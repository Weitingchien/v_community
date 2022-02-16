export const state = () => ({
  avatar: null,
})

// 只有在actions可以使用plugin
export const actions = {
  handUpdateUserData({ commit }, [value, columnType]) {
    commit('updateUserData', [value, columnType])
  },
  handUploadAvatar({ commit }, value) {
    this.$localStorage.set('avatar', value)
    commit('uploadAvatar', value)
  },
}

export const mutations = {
  updateUserData(state, [value, columnType]) {
    console.log(state, value, columnType)
    if (columnType === 'username') {
      state.auth.user.username = value
    } else if (columnType === 'email') {
      state.auth.user.email = value
    }
  },
  uploadAvatar(state, value) {
    state.avatar = value
  },
}

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  getUserInfo(state) {
    return state.auth.user
  },
  getAvatar(state) {
    return state.avatar
  },
}
