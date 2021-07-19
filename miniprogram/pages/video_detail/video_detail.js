// pages/class_detail/class_detail.js
var id="";
var index="";
Page({

  data: {
    VideoSrc:[],
  },

  //更改文章点赞信息
  pushZan(){
    var video_name = this.data.VideoSrc.name
    wx.showLoading()
    wx.cloud.callFunction({
      name: "update_video_list",
      data: {video_name}
    }).then(res => {
      console.log(res)
      var _old = this.data.VideoSrc
      if (_old.zanShow) {
        _old.zan--
      } else {
        _old.zan++
      }
      _old.zanShow = !_old.zanShow
      this.setData({
        VideoSrc: _old
      })
      wx.hideLoading()
    })
  },

  //获取点赞信息
  GetZan(video_name){
    wx.cloud.callFunction({
      name: "get_video_zan",
      data: {video_name}
    }).then(res=>{
      console.log(res)
      if(res.result!=0){
        var _old = this.data.VideoSrc
        _old.zanShow = !_old.zanShow
        this.setData({
          VideoSrc: _old
        })
      }
    })
  },

  addRead(video_name){
    wx.cloud.callFunction({
      name: "add_lecture_playnum",
      data: {video_name}
    }).then(res => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    var VideoSrc = wx.getStorageSync('videodetail')
    this.GetZan(VideoSrc.name)
    this.setData({
      VideoSrc
    })
    this.addRead(VideoSrc.name)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(){

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(){

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