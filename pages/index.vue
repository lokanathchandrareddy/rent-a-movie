<template>
  <VContainer fluid class="fill-height">
    <VRow align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12" md="6">
            <h1>Welcome</h1>
            <p class="text-medium-emphasis">Ready to rent some movies?</p>

            <!-- <div class="mt-5">
              <VBtn rounded="xs" color="blue" to="/movies" block min-height="44">Rent Movies</VBtn>
            </div> -->
            <Login />

          </VCol>
        </VRow>
      </VCol>
      <VCol class="hidden-md-and-down fill-height" md="6" lg="7">
        <VImg src="/movie-with-popcorn.webp" cover class="h-100 rounded-xl d-flex align-center justify-center" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import Login from '~/components/Login.vue';
// Setup code 
</script>
