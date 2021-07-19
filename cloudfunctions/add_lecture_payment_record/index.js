const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async(event, context)=>{
  const openid = cloud.getWXContext().OPENID
  var {item_name, item_price, payOrder, payTime, userInfo} = event
  db.collection("lecture").where({
    title:item_name
  }).update({
    data:{
      bought_id: _.push(openid)
    }
  })
  return await db.collection("lecture_payment_record").add({
    data:{
      openid,
      item_name,
      item_price,
      payOrder,
      payTime,
      userInfo
    }
  })
}