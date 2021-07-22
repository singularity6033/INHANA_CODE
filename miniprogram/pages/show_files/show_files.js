var index_name = ""
var filesList = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    FilesList: []
  },

  backToHome(){
    setTimeout(()=>{
      wx.setStorageSync('PageCur', 'FrontPage')
      wx.reLaunch({
        url: '../student_page/student_page',
      })
    }, 100)
  },

  preview_swiper_img(e){
    var cur=e.target.dataset.src;//获取本地一张图片链接
    console.log(e)
		wx.previewImage({
			current: cur, //字符串，默认显示urls的第一张
  			urls: [cur] // 数组，需要预览的图片链接列表
		})
  },

  getFilesList(){
    wx.cloud.callFunction({
      name:"get_files",
      data: {index_name}
    }).then(res=>{
      console.log(res)
      filesList = res.result.data
      if(filesList.length==0){
        this.setData({
          blankShow: true,
        })
      }else{
        this.setData({
          blankShow: false,
          FilesList: filesList[0].pic_url_list
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    index_name = wx.getStorageSync('index_name')
    this.getFilesList()
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