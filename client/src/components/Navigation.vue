<template>
  <nav>
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/menu">Menu</RouterLink></li>
      <li><RouterLink to="/about">About</RouterLink></li>
      <li><RouterLink to="/contact">Contact</RouterLink></li>
    </ul>

    <ul>
      <li>
        <RouterLink to="/profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </RouterLink>
      </li>
      <li class="nav-cta-btn">
        <RouterLink to="/view-reservation">Reservation</RouterLink>
      </li>
    </ul>

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 hamburger">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>

  </nav>
</template>

<style scoped>
nav,
nav ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav ul li {
  margin-inline: 1rem;
}

nav ul li a {
  color: #0f152c;
}

nav ul li a:hover {
  color: #78BF4B;
}

nav ul {
  margin-inline: 2rem;
}

.hamburger {
  display: none;
}

.nav-cta-btn a {
  background-color: #B2A43B;
  color: #0f152c;
  padding: 0.8rem 1.2rem;
  border-radius: 3rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: 0.3s;
}

.nav-cta-btn a:hover {
  background-color: #78BF4B;
  color: #0f152c;
}

.cartlink svg {
  transition: transform 0.5s;
}

.cartlink:hover svg {
  transform: scale(1.2);
}
</style>
