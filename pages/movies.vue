<template>
  <VContainer fluid>
    <VRow>
      <VCol v-for="movie in movies" :key="movie.title" cols="12" md="4">
        <VCard class="ma-2 pa-2" variant="tonal">
          <VCardTitle>{{ movie.title }}</VCardTitle>
          <VCardSubtitle>{{ movie.genre }} - {{ movie.language }}</VCardSubtitle>
          <VCardText>
            <p><strong>Director:</strong> {{ movie.director }}</p>
            <p><strong>Year of Release:</strong> {{ movie.year_of_release }}</p>
            <p><strong>Price:</strong> ${{ movie.price.toFixed(2) }}</p>
          </VCardText>
          <VCardActions>
            <VBtn block color="primary" @click="addToMovieCart(movie)">Add to Cart</VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movieCart';

const cartMovieStore = useMovieStore();

// lifecycle to load movies on intiial load
onMounted(() => {
  cartMovieStore.fetchMovies();
});
const movies = computed(() => cartMovieStore.movies);
function addToMovieCart(movie) {
  if (movie.stock > 0) {
    cartMovieStore.addToCart(movie);
    console.log('Total', cartMovieStore.totalCost);
  } else {
    console.error('Movie ot of stock');
    // throw error
  }
}
</script>

<style scoped>
.ma-2 {
  margin: 16px;
}
</style>