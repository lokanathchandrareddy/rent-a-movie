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
              <VBtn block border color="primary">Rent Now</VBtn>
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const movies = ref([]);
  
  onMounted(async () => {
    try {
      const response = await fetch('/Movies.json');
      if (!response.ok) {
        throw new Error('Failed to load');
      }
      const data = await response.json();
      movies.value = data;
    } catch (error) {
      console.error('Error loading movie data:', error);
    }
  });
  </script>
  
  <style scoped>
  .ma-2 {
    margin: 16px;
  }
  </style>