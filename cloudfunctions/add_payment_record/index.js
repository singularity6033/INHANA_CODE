const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async(event, context)=>{
  const openid = cloud.getWXContext().OPENID
<<<<<<< HEAD
  var {buyer_name, buyer_gender, buyer_phone, buyer_school, buyer_grade, item_name, item_class, item_price, payOrder, payTime, RegisterTime, itemType} = event
  if(itemType == "grading_test"){
    db.collection("grading_info").where({
      title: item_name
    }).update({
      data:{
        num: _.inc(1)
      }
    })
    return await db.collection("userInfo_grading").where({
      RegisterTime
=======
  var {buyer_name, buyer_gender, buyer_phone, buyer_school, buyer_grade, item_name, item_class, item_price, payOrder, payTime, itemType} = event
  if(itemType == "grading_test"){
    return await db.collection("grading_info").where({
      title: item_name
    }).update({
      data:{
        grading_number: _.inc(1)
      }
    })
    return await db.collection("userInfo_grading").where({
      openid
>>>>>>> master
    }).update({
      data:{
        item_name,
        item_class,
        item_price,
        payOrder,
        payTime
      }
    })
  }else if(itemType == "grading_training"){
<<<<<<< HEAD
    db.collection("grading_training_lecture_info").where({
=======
    db.collection("grading_training_lecture").where({
>>>>>>> master
      title: item_name
    }).update({
      data:{
        bought_group: _.push(openid),
<<<<<<< HEAD
        num: _.inc(1)
=======
        num:_inc(1)
>>>>>>> master
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
<<<<<<< HEAD
        num:_.inc(1)
=======
        num:_inc(1)
>>>>>>> master
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