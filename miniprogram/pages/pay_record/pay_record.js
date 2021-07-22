// pages/pay_record/pay_record.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay_record: [],
  },

  get_grading_training_lecture_payment_record(){
    wx.cloud.callFunction({
      name: "get_grading_training_lecture_payment_record",
    }).then(res=>{
      console.log(res)
      this.setData({
        pay_record: res.result.data
      })
    })
  },

  get_offline_lecture_payment_record(){
    wx.cloud.callFunction({
      name: "get_offline_lecture_payment_record",
    }).then(res=>{
      console.log(res)
      this.setData({
        pay_record: res.result.data
      })
    })
  },

  get_userInfo_grading(){
    wx.cloud.callFunction({
      name: "get_userInfo_grading",
    }).then(res=>{
      this.setData({
        pay_record: res.result.data
      })
    })
  },

  tabSelect(e) {
    if(e.currentTarget.dataset.id==0){
      this.get_userInfo_grading()
    }else if(e.currentTarget.dataset.id==1){
      this.get_offline_lecture_payment_record()
    }else{
      this.get_grading_training_lecture_payment_record()
    }
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },

  backToHome(){
    setTimeout(()=>{
      wx.setStorageSync('PageCur', 'FrontPage')
      wx.reLaunch({
        url: '../student_page/student_page',
      })
    }, 100)
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_userInfo_grading()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(){
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})