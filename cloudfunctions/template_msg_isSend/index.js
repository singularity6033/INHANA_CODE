// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  const timestamp = event.timestamp
  var res = await db.collection("template_msg").where({
    openid,
    timestamp
  }).count()
  return res.total
}