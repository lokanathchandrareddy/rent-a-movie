<template>
    <div>
      <h1>Login</h1>
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="login">Login</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const router = useRouter();
  const email = ref('');
  const password = ref('');
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