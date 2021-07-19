// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const Class = event.Class;
  return await db.collection("grading_training_lecture_info").orderBy("order","asc").where({
    class: Class
  }).get()
}