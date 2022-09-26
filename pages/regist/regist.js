// pages/regist/regist.js
var app=getApp()
import {register} from "../../api/user"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    userAccount: "",
    password: "",
    avatar:"",
    fileList:[]
  },
  //删除头像
  delete(){
    this.setData({
        fileList:[]
    })   
  },
  //选择头像后的操作
  afterRead(event) {
    const {
        file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
        url: app.globalData.httpPath+'/file/upload', // 仅为示例，非真实的接口地址
        filePath: file.url,
        name: 'file',
        success:res=> {
          console.log(res);
          // 图片上传返回的事一个字符窜，需要转化成JS对象
          var data=JSON.parse(res.data);
          console.log(data);
            // 上传完成需要更新 fileList
            var fileList=[]
            // 显示图片
            fileList.push({
              ...file,
              imgUrl:data.data,
              url:app.globalData.httpPath+data.data
            })
            console.log(fileList);
            this.setData({
                fileList
            });
        },
    });
},
regist(){
  var userInfo={
    userName:this.data.userName,
    userAccount: this.data.userAccount,
    password: this.data.password,
    avatar:this.data.fileList[0].imgUrl,
  }
  console.log(userInfo);
  register(userInfo).then(res=>{
    console.log(res);
    if(res.code==200){
       wx.showToast({
          title: '注册成功',
          duration:1000,
          success:res=>{
            setTimeout(() => {
              wx.reLaunch({
                url: '/pages/login/login'
              })
            }, 1000);
          }
        })
    }else{
      wx.showToast({
        title: res.msg||'操作失败',
        icon:"error"
      })
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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