import express from 'express';
import { deleteProfile, getProfile, signIn, signUp, updateProfile } from '../controllers/user.controller.js';
import { authenticateToken } from '../authentication/auth.js';
import { addItemToCart, getCartItems, getCategories, getMenuItemById, getMenuItems, getMenuItemsByCategory, removeItemFromCart, updateCartItem } from '../controllers/menu.controller.js';
import { cancelReservation, createReservation, getReservations, updateReservation } from '../controllers/reservation.controller.js';

// router initialization
const router = express.Router();

// user routes
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.delete('/profile', authenticateToken, deleteProfile);

// menu routes
router.get('/categories', getCategories);

router.get('/menu', getMenuItems);
router.get('/menu/:menu_item_id', getMenuItemById);
router.get('/menu/category/:category_id', getMenuItemsByCategory);

router.get('/cart', authenticateToken, getCartItems);
router.post('/cart', authenticateToken, addItemToCart);
router.put('/cart/:cart_id', authenticateToken, updateCartItem);
router.delete('/cart/:menu_item_id', authenticateToken, removeItemFromCart);

// reservation
router.get('/reservations', getReservations);
router.post('/reservations', createReservation);
router.put('/reservations/:reservation_id', updateReservation);
router.delete('/reservations/:reservation_id', cancelReservation);

export default router;