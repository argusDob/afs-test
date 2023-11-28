import { MutationTree, ActionTree } from "vuex";
import { Message } from "@/types/types";

interface State {
  messageBlock: Message;
}

enum MutationTypes {
  SET_NEW_MESSAGE = "SET_NEW_MESSAGE", // Removed the extra space
}

const state: State = {
  messageBlock: { message: undefined, type: undefined },
};

const getters = {
  getMessage: (state: State): Message => {
    return state.messageBlock;
  },
};

const mutations: MutationTree<State> = {
  [MutationTypes.SET_NEW_MESSAGE](state, payload: Message) {
    state.messageBlock = payload;
  },
};

const actions: ActionTree<State, unknown> = {
  updateMessage({ commit }, data) {
    commit(MutationTypes.SET_NEW_MESSAGE, data);
  },
};

export default {
  namespaced: true,
  getters,
  actions,
  state,
  mutations,
};
