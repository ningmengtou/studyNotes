```js
//下载测试用例包
npm i react-test-renderer  
创建测试文件夹 建议 test 命名 
每一个测试文件要以 .test.js 作为文件后缀名
执行测试 npm test 

import ShallowRender from "react-test-renderer/shallow"
import App from "../App"

describe("react-test-render", function () {
    it("app 的名字是todolist", function () {
        // 获取浅的渲染实例
        const render = new ShallowRender()
        // 渲染组件
        render.render(<App />)
        // getRenderOutput() 获取到的是组件的虚拟dom结构
        console.log(render.getRenderOutput());

        // expect 期望  toBe 结果是
        // 期望第一个子节点的dom节点是 h1 标签
        expect(render.getRenderOutput().props.children[0].type).toBe("h1")
        expect(render.getRenderOutput().props.children[0].props.children).toBe("todolist")
    })
})
```

##### enzyme     测试库

```js
npm i enzyme
npm i @wojtekmaj/enzyme-adapter-react-17  需要安装适配器

import Enzyme from "enzyme"
import adpater from "@wojtekmaj/enzyme-adapter-react-17"
Enzyme.configure({adpater:new adpater()})

describe("react-test-render", function () {
    // shallow 渲染虚拟dom  mount 渲染真实dom

    // it 定义测试点 查看名字是否是 todolist
    it("app 的名字是todolist", function () {
        let app = shallow(<App />)
        expect(app.find("h1").text()).toEqual("todolist")
    })

    it("删除功能是否正常", function () {
        let app = mount(<App />)
        let items = app.find("li").length
        app.find("button.del").at(0).simulate("click")
        expect(app.find("li").length).toEqual(items - 1)
    })

    it("添加功能是否正常", function () {
        let app = mount(<App />)
        let items = app.find("li").length
        app.find("button.add").at(0).simulate("click")
        expect(app.find("li").length).toEqual(items + 1)
    })
})
```

