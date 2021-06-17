// import express
const express = require("express");


//invoke the express router
const router = express.Router();


router.get("/snake", (req, res)=>{
    
    
    res.render("snake")
})


// export out to main application

module.exports = router;