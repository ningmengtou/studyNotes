##### react基本使用

```jsx
    <!-- 指定一个dom -->
    <div id="test"></div>

    <!-- 引入核心库 -->
    <script src="../js/react.development.js"></script>
    <!-- 引入dom库 -->
    <script src="../js/react-dom.development.js"></script>
    <!-- 引入babel -->
    <script src="../js/babel.min.js"></script>

    <!-- 因为react是通过jsx写的  所以是type="text/babel -->
    <script type="text/babel">
    // 1.创建虚拟dom 值是标签不是字符串 不需要引号
    const VDOM = <h1>hello,react</h1>
    // 2.渲染虚拟dom到页面上 ReactDOM是dom库返回的对象 render是渲染方法
    // ReactDOM.render(虚拟dom,需要被渲染的dom)
    ReactDOM.render(VDOM,document.querySelector('#test'))
    </script>
```

##### jsx规则

```js
     <!-- 指定一个dom -->
     <div id="test"></div>

     <!-- 引入核心库 -->
     <script src="../js/react.development.js"></script>
     <!-- 引入dom库 -->
     <script src="../js/react-dom.development.js"></script>
     <!-- 引入babel -->
     <script src="../js/babel.min.js"></script>
 
     <!-- 因为react是通过jsx写的  所以是type="text/babel -->
     <script type="text/babel">
     // 1.创建虚拟dom 值是标签不是字符串 不需要引号

    const myid = 'title'
    const myspan = 'hello,react'

    const VDOM = (
        <div>
            <h1 id={myid}>
                <span className="red">{myspan}</span>
            </h1>    
            <h2 style={{color:"orange",fontSize:"30px"}}>嘻嘻</h2>
            <input type="text" />
        </div>
     )

     // 2.渲染虚拟dom到页面上 ReactDOM是dom库返回的对象 render是渲染方法
     // ReactDOM.render(虚拟dom,需要被渲染的dom)
     ReactDOM.render(VDOM,document.querySelector('#test'))

    //  jsx规则
    // 1.定义VDOM时不需要写引号
    // 2.jsx中使用js表达式需要使用 {} 来使用变量
    // 3.jsx中使用css样式需要写 className 来指定类名
    // 4.jsx中使用行内样式需要使用 {{}} 复杂的样式属性需要使用驼峰命名
    // 5.jsx中只有一个根标签
    // 6.jsx中的标签必须是闭合的
    // 7.jsx中标签名小写会去找html中的标签,大写则找定义的组件
     </script>
```

##### jsx练习

```jsx
<!-- 因为react是通过jsx写的  所以是type="text/babel -->
     <script type="text/babel">

    //  注意:jsx中只能写js表达式而不是js语句
    // jsx中对数组的处理是自动遍历

     const arr = ['angular','react','vue']

     const VDOM = (
        <div>
            <h1>前端js框架列表</h1>
            <ul>
                {
                    arr.map(item => {
                        return <li key={item}>{item}</li>
                    })
                }
            </ul>
        </div>
     )
     
     ReactDOM.render(VDOM,document.querySelector('#test'))
     </script>
```

##### 函数方式定义组件

```jsx
    <script type="text/babel">
    // 定义函数式组件
    function MyComponent() {
        // 这里的this是undefined 因为babel默认开启严格模式,函数中的this不会指向window
        console.log(this) 
        // 函数需要返回值 返回虚拟dom
        return <h2>我是一个简单的组件</h2>
    }
     
    // 把组件渲染到页面上
    // 组件名是函数名,而且首字母必须是大写
    ReactDOM.render(<MyComponent/>,document.querySelector("#test"))

    // react是如何实现函数式组件的?
    // 1.在react解析组件标签时,找到了 MyComponent 组件
    // 2.发现组件是函数定义的,随后调用该函数,把虚拟dom转成真实dom渲染到页面上
    </script>
```

##### 类方式定义组件

```js
    <script type="text/babel">
        // 定义类式组件
        // 自定义的类需要继承 React.Component 创建组件实例
        class Mycomponent extends React.Component {

            // 需要执行 render 方法 返回一个 jsx 代码来渲染组件
            // 这里 render 方法是在实例对象的原型对象上的
            render() {
                // 这里的 this 指向 组件实例对象 Mycomponent
                console.log(this instanceof Mycomponent) // true
                return (
                    <div>
                        <p>类式组件创建</p>
                        <span>0000</span>
                    </div>
                )
            }
        }

        // 这里的 组件名需要和类名一致 都是需要首字母大写
        ReactDOM.render(<Mycomponent />, document.getElementById('test'))
        // react是如何实现函数式组件的?
        // 1.在react解析组件标签时,找到了 MyComponent 组件
        // 2.发现组件是类定义的,随后通过 new 创建一个实例对象,把虚拟dom转成真实dom渲染到页面上
    </script>
```

