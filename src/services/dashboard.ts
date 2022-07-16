import Client from '../database'

 export type product_order = {
  id:number, 
  quantity:number, 
  order_id:number, 
  product_id:number
}


export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInSpecificOrder(user_id:string, order_id:string): Promise<{name: string, price: number,quantity: number,category: string, order_id: string}[]> {
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

  async productsInOrders(user_id:string): Promise<{name: string, price: number,quantity: number,category: string, order_id: string}[]> {
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