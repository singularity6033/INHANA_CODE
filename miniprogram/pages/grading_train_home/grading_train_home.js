const app = getApp();
var isPay = []
var Openid= ''
Page({

  data: {
    TabTitle: ["公共演讲","诗歌散文朗诵","戏剧独白表演","阅读表演"],
    TabTitle_En: ["Public Speaking","Speaking Verse and Prose","Acting(Solo)","Reading for Performance"],
    TabCur: 0,
    scrollLeft: 0,
    gradingTrainingLecture: [],
    gradingTraining: {},
    isPay: []
  },

  cardSwiper(e) {
    // console.log(e.detail.current)
    this.setData({
      cardCur: e.detail.current
    })
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
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60,
    })
    this.getGrading(e.currentTarget.dataset.item)
    this.getGradingData(e.currentTarget.dataset.item)
  },

  getPayShow(){
    
  },

  IsShow(List, openid){
    for (var i = 0; i<List.length; i++){
      console.log(List)
      console.log(openid)
      console.log(List[i].bought_group.indexOf(openid))
      if(List[i].bought_group.indexOf(openid)==-1){
        isPay.push(false)
      }else{
        isPay.push(true)
      }
    }
    return isPay
  },

  ShowDataOne(e){
    if(app.globalData.userInfo){
      var index = e.currentTarget.dataset.index;
      wx.setStorageSync('itemOne', this.data.gradingTrainingLecture[index])
      wx.setStorageSync('itemType', "grading_training")
      wx.navigateTo({
        url: '../item_detail/item_detail'
      })
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
    }
  },

  ShowTrainingDetail(e){
    if(app.globalData.userInfo){
      var index = e.currentTarget.dataset.index;
      console.log(index)
      wx.setStorageSync('index_name', this.data.gradingTrainingLecture[index].title)
      wx.navigateTo({
        url: '../grading_train_content/grading_train_content'
      })
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
    }
  },

  getGrading(Class="公共演讲"){
    wx.showLoading()
    wx.cloud.callFunction({
      name: "get_grading_training_lecture",
      data: {Class}
    }).then(res=>{
      this.setData({
        gradingTraining: res.result.data[0]
      })
      wx.hideLoading()
    })
  },

  getGradingData(Class="公共演讲"){
    wx.showLoading()
    wx.cloud.callFunction({
      name: "get_grading_training_lecture_info",
      data: {Class}
    }).then(res=>{
      isPay = []
      setTimeout(()=>{
        wx.cloud.callFunction({
        name:"get_openid"
      }).then(res1=>{
          console.log(res1)
          Openid = res1.result
          this.IsShow(res.result.data, Openid)
          this.setData({
            isPay
          })
        })
      }, 100)
      this.setData({
        gradingTrainingLecture: res.result.data
      })
      wx.hideLoading()
    })
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
    this.getGrading();
    this.getGradingData();
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
    this.onLoad()
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