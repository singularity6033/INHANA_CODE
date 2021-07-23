// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  var {school, Class, name_CN, name_EN, name, birth, country, phone, gender, date, exam_session} = event
    return await db.collection("userInfo_grading").add({
      data:{
        openid,
        school, 
        Class, 
        name_CN, 
        name_EN, 
        name, 
        gender,
        date,
        exam_session,
        birth, 
        country, 
        phone,
        score: "",
        PIN: ""
      }
    })
}