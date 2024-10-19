import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Cart from '../views/Cart.vue'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'
import Profile from '../views/Profile.vue'
import CreateReservation from '../views/CreateReservation.vue'
import ViewReservation from '../views/ViewReservation.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/menu',
        component: Menu
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/contact',
        component: Contact
    },
    {
        path: '/signin',
        component: Signin
    },
    {
        path: '/signup',
        component: Signup
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/cart',
        component: Cart
    },
    { 
        path: '/create-reservation', 
        component: CreateReservation
    },
    { 
        path: '/view-reservation', 
        component: ViewReservation
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;