import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      User_id: -1,
      Full_name: "",
      Paypal_email: "",
      Username: "",
      Password: ""
    }
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    isLogged: state => {
      return state.user.User_id !== -1;
    }
  }
});
