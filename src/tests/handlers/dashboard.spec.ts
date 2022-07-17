import supertest from "supertest";
import { deleteAndRestartTable } from "../../helperFunctions/helperFunctions";
import { OrderStore, Order } from "../../models/order";
import { ProductStore, Product } from "../../models/product";
import { UserStore, User } from "../../models/user";
import app from '../../server'
import { DashboardQueries, product_order } from "../../services/dashboard";

const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();
const store = new DashboardQueries();

const testProductOrder:product_order = {
    id: 1,
    quantity: 3,
    order_id: 1,
    product_id: 1
}

const testUser:User = {
    id:1,
    first_name:'Osama',
    last_name:'ali',
    password:'12345'
}
const testProd:Product = {
    id:1,
    name:'cheese',
    price:20,
    category:'diary'
};
const testOrder:Order = {
    id:1,
    user_id:1,
    statusoforder:'Active'
};
const request = supertest(app);
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwiZmlyc3RfbmFtZSI6Im1vaGFtbWVkIiwibGFzdF9uYW1lIjoiQWxpIiwicGFzc3dvcmQiOiIkMmIkMTAkMi9kVTNvLmdsREwuNmE1T1JJWXFQLlM3eThuaFd2UnNpVlNVUnhqRTMwV2ZyYTBTRmgxWVMifSwiaWF0IjoxNjU3ODk0NDQwfQ.X5MaXKf3gVFhraB-nXc3ISj5tOmtPoHV9t9s1BtZFJg'

describe('Dashboard Handler', () => {
    it('productsInSpecificOrder endpoint', async () => {
        const response = await request.get('/users/1/orders/1').set('Authorization', 'Bearer ' + TOKEN);
        expect(response.status).toBe(200);
    })

    it('productsInOrders endpoint', async () => {
        const response = await request.get('/users/1/orders').set('Authorization', 'Bearer ' + TOKEN);
        expect(response.status).toBe(200);
    })

    it('add Product show endpoint', async () => {
            await userStore.create(testUser);
            await orderStore.create(testOrder);
            await productStore.create(testProd);
        const response = (await request.post('/users/1/orders/1/products').send({
            "product_id": 1,
            "quantity": 4
        }).set('Authorization', 'Bearer ' + TOKEN));
        expect(response.status).toBe(200);
        
    })

    it('products top 5 popular show endpoint', async () => {
        const response = await request.get('/top5products');
        expect(response.status).toBe(200);

        await deleteAndRestartTable('product_order');
        await deleteAndRestartTable('orders');
        await deleteAndRestartTable('users');
        await deleteAndRestartTable('products');
    })

})
