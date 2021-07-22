var FormData = {}
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnShow: false
  },

  backToHome(){
    setTimeout(()=>{
      wx.setStorageSync('PageCur', 'FrontPage')
      wx.reLaunch({
        url: '../student_page/student_page',
      })
    }, 100)
  },

  IptChanged(res){
    console.log(res)
    if(res.detail.value.length){
      this.setData({
        btnShow: true
      })
    }else{
      this.setData({
        btnShow: false
      })
    }
  },

  onSubmit(e){
    if(app.globalData.userInfo){
      FormData = e.detail.value
      wx.cloud.callFunction({
        name: "get_grading_score",
        data: FormData
    }).then(res => {
      console.log(res)
      if(res.result.data.length==0 || res.result.data[0].score==""){
        this.setData({
          modalName: e.currentTarget.dataset.target,
          showScore: false
        })
      }else{
        this.setData({
          modalName: e.currentTarget.dataset.target,
          showScore: true,
          score: res.result.data[0].score,
          name: FormData.name
        })
      }
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

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  preview_swiper_img(e){
    var cur=e.target.dataset.src;//获取本地一张图片链接
    console.log(e)
		wx.previewImage({
			current: cur, //字符串，默认显示urls的第一张
  			urls: [cur] // 数组，需要预览的图片链接列表
		})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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