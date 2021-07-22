// pages/admin_page/admin_page.js
Component({
  options: {
    addGlobalClass: true,
  },

  data: {
    UserInfoGradingList:[]
  },

  attached: function () {
    this.getUserInfoGrading()
  },
  
  methods: {
    getUserInfoGrading(name=""){
      wx.cloud.callFunction({
        name:"get_userInfo_grading_total",
        data: {name}
      }).then(res=>{
        this.setData({
          UserInfoGradingList: res.result.data,
          grading_num: Object.keys(res.result.data).length
        })
      })
    },

    Iptchanged(e){
      this.getUserInfoGrading(e.detail.value)
    }
  },



})