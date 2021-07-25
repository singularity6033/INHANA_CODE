const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList: [],
    TabCur: 0,
    scrollLeft: 0,
    category: ['好书推荐系列','儿童诗歌系列','戏剧故事系列','知识大百科系列','英国资讯分享']
  },

  tabSelect(e) {
    if(e.currentTarget.dataset.id==0){
      this.getNews()
    }else if(e.currentTarget.dataset.id==1){
      this.getNews('儿童诗歌系列')
    }else if(e.currentTarget.dataset.id==2){
      this.getNews('戏剧故事系列')
    }else if(e.currentTarget.dataset.id==3){
      this.getNews('知识大百科系列')
    }else if(e.currentTarget.dataset.id==4){
      this.getNews('英国资讯分享')
    }
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },

  getNews(Class="好书推荐系列"){
    wx.cloud.callFunction({
      name: "get_news",
      data: {Class}
    }).then(res=>{
      console.log(res)
      this.setData({
        newsList: res.result.data
      })
    })
  },

  getNewsVideo(){
    wx.cloud.callFunction({
      name: "get_news_video",
      data: {Class}
    }).then(res=>{
      console.log(res)
      this.setData({
        newsList: res.result.data
      })
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
    this.getNewsVideo();
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