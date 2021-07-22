const app = getApp();
var user=[]
var userGender=1;
Component({
  
  options: {
    addGlobalClass: true,
  },

  data: {
    IsUserInfo: ""
  },

  attached: function () {
    this.getUser();
    this.onShow();
  },

  methods: {
    Login(){
      wx.getUserProfile({
      desc:'正在获取', //不写不弹提示框
      success:function(res){
        app.globalData.userInfo = res.userInfo
        wx.cloud.callFunction({
          name: "get_userInfo",
        }).then(res1 => {
          if(res1.result.data.length!=0){ 
            wx.navigateBack({
              delta: 1,
              fail: function(res) {
                wx.setStorageSync('PageCur', 'User')
                setTimeout(() => {
                  wx.reLaunch({
                    url: '../student_page/student_page',
                  })
                }, 100);
              },
            })
          }else{
            setTimeout(()=>{
              wx.navigateTo({
                url: '../login_info/login_info',
                }) 
            },500)
          }
        }) 
      }
    })   
  },

  getUser(){
    //增加延时拿到globalData
    setTimeout(()=>{
      var userInfo = app.globalData.userInfo;
      if(userInfo){
        wx.cloud.callFunction({
          name: "get_userInfo",
        }).then(res => {
            if(res.result.data.length!=0){ 
              userInfo.name = res.result.data[0].name
              userInfo.school = res.result.data[0].school
              userInfo.gender = res.result.data[0].gender
              if(userInfo.gender == "女" || userInfo.gender == "Female"){
                userGender = 2;
              }
              this.setData({
                userInfo:userInfo,
                userGender
              })
            }
          })        
        }
      }, 100)
    },

    switch_language(){
      app.changeLanguage()
      wx.setStorageSync('PageCur', 'User')
      wx.reLaunch({
        url: '../student_page/student_page',
      })
    },

    onShow(){
      this.setData({
        content: app.globalData.content,
      })
    },
  },
})