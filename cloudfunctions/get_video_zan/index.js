// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
const _ =db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  const {video_name} = event
  var res = await db.collection("lecture_detail").where({
    name: video_name,
    zanGroup: _.all([openid])
    }).count()
  var size=res.total
  return size
}