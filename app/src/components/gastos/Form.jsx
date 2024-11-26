import { useState } from "react"

const Form = () => {

    const [tipo, setTipo] = useState("")

    const handleRadioChange = (e) => {
        setTipo(e.target.value)
    }


    return(
        <div className="background-form">
            <div className="input-form">
                <label htmlFor="">Descrição</label>
                <input type="text" name="" id="" required/>
            </div>
            <div className="input-form">
                <label htmlFor="">Number</label>
                <input type="number" step={0.01} name="" id="" required/>
            </div>
            <div className="input-form">
                <label htmlFor="">Entrada</label>
                <input type="radio" name="tipo" value="entrada" onClick={handleRadioChange}/>
            </div>
            <div className="input-form">
                <label htmlFor="">Saída</label>
                <input type="radio" name="tipo" value="saida" onClick={handleRadioChange}/>
            </div>
            {
                tipo == "saida" ? 
                <div className="input-form">
                    <select name="categorias" id="">
                        <option value="contas">--selecione--</option>
                        <option value="contas">Contas</option>
                        <option value="alimentacao">Alimentação</option>
                        <option value="lazer">Lazer</option>
                    </select>
                </div>
                : ''
            }
        </div>
    )
}

export default Form