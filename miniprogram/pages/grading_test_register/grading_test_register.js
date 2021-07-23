import common from "../../js/common.js";
const app=getApp()
var FormData={};
var Selectedgender="";
var SelectedDate="";
var SelectedSession="";
Page({
  data:{
    btnShow:true,
    gender:["男","女"],
    date:[],
    session:[],
    index1:-1,
    index2:-1,
    index3:-1,
    Selectedgender:"",
    SelectedDate:"",
    SelectedSession:""
  },

  backToHome(){
    setTimeout(()=>{
      wx.setStorageSync('PageCur', 'FrontPage')
      wx.reLaunch({
        url: '../student_page/student_page',
      })
    }, 100)
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

  genderPicker(e){
    Selectedgender = this.data.gender[e.detail.value]
    this.setData({
      index1: e.detail.value,
      Selectedgender
    });
  },

  datePicker(e){
    SelectedDate = this.data.date[e.detail.value]
    this.setData({
      index2: e.detail.value,
      SelectedDate
    });
  },

  SessionPicker(e){
    SelectedSession = this.data.session[e.detail.value]
    this.setData({
      index3: e.detail.value,
      SelectedSession
    });
  },

  getGradingDate(){
    wx.cloud.callFunction({
      name: "get_grading_date",
    }).then(res=>{
      var date = []
      for(var i=0;i<res.result.data.length;i++){
        date.push(res.result.data[i].date)
      }
      this.setData({
        date
      })
    })
  },

  getGradingSession(){
    wx.cloud.callFunction({
      name: "get_grading_session",
    }).then(res=>{
      var session = []
      for(var i=0;i<res.result.data.length;i++){
        session.push(res.result.data[i].session)
      }
      this.setData({
        session
      })
    })
  },

  //点击提交表单
  onSubmit(res){
    FormData=res.detail.value
    FormData.gender=this.data.Selectedgender
    FormData.date=this.data.SelectedDate
    FormData.exam_session=this.data.SelectedSession
    var { school, Class, name_CN, name_EN, name, birth, country, phone }=FormData
    console.log(FormData)
    if(school.length==0 || Class.length==0 || name_CN.length==0 || name.length==0 || birth.length==0 || country.length==0 || phone.length==0){
        wx.showToast({
          title: '注册信息不能为空',
          icon:"none",
          duration:1000
        })
        return;
      }else{
      wx.cloud.callFunction({
        name: "add_userInfo_grading",
        data: FormData
      }).then(res => {
        console.log(res)
        wx.setStorageSync('grading_register_id', res.result._id)
        wx.showToast({
          title: '注册成功',
          icon:"success",
          duration: 2000
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '../item_payment_confirm/item_payment_confirm',
          })
        }, 1500)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGradingDate()
    this.getGradingSession()
    if(wx.getStorageSync('language')=='en'){
      this.setData({
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
      content: app.globalData.content
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