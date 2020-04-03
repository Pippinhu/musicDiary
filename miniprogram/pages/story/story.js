// pages/story/story.js
const db = wx.cloud.database();
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList:[],
    totalCount:0,
    pageSize:10,
    index:'',
    newList:[],
    showPlayList:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getData();
    wx.stopPullDownRefresh()
  },

  getData(){
    let that=this;
    console.log(app.globalData.list.length)
    // if(app.globalData.list.length==0){
    //   wx.cloud.callFunction({
    //     name:'getMusic',
    //     data:{},
    //     success:res=>{
    //       that.data.newList = res.result.data.map(function(item,index){
    //         return Object.assign(item,{showPlay:true})
    //       })
    //       that.setData({
    //         newList:that.data.newList
    //       }) 
    //       app.globalData.list = that.data.newList
    //     }
    //   })
    // }
    // //如果列表存在,就不需要每项都加上showPlay,但是
    // else{
    //   that.setData({
    //     newList:app.globalData.list
    //   }) 
    // }
    wx.cloud.callFunction({
      name:'getMusic',
      data:{},
      success:res=>{
        let list = app.globalData.list 
        // let listId = app.globalData.listId
        let newList=res.result.data
        
        // if(list.length!==0){
          //先把当前列表的id挑出来
          // let nowId = newList.map(item=>item._id)
          // //找到id不一致的那个
          // let lonelyId = nowId.filter((item)=>
          //     listId.indexOf(item)==-1
          // )
          // console.log(lonelyId)
          // //找到这个不同的id所在的index的,然后给这个element加上showPlay=true
          // let finalList = 

          //其实应该是这个逻辑,让新列表的每一个id和旧列表的每一个id去对比,一致的showPlay=旧列表的Show,id不一致的showPlay==true
          // console.log(list[0]._id)
          // console.log(newList[0]._id)
          if(list.length!==0){
            for(let i=0;i<newList.length;i++){
              for(let j=0;j<list.length;j++){
                if(newList[i]._id===list[j]._id){
                  newList[i].showPlay=list[j].showPlay
                  return
                }
                else{
                  newList[i].showPlay=true
                }
              }
            }
            this.setData({
              newList:newList
            })   
            app.globalData.list = that.data.newList
          }  
          else{
            newList = newList.map(function(item){
              return Object.assign(item,{showPlay:true})
              })
            this.setData({
              newList:newList
            }) 
            app.globalData.list = that.data.newList
        }
      }
    })
  },
        


          // let listAll = list.concat(newList)
          // lonelyList = listAll.filter(item=>{
          //   //  list.indexOf(item)==-1 | newList.indexOf(item)==-1
        
          // })
          // console.log(lonelyList)

          // that.data.newList = res.result.data.map(function(item,index){
          //   console.log(item)
          //   console.log(item._id)
          //   if(item._id!==app.globalData.list[index]._id){
          //     Object.assign(item,{showPlay:true})
          //   }           // return Object.assign(item,{showPlay:true})
          // })
          // that.setData({
          //   newList:that.data.newList
          // }) 
          // that.data.newList = res.result.data.filter(item,index=>{
          //   list[index].indexOf(item._id)==-1
          // })
          // console.log(that.data.newList)
          // for(let i = 0;i<newList.length-1;i++){
          //   for(let j = 0;j<list.length-1;j++){
          //     if(list[j]._id!==newList[i]._id){
          //       // listAll.push(list[j])
          //       listAll++
          //     }
          //     else{
          //       console.log('ha')
          //     }
          //   }
          // }
          // console.log(listAll)
        // else{
        //   console.log('ddddd')
        //   that.data.newList = res.result.data.map(function(item){
        //     return Object.assign(item,{showPlay:true})
        //   })
        //   app.globalData.listId = res.result.data.map(item=>item._id)
        //   that.setData({
        //     newList:that.data.newList
        //   }) 
        // }
  

  toForm:function(){
    wx.navigateTo({
      url:'../story/input/input'
    })
  },

  onShow: function () {
    const audio = wx.getBackgroundAudioManager()
    audio.onPlay(()=>{
      let list = app.globalData.list
      let index = app.globalData.listIndex;
      app.globalData.play=true
      app.globalData.stop=false
      app.globalData.pause=false
      list[index].showPlay=false
      this.setData({
        newList:list
      })
    })
    audio.onPause(()=>{
      let list = app.globalData.list
      let index = app.globalData.listIndex;
      app.globalData.play=false
      app.globalData.stop=false
      app.globalData.pause=true
      list[index].showPlay=true
      this.setData({
        newList:list
      })
    })
    audio.onStop(()=>{
      let list = app.globalData.list
      let index = app.globalData.listIndex;
      app.globalData.play=false
      app.globalData.stop=true
      app.globalData.pause=false
      list[index].showPlay=true
      this.setData({
        newList:list
      })
    })
    audio.onEnded(()=>{
      const audio = wx.getBackgroundAudioManager()
      let list = app.globalData.list
      let index = app.globalData.listIndex
      let len = list.length - 1
      //
      let next = index + 1 
      //如果已经播到最后一首
      if(next > len){
        audio.src = list[0].musicUrl
        audio.title = list[0].songName
        audio.singer = list[0].singer
        list[index].showPlay=true
          this.setData({
            newList:list
          })
        app.globalData.listIndex = 0
      }
      else{
        audio.src = list[next].musicUrl
        audio.title = list[next].songName
        audio.singer = list[next].singer
        list[index].showPlay=true
        this.setData({
          newList:list
        })
        app.globalData.listIndex = next
      }
    })
  },

  musicOn:function(index,list){
    const audio = wx.getBackgroundAudioManager();
    audio.src = list[index].musicUrl
    audio.title = list[index].songName
    audio.singer = list[index].singer
  },

  playMusic:function(e){
    const audio = wx.getBackgroundAudioManager();
    let index = e.currentTarget.dataset.id
    let list = app.globalData.list
    if(app.globalData.stop){
      this.musicOn(index,list)
    }else{
      if(app.globalData.play){
        //点击了列表另一个音乐
        if(index!=app.globalData.listIndex){
          this.musicOn(index,list)
          list[app.globalData.listIndex].showPlay=true
          this.setData({
            newList:list
          })
        }
        else{
          audio.pause()
        }
      }else{
        if(index!==app.globalData.listIndex){
          this.musicOn(index,list)
        }else{
        audio.play()
        }
      }
    }
    app.globalData.listIndex = index

    //拿到当前播放音频的index值
    // this.data.index=e.currentTarget.dataset.id
    // //如果当前播放状态是播放状态
    // if(this.data.newList[this.data.index].showPlay){
    //   audio.src=this.data.newList[this.data.index].musicUrl;
    //   audio.autoplay = true;
    //   audio.title=this.data.newList[this.data.index].songName
    //   // 所有index的showplay值归0
    //   this.data.newList=this.data.newList.map((item)=>{
    //     // console.log(item.showPlay)
    //     item.showPlay=true
    //     return item
    //   })
    //   //将播放状态修改为false
    //   this.data.newList[this.data.index].showPlay=false
    //   console.log(this.data.newList)
    //   this.setData({
    //     newList:this.data.newList
    //   })
    // }
    // else{
    //   audio.pause();
    //   this.data.newList[this.data.index].showPlay=true
    //   console.log(this.data.newList)
    //   this.setData({
    //     newList:this.data.newList
    //   })
    // }
    // this.data.showPlayList = this.data.newList.map(obj => {return{'showPlay':obj.showPlay}})
    // console.log(this.data.showPlayList);
    // wx.setStorage({
    //   key:'isPlay',
    //   data:this.data.showPlayList
    // })
  },

  onPullDownRefresh: function () {
    this.onLoad(); //重新加载onLoad()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */

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