// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  var { content, question_name, id, userInfo } = event;
  var posttime = Date.now();
  db.collection("audio_record").doc(id).update({
    ping_num: _.inc(1)
  })
  return await db.collection("ping_record").add({
    data: {
      content,
      question_name,
      nsid: id,
      posttime,
      openid,
      userInfo
    }
  })
}