import { useRef } from "react"
import { useNavigate } from "react-router-dom"
// css module 处理样式冲突
import styles from './login.module.less'
const Login = ()=>{
  const navigate = useNavigate()
  const inputRef = useRef(null)

  console.log(inputRef)
  return (<>
  <div className={styles.login_color}>我是登录页1111</div>
  <input type="text" ref={inputRef} />
  <button className={styles.bg_color} onClick={()=>navigate(`/about?id=15&name=jack`)}>跳转到关于</button>
  </>)
}

export default Login