##### 标准初始化 state

```js
    <script type="text/babel">
        class Weather extends React.Component {
            // 构造函数调用几次？  1次 创建实例对象时创建
            constructor(props) {
                // 调用 super 执行父类的继承方法
                super(props)

                // 给 state 添加 isHot 属性 初始化状态
                this.state = {
                    isHot: false
                }
                // 解决 demo 中this指向问题
                // 把实例中原型对象的 demo 函数通过 bind 改变 this 并且赋值给到实例对象的函数 demo
                this.demo = this.demo.bind(this)

            }

            // render调用几次？ 1+n 次 首次渲染页面会调用一次 state属性修改了会调用
            render() {
                // 获取state中的isHot属性
                const { isHot } = this.state
                // 事件处理 react 把所有的原生事件 都改成了驼峰处理 
                // 执行的回调函数不需要 () 直接调用 只需要写函数名就可以
                // 这里的 this.demo 不是原型对象的函数 而是实例对象自己的函数
          
                return (
                    <div onClick={this.demo}>今天天气{isHot ? '炎热' : '寒冷'}</div>
                )
            }

            // demo调用几次？ 点击几次调几次
            demo() {
                // 由于 demo 函数是 onClick 的回调 不是实例对象调用的，不是直接调用
                // 由于类中的函数默认开启严格模式 所以这里的this是undefined
                console.log(this)
                
                this.setState({
                    isHot:!this.state.isHot
                })
            }

        }
        ReactDOM.render(<Weather />, document.getElementById('test'))
    </script>
```

##### state的简写形式

```js
    <script type="text/babel">
        class Weather extends React.Component {
            // 初始化状态可以直接在类中定义
            state = {
                isHot: false
            }

            render() {
                const { isHot } = this.state
                return (
                    <div onClick={this.demo}>今天天气{isHot ? '炎热' : '寒冷'}</div>
                )
            }

            // 自定义方法需要使用赋值语句 把方法直接放置在实例对象自身
            // 再通过箭头函数跳转 this 指向到实例对象
            demo = () => {
                this.setState({
                    isHot: !this.state.isHot
                })
            }

        }

        ReactDOM.render(<Weather />, document.getElementById('test'))
    </script>
```

##### props的基本使用

```js
   <!-- 引入对props做限制的js 这样会多出一个 PropTypes 的对象-->
   <script src="../js/prop-types.js"></script>
   
   <script type="text/babel">
        class Person extends React.Component{
            render() {
                console.log(this)
                // this.props 可以获取到组件标签中拿取到的数据
                const {name,age,sex} = this.props
                return (
                    <ul>
                        <li onClick={this.props.demo}>姓名：{name}</li> 
                        <li>年龄：{age}</li>    
                        <li>性别：{sex}</li>    
                    </ul>
                )
            }
        }
        // 对props属性的类型做出限制
        Person.propTypes = {
            name:PropTypes.string.isRequired,//name属性是必填的字符串类型
            age:PropTypes.number,//age属性是数值类型
            sex:PropTypes.string,//sex属性是字符串类型
            demo:PropTypes.func//demo属性是函数类型
        }

        // 对props属性设置默认值
        Person.defaultProps = {
            age:18, //默认为18
            sex:'男'//默认为 男
        }

        // 在组件标签中写入数据
        ReactDOM.render(<Person name="张三" age={18} sex="男"/>,document.getElementById('test1'))
        let p = {
            name:'王六',
            age:23,
            sex:'男',
            demo:demo
        }

        // 这里可以使用 {...p} 来把对象变量直接通过 props 传递
        ReactDOM.render(<Person {...p} />,document.getElementById('test2'))
	    // ReactDOM.render(<Person name="赵五" age="30" sex="男"/>,document.getElementById('test3'))
    

        function demo() {
            console.log('speack')
        }
    </script>
```

##### props的简写形式

