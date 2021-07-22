Page({

  data: {
    live_record:[]
  },

  getLiveRecord(live_lecture_name){
    wx.cloud.callFunction({
      name:"get_live_record",
      data: {live_lecture_name}
    }).then(res=>{
      //初始化
      var live_num = {}
      var live_info = {}
      var live_record = []
      res.result.data.forEach(item =>{
        live_num[item.openid] = 0,
        live_info[item.openid] = item.userInfo
      })
      //计算次数
      for(var i=0;i<res.result.data.length;i++){
        live_num[res.result.data[i].openid] += 1
      }
      for(var key in live_num){
        live_record.push({openid:key,live_num:live_num[key],live_info:live_info[key]})
      } 
      live_record.sort(function(b, a){return a.live_num - b.live_num});
      console.log(live_record)
      this.setData({
        live_record,
        live_num: live_record.length
      })
    })
  },

  onLoad: function (options) {
    var live_lecture_name = wx.getStorageSync('live_lecture_name')
    this.getLiveRecord(live_lecture_name)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function(){

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