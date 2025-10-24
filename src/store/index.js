import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: []
  },
  mutations: {
    addGameToCart(state, game) {
      state.cart.push(game);
    },
    removeGameFromCart(state, game) {
      const index = state.cart.findIndex(cartGame => cartGame.title === game.title);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    clearCart(state) {
      state.cart = [];
    }
  },
  actions: {
    addGameToCart({ commit }, game) {
      commit('addGameToCart', game);
    },
    removeGameFromCart({ commit }, game) {
      commit('removeGameFromCart', game);
    },
    clearCart({ commit }) {
      commit('clearCart');
    }
  },
  getters: {
    getCart: state => state.cart,
    totalPrice: state => state.cart.reduce((total, game) => total + game.discountPrice, 0)
  }
});