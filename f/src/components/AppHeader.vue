<template>
    <header>
      <nav>
        <router-link to="/">Landing Page</router-link>
        <router-link v-if="isAuthenticated" to="/notes">Notes</router-link>
        <div v-if="isAuthenticated">Welcome, {{ username }}</div>
        <button @click="handleAuthAction">{{ isAuthenticated ? 'Logout' : 'Login' }}</button>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'AppHeader',
    computed: {
      isAuthenticated() {
        // Your logic to check authentication status (e.g., using Vuex or localStorage)
        return localStorage.getItem('token') !== null;
      },
      username() {
        // Logic to get the username if authenticated
        return localStorage.getItem('username');
      },
    },
    methods: {
      handleAuthAction() {
        if (this.isAuthenticated) {
          // Perform logout action
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          this.$router.push('/');
        } else {
          // Redirect to sign-in page
          this.$router.push('/signin');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your component-specific styles here */
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  
  button {
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  
  