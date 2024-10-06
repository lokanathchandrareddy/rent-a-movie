import { defineStore } from "pinia";

export const useMovieStore = defineStore("movieCart", {
  state: () => ({
    movies: [],
    movieItems: [],
    rentedItems: [],
  }),

  actions: {
    async fetchMovies() {
      console.log("inside fetch");
      const supabase = useSupabaseClient();
      const { data, error } = await supabase.from("movies").select("*"); // select * from movies to get all the data
      if (error) {
        console.log("error while loading movies", error.message);
      } else {
        console.log("data from supabase", data);
        this.movies = data;
      }
    },
    async fetchRentedMovies(id) {
      // fetch rented movies per user ID
      console.log("user.value.id", id);
      const supabase = useSupabaseClient();
      // const { data, error } = await supabase
      //   .from("rented_movies")
      //   .select("*, movies(*)")
      //   .eq("user_id", id); // select all data and join it with movies table with key as id/userId

      const { data, error } = await supabase
        .from("rented_movies_flat")
        .select("*")
        .eq("user_id", id);
      console.log("data inside", data);
      if (error) {
        console.log("error while loading rented movies", error.message);
      } else {
        this.rentedItems = data;
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
    async checkout(userId) {
      const supabase = useSupabaseClient();
      // Update state management for checkout
      this.movieItems.forEach(async (movie) => {
        console.log("Movie inside", movie);
        movie.stock -= 1; // Decrease stock for each movie
        const { error: stockErr } = await supabase
          .from("movies")
          .update({ stock: movie.stock })
          .eq("id", movie.id);
        if (stockErr) {
          console.error("error updating the stock in movies", stockErr.message);
          return; // return on error
        }
        const { error: rentalErr } = await supabase
          .from("rented_movies")
          .insert({
            movie_id: movie.id,
            user_id: userId,
            rented_on: new Date(),
          });
        if (rentalErr) {
          console.log("error while pushign to Rental Data", rentalErr.message);
        }

        // TODO: later
        //comment for now as we are not tracking quantity per user
        // const rentedMovie = this.rentedItems.find(
        //   (item) => item.id === movie.id
        // );
        // if (rentedMovie) {
        //   rentedMovie.quantity += 1; // add quantity to rentedItems
        // } else {
        //   this.rentedItems.push({ ...movie, quantity: 1 });
        // }
      });
      this.clearCart();
    },
    async returnMovies(userId) {
      const supabase = useSupabaseClient();

      this.movieItems.forEach(async (movie) => {
        movie.stock += 1; // Increase stock for each movie
        const { error: stockErr } = await supabase
          .from("movies")
          .update({ stock: movie.stock })
          .eq("id", movie.id);

        if (stockErr) {
          console.error(
            "Error while updating stock during retunr",
            stockErr.message
          );
          return;
        }

        const { error: returnErr } = await supabase
          .from("rented_movies")
          .delete()
          .eq("user_id", userId)
          .eq("movie_id", movie.id);

        if (returnErr) {
          console.error("Errol returning thwe movie", returnErr.message);
        }

        //TODO: we can assess the quantity later
        // const rentedMovieIndex = this.rentedItems.findIndex(
        //   (item) => item.id === movie.id
        // );
        // if (rentedMovieIndex !== -1) {
        //   const rentedMovie = this.rentedItems[rentedMovieIndex];
        //   rentedMovie.quantity -= 1; // decrease from rentedItems
        //   if (rentedMovie.quantity <= 0) {
        //     this.rentedItems.splice(rentedMovieIndex, 1);
        //   }
        // }
      });
      this.clearCart();
      this.fetchRentedMovies(userId);
    },
  },
  getters: {
    totalCost: (state) =>
      state.movieItems.reduce((total, item) => total + item.price, 0),
  },
});
