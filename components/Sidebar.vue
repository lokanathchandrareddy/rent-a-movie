<template>
    <VNavigationDrawer location="end" permanent>
        <VToolbar flat>
            <VToolbarTitle>{{ isReturnPage ? 'Return Movies' : 'Your Cart' }}</VToolbarTitle>
        </VToolbar>
        <VDivider></VDivider>
        <VList>
            <VListItem v-for="item in movieCart" :key="item.id">
                <VListItemTitle>
                    {{ item.title }}
                </VListItemTitle>
                <VListItemSubtitle v-if="!isReturnPage"> {{ item.stock > 0 ? `${item.stock} in stock` : 'Out Of Stock'
                    }}</VListItemSubtitle>
                <template #append>
                    <VBtn flat size="x-small" @click="removeFromMovieCart(item.id)">
                        Remove
                    </VBtn>
                </template>
            </VListItem>
        </VList>
        <VDivider />
        <VListItem>
            <VListItemTitle v-if="!isReturnPage"> Total Cost: {{ totalCost }} </VListItemTitle>
        </VListItem>
        <VBtn color="primary" @click="checkoutMovies">{{ isReturnPage ? 'Return Cart' : 'Checkout' }}</VBtn>
    </VNavigationDrawer>
</template>

<script setup>
// ReUsable Component for a Cart ( for both rent and Return)
import { computed } from 'vue';
import { useMovieStore } from '@/stores/movieCart'

const route = useRoute();
const movieCartStore = useMovieStore();

const isReturnPage = computed(() => route.path === '/return');
const movieCart = computed(() => movieCartStore.movieItems);
const totalCost = computed(() => movieCartStore.totalCost);

function removeFromMovieCart(id) {
    movieCartStore.removeFromCart(id);
}

const checkoutMovies = async () => {
  const user = useSupabaseUser();
  if (user.value) {
  if (isReturnPage.value) { 
    await movieCartStore.returnMovies(user.value.id);
    alert('Movies returned successfully.');
  }
  else {
    await movieCartStore.checkout(user.value.id);
    alert('Movie Checkout successful.');
  }
    
  }
};
</script>