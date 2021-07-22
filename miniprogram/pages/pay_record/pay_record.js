// pages/pay_record/pay_record.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay_record:[]
  },

  get_userInfo_grading(){
    var pay_record = this.data.pay_record
    wx.cloud.callFunction({
      name: "get_userInfo_grading",
    }).then(res=>{
      for(var i=0;i<res.result.data.length;i++){
        pay_record.push(res.result.data[i])
      }
      this.setData({
        pay_record 
      })
    })
  },

  get_lecture_record(){
    var pay_record = this.data.pay_record
    wx.cloud.callFunction({
      name: "get_lecture_payment_record",
    }).then(res=>{
      console.log(res)
      for(var i=0;i<res.result.data.length;i++){
        pay_record.push(res.result.data[i])
      }
      this.setData({
        pay_record 
      })
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
    this.get_lecture_record()
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