<template>
    <VNavigationDrawer location="end" permanent width="300" class="elevation-4 rounded-xl"
        style="background-color: #f9f9f9;">

        <VToolbar flat class="px-4">
            <VToolbarTitle>{{ isReturnPage ? 'Return Movies' : 'Your Cart' }}</VToolbarTitle>
        </VToolbar>
        <VDivider />

        <VList dense class="py-2">
            <VListItem v-for="item in movieCart" :key="item.id" class="d-flex align-center justify-space-between">
                    <VListItemTitle class="text-body-1 font-weight-medium">
                        {{ item.title }}
                    </VListItemTitle>
                    <VListItemSubtitle v-if="!isReturnPage" class="text-caption">
                       Price: {{ item.price }}
                    </VListItemSubtitle>

                    <VListItemSubtitle v-if="!isReturnPage" class="text-caption">
                        {{ item.stock > 0 ? `${item.stock} in stock` : 'Out Of Stock' }}
                    </VListItemSubtitle>
                    <!-- Remove Button -->
                <template #append>
                    <VBtn icon flat size="small" @click="removeFromMovieCart(item.id)" class="ml-2">
                        <VIcon>mdi-delete</VIcon>
                    </VBtn>
                </template>
            </VListItem>
            

            <!-- No Items -->
            <VListItem v-if="movieCart.length === 0" class="text-center">
                <VListItemTitle class="text-body-2">No items in your {{ isReturnPage ? 'return cart' : 'cart' }}.
                </VListItemTitle>
            </VListItem>
        </VList>
        <VDivider />

        <!-- Total Cost -->
        <VListItem class="d-flex align-center justify-space-between px-4">
            <VListItemTitle v-if="!isReturnPage && movieCart.length !== 0" class="text-h6 font-weight-bold">
                Total Cost: {{ totalCost }}
            </VListItemTitle>

            <div class="d-flex justify-center my-6">
                <VBtn color="primary" :disabled="movieCart.length === 0" @click="checkoutMovies" class="ma-2">
                    {{ isReturnPage ? 'Return' : 'Checkout' }}
                </VBtn>
                <VBtn :disabled="movieCart.length === 0" @click="clearCart" class="ma-2" variant="tonal">
                    Clear Cart
                </VBtn>

            </div>
        </VListItem>
    </VNavigationDrawer>
</template>


<script setup>
// ReUsable Component for a Cart ( for both rent and Return)
import { computed } from 'vue';
import { useMovieStore } from '@/stores/movieCart'

const route = useRoute();
const movieCartStore = useMovieStore();

const { clearCart } = movieCartStore;

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