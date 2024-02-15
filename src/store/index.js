import { createStore } from 'vuex'
import module from './module'

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      module
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
}
