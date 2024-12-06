import axios from 'axios'
import { useEffect } from 'react'
import {useLoaderData} from 'react-router-dom'
import TabelaPeriodos from './TabelaPeriodos'

const Index = ({addDadosMeses}) => {

    const periodos = useLoaderData()

    useEffect(() => {
        periodos.forEach((item, index) => {
            if(item.dados){
                addDadosMeses({
                    num: index+1,
                    mes: item.mes,
                    ganhos: item.dados.ganhos,
                    gastos: item.dados.gastos,
                    saldo: item.dados.saldo
                })
            }
        })
    }, [periodos, addDadosMeses])

    return(
        <>
            <h1>Index template</h1>
            <TabelaPeriodos periodos={periodos} />
        </>
    )
}

export default Index

export async function getGastosPeriodos() {
    const url = 'http://localhost:3000/index'
    const {data} = await axios.get(url)
    return data
}