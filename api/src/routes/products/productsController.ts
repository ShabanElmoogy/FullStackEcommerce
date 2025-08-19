import { Request, Response } from 'express';

export function listProducts(req: Request, res: Response) {
    res.send('Hello World!!!!!');
}

export function getProductById(req: Request, res: Response) {

    res.send('Hello World!!!!!');
}

export function createProduct(req: Request, res: Response) {
      console.log("request",req.body)
    res.send('Hello World!!!!!');
}

export function updateProduct(req: Request, res: Response) {
    res.send('Hello World!!!!!');
}

export function deleteProduct(req: Request, res: Response) {
    res.send('Hello World!!!!!');
}