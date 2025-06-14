import { useState } from 'react'

// props解构
function Son({fatherMsg,fatherMethod}) {
  const [msg, setMsg] = useState('111')

  // console.log(props)

  return (
    <>
      <div>
        {/* {父传子} */}
        我是子组件，父组件传递过来的值：{fatherMsg}
        {/* {子传父} */}
        <div>
        <button onClick={()=>{fatherMethod(msg)}}>点击子传父</button>

        </div>
      </div>
      
    </>
  )
}

export default Son