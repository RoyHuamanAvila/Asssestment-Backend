const request = require('supertest');
const app = require('../app');

const data = {
    name: "New List"
}

describe('Endpoints without token', () => {
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
