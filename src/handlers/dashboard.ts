import express, { Request, Response } from 'express'
import { verifyAuthToken } from '../middlewares/auth'

import { DashboardQueries } from '../services/dashboard'

const dashboardRoutes = (app: express.Application) => {
    app.get('/users/:user_id/orders/:order_id', verifyAuthToken, productsInSpecificOrder)
    app.get('/users/:user_id/orders', verifyAuthToken, productsInOrders)
    app.post('/users/:user_id/orders/:order_id/products',verifyAuthToken ,addProduct);
}

const dashboard = new DashboardQueries()

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders(_req.params.user_id);
  res.json(products);
}

const productsInSpecificOrder = async (_req: Request, res: Response) => {
    const products = await dashboard.productsInSpecificOrder(_req.params.user_id, _req.params.order_id);
    res.json(products);
}

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.order_id
  const productId: string = _req.body.product_id
  const quantity: number = parseInt(_req.body.quantity)

  try {
    const addedProduct = await dashboard.addProduct(quantity, orderId, productId)
    res.json(addedProduct)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
}

export default dashboardRoutes