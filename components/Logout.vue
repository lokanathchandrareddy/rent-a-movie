<template>
    <button @click="logout">Logout</button>
  </template>
  
  <script setup>
  const supabase = useSupabaseClient();
  
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error.message);
    } else {
      console.log('User logged out');
    }
  };
  </script>
  