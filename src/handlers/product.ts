import express , {Request, Response} from 'express';
import { Product, ProductStore } from '../models/product';
import dotenv from 'dotenv';
import { verifyAuthToken } from '../middlewares/auth';


dotenv.config();

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
}

const show = async (req: Request, res: Response) => {
    const product = await store.show(req.params.id)
    res.json(product)
 }

 const create = async (req: Request, res: Response) => {

    const product: Product = {
        id: parseInt(req.body.id),
        name: req.body.name,
        price: parseInt(req.body.price),
        category: req.body.category
    }

    try {
        const newProduct = await store.create(product);
        res.json(newProduct)
        
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const getProductsByCategory = async (req: Request, res: Response) => {
    const products = await store.productByCategory(req.params.category);
    res.json(products);
}

const getTop5Orders = async (req: Request, res: Response) => {
    const products = await store.top5Products();
    res.json(products);
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const products_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/top5products', getTop5Orders)
    app.get('/products/category/:category',getProductsByCategory)
    app.post('/products',verifyAuthToken, create);
    app.get('/products/:id', show);
    app.delete('/products', destroy);
}   

export default products_routes;