const fs = require('fs');
const request = require('supertest');
const app = require('../index');
const pool = require('../lib/utils/pool');
const Digimon = require('../lib/models/digimon');

describe('app test', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    afterAll(() => {
        return pool.end();
    });

    it('creates new digimon via POST', async() => {
        const response = await request(app)
            .post('/api/v1/digimon')
            .send({
                name: 'boogermon',
                description: 'the salty digimon',
                url: 'https//url.com'
            });

        expect(response.text).toEqual({
            id: '1',
            name: 'boogermon',
            description: 'the salty digimon',
            url: 'https//url.com'
        });
    });

    // it('finds a ramen by id via GET', async () => {
    //     const ramen = await Ramen.insert({ brand: 'ramen', type: 'brothy', flavor: 'beef' });

    //     const response = await request(app)
    //         .get(`/api/v1/ramen/${ramen.id}`);

    //     expect(response.body).toEqual(ramen);
    // });

    // it('updates a ramen by id via PUT', async () => {
    //     const ramen = await Ramen.insert({ brand: 'tokyo', type: 'dry', flavor: 'shoyu' });

    //     const response = await request(app)
    //         .put(`/api/v1/ramen/${ramen.id}`)
    //         .send({
    //             brand: 'kanto',
    //             type: 'dry',
    //             flavor: 'katsu'
    //         });

    //     expect(response.body).toEqual({
    //         ...ramen,
    //         brand: 'kanto',
    //         type: 'dry',
    //         flavor: 'katsu'
    //     });
    // });

    // it('deletes a ramen by id via DELETE', async () => {
    //     const ramen = await Ramen.insert({ brand: 'jons', type: 'extra dry', flavor: 'salt' });

    //     const response = await request(app)
    //         .delete(`/api/v1/ramen/${ramen.id}`);

    //     expect(response.body).toEqual({});
    // });
});
