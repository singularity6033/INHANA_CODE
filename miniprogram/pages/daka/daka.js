const tmplId = 'CwckkLsRAyaG-5fx0txMQmjvTgUabdHGb9aGU9vxeH4' //这是订阅消息模板id，需自行申请
var index=""
const OnedayTimestamp = 86400000
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

    backToHome(){
      setTimeout(()=>{
        wx.setStorageSync('PageCur', 'FrontPage')
        wx.reLaunch({
          url: '../student_page/student_page',
        })
      }, 100)
    },

    getNewsData(){
      wx.cloud.callFunction({
        name:"get_live_lecture_info"
      }).then(res=>{
        this.setData({
          newsList: res.result.data
        })
      })
    },
  
    ShowNewsOne(e){
      console.log(e)
      index = e.currentTarget.dataset.index
      wx.setStorageSync('question_name', this.data.newsList[index].title)
      //这是模板信息
      var name = this.data.newsList[index].template_title
      var teacher = this.data.newsList[index].teacher
      var content = "同学们记得完成课后练习哦";
      var timestamp = this.data.newsList[index].start_time;
      if((timestamp-Math.round(new Date()))<OnedayTimestamp*3 && (timestamp-Math.round(new Date()))>0){
        wx.requestSubscribeMessage({
          tmplIds: [tmplId],
            success (res) { 
              console.log(1)
              wx.cloud.callFunction({
                name: "send_template_info",
                  data: {
                    name,
                    content,
                    teacher,
                    page: 'pages/welcome/welcome',
                    timestamp
                },
                success(res) {
                  wx.navigateTo({
                    url: '/pages/daka_detail/daka_detail',
                  })
                  console.log('个人信息-------------', res)
                },
                fail(err) {
                  console.log('个人信息-------------', err)
                }
              })
            },
            fail(err){
              console.log(err)
            }
        })
      }else if((timestamp-Math.round(new Date()))<0){
        wx.navigateTo({
          url: '/pages/daka_detail/daka_detail',
        })
      }else{
        wx.setStorageSync('daka_timestamp', timestamp)
        wx.navigateTo({
          url: '/pages/daka_blank/daka_blank',
        })
      }
    }
  },
})