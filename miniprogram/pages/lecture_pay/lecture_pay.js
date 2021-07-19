import common from "../../js/common.js";
const app = getApp();
Page({
  data: {
    payorder_lecture: [],
    payTime: "",
    userInfo:[]
  },

  getUser(){
    wx.cloud.callFunction({
      name: "get_userInfo",
    }).then(res => {
      console.log(res)
      this.setData({
        userInfo: res.result.data
      })
    })    
  },

  add_lecture_payment(){
    wx.cloud.callFunction({
      name: 'add_lecture_payment_record',
      data: {
        item_name: this.data.payorder_lecture.item_name,
        item_price: this.data.payorder_lecture.item_price,
        payOrder: this.data.payorder_lecture.OrderCode,
        payTime: this.data.payTime,
        userInfo: this.data.userInfo
      }
    }).then(res=>{
        console.log(res)
    })
  },

  handleOrderPay(){
    wx.cloud.callFunction({
      name: 'getPay',
      data: {
          total_fee: parseFloat(this.data.payorder_lecture.item_price).toFixed(2) * 100,
          attach: 'anything',
          body: this.data.payorder_lecture.item_name,
          ShopOrder: this.data.payorder_lecture.OrderCode
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
            wx.showToast({
              icon:'success',
              title:'购买成功'
            })
            this.add_lecture_payment()
            setTimeout(()=>{
              wx.setStorageSync('PageCur', 'FrontPage')
              wx.reLaunch({
                url: '../student_page/student_page',
              })
          }, 500)
          }
        }) 
      })
  },

  onLoad: function (options) {
    var payorder_lecture = wx.getStorageSync('payorder_lecture')
    this.getUser()
    this.setData({
      payorder_lecture,
      payTime: common.myDate(Math.round(new Date()),1)
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
  onShow(){
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