var OpenidGroup = []
var TemplateData = {}
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },

  data: {
    btnShow:true,
  },

  attached: function () {
    
  },

  methods: {
    //监听输入事件
    IptChanged(res){
      console.log(res)
      if(res.detail.value.length){
        this.setData({
          btnShow: false
        })
      }else{
        this.setData({
          btnShow: true
        })
      }
    },

    onSubmit(res){   
      TemplateData = res.detail.value
      wx.setStorageSync('TemplateData', TemplateData)
      wx.navigateTo({
        url: '../template_info_send/template_info_send',
      })
    },


  },

})