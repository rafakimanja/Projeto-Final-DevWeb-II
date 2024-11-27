const express = require("express");
const {listarIndex} = require("../controllers/controllers")

// '/gastos' -> GET = retornar de todos os gastos do mes atual
// '/gastos' -> POST = formulario
// '/detalhes/:mes' -> GET = retorno de todos os gastos em um mes especifico
// '/index' -> GET = retorno dos meses cadastrados no banco com GANHOS, GASTOS, BALANCO

const routes = (app) => {
    app.use(express.json())
    app.get('/index', listarIndex)
}

module.exports = routes