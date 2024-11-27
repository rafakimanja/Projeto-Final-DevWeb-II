class Data{
    constructor(){
        this.data = new Date()
    }

    formataData(data){
        return data.toLocaleDateString("pt-BR")
    }
    
    getDiaAtual(){
        return this.formataData(this.data)
    }

    getDiaEspec(dia, mes, ano){
        const dataEspec = new Date()
        dataEspec.setFullYear(ano)
        dataEspec.setMonth(mes-1)
        dataEspec.setDate(dia)

        return this.formataData(dataEspec)
    }

    getMes(mes){
        const meses = [
            "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ]
        return meses[mes]
    }
}

module.exports = Data