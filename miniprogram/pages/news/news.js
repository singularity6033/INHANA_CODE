const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  
  data: {
    newsList:[]
  },

  attached: function () {
    this.getNews();
  },
  
  methods: {
    getNews(){
      wx.cloud.callFunction({
        name: "get_news"
      }).then(res=>{
        console.log(res)
        this.setData({
          newsList: res.result.data
        })
      })
    },

    view_detail(e){
      var webview = e.currentTarget.dataset.src
      wx.navigateTo({  
        url: '/pages/webview/webview?webview='+webview,
      })
    },
  },
})