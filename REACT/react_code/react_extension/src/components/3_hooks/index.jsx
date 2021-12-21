import React, { Component } from 'react'
import ReactDOM from 'react-dom'


// 类式组件
// class Demo extends Component {
//     state = {
//         count:0
//     }

//     // 创建保存ref的容器
//     myRef = React.createRef()

//     // 组件挂载之后的生命周期
//     componentDidMount() {
//         this.timer = setInterval(()=>{
//             this.setState(state=>({count:state.count+1}))
//         },1000)
//     }

//     // 添加数字
//     add = ()=>{
//         this.setState(state=>({count:state.count+1}))
//     }
    
//     // 展示ipt框内容
//     showIpt = ()=>{
//         alert(this.myRef.current.value)
//     }

//     // 卸载组件之前清空定时器
//     componentWillUnmount() {
//         clearInterval(this.timer)
//     }


//     // 卸载组件
//     unMount = ()=>{
//         ReactDOM.unmountComponentAtNode(document.getElementById('root'))
//     }

//     render() {
//         return (
//             <div>
//                 <h2>求和：{this.state.count}</h2>
//                 <input type="text" ref={this.myRef} />
//                 <button onClick={this.add}>点击加一</button>
//                 <button onClick={this.unMount}>卸载组件</button>
//                 <button onClick={this.showIpt}>展示input框内容</button>
//             </div>
//         )
//     }
// }


// 函数式组件
function Demo() {

    // React.useState 用于在函数组件中创建状态 参数为默认状态值 返回值为一个数组
    // 索引0是状态值 索引1是修改状态的方法
    const [count, setCount] = React.useState(0)
    const [name, setName] = React.useState('TOM')

    const [params,setParams] = React.useState({
        name:'xixi',
        age:20,
        mooney:'20k'
    })

    // React.useRef用于创建ref容器
    const myRef = React.useRef()

    // React.useEffect 可以模拟类式组件中的生命周期函数
    // 第一个参数是函数 
    // 第二个参数是一个数组  数组中可以写React.useState定义的状态
    // 数组为空表示为不监视任何状态 类似componentDidMount周期(只执行一次)
    React.useEffect(() => {
        let timer = setInterval(()=>{
            setCount(count=>count+1)
        },1000)
        // 第一个函数中的返回函数类似于 componentWillUnmount 卸载组件之前的操作
        return ()=> {
            clearInterval(timer)
        }
    },[])

    // 数组中监视 count 表示在 count 改变时执行函数
    React.useEffect(() => {
        console.log('@@@@')
    },[count])


    // 添加数值
    function add() {
        // 直接传值可直接修改状态
        // setCount(count+1) 

        // 参数为一个函数 函数参数是保存的状态 需要一个返回值
        setCount(count => count + 1)
    }

    // 改变名字
    function changeName() {
        setParams({name:'yiyi'})
    }

    // 卸载组件
    function unMount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }

    // 展示ipt框的值
    function showIpt() {
        // 可以获取出保存的ref值
        alert(myRef.current.value)
    }

    return (
        <div>
            <h2>求和：{count}</h2>
            <h2>我的名字是:{params.name}</h2>
            <input type="text" ref={myRef} />
            <button onClick={add}>点击加一</button>
            <button onClick={changeName}>修改名字</button>
            <button onClick={unMount}>卸载组件</button>
            <button onClick={showIpt}>展示ipt组件</button>
        </div>
    )
}


export default Demo
