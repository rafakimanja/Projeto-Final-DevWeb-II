const express = require("express");
const {listarIndex, listarGastosDetalhados, listarGastosMes, criaGasto, deletaGasto, alteraGasto} = require("../controllers/controllers")

// '/index' -> GET = retorno dos meses cadastrados no banco com GANHOS, GASTOS, BALANCO
// '/detalhes' -> GET = retornar de todos os gastos do mes atual
// '/detalhes/:mes' -> GET = retorno todos os gastos em um mes especifico
// '/gastos' -> POST = formulario
// '/gastos/:id' -> PUT = update dos gastos
// '/gastos/:id' -> DELETE = deleta o gasto

const routes = (app) => {
    app.use(express.json())
    app.get('/index', listarIndex)
    app.get('/detalhes', listarGastosDetalhados)
    app.get('/detalhes/:mes', listarGastosMes)
    app.post('/gasto', criaGasto)
    app.put('/gasto/:id', alteraGasto)
    app.delete('/gasto/:id', deletaGasto)
}

module.exports = routes