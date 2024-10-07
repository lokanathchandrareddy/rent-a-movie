<template>
  <VContainer fluid>
    <VRow>
      <VCol cols="12">
        <h1 class="my-4 text-center">Your Rented Movies</h1>
      </VCol>

      <VCol v-for="(item, index) in rentedMovies" :key="item.id" cols="12" sm="6" md="4" class="d-flex">
        <VCard class="flex-grow-1" outlined rounded="lg" elevation="2">
          <VCardTitle class="text-white" :class="index % 2 === 0 ? 'bg-primary' : 'bg-secondary'">
            {{ item.title }}
          </VCardTitle>

          <VCardText>
            <VChip class="ma-1" color="primary" text-color="white" size="small">
              {{ item.genre }}
            </VChip>
            <VChip class="ma-1" text-color="white" size="small" variant="flat">
              {{ item.language }}
            </VChip>

            <VList dense>
              <VListItem title="Rented On" :subtitle="formatDate(item.rented_on)" />
              <VListItem title="Director" :subtitle="item.director" />
              <VListItem title="Year of Release" :subtitle="item.year_of_release" />
              <VListItem v-if="!isReturnPage" title="Price" :subtitle="'$' + item.price.toFixed(2)" />
            </VList>
          </VCardText>

          <!-- Action Button -->
          <VCardActions>
            <div>
              <VSpacer />
              <VBtn color="primary" @click="addToRentedCart(item)" prepend-icon="mdi-cart" size="small" variant="tonal">
                Add to Return Cart
              </VBtn>
            </div>
          </VCardActions>
        </VCard>
      </VCol>

      <!-- Show message if no rented movies -->
      <VCol cols="12" v-if="rentedMovies.length === 0">
        <VAlert color="info" class="my-4 text-center">
          You have no rented movies.
        </VAlert>
      </VCol>
    </VRow>
  </VContainer>
</template>


<script setup>
import { computed, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movieCart';

// Initialize the cart store and user
const user = useSupabaseUser();
const movieCartStore = useMovieStore();

// Fetch rented movies when component mounts
onMounted(async () => {
  if (user.value) {
    await movieCartStore.fetchRentedMovies(); // Fetch rented movies for the user
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
