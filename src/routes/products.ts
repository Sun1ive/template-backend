import { Router } from 'express';
import { getProductById, getProducts } from '../controllers/products.controllers';

export const router = Router();

router.get('/', getProducts);

router.get('/:id', getProductById);
