const { Schema, model } = require('mongoose');

// É a abstração do banco de dados ( todos os atributos da "Tabela")
const DevSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar:{
        type: String,
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Def',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Def',
    }],
}, {
    timestamps: true,
});

module.exports = model('Dev', DevSchema);