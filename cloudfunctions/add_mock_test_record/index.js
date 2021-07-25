// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  var {mock_date, mock_type, mock_grade} = event
    return await db.collection("mock_test_payment_record").add({
      data:{
        openid,
        mock_date,
        mock_type,
        mock_grade
      }
    })
}