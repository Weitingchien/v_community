import apiFactory from '../api/apiFactory'
export default function ({ $axios, app, store }, inject) {
  const api = apiFactory($axios)
  inject('api', api)

  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
    console.log('config: ', config)
    return config
  })
}
