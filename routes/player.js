//import express
const express = require('express');
//invoke the express router 
const router = express.Router();
router.get('/player', (req, res) => {
    res.render('player')
})
router.get('/2player', (req, res) => {
    res.render('2player')
})
router.get('/1player', (req, res) => {
    res.render('1player')
})
//export out to main application 
module.exports = router;