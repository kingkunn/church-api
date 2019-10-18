import express from "express";
import controller from '../controllers'
// import cors from 'cors';

const AuthController = controller.auth
const router = express.Router();

// login route
router.post('/api/v1/login', AuthController.login)

// register route
router.post('/api/v1/register', AuthController.register)

export default router;