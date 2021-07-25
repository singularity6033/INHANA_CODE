Page({

  data: {
    itemOne: [],
    itemType: ''
  },

  backToHome(){
    setTimeout(()=>{
      wx.setStorageSync('PageCur', 'FrontPage')
      wx.reLaunch({
        url: '../student_page/student_page',
      })
    }, 100)
  },

  ToPay(){
    if(this.data.itemType == "grading_test" || this.data.itemType == "mock_test"){
      wx.navigateTo({
        url: '../grading_test_register/grading_test_register',
      }) 
    }else{
      wx.navigateTo({
        url: '../item_payment_confirm/item_payment_confirm',
      })
    }
   
    // wx.cloud.callFunction({
    //   name: "get_userInfo_grading",
    // }).then(res => {
    //   // 获取对象长度，防止重复支付
    //   // console.log(Object.keys(res.result.data[0]).length)
    //   if(res.result.data.length!=0){  
    //     this.Register_Grading()
    //     wx.navigateTo({
    //       url: '../grading_test_detail/grading_test_detail',
    //     })
    //   }else{
    //     wx.navigateTo({
    //       url: '../grading_info/grading_info',
    //     }) 
    //   }
    // })
  },

  preview_swiper_img(e){
    var cur = e.target.dataset.src;//获取本地一张图片链接
    console.log(e)
    wx.previewImage({
      current: cur, //字符串，默认显示urls的第一张
        urls: [cur] // 数组，需要预览的图片链接列表
    })
  },

  onLoad: function (options) {
    var itemOne = wx.getStorageSync('itemOne')
    var itemType = wx.getStorageSync('itemType')
    this.setData({
      itemOne,
      itemType
    })
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