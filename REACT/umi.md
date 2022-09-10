##### 路由  umi 可以选择自己配置路由或者umi自带路由配置

```react
/src/pages  这是专门的路由文件

import React from 'react'
import { Redirect } from 'umi'
// index是默认的首页
export default function index() {
    // 使用重定向跳转到想要的页面
    return (
        <Redirect to="/film" />
    )
}

import React from 'react'
// 这个文件是 404 页面
export default function NotFound() {
  return (
    <div>404  NotFound</div>
  )
}

嵌套路由使用  _layout 文件名是固定写法  film 是文件夹
和此文件同级的就是嵌套组件
src\pages\film\_layout.tsx

import React from 'react'
import { Redirect, useLocation } from 'umi'

export default function Film(props: any) {
  const location = useLocation()
  // 嵌套路由跳转根据路径重定向
  if (location.pathname === '/film' || location.pathname === '/film/') {
    return <Redirect to='/film/nowplay' />
  }
  return (
    <div>
      <div style={{ background: 'yellow', height: '100px', width: '100%' }}>大轮播</div>
      {props.children}
    </div>
  )
}
```

##### 声明式导航

```react
layouts 文件夹名称固定 
\src\layouts\index.tsx

import React from 'react'
import { NavLink } from 'umi'
import './index.less'

// layoutIndex 就是整个应用的根组件
export default function layoutIndex(props: any) {
  return (
    <div>
      {props.children}
      <ul>
        <li>  <NavLink to='/film' activeClassName='active'>film</NavLink> </li>
        <li> <NavLink to='/cinema' activeClassName='active'>cinema</NavLink></li>
        <li> <NavLink to='/center' activeClassName='active'>center</NavLink></li>
      </ul>
    </div>
  )
}
```

##### 动态路由传参

```react
detail 是路由文件夹 [id].tsx 表明接受一个key为id的参数
src\pages\detail\[id].tsx

import React from 'react'
import { useParams } from 'umi'

interface IProps {
    id?: String 
}

export default function Detail() {
    const params = useParams<IProps>()
    console.log(params);
    
  return (
    <div>详情id是：{params.id}</div>
  )
}
```

##### 路由拦截

```react
import React from 'react'
function Center() {
    return (
        <div>Center</div>
    )
}
// 利用 wrappers 指定给 Center 创建一个父组件
// 由父组件来判断是否显示 Center 
Center.wrappers = ["@/pages/wrappers/Auth"]
export default Center


src\pages\wrappers\Auth.tsx
import React from 'react'
import { Redirect } from 'umi'

export default function Auth(props: any) {
    if (localStorage.getItem('token')) {
        return (
            <div>{props.children}</div>
        )
    }else {
        return (
            <Redirect to="/login"/>
        )
    }
}
```

