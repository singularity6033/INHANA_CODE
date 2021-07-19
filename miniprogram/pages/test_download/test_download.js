// pages/test_download/test_download.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    DownloadList:[]
  },

  download(e){
    var index = e.currentTarget.dataset.index
    wx.showLoading({
      title: '正在下载...',
    })
    wx.downloadFile({
      url: this.data.DownloadList[index].work_url,
      filePath: wx.env.USER_DATA_PATH + '/'+this.data.DownloadList[index].title+this.data.DownloadList[index].category+(index+1).toString()+'.pdf',
      success: function(res) {
        wx.openDocument({
          filePath: res.filePath,
          success: function (res) {
            wx.hideLoading()
            console.log('打开文档成功')
          }
        })
      },fail: function(res){
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var DownloadList = wx.getStorageSync('download_info')
    this.setData({
      DownloadList
    })
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