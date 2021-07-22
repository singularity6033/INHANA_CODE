var question_name=""
const app = getApp();
Page({

  data: {
    question_list_choice:[],
    question_list_audio:[],
    download_before:[],
    download_after:[],
    live_replay:[],
    isShow1:false,
    isShow2:false
  },

  backToHome(){
    setTimeout(()=>{
      wx.setStorageSync('PageCur', 'FrontPage')
      wx.reLaunch({
        url: '../student_page/student_page',
      })
    }, 100)
  },

  download(e){
    if(app.globalData.userInfo){
      if(e.currentTarget.dataset.item=="课前资料"){
        wx.setStorageSync('download_info', this.data.download_before)
      }else if(e.currentTarget.dataset.item=="课后资料"){
        wx.setStorageSync('download_info', this.data.download_after)
      }
      wx.navigateTo({
        url: '../test_download/test_download',
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

  download_after(){
    if(app.globalData.userInfo){
      wx.setStorageSync('download_after', this.data.download_after)
      wx.navigateTo({
        url: '../test_download/test_download',
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

  ToAudio(content){
    if(app.globalData.userInfo){
      wx.setStorageSync('one_audio_question', content)
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

  audio(e){
    var type = e.currentTarget.dataset.item
    var content = {}
    if(type=="normal" || type=="normal1" || type=="girl"){
      content = this.data.question_list_audio[0]
    }else if(type=="boy" || type=="normal2"){
      content = this.data.question_list_audio[1]
    }else if(type=="normal3"){
      content = this.data.question_list_audio[2]
    }
    this.ToAudio(content)
  },

  review(){
    if(app.globalData.userInfo){
      wx.setStorageSync('live_replay', this.data.live_replay)
      wx.navigateTo({
        url: '../live_replay/live_replay',
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
        question_list_audio:res.result.data
      })
    })
  },

  getDakaInfo_choice(){
    wx.cloud.callFunction({
      name:"get_question_choice",
      data:{question_name}
    }).then(res=>{
      console.log(res)
      this.setData({
        question_list_choice:res.result.data
      })
    })
  },

  // getLiveCode(){
  //   wx.cloud.callFunction({
  //     name:"get_live_code",
  //     data:{question_name}
  //   }).then(res=>{
  //     console.log(res)
  //     this.setData({
  //       live_code:res.result.data
  //     })
  //   })
  // },

  getLiveReplay(){
    wx.cloud.callFunction({
      name:"get_live_replay",
      data:{question_name}
    }).then(res=>{
      console.log(res)
      this.setData({
        live_replay: res.result.data
      })
    })
  },

  getDownloads(){
    var download_before = []
    var download_after = []
    wx.cloud.callFunction({
      name:"get_downloads",
      data: {question_name}
    }).then(res=>{
      console.log(res)
      for(var i=0; i<res.result.data.length; i++){
        if(res.result.data[i].category=="课前资料"){
          download_before.push(res.result.data[i])
        }else if(res.result.data[i].category=="课后资料"){
          download_after.push(res.result.data[i])
        }
      }
    })
    this.setData({
      download_before,
      download_after
    })
  },

  addDaka(){  
    wx.cloud.callFunction({
      name: "add_daka_record",
      data: {question_name}
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    question_name = wx.getStorageSync('question_name')
    if(question_name=="世界文学戏剧经典－英国魔幻文学小说《哈利•波特》"){
      this.setData({
        isShow1: true
      })
    }else if(question_name=="世界文学戏剧经典－《查理与巧克力工厂》"){
      this.setData({
        isShow2: true
      })  
    }else if(question_name=="第二届英语文学戏剧公开课结课汇演"){
      this.setData({
        isShow3: true
      })
    }
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
    this.getDakaInfo_audio();
    this.getDakaInfo_choice();
    this.getDownloads();
    this.getLiveReplay();
    this.addDaka();
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