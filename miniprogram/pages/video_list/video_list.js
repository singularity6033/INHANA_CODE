var index=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    VideoList:[]
  },

  VideoDetail(e){
    index = e.currentTarget.dataset.index
    wx.setStorageSync('videodetail', this.data.VideoList[index])
    wx.navigateTo({
      url: '../video_detail/video_detail'
    })
  },

  getVideoList(){
    var LectureName = wx.getStorageSync('lecture_name')
    wx.cloud.callFunction({
      name:"get_lecture_detail",
      data: {LectureName}
    }).then(res=>{
      this.setData({
        VideoList: res.result.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options){
    
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
    this.getVideoList()
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