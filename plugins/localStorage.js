export default ({ app }, inject) => {
  inject('localStorage', {
    set(key = '', val = {}) {
      localStorage.setItem(key, JSON.stringify(val))
    },
    get(key = '') {
      return JSON.parse(localStorage.getItem(key))
    },
    remove(key = '') {
      localStorage.removeItem(key)
    },
    clear() {
      localStorage.clear()
    },
  })
}
