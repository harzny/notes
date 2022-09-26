// pages/login/login.js
import {loginer} from "../../api/user"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAccount: "",
    password: ""
  },
  login(){
      var loginInfo={
        userAccount: this.data.userAccount,
        password: this.data.password,
      }
      loginer(loginInfo).then(res=>{
        if (res.code==200) {
          //缓存数据
          wx.setStorage({
            key:"Authorization",
            data:res.data
          })
          wx.showToast({
            title: res.msg,
            duration:1000,
            success:res=>{
              setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/list/list',
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
   var token= wx.getStorageSync('Authorization')
   //判断是否有登录，如果有token表示登录过了，直接进入主页面
   if (token != null && token.length>0) {
     wx.reLaunch({
       url: '/pages/list/list',
     })
   }
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