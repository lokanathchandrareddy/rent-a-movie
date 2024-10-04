import { defineStore } from 'pinia';

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    movieItems: [],
  }),
  actions: {
    addToCart(movie) {
      this.movieItems.push(movie);
    },
    removeFromCart(movieId) {
      this.movieItems = this.movieItems.filter((item) => item.id !== movieId);
    },
  },
  getters: {
    totalCost: (state) =>
      state.movieItems.reduce((total, item) => total + item.price, 0),
  },
});
