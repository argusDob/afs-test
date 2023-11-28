import Vue from "vue";
import Vuex from "vuex";

import dynamicTable from "./modules/dynamicTable";
import notifications from "./modules/notifications";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { notifications, dynamicTable },
});
