import { useState } from 'react'
import axios from 'axios'

//manda o objeto criado com o formulario como prop para o Gasto e faz a requisicao por ele 

const FormGastos = ({addGastosArray}) => {

    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [data, setData] = useState('')
    const [tipo, setTipo] = useState('')
    const [categoria, setCategoria] = useState('')

    const handleDescricaoChange = (e) => {
        setDescricao(e.target.value)
    }

    const handleValorChange = (e) => {
        setValor(e.target.value)
    }

    const handleDataChange = (e) => {
        setData(e.target.value)
    }

    const handleRadioChange = (e) => {
        setTipo(e.target.value);
    }

    const handleCategoriaChange = (e) => {
        setCategoria(e.target.value)
    }

    const handleSubmit = async (descricao, valor, data, tipo, categoria) => {
        const gasto = {
            descricao: descricao,
            valor: valor,
            data: data,
            tipo: tipo,
            categoria: categoria
        }
        
        const response = await addGasto(gasto)

        if (response.return){ 
            addGastosArray(response.return)
            alert(
            `${response.message}\n\n` +
            `Detalhes:\n${JSON.stringify(response.return, null, 2)}`
            )
        }
        else alert(`${response.message}`)
    }

    return(
        <div className="background-form">
        
                <div className="input-form">
                    <label htmlFor="descricao">Descrição</label>
                    <input type="text" name="" value={descricao} id="descricao" onChange={handleDescricaoChange} required/>
                </div>
                <div className="input-form">
                    <label htmlFor="valor">Valor</label>
                    <input type="number" step={0.01} name="" value={valor} id="valor" onChange={handleValorChange} required/>
                </div>
                <div className="input-form">
                    <label htmlFor="data">Data</label>
                    <input type="date" name="" id="data" value={data} onChange={handleDataChange} />
                </div>
                <div className="input-form">
                    <label htmlFor="entrada">Entrada</label>
                    <input type="radio" name="tipo" value="entrada" onChange={handleRadioChange} />
                </div>
                <div className="input-form">
                    <label htmlFor="saida">Saída</label>
                    <input type="radio" name="tipo" value="saida" onChange={handleRadioChange} />
                </div>
                {
                    tipo == "saida" ? 
                    <div className="input-form">
                        <select name="categoria" id="categoria" value={categoria} onChange={handleCategoriaChange} >
                            <option>--selecione--</option>
                            <option value="contas">Contas</option>
                            <option value="alimentacao">Alimentação</option>
                            <option value="lazer">Lazer</option>
                        </select>
                    </div>
                    : ''
                }
                <div className="input-form">
                    <button onClick={() => {
                        handleSubmit(descricao, valor, data, tipo, categoria)
                        setData('')
                        setCategoria('')
                        setDescricao('')
                        setValor('')
                        setTipo('')
                        }}>Salvar</button>
                </div>
            
        </div>
    )
}

export default FormGastos

export async function addGasto(gasto) {
    const { data } = await axios.post('http://localhost:3000/gasto', gasto);
    console.log(data)
    return data
}