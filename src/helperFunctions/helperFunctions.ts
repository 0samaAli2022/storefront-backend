import client from "../database";

export async function deleteAndRestartTable(table:string):Promise<void>{
    const conn = await client.connect();
    const sql = `DELETE FROM ${table}; ALTER SEQUENCE ${table}_id_seq RESTART WITH 1;`;
    await conn.query(sql);
}