import express , {Request, Response} from 'express';
import { Product, ProductStore } from '../models/product';
import dotenv from 'dotenv';
import { verifyAuthToken } from '../middlewares/auth';


dotenv.config();

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
    
}

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(req.params.id)
        res.json(product)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
    
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
    try {
        const products = await store.productByCategory(req.params.category);
        res.json(products);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
    
}

const products_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/category/:category',getProductsByCategory)
    app.post('/products',verifyAuthToken, create);
    app.get('/products/:id', show);
}   

export default products_routes;