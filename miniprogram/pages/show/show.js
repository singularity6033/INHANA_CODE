import common from "../../js/common.js";
const tmplId = 'Xtd2_MUTE6dATxvwOpO8euBRzSrP3qt-VV1jIWB_aBw' //这是订阅消息模板id，需自行申请
var dataone={};
Page({

  data: {
    dataone:{}
  },

  backToHome(){
    setTimeout(()=>{
      wx.setStorageSync('PageCur', 'FrontPage')
      wx.reLaunch({
        url: '../student_page/student_page',
      })
    }, 100)
  },

  previewImage(e){
    var cur=e.target.dataset.src;//获取本地一张图片链接
    console.log(e)
		wx.previewImage({
			current: cur, //字符串，默认显示urls的第一张
  			urls: [cur] // 数组，需要预览的图片链接列表
		})
	},

  //获取一条新闻
  getNewOne(id){
    wx.cloud.callFunction({
      name: "get_nsOne",
      data:{
        id
      }
    }).then(res=>{
      console.log(res.result.data[0])
      this.setData({
        dataone:res.result.data[0]
      })
    })
  },

  addRead(id){
    wx.cloud.callFunction({
      name: "add_read",
      data: {
        id
      }
    }).then(res=>{
      this.setData({
        dataone:res.result.data
      })
      console.log(res.result.data)
    })
  },

  order_submit:function(e){
    //这是模板信息
    var name = this.data.dataone.title;
    var time = common.myDate(this.data.dataone.start_time,1);
    var teacher = this.data.dataone.teacher;
    var timestamp = this.data.dataone.start_time;
    wx.requestSubscribeMessage({
      tmplIds: [tmplId],
        success (res) { 
          wx.cloud.callFunction({
            name: "send_template_info",
              data: {
                name,
                time,
                teacher,
                content: '记得课前打卡',
                page: 'pages/index/index',
                timestamp
            },
            success(res) {
              console.log('个人信息-------------', res)
            },
            fail(err) {
              console.log('个人信息-------------', err)
            }
          })
          
        }
      })   
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    dataone = wx.getStorageSync('OneNews')
    this.setData({
      dataone
    })
    // this.getNewOne(id)
    this.addRead(dataone._id)
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