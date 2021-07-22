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
  
    Iptchanged(e){
      this.getUserInfo(e.detail.value)
    }
  }
})