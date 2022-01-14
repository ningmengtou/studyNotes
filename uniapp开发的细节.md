#### 处理2次打开app慢的问题  代码写在 App.vue中

```js
switch (uni.getSystemInfoSync().platform) {
      case 'android':
        plus.navigator.closeSplashscreen(); //console.log('运行Android上')
        break;
      case 'ios':
        plus.navigator.closeSplashscreen(); //console.log('运行iOS上')
        break;
      default:
        break; //console.log('运行在开发者工具上')
}
```

#### 处理隐私弹窗出现在授权弹窗之前   于distribute同级

```js
"privacy" : {
            "prompt" : "template",
            "template" : {
                "title" : "用户协议和隐私政策",
                "message" : "请你务必审慎阅读、充分理解“用户协议”和“隐私政策”各条款，包括但不限于：为了更好的向你提供服务，我们需要收集你的设备标识、操作日志等信息用于分析、优化应用性能。你可阅读<a href='https://www.zaoge.com/app/yuzhua_yhxy.htm'>《用户协议》</a>和<a href='https://www.zaoge.com/app/yuzhua_yszc.htm'>《隐私政策》</a>了解详细信息。<br/><br/>1、为向您提供查询交易等相关基本功能，我们会收集、使用必要的信息；<br/>2、为保障您的账号以及使用后安全，您需要授权我们获取您的设备权限，您有权拒绝或取消授权，取消后将不影响您使用我们提供的其他基础服务；<br/>3、我们会采用业内最先进的安全措施保护您的信息安全；<br/>4、为了更方便描述您的需求，我们会申请您的图片、位置等权限；<br/>5、您可以查询、更正、删除您的个人信息，我们也提供账户注销渠道；<br/>  如果你同意，请点击下面按钮开始接受我们的服务。",
                "buttonAccept" : "同意",
                "buttonRefuse" : "不同意并退出App",
                "second" : {
                    "title" : "温馨提示",
                    "message" : "进入应用前，你需先同意<a href='https://www.zaoge.com/app/yuzhua_yhxy.htm'>《用户协议》</a>和<a href='https://www.zaoge.com/app/yuzhua_yszc.htm'>《隐私政策》</a>,否则将退出应用。",
                    "buttonAccept" : "同意并继续",
                    "buttonRefuse" : "退出应用"
                }
            }
};
```

#### 跳转为滑动效果

```js
uni.navigateTo({
          url: `../trademarkQuery/trademarkQuery?keyword=${this.keyword}`,
          animationType: 'pop-in',
          animationDuration: 300
  });
```

##### uniapp判断平台

```js
// #ifdef APP-PLUS
需要编译的代码   //仅仅出现在app的代码
// #endif

// #ifndef APP-PLUS
需要编译的代码   //除了app平台，其它平台均存在的代码
// #endif

// #ifdef H5 || MP-WEIXIN
需要编译的代码   //仅仅出现在微信小程序和app的代码
// #endif
```

##### uniapp转小程序时不允许使用 eval() 方法

```js
import { evaluate } from '../../util/eval5.min.js';//支付宝小程序不兼容eval      
// #ifdef MP-ALIPAY
    let result = evaluate(res); // res 为字符串函数
    console.log('支付宝平台res', result);		
// #endif

```

##### 获取app的版本号

```js
 plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
      this.version = wgtinfo.version
 });	
```

##### 解决app.vue中不能异步的问题，改为同步，执行后再执行页面加载onLoad方法

```js
1.main.js添加如下代码
Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve
})
2.在 App.vue 的 onLaunch 中增加代码 this.$isResolve()
onLaunch () {
    // #ifndef H5
    uni.login({
        success: loginRes => {
            // #ifdef MP-WEIXIN
            login({ // 该接口为我们自己写的获取 openid/token 的接口，请替换成自己的
                appId: 'wx1234567890',
                code: loginRes.code
            }).then(res => {
                try {
                    console.info(res.object.token)
                    uni.setStorageSync('mcToken', res.object.token)
                    this.$isResolve()
                } catch (e) {
                    console.error(e)
                }
            })
            // #endif
        }
    })
    // #endif
}
3.在页面 onLoad 中增加代码 await this.$onLaunched
async onLoad(option) {
    //等待登录成功	
    await this.$onLaunched;
	
    // 后续业务逻辑
},
```

##### uniapp开发支付宝小程序发送模板消息

