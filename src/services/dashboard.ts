import Client from '../database'
import { Product } from '../models/product'

 export type product_order = {
  id:number, 
  quantity:number, 
  order_id:number, 
  product_id:number
}


export class DashboardQueries {
  // Get all products that have been included in orders
  async top5Products():Promise<{id: number,name:string,price:number,howmanytimesordered:number,category:string}[]> {
    try {
        const conn = await Client.connect();
        const sql = 'SELECT products.id,name,price,quantity as howManyTimesOrdered,category from products INNER JOIN product_order ON products.id = product_order.product_id GROUP BY product_order.product_id,products.id, quantity ORDER BY SUM(quantity) DESC LIMIT 5 OFFSET 0'
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    } catch (error) {
        throw new Error(`cannot get top 5 products ${error}`);
    }
  }

  async productsInSpecificOrder(user_id:string, order_id:string): Promise<{name: string, price: number,quantity: number,category: string, order_id: number}[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT name, price, quantity, category, order_id FROM products INNER JOIN product_order ON products.id = product_order.product_id WHERE order_id=(SELECT id FROM orders WHERE user_id=($1) and order_id=($2));'

      const result = await conn.query(sql,[user_id, order_id])

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    } 
  }

  async productsInOrders(user_id:string): Promise<{name: string, price: number,quantity: number,category: string, order_id: number}[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT name, price, quantity, category, order_id FROM products INNER JOIN product_order ON products.id = product_order.product_id WHERE order_id = (SELECT id FROM orders WHERE user_id=($1))'

      const result = await conn.query(sql,[user_id])

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    } 
  }

  async addProduct(quantity: number, orderId: string, productId: string): Promise<product_order> {
    try {
      const sql = 'INSERT INTO product_order(quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [quantity, parseInt(orderId), parseInt(productId)])
      const order:product_order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    }
  }
}