import store from 'src/store';


Vue.use(Vuex);

export default function ({ app }) {

  app.store = store;
}
