// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  var {live_title, userInfo} = event
  return await db.collection("live_record").add({
    data:{
      openid,
      live_title,
      posttime: Date.now(),
      userInfo
    }
  })
}