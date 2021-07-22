// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var {index_name} = event
  return await db.collection("video_detail").orderBy('order', 'asc').where({
    list_name: index_name
  }).get()
}