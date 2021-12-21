##### Vue的响应式原理

```js
// 定义源数据
        let person = {
            name: '张三',
            age: 20
        }

        //  模拟vue2中数据响应式  准备一个空对象
        // let p = {}
        //  通过Object.defineProperty给p绑定属性，并且get(读取) set(修改)来控制
        // Object.defineProperty(p,'name',{
        //     get() {
        //         console.log('访问了name属性')
        //         return person.name
        //     },
        //     set(value) {
        //         console.log('修改了name属性')
        //         person.name = value
        //     }
        // })
        // Object.defineProperty(p,'age',{
        //     get() {
        //         console.log('访问了age属性')
        //         return person.age
        //     },
        //     set(value) {
        //         console.log('修改了age属性')
        //         person.age = value
        //     }
        // })


        // 模拟vue3中数据响应式 通过proxy实现(代理数据)
        // Proxy是一个构造函数(拦截对象中任意属性的变化)，返回一个代理对象   参数一是源数据，参数二是配置项
        // Reflect(反射)是对源对象的属性进行增删改查的操作
        
        let p = new Proxy(person, {
            // get 读取数据时触发,target是源数据，proName是读取的属性值
            get(target, proName) {
                console.log(target, proName)
                // Reflect.get 读取对象属性
                return Reflect.get(target,proName)
            },
            // set 修改或者增加数据时触发,target是源数据，proName是修改或者增加的属性值,value是修改或者增加的值
            set(target, proName, value) {
                console.log(target, proName, value)
                // Reflect.set  修改或者增加对象属性
                Reflect.set(target,proName,value)
            },
            // deleteProperty 删除属性时触发,target是源数据，proName是删除的属性值
            deleteProperty(target, proName) {
                console.log(target, proName)
                // Reflect.deleteProperty 删除对象属性
                return Reflect.deleteProperty(target,proName)
            }
        })
```

