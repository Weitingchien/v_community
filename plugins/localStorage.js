import SecureLs from 'secure-ls'
export default ({ app }, inject) => {
  const ls = new SecureLs({
    encodingType: 'aes',
    isCompression: false,
    encryptionSecret: process.env.SECRET,
  })

  inject('localStorage', {
    set(key = '', val = {}) {
      ls.set(key, val)
      // localStorage.setItem(key, JSON.stringify(val))
    },
    get(key = '') {
      return ls.get(key)
      // return JSON.parse(localStorage.getItem(key))
    },
    remove(key = '') {
      ls.remove(key)
      // localStorage.removeItem(key)
    },
    clear() {
      ls.removeAll()
      // localStorage.clear()
    },
  })
}
