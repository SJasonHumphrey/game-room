// import express
const express = require("express");
const router = express.Router();
router.use(express.urlencoded({extended: false}));
router.use(express.json());
const db = require('../models');
//invoke the express router
router.get('/snake', async (req, res)=>{
    try {
        let user = req.session.passport.user
        let records = await db.users.findAll();
        //console.log(`---->${records}`);
        results = ({dataValues: records})
        let userQuery = results.dataValues
        //console.log(userQuery);
        userQuery.forEach(person => {
            if(person.id === user){
                console.log('true');
                res.render('snake');
            }
        })
    }
    catch(err) {
        res.send(err);
    }
});
router.get('/mySnake',async (req, res)=>{
    try {
        let user = req.session.passport.user
        let records = await db.users.findAll();
        //console.log(`---->${records}`);
        results = ({dataValues: records})
        let userQuery = results.dataValues
        //console.log(`userQuery: ${userQuery}`);
        userQuery.forEach(person => {
            if(person.id === user){
            console.log('true');
            res.send(person);
            }
        })
    }
    catch(err) {
        res.send(err);
    }
}); 
router.put('/newScore', async (req, res)=> {
    try{ 
        let user = req.session.passport.user 
        let records = await db.users.findAll();
        let userQuery = results.dataValues
        let points = req.body.points
        userQuery.forEach( async (person) => {
            if(person.id === user){
                //console.log(`--->>>>> ${person}`)
                updatePerson = await person.update({points: points})
                //console.log(updatePerson)
            }
        })
    }
    catch(err) {
        res.send(err);
    }
})
// export out to main application
module.exports = router;