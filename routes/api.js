import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

router.use(AuthController.checkToken);

export default router;
// module.exports = router;