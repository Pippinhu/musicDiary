// pages/story/story.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList:[],
    totalCount:0,
    pageSize:10,
    index:'',
    newList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getData();
    // db.collection('story').get({
    //   success: res => {
    //     this.setData({
    //       postList:res.data
    //     })
    //   }
    // })
    wx.stopPullDownRefresh()
  },

  //get list data
  // getData:function(){
  //   let that=this;
  //   wx.cloud.callFunction({
  //     name:'getMusic',
  //     data:{},
  //     success:res=>{
  //       console.log('成功获取')
  //       console.log(res)
  //       that.setData({
  //         postList:res.result.data
  //       })
  //     }  
  //   })
  //   //postlist增加播放控
  //   console.log(that.data.postList)
  //   that.data.newList = that.data.postList.map(function(item){
  //     item.push({'showPlay':'true'})
  //   })

  //   console.log(that.data.newList)
  //   var that=this;
  //   const db = wx.cloud.database();
  //   //get the total data
  //   db.collection('story').count({
  //     success: res => {
  //       that.data.totalCount=res.total;
  //     }
      
  //   })
  //   //get the frist ten
  //   try {
  //     db.collection('story').limit(that.data.pageSize).get({
  //       success: res => {
  //         console.log(res.data)
  //         this.setData({
  //           postList: res.data
  //       })
  //       wx.hideNavigationBarLoading();//hide loading 
  //       wx.stopPullDownRefresh();
  //     },
  //     fail:function(event){
  //       wx.hideNavigationBarLoading();//hide loading 
  //       wx.stopPullDownRefresh();
  //     }
  //   })
  // }catch(e){
  //     wx.hideNavigationBarLoading();//hide loading 
  //     wx.stopPullDownRefresh();}
  // },

  getData(){
    let that=this;
    wx.cloud.callFunction({
      name:'getMusic',
      data:{},
      success:res=>{
        console.log('成功获取')
        console.log(res)         
        that.data.newList = res.result.data.map(function(item,){
          return Object.assign(item,{'showPlay':'true'})
        })
        console.log(that.data.newList)
        that.setData({
          newList:that.data.newList
        })
        
      }
    })
  },



  // async getNewData(){
  //   let that=this;
  //   console.log(that.getData)
  //   let postList= await that.getData()
  //   //postlist增加播放控
  //   console.log(postList)
  //   that.data.newList = that.data.postList.map(function(item){
  //     item.push({'showPlay':'true'})
  //   })
  // },

  toForm:function(){
    wx.navigateTo({
      url:'../story/input/input'
    })
  },

  //pull down and load funciton
  // onReachBottom:function(){
  //   var that=this;
  //   var temp =[];
  //   let length=this.data.postList.length
  //   if (this.data.postList.length<this.data.totalCount){
  //     try{
  //       // console.log(this.data.totalCount)
  //       // console.log(this.data.postList.length)
  //       const db=wx.cloud.database();
  //       db.collection('story')
  //         .skip(length)
  //         .limit(that.data.pageSize)
  //         .get({
  //           success: res => {
  //             if(res.data.length>0){
  //               for(let i=0;i<res.data.length;i++){
  //                 let tempPost = res.data[i];
  //                 temp.push(tempPost);
  //               }

  //             let totalPost={};
  //             totalPost=that.data.postList.concat(temp);

  //             console.log(totalPost)
  //             that.setData({
  //               postList:totalPost
  //             })

  //         }else{
  //           wx.showToast({
  //             title:'no more data'
  //           })
  //         }
  //       },
  //       fail:function(evet){
  //         console.log(event);
  //       }
  //     })
  //   }catch(e){
  //     console.error(e);
  //   }
  // }
  // else{
  //     wx.showToast({
  //       title:"no more data"
  //     })
  //   }
  // },

  playMusic:function(e){
    const audio = wx.getBackgroundAudioManager();
    //拿到当前播放按钮的index值
    this.data.index=e.currentTarget.dataset.id
    // let showPlay= `newList[${this.data.index}].showPlay`
    //如果当前播放状态是播放状态
    if(this.data.newList[this.data.index].showPlay){
      audio.src=this.data.newList[this.data.index].musicUrl;
      audio.autoplay = true;
      audio.title=this.data.newList[this.data.index].songName
      //将播放状态修改为false
      this.data.newList[this.data.index].showPlay=false
      console.log(this.data.newList)
      this.setData({
        newList:this.data.newList
      })
    }
    else{
      audio.pause();
      this.data.newList[this.data.index].showPlay=true
      console.log(this.data.newList)
      this.setData({
        newList:this.data.newList
      })
    }
    // this.data.index=e.currentTarget.dataset.id
    // const audio = wx.getBackgroundAudioManager();
    // if(this.data.showPlay){
    //   audio.src=this.data.postList[this.data.index].musicUrl;
    //   audio.autoplay = true;
    //   audio.title=this.data.postList[this.data.index].songName
    //   this.data.showPlay=this.data.postList[this.data.index].showPlay
    //   this.setData({
    //     showPlay:false
    //   })
    // }else{
    //   audio.pause();
    //   this.setData({
    //     showPlay:true
    //   })
    // }
  },

  onPullDownRefresh: function () {
    this.onLoad(); //重新加载onLoad()
  },

  onTapToDetail:function(e){
    let postId=e.currentTarget.dataset.id;
    console.log(postId);
    wx.navigateTo({
      url:'../story/detail/detail?id='+postId,
    })
  },

  onTapTo1:function(e) {
    let label ="逃避拥挤";
    wx.navigateTo({
      url: '../story/sort/sort?id=' + label,
    })
  },

  onTapTo2: function (e) {
    let label="坐地成仙"
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})