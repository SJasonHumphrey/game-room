const express = require('express');
const router = express.Router();
router.use(express.urlencoded({extended: false}));
router.use(express.json());
const db = require('../models');

router.get('/baker',async (req, res)=>{
    try {
        let user = req.session.passport.user
        let records = await db.users.findAll();
        // console.log(`---->${records}`);
        results = ({dataValues: records})
        let userQuery = results.dataValues
        // console.log(userQuery);
        userQuery.forEach(person => {
            if(person.id === user){
            // console.log('true');
            res.render('baker')
            }
        })
    }
    catch(err) {
        res.send(err);
    }
}); 
router.get('/myBaker',async (req, res)=>{
    try {
        let user = req.session.passport.user
        let records = await db.users.findAll();
        // console.log(`---->${records}`);
        results = ({dataValues: records})
        let userQuery = results.dataValues
        // console.log(userQuery);
        userQuery.forEach(person => {
            if(person.id === user){
            // console.log('true');
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
                console.log(`--->>>>> ${person}`)
                updatePerson = await person.update({points: points})
                console.log(updatePerson)
            }
        })
    }
    catch(err) {
        res.send(err);
    }
})
module.exports = router;
