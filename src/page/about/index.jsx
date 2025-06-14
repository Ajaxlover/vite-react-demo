import { useSearchParams,useNavigate } from "react-router-dom"
const About = () =>{
  const [params] = useSearchParams()
  let id = params.get('id')

  const navigate = useNavigate()
  // let all = params.getAll('')
  return (<>
  <div>我是关于页---{id}</div>
  <button onClick={()=>navigate(`/article/1005`)}>跳转文章页1005</button>
  </>)
}

export default About
