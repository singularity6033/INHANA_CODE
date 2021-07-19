var index=""
Component({
  options: {
    addGlobalClass: true,
  },

  data: {

  },

  attached: function () {
    this.getNewsData();
  },

  methods: {
    getNewsData(){
      wx.cloud.callFunction({
        name:"get_news"
      }).then(res=>{
        this.setData({
          newsList:res.result.data
        })
      })
    },

    ShowNewsOne(e){
      console.log(e)
      index = e.currentTarget.dataset.index
      wx.setStorageSync('question_name', this.data.newsList[index].title)
      wx.navigateTo({
        url: '/pages/admin_data_detail/admin_data_detail',
      })
    }
  },
})