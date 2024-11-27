import './TabelaMensal.css'

const TabelaMensal = () => {
    return(
        <table>
            <tr>
                <th>Data</th>
                <th>Descricao</th>
                <th>Valor R$</th>
                <th>Tipo</th>
                <th>Categoria</th>
            </tr>
            <tr>
                <td>25/11/2024</td>
                <td>Crunchyrol</td>
                <td>R$ 19,99</td>
                <td>saida</td>
                <td>streaming</td>
            </tr>
            <tr>
                <td>26/11/2024</td>
                <td>Supermercado Jaja</td>
                <td>R$ 229,99</td>
                <td>saida</td>
                <td>alimentacao</td>
            </tr>
        </table>
    )
}

export default TabelaMensal