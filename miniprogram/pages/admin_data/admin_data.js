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
        name:"get_live_lecture_info"
      }).then(res=>{
        this.setData({
          LiveLectureList: res.result.data
        })
      })
    },

    ShowNewsOne(e){
      console.log(e)
      index = e.currentTarget.dataset.index
      wx.setStorageSync('live_lecture_name', this.data.LiveLectureList[index].title)
      wx.navigateTo({
        url: '/pages/admin_data_detail/admin_data_detail',
      })
    }
  },
})