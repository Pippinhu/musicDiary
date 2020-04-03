//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:'project-0a69df',
        traceUser: true,
      })
    }

    this.globalData = {
      play:false,
      pause:false,
      stop:true,
      list:[],//正在播放的音频列表
      listIndex:0,// 正在播放的音频索引
      listId:[]
    }
  },
})
