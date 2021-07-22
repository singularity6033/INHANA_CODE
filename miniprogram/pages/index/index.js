const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  
  data: {
    swiperList:[],
    activityUrl:"",
    show:true,
    cardCur:0
  },

  attached: function () {
    this.getSwiperList();
    this.getActivityImg();
    this.getOfflineLecture();
    this.onShow();
  },
  
  methods: {
    cardSwiper(e) {
      // console.log(e.detail.current)
      this.setData({
        cardCur:e.detail.current
      })
    },
  
    getSwiperList(){
      var type = "A"
      wx.cloud.callFunction({
        name:"get_swiper_img",
        data: {type}
      }).then(res=>{
        console.log(res)
        this.setData({
          swiperList:res.result.data
        })
      })
    },
  
    getActivityImg(){
      wx.cloud.callFunction({
        name:"get_activity_img"
      }).then(res=>{
        this.setData({
          activityUrl:res.result.data[0]
        })
      })
    },

    getOfflineLecture(){
      wx.showLoading()
      wx.cloud.callFunction({
        name: "get_offline_lecture_info",
      }).then(res=>{
        var offlineLectureList= []
        for(var i=0; i<2; i++){
          offlineLectureList.push(res.result.data[i])
        }
        this.setData({
          offlineLectureList
        })
        wx.hideLoading()
      })
    },

    ShowDataOne(e){
      if(app.globalData.userInfo){
        var index = e.currentTarget.dataset.index;
        wx.setStorageSync('itemOne', this.data.offlineLectureList[index])
        wx.setStorageSync('itemType', "offline_lecture")
        wx.navigateTo({
          url: '../item_detail/item_detail'
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
  
    preview_swiper_img(e){
      var cur=e.target.dataset.src;//获取本地一张图片链接
      console.log(e)
      wx.previewImage({
        current: cur, //字符串，默认显示urls的第一张
          urls: [cur] // 数组，需要预览的图片链接列表
      })
    },

    onShow(){
      this.setData({
        content: app.globalData.content,
      })
    }
  },
})