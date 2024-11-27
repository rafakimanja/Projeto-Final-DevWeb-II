import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Index from './components/Index'
import './App.css'
import Gastos from './components/gastos/Gastos'
import TabebaDetalhada from './components/detalhes/TabelaDetalhada'


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {index: true, element: <Index/>},
        {
          path: 'gastos',
          element: <Gastos/>,
        },
        {
          path: 'detalhes',
          element: <TabebaDetalhada/>
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
