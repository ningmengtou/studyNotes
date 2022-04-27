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

##### 获取指定几天后的日期

```js
GetDateStr(5);//后5天
function GetDateStr(AddDayCount) {   
   var dd = new Date();  
   dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期  
   var y = dd.getFullYear();   
   var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0  
   var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0  
   console.log(y+"-"+m+"-"+d)
   return y+"-"+m+"-"+d;   
};
```

##### 隐藏隐私信息

```js
//str 原始字符串 frontLen 前面需要保留的字符 endLen 后面需要变成*的字符
hidden(str,frontLen,endLen) { 
           var len = str.length-frontLen-endLen;
           var xing = '';
           for (var i=0;i<len;i++) {
           xing+='*';
          }
           return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
        }
```

##### 时间戳转换

```js
//时间戳转换方法    date:时间戳数字
function formatDate(date) {
  var date = new Date(date);
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD +" "+hh + mm + ss;
}
```

##### 数值精度问题

```js
// num 数值参数  precision 精度
function strip(num, precision = 12) {
  return +parseFloat(num.toPrecision(precision));
}
```

##### 转义

```js
hTMLEncode(html) {
            var temp = document.createElement("div");
            (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
            var output = temp.innerHTML;
            temp = null;
            return output;
 }
```

##### 类型检测

```js
let type = function(data) {
            var toString = Object.prototype.toString;
            var dataType = toString
                    .call(data)
                    .replace(/\[object\s(.+)\]/, "$1")
                    .toLowerCase()
            return dataType
        };
```