```js
<!-- 引入对props做限制的js 这样会多出一个 PropTypes 的对象-->
<script src="../js/prop-types.js"></script>

<script type="text/babel">
        class Person extends React.Component {

            // 通过 static 给类中添加静态属性 来对 props 做限制

            // 对props属性的类型做出限制
            static propTypes = {
                name: PropTypes.string.isRequired,//name属性是必填的字符串类型
                age: PropTypes.number,//age属性是数值类型
                sex: PropTypes.string,//sex属性是字符串类型
                demo: PropTypes.func//demo属性是函数类型
            }

            // 对props属性设置默认值
            static defaultProps = {
                age: 18, //默认为18
                sex: '男'//默认为 男
            }


            render() {
                const { name, age, sex } = this.props
                return (
                    <ul>
                        <li onClick={this.props.demo}>姓名：{name}</li>
                        <li>年龄：{age}</li>
                        <li>性别：{sex}</li>
                    </ul>
                )
            }
        }


        // 在组件标签中写入数据
        ReactDOM.render(<Person name="张三" age={18} sex="男" />, document.getElementById('test1'))
        let p = {
            name: '王六',
            age: 23,
            sex: '男',
            demo: demo
        }

        // 这里可以使用 {...p} 来把对象变量直接通过 props 传递
        ReactDOM.render(<Person {...p} />, document.getElementById('test2'))
        // ReactDOM.render(<Person name="赵五" age="30" sex="男"/>,document.getElementById('test3'))


        function demo() {
            console.log('speack')
        }
    </script>
```

##### 函数形式组件中使用props

```js
    <script type="text/babel">
        // 定义函数式组件
        function Person(props) {
            // 接受 props 来获取参数
            console.log(props)
            const { name, age, sex } = props
            return (
                <ul>
                    <li>姓名：{name}</li>
                    <li>年龄：{age}</li>
                    <li>性别：{sex}</li>
                </ul>
            )
        }

        // 在函数式组件中对 props 直接添加 Person 属性

        Person.propTypes = {
            name: PropTypes.string.isRequired,//name属性是必填的字符串类型
            age: PropTypes.number,//age属性是数值类型
            sex: PropTypes.string,//sex属性是字符串类型
            demo: PropTypes.func//demo属性是函数类型
        }

        // 对props属性设置默认值
        Person.defaultProps = {
            age: 18, //默认为18
            sex: '男'//默认为 男
        }

        console.log(Person.propTypes, 1)

        // 在组件标签中写入数据

        let p = {
            name: '王六',
            age: 23,
            sex: '男'
        }

        // 这里可以使用 {...p} 来把对象变量直接通过 props 传递
        ReactDOM.render(<Person {...p} />, document.getElementById('test2'))

    </script>
```

##### 字符串形式的 ref 不推荐使用

```js
        <script type="text/babel">
        // 通过 ref 可以在 jsx 中给标签打标识 作用类似于原生的id
        // 通过 this.refs 可以获取到所有ref打标识的标签
        class Demo extends React.Component{
            render() {
                return (
                    <div>
                        <input ref="ipt1" type="text"  />
                        <button onClick={this.getIpt1}>点击获取左侧输入框的值</button>
                        <input ref="ipt2" onBlur={this.getIpt2} type="text"  />
                    </div>
                )
            }
            getIpt1 = ()=>{
                const {ipt1} = this.refs
                alert(ipt1.value)
            }
            getIpt2= ()=>{
                const {ipt2} = this.refs
                alert(ipt2.value)
            }
        }
        ReactDOM.render(<Demo/>,document.getElementById('test1'))
        </script>
```

##### 回调形式的ref

```js
        <script type="text/babel">
        // 通过 ref 可以在 jsx 中给标签打标识 作用类似于原生的id
        // 通过 ref 中写入回调函数，函数中的参数就是这个节点 通过赋值给到实例本身的变量上
        // React 会自动调用 ref 定义的回调函数
        class Demo extends React.Component{
            render() {
                return (
                    <div>
                        <input ref={c=>this.ipt1 = c} type="text"  />
                        <button onClick={this.getIpt1}>点击获取左侧输入框的值</button>
                        <input ref={c=>this.ipt2 = c} onBlur={this.getIpt2} type="text"  />
                    </div>
                )
            }
            getIpt1 = ()=>{
                // 在实例中获取到 节点
                const {ipt1} = this
                console.log(this)
                alert(ipt1.value)
            }
            getIpt2= ()=>{
                const {ipt2} = this
                alert(ipt2.value)
            }
        }
        ReactDOM.render(<Demo/>,document.getElementById('test1'))
        </script>
```

#####  React.createRef 创建ref 官方推荐

