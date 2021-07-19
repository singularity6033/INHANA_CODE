const TxvContext = requirePlugin("tencentvideo");
Page({

  data: {
    live_replay:[],
    userInfo:[],
    show: -1,  // 记录正在播放的视频下标
    id: -1,  // 用于关掉上一个视频
  },

  getUser(live_replay){
    wx.cloud.callFunction({
      name: "get_userInfo",
    }).then(res => {
      console.log(res)
      var live_title = live_replay[0].title
      var userInfo = res.result.data
      console.log(userInfo)
      wx.cloud.callFunction({
        name: "add_live_record",
        data: {
          live_title,
          userInfo
        }
      }).then(res => {
        console.log(res)
      })
      this.setData({
        userInfo: res.result.data
      })
    })    
  },

  play(e){
    var index = e.currentTarget.dataset.id
    var id = 'my' + e.currentTarget.dataset.id
    if (this.data.show != index) {  // 此处的show是上一个视频的下标
      var i = 'my' + this.data.show
      var txvContext = TxvContext.getTxvContext(i)
      txvContext.pause()  // 暂停上一个播放的视频
    }
    this.setData({
      show: index  // 将show更新至最新点击的视频的下标
    })
    var txvContext = TxvContext.getTxvContext(id)
    txvContext.play()  // 开始播放当前视频
  },

  //更改文章点赞信息
  pushZan(e){
    var index = e.currentTarget.dataset.index
    var video_name = this.data.live_replay[index].name
    wx.showLoading()
    wx.cloud.callFunction({
      name: "update_live_replay",
      data: {video_name}
    }).then(res => {
      console.log(res)
      var _old = this.data.live_replay
      if (_old[index].zanShow) {
        _old[index].zan--
      } else {
        _old[index].zan++
      }
      _old[index].zanShow = !_old[index].zanShow
      this.setData({
        live_replay: _old
      })
      wx.hideLoading()
    })
  },

  //获取点赞信息
  GetZan(live_replay_name, index){
    wx.cloud.callFunction({
      name: "get_live_replay_zan",
      data: {live_replay_name}
    }).then(res=>{
      console.log(res)
      if(res.result !=0){
        var _old = this.data.live_replay
        _old[index].zanShow = !_old[index].zanShow
        this.setData({
          live_replay: _old
        })
      }
    })
  },

  onLoad: function (options) {
    var live_replay = wx.getStorageSync('live_replay')
    this.getUser(live_replay)
    // this.add_live_record(live_replay)
    this.setData({
      live_replay
    })
    for(var i=0; i<live_replay.length; i++){
      this.GetZan(live_replay[i].name, i)
    }
  },

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