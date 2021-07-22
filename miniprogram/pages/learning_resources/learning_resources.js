var index1=0
var index2=0
const app = getApp();

Page({
  data: {
    TabCur: 0,
    scrollLeft: 0,
    OnlineLectureList: [],
    OnlineFileList: []
  },

  backToHome(){
    setTimeout(()=>{
      wx.setStorageSync('PageCur', 'FrontPage')
      wx.reLaunch({
        url: '../student_page/student_page',
      })
    }, 100)
  },

  tabSelect(e) {
    if(e.currentTarget.dataset.id==0){
      this.getOnlineLecture()
    }else if(e.currentTarget.dataset.id==1){
      this.getOnlineFile()
    }
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },

  getOnlineLecture(Class="video"){
    wx.showLoading()
    wx.cloud.callFunction({
      name: "get_lecture",
      data: {Class}
    }).then(res=>{  
      this.setData({
        OnlineLectureList: res.result.data,
      })
      wx.hideLoading()
    })
  },

  getOnlineFile(Class="file"){
    wx.showLoading()
    wx.cloud.callFunction({
      name: "get_lecture",
      data: {Class}
    }).then(res=>{  
      this.setData({
        OnlineFileList: res.result.data,
      })
      wx.hideLoading()
    })
  },

  LectureDetail(e){
    if(app.globalData.userInfo){
      index1 = e.currentTarget.dataset.index
      wx.setStorageSync('index_name', this.data.OnlineLectureList[index1].title)
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

  FileDetail(e){
    if(app.globalData.userInfo){
      index2 = e.currentTarget.dataset.index
      wx.setStorageSync('index_name', this.data.OnlineFileList[index2].title)
      wx.navigateTo({
        url: '../show_files/show_files',
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
    this.getOnlineLecture()
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