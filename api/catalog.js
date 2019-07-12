var express = require("express");
const Smoothie = require("../model/smoothie");
const mongoose = require("mongoose");

var router = express.Router();
router.get("/liste", async (req, res, next) => {  
    // structure try-catch permet la gestion d'erreur
    try{
        const smoothies = await Smoothie.find({});
        console.log("Liste des smoothies: ", smoothies);
        res.send(smoothies);
    } catch (err){
        console.log(err);
        res.status(400).send(err);
    }

});

router.get("/liste/:smoothie", async (req, res, next) => { 
    try{
        const selectedsmoothie = await Smoothie.findOne({"_id" : mongoose.Types.ObjectId(req.params.smoothie)});
        // const selectedsmoothie = await Smoothie.findById(mongoose.Types.ObjectId(req.params.smoothie)).exec();       
        console.log("Recette du ", selectedsmoothie);
        res.send(selectedsmoothie);
    } catch (err){
        console.log(err);
        res.status(400).send(err);
    }

});

router.post('/add', async (req, res, next) => {

    let newSmoothie = new Smoothie();
    newSmoothie.title = req.body.title; //permet de manipuler, populer le nouvel objet de type Smoothie
    newSmoothie.description = req.body.description;

    try {
        const smoothie = await newSmoothie.save(); 
        res.send(smoothie); //renvoi du nouveau smoothie avec son nouvel Id, utilisable pour afficher une fiche !
    } catch(err) {
        res.status(400).send(err);
    }
});


module.exports = router; // sans cette ligne: erreur de routeur
