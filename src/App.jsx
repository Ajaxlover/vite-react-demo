import { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment,incrementByAmount,incrementAsync } from './store/modules/counterStore'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Son from './Son'

import { Outlet, Link } from 'react-router-dom'
// ------------------------------------------------------------------------------
// zustand
import { create } from 'zustand'
const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  fetchBears: () => {
    setTimeout(()=>{
      set((state) => ({ bears: state.bears + 1 }))
    },4000)
  },
}))
// ------------------------------------------------------------------------------

function App() {
  // zustand操作状态
 const bears = useBearStore((state) => state.bears)
 const increasePopulation = useBearStore((state) => state.increasePopulation)
 const removeAllBears = useBearStore((state) => state.removeAllBears)
 // 异步修改
 const fetchBears = useBearStore((state) => state.fetchBears)


  const [count, setCount] = useState(0)
  const [fatherMsg] = useState('哈哈啊哈')
  const [sonMsg,setSonMsg] = useState('')

  const storeCount = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  const fatherMethod = (val)=>{
       setSonMsg(val)
  }
  
  useEffect(()=>{
    console.log('父组件渲染11')
    return ()=>{
      // 清除副作用
    }
  },[])

  return (
    <>
     <div>
        <span>zustand状态管理：{bears}</span>
        <button onClick={increasePopulation}>+1</button>
        <button onClick={removeAllBears}>归零</button>
        <button onClick={fetchBears}>4s后+1</button>
      </div>
      <h1>这是子组件传来的值：{sonMsg}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Son fatherMsg={fatherMsg} fatherMethod={fatherMethod} >
          <span>滋滋滋</span>
        </Son>
      </div>
      <div>
        <span>redux状态管理：{storeCount}</span>
        <button onClick={()=>dispatch(increment())}>+1</button>
        <button onClick={()=>dispatch(decrement())}>-1</button>
        <button onClick={()=>dispatch(incrementByAmount(5))}>+5</button>
        <button onClick={()=>dispatch(incrementAsync(4))}>3s后+4</button>
      </div>
      <div>
        <Link to="/login">login</Link>
        <br />
        <Link to="/about">关于ppp</Link>
      </div>
    </>
  )
}

export default App
