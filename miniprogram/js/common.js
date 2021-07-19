const common={
  getMyId(){ 
      return Number(Math.random()
      .toString().substr(3, 12) + Date.now())
      .toString(36);
  },

  getMyFile(file){
      var index=file.lastIndexOf(".")
      return file.substr(index)
  },

  // 时间格式化
  format(t){
    let time = Math.floor(t / 60) >= 10 ? Math.floor(t / 60) : '0' + Math.floor(t / 60);
    t = time + ':' + ((t % 60) / 100).toFixed(2).slice(-2);
    return t;
  },

  //时间戳转时间间隔
  timesFun: function (timesData) {
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    var dateBegin = timesData;//将-转化为/，使用new Date    
    var dateEnd = Math.round(new Date());//获取当前时间
    if (dateBegin>=dateEnd){
        var dateDiff = dateBegin-dateEnd;  //时间差的毫秒数
    }else{
        var dateDiff = dateEnd-dateBegin;  //时间差的毫秒数
    }
    var yearDiff = Math.floor(dateDiff / (24 * 3600 * 1000 * 365));
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));  //计算出相差天数
    var leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    var timesString = '';
    if (yearDiff != 0) {
        timesString = yearDiff + '年';
    } else if (yearDiff == 0 && dayDiff != 0) {
        timesString = dayDiff + '天';
    } else if (dayDiff == 0 && hours != 0) {
        timesString = hours + '小时';
    } else if (hours == 0 && minutes != 0) {
        timesString = minutes + '分钟';
    } return timesString
},

  myDate: function(value, type = 0){
    var time = new Date(value);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    month = month < 10 ? "0" + month : month; 
    date = date < 10 ? "0" + date : date; 
    hour = hour < 10 ? "0" + hour : hour; 
    minute = minute < 10 ? "0" + minute : minute; 
    second = second < 10 ? "0" + second : second; 
    var arr = [ 
    year + "-" + month + "-" + date, 
    year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second, 
    year + "年" + month + "月" + date, 
    year + "年" + month + "月" + date + " " + hour + ":" + minute + ":" + second, 
    hour + ":" + minute + ":" + second 
    ] 
    return arr[type]; 
 }   
}

module.exports=common