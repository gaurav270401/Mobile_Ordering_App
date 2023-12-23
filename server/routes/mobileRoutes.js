// routes/mobileRoutes.js

import express,{Router} from "express";
import {  addMobileById, getAllCartItems, getAllMobiles, getMobileById, removeCartItem, searchMobiles } from "../controllers/mobilcontroller.js";
import { changeQuantity } from "../controllers/cartController.js";
import { addMyorders, getMyorders } from "../controllers/orderController.js";
const router =express.Router();


router.get('/orders',getMyorders);
router.get('/cartitems', getAllCartItems);

router.get('/', getAllMobiles);
router.get('/search', searchMobiles);
router.get('/:id', getMobileById);

router.post('/cart/add/:id', addMobileById);
router.post('/cart/change-quantity/:name',changeQuantity);
router.delete('/cart/remove-item/:name',removeCartItem);
router.post('/orders',addMyorders);

// // Update mobile by ID
// router.put('/:id', updateMobileById);

// // Delete mobile by ID
// router.delete('/:id',deleteMobileById);

export default router;
