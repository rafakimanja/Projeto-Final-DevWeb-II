import './TabelaDetalhada.css'

const TabebaDetalhada = () => {
    return(
    <>
    <div className="background-tabela-detalhada">
        <h1>Gastos do mes de <span>Outubro</span></h1>
        <div className="tabela-detalhada">
            <table className="mes-detalhado">
                <tr>
                    <th>Data</th>
                    <th id='desc'>Descricao</th>
                    <th>Valor R$</th>
                    <th>Tipo</th>
                    <th>Categoria</th>
                </tr>
                <tr>
                    <td>01/10/2024</td>
                    <td id='desc'>Pagamento Salario</td>
                    <td>R$ 1.000,00</td>
                    <td>entrada</td>
                    <td></td>
                </tr>
                <tr>
                    <td>01/10/2024</td>
                    <td id='desc'>Pagamento cartao Nubank</td>
                    <td>R$ 800,00</td>
                    <td>saida</td>
                    <td>contas</td>
                </tr>
            </table>
        </div>
    </div>
    </>
    )
}

export default TabebaDetalhada