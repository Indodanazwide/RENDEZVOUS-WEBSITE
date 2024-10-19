<template>
  <div class="menu-page">
    <section class="banner">
      <h1>Menu</h1>
    </section>

    <section class="menu-categories">
      <button v-for="category in categories" :key="category.category_id" @click="filterByCategory(category.category_id)" class="category-button">
        {{ category.category_name }}
      </button>
    </section>

    <hr class="menu-line" />

    <section class="menu-container">
      <article v-for="item in filteredMenuItems" :key="item.menu_item_id" class="menu-item">
        <img :src="`/images/menu/${item.menu_item_image}`" :alt="item.menu_item_name" class="menu-item-image"/>
        <h3>{{ item.menu_item_name }}</h3>
        <p>Price: R{{ item.menu_item_price }}</p>
        <button @click="addToCart(item)">Add to Cart</button>
      </article>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
      menuItems: [],
      filteredMenuItems: [],
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:8800/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async fetchMenuItems() {
      try {
        const response = await axios.get('http://localhost:8800/menu');
        this.menuItems = response.data;
        this.filteredMenuItems = this.menuItems;

      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    },
    filterByCategory(categoryId) {
      this.filteredMenuItems = this.menuItems.filter(
        (item) => item.category_id === categoryId
      );
    },
    addToCart(item) {
        const token = localStorage.getItem('token'); // Get the token from local storage

        if (!token) {
            alert('Please log in to add items to your cart.');
            this.$router.push('/login'); // Redirect to login if no token
            return;
        }

        // Set a default quantity if not specified (you can also make this dynamic based on user input)
        const quantity = 1; // or get it from a form/input if needed

        // Call an API to add the item to the cart
        axios.post(
            'http://localhost:8800/cart',
            { menu_item_id: item.menu_item_id, quantity }, // Include quantity
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            }
        )
        .then(() => {
            alert(`${item.menu_item_name} has been added to your cart!`);
        })
        .catch((error) => {
            console.error('Error adding item to cart:', error);
            if (error.response && error.response.status === 401) {
                alert('Session expired. Please log in again.');
                this.$router.push('/login'); // Redirect to login if unauthorized
            } else {
                alert('Failed to add item to cart. Please try again later.');
            }
        });
    }
  },
  async mounted() {
    await this.fetchCategories();
    await this.fetchMenuItems();
  },
};
</script>

<style scoped>
.menu-page section {
  margin: 0 0 4rem;
}

.menu-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2rem;
  margin-top: 4rem;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 1rem;
  height: 30rem;
  text-align: center;
  border-radius: 0.8rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
}

.menu-item-image {
  width: 100%;
  height: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.menu-item button {
  background-color: #B2A43B;
  color: #0f152c;
  padding: 0.8rem 1.2rem;
  border-radius: 3rem;
  border: transparent;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: 0.3s;
}

.menu-item button:hover {
  background-color: #78BF4B;
  color: #0f152c;
}

.menu-categories {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.menu-line {
  height: 1rem;
  width: 60%;
  margin: 0 auto 3rem 10%;
  border: transparent;
  background: linear-gradient(to right, #B2A43B 0%, #b2a43b49 50%, #b2a43b00 100%);
}

.category-button {
  background-color: #f4f4f4;
  color: #333;
  padding: 0.8rem 1.2rem;
  border-radius: 2rem;
  border: transparent;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: 0.3s;
}

.category-button:hover {
  background-color: #B2A43B;
  color: #fff;
}

.category-button:focus {
  background-color: #B2A43B;
  color: #fff;
}
</style>
