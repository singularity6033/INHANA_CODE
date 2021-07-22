Component({
  options: {
    addGlobalClass: true,
  },

  data: {
    AudioRecord: [],
    SelectStatus: false
  },

  attached: function () {
    this.getAudioRecord()
  },
  
  methods: {

    getAudioRecord(question_name=""){
      wx.cloud.callFunction({
        name: "get_audio_record_total",
        data: {question_name}
      }).then(res=>{
        this.setData({
          AudioRecord: res.result.data
        })
      })
    },
  
    detail_info(e){
      var current_index = e.currentTarget.dataset.index
      console.log(current_index)
      var current_audio_record = this.data.AudioRecord[current_index]
      wx.setStorageSync('current_audio_record', current_audio_record)
      wx.navigateTo({
        url: '../daka_record_audio/daka_record_audio'
      }) 
    },

    Iptchanged(e){
      this.getAudioRecord(e.detail.value)
    }
  }
})