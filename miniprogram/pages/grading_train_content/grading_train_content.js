var index_name = ""
var question_name = ""
const app = getApp();
Page({

  data: {
    question_list_choice:[],
    question_list_audio:[],
    grading_training_video_list: [],
  },

  backToHome(){
    setTimeout(()=>{
      wx.setStorageSync('PageCur', 'FrontPage')
      wx.reLaunch({
        url: '../student_page/student_page',
      })
    }, 100)
  },

  ToFileList(){
    if(app.globalData.userInfo){
      wx.navigateTo({
        url: '../show_files/show_files',
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

  ToLectureList(){
    if(app.globalData.userInfo){
      wx.navigateTo({
        url: '../video_list/video_list',
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

  choice(){
    if(app.globalData.userInfo){
      wx.setStorageSync('one_choice_question', this.data.question_list_choice)
      wx.navigateTo({
        url: '../daka_question_choice/daka_question_choice',
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

  audio(){
    if(app.globalData.userInfo){
      wx.setStorageSync('one_audio_question', this.data.question_list_audio[0])
      wx.navigateTo({
        url: '../question_audio_demo/question_audio_demo',
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

  getDakaInfo_audio(){
    wx.cloud.callFunction({
      name:"get_question_audio",
      data:{question_name}
    }).then(res=>{
      console.log(res)
      this.setData({
        question_list_audio: res.result.data
      })
    })
  },

  getDakaInfo_choice(){
    wx.cloud.callFunction({
      name: "get_question_choice",
      data: {question_name}
    }).then(res=>{
      console.log(res)
      this.setData({
        question_list_choice: res.result.data
      })
    })
  },

  // getGradingTrainingLecture(){
  //   wx.cloud.callFunction({
  //     name: "get_garding_training_lecture",
  //     data: {index_name}
  //   }).then(res=>{
  //     console.log(res)
  //     this.setData({
  //       grading_training_video_list: res.result.data
  //     })
  //   })
  // },

  getFiles(){
    wx.cloud.callFunction({
      name:"get_Files",
      data: {index_name}
    }).then(res=>{
      this.setData({
        files: res.result.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    index_name = wx.getStorageSync('index_name')
    question_name = index_name
    this.getDakaInfo_audio();
    this.getDakaInfo_choice();
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