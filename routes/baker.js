const express = require('express');
const router = express.Router();

router.get('/baker', (req, res)=>{
    res.render('baker');
});


module.exports = router;
