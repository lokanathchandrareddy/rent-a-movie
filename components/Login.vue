<template>
  <VCard max-width="400" class="mx-auto my-4 py-4 px-2" elevation="3">
    <VCardTitle class="text-h5 text-center">Login</VCardTitle>

    <VCardText>
      <VForm @submit.prevent="login">
        <VTextField v-model="email" label="Email" type="email" variant="outlined" density="compact"
          prepend-inner-icon="mdi-email" :rules="[rules.required, rules.email]" />

        <VTextField v-model="password" label="Password" type="password" variant="outlined" density="compact"
          prepend-inner-icon="mdi-lock" :rules="[rules.required]" />

        <VBtn type="submit" color="primary" size="large" class="mt-4 w-100">
          Login
        </VBtn>
      </VForm>
    </VCardText>
  </VCard>
</template>


<script setup>
import { ref } from 'vue';

const router = useRouter();
const email = ref('');
const password = ref('');

const rules = {
  required: value => !!value || 'Required.',
  email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid.'
};

const supabase = useSupabaseClient();


const login = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    console.error(error.message);
  } else {
    console.log('User logged in:', data);
    router.push('/movies');
  }
};
</script>