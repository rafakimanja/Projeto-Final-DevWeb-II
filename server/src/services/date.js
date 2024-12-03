class Data{
    constructor(){
        this.data = new Date()
    }

    formataData(data){
        if (typeof data == "string"){
            const valor = Date.parse(data)
            const dataObj = new Date(valor)
            return dataObj.toLocaleDateString("pt-BR")
        }
        return data.toLocaleDateString("pt-BR")
    }
    
    getDataAtual(){
        return this.formataData(this.data)
    }

    getMesAtual(){
        return this.data.getMonth()+1
    }

    getDiaEspec(dia, mes, ano){
        const dataEspec = new Date()
        dataEspec.setFullYear(ano)
        dataEspec.setMonth(mes-1)
        dataEspec.setDate(dia)

        return this.formataData(dataEspec)
    }

    getMesStr(mes){
        const meses = [
            "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ]
        return meses[mes]
    }
}

module.exports = Data