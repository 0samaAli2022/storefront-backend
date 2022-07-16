import Client from "../database";

export type Order = {
    id: number,
    user_id: number,
    statusoforder:string
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get orders ${error}`);
        }
    }

    async show(id:string): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot get order ${error}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (user_id, statusOfOrder) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [o.user_id, o.statusoforder,]);
            const product = result.rows[0];
            conn.release();
            return product;
        } catch (error) {
            throw new Error(`Cannot create order ${error}`);
        }
    }

    async delete(id:string): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete product ${id} : ${error}`);
        }
    }
}