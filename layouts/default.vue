<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Rent a Movie</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn>
        Return
      </v-btn>
      <v-btn @click="toggleCart">
        Cart
      </v-btn>
    </v-app-bar>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const showCart = ref(false);

function toggleCart() {
  showCart.value = !showCart.value;
}
</script>