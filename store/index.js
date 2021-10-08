export const state = () => ({
  loading: false,
  usuarioChatActual: {},
  negocios: []
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
}
