const axios = require('axios'); // Biblioteca que é basicamente uma API que interage tanto com XMLHttpRequest e http
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res){
        // Pega o id que está no headers do Insomnia    
        const { user } = req.headers;
        
        // Procura pelo Id no banco e coloca em loggedDev
        const loggedDev = await Dev.findById(user);
        
        // Popula users com 
        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } },
            ],
        })

        return res.json(users);
    },

    //Cadastra um novo Dev
    async store(req, res){
        const { username } = req.body;
        
        // Procura se ja existe o Dev no banco de dados
        const userExists = await Dev.findOne ({ user: username});
        
        // Se existir, retorna as informações desse Dev
        if (userExists) {
            return res.json(userExists);
        }
        
        // Pega as informações da api do usuário no Git ( Formato de JSON )
        const response = await axios.get(`http://api.github.com/users/${username}`);

        // Popula as variáveis 
        const { name, bio, avatar_url: avatar } = response.data;

        //
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })
        
        // Retorna as informações desse Dev
        return res.json(dev);
    }
};
