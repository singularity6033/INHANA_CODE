const cloud = require('wx-server-sdk')
 
cloud.init({
  env: 'inhana-cloud-1g9obu9p408701c5'
})
const db = cloud.database()
exports.main = async (event, context) => {
  const OpenidGroup = event.OpenidGroup
  for(var i=0; i<OpenidGroup.length; i++){
    var OPENID = OpenidGroup[i]
    db.collection('template_msg1').add({
      data: {
        thing2: event.name,
        thing1: event.content,
        thing4: event.teacher,
        openid: OPENID,
        page: event.page
      }
    })
  }
}