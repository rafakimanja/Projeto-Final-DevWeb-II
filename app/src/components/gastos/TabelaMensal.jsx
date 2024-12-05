import iconDelete from '../../assets/iconDelete.svg'
import iconEdit from '../../assets/iconEdit.svg'
import './TabelaMensal.css'

const TabelaMensal = ({gastos, handleDeleteSubmit}) => {
    return(
        <table>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Descricao</th>
                    <th>Valor R$</th>
                    <th>Tipo</th>
                    <th>Categoria</th>
                </tr>
            </thead>
            <tbody>
                {
                    gastos.map((item) => (
                        <tr key={item._id}>
                            <td>{item.data}</td>
                            <td>{item.descricao}</td>
                            <td>R$ {item.valor}</td>
                            <td>{item.tipo}</td>
                            <td>{item.categoria}</td>
                            <td><button onClick={() => handleDeleteSubmit(item._id)}><img src={iconEdit} alt="" srcset="" /></button></td>
                            <td><button><img src={iconDelete} alt="" srcset="" /></button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default TabelaMensal