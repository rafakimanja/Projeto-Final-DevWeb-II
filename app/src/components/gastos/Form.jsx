import { Link, redirect } from 'react-router-dom'
import { useState } from 'react'

//manda o objeto criado com o formulario como prop para o Gasto e faz a requisicao por ele 

const Form = () => {

    const [tipo, setTipo] = useState('')

    const handleRadioChange = (e) => {
        setTipo(e.target.value);
    }

    return(
        <div className="background-form">
            <Form method='post'>
                <div className="input-form">
                    <label htmlFor="descricao">Descrição</label>
                    <input type="text" name="" id="descricao" required/>
                </div>
                <div className="input-form">
                    <label htmlFor="valor">Valor</label>
                    <input type="number" step={0.01} name="" id="valor" required/>
                </div>
                <div className="input-form">
                    <label htmlFor="data">Data</label>
                    <input type="date" name="" id="data" />
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
                        <select name="categoria" id="categoria" >
                            <option value="contas">--selecione--</option>
                            <option value="contas">Contas</option>
                            <option value="alimentacao">Alimentação</option>
                            <option value="lazer">Lazer</option>
                        </select>
                    </div>
                    : ''
                }
                <div className="input-form">
                    <button>Salvar</button>
                </div>
            </Form>
        </div>
    )
}

export default Form

export async function addGasto({request}) {
    const data = await request.formData();
    const gasto = {
        data: data.get('data'),
        descricao: data.get('descricao'),
        valor: data.get('valor'),
        tipo: data.get('tipo'),
        categoria: data.get('categoria')
    };

    await axios.post('http://localhost:3000/gasto', gasto);
    return redirect('/gastos');
}