const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList:[],
    sortList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var label = options.id;
    console.log(label)
    const _ = db.command;
    db.collection('story').where({
      label: label
    }
    ).get({
      success: res => {
        this.setData({
          postList:res.data
        })
      console.log(res)
      }
    })
    db.collection('sort').where({
      headline:label
    }).get({
      success:res=>{
        this.setData({
          img: res.data[0].img,
          headline: res.data[0].headline,
          abstract: res.data[0].abstract,
          tag: res.data[0].tag
        })
      }
      
    })
  },

  onTapToDetail:function(e){
    let postId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../story/detail/detail?id=' + postId,
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})