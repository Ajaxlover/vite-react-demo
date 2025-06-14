import { Link,Outlet } from "react-router-dom"
const Layout = ()=>{
  return (<>
  <div>我是一级路由</div>
  <Link to="/layout">跳转看板页</Link>
  <br />
  <Link to="/layout/setting">跳转设置页</Link>
  <Outlet></Outlet>
  </>)
}

export default Layout
