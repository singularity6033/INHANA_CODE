// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const {question_name} = event;
  return await db.collection("question_choice").where({
    question_name
  }).get()
}