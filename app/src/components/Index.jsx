import axios from 'axios'
import {useLoaderData} from 'react-router-dom'
import TabelaPeriodos from './TabelaPeriodos'

const Index = ({handleAddDadosMeses}) => {

    const periodos = useLoaderData()

    return(
        <>
            <h1>Index template</h1>
            <TabelaPeriodos periodos={periodos} handleAddDadosMeses={handleAddDadosMeses} />
        </>
    )
}

export default Index

export async function getGastosPeriodos() {
    const url = 'http://localhost:3000/index'
    const {data} = await axios.get(url)
    return data
}