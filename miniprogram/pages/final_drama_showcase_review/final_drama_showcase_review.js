const TxvContext = requirePlugin("tencentvideo");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    final_drama_showcase_review_info: "",
    show: -1,  // 记录正在播放的视频下标
    id: -1,  // 用于关掉上一个视频
  },

  backToHome(){
    setTimeout(()=>{
      wx.setStorageSync('PageCur', 'FrontPage')
      wx.reLaunch({
        url: '../student_page/student_page',
      })
    }, 100)
  },

  play_introduce(){
    wx.showLoading()
    wx.cloud.callFunction({
      name:"get_final_drama_showcase_review"
    }).then(res=>{
      console.log(res)
      this.setData({
        final_drama_showcase_review_info: res.result.data
      })
      wx.hideLoading()
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

  view_detail(e){
    var webview = e.currentTarget.dataset.src
    wx.navigateTo({  
    url: '/pages/webview/webview?webview='+webview,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.play_introduce();
    this.selectComponent('video').VideoContext
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

  }
})