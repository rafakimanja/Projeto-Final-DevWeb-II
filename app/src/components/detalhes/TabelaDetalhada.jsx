import axios from 'axios'
import { useEffect, useState } from 'react' 
import { useRouteLoaderData, useLocation } from 'react-router-dom'
import TabelaMensal from '../gastos/TabelaMensal'
import './TabelaDetalhada.css'

const TabebaDetalhada = ({deleteGasto, alteraGasto}) => {

    const [gastos, setGastos] = useState([])
    const gastosAPI = useRouteLoaderData('gastosDetail')

    const location = useLocation()
    const mes = location.state.mes

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
                removeGastos(id)
                alert(
                `${response.message}\n\n` +
                `Detalhes:\n${JSON.stringify(response.return, null, 2)}`
                )
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