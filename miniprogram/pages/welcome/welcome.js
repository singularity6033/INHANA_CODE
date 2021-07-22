const app=getApp();
const tmplId = 'swn5payd67W7ngcC_xCqBsxdKK_ntSeZ64Qq2jlKgnY' //这是订阅消息模板id，需自行申请
Page({
  data: {

  },

  myUserinfo(){
    wx.requestSubscribeMessage({
    tmplIds: [tmplId],
      success (res) {
        console.log(res)
        wx.cloud.callFunction({
          name:"get_admin"
        }).then(res=>{
          if(res.result == 1){
            wx.setStorageSync('PageCur', 'RegisterInfo')
            wx.reLaunch({
              url: '../admin_page/admin_page',
            })
          }else{
            wx.setStorageSync('PageCur', 'FrontPage')
            wx.reLaunch({
              url: '../student_page/student_page',
            })
          }
        })
      },
      fail(err){
        console.log(err)
      }
    })
  },

  changeLanguage() {
    app.changeLanguage()
    wx.reLaunch({
      url: '/pages/welcome/welcome',
    })
  },

  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
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