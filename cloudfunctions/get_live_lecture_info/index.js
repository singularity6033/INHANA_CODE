// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var {Class} = event
  return await db.collection("live_lecture_info").where({
    class: Class
  })
  .orderBy("start_time","asc")
  .get()
}