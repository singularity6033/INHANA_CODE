// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()



// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  var {audioUrl,userInfo,question_name,review} = event
  return await db.collection("audio_record").add({
    data:{
      audioUrl,
      userInfo,
      question_name,
      review,
      openid,
      posttime:Date.now(),
    }
  })

}