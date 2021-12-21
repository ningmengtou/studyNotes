##### 对函数的形参和返回值进行类型限制

```typescript
// 在函数中给形参指明类型 
// 同时可以给函数返回值指明类型  在定义函数() 后面书写类型
// ts在对函数的形参和实参数量上也需要一一对应
function sum(a: number, b: number): number {
    return a + b
}

sum(123, 456)
```

##### unknown 类型的使用和注意事项

```typescript
// unknown 表示 未知类型 可以赋值给变量任意类型(用于变量类型不确定的情况)
let e: unknown;
e = 'hello'
e = 10
e = true

// unknown 类型变量不能直接赋值给其他变量
// 如果需要赋值则需要进行类型判断
if (typeof e === 'string') {
    d = e
}

// 或者断言也可以实现判断 这是断言的两种写法
d = e as string
d = <string>e
```

##### 联合类型的使用

```typescript
//  | 可以让变量连接多个类型(联合类型) 有或的意思
// 让 d 变量可以是数值也可以是字符串
let d: number | string;
d = 10;
d = '10'
```

##### void  类型的使用

```typescript
// void 表示 空值 一般用于定义函数的返回值为 null 或者是 undefined
// 如果不能定义为 null 是 tsconfig.json 中 strict 为 true 
function fn1(): void {
    // return null
    return undefined
}
```

##### never 类型的使用

```typescript
// never 表示 没有值  一般用于定义函数返回报错信息
function fn2(): never {
    throw new Error("报错了");
}
```

##### 定义对象的属性类型以及属性的数量

```typescript
// 指定对象中的属性的类型 name属性是字符串 age属性是数值
// 属性后携带 ? 表示该属性可以有 可以没有
let f: { name: string, age?: number }
// 这里只有是 name 属性是必填属性 age可以有可以没有
f = { name: 'xixi' }

// 这里定义除了 name 属性是必填之外其他属性的属性名是字符串， 值可以是任意值
// propName 可以是别的写法 但是类型必须是字符串 因为js对象的key就是字符串
let g: { name: string, [propName: string]: unknown }

g = {
    name: 'xixi',
    age: 20,
    job: 'ui'
}
```

##### 定义函数结构的类型声明

```typescript
// 指定函数结构(形参，返回值)的类型声明
// 定义类似于箭头函数 括号内声明形成的类型 箭头后面声明函数返回值的类型
// 实参数多于形参数 可以使用剩余参数存放在数组中  剩余参数会被存放在 restOfName 数组中
let h: (a: number, b: number, ...restOfName: number[]) => number
h = function (a, b,...restOfName: number[]) {
    console.log(restOfName)
    return a + b
}
h(1, 10, 22, 33, 44, 55)
```

##### 定义元组的类型声明

```typescript
// 指定元组(固定长度的数组)的类型声明
let o: [string, number, number]
o = ['1', 2, 3]
```

##### &的使用

```typescript
// & 的使用  表示同时 与  表示一个对象需要有name属性同时有age属性
let y: { name: string } & { age: number }
y = {
    name: "唐",
    age: 20
}
```

##### 类型别名

```typescript
// 类型别名 让 1 | 2 | 3 | 4 | 5 类型的别名是 myType
// 这样声明变量可以直接使用 myType
type myType = 1 | 2 | 3 | 4 | 5
let z: myType
z = 2
```

##### 定义类

```typescript
// 定义一个类
class Person{
    // 有 static 关键字的就是类属性或者是类方法

    // 实例属性 可以通过实例对象访问得到
    name:string = '孙悟空';
    // 类属性(静态属性) 只能通过类访问得到  在定义之前需要加 static 关键字
    static age:number = 20;
    // readonly 表示只读属性 不能修改
    readonly job:string = 'ui';
    sayHai() {
        console.log('nihao')
    }
}

// 通过 new 关键字获取实例对象
const p = new Person()

console.log(p.name)
// 实例属性和类属性都可以更改
p.name = '猪八戒'
Person.age = 240
console.log(Person.age)

// 实例方法直接当函数调用就可以了
p.sayHai()

```

##### 构造函数

```typescript
// 构造函数
class Dog{
    // 定义属性类型
    name:string;
    age:number;

    // constructor 构造函数 在创建实例对象时会最先执行的函数
    constructor(name:string,age:number) {
        // 接受到的参数可以给到 this(this指向实例对象) 
        this.name = name
        this.age = age
    }
    bark() {
        console.log(this.name)
    }
}

const dog = new Dog('小黑',2)
console.log(dog)

dog.bark()
```

##### 类的继承

```typescript
(function() {
    class Animal{
        name:string;
        age:number;
        
        constructor(name:string,age:number) {
            this.name = name
            this.age = age
        }

        bark(str:string) {
            console.log(str)
        }
    }
    
    // extends 关键字用于继承 可以继承父类的所有属性和方法
    // Dog类和Cat类都是 Animal父类的子类
    
    class Dog extends Animal{
        miao:number;


        // 如果在子类中想要添加新的属性就必须调用 constructor 函数
        // 但是这样会覆盖掉父类的 constructor 函数 所以需要使用 super() 调用一次
        constructor(name:string,age:number,miao:number) {
            // 这里 super 就相当于 父类 super(name,age)相当于调用了父类的 constructor 函数
            super(name,age)
            this.miao = miao
        }


        // 子类中可以有自己独特的方法
        run(mi:number) {
            console.log(`${this.name}跑了${mi}米`)
        }
    }

    class Cat extends Animal{
        // 方法重写:  当子类中的方法和父类中的方法重名时 会把父类的方法覆盖
        bark() {
            console.log('miaomiaomiao')
        }
     
    }

    let dog = new Dog('小黑',20,430)
    let cat = new Cat("小米",3)

    console.log(dog)
    console.log(cat)
    dog.bark('wang')
    cat.bark()
    dog.run(20)

})()
```

