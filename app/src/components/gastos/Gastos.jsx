import Tab from "./Tab"
import money from '../../assets/money.svg'
import up from '../../assets/up.svg'
import down from '../../assets/down.svg'
import Form from "./Form"
import TabelaMensal from "./TabelaMensal"

const Gastos = () => {
    return(
        <>
            <h1>Novembro/2024</h1>
            <div className="valores">
                <div className="aba">
                    <Tab>
                        <div>
                            <h2>Entradas</h2>
                            <img src={up} alt="icone seta para cima" />
                            <p>R$ 1.300</p>
                        </div>
                    </Tab>
                </div>
                <div className="aba">
                    <Tab>
                        <div>
                            <h2>Saídas</h2>
                            <img src={down} alt="icone seta para baixo" />
                            <p>R$ 1.250</p>
                        </div>
                    </Tab>
                </div>
                <div className="aba">
                    <Tab>
                        <div>
                            <h2>Balanço</h2>
                            <img src={money} alt="icone dinheiro" />
                            <p>R$ 1.250</p>
                        </div>
                    </Tab>
                </div>
            </div>
            <div className="input-dados">
                <Form/>
            </div>
            <div className="tabela-intervalos">
                <TabelaMensal/>
            </div>
        </>
    )
}

export default Gastos