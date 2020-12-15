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

    it('finds a digimon by id via GET', async () => {
        const digimon = await Digimon.insert({ name: 'boogermon', description: 'brothy', url: 'https//url.com' });

        const response = await request(app)
            .get(`/api/v1/digimon/${digimon.id}`);

        expect(response.body).toEqual(digimon);
    });

    it('updates a digimon by id via PUT', async () => {
        const digimon = await Digimon.insert({ name: 'one', description: 'dry', url: 'https//url.com' });

        const response = await request(app)
            .put(`/api/v1/digimon/${digimon.id}`)
            .send({
                name: 'onepointfive',
                description: 'wet',
                url: 'https//url.com'
            });

        expect(response.body).toEqual({
            ...digimon,
            name: 'onepointfive',
            description: 'wet',
            url: 'https//url.com'
        });
    });

    it('deletes a digimon by id via DELETE', async () => {
        const digimon = await Digimon.insert({ name: 'jon', description: 'extra dry', url: 'https//url.com' });

        const response = await request(app)
            .delete(`/api/v1/digimon/${digimon.id}`);

        expect(response.body).toEqual({});
    });
});
