// pages/story/story.js
const db = wx.cloud.database();
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList: [],
    totalCount: 0,
    pageSize: 10,
    index: '',
    newList: [],
    showPlayList: '',
    currentMusicId: null,
  },

  getData() {
    let that = this;
    console.log(app.globalData.list.length)
    wx.cloud.callFunction({
      name: 'getMusic',
      data: {},
      success: res => {
        //刷新前的旧数据
        let list = app.globalData.list
        //刷新后的新数据
        let newList = res.result.data
        if (list.length !== 0) {
          //找到两个列表中不同的数据
          let diffList = newList.filter(e => !list.some(e1 => e1._id == e._id))
          let finalDiff = diffList.map(item => Object.assign(item, {
            showPlay: true
          }))
          if (diffList.length !== 0) {
            list.splice(0, 0, finalDiff[0])
          }
          that.setData({
            newList: list
          })
          app.globalData.list = list
        } else {
          newList = newList.map(function (item) {
            return Object.assign(item, {
              showPlay: true
            })
          })
          that.setData({
            newList: newList
          })
          app.globalData.list = newList
        }
      }
    })
  },

  toForm() {
    wx.navigateTo({
      url: '../story/input/input'
    })
  },

  musicOn({
    musicUrl,
    songName,
    singer
  }) {
    debugger
    const audio = wx.getBackgroundAudioManager();
    audio.src = musicUrl
    audio.title = songName
    audio.singer = singer
  },

  playMusic(e) {
    const audio = wx.getBackgroundAudioManager();
    let index = e.currentTarget.dataset.id
    let list = app.globalData.list
    if (app.globalData.stop) {
      this.musicOn(list[index])
    } else {
      if (app.globalData.play) {
        //点击了列表另一个音乐
        if (index != app.globalData.listIndex) {
          this.musicOn(list[index])
          list[app.globalData.listIndex].showPlay = true
          this.setData({
            newList: list
          })
        } else {
          audio.pause()
        }
      } else {
        if (index !== app.globalData.listIndex) {
          this.musicOn(list[index])
        } else {
          audio.play()
        }
      }
    }
    app.globalData.listIndex = index
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getData();
    wx.stopPullDownRefresh()
  },

  onShow() {
    const audio = wx.getBackgroundAudioManager()
    audio.onPlay(() => {
      let list = app.globalData.list
      let index = app.globalData.listIndex;
      app.globalData.play = true
      app.globalData.stop = false
      app.globalData.pause = false
      list[index].showPlay = false
      this.setData({
        newList: list
      })
    })
    audio.onPause(() => {
      let list = app.globalData.list
      let index = app.globalData.listIndex;
      app.globalData.play = false
      app.globalData.stop = false
      app.globalData.pause = true
      list[index].showPlay = true
      this.setData({
        newList: list
      })
    })
    audio.onStop(() => {
      let list = app.globalData.list
      let index = app.globalData.listIndex;
      app.globalData.play = false
      app.globalData.stop = true
      app.globalData.pause = false
      list[index].showPlay = true
      this.setData({
        newList: list
      })
    })
    audio.onEnded(() => {
      const audio = wx.getBackgroundAudioManager()
      let list = app.globalData.list
      let index = app.globalData.listIndex
      let len = list.length - 1
      //
      let next = index + 1
      //如果已经播到最后一首
      if (next > len) {
        audio.src = list[0].musicUrl
        audio.title = list[0].songName
        audio.singer = list[0].singer
        list[index].showPlay = true
        this.setData({
          newList: list
        })
        app.globalData.listIndex = 0
      } else {
        audio.src = list[next].musicUrl
        audio.title = list[next].songName
        audio.singer = list[next].singer
        list[index].showPlay = true
        this.setData({
          newList: list
        })
        app.globalData.listIndex = next
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */

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
    this.onLoad(); //重新加载onLoad()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})