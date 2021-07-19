const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async (event, context) => {
  // 先取出集合记录总数
  const {school} = event
  const countResult = await db.collection('userInfo').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  if(school.length==0){
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('userInfo').skip(i * MAX_LIMIT).limit(MAX_LIMIT)
      .orderBy("school",'asc').get()
      tasks.push(promise)
    }
  }else{
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('userInfo').skip(i * MAX_LIMIT).limit(MAX_LIMIT)
      .where({
        school
      }).get()
      tasks.push(promise)
    }
  }
  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}