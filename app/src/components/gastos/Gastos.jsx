import Tab from "./Tab"
import money from '../../assets/money.svg'
import up from '../../assets/up.svg'
import down from '../../assets/down.svg'
import FormGastos from "./FormGastos"
import TabelaMensal from "./TabelaMensal"
import axios from "axios"
import { useRouteLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"

const Gastos = ({deleteGasto, alteraGasto, dadosMeses}) => {

    const [gastos, setGastos] = useState([])
    const gastosAPI = useRouteLoaderData('gastos')

    const date = new Date()
    const mesAtual = date.getMonth()+1

    const addGastos = (novoGasto) => {
        setGastos((gastosAtuais) => {
            const jaExiste = gastosAtuais.some((gasto) => gasto._id == novoGasto._id)
            if (!jaExiste) {
                return [...gastosAtuais, novoGasto]
            }
            return gastosAtuais
        })
    }

    useEffect(() => {
        gastosAPI.forEach((gasto) => {
            if(gasto){
                addGastos({
                    _id: gasto._id,
                    data: gasto.data,
                    descricao: gasto.descricao,
                    valor: gasto.valor,
                    tipo: gasto.tipo,
                    categoria: gasto.categoria
                })
            }
        })
        console.table(gastos)
    }, [gastosAPI, addGastos])
    
    const removeGastos = id => {
    setGastos(gastos.filter((dadoGasto) => dadoGasto._id != id))
    }

    const alterGastos = (id, dadosAtualizados) => {
        setGastos((gastosAtuais) =>
            gastosAtuais.map((gasto) => (gasto._id == id ? { ...gasto, ...dadosAtualizados } : gasto))
        )
    }
    
    // FUNCOES DE BACK-END
    const handleDeleteSubmit = async (id) => {
        const response = await deleteGasto(id)

        if (response.return) {
            alert(
            `${response.message}\n\n` +
            `Detalhes:\n${JSON.stringify(response.return, null, 2)}`
            )
            removeGastos(id)
        }
        else alert(`${response.message}`)
    }

    const handleUpdateSubmit = async (id, objeto) => {
        const response = await alteraGasto(id, objeto)
        if (response.return) {
            alterGastos(id, response.return)
            alert(
            `${response.message}\n\n` +
            `Detalhes:\n${JSON.stringify(response.return, null, 2)}`
            )
        }
        else alert(`${response.message}`)
    }
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-

    const handleEncontraMesAtual = (meses, mes) => {
        return meses.find(obj => obj.num == mes)
    }

    const objMesAtual = handleEncontraMesAtual(dadosMeses, mesAtual)

    return(
        <>
            <h1>{objMesAtual.mes}</h1>
            <div className="valores">
                <div className="aba">
                    <Tab>
                        <div>
                            <h2>Entradas</h2>
                            <img src={up} alt="icone seta para cima" />
                            <p>R$ {objMesAtual.ganhos.toFixed(2)}</p>
                        </div>
                    </Tab>
                </div>
                <div className="aba">
                    <Tab>
                        <div>
                            <h2>Saídas</h2>
                            <img src={down} alt="icone seta para baixo" />
                            <p>R$ {objMesAtual.gastos.toFixed(2)}</p>
                        </div>
                    </Tab>
                </div>
                <div className="aba">
                    <Tab>
                        <div>
                            <h2>Balanço</h2>
                            <img src={money} alt="icone dinheiro" />
                            <p>R$ {objMesAtual.saldo.toFixed(2)}</p>
                        </div>
                    </Tab>
                </div>
            </div>
            <div className="input-dados">
                <FormGastos addGastosArray={addGastos}/>
            </div>
            <div className="tabela-intervalos">
                <TabelaMensal gastos={gastos} handleDeleteSubmit={handleDeleteSubmit} handleUpdateSubmit={handleUpdateSubmit}/>
            </div>
        </>
    )
}

export default Gastos

export async function getGastosMes() {
    const url = 'http://localhost:3000/detalhes'
    const {data} = await axios.get(url)
    return data
}
