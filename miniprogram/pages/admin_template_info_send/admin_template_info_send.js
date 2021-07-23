var OpenidGroup = []
var TemplateData = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserInfoList:[],
    SelectStatus:false
  },

  getUserInfo(school=""){
    wx.cloud.callFunction({
      name:"get_userInfo_total",
      data:{school}
    }).then(res=>{
      this.setData({
        UserInfoList: res.result.data,
        user_num: Object.keys(res.result.data).length
      })
    })
  },

  SendGroup(e){
    // console.log(e)
    OpenidGroup = e.detail.value
    console.log(OpenidGroup)
  },

  SelectAll(){
    var that = this
    OpenidGroup = []
    for(var i=0; i<that.data.UserInfoList.length; i++){
      that.data.UserInfoList[i].checked = (!that.data.SelectStatus)
      OpenidGroup.push(that.data.UserInfoList[i].openid)
    }
    if(that.data.SelectStatus){
      OpenidGroup = []
    }
    that.setData({
      UserInfoList: that.data.UserInfoList,
      SelectStatus: (!that.data.SelectStatus)
    })
    console.log(OpenidGroup)
  },

  detail_info(e){
    var index = e.currentTarget.dataset.index
    wx.setStorageSync('openid_record', this.data.UserInfoList[index].openid)
    wx.navigateTo({
      url: '../admin_daka_record/admin_daka_record',
    })
  },

  SendTemplateInfo(){
    var name = TemplateData.title
    var teacher = TemplateData.author
    var content = TemplateData.body
    wx.cloud.callFunction({
      name: "store_template_info_general",
        data: {
          name,
          content,
          teacher,
          page: 'pages/welcome/welcome',
          OpenidGroup
      },
      success(res) {
          console.log('个人信息-------------', res)
          wx.showToast({
            title: '发送成功 !',
            duration: 1500,
            mask: true
          })
          wx.setStorageSync('PageCur', 'TemplateInfo')
          wx.reLaunch({
            url: '../admin_page/admin_page',
          })
        },
      fail(err) {
          console.log('个人信息-------------', err)
        }
      })
  },

  Iptchanged(e){
    this.getUserInfo(e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
    TemplateData = wx.getStorageSync('TemplateData', TemplateData)
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