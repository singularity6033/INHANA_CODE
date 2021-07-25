// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  //返回排序后的结果
  const openid = cloud.getWXContext().OPENID
  return db.collection('mock_test_payment_record').where({
    openid
  }).get()
}