// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var {exam_session, PIN} = event
  return await db.collection('userInfo_grading').where({
    exam_session,
    PIN
  }).get()
}