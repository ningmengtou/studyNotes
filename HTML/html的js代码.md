##### 模拟表单

```js
// 模拟表单
function formSub() {
    var form = document.createElement('form');
    form.action = 'http://p.qiao.baidu.com/cps/chat';
    form.target = '_blank';
    form.method = 'GET';

    var getPath = document.createElement('input');
    getPath.type = 'hidden';
    getPath.name = 'siteId';
    getPath.value = "16687019";
    form.appendChild(getPath);

    var getid = document.createElement('input');
    getid.type = 'hidden';
    getid.name = 'userId';
    getid.value = "33035760";
    form.appendChild(getid);

    var getid1 = document.createElement('input');
    getid1.type = 'hidden';
    getid1.name = 'siteToken';
    getid1.value = "ca2bd609dcd1f45201a759261ac0e1f1";
    form.appendChild(getid1);


    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}
```

