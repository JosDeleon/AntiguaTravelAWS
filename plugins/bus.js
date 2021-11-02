import Vue from 'vue'

export default ({ app, $axios }, inject) => {
  inject('bus', new Vue())

  // Checking error return codes.
  $axios.onError(error => {
    switch(error.response?.status){
      case 502: {
        app.$bus.$emit('serviceOut')
        break;
      }
    }
  })
}
