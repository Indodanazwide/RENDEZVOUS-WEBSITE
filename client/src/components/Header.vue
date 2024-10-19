<template>
    <header>
        <!-- navbrand -->
        <img src="../assets/images/png/brand-logo.png" alt="Rendezvous Restaurant" class="navbar-brand-logo"/>

        <!-- navigation -->
        <Navigation />
    </header>
</template>

<script>
import Navigation from './Navigation.vue'

export default {
    components: {
        Navigation,
    }
}
</script>

<style scoped>
.navbar-brand-logo {
  width: 3.5rem;
}
</style>
