<template>
  <div class="cart-page">
    <section class="banner">
      <h1>CART</h1>
    </section>

    <section v-if="cartItems.length === 0" class="empty-cart">
      <p>Your cart is empty.</p>
    </section>

    <section v-else class="cart-container">
      <article v-for="item in cartItems" :key="item.menu_item_id" class="cart-item">
        <img :src="`/images/menu/${item.menu_item_image}`" :alt="item.menu_item_name" class="cart-item-image"/>
        <h3>{{ item.menu_item_name }}</h3>
        <p>Price: R{{ item.menu_item_price }}</p>
        <p>Quantity: {{ item.quantity }}</p>
        <button @click="removeFromCart(item.menu_item_id)" class="remove-btn">Remove</button>
      </article>
    </section>
    
    <hr class="menu-line" />

    <section class="order">
      <p><strong>Total: R{{ totalPrice }}</strong></p>
      
      <br>
      
      <button class="total order-button">
        <strong>Order</strong>
      </button>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + item.menu_item_price * item.quantity;
      }, 0);
    },
  },
  async mounted() {
    await this.fetchCartItems();
  },
  methods: {
    async fetchCartItems() {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Please log in to view your cart.');
        this.$router.push('/signin'); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.get('http://localhost:8800/cart', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        this.cartItems = response.data; // Assuming the response contains the cart items
      } catch (error) {
        console.error('Error fetching cart items:', error);
        alert('Failed to fetch cart items. Please try again later.');
      }
    },
    async removeFromCart(menuItemId) {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Please log in to remove items from your cart.');
        this.$router.push('/signin'); // Redirect to login if no token
        return;
      }

      try {
        await axios.delete(`http://localhost:8800/cart/${menuItemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Remove the item from the cartItems array
        this.cartItems = this.cartItems.filter(item => item.menu_item_id !== menuItemId);
        alert('Item removed from cart successfully!');
      } catch (error) {
        console.error('Error removing item from cart:', error);
        alert('Failed to remove item from cart. Please try again later.');
      }
    },
  },
};
</script>

<style scoped>
.cart-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2rem;
  padding: 0 2rem;
  margin-top: 2rem;
}

.cart-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 1rem;
  height: auto;
  text-align: center;
  border-radius: 0.8rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
}

.cart-item-image {
  width: 100%;
  height: 10rem;
  object-fit: cover;
  margin-bottom: 1rem;
}

.cart-item h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.cart-item p {
  margin-bottom: 1rem;
  color: #666;
}

.remove-btn {
  background-color: #B2A43B;
  color: #0f152c;
  padding: 0.8rem 1.2rem;
  border-radius: 3rem;
  border: transparent;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: 0.3s;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #78BF4B;
  color: #0f152c;
}

.total {
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  padding-top: 2rem;
}

.order {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.order-button {
  background-color: #B2A43B;
  color: #0f152c;
  padding: .5rem 2rem;
  border-radius: 3rem;
  border: transparent;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: 0.3s;
  cursor: pointer;
}

.order-button:hover {
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

.empty-cart {
  text-align: center;
  font-size: 1.5rem;
  color: #666;
}
</style>
