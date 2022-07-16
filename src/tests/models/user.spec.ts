import { User, UserStore } from '../../models/user';
import { OrderStore } from '../../models/order';
import dotenv from 'dotenv'

dotenv.config();

const store = new UserStore();
const orderStore = new OrderStore();
const user:User = {
    id:2,
    first_name:'Osama',
    last_name:'ali',
    password:'12345'
};

console.log(process.env.ENV);

describe('User Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('index method should return list of users', async () => {
        await orderStore.delete('1');
        await store.delete('1');
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it('create method should return a user with id=1 name=osama ali password=12345', async () => {    
        const result = await store.create(user);
        expect({
            id:result.id,
            first_name:result.first_name,
            last_name:result.last_name
        }).toEqual({
            id:user.id,
            first_name:user.first_name,
            last_name:user.last_name
        });
    });

    it('show method should return user of id=2', async () => {
        const result = await store.show('2');
        expect({
            id:result.id,
            first_name:result.first_name,
            last_name:result.last_name
        }).toEqual({
            id:user.id,
            first_name:user.first_name,
            last_name:user.last_name
        });
    })

});