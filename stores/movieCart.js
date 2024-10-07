import { defineStore } from "pinia";

export const useMovieStore = defineStore("movieCart", {
  state: () => ({
    movies: [],
    movieItems: [],
    rentedItems: [],
  }),

  actions: {
    async fetchMovies() {
      //  Fetch all movies via API
      try {
        const response = await fetch('/api/movies', {
          method: 'GET', // GET request
        });
        const data = await response.json();
        this.movies = data.body; 
      } catch (error) {
        console.error("Error while loading movies", error);
      }
    },

    // Fetch rented movies for the user via the API,
    // user is directly used in the Server, instead of passing from here
    async fetchRentedMovies() {
      try {
        const response = await fetch('/api/return-movies', {
          method: 'GET', // GET request
        });
        const data = await response.json();
        this.rentedItems = data.body;  // Assuming response contains data in body
      } catch (error) {
        console.error("Error while loading rented movies", error);
      }
    },

    addToCart(movie) {
      this.movieItems.push(movie);
    },

    removeFromCart(movieId) {
      this.movieItems = this.movieItems.filter((item) => item.id !== movieId);
    },

    clearCart() {
      this.movieItems = [];
    },
    
    //checkout movies via API, multiple movies will be handled by server request
    async checkout() {
      try {
        const response = await fetch('/api/return-movies', {
          method: 'POST', // POST request to insert new rentals
          body: JSON.stringify({ movies: this.movieItems }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Error during checkout');
        }

        this.clearCart();  // Clear cart after successful checkout - add loading
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    },

    // returning Movies via API, multiple movies will be handled in Server
    async returnMovies() {
      try {
        const response = await fetch('/api/return-movies', {
          method: 'PUT', // PUT request to update stock/return movies
          body: JSON.stringify({ movies: this.movieItems }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Error during return');
        }

        this.clearCart();  // Clear cart - could use a loading mode
        await this.fetchRentedMovies();  //
      } catch (error) {
        console.error("Error during return:", error);
      }
    },
  },
  getters: {
    totalCost: (state) =>
      state.movieItems.reduce((total, item) => total + item.price, 0),
  },
});
