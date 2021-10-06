export const state = () => ({
  loading: false,
  usuarioChatActual: {}
})

export const mutations = {
  setLoading(state, value){
    state.loading = value
  },
  setUsuarioChatActual(state, value){
    state.usuarioChatActual = value
  }
}
