import React, { useEffect, useState, useRef } from "react";
import './style.scss'

const LoadMore = (props) => {

    // 获取到加载更多的元素
    const load = useRef()

    // 默认给了很高的高度
    const [loadTop, setLoadTop] = useState(100000)

    useEffect(() => {
        // 定义定时器
        let timer = null
        // 获取视口高度
        let windowHeight = document.documentElement.clientHeight

        function loadFunc() {
                // 判断元素是否存在
                if (load.current) {
                    // 重新设置元素距离顶部距离
                    setLoadTop(load.current.getBoundingClientRect().top)
                    if (windowHeight > loadTop) {
                        // 防抖
                        if (timer) {
                            clearTimeout(timer)
                        } else {
                            timer = setTimeout(() => {
                                props.getMore()
                            }, 500)
                        }
                    }
                }
        }

        // 页面滚动触发事件
        window.addEventListener('scroll', loadFunc)
        
        // 页面卸载取消滚动事件，清除定时器
        return ()=>{
            clearTimeout(timer)
            // window.removeEventListener('scroll',loadFunc)
        }
      
    }, [loadTop])

    return (
        <div className="more" ref={load}>加载更多</div>
    )
}

export default LoadMore