import Client from '../database'

export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInSpecificOrder(user_id:string, order_id:string): Promise<{name: string, price: number,quantity: number,category: string, order_id: string}[]> {
    try {
      //@ts-ignore
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
}