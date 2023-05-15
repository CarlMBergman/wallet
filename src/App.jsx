import './App.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Home from './views/Home'
import AddCard from './views/AddCard'
import Top from './components/Top'

function App() {
  const [heading, setHeading] = useState('E-WALLET');
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home setHeading={ setHeading }/>
    },
    {
      path: '/addcard',
      element: <AddCard setHeading={ setHeading }/>
    }
  ])

  return (
    <div className="App">
      <Top heading={ heading }/>
      <RouterProvider router={ router } />
    </div>
  )
}

export default App
