module.exports = {
    database: process.env.MONGO_URL || 'mongodb://localhost:27017/FreshDrink',
    secret: 'mysecret',
}

//on rend disponible pour tout le programme la database FreshDrink
// L'objet exporté n'a pas de nom mais 2 propriétés (database et secret).