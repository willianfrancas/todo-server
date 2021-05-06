import express from 'express';
import AuthController from '../controllers/AuthController.js';
import ListController from '../controllers/ListController.js';

const router = express.Router();

router.use(AuthController.checkToken);
router.get('/list', ListController.loadItems);
router.post('/list/item-new', ListController.newItem);
router.put('/list/item', ListController.updateItem);

export default router;
// module.exports = router;