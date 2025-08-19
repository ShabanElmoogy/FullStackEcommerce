import { Request, Response } from 'express';
import { db } from '../../db/index';
import { productsTable } from '../../db/productSchema';
import { eq } from 'drizzle-orm';

export async function listProducts(req: Request, res: Response) {
    try {
        const products = await db.select().from(productsTable);
        res.json(products);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function getProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const productId = Number(id);
        const product = await db.select().from(productsTable).where(eq(productsTable.id, productId)).limit(1);
        if (product.length === 0) {
            return res.status(404).send('Product not found');
        }
        res.json(product[0]);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function createProduct(req: Request, res: Response) {
    try {
        const [product] = await db.insert(productsTable).values(req.body).returning();
        res.status(201).send(product);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const productId = Number(id);
        const [updatedProduct] = await db.update(productsTable).set(req.body).where(eq(productsTable.id, productId)).returning();
        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }
        res.json(updatedProduct);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const productId = Number(id);
        const result = await db.delete(productsTable).where(eq(productsTable.id, productId));
        if (result.rowCount === 0) {
            return res.status(404).send('Product not found');
        }
        res.status(204).send();
    } catch (error) {
        return res.status(500).send(error);
    }
}