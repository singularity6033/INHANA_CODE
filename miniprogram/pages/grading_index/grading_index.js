// pages/grading_index/grading_index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    grading_intro_url: "",
    show:true,
    cardCur:0
  },

  backToHome(){
    setTimeout(()=>{
      wx.setStorageSync('PageCur', 'FrontPage')
      wx.reLaunch({
        url: '../student_page/student_page',
      })
    }, 100)
  },

  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

  getSwiperList(){
    var type = "B"
    wx.cloud.callFunction({
      name:"get_swiper_img",
      data: {
        type
      }
    }).then(res=>{
      this.setData({
        swiperList: res.result.data
      })
    })
  },

  getActivityImg(){
    wx.showLoading()
    wx.cloud.callFunction({
      name:"get_grading_intro_img"
    }).then(res=>{
      this.setData({
        grading_intro_url: res.result.data[0]
      })
      wx.hideLoading()
    })
  },

  preview_swiper_img(e){
    var cur=e.target.dataset.src;//获取本地一张图片链接
    console.log(e)
    wx.previewImage({
      current: cur, //字符串，默认显示urls的第一张
        urls: [cur] // 数组，需要预览的图片链接列表
    })
  },

  onLoad: function (options) {
    this.getSwiperList();
    this.getActivityImg();
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