```js
        <script type="text/babel">
        // 通过 ref 可以在 jsx 中给标签打标识 作用类似于原生的id
        // 通过 ref 中写入回调函数，函数中的参数就是这个节点 通过赋值给到实例本身的变量上
        // React 会自动调用 ref 定义的回调函数
        class Demo extends React.Component{
            // React.createRef 可以创建一个存放 ref 的容器 可以接受到标签中定义的ref
            // 但是这个接收的 ref 是每个标签独立接收的
            myRef1 = React.createRef()
            myRef2 = React.createRef()

            render() {
                return (
                    <div>
                        {/* ref定义的是 React.createRef() 创建出来的 ref 容器 */}
                        <input ref={this.myRef1} type="text"  />
                        <button onClick={this.getIpt1}>点击获取左侧输入框的值</button>
                        <input ref={this.myRef2} onBlur={this.getIpt2} type="text"  />
                    </div>
                )
            }
            getIpt1 = ()=>{
                // 可以通过 this.myRef1 获取到定义的节点
                alert(this.myRef1.current.value)
            }
            getIpt2= ()=>{
                alert(this.myRef2.current.value)
            }
        }
        ReactDOM.render(<Demo/>,document.getElementById('test1'))
        </script>
```

##### 受控控件

```js
<script type="text/babel">
        // 受控组件是指把组件中的值在受到改变时存放在 state 中
        // 优点：可以省略很多 ref 
        class Login extends React.Component {
            // 初始化 state 
            state = {
                username:'',
                password:''
            }
            render() {
                return (
                    <form onSubmit={this.submit}>
                        用户名：<input type="text" onChange={this.saveUsername} />
                        密码：<input type="password" onChange={this.savePassword}/>
                        <button>登录</button>
                    </form>
                )
            }
            // 通过 onChange 事件获取到控件的值并且保存到 state 中
            saveUsername = (event)=>{
                this.setState({
                    username:event.target.value
                })
            }
            savePassword =(event)=>{
                this.setState({
                    password:event.target.value
                })
            }
            submit = (event)=>{
                event.preventDefault()
                // 在表单提交时一同将 state 中的值一同提交
                console.log(this.state)
            }
        }
        ReactDOM.render(<Login />, document.getElementById('test1'))
    </script>
```

##### 非受控控件

```js
<script type="text/babel">
        class Login extends React.Component {
            render() {
                return (
                    <form onSubmit={this.submit}>
                        用户名：<input type="text" name="username" ref={c=> this.username = c}/>
                        密码：<input type="password" name="password" ref={c=> this.password = c}/>
                        <button>登录</button>

                    </form>
                )
            }
            submit = (event)=>{
                // 事件处理回调函数中有个默认参数 event 可以获取到节点信息
                // event.preventDefault() 可以阻止事件默认事件
                event.preventDefault()
                const {username,password} = this
             
                alert(username.value+'-----'+password.value)
            }
        }
        ReactDOM.render(<Login />, document.getElementById('test1'))
    </script>
```

##### 函数柯里化应用

```js
<script type="text/babel">
        class Login extends React.Component {
            // 初始化 state 
            state = {
                username: '',
                password: ''
            }
            // jsx 中的事件接收一个函数作为回调函数  即使函数是调用但是返回值是函数也是可以的
            render() {
                return (
                    <form onSubmit={this.submit}>
                        用户名：<input type="text" onChange={this.saveFrom('username')} />
                        密码：<input type="password" onChange={this.saveFrom('password')} />
                        <button>登录</button>
                    </form>
                )
            }
            // 通过 saveFrom 函数获取参数保存的值是 username 还是 password
            saveFrom = (dataType) => {
                // 返回一个函数作为 onChange 事件的回调函数
                return (event) => {
                    // 读取 dataType 使用 [] 读取 
                    this.setState({
                        [dataType]: event.target.value
                    })
                }
            }
            submit = (event) => {
                event.preventDefault()
                // 在表单提交时一同将 state 中的值一同提交
                console.log(this.state)
            }
        }
        ReactDOM.render(<Login />, document.getElementById('test1'))
    </script>
```

##### react生命周期函数 （旧）

```tex
	1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
        1.constructor()
        2.componentWillMount()
        3.render()
        4.componentDidMount()  常用
	2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
        1.shouldComponentUpdate()
        2.componentWillUpdate()
        3.render()
        4.componentDidUpdate()
	3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
        1.componentWillUnmount()
        
        重要的生命周期勾子
        1.render：  例如：初始化渲染或更新渲染调用
        2.componentDidMount：  例如：开启监听, 发送ajax请求
        3.componentWillUnmount：  例如：做一些收尾工作, 如: 清理定时器
```

