import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import products_routes from './handlers/product';

const app: express.Application = express();
const address = 'http://localhost:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

products_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
