//import express
const express = require('express');
//invoke the express router 
const router = express.Router();

router.get('/player', (req, res) => {
    res.render('player')
})
//export out to main application 
module.exports = router;