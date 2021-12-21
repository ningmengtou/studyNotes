import React, { useState } from "react";
import "./style.scss"


const Tabs = (props) => {

    // 初始化 tabs 默认索引
    const [currentIndex, setCurrentIndex] = useState(0)

    // li标签点击后重置 currentIndex
    const liClick = (index) => {
        setCurrentIndex(index)
    }

    // 根据 currentIndex 返回不同的 类名
    const activeStyle = (index) => {
        if (index === currentIndex) {
            return "Tab_title active"
        } else {
            return "Tab_title"
        }
    }

    // React.Children.map
    // 用于遍历结构中的层级(类似于数组)
    // 参数一是包裹的子集结构
    // 参数二是函数(对应结构，索引)



    return (
        <div style={{ 'paddingBottom': '50px' }}>
            <ul className="Tab_title_wrap">
                {
                    React.Children.map(props.children, (ele, index) => {
                        // ele.props.label 可以获取到结构中的标签
                        return <li className={activeStyle(index)} key={index} onClick={() => { liClick(index) }}>{ele.props.label}</li>
                    })
                }
            </ul>
            <div>
                {
                    // 根据 currentIndex 对应的的结构来渲染视图
                    <div>{props.children[currentIndex].props.children}</div>
                }
            </div>
        </div>
    )
}

export default Tabs