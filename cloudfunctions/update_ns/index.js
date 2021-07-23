// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
const _ =db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  var id=event.id;

  var res=await db.collection("live_lecture_info").where({
    _id:id,
    zanGroup:_.all([openid])
    }).count()
  var size=res.total
  if(!size){
    return await db.collection("live_lecture_info").doc(id).update({
      data:{
        zan:_.inc(1),
        zanGroup:_.push([openid])
      }
    })
  }else{
    return await db.collection("live_lecture_info").doc(id).update({
      data:{
        zan:_.inc(-1),
        zanGroup:_.pull(openid)
      }
    })
  }
}