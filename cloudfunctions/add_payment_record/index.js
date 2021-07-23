const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async(event, context)=>{
  const openid = cloud.getWXContext().OPENID
  var {buyer_name, buyer_gender, buyer_phone, buyer_school, buyer_grade, item_name, item_class, item_price, payOrder, payTime, id, itemType} = event
  if(itemType == "grading_test"){
    db.collection("grading_info").where({
      title: item_name
    }).update({
      data:{
        num: _.inc(1)
      }
    })
    return await db.collection("userInfo_grading").doc(id).update({
      data:{
        item_name,
        item_class,
        item_price,
        payOrder,
        payTime
      }
    })
  }else if(itemType == "grading_training"){
    db.collection("grading_training_lecture_info").where({
      title: item_name
    }).update({
      data:{
        bought_group: _.push(openid),
        num: _.inc(1)
      }
    })
    return await db.collection("grading_training_lecture_payment_record").add({
      data:{
        openid,
        buyer_name,
        buyer_gender,
        buyer_phone,
        buyer_school,
        buyer_grade,
        item_name,
        item_class,
        item_price,
        payOrder,
        payTime
      }
    })
  }else if(itemType=="offline_lecture"){
    db.collection("offline_lecture_info").where({
      title: item_name
    }).update({
      data:{
        num:_.inc(1)
      }
    })
    return await db.collection("offline_lecture_payment_record").add({
      data:{
        openid,
        buyer_name,
        buyer_gender,
        buyer_phone,
        buyer_school,
        buyer_grade,
        item_name,
        item_class,
        item_price,
        payOrder,
        payTime
      }
  })
}
}