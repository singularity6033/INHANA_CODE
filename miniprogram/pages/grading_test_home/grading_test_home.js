const app = getApp();
Page({

  data: {
    TabTitle:["公共演讲","诗歌散文朗诵","戏剧独白表演","阅读表演"],
    TabTitle_En:["Public Speaking","Speaking Verse and Prose","Acting(Solo)","Reading for Performance"],
    TabCur: 0,
    scrollLeft:0,
    GradingInfoList:[]
  },

  cardSwiper(e) {
    // console.log(e.detail.current)
    this.setData({
      cardCur:e.detail.current
    })
  },

  ShowDataOne(e){
    if(app.globalData.userInfo){
      var index = e.currentTarget.dataset.index;
      wx.setStorageSync('itemOne', this.data.GradingInfoList[index])
      wx.setStorageSync('itemType', "grading_test")
      wx.navigateTo({
        url: '../item_detail/item_detail'
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon:'error',
        duration: 1500
      })
      wx.setStorageSync('PageCur', 'User')
      setTimeout(() => {
        wx.reLaunch({
          url: '../student_page/student_page',
        })
      }, 1500);
    }
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60,
    })
    this.getGradingData(e.currentTarget.dataset.item)
  },

  getGradingData(Class="公共演讲"){
    wx.showLoading()
    wx.cloud.callFunction({
      name: "get_grading_info",
      data: {Class}
    }).then(res=>{
      this.setData({
        GradingInfoList: res.result.data
      })
      wx.hideLoading()
    })
  },

  onLoad: function (options) {
    this.getGradingData();
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