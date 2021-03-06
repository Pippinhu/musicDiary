// pages/story/story.js
const db = wx.cloud.database()
const app = getApp()

Page({

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
    const audio = wx.getBackgroundAudioManager()
    // 自动播放下一首
    audio.onEnded(() => {
      const musicList = this.data.musicList
      const musicIndex = musicList.findIndex(e => e._id === this.data.currentMusicId)
      const nextMusicIndex = (musicIndex + 1) % musicList.length
      this.setMusicCtxAndPlay(musicList[nextMusicIndex])
    })
    this.getData()
  },

  onShow(){
    this.getData()
  },

  onPullDownRefresh() {
    this.getData()
  },
})