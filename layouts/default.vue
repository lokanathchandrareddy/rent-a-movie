<template>
  <VApp>
    <VAppBar v-if="currentRoute!=='/'">
      <VAppBarNavIcon></VAppBarNavIcon>
      <VToolbarTitle>Movie Rental</VToolbarTitle>
      <VSpacer></VSpacer>

      <!-- Show Navigatable buttons based on the route -->
      <VBtn v-if="currentRoute === '/return'" link to="/movies" @click="openCart(true)">
        Movies
      </VBtn>
      <VBtn v-else link to="/return">
        Return Movies
      </VBtn>
      <div v-if="user">
      <v-btn @click="logout">Logout</v-btn>
    </div>
    </VAppBar>
    <v-main v-if="currentRoute='/'">
      <NuxtPage />
    </v-main>
    <VMain v-else>
      <VContainer fluid>
        <VRow>
          <VCol cols="12">
            <NuxtPage />
          </VCol>
          <VCol cols="3">
            <!-- Sidebar is always visible here -->
            <Sidebar />
          </VCol>
        </VRow>
      </VContainer>
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
.v-main {
  overflow: hidden;
}
</style>