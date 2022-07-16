import Client from '../database';

export type Product = {
    id: number,
    name: string,
    price: number,
    category: string
}

export class ProductStore{
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get products ${error}`);
        }
    }

    async show(id:string): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot get product: ${error}`);
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            const product = result.rows[0];
            conn.release();
            return product;
        } catch (error) {
            throw new Error(`Cannot create product: ${error}`);
        }
    }

    async delete(id:string): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete product ${id} : ${error}`);
        }
    }

    async productByCategory(category:string):Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * from products where category=($1)'
            const result = await conn.query(sql,[category]);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`cannot get products by category ${error}`);
        }
    }

    async top5Products():Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT products.id,name,price,quantity as howManyTimesOrdered,category from products  INNER JOIN product_order ON products.id = product_order.product_id GROUP BY product_order.product_id,products.id, quantity ORDER BY SUM(quantity) DESC LIMIT 5 OFFSET 0'
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`cannot get products by category ${error}`);
        }
    }
}