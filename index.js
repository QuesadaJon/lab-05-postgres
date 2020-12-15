const express = require('express')
const Digimon = require('./lib/models/digimon');
const app = express();

app.use(express.json());

app.post('/api/v1/digimon', (res, req, next) => {
    Digimon
        .insert(req.body)
        .then(digimon => res.send(digimon))
        .catch(next);
});

app.get('/api/v1/digimon', (res, req, send) => {
    Digimon
        .find()
        .then(digimon => res.send(digimon))
        .catch(next);
});

app.get('/api/v1/digimon/:id', (res, req) => {
    Digimon
        .findById(req.params.id)
        .then(digimon => res.send(digimon))
        .catch(next);
});

app.put('/api/v1/digimon/:id', (res, req) => {
    Digimon
        .update(req.body.id, req.body)
        .then(digimon => res.send(digimon))
        .catch(next);
});

app.delete('/api/v1/digimon/:id', (res, req) => {
    Digimon
        .delete(req.params.id)
        .then(digimon => res.send(digimon))
        .catch(next);
});

module.exports = app;
