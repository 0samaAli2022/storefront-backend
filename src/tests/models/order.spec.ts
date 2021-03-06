import exp from 'constants';
import { checkServerIdentity } from 'tls';
import { Product, ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';
import { Order, OrderStore } from '../../models/order';
import dotenv from 'dotenv'
import { deleteAndRestartTable } from '../../helperFunctions/helperFunctions'

dotenv.config();
const userStore = new UserStore();
const productStore = new ProductStore();
const store = new OrderStore();

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
const order:Order = {
    id:1,
    user_id:1,
    statusoforder:'active'
};

describe('Order Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it('create method should return an order with id=1 user_id=1 status=Active', async () => { 
        await userStore.create(testUser);   
        const result = await store.create(order);
        expect(result).toEqual(order);
    });

    it('show method should return order of id=1', async () => {
        const result = await store.show('1');
        expect(result).toEqual(order);


        await deleteAndRestartTable('product_order');
        await deleteAndRestartTable('orders');
        await deleteAndRestartTable('users');
        await deleteAndRestartTable('products');
    })
});