```js
   
//manifest.json
"mp-alipay" : {
        "usingComponents" : true,
		"appid":"2021002182622786",
		  "plugins": {
		    "subscribeMsg": {
		      "version": "*",
		      "provider": "2021001155639035"
		    }
		  }
    },


//pages.json	
{
			"path": "pages/personal/personal",
			"style": {
				"navigationBarTitleText": "我的",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#ffffff",
				"usingComponents": {
					"subscribe-msg": "plugin://subscribeMsg/subscribe-msg"
				}
			}
    },



<button @click="ontop">ontop</button>
	 <!-- 引入消息订阅组件 -->
	  <subscribe-msg />

    
    const { requestSubscribeMessage } = requirePlugin('subscribeMsg');
    
methods：{
	// 发送模板
	ontop() {
		requestSubscribeMessage({
			// 模板id列表，最多3个
			entityIds: ['4f0c0e2199484f10aaf22a0babb9e81a'],//模板id
			// 接收结果的回调方法
			callback(res) {
				console.log('订阅回调', res);
				
				if (res.success) {
	
				my.getAuthCode({
				  scopes: ['auth_user'],
				 // 主动授权：auth_user，静默授权：auth_base或者其它scope。如需同时获取用户多项授权，可在 scopes 中传入多个 scope 值。
				  success: (res) => {
				  
					if (res.authCode) {
					  // 认证成功
					  // 调用自己的服务端接口，让服务端进行后端的授权认证，并且利用session，需要解决跨域问题
					  my.request({
						url: 'https://api.wangzhandb.com/aop/alipayOauthToken.php', // 该url是您自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
						data: {
						  authCode: res.authCode,
						  type:4
						},
						success: (res) => {
							// 授权成功并且服务器端登录成功
							
							let userid = res.data['alipay_system_oauth_token_response']['user_id']
							
							
							let obj = {
								to_user_id:userid,
								user_template_id:'4f0c0e2199484f10aaf22a0babb9e81a',
								page:'pages/index/index',
								data:'{"keyword1": {"value" : "12:00"},"keyword2": {"value" : "20180808"},"keyword3": {"value" : "支付宝"}}'
								
							}
							
							uni.request({
								url:'https://api.wangzhandb.com/aop/alipayMsg.php',
								method:'POST',
								header:{
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								data:{
									message:JSON.stringify(obj),
									type:4
								},
								success:res=>{
									console.log(res)
								}
							})
						}
					  });
					}
				  },
				});
				} 
			}
		});
	}
}
```

##### OPPO打包空包时

```js
jarsigner -verbose -keystore shangban.jks -signedjar OppoSignVerify_signed.apk OppoSignVerify.apk shangban(这里是别名不需要后缀)

```

##### uniapp取消授权弹窗

```
"android" : {
				"permissionExternalStorage" : {
				    "request" : "none",
				    "prompt" : "应用保存运行状态等信息，需要获取读写手机存储（系统提示为访问设备上的照片、媒体内容和文件）权限，请允许。"
				},
				"permissionPhoneState" : {
				    "request" : "none",
				    "prompt" : "为保证您正常、安全地使用，需要获取设备识别码（部分手机提示为获取手机号码）使用权限，请允许。"
				},
```

##### uview引入报错问题

```
import uView from '@/uni_modules/uview-ui'
```

##### uniapp忽略版本的提示弹窗

```
    "app-plus" : {
		"compatible" : {
		    "ignoreVersion" : true //true表示忽略版本检查提示框，HBuilderX1.9.0及以上版本支持  
		}
	}
```

##### 支付宝小程序图片加载问题

```js
//路径添加 https://images.weserv.nl/?url=
<image  :src="'https://images.weserv.nl/?url='+detailJson.picture" mode="widthFix"></image>
```

##### uniapp中引入字体

```
@font-face {
  font-family: 'myFont';
  src: url('./utils/shuzi.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
}
```

##### 微信授权代码

```js
//e是点击事件参数 
wx.login({
    success: async(res)=>{
            let phone = await this.getWeiPhone(e,res.code)
            if(phone.length === 11) {
            this.isShowLogin = true; //个人中心页面单独拥有
            this.myPhone = phone;
        }
    }
})
	
	// 微信小程序授权登录获取手机号的方法封装
	Vue.prototype.getWeiPhone = function(e, code) {
	  if (e.detail.errMsg != 'getPhoneNumber:ok') {
	    return false
	  }
	  let appId = 'wx84d8b1d8054d9813'
	  let secret = 'b9516b317abdd8efb1ac73d8e81e3156'
	  let encryptedData = e.detail.encryptedData
	  let iv = e.detail.iv
	  return new Promise((resolve, reject) => {
	    wx.request({
	      url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
	      method: 'GET',
	      success: result => {
	        console.log(result)
	        var pc = new WXBizDataCrypt(appId, result.data.session_key)
	        var data = pc.decryptData(encryptedData, iv)
	        uni.setStorageSync('userPhone', data.phoneNumber)
			this.$store.commit('changeAuth',true)
	        resolve(data.phoneNumber)
	      }
	    })
		
	  })
	}
```

##### 支付宝授权代码

```js
      let phoneNumber = await this.authorizePhone();

      if (phoneNumber.length == 11) {
        this.isLogin = true;
      }
    
    // 支付宝授权登录
    Vue.prototype.authorizePhone = function() {
      return new Promise((resolve, reject) => {
        my.getPhoneNumber({
          success: (res) => {
            let encryptedData = JSON.parse(res.response).response;
            my.request({
              url: 'https://api.wangzhandb.com/aop/alipayTel.php',
              data: {
                'response': encryptedData
              },
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              success: result => {
                if (result.data.code == '10000') {
                  uni.setStorageSync('phoneNum', result.data.mobile); //把手机号存入缓存中
                  resolve(result.data.mobile)
                }
              }
            });
          },
          fail: (res) => {
            reject('getPhoneNumber_fail')
          },
        });
      })
    }
```

