import axios from 'axios'
import { useRouteLoaderData, useLocation } from 'react-router-dom'
import TabelaMensal from '../gastos/TabelaMensal'
import './TabelaDetalhada.css'

const TabebaDetalhada = ({deleteGasto, alteraGasto}) => {

    const gastos = useRouteLoaderData('gastosDetail')
    const location = useLocation()
    const mes = location.state.mes

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

    return(
    <>
        <div className="background-tabela-detalhada">
            <h1>Gastos do mes de <span>{mes}</span></h1>
            <div className="tabela-detalhada">
                <TabelaMensal gastos={gastos} handleDeleteSubmit={handleDeleteSubmit} handleUpdateSubmit={handleUpdateSubmit}/>
            </div>
        </div>
    </>
    )
}

export default TabebaDetalhada

export async function getDetalhesGastos({params}){
    const url = `http://localhost:3000/detalhes/${params.mes}`
    const {data} = await axios.get(url)
    return data
}