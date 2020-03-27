// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let list=await db.collection('story').orderBy('sort', 'desc').get()
  return{
    data:list.data
  }
  // try{
  //   return await db.collection('story').get()
  // }catch(e){
  //   console.log(e)
  // }
  // const wxContext = cloud.getWXContext()
  // await db.collection('story')
  //   .get().then(res => {
  //     console.log(res.data)
  //   })
  //   .catch(err => {
  //     console.error(err)
  //   })
  //   return{

  //   }
  // const wxContext = cloud.getWXContext()
  // let dbName = event.dbName;
  // let filter = event.filter?event.filter:null;
  // let pageIndex = event.pageIndex ? event:1
  // let pageSize = event.pageSize?event.pageSize:10
  // const countResult=await db.collection(dbName).count()
  // const total = countResult.total
  // const totalPage=Math.ceil(total/10)
  // let hasMore;
  // if(pageIndex>totalPage || pageIndex==totalPage){
  //   hasMore=false;
  // }else{
  //   hasMore=true
  // }
  // return db.collection(dbName).where(filter).skip((pageIndex-1)*pageSize).limit(pageSize).get().then(res=>{
  //   res.hasMore=hasMore;
  //   return res;
  // })
}