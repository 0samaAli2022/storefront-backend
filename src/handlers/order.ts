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

const orders_routes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
}


export default orders_routes;