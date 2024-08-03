import express from 'express';

// json object
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../controller/productController.js';
const router = express.Router();

// because router require call back func but got a object [Promise] => don't need to use createProduct() 

router.post('/create', createProduct)
 
 
router.delete('/delete/:id', deleteProduct)
 
router.put('/update/:id', updateProduct)
 
router.get('/getAllProducts', getAllProducts)
 

export default router;