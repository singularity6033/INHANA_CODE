const cloud = require('wx-server-sdk')
const QcloudSms = require("qcloudsms_js")
const appid = "1400514323" // 替换成云短信的 SDK AppID
const appkey = "b03ff99bcaf3594f244c9f9db92baf0e" // 替换成云短信的 App Key
const templateId = "937903" // 替换成模板 ID
const smsSign = "INHANA" // 替换成签名内容

cloud.init()

exports.main = async (event, context) => new Promise((resolve, reject) => {
    /**
    * 下面这段代码的作用是，生成随机的验证码，因为循环了6次，就是6位数的
    */
    // 生成6位数验证码 
    var code = "";
    for (var i = 0; i < 6; i++) {
        var radom = Math.floor(Math.random() * 10);
        code += radom;
     }

    var qcloudsms = QcloudSms(appid, appkey);
    var ssender = qcloudsms.SmsSingleSender();
    var params = [code,"2"];
    var mobile = event.mobile
    var nationcode = event.nationcode
    ssender.sendWithParam(nationcode,mobile,templateId,params,smsSign,"","",(err, res, resData)=>{
    if(err){
      reject({err})
    } else {
      resolve({ res: res.req, resData})
    }
   }
  );
})