// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
const _ =db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  const {live_replay_name} = event
  var res = await db.collection("live_replay").where({
    name: live_replay_name,
    zanGroup: _.all([openid])
    }).count()
  var size=res.total
  return size
}