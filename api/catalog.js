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

const {
    check,
    validationResult
} = require('express-validator');

const sanitizeBody = require('express-validator');

router.post('/add', [check('title').not().isEmpty().withMessage("Titre: : donnée manquante"),
                        check('description').not().isEmpty().withMessage("Description: : donnée manquante")
                        ],async (req, res, next) => {

    // Validation du formulaire
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        res.status(400).send({
            errors: errors.array()
        });
        return;
    }

    let newSmoothie = new Smoothie();
    newSmoothie.title = req.body.title; //permet de manipuler, populer le nouvel objet de type Smoothie
    newSmoothie.description = req.body.description;
    newSmoothie.picture.name = req.body.pictureName;
    newSmoothie.picture.path = req.body.picture;
    newSmoothie.picture.alt = req.body.alt;
    newSmoothie.features.prepTime = req.body.features.prepTime;
    newSmoothie.features.cost = req.body.features.cost;
    newSmoothie.advice = req.body.advice;
    newSmoothie.ingredients[0].nom = req.body.ingredients;
    newSmoothie.recipe = req.body.recipe;
    
    try {
        const smoothie = await newSmoothie.save(); 
        res.send(smoothie); //renvoi du nouveau smoothie avec son nouvel Id, utilisable pour afficher une fiche !
    } catch(err) {
        res.status(400).send(err);
    }
});


module.exports = router; // sans cette ligne: erreur de routeur
