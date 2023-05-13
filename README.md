# funPackSet

一个js包集合
其会更新很多贴合于实际开发可高复用的方法集合包，会不定期更新，如果觉得帮助到你了可以给点一个Star


已发布到npms上可以使用
npm install jspackset
快速导入包

使用方法
import { 按需导入 } from 'jspackset/main/index.js'

目前就一个表单校验方法
rules(表单对象,消息队列)

表单对象Object类型
消息队列Array类型
可支持自定义消息队列callback
返回值 [bool,消息队列里的信息]

示例
rules(obj,['请填写姓名',age,'请填写性别']);

自定义函数示例

var age = (val)=>{
if(!val){
return [false,'年龄不能为空']
}else if(val < 1){
return [false,'请输入正常的年龄']
}
return [true,'']
}