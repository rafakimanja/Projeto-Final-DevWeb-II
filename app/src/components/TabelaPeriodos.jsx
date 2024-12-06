import { Link } from 'react-router-dom'
import './TabelaPeriodos.css'
import { useEffect } from 'react'

const TabelaPeriodos = ({periodos}) => {

    return(
        <table>
            <thead>
                <tr>
                    <th>Período</th>
                    <th>Ganhos</th>
                    <th>Gastos</th>
                    <th>Balanço</th>
                </tr>
            </thead>
            <tbody>
                {
                    periodos.map((item, index) => (
                        item.dados ? (
                            <tr key={index}>
                                <td><Link to={`/detalhes/${String(index + 1).padStart(2, '0')}`} state={{mes: item.mes}}>{item.mes}</Link></td>
                                <td>R$ {item.dados.ganhos}</td>
                                <td>R$ {item.dados.gastos}</td>
                                <td>R$ {item.dados.saldo}</td>
                            </tr>
                        ) : null
                    ))
                }
            </tbody>
        </table>
    )
}

export default TabelaPeriodos