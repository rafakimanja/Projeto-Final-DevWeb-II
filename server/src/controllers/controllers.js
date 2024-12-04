const Gasto = require("../models/models")
const Data = require("../services/date")

const d = new Data()

const calculaMes = (regDoMes) => {
    let ganhos = 0, gastos = 0

    for(let i=0; i<regDoMes.length; i++){
        const obj = regDoMes[i]

        if(obj.tipo == 'saida') gastos += obj.valor
        else ganhos += obj.valor
    }

    if (ganhos == 0  && gastos == 0){
        return null
    } else {
        return {
            ganhos: ganhos,
            gastos: gastos,
            saldo: ganhos-gastos
        }
    }
}


async function listarIndex(req, res){
    const gastos = await Gasto.find({})
    const array = []
    
    for(let j=1; j<=12; j++){
        let arrayRegMes = []

        for(let i=0; i<gastos.length; i++){
            const registro = gastos[i]
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

async function listarGastosDetalhados(req, res){
    const gastos = await Gasto.find({})
    const registros = []

    for(let i=0; i<gastos.length; i++){
        let registro = gastos[i]
        let mes = registro.data[3] + registro.data[4]
        
        if(mes == d.getMesAtual()) registros.push(registro)
    }
    if (registros.length > 0) res.status(200).json(registros)
    else res.status(404).json(registros)
}

async function listarGastosMes(req, res){
    const gastos = await Gasto.find({})
    const {mes} = req.params
    const registros = []

    for(let i=0; i<gastos.length; i++){
        let registro = gastos[i]
        let mesReg = registro.data[3] + registro.data[4]
        
        if(mesReg == mes) registros.push(registro)
    }
    if (registros.length > 0) res.status(200).json(registros)
    else res.status(404).json(registros)
}

async function criaGasto(req, res){
    const {data, descricao, valor, tipo, categoria} = req.body
    const novoGasto = new Gasto({data, descricao, valor, tipo, categoria})
    try{
        const result = await novoGasto.save()
        res.status(200).json({message: "registro criado!", return: result})
    } catch (erro) {
        res.status(500).json({message: `${erro}`})
    }
}

async function alteraGasto(req, res){
    const {id} = req.params
    const {data, descricao, valor, tipo, categoria} = req.body
    try {
        const result = await Gasto.findByIdAndUpdate(id, {data, descricao, valor, tipo, categoria}, {runValidators: true})
        res.status(200).json({message: "registro alterado!", return: result})
    } catch (erro) {
        res.status(500).json({message: `${erro}`})
    }
}

async function deletaGasto(req, res){
    const {id} = req.params
    try {
        const result = await Gasto.findByIdAndDelete(id)
        res.status(200).json({message: "registro deletado!", return: result})
    } catch (erro) {
        res.status(500).json({message: `${erro}`})
    }
}



module.exports = {
    listarIndex,
    listarGastosDetalhados,
    listarGastosMes,
    criaGasto,
    deletaGasto,
    alteraGasto
}