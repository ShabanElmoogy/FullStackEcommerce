import { Router } from 'express';
import { listProducts, getProductById, createProduct, updateProduct, deleteProduct } from './productsController.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import { createProductSchema, updateProductSchema } from '../../db/productSchema.js';
import { z } from 'zod';
import { verifyToken } from '../../middlewares/authMiddleware.js';
import { Role } from '../../enums/role.js'

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductById);
router.post('/', verifyToken([Role.ADMIN]), validateData(createProductSchema), createProduct);
router.put('/:id', verifyToken([Role.ADMIN]),validateData(updateProductSchema), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
