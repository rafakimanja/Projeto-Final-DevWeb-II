const { mongoose } = require('./db')

const gastoSchema = new mongoose.Schema({
    data: {
        type: String,
        require: true
    },
    descricao: {
        type: String,
        require: true
    },
    valor: {
        type: Number,
        require: true
    },
    tipo: {
        type: String,
        require: true
    },
    categoria: String
})

const Gasto = mongoose.model('Gasto', gastoSchema)

module.exports = Gasto