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
  },
})