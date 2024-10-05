import { defineStore } from "pinia";

export const useMovieStore = defineStore("movieCart", {
  state: () => ({
    movieItems: [],
    rentedItems: [],
  }),
  actions: {
    addToCart(movie) {
      this.movieItems.push(movie);
    },
    removeFromCart(movieId) {
      this.movieItems = this.movieItems.filter((item) => item.id !== movieId);
    },
    clearCart() {
      this.movieItems = [];
    },
    checkout() {
      // Update state management for checkout
      this.movieItems.forEach((movie) => {
         
        movie.stock -= 1;// Decrease stock for each movie
        const rentedMovie = this.rentedItems.find(
          (item) => item.id === movie.id
        );
        if (rentedMovie) {
          rentedMovie.quantity += 1; // add quantity to rentedItems
        } else {
          this.rentedItems.push({ ...movie, quantity: 1 });
        }
      });
    },
    returnMovies() {
      this.movieItems.forEach((movie) => {
        movie.stock += 1; // Increase stock for each movie
        const rentedMovieIndex = this.rentedItems.findIndex(
          (item) => item.id === movie.id
        );
        if (rentedMovieIndex !== -1) {
          const rentedMovie = this.rentedItems[rentedMovieIndex];
          rentedMovie.quantity -= 1; // decrease from rentedItems
          if (rentedMovie.quantity <= 0) {
            this.rentedItems.splice(rentedMovieIndex, 1);
          }
        }
      });
    },
  },
  getters: {
    totalCost: (state) =>
      state.movieItems.reduce((total, item) => total + item.price, 0),
  },
});
