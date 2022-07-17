import { Product, ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';
import { Order, OrderStore } from '../../models/order';
import { DashboardQueries, product_order } from '../../services/dashboard';
import dotenv from 'dotenv'
import { deleteAndRestartTable } from '../../helperFunctions/helperFunctions';

dotenv.config();
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

describe('Dashboard Queries',() => {

    it('addProduct method should return product added to order of id=1', async () => {
        
        try {
            await userStore.create(testUser);
            await orderStore.create(testOrder);
            await productStore.create(testProd);
            const result = await store.addProduct(3,'1','1');
            expect(result).toEqual(testProductOrder);
        } catch (error) {
            throw new Error(`cannon add product id ${testProd.id} to orderd id ${testOrder.id} : ${error}`)   
        }
    });

    it('productsInOrders should return all products from user\'s orders', async () => {
        const result = await store.productsInOrders('1');
        expect(result).toEqual([{
            name: 'cheese',
            price: 20,
            quantity: 3,
            category: 'diary', 
            order_id: 1
        }])
    })

    it('productsInSpecificOrder should return all products from user\'s order id=1', async () => {
        const result = await store.productsInSpecificOrder('1','1');
        expect(result).toEqual([{
            name: 'cheese',
            price: 20,
            quantity: 3,
            category: 'diary', 
            order_id: 1
        }]);
    })

    it('top5Products method should return top 5 puplar products', async () => {
        const result = await store.top5Products();
        expect(result[0]).toEqual({
            id: 1,
            name: "cheese",
            price: 20,
            howmanytimesordered: 3,
            category: "diary"
        });

        await deleteAndRestartTable('product_order');
        await deleteAndRestartTable('orders');
        await deleteAndRestartTable('users');
        await deleteAndRestartTable('products');
    })
    
});