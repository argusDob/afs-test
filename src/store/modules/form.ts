import { MutationTree, ActionTree } from "vuex";
import { TableData } from "@/types/types";

interface State {
  tableRow: TableData | null;
}

enum MutationTypes {
  SET_NEW_ROW = "SET_NEW_ROW",
}

const state: State = {
  tableRow: {},
};

const getters = {
  getTableRow: (state: State): TableData | null => {
    return state.tableRow;
  },
};

const mutations: MutationTree<State> = {
  [MutationTypes.SET_NEW_ROW](state, payload: TableData) {
    state.tableRow = payload;
  },
};

const actions: ActionTree<State, State> = {
  updateTable({ commit }, data) {
    commit("SET_NEW_ROW", data);
  },
};

export default {
  namespaced: true,
  getters,
  actions,
  state,
  mutations,
};
