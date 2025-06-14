import { createBrowserRouter,createHashRouter } from 'react-router-dom'


import Login from '../page/login'
import About from '../page/about'
import Article from '../page/article'
import App from '../App'

import Layout from '../page/layout'
import Board from '../page/board'
import Setting from '../page/setting'

import NotFound from '../page/notFound'

// createHashRouter    设置hash路由模式   ----无需后端支持

let router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/layout',
    element: <Layout />,
    children:[{
      // path:'board',
      index:true,  // 设置为默认二级路由
      element:<Board/>
    },{
      path:'setting',
      element:<Setting/>
    }]
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/article/:aid',
    element: <Article />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
