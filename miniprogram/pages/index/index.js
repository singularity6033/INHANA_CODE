const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  
  data: {
    CustomBar: app.globalData.CustomBar,
    swiperList: [],
    list_name: [],
    activityUrl: "",
    show: true,
    cardCur: 0,
    NowTime: Math.round(new Date())
  },

  attached: function () {
    this.getSwiperList();
    this.getActivityImg();
    this.getNews();
    this.onShow();
  },
  
  methods: {
    cardSwiper(e) {
      // console.log(e.detail.current)
      this.setData({
        cardCur: e.detail.current
      })
    },

    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target,
        list_name:['学习内容','知识分享']
      })
    },

    // showModal1(){
    //   this.setData({
    //     modalName: 'DrawerModalL',
    //     list_name:['资讯链接','视频列表']
    //   })
    // },

    showModal2(){
      this.setData({
        modalName: 'DrawerModalL',
        list_name: ['好书推荐系列','知识大百科系列','英国资讯分享']
      })
    },

    hideModal(e) {
      this.setData({
        modalName: null
      })
    },

    switchTo(e){
      var url = ''
      if(e.currentTarget.dataset.item=='学习内容'){
        url = '../daka_category/daka_category'
      }else if(e.currentTarget.dataset.item=='知识分享'){
        this.showModal2()
        return;
      }else if(e.currentTarget.dataset.item=='好书推荐系列'){
        url = '../news/news'
      }else{
        wx.setStorageSync('index_name', e.currentTarget.dataset.item)
        console.log(e.currentTarget.dataset.item)
        url = '../video_list/video_list'
        this.showModal2()
        return;
      }
      wx.navigateTo({
        url
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

    // getOfflineLecture(){
    //   wx.showLoading()
    //   wx.cloud.callFunction({
    //     name: "get_offline_lecture_info",
    //   }).then(res=>{
    //     var offlineLectureList= []
    //     for(var i=0; i<2; i++){
    //       offlineLectureList.push(res.result.data[i])
    //     }
    //     this.setData({
    //       offlineLectureList
    //     })
    //     wx.hideLoading()
    //   })
    // },

    // ShowDataOne(e){
    //   if(app.globalData.userInfo){
    //     var index = e.currentTarget.dataset.index;
    //     wx.setStorageSync('itemOne', this.data.offlineLectureList[index])
    //     wx.setStorageSync('itemType', "offline_lecture")
    //     wx.navigateTo({
    //       url: '../item_detail/item_detail'
    //     })
    //   }else{
    //     wx.showToast({
    //       title: '请先登录',
    //       icon:'error',
    //       duration: 1500
    //     })
    //     wx.setStorageSync('PageCur', 'User')
    //     setTimeout(() => {
    //       wx.navigateTo({
    //         url: '../student_page/student_page',
    //       })
    //     }, 1500);
    //   }
    // },
  
    preview_swiper_img(e){
      var cur=e.target.dataset.src;//获取本地一张图片链接
      console.log(e)
      wx.previewImage({
        current: cur, //字符串，默认显示urls的第一张
          urls: [cur] // 数组，需要预览的图片链接列表
      })
    },

    getNews(Class=""){
      wx.showLoading()
      wx.cloud.callFunction({
        name: "get_news",
        data: {Class}
      }).then(res=>{
        console.log(res)
        this.setData({
          newsList: res.result.data
        })
        wx.hideLoading()
      })
    },
  
    view_detail(e){
      var webview = e.currentTarget.dataset.src
      var index = e.currentTarget.dataset.index
      var id = this.data.newsList[index]._id
      wx.cloud.callFunction({
        name: "add_news_read",
        data: {id}
      }).then(res=>{
        console.log(res)
        wx.navigateTo({  
          url: '/pages/webview/webview?webview='+webview,
        })
      })
    },

    onShow(){
      this.setData({
        content: app.globalData.content,
      })
    }
  },
})