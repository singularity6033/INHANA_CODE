const tmplId = 'CwckkLsRAyaG-5fx0txMQmjvTgUabdHGb9aGU9vxeH4' //这是订阅消息模板id，需自行申请
var index=""
const OnedayTimestamp = 86400000
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
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
    if(e.currentTarget.dataset.id==0){
      this.getNewsData()
    }else if(e.currentTarget.dataset.id==1){
      this.getNewsData('中学')
    }
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },

  getNewsData(Class="小学"){
    wx.cloud.callFunction({
      name: "get_live_lecture_info",
      data: {Class}
    }).then(res=>{
      this.setData({
        newsList: res.result.data
      })
    })
  },

  ShowNewsOne(e){
    console.log(e)
    index = e.currentTarget.dataset.index
    wx.setStorageSync('question_name', this.data.newsList[index].title)
    //这是模板信息
    var name = this.data.newsList[index].template_title
    var teacher = this.data.newsList[index].teacher
    var content = "同学们记得完成课后练习哦";
    var timestamp = this.data.newsList[index].start_time;
    if((timestamp-Math.round(new Date()))<OnedayTimestamp*3 && (timestamp-Math.round(new Date()))>0){
      wx.requestSubscribeMessage({
        tmplIds: [tmplId],
          success (res) { 
            wx.cloud.callFunction({
              name: "store_template_info_daka",
                data: {
                  name,
                  content,
                  teacher,
                  page: 'pages/welcome/welcome',
                  timestamp
              },
              success(res) {
                wx.navigateTo({
                  url: '/pages/daka_detail/daka_detail',
                })
                console.log('个人信息-------------', res)
              },
              fail(err) {
                console.log('个人信息-------------', err)
              }
            })
          },
          fail(err){
            console.log(err)
          }
      })
    }else if((timestamp-Math.round(new Date()))<0){
      wx.navigateTo({
        url: '/pages/daka_detail/daka_detail',
      })
    }else{
      wx.setStorageSync('daka_timestamp', timestamp)
      wx.navigateTo({
        url: '/pages/daka_blank/daka_blank',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewsData();
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