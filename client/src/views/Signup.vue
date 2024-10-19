<template>
  <div class="signup-page">
    <section class="banner">
      <h1>Sign Up</h1>
    </section>

    <form @submit.prevent="signUpUser" class="signup-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit" class="signup-btn">Sign Up</button>
    </form>

    <hr class="menu-line" />

    <aside class="signup-aside">
      <p>Already have an account? <router-link to="/signin">Sign In here</router-link>.</p>
    </aside>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async signUpUser() {
      try {
        const response = await axios.post('http://localhost:8800/signup', {
          user_name: this.name,
          user_email: this.email,
          user_password: this.password,
          user_role: 'customer' // Assign role based on your form logic, default to 'customer'
        });

        // Save the JWT token in localStorage
        localStorage.setItem('token', response.data.token);

        // Redirect the user to the homepage or dashboard
        this.$router.push('/');
      } catch (error) {
        console.error('Sign Up failed:', error);
        alert('Unable to sign up');
      }
    }
  }
};
</script>

<style scoped>
.signup-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
  background-color: white;
  padding: 2rem;
  margin: 4rem 0 0 0;
  border-radius: 0.8rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

.form-group input {
  padding: 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  width: 100%;
}

.signup-btn {
  background-color: #B2A43B;
  color: #0f152c;
  padding: 0.8rem 1.2rem;
  border-radius: 3rem;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: 0.3s;
  cursor: pointer;
}

.signup-btn:hover {
  background-color: #78BF4B;
  color: #0f152c;
}

.menu-line {
  height: 1rem;
  width: 60%;
  margin: 3rem auto;
  border: transparent;
  background: linear-gradient(to right, #B2A43B 0%, #b2a43b49 50%, #b2a43b00 100%);
}

.signup-aside {
  text-align: center;
  margin-top: 2rem;
  color: #333;
}

</style>