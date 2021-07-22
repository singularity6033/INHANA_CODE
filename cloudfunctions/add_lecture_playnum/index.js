// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  var video_name = event.video_name;
  db.collection("video_detail").where({
    name: video_name
    }).update({
    data:{
      play_num: _.inc(1)
    }
  })
}