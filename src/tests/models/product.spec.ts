import exp from 'constants';
import { checkServerIdentity } from 'tls';
import { Product, ProductStore } from '../../models/product';
import dotenv from 'dotenv'
import { deleteAndRestartTable } from '../../helperFunctions/helperFunctions';

dotenv.config();

const store = new ProductStore();
const prod:Product = {
    id:1,
    name:'cheese',
    price:20,
    category:'diary'
};

describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it('create method should return a product with id=1 name=cheese price=20 category=diary', async () => {    
        const result = await store.create(prod);
        expect(result).toEqual(prod);
    });

    it('show method should return product of id=1', async () => {
        const result = await store.show('1');
        expect(result).toEqual(prod);
    })

    it('productByCategory method should return product of category diary', async () => {
        const result = await store.productByCategory('diary');
        expect(result[0].category).toEqual('diary');
    })

});