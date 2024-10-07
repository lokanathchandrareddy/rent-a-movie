<template>
  <VContainer fluid>
    <VRow>
      <VCol v-for="(movie, index) in movies" :key="movie.id" cols="12" sm="6" md="4">
        <VCard class="elevation-2" rounded="lg" outlined>
          <VCardTitle class="text-white" :class="index % 2 === 0 ? 'bg-primary' : 'bg-secondary'">
            {{ movie.title }}
          </VCardTitle>

          <VCardText>
            <VRow dense>
              <VCol cols="12">
                <VChip class="ma-2" color="primary" text-color="white" size="large">
                  {{ movie.genre }}
                </VChip>
                <VChip class="ma-2" color="secondary" text-color="white" size="large">
                  {{ movie.language }}
                </VChip>
              </VCol>

              <VCol cols="12">
                <VList density="compact">
                  <VListItem title="Director" :subtitle="movie.director" />
                  <VListItem title="Year of Release" :subtitle="movie.year_of_release" />
                  <VListItem v-if="!isReturnPage" title="Price" :subtitle="'$' + movie.price.toFixed(2)" />
                  <VListItem v-if="!isReturnPage" title="Stock" :subtitle="'Only ' + movie.stock + ' left'" />
                </VList>
              </VCol>
            </VRow>
          </VCardText>

          <VCardActions>
            <VSpacer />
            <VBtn color="primary" @click="addToMovieCart(movie)" prepend-icon="mdi-cart" variant="tonal" size="small">
              Add to Cart
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>


<script setup>
import { onMounted } from 'vue';
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

<style scoped></style>