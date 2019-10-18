import express from "express";
import controller from '../controllers'
// import cors from 'cors';

const router = express.Router();

// login route
router.post('/api/v1/file/upload', controller.imageUpload)

export default router;