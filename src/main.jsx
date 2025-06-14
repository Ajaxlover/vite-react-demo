import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import store from './store'
import { Provider } from 'react-redux'

// console.log(router)


import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import router from './router'



import Login from './page/login/index.jsx'
import About from './page/about/index.jsx'

// const router = createBrowserRouter([
//   {path:'/login',element:<Login/>},
//   {path:'/about',element:<About/>},
// ])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
