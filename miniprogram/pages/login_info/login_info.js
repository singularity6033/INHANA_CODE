// pages/login_info/login_info.js
var FormData={};
var Selectedgender="";
var Selectedgrade="";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnShow:true,
    VcodeShow:false,
    VcodeName:'获取验证码',
    VcodeCount:60,
    grade:["幼儿园","小学一年级","小学二年级","小学三年级","小学四年级","小学五年级",
           "初中预科","初中一年级","初中二年级","初中三年级","高中一年级","高中二年级","高中三年级"],
    gender:["男","女"],
    index1:-1,
    index2:-1,
    Selectedgender:"",
    Selectedgrade:"",
    u_sms:0
  },

  //监听输入事件
  IptChanged(res){
    console.log(res)
    if(res.detail.value.length){
      this.setData({
        btnShow: false
      })
    }else{
      this.setData({
        btnShow: true
      })
    }
  },

  IptPhone(e){
    var phone_number = e.detail.value;
    this.setData({
     phone_number
   })  
  },

  IptSMS(e){
    var sms = e.detail.value;
    this.setData({ 
      u_sms: sms
    })  
  },

  genderPicker(e){
    // console.log(e.detail.value)
    Selectedgender = this.data.gender[e.detail.value]
    this.setData({
      index1: e.detail.value,
      Selectedgender
    });
  },

  gradePicker(e){
    // console.log(e.detail.value)
    Selectedgrade = this.data.grade[e.detail.value]
    this.setData({
      index2: e.detail.value,
      Selectedgrade
    });
  },

  //点击发送，调用云函数 
  send_sms(){
    let that = this
    if(this.data.phone_number.length==11){
      wx.cloud.callFunction({ 
          name: 'send_SMS',
          data:{ 
            mobile: that.data.phone_number, 
            nationcode: '86' 
          },
          success: res => {
             let sms = res.result.res.body.params[0];
             let result = res.errMsg;
             if (result == "cloud.callFunction:ok"){
              wx.showToast({
                title: this.data.content.login_info1,
                icon: 'none',
                duration: 2000
              })      
              that.setData({
                s_sms: sms
              })
              var inter = setInterval(function() {
              that.setData({
                VcodeShow: true,
                VcodeName: this.data.VcodeCount + 's'+this.data.content.resend_sms,
                VcodeCount: this.data.VcodeCount - 1
              });
              if (that.data.VcodeCount < 0) {
                clearInterval(inter)
                that.setData({
                  VcodeShow: false,
                  VcodeCount: 60
                });
                if(wx.getStorageSync('language')=='en'){
                  that.setData({
                    VcodeName: 'Get Verification Code',
                  })
                }else{
                  that.setData({
                    VcodeName: '获取验证码',
                  })
                }
              }
            }.bind(that), 500);
          }
        },
        fail: err => {
             console.error('[云函数] [send_SMS] 调用失败', err)
      }
        }) 
    }else{
      wx.showToast({
        title: this.data.content.login_info2,
        icon: 'none',
        duration: 2000
      })
    }   
  },

  backToHome(){
    setTimeout(()=>{
      wx.setStorageSync('PageCur', 'FrontPage')
      wx.reLaunch({
        url: '../student_page/student_page',
      })
    }, 100)
  },

  //点击提交表单
  onSubmit(res){
    var s_sms = this.data.s_sms;
    var u_sms = this.data.u_sms;
    if (s_sms == u_sms){
      FormData=res.detail.value
      FormData.gender=this.data.Selectedgender
      FormData.grade=this.data.Selectedgrade
      console.log(FormData)
      var { name, school, gender, grade, phone }=FormData
      console.log(FormData)
      if(name.length==0 || school.length==0 || gender.length==0 || grade.length==0 || phone.length==0){
        wx.showToast({
          title: this.data.content.login_info3,
          icon:"none",
          duration:1000
        })
        return;
      }else{
      wx.cloud.callFunction({
        name: "add_userInfo",
        data: FormData
      }).then(res => {
        console.log(res)
        wx.showToast({
          title: this.data.content.login_info4,
          icon: "none",
          duration: 2000
        })
        wx.navigateBack({
          delta: 2,
          fail: function(res) {
            wx.setStorageSync('PageCur', 'User')
            setTimeout(() => {
              wx.reLaunch({
                url: '../student_page/student_page',
              })
            }, 100);
          },
        })
      })
    }
  }else{
    wx.showToast({
      title: this.data.content.login_info5,
      icon: 'none',
      duration: 2000
    })
   }  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('language')=='en'){
      this.setData({
        VcodeName:'Get Verification Code',
        grade:["Kindergarten",
               "First grade of primary school",
               "Second grade of primary school",
               "Third grade of primary school",
               "Fourth grade of primary school",
               "Fifth grade of primary school",
               "Preparatory grade junior high school",
               "First grade of junior high school",
               "Second grade of junior high school",
               "Third grade of junior high school",
               "First grade of high school",
               "Second grade of high school",
               "Third grade of high school"],
        gender:["Male", "Female"],
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      content: app.globalData.content,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})