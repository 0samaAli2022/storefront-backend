import express , {Request, Response} from 'express';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
}

const show = async (req: Request, res: Response) => {
    const product = await store.show(req.body.id)
    res.json(product)
 }

 const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            id: parseInt(req.body.id),
            name: req.body.name,
            price: parseInt(req.body.price),
            category: req.body.category
        }

        const newProduct = await store.create(product);
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const products_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
    app.delete('/products', destroy);
}


export default products_routes;