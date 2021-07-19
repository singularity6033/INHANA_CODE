const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async(event, context)=>{
  const openid = cloud.getWXContext().OPENID
  var {title, Class} = event;
  var res = await db.collection("lecture").where({
    title,
    Class,
    bought_id: _.in([openid])
  }).count()
  var size=res.total
  return size
}