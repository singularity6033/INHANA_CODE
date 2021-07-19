// pages/live_code/live_code.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    live_code:''
  },

  add_live_record(live_code){
    var live_title = live_code.title
    var userInfo = this.data.userInfo
    wx.cloud.callFunction({
      name: "add_live_record",
      data: {
        live_title,
        userInfo
      }
    }).then(res => {
      console.log(res)
    })
  },

  preview_swiper_img(e){
    var cur=e.target.dataset.src;//获取本地一张图片链接
    console.log(e)
    this.add_live_record(this.data.live_code)
    wx.previewImage({
      current: cur, //字符串，默认显示urls的第一张
        urls: [cur] // 数组，需要预览的图片链接列表
    })
  },

  getUser(){
    wx.cloud.callFunction({
      name: "get_userInfo",
    }).then(res => {
      console.log(res)
      this.setData({
        userInfo:res.result.data
      })
    })    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var live_code = wx.getStorageSync('live_review')
    this.setData({
      live_code
    })
    this.getUser()
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