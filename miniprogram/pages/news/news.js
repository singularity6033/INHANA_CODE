const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList: [],
  },

  getNews(Class="好书推荐系列"){
    wx.showLoading()
    wx.cloud.callFunction({
      name: "get_news",
      data: {Class}
    }).then(res=>{
      console.log(res)
      this.setData({
        newsList: res.result.data
      })
      wx.hideLoading()
    })
  },

  view_detail(e){
    var webview = e.currentTarget.dataset.src
    var index = e.currentTarget.dataset.index
    var id = this.data.newsList[index]._id
    wx.cloud.callFunction({
      name: "add_news_read",
      data: {id}
    }).then(res=>{
      console.log(res)
      wx.navigateTo({  
        url: '/pages/webview/webview?webview='+webview,
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var knowledge_share_type = wx.getStorageSync('knowledge_share_type')
    this.setData({
      knowledge_share_type
    })
    this.getNews();
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