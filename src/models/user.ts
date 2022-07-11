import Client from "../database";

export type User = {
    id: number,
    first_name: string,
    last_name: string,
    password: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get users ${error}`);
        }
    }

    async show(id:string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot get user ${error}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [u.first_name, u.last_name, u.password]);
            const product = result.rows[0];
            const sql1='DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART 1;';
            conn.query(sql1);
            conn.release();
            return product;
        } catch (error) {
            throw new Error(`Cannot create user ${error}`);
        }
    }
}