import axios from 'axios'
import { useRouteLoaderData, useLocation } from 'react-router-dom'
import TabelaMensal from '../gastos/TabelaMensal'
import './TabelaDetalhada.css'

const TabebaDetalhada = () => {

    const gastos = useRouteLoaderData('gastosDetail')
    const location = useLocation()
    const mes = location.state.mes

    return(
    <>
        <div className="background-tabela-detalhada">
            <h1>Gastos do mes de <span>{mes}</span></h1>
            <div className="tabela-detalhada">
                <TabelaMensal gastos={gastos}/>
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