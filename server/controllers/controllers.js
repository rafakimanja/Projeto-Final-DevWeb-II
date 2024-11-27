const model = require("../models/models")

function listarIndex(req, res){
    res.status(200).json(model)
}

module.exports = {
    listarIndex,
}