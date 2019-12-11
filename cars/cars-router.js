const express = require('express');

// database access using knex
const knex = require('../data/dbConfig.js'); // renamed to knex from db

const router = express.Router();

router.get('/', (req, res) => {
    knex
        .select("*")
        .from('cars')
        .then(accounts => {
            if(accounts.length === 0){
                res.status(404).json({ errorMessage: "There are no cars. Add one and try again."})
            } else {
                res.status(200).json(accounts);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'error getting the cars' })
        })
    });

router.post('/', (req, res) => {
    const postData = req.body;
    if(!req.body.VIN || !req.body.make || !req.body.model || !req.body.mileage){
        res.status(404).json({ errorMessage: "Make sure there is a VIN, make, model, and mileage" })
    } else {
        knex('cars')
        .insert(postData, "id")
        .then(ids => {
            const id = ids[0];
            return knex('cars')
            .where({id})
            .then(post => {
                res.status(200).json(post)
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'error adding the car' })
        })
    }
    
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    if(!req.body.VIN || !req.body.make || !req.body.model || !req.body.mileage){
        res.status(404).json({ errorMessage: "Update the VIN, make, model, and mileage" })
    } else {
        knex('cars')
        .where({ id })
        .update(changes)
        .then(count => {
            if(count === 0){
                res.status(404).json({ errorMessage: "This ID does not exist" })
            } else{
                res.status(201).json({ message: `${count} record(s) updated`})
            }    
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'error updating the car' })
        })
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    knex('cars')
    .where({ id })
    .del(id)
    .then(count => {
        if(count === 0){
            res.status(404).json({ errorMessage: "This ID does not exist" })
        } else{
            res.status(201).json({ message: `${count} record(s) updated`})
        }    
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: 'error deleting the car' })
    })
});

module.exports = router;