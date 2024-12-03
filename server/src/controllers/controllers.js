const {models, criaRegistro, deletaRegistro, alteraRegistro} = require("../models/models")
const Data = require("../services/date")

const d = new Data()

const calculaMes = (regDoMes) => {
    let ganhos = 0, gastos = 0

    for(let i=0; i<regDoMes.length; i++){

        const obj = regDoMes[i]

        if(obj.tipo == 'saida') gastos += obj.valor
        else ganhos += obj.valor

    }

    return {
        ganhos: ganhos,
        gastos: gastos,
        saldo: ganhos-gastos
    }
}


function listarIndex(req, res){

    const array = []
    
    for(let j=1; j<=12; j++){

        let arrayRegMes = []

        for(let i=0; i<models.length; i++){
            
            const registro = models[i]
            let mes = registro.data[3] + registro.data[4]

            if(mes == j) arrayRegMes.push(registro)
        }

        const dados = calculaMes(arrayRegMes)

        array.push({
            mes: d.getMesStr(j-1),
            dados: dados
        })
    }
    res.status(200).json(array)
}

function listarGastosDetalhados(req, res){

    const registros = []

    for(let i=0; i<models.length; i++){
        let registro = models[i]
        let mes = registro.data[3] + registro.data[4]
        
        if(mes == d.getMesAtual()) registros.push(registro)
    }
    if (registros.length > 0) res.status(200).json(registros)
    else res.status(404).json(registros)
}

function listarGastosMes(req, res){
    const {mes} = req.params
    const registros = []

    for(let i=0; i<models.length; i++){
        let registro = models[i]
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
    const {data, descricao, valor, tipo, categoria} = req.body
    const resp = alteraRegistro(id, data, descricao, valor, tipo, categoria)
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