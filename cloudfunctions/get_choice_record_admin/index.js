// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const Openid = event.openid_record
  return await db.collection("choice_record").orderBy('posttime','desc').where({
    openid:_.eq(Openid)
  }).get()
}