export default function ({ $auth, redirect }) {
  console.log($auth)
  if (!$auth.hasScope('admin')) {
    return redirect('/')
  }
}