##### 抽象类

```typescript
(function() {
    // 抽象类是指不能被创建实例对象的类 只能被继承 在类前加关键字 abstract
    abstract class Animal{
        name:string;
        age:number;
        
        constructor(name:string,age:number) {
            this.name = name
            this.age = age
        }

        // 抽象方法是指只有方法名，没有方法体 需要被继承的子类重写 在方法前加 abstract
        abstract bark():void
    }
    
    // extends 关键字用于继承 可以继承父类的所有属性和方法
    // Dog类和Cat类都是 Animal父类的子类
    
    class Dog extends Animal{
        bark(){
            console.log('wang')
        }
    }

    class Cat extends Animal{
        bark(){
            console.log('miao')
        }
    }

    let dog = new Dog('小黑',20)
    let cat = new Cat("小米",3)

    console.log(dog)

})()
```

##### 接口的使用

```typescript
(function () {
    // 接口 用于定义类的结构和类型 定义一个类需要包含那些属性和方法
    // 可以当成类型声明使用

    // interface 是定义接口的关键字
    interface myInterface {
        name: string,
        age: number
    }

    // 接口可以同名 效果是合并定义的属性和方法
    interface myInterface {
        job: string
    }

    // 接口中的属性和方法都是没有实际的值的  都是只定义类型的抽象方法或者属性
    interface myInter {
        name:string,
        sayHai():void
    }

    // 当作 类型声明使用
    const test: myInterface = {
        name: 'xixi',
        age: 20,
        job: 'ui'
    }

    // Person 类实现 myInter 接口使用关键字 implements
    // 实现接口就是让类满足接口的要求
    class Person implements myInter {
        name:string
        constructor(name:string) {
            this.name = name
        }
        sayHai() {
            console.log('xixi')
        }
    }

    const p = new Person('小黑')
    console.log(p)
})()
```

##### 类属性的封装

```typescript
(function() {
    // 属性的封装  为了让类中的数据更加安全是通过方法来读取修改属性
    /**
     *  public  修饰的属性是公共属性可以在任意位置访问修改 默认是公共属性
     *  private 修饰的属性是私有属性,只能在当前类本身位置访问修改
     *  protected  修饰的属性是受保护的，只能在当前类和子类中访问和修改
     */
    class Person{
        private _name:string
        private _age:number
        protected _job:string
        public _height:number

        constructor(_name:string,_age:number,_job:string,_height:number) {
            this._name = _name
            this._age = _age
            this._job = _job
            this._height = _height
        }

        /**
         *  属性存取器 
         *  实际是定义了类方法 当读取或者改写属性时是直接调取方法
         *  
         */

        get name() {
            return this._name
        }

        set name(value:string) {
           this._name = value
        }
    }

    const p = new Person('小黑',18,'ui',180)
    // 想要正常修改或者读取属性可以直接写 但是实际是调用了类方法来读取修改属性
    console.log(p.name) // 小黑
    p.name = '小白'
    console.log(p.name) // 小白
    // 公共属性可以直接修改和访问
    p._height = 200
    console.log(p._height) //200


    class A {
        protected num:number = 20
        
    }
    class B extends A {

    }

    const b = new B()
    // protected 属性子类可以访问修改
    console.log(b) //{num: 20}

    // 简写形式
    class C {
        constructor(private name:string,private age:number) {

        }
    }

    // 上面的简写形式相当于
    // class C {
    //     private name
    //     private age
    //     constructor(name:string,age:number) {
    //         this.name = name
    //         this.age = age
    //     }
    // }

    const c = new C('xixi',20)
    console.log(c)  //{name: 'xixi', age: 20}

})()
```

##### 泛型的使用

```typescript
(function () {
    // 泛型  在定义函数或者类时  如果遇到类型不明确就可以使用泛型

    // fn<T>  定义fn函数使用泛型 T 这个可以任意命名
    // (a:T)  定义参数类型是 T
    // : T    定义函数返回值类型是 T
    function fn<T>(a: T): T {
        return a
    }

    // 泛型会在使用函数时执行 这里参数的类型是 number 那么 T 泛型就是 number 类型
    let a = fn(10)

    // 如果ts不明确类型 可以自己在调用函数时指定泛型
    fn<string>('hai')

    // 泛型可以多个一起使用
    function fn2<T, K>(a: T, b: K): K {
        console.log(a)
        return b
    }

    let b = fn2('hai', 11)
    // 也可以在执行函数时定义好泛型
    let c = fn2<string,number>('xixi',12)

    // 泛型可以和接口一起使用
    interface myInter {
        length:number
    }

    // extends 关键字可以实现对接口的继承 意思泛型可以是一个子类
    function fn3<T extends myInter>(a:T):number{
        return a.length
    }

    let d = fn3('hai')
    console.log(d)

    // 类中使用泛型
    class Person<T> {
        name:T
        constructor(name:T) {
            this.name = name
        }
    }

    let p = new Person<string>('孙悟空')

    // 总结：在不知道类或者函数结构是什么类型的时候就使用泛型

})()
```

