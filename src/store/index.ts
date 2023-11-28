import Vue from "vue";
import Vuex from "vuex";

import form from "./modules/form";
import notifications from "./modules/notifications";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { form, notifications },
});
