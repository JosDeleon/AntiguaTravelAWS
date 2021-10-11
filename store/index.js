export const state = () => ({
  loading: false,
  usuarioChatActual: {},
  negocios: [],
  hideMessageField: false,
  rutaActual: ''
})

export const mutations = {
  setLoading(state, value){
    state.loading = value
  },
  setUsuarioChatActual(state, value){
    state.usuarioChatActual = value
  },
  setNegocios(state, value){
    state.negocios = value
  },
  setHideMessageField(state, value){
    state.hideMessageField = value
  },
  setRutaActual(state, value){
    state.rutaActual = value
  },
}
