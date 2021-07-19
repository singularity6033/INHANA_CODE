const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async(event, context)=>{
  var {current_title} = event;
  return await db.collection("Lecture").where({
    title: _.eq(current_title)
  }).update({
    data:{
      play_num: _.inc(1)
    }
  })
}