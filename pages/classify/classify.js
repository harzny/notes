// pages/classify/classify.js
import{create,queryList,update,deleteById} from "../../api/classify.js"
import{queryList as classifyQueryList} from "../../api/classify.js"
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //定义显示编辑
    classifyNameShow:'',
    //定义选中的分类id
    currentClassifyId:'',
    //定义选中的分类id
    currentClassifyName:'',
    classifyName: '',
    classifyList: [],
    classifyShow: false,
    actions: [
      {
        name: '编辑',
      },
      {
        name: '删除',
      },
    ],

  },
  //展示编辑的操作
  showOper(e){
    this.setData({
      classifyShow:true,
      currentClassifyId:e.currentTarget.dataset.id,
      currentClassifyName:e.currentTarget.dataset.name
    })
  },
  closeClassify(){
    this.setData({
      classifyShow:false
    })
  },
  //编辑操作
  checkClassifyName(){
    console.log(this.data.currentClassifyId);
    update({
      classifyId:this.data.currentClassifyId,
      classifyName:this.data.currentClassifyName
    }).then(res=>{
     if (res.code==200) {
       wx.showToast({
         title: '修改成功',
         success:()=>{
           setTimeout(() => {
            this.getList()
           }, 1000);
         }
       })
       this.setData({
        classifyNameShow:false
      })
     }
    })
  },
  

  select(e ){
    switch(e.detail.name){
      case "编辑":
        this.setData({
          classifyNameShow:true
        })
        break;
      case "删除":
        console.log(this.data.currentClassifyId)
        deleteById(this.data.currentClassifyId).then(res=>{
          if (res.code==200) {
            wx.showToast({
              title: '删除成功',
              success:()=>{
                setTimeout(() => {
                 this.getList()
                }, 400);
              }
            })
          }
        })
        break;
    }
  },
  toList(e){
    app.globalData.currentClassify=e.currentTarget.dataset.classify;
    console.log( app.globalData.currentClassify)
        // classifyQueryList()
    wx.switchTab({
      url: '/pages/list/list',
    })
  },
  newClassify() {
    create({classifyName:this.data.classifyName}).then(res=>{
      if (res.code==200) {
        wx.showToast({
          title: '添加成功',
        })
        this.getList()
        this.setData({
          classifyName:'',
        })
      }

  })
  },
    getList(){
      queryList().then(res=>{
        this.setData({
          classifyList:res.data
        })
      })
    },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList()
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
    this.getList()
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})