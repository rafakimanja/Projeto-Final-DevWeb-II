import Tab from "./Tab"
import money from '../../assets/money.svg'
import up from '../../assets/up.svg'
import down from '../../assets/down.svg'
import FormGastos from "./FormGastos"
import TabelaMensal from "./TabelaMensal"
import axios from "axios"
import { useRouteLoaderData } from "react-router-dom"

const Gastos = ({deleteGasto, alteraGasto, dadosMeses}) => {

    const date = new Date()
    const mesAtual = date.getMonth()+1
    const gastos = useRouteLoaderData('gastos')

    const handleDeleteSubmit = async (id) => {
        const response = await deleteGasto(id)

        if (response.return) alert(
            `${response.message}\n\n` +
            `Detalhes:\n${JSON.stringify(response.return, null, 2)}`
        )
        else alert(`${response.message}`)
    }

    const handleUpdateSubmit = async (id, objeto) => {
        console.log('Objeto dentro do Updte=', objeto)
        const response = await alteraGasto(id, objeto)

        if (response.return) alert(
            `${response.message}\n\n` +
            `Detalhes:\n${JSON.stringify(response.return, null, 2)}`
        )
        else alert(`${response.message}`)
    }

    const handleEncontraMesAtual = (meses, mes) => {
        console.log('mes atual=', mes)
        console.log('objetos=', meses)
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
                            <p>R$ {objMesAtual.ganhos}</p>
                        </div>
                    </Tab>
                </div>
                <div className="aba">
                    <Tab>
                        <div>
                            <h2>Saídas</h2>
                            <img src={down} alt="icone seta para baixo" />
                            <p>R$ {objMesAtual.gastos}</p>
                        </div>
                    </Tab>
                </div>
                <div className="aba">
                    <Tab>
                        <div>
                            <h2>Balanço</h2>
                            <img src={money} alt="icone dinheiro" />
                            <p>R$ {objMesAtual.saldo}</p>
                        </div>
                    </Tab>
                </div>
            </div>
            <div className="input-dados">
                <FormGastos/>
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
