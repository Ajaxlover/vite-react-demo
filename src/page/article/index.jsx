import { useParams } from "react-router-dom"
const Article = () =>{
  const params = useParams()
  let id = params.aid
  return <div>我是文章页---{id}</div>
}

export default Article
