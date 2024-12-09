import { Router } from 'express';
import productController from '../controllers/productController.js'; // Correct import for default export

const productRoutes = Router();

productRoutes.get('/', productController.getAllProducts);
productRoutes.get('/color', productController.getColorCodes);
productRoutes.get('/category', productController.getCategoryCodes);

export default productRoutes;