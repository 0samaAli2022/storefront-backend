import express, { Request, Response } from 'express'
import { verifyAuthToken } from '../middlewares/auth'

import { DashboardQueries } from '../services/dashboard'

const dashboardRoutes = (app: express.Application) => {
    app.get('/users/:user_id/orders/:order_id', verifyAuthToken, productsInSpecificOrder)
    app.get('/users/:user_id/orders', verifyAuthToken, productsInOrders)
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

export default dashboardRoutes