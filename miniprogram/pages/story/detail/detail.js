const db = wx.cloud.database()
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({
  data:{
    isPlayingMusic: true,
    postId:'',
    url: '',
  },

  onLoad:function(options){
    var postId = options.id;
    console.log(postId)
    db.collection('story').doc(postId).get({
      success: res => {
        let data = res.data;
        this.setData({
          img: data.img,
          title: data.title,
          content: data.content,
          date: data.date,
          url: data.url,
          abstract: data.abstract
        })
        backgroundAudioManager.title = this.data.abstract;
        backgroundAudioManager.epname = this.data.abstract;
        backgroundAudioManager.singer = this.data.abstract;
        backgroundAudioManager.src=this.data.url;
        backgroundAudioManger.coverImgUrl ="http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000"
      }
    })
  },

  onPlay:function(){
    backgroundAudioManager.play()
    this.setData({
      isPlayingMusic:true
    })
  },

  onPause: function () {
    backgroundAudioManager.pause()
    this.setData({
      isPlayingMusic: false
    })
  },

  onReady:function(){
    let that=this;
      backgroundAudioManager.onEnded(function () {
        that.setData({
          isPlayingMusic: false
        })
        console.log("stop")        
      })
  }
})