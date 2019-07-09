const mongoose = require('mongoose');

const smoothieSchema = mongoose.Schema({
    title : {
        type : String,
        required: false
    },
    ingredients : [
        {
            nom : { type: String, required: false },
            quantity : { type: String, required: false }
        }
    ],
    picture : {
        name: { type: String, required: false },
        alt : { type: String, required: false },
        path: { type: String, required: false }
    },
    features : {
        cost : { type: String, required: false },
        prepTime : { type: String, required: false }
    },
    advice: { 
        type: String, 
        required: false 
    },
    recipe:[
                {
                    stepText: String
                }
    ]
});

const Smoothie = module.exports = mongoose.model('smoothie', smoothieSchema);
