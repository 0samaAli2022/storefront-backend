import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const {
    SALT_ROUNDS,
    BCRYPT_PASSWORD
} = process.env;


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

            const hash = bcrypt.hashSync( u.password + BCRYPT_PASSWORD , parseInt((SALT_ROUNDS as unknown) as string));

            const result = await conn.query(sql, [u.first_name, u.last_name, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (error) {
            throw new Error(`Cannot create user ${error}`);
        }
    }

    async authenticate (first_name:string, password:string) : Promise<User | null> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT password FROM users WHERE first_name=($1)";
            const result = await conn.query(sql,[first_name]);

        if(result.rows.length){
            const user = result.rows[0];
            if(bcrypt.compareSync(password+BCRYPT_PASSWORD, user.password )){
                return user;
            }
        }
        return null;
        } catch (error) {
            throw new Error(`couldn\'t authinticate ${error}`)
        }   
    }
}