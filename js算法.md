#### 随机获取数组中的几个元素

```js
//arr   原数组   count  元素数量
randomImages(arr, count) {
      var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    }
```

##### 获取随机数

```js
// max 最大数  min 最小数
    getrandomInt(max,min) {
      return parseInt(Math.round((Math.random() * (max - min) + min) * 10) / 10);
    },
```

##### 配置rem

```js
  <script>
    (function (doc, win) {
      var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          if (clientWidth >= 750) {
            docEl.style.fontSize = '100px';
          } else {
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
          }
        };

      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
  </script>
```

##### 通过 getBoundingClientRect 获取元素距离视口的位置来实现下来加载更多

```
getBoundingClientRect 可以获取到top,left,right,bottom距离
```

##### 图片加载

```js
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```

##### 随机生成手机号

```js
        function getMoble() {
            var prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "170", "187", "189");
            var i = parseInt(10 * Math.random());
            var prefix = prefixArray[i];
            for (var j = 0; j < 8; j++) {
            prefix = prefix + Math.floor(Math.random() * 10);
            }
            return prefix;
        }
```

##### 星号显示手机号码

```js
       //138******19
       function hidePhone(tel) {
            var reg = /^(\d{3})\d{6}(\d{2})$/;
            return tel.replace(reg, "$1******$2");
        }
```

