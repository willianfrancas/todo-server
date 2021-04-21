import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

router.use(AuthController.checkToken);
router.get('/user', AuthController.userData);
router.post('/user', AuthController.saveUser);

export default router;
// module.exports = router;