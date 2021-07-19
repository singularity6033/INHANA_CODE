// pages/daka_record/daka_record.js
var choice_mistake_list=[];
var audio_record_list=[];
Page({
  
  data: {
    TabCur: 0,
    scrollLeft:0,
    choice_record_list:[],
    audio_record_list:[]
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },

  ReviewMistakes(e){
    var current_index = e.currentTarget.dataset.index
    console.log(current_index)
    var current_record = this.data.choice_record_list[current_index].result_list
    console.log(current_record)
    for (var i = 0; i < current_record.length; i++){
      if(!current_record[i].status){
        choice_mistake_list.push(current_record[i].question)
      }
    };
    wx.setStorageSync('choice_mistake_list', choice_mistake_list)
    console.log(choice_mistake_list)
    wx.navigateTo({
      url: '../daka_record_choice/daka_record_choice',
    }) 
  },

  ReviewAudio(e){
    var current_index = e.currentTarget.dataset.index
    console.log(current_index)
    var current_audio_record = this.data.audio_record_list[current_index]
    wx.setStorageSync('current_audio_record', current_audio_record)
    wx.navigateTo({
      url: '../daka_record_audio/daka_record_audio'
    }) 
  },

  getChoiceRecord(){
    wx.cloud.callFunction({
      name:"get_choice_record"
    }).then(res=>{
      console.log(res)
      this.setData({
        choice_record_list:res.result.data,
      })
    })
  },

  getAudioRecord(){
    wx.cloud.callFunction({
      name:"get_audio_record"
    }).then(res=>{
      console.log(res)
      this.setData({
        audio_record_list:res.result.data,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getChoiceRecord()
    this.getAudioRecord()
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
    choice_mistake_list=[]
    audio_record_list=[]
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