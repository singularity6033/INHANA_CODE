const app = getApp();
var one_choice_question=[];
//存放答题记录（题目索引和答题结果）
var result_question=[];
var result_status=[];
var QuestionName="";
//初始化选项索引
var item_index="";
Page({
  data: {
    question_choice_list:[],//存放选择题数组
    question_list_length:"",
    current_question:[],
    current_index:0,
    current_scorll:10,
    result_list:[],
    score:"",
    show_result:false,
    userInfo:[],
    btnShow:true
  },
  
  //选项点击事件
  radioCheck(e){
    //选项索引
    item_index = e.currentTarget.dataset.index
    //获取题目索引
    var question_choice_list = this.data.question_choice_list
    var current_index = this.data.current_index
    var current_question = this.data.current_question
    question_choice_list[current_index].options[item_index].checked = !question_choice_list[current_index].options[item_index].checked
    current_question = question_choice_list[current_index]
    //更新问题列表
    this.setData({
    question_choice_list,
    current_question,
  })
  },

  //点击下一题按钮
  NextQuestion(){
    var current_index = this.data.current_index;
    current_index = current_index+1;
    var question_choice_list = this.data.question_choice_list;
    if(current_index+1==question_choice_list.length){
      wx.showToast({
        title: '这是最后一题~',
        icon: 'none',
      })
    }
    //下一题的数据
    var current_question = question_choice_list[current_index];
    var current_scorll = (((current_index+1)/question_choice_list.length)*100).toFixed(1);
    //检查是否跳转到下一题
    if(this.Checkcount(question_choice_list[current_index-1].options)==1){
      this.setData({
        current_question,
        current_index,
        current_scorll
      })
    }else{
      wx.showToast({
        title: '有多选或未选',
        icon: 'error'
      })
    }
  },

  //点击提交按钮
  SubmitChoice(){
    this.setData({
      btnShow:false
    })
    var current_index = this.data.current_index;
    var groups = this.data.question_choice_list;
    if(this.Checkcount(groups[current_index].options)==1){
      for (var i = 0; i < groups.length; i++){
        if (this.Checkcount(groups[i].options)==1){
          for (var j = 0; j < groups[i].options.length; j++){
            if (groups[i].options[j].checked==true){
              result_question.push(groups[i])
              if (groups[i].options[j].code == groups[i].answer){          
                result_status.push(true)
              }else{
                result_status.push(false)
              }
            }
          }
        }
      }
      var res = this.arrayobject(result_question,result_status)
      this.setData({
        btnShow:false
      })
      this.addCloud(res)
    }else{
      wx.showToast({
        title: '有多选或未选',
        icon: 'error'
      })
    }
  },

  //答题记录格式 ['id':'问题id','status':'答题结果']
  arrayobject(result_question,result_status){
    var result = []
    var size = result_question.length
        for(var k=0;k<size;k++){
          var a={};
          a.question=result_question[k];
          a.status=result_status[k];
          result.push(a);
        }
    return result
  },

  //计算题目中已被选中选项的数量
  Checkcount(list){
    var num = 0;
    for(var j=0;j<list.length;j++){
      if(list[j].checked){num++;}
    }
    return num;
  },

  //计算答题正确率
  CalScore(list){
    var right_number = 0
    list.forEach(item=>{
      if (item.status){
        right_number++
      }
    });
    return ((right_number/list.length)*100).toFixed(1)
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

  //提交答题记录至云数据库
  addCloud(res){
    var resultFinal = res
    var scoreFinal = this.CalScore(resultFinal)
    var userInfo = this.data.userInfo
    wx.cloud.callFunction({
      name: "add_choice_record",
      data: {
        resultFinal,
        scoreFinal,
        userInfo
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '提交成功',
      })
      this.setData({
        result_list:resultFinal,
        show_result:true,
        score:scoreFinal
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    one_choice_question = wx.getStorageSync('one_choice_question')
    this.setData({
      question_choice_list:one_choice_question,
      current_question:one_choice_question[0],
      question_list_length:one_choice_question.length
    })
    result_question=[];
    result_status=[];
    this.getUser();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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