import supertest from "supertest";
import { deleteAndRestartTable } from "../../helperFunctions/helperFunctions";
import app from '../../server'

const request = supertest(app);
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwiZmlyc3RfbmFtZSI6Im1vaGFtbWVkIiwibGFzdF9uYW1lIjoiQWxpIiwicGFzc3dvcmQiOiIkMmIkMTAkMi9kVTNvLmdsREwuNmE1T1JJWXFQLlM3eThuaFd2UnNpVlNVUnhqRTMwV2ZyYTBTRmgxWVMifSwiaWF0IjoxNjU3ODk0NDQwfQ.X5MaXKf3gVFhraB-nXc3ISj5tOmtPoHV9t9s1BtZFJg'

describe('User Handler', () => {
    it('root endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    })

    it('user index endpoint', async () => {
        const response = await request.get('/users').set('Authorization', 'Bearer ' + TOKEN);
        expect(response.status).toBe(200);
    })

    it('user show endpoint', async () => {
        const response = await request.get('/users/1').set('Authorization', 'Bearer ' + TOKEN);
        expect(response.status).toBe(200);
    })

    it('user create endpoint', async () => {
        const response = await request.post('/users/signup').send({
            "first_name": "osama",
            "last_name": "ali",
            "password": "12345"
        });
        expect(response.status).toBe(200);
        deleteAndRestartTable('product_order');
        deleteAndRestartTable('orders');
        deleteAndRestartTable('users');
        deleteAndRestartTable('products');
    });

})