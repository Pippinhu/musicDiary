// pages/story/story.js
const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList: [],
    currentMusicId: null,
  },

  getData() {
    const that = this
    wx.cloud.callFunction({
      name: 'getMusic',
      success: res => {
        const musicList = res.result.data
        that.setData({
          musicList
        })
      }
    })
    wx.stopPullDownRefresh()
  },

  toForm() {
    wx.navigateTo({
      url: '../story/input/input'
    })
  },

  setMusicCtxAndPlay(music) {
    const audio = wx.getBackgroundAudioManager()
    audio.src = music.musicUrl
    audio.title = music.songName
    audio.singer = music.singer
    this.setData({
      currentMusicId: music._id
    })
    audio.play()
  },

  toggleMusic(e) {
    const audio = wx.getBackgroundAudioManager()
    const musicId = e.currentTarget.dataset.id
    if (musicId === this.data.currentMusicId) {
      audio.pause()
      this.setData({
        currentMusicId: null
      })
    } else {
      const music = this.data.musicList.find(e => e._id === musicId)
      this.setMusicCtxAndPlay(music)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const audio = wx.getBackgroundAudioManager()
    // 自动播放下一首
    audio.onEnded(() => {
      const musicList = this.data.musicList
      const musicIndex = musicList.findIndex(e => e._id === this.data.currentMusicId)
      const nextMusicIndex = (musicIndex + musicList.length) % musicList.length
      this.setMusicCtxAndPlay(musicList[nextMusicIndex])
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  onPullDownRefresh() {
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})