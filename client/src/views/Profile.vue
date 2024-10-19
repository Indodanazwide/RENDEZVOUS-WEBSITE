<template>
  <div class="profile-page">
    <section class="banner">
      <h1>PROFILE</h1>
    </section>

    <section class="profile">
      <article v-if="user" class="profile-details">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
      </article>

      <hr class="menu-line" />

      <button @click="logout" class="logout-btn">Logout</button>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null,
    };
  },
  async mounted() {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const response = await axios.get('http://localhost:8800/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(token)
            console.log('The data is: ', response.data);
            this.user = response.data;
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        this.$router.push('/signin');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      this.$router.push('/signin');
    },
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0 0;
}

.profile-details {
  background-color: white;
  padding: 2rem;
  border-radius: 0.8rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
  text-align: left;
  width: 100%;
  max-width: 400px;
}

.profile-details p {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #333;
}

.profile-details strong {
  color: #B2A43B;
}

.logout-btn {
  background-color: #B2A43B;
  color: #0f152c;
  padding: 0.8rem 1.2rem;
  border-radius: 3rem;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  margin-top: 2rem;
  transition: 0.3s;
  cursor: pointer;
}

.logout-btn:hover {
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
</style>