import express , {Request, Response} from 'express';
import { Order, OrderStore } from '../models/order';
import dotenv from 'dotenv';
import  jwt  from 'jsonwebtoken';
import { verifyAuthToken } from '../middlewares/auth';

dotenv.config();

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    const orders = await store.index();
    res.json(orders);
}

const show = async (req: Request, res: Response) => {
    const order = await store.show(req.body.id)
    res.json(order)
 }

 const currentOrderByUser = async (req: Request, res: Response) => {
    const order = await store.show(req.body.id)
    res.json(order)
 }

 const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            id: parseInt(req.body.id),
            user_id: req.body.user_id,
            statusoforder: req.body.statusoforder,
        }
        const newOrder = await store.create(order);
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.order_id
    const productId: string = _req.body.product_id
    const quantity: number = parseInt(_req.body.quantity)
  
    try {
      const addedProduct = await store.addProduct(quantity, orderId, productId)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
  } 

const orders_routes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.get('/orders/:user_id',verifyAuthToken, currentOrderByUser);
    app.post('/orders', create);
    app.post('/users/:user_id/orders/:order_id/products',verifyAuthToken ,addProduct);
}


export default orders_routes;