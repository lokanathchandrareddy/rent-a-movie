<template>
    <VContainer>
      <VRow>
        <VCol
          cols="12"
          sm="6"
          md="4"
          v-for="movie in rentedMovies"
          :key="movie.id"
        >
          <VCard>
            <VCardTitle>{{ movie.title }}</VCardTitle>
            <VCardText>
              Quantity Rented: {{ movie.quantity }}
            </VCardText>
            <VCardActions>
              <VBtn color="primary" @click="addToRentedCart(movie)">
                Add to Return Cart
              </VBtn>
            </VCardActions>
          </VCard>
        </VCol>
    </VRow>
    </VContainer>
</template>
<script setup>
import { computed } from 'vue';
import { useMovieStore} from '@/stores/movieCart';

const movieCartStore = useMovieStore();

const rentedMovies = computed(() => movieCartStore.rentedItems);

function addToRentedCart(movie) {
    movieCartStore.addToCart(movie);
}
</script>