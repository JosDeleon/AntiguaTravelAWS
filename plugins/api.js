export default ({ app, store, $axios }, inject) => {
  const processRequest = (promise, resolve, reject) => {
    promise.then(res => {
      store.commit('setLoading',false)
      if (resolve)
        resolve(res.data)
    }).catch(res => {
      store.commit('setLoading',false)
      if (reject && res.response.status === 400)
        reject(res.response.data)
    })
  }

  const api = {
    timeout: 10000,
    outboxing: false,
    get (service, params = {}, data = null){
      store.commit('setLoading',true)
      return new Promise((resolve, reject) => {
        let config = {
          params: params,
          //withCredentials: true,
          timeout: this.timeout
        }
        config.data = data ?? null
        processRequest($axios.get(process.env.API + service, config),resolve,reject)
      })
    },
    getWithData (service, data = {}){
      store.commit('setLoading',true)
      return new Promise((resolve, reject) => {
        let config = {
          data: data,
          //withCredentials: true,
          timeout: this.timeout
        }

        processRequest($axios.get(process.env.API + service, config),resolve,reject)
      })
    },
    post (service, params = {}, files = false){
      store.commit('setLoading',true)
      return new Promise((resolve, reject) => {
        let config = {
          //withCredentials: true,
          timeout: this.timeout,
        }

        if (files){
          config.headers = { 'content-type': 'multipart/form-data' }
        }
        /*const usuario = JSON.parse(sessionStorage.getItem('usuario'));
        if(usuario.accessToken){
          config.headers['x-access-token'] = usuario.accessToken ?? ''
        }*/
        processRequest($axios.post(process.env.API + service,params, config),resolve,reject)
      })
    },
    put (service, params = {}) {
      store.commit('setLoading',true)
      return new Promise((resolve, reject) => {
        let config = {
          //withCredentials: true,
          timeout: this.timeout,
          data: params
        }
        processRequest($axios.put(process.env.API + service,params,config),resolve,reject)
      })
    },
    patch (service, params = {}){
      store.commit('setLoading',true)
      return new Promise((resolve, reject) => {
        let config = {
          //withCredentials: true,
          timeout: this.timeout,
        }
        processRequest($axios.patch(process.env.API + service,params,config),resolve,reject)
      })
    },
    delete (service, params = {}){
      store.commit('setLoading',true)
      return new Promise((resolve, reject) => {
        let config = {
          //withCredentials: true,
          timeout: this.timeout,
          data: params,
        }
        processRequest($axios.delete(process.env.API + service,config),resolve,reject)
      })
    },
  }

  inject('api', api)
}
