<template>
    <VNavigationDrawer location="end" permanent>
        <VToolbar flat>
            <VToolbarTitle>{{ isReturnPage === '' ? 'Return Movies' : 'Your Cart' }}</VToolbarTitle>
        </VToolbar>
        <VDivider></VDivider>
        <VList>
            <VListItem v-for="item in movieCart" :key="item.id">
                <VListItemTitle>
                    {{ item.title }}
                </VListItemTitle>
                <VListItemSubtitle v-if="!isReturnMode"> {{ item.stock > 0 ? `${item.stock} in stock` : 'Out Of Stock'
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
            <VListItemTitle v-if="!isReturnMode"> Total Cost: {{ totalCost }} </VListItemTitle>
        </VListItem>
        <VBtn color="primary" @click="checkoutMovies">{{ isReturnPage ? 'Return Movies' : 'Checkout' }}</VBtn>
    </VNavigationDrawer>
</template>

<script setup>
// ReUsable Component for a Cart ( for both rent and Return)
import { computed } from 'vue';
import { useMovieStore } from '@/stores/movieCart'

const route = useRoute();
const movieCartStore = useMovieStore();

const isReturnPage = computed(() => route.fullPath === '/return');
const movieCart = computed(() => movieCartStore.movieItems);
const totalCost = computed(() => movieCartStore.totalCost);

function removeFromMovieCart(id) {
    movieCartStore.removeFromCart(id);
}

function checkoutMovies() {
    if (isReturnPage.value) {
        // for return
        movieCartStore.returnMovies();
        movieCartStore.clearCart();
        console.log("return completed");
        alert('Movies returned successfully.');
    } else {
        // for checkout
        movieCartStore.checkout();
        movieCartStore.clearCart();
        console.log("check out completed");
        alert('Checkout successful.');
    }
}
</script>