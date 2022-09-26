// pages/edit/edit.js
import {create,queryById,update} from "../../api/note"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteId:"",
    noteTitle:"",
    noteContent:"",
    time:new Date().toLocaleString(),
  },
  submit(){
    console.log(this.data.noteId);
    if (this.data.noteId.length>0) {
      //如果通过点击便签的进来就做修改，点击图标进行编辑就做添加
      update({
        noteId:this.data.noteId,
        noteTitle:this.data.noteTitle,
        noteContent:this.data.noteContent,
      }).then(res=>{
        if (res.code==200) {
          wx.showToast({
            title: res.msg,
            duration:500,
            success:function(){
              //等提示框结束在跳转页面
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/list/list',
                })
              }, 500);
            }
          })
        }
      })
    }else{
      create({
        noteTitle:this.data.noteTitle,
        noteContent:this.data.noteContent,
      }).then(res=>{
        if (res.code==200) {
          wx.showToast({
            title: '提交成功',
            duration:500,
            success:function(){
              //等提示框结束在跳转页面
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/list/list',
                })
              }, 500);
            }
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
     //自定义标题的内容
     wx.setNavigationBarTitle({
      title:this.data.time,
    })
      if(options.id){
        this.setData({
          noteId:options.id+''
        })
          queryById(
            options.id
          ).then(res=>{
            this.setData({
              noteTitle:res.data.noteTitle,
              noteContent:res.data.noteContent
            })
             //自定义标题的内容
              wx.setNavigationBarTitle({
                title:this.data.noteTitle,
              })
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