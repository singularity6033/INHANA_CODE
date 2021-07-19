const cloud = require('wx-server-sdk')
cloud.init({
  env: 'inhana-cloud-1g9obu9p408701c5'
})
const db = cloud.database()
const _ = db.command
var sendMsg = async(item) =>{
  const result = await cloud.openapi.subscribeMessage.send({
      touser: item.openid,
      page: item.page,
      lang: 'zh_CN',
      data: {
        //这些参数都会在模板详情那有，这些参数不能弄错，一旦弄错就发送不了
        thing2:{
          value:item.thing2
        },
        thing1:{
          value:item.thing1
        },
        thing4:{
          value:item.thing4
        }
      },
      templateId: 'swn5payd67W7ngcC_xCqBsxdKK_ntSeZ64Qq2jlKgnY',
    })
    const remove = await db.collection('template_msg1').where({
      openid: item.openid
    }).remove()
}

const MAX_LIMIT = 100
exports.main = async (event, context) => {
  // 先取出集合记录总数
  const countResult = await db.collection('template_msg1').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('template_msg1').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // 等待所有
  var arr = (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
  for(var i=0;i<arr.data.length;i++){
    sendMsg(arr.data[i])
  }
}