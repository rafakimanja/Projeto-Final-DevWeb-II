import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Index, {getGastosPeriodos} from './components/Index'
import Gastos, {getGastosMes} from './components/gastos/Gastos'
import TabebaDetalhada, {getDetalhesGastos} from './components/detalhes/TabelaDetalhada'
import './App.css'
import axios from 'axios'

// resolver os dados do mes atual que passa de index para Gastos
// resolver o problema de adicionar um objeto no State que seja do mes diferente do atual
// adicionar CSS

async function deleteGasto(id) {
    const url = `http://localhost:3000/gasto/${id}`
    const {data} = await axios.delete(url)
    return data
}

async function alteraGasto(id, gasto) {
    const url = `http://localhost:3000/gasto/${id}`
    const {data} = await axios.put(url, gasto)
    return data
}

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {index: true, element: <Index/>, loader: getGastosPeriodos},
        {
          path: 'gastos',
          id: 'gastos',
          element: <Gastos deleteGasto={deleteGasto} alteraGasto={alteraGasto}/>,
          loader: getGastosMes
        },
        {
          path: 'detalhes/:mes',
          id: 'gastosDetail',
          element: <TabebaDetalhada deleteGasto={deleteGasto} alteraGasto={alteraGasto} />,
          loader: getDetalhesGastos
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
