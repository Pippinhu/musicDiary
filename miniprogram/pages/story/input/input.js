//index.js
const app = getApp()

Page({
  data: {
    id:'',
    count:'',
    feelings:'',
    link:''
  },

  onLoad: function() {
    const db = wx.cloud.database()
    // const list = db.collection('list')
    // list.get().then(res => {
    //   this.setData({
    //     list:res.data
    //   })
    // })
    // const share = db.collection('share')
    // share.get().then(res => {
    //   this.setData({
    //     message:res.data[0].message,
    //     pic:res.data[0].pic
    //   })
    // })
    // const radio=db.collection('radio')
    // radio.get().then(res => {
    //   this.setData({
    //     tag_first:res.data[0].tag,
    //     tag_second:res.data[1].tag
    //   })
    // })

    const story = db.collection('story')
    // 获取数据总数
    story.count().then(res => {
      this.setData({
        count: res.total
      })
    })
    // if (!wx.cloud) {
    //   wx.redirectTo({
    //     url: '../chooseLib/chooseLib',
    //   })
    //   return
    // }
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           this.setData({
    //             avatarUrl: res.userInfo.avatarUrl,
    //             userInfo: res.userInfo
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
  },

  changePage(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  bindKeyInput(event) {
    this.data.link=event.detail.value
    console.log(this.data.link)
    // let pattern=/\/\d+\//
    // let str=event.detail.value
    // let str2=(pattern.exec(str))[0];
    // this.data.id=str2.substring(1, str2.length - 1)
    // console.log(this.data.id)
  },

  bindText(event){
    this.data.feelings=event.detail.value
  },

  getMusicId(){
    let that=this
    let pattern=/\/\d+\//
    let str=that.data.link
    console.log(str)
    let str2=pattern.exec(str)
    console.log(str2)
    let str3=str2[0];
    let id=str3.substring(1, str3.length - 1)
    return id
  },

 async confirm(){
    console.log('提交')
    let id = await this.getMusicId()
    let sort= this.data.count+1
    const db = wx.cloud.database()
    const story = db.collection('story')
    let feelings=this.data.feelings
      let url = 'https://music.163.com/api/song/detail/?id='+id+'&ids=%5B'+id+ '%5D';
      let musicUrl='http://music.163.com/song/media/outer/url?id='+id+
      '.mp3'
      console.log(musicUrl)
      wx.request({
        url: url, 
        data: {},
        method: 'GET',
        success: function (res) {
          let songData={
            //排序
            sort:sort,
            //歌名
            songName:res.data.songs[0].name,
            //歌手
            singer:res.data.songs[0].artists[0].name,
            //专辑图片
            albumPic:res.data.songs[0].album.picUrl,
            musicUrl:musicUrl,
            feelings:feelings,
          }
          console.log(songData)
          story.add({
            data:songData
            }).then(res => {
              wx.showToast({
                title: '添加成功！',
              })
              setTimeout(function () {
                wx.navigateBack({
                  url: '../story/story'
                    })
                  }, 1000)
          })
        }
      })

  },

 
  
  // confirm:async()=>{
  //   let pattern=/\/\d+\//
  //   let str=this.data.link
  //   let str2=(pattern.exec(str))[0];
  //   this.data.id=str2.substring(1, str2.length - 1)
  //   console.log(this.data.id)

  //   const db = wx.cloud.database()
  //   const story = db.collection('story')
  //   let sort= this.data.count+1
  //   let id=this.data.id;
  //   let feelings=this.data.feelings
  //   let url = 'https://music.163.com/api/song/detail/?id='+id+'&ids=%5B'+id+ '%5D';
  //   let musicUrl='http://music.163.com/song/media/outer/url?id='+id+
  //   '.mp3'
  //   console.log(musicUrl)
  //   wx.request({
  //     url: url, 
  //     data: {},
  //     method: 'GET',
  //     success: function (res) {
  //       let songData={
  //         //排序
  //         sort:sort,
  //         //歌名
  //         songName:res.data.songs[0].name,
  //         //歌手
  //         singer:res.data.songs[0].artists[0].name,
  //         //专辑图片
  //         albumPic:res.data.songs[0].album.picUrl,
  //         musicUrl:musicUrl,
  //         feelings:feelings,
  //       }
  //       console.log(songData)
  //       story.add({
  //         data:songData
  //         }).then(res => {
  //           wx.showToast({
  //             title: '添加成功！',
  //           })
  //           // setTimeout(function () {
  //           //   wx.navigateBack({
  //           //     url: '../story/story'
  //           //       })
  //           //     }, 1000)
  //       })
  //     }
  //   })


  // },

  // confirm(){
  //   const db = wx.cloud.database()
  //   const info = db.collection('info')
  //   let id= this.data.count+1
  //   let data = {
  //     name: this.data.name,
  //     high: this.data.high,
  //     year: this.data.year,
  //     child: this.data.current_child,
  //     company: this.data.company,
  //     require: this.data.require,
  //     current:this.data.current_sex,
  //     recommend:this.data.recommend,
  //     color:this.data.color,
  //     icon:this.data.icon,
  //     _id_:id
  //   }
  //   console.log(data)
  //   if(data.name && data.current && data.year && data.company && data.recommend && data.high){
     
  //     info.add({
  //       data:data
  //     }).then(res => {
  //       wx.showToast({
  //         title: '添加成功！',
  //       })
  //       setTimeout(function () {
  //         wx.navigateBack({
  //           url: '../chooseLib/chooseLib'
  //         })
  //       }, 1000)
  //     })
  //   }else{
  //     wx.showToast({
  //       title: '请填写完整后提交',
  //       icon: 'none',
  //     })
  //   }
  // },

  handleSexChange({ detail = {} }) {
    this.setData({
      current_sex: detail.value
    });
    if(detail.value==="女孩"){
      this.setData({
        color:'rgba(255,126,167,3)',
        icon:'/images/female.png'
      })
    }else { 
      this.setData({
        color:'rgba(125,182,255,1)',
        icon:'/images/male.png'
      })
    }
  },

  handleChildChange({ detail = {} }) {
    this.setData({
      current_child: detail.value
    });
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  
  onShow: function () {
    // const db = wx.cloud.database()
    // const showPage=db.collection('show')
    // showPage.get().then(res=>{
    //   this.setData({
    //     show:res.data[0].show
    //   })
    // })
  },

  onShareAppMessage: function (res) {
    return {
      title: this.data.message,
      imageUrl:this.data.pic,
    }
  }
})
