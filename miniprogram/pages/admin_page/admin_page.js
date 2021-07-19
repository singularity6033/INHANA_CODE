Page({

  data: {

  },

  NavChange(e) {
    console.log(e.currentTarget.dataset.cur)
    this.setData({
      PageCur: e.currentTarget.dataset.cur 
    })
  },

  onLoad: function (options) {
    var PageCur = wx.getStorageSync('PageCur');
    this.setData({
      PageCur
    })
  }
})