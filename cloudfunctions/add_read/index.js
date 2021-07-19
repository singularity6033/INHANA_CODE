// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  var id = event.id;
  db.collection("show_activities").doc(id).update({
    data:{
      read: _.inc(1)
    }
  })
  return await db.collection("show_activities").doc(id).get();
}