const {models, criaRegistro, deletaRegistro, alteraRegistro} = require("../models/models")
const Data = require("../services/date")

const d = new Data()

function listarIndex(req, res){
    res.status(200).json(models)
}

function listarGastosDetalhados(req, res){

    const registros = []

    for(let i=0; i<models.length; i++){
        let registro = model[i]
        let mes = registro.data[3] + registro.data[4]
        
        if(mes == d.getMesAtual()) registros.push(registro)
    }
    if (registros.length > 0) res.status(200).json(registros)
    else res.status(404).json(registros)
}

function listarGastosMes(req, res){
    const {mes} = req.params
    const registros = []

    for(let i=0; i<modes.length; i++){
        let registro = model[i]
        let mesReg = registro.data[3] + registro.data[4]
        
        if(mesReg == mes) registros.push(registro)
    }
    if (registros.length > 0) res.status(200).json(registros)
    else res.status(404).json(registros)
}

function criaGasto(req, res){
    const {data, descricao, valor, tipo, categoria} = req.body
    const resp = criaRegistro(data, descricao, valor, tipo, categoria)
    if(resp) res.status(200).json({message: "registro criado!"})
    else res.status(400).json({message: "erro ao criar registro!"})
}

function deletaGasto(req, res){
    const {id} = req.params
    const resp = deletaRegistro(id)
    if(resp) res.status(200).json({message: "registro deletado!"})
    else res.status(400).json({message: "erro ao deletar registro!"})
}

function alteraGasto(req, res){
    const {id} = req.params
    const resp = deletaRegistro(id)
    if(resp) res.status(200).json({message: "registro deletado!"})
    else res.status(400).json({message: "erro ao deletar registro!"})
}

module.exports = {
    listarIndex,
    listarGastosDetalhados,
    listarGastosMes,
    criaGasto,
    deletaGasto,
    alteraGasto
}