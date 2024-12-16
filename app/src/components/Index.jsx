import axios from 'axios'
import {useLoaderData} from 'react-router-dom'
import TabelaPeriodos from './TabelaPeriodos'
import './Index.css'

const Index = () => {

    const periodos = useLoaderData()

    return(
        <>
            <div className="background-index">
                <h1>Lista de Gastos</h1>
                <TabelaPeriodos periodos={periodos} />
            </div>
            
        </>
    )
}

export default Index

export async function getGastosPeriodos() {
    const url = 'http://localhost:3000/index'
    const {data} = await axios.get(url)
    return data
}