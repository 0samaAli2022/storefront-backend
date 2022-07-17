import supertest from "supertest";
import { deleteAndRestartTable } from "../../helperFunctions/helperFunctions";
import app from '../../server'

const request = supertest(app);
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwiZmlyc3RfbmFtZSI6Im1vaGFtbWVkIiwibGFzdF9uYW1lIjoiQWxpIiwicGFzc3dvcmQiOiIkMmIkMTAkMi9kVTNvLmdsREwuNmE1T1JJWXFQLlM3eThuaFd2UnNpVlNVUnhqRTMwV2ZyYTBTRmgxWVMifSwiaWF0IjoxNjU3ODk0NDQwfQ.X5MaXKf3gVFhraB-nXc3ISj5tOmtPoHV9t9s1BtZFJg'

describe('Product Handler', () => {
    it('product index endpoint', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    })

    it('product create endpoint', async () => {
        const response = await request.post('/products').send({
            "name": "milk",
            "price": 30,
            "category": "diary"
        }).set('Authorization', 'Bearer ' + TOKEN);
        expect(response.status).toBe(200);
    });

    it('products by category endpoint', async () => {
        const response = await request.get('/products/category/diary');
        expect(response.status).toBe(200);
    })

    it('products show endpoint', async () => {
        const response = await request.get('/products/1');
        expect(response.status).toBe(200);
        await deleteAndRestartTable('product_order');
        await deleteAndRestartTable('orders');
        await deleteAndRestartTable('users');
        await deleteAndRestartTable('products');
    })

})
