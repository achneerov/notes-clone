<template>
    <div class="signin-page">
      <h1>Sign In</h1>
      <!-- Your sign-in form here -->
      <button @click="signIn">Sign In</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignInPage',
    methods: {
      signIn() {
        // Your sign-in logic here
        // On successful sign-in, redirect to notes page
        this.$router.push('/notes');
      },
    },
  }
  </script>
  
  <style scoped>
  /* Your component-specific styles here */
  </style>
  