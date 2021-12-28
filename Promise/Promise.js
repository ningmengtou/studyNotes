/*
自定Promise模块
*/

    /* 
        构建Promise构造函数 
        executor:执行器(函数) 同步执行
    */

    // 定义三个状态常量
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'


function Primose(excutor) {
    // 在执行resolve和reject时this会指向window 所以要存储this
    const self = this


    // promise对象指定状态 默认是padding
    self.status = PENDING
    // promise对象指定存储结果数据的变量
    self.data = undefined
    // promise对象指定的回调函数存储 {onResolved() {},onRejected() {}}
    self.callBacks = []

    function resolve(value) {
        // 只有在pending时可以改变状态
        if(self.status !== PENDING) return false

        // 修改状态
        self.status = RESOLVED
        // 保存数据
        self.data = value
        // 执行对应的回调函数
        if(self.callBacks.length > 0) {
            // 异步执行回调
            setTimeout(() => {
                self.callBacks.forEach(callObj=>{
                    callObj.onResolved(value)
                })   
            });
        }
    }

    function reject(reason) {
        // 只有在pending时可以改变状态
        if(self.status !== PENDING) return false

        // 修改状态
        self.status = REJECTED
        // 保存数据
        self.data = reason
        // 执行对应的回调函数
        if(self.callBacks.length > 0) {
            // 异步执行回调
            setTimeout(() => {
                self.callBacks.forEach(callObj=>{
                    callObj.onRejected(reason)
                })   
            });
        }
    }

    try {
        //执行器函数需要立即执行 同时接受两个函数作为参数
        excutor(resolve,reject) 
    } catch (error) {
        // 如果执行器抛出异常 那promise对象变为rejected状态
        reject(error)
    }

    /* 
    then 指定promise失败或者成功的回调函数 
    同时需要返回一个新的promise 
    返回promise的结果由onResolved和onRejected执行结果决定
    */
    Promise.prototype.then = function(onResolved,onRejected) {
        // 指定 onResolved,onRejected 两个函数的默认值
        // 如果不是函数则改成函数
        onResolved = typeof onResolved === 'function' ? onResolved : value => value
        // 实现异常穿透 指定默认的失败回调 
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

        // 执行 then 方法需要返回一个 promise 对象
        return new Promise((resolve,reject)=>{

            // 定义指定回调处理函数 改变promise状态和值
            // 接受 callback 回调函数 可能是onResolved或者onRejected
            function handle(callback) {
                // 返回值有四种情况
                // 1.抛出异常,状态为rejected,reason为异常error
                // 2.返回非promise,状态为resolved,value为返回值
                // 3.返回是promise,状态为promise状态,值为promise的值
                // 4.没有写返回值,状态为resolved,value为undefined

                try {
                    // 获取回调函数的返回值
                    const result = callback(self.data)
                    if(result === undefined) { // 4.没有写返回值,状态为resolved,value为undefined
                        resolve(result)
                    }else if(result instanceof Promise){ // 3.返回是promise,状态为promise状态,值为promise的值
                        // 想要知道promise的状态就需要使用 result.then 获取状态
                        // 再从回调函数中通过指定状态返回指定值
                        /* result.then(
                            value=>resolve(value),
                            reason=>reject(reason)
                        ) */
                        // 简洁写法
                        result.then(resolve,reject)
                    }else if (!result instanceof Promise) { // 2.返回非promise,状态为resolved,value为返回值
                        resolve(result)
                    }
                } catch (error) { // 1.抛出异常,状态为rejected,reason为异常error
                    reject(error)
                }
            }

            if(self.status === PENDING) {
                // 假设当前还是padding状态，把定义的回调函数存储在callBacks数组中
                // 调用 handle 是为了改变promise状态和值
                self.callBacks.push({
                    onResolved() {
                        handle(onResolved)
                    },
                    onRejected() {
                        handle(onRejected)
                    }
                })
            }else if(self.status === RESOLVED) {
                setTimeout(() => {
                    handle(onResolved)
                });
            }else {
                // 假设当前还是rejected状态，异步执行onRejected函数
                setTimeout(() => {
                    handle(onRejected)
                });
            }

        })
    }

    /* 
    catch 返回promise失败的回调函数
    */
    Promise.prototype.catch = function(onRejected) {
        // 返回一个状态失败的promise
        return this.then(undefined,onRejected)
    }

}


/* 
resolve 返回一个状态为resolved的promise结果
参数可以一般值或者是promise
*/
Promise.resolve = function(value) {
    // 返回一个成功或者失败的promise
    return new Promise((resolve,reject)=>{
        if(value instanceof Promise) { // value是promise
            value.then(resolve,reject)
        }else { // value不是promise
            resolve(value)
        }
    })
}

/* 
reject 返回一个状态为rejected的promise结果
*/
Promise.reject = function(reason) {
    // 返回一个失败的promise
    return new Promise((resolve,reject)=>{
        reject(reason)
    })
}

/* 
all 执行多个promise异步执行函数,全部成功则返回成功,有一个失败则失败
promises 接收的是一个数组 
*/
Promise.all = function(promises) {
    // 成功的计数器
    let resolvedCount = 0
    // 创建一个数组来存放成功的结果 长度和 promises 一致
    const resolveArr = new Array(promises.length)


    // 返回一个新的promise对象
    return new Promise((resolve,reject)=>{
        // 遍历每一个promise对象
        promises.forEach((p,index)=>{
            Promise.resolve(p).then(
                value=>{
                    // 每成功一个promise就加一
                    resolvedCount++
                    // 结果需要和传递过来的promise一一对应
                    resolveArr[index] = value
                    // 计数器和数组长度一致时就返回成功的promise
                    if(resolvedCount === promises.length) {
                        resolve(resolveArr)
                    }
                },
                reason=>{ // 数组中有一个失败就直接reject失败
                    reject(reason)
                }
            )
        })
    })
}

/* 
race 执行多个promise异步执行函数,只取第一个有结果的promise结果
*/
Promise.race = function(promises) {
    // 返回一个新的promise对象
    return new Promise((resolve,reject)=>{
        promises.forEach((p)=>{
            Promise.resolve(p).then(resolve,reject)
        })
    })
}
