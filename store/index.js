export const actions = {
  handUpdateUserData({ commit }, [value, columnType]) {
    commit('updateUserData', [value, columnType])
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
}

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  getUserInfo(state) {
    return state.auth.user
  },
}
