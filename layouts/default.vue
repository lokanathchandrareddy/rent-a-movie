<template>
  <VApp>
<!-- AppBar only appears when we're not on the home route (/) -->
    <VAppBar v-if="currentRoute !== '/'" color="primary" dark elevate-on-scroll>
      <VToolbarTitle class="font-weight-bold">
        Rent A Movie
      </VToolbarTitle>
      <VSpacer />
      <!-- Show navigation buttons based on the route -->
      <VBtn v-if="currentRoute === '/return'" to="/movies" text class="mx-2">
        Movies
      </VBtn>
      <VBtn v-else to="/return" text class="mx-2">
        Return Movies
      </VBtn>

      <!-- User Avatar and Logout -->
      <div v-if="user">
        <VMenu offset-y>
          <template #activator="{ props }">
            <VAvatar v-bind="props" color="secondary" class="mx-2">
              {{ userInitials }}
            </VAvatar>
          </template>
          <VList width="200">
            <VListItem prepend-icon="mdi-logout" @click="logout">
              <VListItemTitle>Logout</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </div>
    </VAppBar>

    <!-- Main Content -->
    <VMain>
      <NuxtPage />
      <!-- Include Sidebar if needed -->
      <Sidebar v-if="currentRoute !== '/'" />
    </VMain>
  </VApp>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';

const route = useRoute();
const router = useRouter();

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const currentRoute = computed(() => route.fullPath);

const userInitials = computed(() => { // for avatar
  if (user.value && user.value.email) {
    return user.value.email
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }
  return '';
});

const logout = async () => {
  await supabase.auth.signOut();
  user.value = null;
  router.push('/');
};
</script>