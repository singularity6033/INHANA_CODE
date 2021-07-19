import common from "../../js/common.js";
var plugin = requirePlugin('WechatSI')
let recorderManager = plugin.getRecordRecognitionManager()
const innerAudioContext = wx.createInnerAudioContext()
var one_audio_question = [];
var audio_record={};
var review="";
Page({
  data: {
    one_audio_question:[],
    tempPath:[],
    review:"",
    userInfo:"",
    isplay:false, //是否默认播放
    isShow:false,
    myAudioDuration: '', // 时间
    myAudioCurrent: '',  // 当前播放进度
    error: '',
    scrollTop: 0 // 内容底部与顶部的距离
  },

  getUser(){
    wx.cloud.callFunction({
      name: "get_userInfo",
    }).then(res => {
      console.log(res)
      this.setData({
        userInfo:res.result.data
      })
    })    
  },

  //开始录音的时候
  start(){
    console.log('recorder start')
    this.setData({
      isTouchStart:true,
      review:" "
    })
    wx.showToast({
      title: '录音中...',
      icon: 'loading',
      duration: 5000
    })
    wx.vibrateLong()
    recorderManager.start({
      lang: 'en_US',
      duration: 60000
    })
  },

  //停止录音
  stop(){
    recorderManager.stop()
    wx.showToast({
      title: '录音结束',
      icon:'success',
      duration:1000
    })
    this.setData({
      isTouchStart:false
    })
    this.toViewBottomFun()
  },

  toViewBottomFun(){
    // 设置屏幕自动滚动到最后一条消息处
    let that = this;
    wx.createSelectorQuery().select('#viewCommunicationBody').boundingClientRect(function(rect) {
      wx.pageScrollTo({
        scrollTop: rect.bottom,
        duration: 1000 // 滑动速度
      })
      that.setData({
        scrollTop: rect.height - that.data.scrollTop
      });
    }).exec();
  },

  //点击提交表单
  onSubmit(res){
    console.log(res)
    wx.showLoading({
      title: '提交中...',
      mask: true,
      duration: 500
    })
    var d = new Date();
    var year = d.getFullYear()+"";
    var month = d.getMonth()+1;
    var day = d.getDate();
    month = month < 10 ? "0" + month : month+"";
    day = day < 10 ? "0" + day : day+"";
    var userInfo = this.data.userInfo;
    var file=userInfo[0].openid+"_"+userInfo[0].phone;
    var filename = "audio_record/"+year+month+day+"_"+this.data.one_audio_question.audio_demo_src+"/"+file+common.getMyFile(this.data.tempPath);
    this.uploadFile(filename,this.data.tempPath)
    console.log(this.data.tempPath)
  },

  //上传音频到云存储
  uploadFile(filename, path){
    wx.cloud.uploadFile({
      cloudPath: filename,
      filePath: path
    }).then(res=>{
      audio_record.audioUrl=res.fileID
      audio_record.userInfo=this.data.userInfo
      audio_record.question_name=this.data.one_audio_question.audio_name
      audio_record.review = this.data.review
      //添加数据至云函数
      this.pushCloud(audio_record) 
    })
  },

  //上传到云数据库 the last step
  pushCloud(audio_record){
    wx.cloud.callFunction({
      name: "add_audio_record",
      data: audio_record
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '上传成功'
      })
    })
    wx.setStorageSync('PageCur', 'FrontPage')
    wx.reLaunch({
      url: '../student_page/student_page',
    })
  },

  //重新录制
  restart(){
    this.setData({
      tempPath:[],
    })
  },
  
  //播放开始
  Play(){
    innerAudioContext.src = this.data.tempPath;
    innerAudioContext.startTime = this.data.myAudioCurrent; //考虑到进度条被拖动，不一定从00:00:00开始
    innerAudioContext.play();
    this.setData({
      isplay: true
    });
    //进度条变化   
    innerAudioContext.onTimeUpdate(() => {
      this.setData({
        myAudioPos: innerAudioContext.currentTime / innerAudioContext.duration * 100,
        myAudioCurrent: common.format(innerAudioContext.currentTime)
      });
    })
  },

  //播放暂停
  Pause(){
    innerAudioContext.pause();
    this.setData({
      isplay: false
    });
  },
  
  //拖动进度条，到指定位置
  hanle_slider_change(e) {
    const position = e.detail.value;
    var currentTime = position / 100 * innerAudioContext.duration;
    innerAudioContext.seek(currentTime);
    console.log(currentTime)
    this.setData({
      myAudioPos: position,
      myAudioCurrent: common.format(currentTime)
    })

  },

  audio_score(x, y){
    var z = 0;
    var s = x.length + y.length;;
    x.sort();
    y.sort();
    var a = x.shift();
    var b = y.shift();
    while(a !== undefined && b !== undefined) {
      if (a === b) {
        z++;
        a = x.shift();
        b = y.shift();
      } else if (a < b) {
        a = x.shift();
      } else if (a > b) {
        b = y.shift();
      }
    }
    return (z/s * 200).toFixed(1);
  },

  string2array(string){
    var length = string.length;
    var result = [];
    var j = 0;
    for(var i=0; i<length-1; i++){
      if(string[i]==" "){
        //end的位置本身会多1
        result.push(string.substring(j,i))
        j = i+1
      }
    }
    return result;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options){
    one_audio_question = wx.getStorageSync('one_audio_question')
    this.setData({
      one_audio_question:one_audio_question
    })
    // this.getAudioQuestion(QuestionName)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(){
    recorderManager.onRecognize=res=>{
      let text = res.result
      console.log(text)
      }
      recorderManager.onStop=res=>{
      let text = res.result
      this.setData({
        tempPath:res.tempFilePath,
        isShow:true
      })
      console.log(res)
      console.log(text)
      var demo = this.data.one_audio_question.text
      var score = this.audio_score(this.string2array(text),this.string2array(demo))
      if (score>70){ 
        review = "Excellent !"
      }else if(score<=70 && score>50){
        review = "Good !"
      }else if(score<=50 && score>30){
        review = "Not bad !"
      }else if(score<=30){
        review = "Try Again !"
      }
      this.setData({
        review
      })
      setTimeout(() => {
        this.setData({
          isShow:false
        })
      }, 2000)
    } 

    //播放录音
    //获取当前录音信息
    innerAudioContext.onCanplay(() => {
    innerAudioContext.duration; //必须写，不然获取不到。。。
    setTimeout(() => {
      console.log(innerAudioContext.duration);
      this.setData({
        myAudioDuration: common.format(innerAudioContext.duration),
        myAudioCurrent: common.format(innerAudioContext.currentTime)
      });
    },1000);
  });
    // 播放完成处理，按钮变一下
    innerAudioContext.onEnded((res) => {
      this.setData({
        isplay: false
      })
    });
    //错误处理
    innerAudioContext.onError((res) => {
      this.setData({
        error: res.errMsg
      })
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUser();
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  }
})
