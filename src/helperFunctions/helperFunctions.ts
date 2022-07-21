import client from "../database";

export async function deleteAndRestartTable(table:string):Promise<void>{
    try {
        const conn = await client.connect();
        var sql = `DELETE FROM ${table}; ALTER SEQUENCE ${table}_id_seq RESTART WITH 1;`;
        await conn.query(sql);
        conn.release();
    } catch (error) {
        throw new Error(`couldn't delete and restart table ${error}`);
    }
    
}