const { v4: uuidv4 } = require('uuid');
const Data = require("../services/date")

const d = new Data()

const models = [
    {
        id: uuidv4(),
        data: d.getDataAtual(),
        descricao: 'teste de registro',
        valor: 200.13,
        tipo: 'saida',
        categoria: 'teste'
    },
    {
        id: uuidv4(),
        data: d.getDiaEspec(1, 10, 2024),
        descricao: 'teste de registro 2',
        valor: 1000,
        tipo: 'entrada',
        categoria: ''
    },
    {
        id: uuidv4(),
        data: d.getDiaEspec(2, 10, 2024),
        descricao: 'teste de registro 3',
        valor: 900.50,
        tipo: 'saida',
        categoria: 'mercado'
    },
]

function findIndex(id){
    for(let i=0; i<models.length; i++){
        let reg = models[i]
        if(reg.id == id){
            return i
        }
    }
    return -1
}

const criaRegistro = (data, descricao, valor, tipo, categoria) => {
    const tam = models.length
    models.push(
        {
            id: uuidv4(),
            data: d.formataData(data),
            descricao: descricao,
            valor: valor,
            tipo: tipo,
            categoria: categoria
        }
    )
    if (models.length > tam) return true
    else return false
}

const deletaRegistro = (id) => {
    const pos = findIndex(id)
    if (pos != -1){
        models.splice(pos, 1);
        return true
    }else{
        return false
    }
}

const alteraRegistro = (id) => {

}

module.exports = {
    models,
    criaRegistro,
    deletaRegistro,
    alteraRegistro
}