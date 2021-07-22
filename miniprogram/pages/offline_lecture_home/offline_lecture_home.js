const app = getApp();
Page({

  data: {
    offlineLectureList:[]
  },

  ShowDataOne(e){
    if(app.globalData.userInfo){
      var index = e.currentTarget.dataset.index;
      wx.setStorageSync('itemOne', this.data.offlineLectureList[index])
      wx.setStorageSync('itemType', "offline_lecture")
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
        wx.navigateTo({
          url: '../student_page/student_page',
        })
      }, 1500);
    }
  },

  getOfflineLecture(){
    wx.showLoading()
    wx.cloud.callFunction({
      name: "get_offline_lecture_info",
    }).then(res=>{
      this.setData({
        offlineLectureList: res.result.data
      })
      wx.hideLoading()
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

  onLoad: function (options) {
    this.getOfflineLecture();
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