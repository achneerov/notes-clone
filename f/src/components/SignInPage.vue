<template>
    <div class="signin-page">
      <h1>Sign In</h1>
      <form @submit.prevent="signIn">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="formData.username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="formData.password" required>
        </div>
        <button type="submit">Sign In</button>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SignInPage',
    data() {
      return {
        formData: {
          username: '',
          password: '',
        },
        errorMessage: '', // Initialize error message
      };
    },
    methods: {
      async signIn() {
        try {
          const response = await axios.post('http://localhost:3000/api/login', this.formData);
          const token = response.data.token;
          localStorage.setItem('token', token);
          this.$router.push('/notes');
        } catch (error) {
          if (error.response && error.response.status === 401) {
            this.errorMessage = 'Wrong username or password. Please try again.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
          console.error('Sign in error:', error.response.data.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your component-specific styles here */
  .signin-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error-message {
    margin-top: 10px;
    color: red;
    font-size: 14px;
  }
  </style>
  