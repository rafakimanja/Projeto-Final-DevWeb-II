import Tab from "./Tab"
import money from '../../assets/money.svg'
import up from '../../assets/up.svg'
import down from '../../assets/down.svg'
import FormGastos from "./FormGastos"
import TabelaMensal from "./TabelaMensal"
import axios from "axios"
import { useState } from "react"
import './Gastos.css'

const Gastos = ({deleteGasto, alteraGasto}) => {

    const [mesSelecionado, setMesSelecionado] = useState('')
    const [dadosMesSelecionado, setDadosMesSelecionado] = useState({})
    const [gastos, setGastos] = useState([])

    const mesesDoAno = [
        "janeiro", "fevereiro", "marco", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    
    const addGastos = (novoGasto) => {
        setGastos((gastosAtuais) => {
            const jaExiste = gastosAtuais.some((gasto) => gasto._id == novoGasto._id)
            if (!jaExiste) {
                return [...gastosAtuais, novoGasto]
            }
            return gastosAtuais
        })
    }
    
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
        }
        alert(`${response.message}`)
    }

    const handleUpdateSubmit = async (id, objeto) => {
        const response = await alteraGasto(id, objeto)
        if (response.return) {
            alterGastos(id, response.return)
        }
        alert(`${response.message}`)
    }
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-

    const handleMesSelecionado = async (e) => {
        const mes = e.target.value;
        setMesSelecionado(mes);
        if (mes) {
            await setDadosMesAtual(mes);
            await setGastosMes(mesesDoAno.indexOf(mes)+1)
        }
    }

    const setDadosMesAtual = async (mes) => {
        const response = await getDadosBaseMeses();
        const data = response.find((item) => item.mes.toLowerCase() == mes.toLowerCase());
        if (data.dados) {
            setDadosMesSelecionado({
                mes: data.mes,
                ganhos: data.dados.ganhos,
                gastos: data.dados.gastos,
                saldo: data.dados.saldo
            })
        } else {
            setDadosMesSelecionado({
                mes: data.mes,
                ganhos: 0,
                gastos: 0,
                saldo: 0
            })
        }
    }

    const setGastosMes = async (mes) => {
        const response = await getDetalhesGastosMesEspec(mes)
        if(response.length > 0) setGastos(response)
        else setGastos([])
    }


    return(
        <div className="background-gastos">
            <div className="esc-mes">
                <h2>Escolha um mês:</h2>
                <select name="mesSelecionado" id="mesSelecionado" value={mesSelecionado} onChange={handleMesSelecionado} >
                        <option value="">Selecione</option>
                        <option value="janeiro">Janeiro</option>
                        <option value="fevereiro">Fevereiro</option>
                        <option value="marco">Março</option>
                        <option value="abril">Abril</option>
                        <option value="maio">Maio</option>
                        <option value="junho">Junho</option>
                        <option value="julho">Julho</option>
                        <option value="agosto">Agosto</option>
                        <option value="setembro">Setembro</option>
                        <option value="outubro">Outubro</option>
                        <option value="novembro">Novembro</option>
                        <option value="dezembro">Dezembro</option>
                </select>
            </div>
            
            <h1>{dadosMesSelecionado.mes}</h1>
            <div className="valores">
                <div className="aba">
                    <Tab>
                        <div>
                            <h2 className="titulo">Entradas</h2>
                            <div className="valor">
                                <p>R$ {dadosMesSelecionado.ganhos}</p>
                                <img src={up} alt="icone seta para cima" id="up" />
                            </div>
                        </div>
                    </Tab>
                </div>
                <div className="aba">
                    <Tab>
                        <div>
                            <h2 className="titulo">Saídas</h2>
                            <div className="valor">
                                <p>R$ {dadosMesSelecionado.gastos}</p>
                                <img src={down} alt="icone seta para baixo" id="down"/>
                            </div>
                        </div>
                    </Tab>
                </div>
                <div className="aba">
                    <Tab>
                        <div>
                            <h2 className="titulo">Balanço</h2>
                            <div className="valor">
                                <p>R$ {dadosMesSelecionado.saldo}</p>
                                <img src={money} alt="icone dinheiro" id="money"/>
                            </div>
                        </div>
                    </Tab>
                </div>
            </div>
            <div className="input-dados">
                <FormGastos addGastosArray={addGastos}/>
            </div>
            <div className="tabela-intervalos">
                <TabelaMensal gastos={gastos} handleDeleteSubmit={handleDeleteSubmit} handleUpdateSubmit={handleUpdateSubmit}/>
            </div>
        </div>
    )
}

export default Gastos


async function getDetalhesGastosMesEspec(mes){
    const url = `http://localhost:3000/detalhes/${mes}`
    const {data} = await axios.get(url)
    return data
}

async function getDadosBaseMeses() {
    const url = 'http://localhost:3000/index'
    const {data} = await axios.get(url)
    return data
}