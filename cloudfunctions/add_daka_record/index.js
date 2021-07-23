const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async(event, context)=>{
  const openid = cloud.getWXContext().OPENID
  var {question_name} = event;
  var res = await db.collection("live_lecture_info").where({
    title: question_name,
    dakaGroup: _.all([openid])
  }).count()
  var size = res.total
  if(!size){
    return await db.collection("live_lecture_info").where({
      title:question_name
    }).update({
      data:{
        read: _.inc(1),
        dakaGroup: _.push([openid])
      }
    })
  }
}