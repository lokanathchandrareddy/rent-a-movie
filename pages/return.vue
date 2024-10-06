<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <h1>Your Rented Movies</h1>
        <!-- Display rented movies list -->
        <VList>
          <VListItem v-for="item in rentedMovies" :key="item.id">
              <VListItemTitle>{{ item.title }}</VListItemTitle>
              <VListItemSubtitle>
                Rented on: {{ formatDate(item.rented_on) }}<br />
                Price: ${{ item.price }}<br />
                Stock: {{ item.stock }}
              </VListItemSubtitle>
            <!-- Return Button -->
            <VBtn size='x-small' color="primary" @click="addToRentedCart(item)">
              Add to Return Cart
            </VBtn>
          </VListItem>
        </VList>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useMovieStore } from '~/stores/movieCart';


// Initialize the cart store and user
const user = useSupabaseUser();
const movieCartStore = useMovieStore();

// Fetch rented movies when component mounts
onMounted(async () => {
  if (user.value) {
    await movieCartStore.fetchRentedMovies(user.value.id); // Fetch rented movies for the user
  }
});

// Computed property to get the rented movies
const rentedMovies = computed(() => movieCartStore.rentedItems);

// Function to format the rented_on date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

// Function to add a movie to the return cart
function addToRentedCart(movie) {
  movieCartStore.addToCart(movie);
}
</script>
