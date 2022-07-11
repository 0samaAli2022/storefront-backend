import express , {Request, Response} from 'express';
import { User, UserStore } from '../models/user';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    const user = await store.index();
    res.json(user);
}

const show = async (req: Request, res: Response) => {
    const user = await store.show(req.body.id)
    res.json(user)
 }

 const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            id: parseInt(req.body.id),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        }

        const newUser = await store.create(user);
        res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const users_routes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
}


export default users_routes;