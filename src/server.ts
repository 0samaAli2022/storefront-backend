import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import products_routes from './handlers/product';
import users_routes from './handlers/user';
import orders_routes from './handlers/order';
import dashboardRoutes from './handlers/dashboard';
import cors from 'cors';

const app: express.Application = express();
const address = 'http://localhost:3000';

const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});


users_routes(app);
products_routes(app);
orders_routes(app);
dashboardRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});

export default app