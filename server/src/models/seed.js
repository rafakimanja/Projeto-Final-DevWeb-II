const Data = require("../services/date")
const Gasto = require('./models')

const d = new Data()

const gasto1 = new Gasto({
    data: d.getDataAtual(),
    descricao: 'teste de registro',
    valor: 200.13,
    tipo: 'saida',
    categoria: 'teste'
})

const gasto2 = new Gasto({
    data: d.getDiaEspec(1, 10, 2024),
    descricao: 'teste de registro 2',
    valor: 1000,
    tipo: 'entrada',
    categoria: ''
})

const gasto3 = new Gasto({
    data: d.getDiaEspec(2, 10, 2024),
    descricao: 'teste de registro 3',
    valor: 900.50,
    tipo: 'saida',
    categoria: 'mercado'
})

Gasto.insertMany([gasto1, gasto2, gasto3])
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })

