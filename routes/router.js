import express from 'express';
import { deleteProfile, getProfile, signIn, signUp, updateProfile } from '../controllers/user.controller.js';
import { authenticateToken } from '../authentication/auth.js';

// router initialization
const router = express.Router();

// user routes
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.delete('/profile', authenticateToken, deleteProfile);

export default router;