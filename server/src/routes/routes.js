const express = require("express");
const {listarIndex, listarGastosDetalhados, listarGastosMes, criaGasto, deletaGasto, alteraGasto} = require("../controllers/controllers")

// '/gastos' -> GET = retornar de todos os gastos do mes atual
// '/gastos' -> POST = formulario
// '/gastos/:id' -> PUT = update dos gastos
// '/gastos/:id' -> DELETE = deleta o gasto
// '/detalhes/:mes' -> GET = retorno de todos os gastos em um mes especifico
// '/index' -> GET = retorno dos meses cadastrados no banco com GANHOS, GASTOS, BALANCO

const routes = (app) => {
    app.use(express.json())
    app.get('/index', listarIndex)
    app.get('/gastos', listarGastosDetalhados)
    app.post('/gastos', criaGasto)
    app.put('/gastos/:id', alteraGasto)
    app.delete('/gastos/:id', deletaGasto)
    app.get('/gastos/:mes', listarGastosMes)
}

module.exports = routes