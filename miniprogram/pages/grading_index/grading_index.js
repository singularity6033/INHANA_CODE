const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    list_name: [],
    swiperList: [],
    mock_test: {},
    grading_intro_url: "",
    show:true,
    cardCur:0
  },

  backToHome(){
    setTimeout(()=>{
      wx.setStorageSync('PageCur', 'FrontPage')
      wx.reLaunch({
        url: '../student_page/student_page',
      })
    }, 100)
  },

  showModal01(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      list_name:['考试科目','考试须知']
    })
  },

  showModal02(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      list_name:['线上课程','模拟考试']
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  switchTo(e){
    var url = ''
    if(e.currentTarget.dataset.item=='考试科目'){
      url = '../grading_test_home/grading_test_home'
    }else if(e.currentTarget.dataset.item=='考试须知'){
      url = '../learning_resources/learning_resources'
      wx.setStorageSync('learning_resources_type', '考试须知')
    }else if(e.currentTarget.dataset.item=='线上课程'){
      url = '../grading_train_home/grading_train_home'
    }else if(e.currentTarget.dataset.item=='模拟考试'){
      if(app.globalData.userInfo){
        url = '../item_detail/item_detail'
        wx.setStorageSync('itemType', 'mock_test')
        wx.setStorageSync('itemOne', this.data.mock_test)
      }else{
        wx.showToast({
          title: '请先登录',
          icon:'error',
          duration: 1500
        })
        wx.setStorageSync('PageCur', 'User')
        setTimeout(() => {
          wx.navigateTo({
            url: '../student_page/student_page',
          })
        }, 1500);
        return;
      }
    }
    wx.navigateTo({
      url
    })
  },

  getMockTest(Class="模拟考试"){
    wx.cloud.callFunction({
      name: "get_grading_info",
      data: {Class}
    }).then(res=>{
      this.setData({
        mock_test: res.result.data[0]
      })
    })
  },

  ToLearningResoures(){
    wx.setStorageSync('learning_resources_type', '考试知识点视频')
    wx.navigateTo({
      url: '../learning_resources/learning_resources',
    })
  },

  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

  getSwiperList(){
    var type = "B"
    wx.cloud.callFunction({
      name:"get_swiper_img",
      data: {
        type
      }
    }).then(res=>{
      this.setData({
        swiperList: res.result.data
      })
    })
  },

  getActivityImg(){
    wx.showLoading()
    wx.cloud.callFunction({
      name:"get_grading_intro_img"
    }).then(res=>{
      this.setData({
        grading_intro_url: res.result.data[0]
      })
      wx.hideLoading()
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

  onLoad: function (options) {
    this.getSwiperList();
    this.getActivityImg();
    this.getMockTest();
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