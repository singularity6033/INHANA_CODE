// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  var result_list = event.resultFinal
  var score = event.scoreFinal
  var userInfo = event.userInfo
  return await db.collection("choice_record").add({
    data:{
      result_list,
      openid,
      score,
      posttime:Date.now(),
      userInfo
    }
  })
}