import exp from 'constants';
import { checkServerIdentity } from 'tls';
import { Product, ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';
import { Order, OrderStore } from '../../models/order';
import dotenv from 'dotenv'

dotenv.config();
const userStore = new UserStore();
const productStore = new ProductStore();

const testUser:User = {
    id:2,
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

const store = new OrderStore();
const order:Order = {
    id:1,
    user_id:1,
    statusoforder:'Active'
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
    })

});