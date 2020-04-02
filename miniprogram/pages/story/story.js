// pages/story/story.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList: [],
    currentPlayMusicId: null,
  },

  getData() {
    wx.cloud.callFunction({
      name: 'getMusic',
      data: {},
      success: res => {
        console.log('成功获取', { res })
        that.setData({ musicList: res.result.data })
        wx.stopPullDownRefresh()
      }
    })
  },

  toForm: function () {
    wx.navigateTo({
      url: '../story/input/input'
    })
  },

  playMusic: function (e) {
    const audio = wx.getBackgroundAudioManager();
    const musicId = e.currentTarget.dataset.id
    if (this.data.currentPlayMusicId !== musicId) {
      const music = this.musicList.filter(e => e._id === musicId)[0]
      audio.src = music.musicUrl;
      audio.title = music.songName
      audio.autoplay = true;
      this.setData({ currentPlayMusicId: musicId })
    } else {
      audio.pause();
      this.setData({ currentPlayMusicId: null })
    }
  },

  onTapToDetail: function (e) {
    let postId = e.currentTarget.dataset.id;
    console.log(postId);
    wx.navigateTo({
      url: '../story/detail/detail?id=' + postId,
    })
  },

  onTapTo1: function (e) {
    let label = "逃避拥挤";
    wx.navigateTo({
      url: '../story/sort/sort?id=' + label,
    })
  },

  onTapTo2: function (e) {
    let label = "坐地成仙"
    wx.navigateTo({
      url: '../story/sort/sort?id=' + label,
    })
  },

  onTapTo3: function (e) {
    let label = "完全不怂"
    wx.navigateTo({
      url: '../story/sort/sort?id=' + label,
    })
  },

  onTapTo4: function (e) {
    let label = "哎哟不错"
    wx.navigateTo({
      url: '../story/sort/sort?id=' + label,
    })
  },

  onTapTo5: function (e) {
    let label = "活捉奇葩"
    wx.navigateTo({
      url: '../story/sort/sort?id=' + label,
    })
  },

  onTapToPop: function (e) {
    let postId = e.currentTarget.dataset.id;
    console.log(postId);
    wx.navigateTo({
      url: '../story/detail/detail?id=' + postId,
    })
  },

  onTapToCountry: function (e) {
    let postId = e.currentTarget.dataset.id;
    console.log(postId);
    wx.navigateTo({
      url: '../story/detail/detail?id=' + postId,
    })
  },

  onTapToRap: function (e) {
    let postId = e.currentTarget.dataset.id;
    console.log(postId);
    wx.navigateTo({
      url: '../story/detail/detail?id=' + postId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getData();
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

  onPullDownRefresh: function () {
    this.getData(); //重新加载onLoad()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})