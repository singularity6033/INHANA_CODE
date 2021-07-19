import zh from '/utils/zh'
import en from '/utils/en'//导入两个字典

App({

  globalData: {
    language: wx.getStorageSync('language')
  },

  onLaunch: function () {
    this.updateContent()
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    }else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    wx.setInnerAudioOption({
      mixWithOther: true,
      obeyMuteSwitch: false,
      success: function(e){ },
      fail: function(e){ }
    })
  },

  onShareAppMessage: function () {
    return {
      title: 'INHANA英翰语言戏剧教育',
      path: '/pages/welcome/welcome',//用户点开后的默认页面
      imageUrl: "/images/share.jpg",//自定义图片的地址
      success (res) {
        console.log('分享成功！')
      }
    }
  },

  updateContent() {
    let lastLanguage = wx.getStorageSync('language')//获取当前语言
    if (lastLanguage == 'en') {
      this.globalData.content = en.content//根据当前系统语言获取对应文本
      wx.setStorageSync('language', 'en')//把当前语言保存在本地
    } else {//中文为默认语言
      this.globalData.content = zh.content
      wx.setStorageSync('language', 'zh')
    }
  },

  changeLanguage() {
    let language = wx.getStorageSync('language')//获取当前语言
    if (language == "zh") {
      wx.setStorageSync('language', 'en')//切换语言并保存在本地
    } else {
      wx.setStorageSync('language', 'zh')
    }
    this.updateContent()//拿修改后语言获取对应文本
  }
})
