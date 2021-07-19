// pages/admin_page/admin_page.js
Component({
  options: {
    addGlobalClass: true,
  },

  data: {
    UserInfoList:[],
    SelectStatus:false
  },

  attached: function () {
    this.getUserInfo()
  },
  
  methods: {
    getUserInfo(school=""){
      wx.cloud.callFunction({
        name:"get_userInfo_total",
        data:{school}
      }).then(res=>{
        this.setData({
          UserInfoList:res.result.data,
          user_num: Object.keys(res.result.data).length
        })
      })
    },
  
    detail_info(e){
      var index = e.currentTarget.dataset.index
      wx.setStorageSync('openid_record', this.data.UserInfoList[index].openid)
      wx.navigateTo({
        url: '../admin_daka_record/admin_daka_record',
      })
    },

    Iptchanged(e){
      // console.log(e.detail.value)
      this.getUserInfo(e.detail.value)
    }
  }
})