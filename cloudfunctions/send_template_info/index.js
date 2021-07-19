const cloud = require('wx-server-sdk')
 
cloud.init({
  env: 'inhana-cloud-1g9obu9p408701c5'
})
const db = cloud.database()
exports.main = async (event, context) => {
  const {OPENID} = cloud.getWXContext();

  var res=await db.collection("template_msg").where({
    openid: OPENID,
    timestamp: event.timestamp
  }).count()
  var size=res.total

  if(!size){
    db.collection('template_msg').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        thing5: event.name,
        thing8: event.content,
        name11: event.teacher,
        openid: OPENID,
        page: event.page,
        timestamp: event.timestamp
      }
    })
    .then(res => {
      console.log(res)
      return res
    })
    .catch(console.error)
  }
}