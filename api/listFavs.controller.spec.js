const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const { expect, test, describe } = require('@jest/globals');

const data = {
    name: "New List"
}

describe('Endpoints code status without token', () => {
    test('Should response with a 403 status code', async () => {
        const response = await request(app).get('/api/favs').send();
        expect(response.statusCode).toBe(403);
    })
    test('Should response with a 403 status code', async () => {
        const response = await request(app).get(`/api/favs/${'6asd548fa'}`).send();
        expect(response.statusCode).toBe(403);
    })
    test('Should response with a 403 status code', async () => {
        const response = await request(app).post(`/api/favs`).send(data);
        expect(response.statusCode).toBe(403);
    })
})

describe('Endpoints message without token', () => {
    test('Should response with a message enter token', async () => {
        const response = await request(app).get('/api/favs').send();
        expect(response.body.message).toBe('Enter valid token');
    })
    test('Should response with a message enter token', async () => {
        const response = await request(app).get(`/api/favs/${'6asd548fa'}`).send();
        expect(response.body.message).toBe('Enter valid token');
    })
    test('Should response with a message enter token', async () => {
        const response = await request(app).post(`/api/favs`).send(data);
        expect(response.body.message).toBe('Enter valid token');
    })
})

describe('Passed middleware authentication', () => {
    let token = '';

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
        const userTest = {
            email: process.env.USER_TEST_EMAIL,
            password: process.env.USER_TEST_PASSWORD
        }

        const response = await request(app).post('/auth/local/login').send(userTest);
        expect(response.error).toBe(false);
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    })

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    test('Should create listFav', async () => {
        const response = await request(app).post(`/api/favs`).send(data).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
    })
})
