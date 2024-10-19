<template>
  <div class="create-reservation-page">
    <section class="banner">
      <h1>Make Reservation</h1>
    </section>

    <form @submit.prevent="submitReservation" class="reservation-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="reservation.name" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="reservation.email" required />
      </div>

      <div class="form-group">
        <label for="date">Reservation Date:</label>
        <input type="datetime-local" id="date" v-model="reservation.date" required />
      </div>

      <div class="form-group">
        <label for="guests">Number of Guests:</label>
        <input type="number" id="guests" v-model="reservation.guests" required min="1" />
      </div>

      <div class="form-group">
        <label for="specialRequest">Special Requests:</label>
        <textarea id="specialRequest" v-model="reservation.specialRequest"></textarea>
      </div>

      <button type="submit" class="submit-btn">Submit Reservation</button>
    </form>
    
    <div v-if="message" class="message">{{ message }}</div>
    
    <hr class="menu-line" />

    <p class="reservation-link">
      <router-link to="/view-reservation" class="make-reservation-btn">View reservation</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      reservation: {
        name: '',
        email: '',
        date: '',
        guests: 1,
        specialRequest: '',
      },
      message: '',
    };
  },
  methods: {
    async submitReservation() {
      console.log(this.reservation); // Log the reservation data to check if all fields are filled
      try {
        const response = await axios.post('http://localhost:8800/reservations', this.reservation);
        this.message = response.data.message; // Display success message
        this.resetForm(); // Reset the form
      } catch (error) {
        console.error('Error submitting reservation:', error);
        this.message = 'Failed to create reservation. Please try again later.'; // Display error message
      }
    },
    resetForm() {
      this.reservation = {
        name: '',
        email: '',
        date: '',
        guests: 1,
        specialRequest: '',
      };
    },
  },
};
</script>

<style scoped>
.create-reservation-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reservation-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 500px;
  background-color: white;
  padding: 2rem;
  margin: 4rem 0 2rem;
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

.form-group input,
.form-group textarea {
  padding: 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  width: 100%;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.menu-line {
  height: 1rem;
  width: 60%;
  margin: 3rem auto;
  border: transparent;
  background: linear-gradient(to right, #B2A43B 0%, #b2a43b49 50%, #b2a43b00 100%);
}

.submit-btn {
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

.submit-btn:hover {
  background-color: #78BF4B;
  color: #0f152c;
}

.message {
  margin-top: 2rem;
  font-size: 1.2rem;
  color: green;
  text-align: center;
}

.make-reservation-btn {
  background-color: #B2A43B;
  color: #0f152c;
  padding: 0.8rem 1.5rem;
  border-radius: 3rem;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: 0.3s;
}

.make-reservation-btn:hover {
  background-color: #78BF4B;
  color: #0f152c;
}
</style>