import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Main from './Main/Main'
import Home from './Home/Home'


const router = createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      }
    ]
  }
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='w-11/12 mx-auto'>

    <RouterProvider router={router}></RouterProvider>
    </div>
  </StrictMode>,
)
