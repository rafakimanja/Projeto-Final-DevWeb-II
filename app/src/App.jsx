import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Index, {getGastosPeriodos} from './components/Index'
import Gastos, {getGastosMes} from './components/gastos/Gastos'
import TabebaDetalhada, {getDetalhesGastos} from './components/detalhes/TabelaDetalhada'
import './App.css'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {index: true, element: <Index/>, loader: getGastosPeriodos},
        {
          path: 'gastos',
          element: <Gastos/>,
          loader: getGastosMes
        },
        {
          path: 'detalhes/:mes',
          id: 'gastosDetail',
          element: <TabebaDetalhada/>,
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
