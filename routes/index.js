//import express
const express = require('express');
//invoke the express router 
const router = express.Router();

router.get('/', (req, res) => {
    res.send('index')
})
//export out to main application 
module.exports = router;