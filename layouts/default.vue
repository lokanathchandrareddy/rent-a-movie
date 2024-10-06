<template>
  <VApp>
    <!-- AppBar only appears when we're not on the home route (/) -->
    <VAppBar v-if="currentRoute !== '/'">
      <VAppBarNavIcon></VAppBarNavIcon>
      <VToolbarTitle>Movie Rental</VToolbarTitle>
      <VSpacer></VSpacer>

      <!-- Show navigation buttons based on the route -->
      <VBtn v-if="currentRoute === '/return'" link to="/movies">
        Movies
      </VBtn>
      <VBtn v-else link to="/return">
        Return Movies
      </VBtn>
      <div v-if="user">
      <v-btn @click="logout">Logout</v-btn>
    </div>
    </VAppBar>

    <!-- Main content with proper column span adjustments -->
    <VMain v-if="currentRoute !== '/'">
            <NuxtPage />
            <Sidebar />
    </VMain>

    <!-- Full page for homepage (/) without the AppBar or Sidebar -->
    <VMain v-else>
      <NuxtPage />
    </VMain>
  </VApp>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import { useMovieStore } from '@/stores/movieCart';

const route = useRoute();
const router = useRouter();
const movieCartStore = useMovieStore();
const supabase = useSupabaseClient();

const user = ref(null);

onMounted(() => {
  user.value = supabase.auth.getUser();
});
const currentRoute = computed(() => route.fullPath);

const showCart = ref(false);

function openCart(isReturnMode) {
  movieCartStore.setReturnMode(isReturnMode);
  showCart.value = true
}

const logout = async () => {
  await supabase.auth.signOut();
  user.value = null;
  router.push('/');
};
</script>
<style scoped>
</style>