const Data = require("../services/date")

const d = new Data()

const model = [
    {
        data: d.getDiaAtual(),
        descricao: 'teste de registro',
        valor: 200.13,
        tipo: 'saida',
        categoria: 'teste'
    },
    {
        data: d.getDiaEspec(1, 10, 2024),
        descricao: 'teste de registro 2',
        valor: 1000,
        tipo: 'entrada',
        categoria: ''
    },
]

module.exports = model