var index=0
const app=getApp();

Page({
  data: {
    OnlineVideoList: []
  },

  backToHome(){
    setTimeout(()=>{
      wx.setStorageSync('PageCur', 'FrontPage')
      wx.reLaunch({
        url: '../student_page/student_page',
      })
    }, 100)
  },

  getVideoList(Class="知识大百科系列"){
    wx.showLoading()
    wx.cloud.callFunction({
      name: "get_video_list",
      data: {Class}
    }).then(res=>{  
      this.setData({
        OnlineVideoList: res.result.data,
      })
      wx.hideLoading()
    })
  },

  LectureDetail(e){
    if(app.globalData.userInfo){
      index = e.currentTarget.dataset.index
      wx.setStorageSync('index_name', this.data.OnlineVideoList[index].title)
      wx.navigateTo({
        url: '../video_list/video_list',
      })
    }else{
      wx.showToast({
        title: this.data.content.login_remind,
        icon: 'error',
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

  onLoad: function (options) {
    this.getVideoList()
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

  onPullDownRefresh: function () {
    
  },

  onReachBottom: function () {
    
  },

  onShareAppMessage: function () {

  }
})