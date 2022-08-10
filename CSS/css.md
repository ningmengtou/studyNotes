##### 美化滚动条

```css
::-webkit-scrollbar{ width: 5px; height: 1px;}
::-webkit-scrollbar-thumb{ border-radius: 10px; box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); background: #999;}
::-webkit-scrollbar-track{ box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); border-radius: 10px; background: #ededed;}
```

##### 把div变成可以编辑的表单元素(模拟textarea)

```css
-webkit-user-modify: read-write-plaintext-only;
```

##### 图片固定宽高模糊处理

```css
img {    
image-rendering: -moz-crisp-edges; /* Firefox */     
image-rendering: -o-crisp-edges; /* Opera */      
image-rendering: -webkit-optimize-contrast; /*Webkit (non-standard naming) */ 
image-rendering: crisp-edges; 
-ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
}
```

