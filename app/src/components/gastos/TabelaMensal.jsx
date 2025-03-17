import React, { useState } from 'react';
import iconDelete from '../../assets/iconDelete.svg';
import iconEdit from '../../assets/iconEdit.svg';
import check from '../../assets/check.svg';
import close from '../../assets/close.svg';
import './TabelaMensal.css';

const TabelaMensal = ({ gastos, handleDeleteSubmit, handleUpdateSubmit }) => {

  const [id, setId] = useState(null);
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [data, setData] = useState('')
  const [tipo, setTipo] = useState('')
  const [categoria, setCategoria] = useState('')

  const handleEditOpen = (item) => {
    setId(item._id)
    setDescricao(item.descricao)
    setValor(item.valor)
    setData(item.data)
    setTipo(item.tipo)
    setCategoria(item.categoria)
  }

  const handleEditClose = () => {
    setId(null)
  }

  const handleSave = () => {
    const obj = {data, descricao, valor, tipo, categoria}
    console.log(obj)
    handleUpdateSubmit(id, obj)
    setId(null) 
  };

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

  return (
  
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Descricao</th>
          <th>Valor R$</th>
          <th>Tipo</th>
          <th>Categoria</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {gastos.map((item) => (
          <tr key={item._id}>
            {id == item._id ? 
            (
              <>
                <td><input type="date" name="data" value={data || ''} onChange={handleDataChange}/></td>
                <td><input type="text" name="descricao" value={descricao || ''} onChange={handleDescricaoChange}/></td>
                <td><input type="number" name="valor" value={valor || ''} onChange={handleValorChange}/></td>
                <td>
                  <select name="tipo" value={tipo || ''} onChange={handleRadioChange}>
                    <option value="entrada">entrada</option>
                    <option value="saida">saida</option>
                  </select></td>
                <td>
                  <select name="categoria" value={categoria || ''} onChange={handleCategoriaChange}>
                    <option value=""></option>
                    <option value="contas">Contas</option>
                    <option value="alimentacao">Alimentação</option>
                    <option value="lazer">Lazer</option>
                    <option value="farmacia">Farmacia</option>
                    <option value="transporte">Transporte</option>
                    <option value="assinaturas">Assinaturas</option>
                    <option value="compras">Compras</option>
                    <option value="outros">Outros</option>
                  </select>
                </td>
                <td>
                  <div className="botoes-alterar">
                    <button onClick={handleSave} id='salvar'><img src={check} alt="iconCheck" /></button>
                    <button onClick={handleEditClose} id='fechar'><img src={close} alt="iconClose" /></button>
                  </div>
                </td>
              </>
            ) : 
            (
              <>
                <td>{item.data}</td>
                <td>{item.descricao}</td>
                <td>R$ {item.valor}</td>
                <td>{item.tipo}</td>
                <td>{item.categoria}</td>
                <td className='coluna-botoes'>
                  <button onClick={() => handleEditOpen(item)} id='editar'>
                    <img src={iconEdit} alt="Ícone de lápis" />
                  </button>
                  <button onClick={() => handleDeleteSubmit(item._id)} id='excluir'>
                    <img src={iconDelete} alt="Ícone de lixeira" />
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaMensal;
