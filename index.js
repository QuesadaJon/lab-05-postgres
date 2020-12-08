require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const Digimon = require('./lib/models/digimon');

app.post('/digimon', (res, req) => {
    Digimon
        .insert(req.body)
        .then(console.log)
})

app.get('/digimon', (res, req) => {
    Digimon
        .find()
        .then(console.log)
})

app.get('/digimon', (res, req) => {
    Digimon
        .findById(req.body)
        .then(console.log)
})

app.put('/digimon', (res, req) => {
    Digimon
        .update(req.body)
        .then(console.log)
})

app.delete('/digimon', (res, req) => {
    Digimon
        .delete(req.body)
        .then(console.log)
})

app.listen('3000', () => {
    console.log('listening on port 3000')
})