const mongoose = require('mongoose')

const mongoUrl = "mongodb://localhost:27017/dbGastos"

mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Conexão estabelecida com o banco!')
    })
    .catch(err => {
        console.log('Erro ao conectar ao banco.')
        console.log(err)
    })

module.exports = mongoose