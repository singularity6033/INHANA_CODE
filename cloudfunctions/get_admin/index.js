// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  var res = await db.collection("admin_info").where({
    openid
  }).count()
  var size=res.total
  return size
}