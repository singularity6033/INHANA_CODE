// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payorder_grading:[]
  },

  handleOrderPay(){
    wx.cloud.callFunction({
      name: 'getPay',
      data: {
          total_fee: parseFloat(this.data.payorder_grading.item_price).toFixed(2) * 100,
          attach: 'anything',
          body: this.data.payorder_grading.item_name,
          ShopOrder: this.data.payorder_grading.OrderCode
        }
      }).then(res=>{
        console.log(res)
        wx.requestPayment({
          appId: res.result.appid,
          timeStamp: res.result.timeStamp,
          nonceStr: res.result.nonce_str,
          package: 'prepay_id=' + res.result.prepay_id,
          signType: 'MD5',
          paySign: res.result.paySign,
          success: res => {
            console.log(res)
            wx.showToast({
              icon:'success',
              title:'购买成功'
            })
          }
        }) 
      })
  },

  /**
   * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var payorder_grading = wx.getStorageSync('payorder_grading')
    this.setData({
      payorder_grading
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