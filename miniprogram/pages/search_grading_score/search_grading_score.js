var FormData = {}
const app = getApp();
var SelectedSession = "";
Page({

  data: {
    session: [],
    index: -1,
    SelectedSession: '',
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

  SessionPicker(e){
    SelectedSession = this.data.session[e.detail.value]
    this.setData({
      index: e.detail.value,
      SelectedSession
    });
  },

  getGradingSession(){
    wx.cloud.callFunction({
      name: "get_grading_session",
    }).then(res=>{
      var session = []
      for(var i=0;i<res.result.data.length;i++){
        session.push(res.result.data[i].session)
      }
      this.setData({
        session
      })
    })
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
      FormData.exam_session = this.data.SelectedSession
      console.log(FormData)
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
        this.preview_swiper_img(res.result.data[0].score),
        this.setData({
          showScore: true,
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

  preview_swiper_img(cur){
		wx.previewImage({
			current: cur, //字符串，默认显示urls的第一张
  			urls: [cur] // 数组，需要预览的图片链接列表
		})
  },

  switch_language(e){
    console.log(e)
    app.changeLanguage()
    wx.navigateTo({
      url: '../search_grading_score/search_grading_score',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGradingSession()
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