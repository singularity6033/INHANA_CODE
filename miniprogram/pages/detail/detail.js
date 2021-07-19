var index1=0
var index2=0
var payorder_lecture={}
var isPay=[]
var Openid=''
const app = getApp();

Page({

  data: {
    TabCur: 0,
    scrollLeft: 0,
    question_list:[],
    isDaka:[],
    LectureList:[],
    isPay: []
  },

  tabSelect(e) {
    if(e.currentTarget.dataset.id==0){
      this.getLecture()
      this.getPayShow()
    }else if(e.currentTarget.dataset.id==1){
      this.getLecture("付费")
      this.getPayShow()
    }
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },

  getPayShow(){
    isPay=[]
    setTimeout(()=>{
      wx.cloud.callFunction({
      name:"get_openid"
    }).then(res=>{
        console.log(res)
        Openid = res.result
        this.IsShow(this.data.LectureList,Openid)
        this.setData({
          isPay
        })
      })
    }, 100)
  },

  IsShow(List, openid){
    for (var i = 0; i<List.length; i++){
      if(List[i].bought_id.indexOf(openid)==-1){
        isPay.push(false)
      }else{
        isPay.push(true)
      }
    }
    return isPay
  },

  OrderCode(){
    var d = new Date();
    var year = d.getFullYear()+"";
    var month = d.getMonth()+1;
    var day = d.getDate();
    month = month < 10 ? "0" + month : month+"";
    day = day < 10 ? "0" + day : day+"";
    var date = year+month+day;
    var randomNum = Math.floor(Math.random()*10000000000);
    //构造32位商户订单号
    var ordercode = "INHANA"+date+"Y"+randomNum;
    return ordercode
  },

  getLecture(Class="免费"){
    wx.showLoading()
    wx.cloud.callFunction({
      name: "get_lecture",
      data: {Class}
    }).then(res=>{  
      this.setData({
        LectureList: res.result.data,
      })
      wx.hideLoading()
    })
  },

  FreeLectureDetail(e){
    if(app.globalData.userInfo){
      index1 = e.currentTarget.dataset.index
      wx.setStorageSync('lecture_name', this.data.LectureList[index1].title)
      wx.navigateTo({
        url: '../video_list/video_list',
      })
    }else{
      wx.showToast({
        title: this.data.content.login_remind,
        icon: 'error',
        duration: 1500
      })
      wx.setStorageSync('PageCur', 'User')
      setTimeout(() => {
        wx.reLaunch({
          url: '../student_page/student_page',
        })
      }, 1500);
    }
  },

  ChargedLectureDetail(e){
    if(app.globalData.userInfo){
      index2 = e.currentTarget.dataset.index
      payorder_lecture.item_id = this.data.LectureList[index2]._id
      payorder_lecture.item_name = this.data.LectureList[index2].title
      payorder_lecture.item_price = this.data.LectureList[index2].price
      payorder_lecture.OrderCode = this.OrderCode()
      wx.setStorageSync('lecture_name', this.data.LectureList[index2].title)
      wx.setStorageSync('payorder_lecture', payorder_lecture)
      if(this.data.isPay[index2]){
        wx.navigateTo({
          url: '../video_list/video_list',
        })
      }else{
        wx.navigateTo({
          url: '../lecture_pay/lecture_pay',
        })
      }
    }else{
      wx.showToast({
        title: this.data.content.login_remind,
        icon: 'error',
        duration: 1500
      })
      wx.setStorageSync('PageCur', 'User')
      setTimeout(() => {
        wx.reLaunch({
          url: '../student_page/student_page',
        })
      }, 1500);
    }
  },

  onLoad: function (options) {
    this.getLecture()
    this.getPayShow()
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

  onPullDownRefresh: function () {
    
  },

  onReachBottom: function () {
    
  },

  onShareAppMessage: function () {

  }
})