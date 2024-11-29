const routes = require('./src/routes/routes')
const express = require('express')
const app = express()

routes(app)

app.listen(3000, () => {
    console.log("Servidor ligado na porta 3000!")
})