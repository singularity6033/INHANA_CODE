const app = getApp()
Page({

  data: {

  },

  NavChange(e) {
    console.log(e.currentTarget.dataset.cur)
    this.setData({
      PageCur: e.currentTarget.dataset.cur 
    })
  },

  onLoad: function (options) {
    var PageCur = wx.getStorageSync('PageCur');
    this.setData({
      PageCur
    })
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

  },
  //右上角分享功能
  onShareAppMessage: function () {
      return {
        title: 'INHANA英翰语言戏剧教育',
        path: '/pages/welcome/welcome',//用户点开后的默认页面
        imageUrl:"/images/share.jpg",//自定义图片的地址
        success (res) {
          console.log('分享成功！')
        }
      }
    }
})