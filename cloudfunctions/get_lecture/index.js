// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command


// 云函数入口函数
exports.main = async (event, context) => {
  //返回排序后的结果
  const {Class} = event
  return await db.collection('lecture').orderBy('order', 'asc').where({
    Class
  }).get()
}