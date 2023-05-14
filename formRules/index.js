/**
 * @param formObj 表单数据
 * @param msgAry 消息队列
 * return [bool,msg];
 * bool 是否校验通过 false true
 * msg 返回msgAry中对应的消息
 * */
let ind = 0;
function rules(formObj,msgAry){
    const typeArr = MsgError.typError(formObj,msgAry);
    // 判断是否是空表单数据或者空消息队列
    if(!typeArr[0]) return typeArr
    //获取所有formObj的所有key
    const keys = Object.keys(formObj);
    //消息队列自定义函数下标
    const callbackInd = detectionFun(msgAry);
    for(let key in formObj){
        if(callbackInd.findIndex(item => item == ind) != -1){
            const cbkAry = msgAry[ind](formObj[key]);
            if(!cbkAry[0]){
                return cbkAry
            }
            ind++;
            continue
        }
        if(!formObj[key]){
            const keyInd = keys.findIndex(item => item == key);
            return [false,msgAry[keyInd]];
        }
        ind++;
    }
    return [true,''];
}

//消息队列自定义判断函数
function detectionFun(msgAry){
    ind = 0;
    const msgIndAry = [];
    msgAry.forEach((item,index) => {
        if(typeof item == 'function'){
            msgIndAry.push(index)
        }
    })
    return msgIndAry
}

class MsgError extends Error{
    // 判断rules传参是否合格
    static typError(formObj,msgAry){
        if(!(formObj instanceof Object)){
            throw TypeError(formObj + ' no Object error')
        }else if(JSON.stringify(formObj) === '{}'){
            return [false,'formObj参数异常']
        }
        if(!(msgAry instanceof Array)){
            throw TypeError(msgAry + ' no Array error')
        }else if(JSON.stringify(msgAry) === '[]'){
            return [false,'msgAry参数异常']
        }
        return [true,'']
    }
}

export {
    rules
}