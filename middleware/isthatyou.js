export default function ({ store, redirect }) {
  if (!store.getters.getUserInfo.username) {
    return redirect('/')
  }
}
