'use strict';

const { server } = require('../src/server');
const { db } = require('../src/models/index');
const supertest = require('supertest');

const request = supertest(server);

let TOKEN;

beforeAll(async () => {
    await db.sync();
});

afterAll(async () => {
    await db.drop();
});



    describe('V1 (Unauthenticated API) Routes', () => {

    let itemId;
    describe('Auth Routes', () => {
    test('POST /signup creates a new user and sends an object with the user and the token to the client', async () => {
        const response = await request.post('/signup').send({
        username: 'abdullah',
        password: '123123',
        role: 'admin',
        });
    
        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('token');
    });
    
    test('POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client', async () => {
        const response = await request.post('/signin').set('Authorization', 'Basic YWJkdWxsYWg6MTIzMTIz');
    
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('token');
    
        TOKEN = response.body.token;
    });
    });

    test('POST /flavorers:model adds an item to the DB and returns an object with the added item', async () => {
    const response = await request.post('/flavorers').send({
        brand: 'na3no3',
        color: 'red'
    }).set('Authorization', `Bearer ${TOKEN}`);

    expect(response.status).toEqual(201);
    expect(response.body.brand).toEqual('na3no3');
    itemId = response.body.id;
    });

    test('GET /flavorers returns a list of :model items', async () => {
    const response = await request.get('/flavorers')
    .set('Authorization', `Bearer ${TOKEN}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
    });

    test('PUT /api/v1/:model/ID returns a single, updated item by ID', async () => {
    const response = await request.put(`/flavorers/${itemId}`).send({
        brand: 'shorroq',
        color: 'blue'
    }).set('Authorization', `Bearer ${TOKEN}`);
    expect(response.status).toEqual(202);
    console.log("tttttttttttttttt",TOKEN)
    // expect(response.body.name).toEqual('updatedFood');
    // expect(response.body.calories).toEqual('5000');
    // expect(response.body.type).toEqual('vegetable');
    });
    // test('DELETE /flavorers/ID returns an empty object. Subsequent GET for the same ID should result in nothing found', async () => {
    // let response = await request.delete(`/flavorers/1`)
    // .set('Authorization', `Bearer ${TOKEN}`);
    // expect(response.status).toEqual(204);
    // test('DELETE /api/v2/:model/ID with a bearer token that has delete permissions returns an empty object. Subsequent GET for the same ID should result in nothing found', async () => {
    //     let response = await request.delete(`/flavorers/${itemId}`)
    //     .set('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiZHVsbGFoIiwiaWF0IjoxNjg4NTY0MTQ3fQ.RlM465RuFGAr3Q7zQyLlzcAYFt9lHBu0I8KMkzBTwuo");
    //     expect(response.status).toEqual(204);
    //     expect(response.body).toEqual({});
    // });
})