<template>
  <div class="view-reservations-page">
    <section class="banner">
      <h1>Make Reservation</h1>
    </section>

    <section v-if="reservations.length === 0" class="empty-reservations">
      <p>No reservations found.</p>
    </section>

    <ul v-else class="reservations-list">
      <li v-for="reservation in reservations" :key="reservation.reservation_id" class="reservation-item">
        <p><strong>Name:</strong> {{ reservation.reservation_name }}</p>
        <p><strong>Email:</strong> {{ reservation.reservation_email }}</p>
        <p><strong>Date:</strong> {{ new Date(reservation.reservation_date).toLocaleString() }}</p>
        <p><strong>Guests:</strong> {{ reservation.reservation_guests }}</p>
        <p><strong>Special Request:</strong> {{ reservation.reservation_special_request }}</p>
        <button @click="deleteReservation(reservation.reservation_id)" class="cancel-btn">Cancel</button>
      </li>
    </ul>

    <hr class="menu-line" />

    <p class="reservation-link">
      <router-link to="/create-reservation" class="make-reservation-btn">Make reservation</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      reservations: [],
    };
  },
  async mounted() {
    await this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      try {
        const response = await axios.get('http://localhost:8800/reservations');
        this.reservations = response.data; // Set the reservations from the response
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    },
    async deleteReservation(reservation_id) {
      try {
        await axios.delete(`http://localhost:8800/reservations/${reservation_id}`);
        this.fetchReservations(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting reservation:', error);
      }
    },
  },
};
</script>

<style scoped>
.view-reservations-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15vh 0;
}

.empty-reservations {
  text-align: center;
  font-size: 1.5rem;
  color: #666;
}

.reservations-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 800px;
  margin-top: 2rem;
}

.reservation-item {
  background-color: white;
  padding: 2rem;
  border-radius: 0.8rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
}

.reservation-item p {
  margin-bottom: 0.5rem;
  color: #333;
}

.cancel-btn {
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

.cancel-btn:hover {
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

.reservation-link {
  margin-top: 2rem;
  display: flex;
  align-items: center;
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
